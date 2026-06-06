'use strict';

/* global Dom, I18n, Output, PolicyManager, Sortable */

/** @type {browser.permissions.Permissions} */
const DOWNLOAD_PERMISSION = { permissions: ['downloads'] };

/** @type {int} */
const POPOVER_DURATION_IN_MS = 4000;

/** @type {number} */
const MINIMUM_SUPPORTED_VERSION = 140.0;

const $actionButtons = document.getElementById('action-buttons');
const $downloadButton = document.getElementById('download');
const $generatorForm = document.getElementById('generator-form');
const $grantDownloadPermissionLink = document.getElementById('grant-download-permission');
const $policyGeneratorButton = document.getElementById('generate');
const $policyOutput = document.getElementById('policy-output');
const $policyOutputFullscreenButton = document.getElementById('show-policy-output-fullscreen');
const $policyOutputFullscreenCloseButton = document.getElementById('close-policy-output-fullscreen');
const $policyOutputFullscreenCopyButton = document.getElementById('copy-to-clipboard-fullscreen');
const $policyOutputFullscreenDialog = document.getElementById('policy-output-fullscreen-dialog');
const $policyOutputFullscreen = document.getElementById('policy-output-fullscreen');
const $policyOutputFullscreenWrapper = document.getElementById('policy-output-fullscreen-wrapper');
const $policyOutputWrapper = document.getElementById('policy-output-wrapper');
const $copyToClipboardButton = document.getElementById('copy-to-clipboard');
const $copyToClipboardPopover = document.getElementById('copy-to-clipboard-popover');

class Configurator {
  /**
   * Contains the UI categories.
   *
   * @type {Array.<HTMLElement>}
   */
  static #uiCategoryElements = [];

  /**
   * Contains the allowed preferences.
   *
   * @type {Array.<string>}
   */
  static #allowedPreferences = [];

  /**
   * Contains the disallowed preferences.
   *
   * @type {Array.<string>}
   */
  static #disallowedPreferences = [];

  /**
   * Contains the presets for enum fields.
   *
   * @type {Array.<string>}
   */
  static #presets = [];

  /**
   * Load the data, add the categories and policies to the UI, set up all the event listeners, and more.
   *
   * @returns {void}
   */
  static async init () {
    const resource = await fetch(browser.runtime.getURL('policies/firefox.json'));
    const json = await resource.json();
    const { policies, preferences, presets, tags } = json;
    let copyToClipboardPopoverTimeout = null;

    const copyPolicyOutputToClipboard = async $source => {
      try {
        await navigator.clipboard.writeText($source.innerText);
      }
      catch {
        return;
      }

      document.querySelectorAll('.popover:popover-open').forEach($popover => {
        $popover.hidePopover();
      });

      $copyToClipboardPopover.showPopover();

      if (copyToClipboardPopoverTimeout) {
        window.clearTimeout(copyToClipboardPopoverTimeout);
      }

      copyToClipboardPopoverTimeout = window.setTimeout(() => {
        $copyToClipboardPopover.hidePopover();
        copyToClipboardPopoverTimeout = null;
      }, POPOVER_DURATION_IN_MS);
    };

    Configurator.#allowedPreferences = preferences.allowed;
    Configurator.#disallowedPreferences = preferences.disallowed;
    Configurator.#presets = presets;

    // add categories to the user interface
    for (const tag of tags) {
      const $wrapper = document.createElement('div');
      $wrapper.classList.add('options-block-container');

      const $headline = document.createElement('h3');
      $headline.textContent = I18n.getMessage('policy_category_' + tag.replaceAll('-', '_'));
      $wrapper.appendChild($headline);

      const $container = document.createElement('div');
      $container.setAttribute('id', 'options-' + tag);
      $container.classList.add('options-block');
      $wrapper.appendChild($container);

      $generatorForm.appendChild($wrapper);

      Configurator.#uiCategoryElements[tag] = $container;
    }

    // add policies to the user interface
    for (const name in policies) {
      if (Object.hasOwn(policies, name)) {
        Configurator.#addPolicy(name, policies[name]);
      }
    }

    // preload the icon to avoid flicker once needed
    const lockedIcon = new Image();
    lockedIcon.src = browser.runtime.getURL('images/locked.svg');

    // test if the download permission is granted
    Configurator.#testDownloadPermission();

    // react to changes of the policy checkboxes
    document.querySelectorAll('.policy-checkbox').forEach($el => {
      $el.addEventListener('change', () => {
        const $options = $el.parentElement.querySelector(':scope > .options');

        if ($options) {
          // show options for enabled policies and hide options for disabled policies
          $options.classList.toggle('disabled');

          // set focus to the first input or select field after a policy checkbox has been checked
          if (!$options.classList.contains('disabled')) {
            const $firstInputField = $options.querySelector('input, select');

            if ($firstInputField) {
              $firstInputField.focus();
            }
          }
        }
      });
    });

    // add event listeners for policy exclusions
    document.querySelectorAll('[data-exclude]').forEach($el => {
      $el.addEventListener('change', e => Configurator.handlePolicyExclusion(e.target));
    });

    // add event listeners for validations
    document.querySelectorAll('[data-validations]').forEach($el => {
      Dom.addEventListener($el, 'input', Configurator.#validateInputField);
    });

    $generatorForm.addEventListener('mousedown', Configurator.#preserveNumberInputFocus);
    $generatorForm.addEventListener('click', Configurator.#executeNumberInputAction);

    // add event listeners for array actions (add / remove buttons)
    document.querySelectorAll('.array-action').forEach($el => {
      Dom.addEventListener($el, 'click', Configurator.#executeArrayActions);
    });

    // only supported in Firefox 148+
    if (!('Sanitizer' in window)) {
      // remove the gap for the line numbers if syntax highlighting is disabled
      $policyOutputWrapper.classList.add('no-syntax-highlighting');
      $policyOutputFullscreenWrapper.classList.add('no-syntax-highlighting');
    }

    // add the event listener for the "generate policies" button
    $policyGeneratorButton.addEventListener('click', () => {
      // only supported in Firefox 148+
      if ('Sanitizer' in window) {
        const sanitizer = new Sanitizer({ elements: ['span'], attributes: ['class'] });
        $policyOutput.setHTML(Output.generatePoliciesOutput(true), { sanitizer });
      }
      else {
        $policyOutput.textContent = Output.generatePoliciesOutput();
      }

      $actionButtons.classList.remove('hidden');
    });

    // focus the "generate policies" button via keyboard shortcut
    window.addEventListener('keydown', e => {
      if (e.shiftKey && e.key === 'G' && !['text', 'textarea', 'url'].includes(document.activeElement.type)) {
        $policyGeneratorButton.focus();
      }
    });

    // show policies.json output in a fullscreen overlay
    $policyOutputFullscreenButton.addEventListener('click', () => {
      // clone the rendered output so syntax highlighting stays exactly as shown in the regular code field
      const $outputNodes = Array.from($policyOutput.childNodes).map(
        $node => $node.cloneNode(true)
      );
      const lineNumberWidth = getComputedStyle($policyOutputWrapper)
        .getPropertyValue('--line-number-width');

      $policyOutputFullscreen.replaceChildren(...$outputNodes);
      $policyOutputFullscreenWrapper.style.setProperty('--line-number-width', lineNumberWidth);
      $policyOutputFullscreenDialog.showModal();
    });

    // close the fullscreen output dialog via the same cancel path as pressing Escape
    $policyOutputFullscreenCloseButton.addEventListener('click', () => {
      const cancelEvent = new Event('cancel', { cancelable: true });

      if ($policyOutputFullscreenDialog.dispatchEvent(cancelEvent)) {
        $policyOutputFullscreenDialog.close();
      }
    });

    // copy policies.json output to clipboard
    $copyToClipboardButton.addEventListener('click', () => {
      void copyPolicyOutputToClipboard($policyOutput);
    });

    $policyOutputFullscreenCopyButton.addEventListener('click', () => {
      void copyPolicyOutputToClipboard($policyOutputFullscreen);
    });

    // add the event listener for the "download policies.json" button if downloads permission is not granted
    $grantDownloadPermissionLink.addEventListener('click', async () => {
      const granted = await browser.permissions.request(DOWNLOAD_PERMISSION);

      // immediately prompt for download after the "downloads" permission has been granted
      if (granted) {
        Configurator.#downloadPolicy();
      }
    });

    // add the event listener for the "download policies.json" link if downloads permission is granted
    $downloadButton.addEventListener('click', () => {
      Configurator.#downloadPolicy();
    });

    // set up the filter field
    Configurator.#filterField();
  }

  /**
   * Handle the exclusion of policies.
   *
   * @param {HTMLInputElement} $el - the DOM element of the policy checkbox
   *
   * @returns {void}
   */
  static handlePolicyExclusion ($el) {
    const excludedPolicies = $el.getAttribute('data-exclude');
    excludedPolicies.split(',').forEach(policy => {
      const $excludedPolicy = document.querySelector(`[data-name="${policy}"]`);

      if (!$excludedPolicy) {
        return;
      }

      const $checkbox = $excludedPolicy.querySelector(':scope > input');

      if ($el.checked) {
        $excludedPolicy.classList.add('excluded');
        $checkbox.setAttribute('disabled', 'disabled');
      }
      // also check other enabled policies before enabling the policy again
      else if (!document.querySelector(`[data-exclude*="${policy}"]:checked`)) {
        $excludedPolicy.classList.remove('excluded');
        $checkbox.removeAttribute('disabled');
      }
    });
  }

  /**
   * Add the policy to the UI.
   *
   * @param {string} name - name of the policy
   * @param {object} policy - the policy object
   *
   * @returns {void}
   */
  static #addPolicy (name, policy) {
    // skip disabled policies
    if (policy.enabled === false) {
      return;
    }

    // policy container
    const $wrapper = document.createElement('div');
    $wrapper.setAttribute('data-name', name);
    $wrapper.setAttribute('data-type', policy.schema);
    $wrapper.classList.add('policy-container');

    // policy toggle checkbox
    const $checkbox = document.createElement('input');
    $checkbox.setAttribute('type', 'checkbox');
    $checkbox.setAttribute('id', name);
    $checkbox.classList.add('checkbox', 'policy-checkbox');

    // policy exclusions
    if (policy.exclude) {
      $checkbox.setAttribute('data-exclude', policy.exclude);
    }

    // reverse attribute for boolean options with false instead of true as the value
    if (policy.inverse) {
      $checkbox.setAttribute('data-inverse', 'true');
    }

    $wrapper.appendChild($checkbox);

    // label
    const $label = document.createElement('label');
    $label.setAttribute('for', name);
    $label.textContent = I18n.getMessage('policy_description_' + name);
    $wrapper.appendChild($label);

    // options
    Configurator.#addOptions(name, policy, $wrapper);

    // add the element to the user interface
    if (policy.tags[0]) {
      Configurator.#uiCategoryElements[policy.tags[0]]?.appendChild($wrapper);
    }
  }

  /**
   * Add options for the policy.
   *
   * @param {string} name - the name of the policy
   * @param {object} policy - the policy object
   * @param {HTMLElement} $wrapper - the container element for the policy
   *
   * @returns {void}
   */
  static #addOptions (name, policy, $wrapper) {
    const $options = document.createElement('div');
    $options.classList.add('options', 'disabled');
    $wrapper.appendChild($options);

    // versions info
    if (
      parseFloat(policy.availability.mainstream) > MINIMUM_SUPPORTED_VERSION ||
      parseFloat(policy.availability.esr) > MINIMUM_SUPPORTED_VERSION
    ) {
      let message = I18n.getMessage('version_required') + ': ';

      if (policy.availability.mainstream) {
        message += 'Firefox ' + policy.availability.mainstream;
        message += ' ' + I18n.getMessage('version_or_higher');
      }

      if (policy.availability.mainstream && policy.availability.esr) {
        message += ', ';
      }

      if (policy.availability.esr) {
        message += 'Firefox ESR ' + policy.availability.esr;
        message += ' ' + I18n.getMessage('version_or_higher');
      }

      Configurator.#addInfoText($options, message, 'firefox');
    }

    // deprecation note
    if (policy.deprecation) {
      Configurator.#addInfoText($options, I18n.getMessage(policy.deprecation), 'warning');
    }

    // security warning
    if (policy.security_warning) {
      Configurator.#addInfoText($options, I18n.getMessage('policy_security_warning'), 'warning', 'security-warning');
    }

    // additional note
    if (policy.note) {
      Configurator.#addInfoText($options, I18n.getMessage(policy.note), 'warning');
    }

    // info link
    if (policy.link) {
      Configurator.#addLink($options, policy.link);
    }

    if (['array', 'enum', 'object', 'string'].includes(policy.schema)) {
      Configurator.#addProperty($options, name, policy);
    }
  }

  /**
   * Add a property to a policy.
   *
   * @param {HTMLElement} $el - the DOM element where the option should be inserted
   * @param {string} parentName - the name of the parent object
   * @param {object} object - the object to add
   *
   * @returns {void}
   */
  static #addProperty ($el, parentName, object) {
    switch (object.schema) {
      case 'array':
        Configurator.#addArrayProperty($el, parentName, object);
        break;
      case 'boolean':
        Configurator.#addBooleanProperty($el, parentName, object);
        break;
      case 'enum':
        Configurator.#addEnumProperty($el, parentName, object);
        break;
      case 'heading':
        Configurator.#addHeadingProperty($el, object);
        break;
      case 'object':
        Configurator.#addObjectProperty($el, parentName, object);
        break;
      case 'string':
        Configurator.#addStringProperty($el, parentName, object);
        break;
      default:
        // do nothing
    }
  }

  /**
   * Add a property of the type "heading".
   *
   * @param {HTMLElement} $el - the DOM element where the option should be inserted
   * @param {object} object - the object to add
   *
   * @returns {void}
   */
  static #addHeadingProperty ($el, object) {
    const $heading = document.createElement('div');
    $heading.classList.add('object-label', 'option-heading');
    $heading.textContent = I18n.getMessage(object.label);
    $el.appendChild($heading);
  }

  /**
   * Add a property of the type "array".
   *
   * @param {HTMLElement} $el - the DOM element where the option should be inserted
   * @param {string} parentName - the name of the parent object
   * @param {object} object - the object to add
   *
   * @returns {void}
   */
  static #addArrayProperty ($el, parentName, object) {
    const $wrapper = document.createElement('div');
    $wrapper.setAttribute('role', 'list');
    $wrapper.classList.add('array-wrapper');

    // sortable arrays
    Configurator.#initSortable($wrapper);

    // optional name
    if (object.name) {
      $wrapper.setAttribute('data-name', object.name);
    }

    const $container = document.createElement('div');
    $container.setAttribute('role', 'listitem');
    $container.classList.add('array-container');

    // add a class to simple arrays, so the action buttons attach cleanly
    if (['enum', 'string'].includes(object.items?.schema)) {
      $container.classList.add('simple-array-container');
    }

    // optional label
    if (object.label) {
      Configurator.#addLabel($el, object.label);
    }

    // add array items
    if (object.items?.schema === 'boolean') {
      for (const [idx, option] of object.items.options.entries()) {
        option.schema = 'boolean';
        Configurator.#addProperty($container, parentName + '_' + (idx + 1), option);
      }
    }
    else if (object.items) {
      // put additional item to the start of the array
      if (object.items.additions?.prepend) {
        const $additionalWrapper = document.createElement('div');
        $additionalWrapper.classList.add('additional-item');
        $wrapper.appendChild($additionalWrapper);

        Configurator.#addProperty($additionalWrapper, parentName + '_prepend', object.items.additions.prepend);
      }

      // info link
      if (object.items.link) {
        Configurator.#addLink($wrapper, object.items.link);
      }

      // concatenate all items in the array by the given character
      if (object.items.join) {
        $wrapper.setAttribute('data-join', object.items.join);
      }

      // an empty value instead of an array is allowed
      if (object.items.allow_empty_value) {
        $wrapper.setAttribute('data-empty-value-allowed', 'true');
      }

      Configurator.#addProperty($container, parentName + '_array_1', object.items);
    }

    // add array action links
    if (object.items?.schema !== 'boolean') {
      Configurator.#addArrayActionButtons($container, parentName);
    }

    $wrapper.appendChild($container);

    // put additional item to the end of the array
    if (object.items?.additions?.append) {
      const $additionalWrapper = document.createElement('div');
      $additionalWrapper.classList.add('additional-item');
      $wrapper.appendChild($additionalWrapper);

      Configurator.#addProperty($additionalWrapper, parentName + '_append', object.items.additions.append);
    }

    $el.appendChild($wrapper);
  }

  /**
   * Add a property of the type "boolean".
   *
   * @param {HTMLElement} $el - the DOM element where the option should be inserted
   * @param {string} parentName - the name of the parent object
   * @param {object} object - the object to add
   *
   * @returns {void}
   */
  static #addBooleanProperty ($el, parentName, object) {
    const domName = parentName + '_checkbox';
    const $wrapper = document.createElement('div');
    $wrapper.classList.add('boolean-wrapper');

    // input field
    const $input = document.createElement('input');
    $input.setAttribute('type', 'checkbox');
    $input.setAttribute('id', domName);
    $input.setAttribute('data-name', object.name);
    $input.classList.add('checkbox');
    $wrapper.appendChild($input);

    // label
    const $label = document.createElement('label');
    $label.setAttribute('for', domName);
    $label.classList.add('label');
    $label.textContent = I18n.getMessage(object.label);
    $wrapper.appendChild($label);

    $el.appendChild($wrapper);
  }

  /**
   * Add a property of the type "enum".
   *
   * @param {HTMLElement} $el - the DOM element where the option should be inserted
   * @param {string} parentName - the name of the parent object
   * @param {object} object - the object to add
   *
   * @returns {void}
   */
  static #addEnumProperty ($el, parentName, object) {
    const domName = parentName + '_select';
    const $wrapper = document.createElement('div');
    $wrapper.classList.add('enum-wrapper');

    // label
    if (object.label) {
      Configurator.#addLabel($el, object.label, domName);
    }

    // select element
    const $select = document.createElement('select');
    $select.setAttribute('id', domName);

    // optional name
    if (object.name) {
      $select.setAttribute('data-name', object.name);
    }

    // use presets for options if available
    if (object.preset && Configurator.#presets[object.preset]) {
      object.options = Configurator.#presets[object.preset];
    }

    // assign options to select field
    if (object.options) {
      // sort the options
      if (object.sort_options) {
        object.options.sort((a, b) => I18n.getMessage(a.label).localeCompare(I18n.getMessage(b.label)));
      }

      // add options to the select element
      for (const option of object.options) {
        const $option = document.createElement('option');
        $option.textContent = I18n.getMessage(option.label);
        $option.setAttribute('value', option.value);

        // default value
        if (option.value === object.default) {
          $option.setAttribute('selected', 'selected');
        }

        $select.appendChild($option);
      }
    }

    $wrapper.appendChild($select);
    $el.appendChild($wrapper);
  }

  /**
   * Add a property of the type "object".
   *
   * @param {HTMLElement} $el - the DOM element where the option should be inserted
   * @param {string} parentName - the name of the parent object
   * @param {object} object - the object to add
   *
   * @returns {void}
   */
  static #addObjectProperty ($el, parentName, object) {
    const $wrapper = document.createElement('div');
    $wrapper.classList.add('object-wrapper');

    // optional name
    if (object.name) {
      $wrapper.setAttribute('data-name', object.name);
    }

    // lockable option
    if (object.lockable) {
      Configurator.#addLockOption($wrapper, parentName);
    }

    $el.appendChild($wrapper);

    // label
    if (object.label) {
      const $label = document.createElement('div');
      $label.classList.add('object-label');
      $label.textContent = I18n.getMessage(object.label);

      // workaround to access the parent elements
      requestAnimationFrame(() => {
        const arrayWrapper = $el.classList.contains('array-container');
        const $container = arrayWrapper ? $el : $wrapper;
        $container.insertAdjacentElement('beforebegin', $label);
      });
    }

    // optional key
    if (object.key) {
      Configurator.#addObjectKey($wrapper, parentName, object.key);
    }

    // add properties
    if (object.properties) {
      for (const property of object.properties) {
        const name = property.name ? parentName + '_' + property.name : parentName;
        Configurator.#addProperty($wrapper, name, property);
      }
    }
  }

  /**
   * Add a property of the type "string".
   *
   * @param {HTMLElement} $el - the DOM element where the option should be inserted
   * @param {string} parentName - the name of the parent object
   * @param {object} object - the object to add
   *
   * @returns {void}
   */
  static #addStringProperty ($el, parentName, object) {
    const $wrapper = document.createElement('div');
    $wrapper.classList.add('input-wrapper');

    const isUrlType = object.validations?.includes('url');
    const isNumberType = object.validations?.includes('number');
    const type = isUrlType ? 'url' : isNumberType ? 'number' : 'text';
    const validations = [];
    const domName = parentName + '_input';

    // optional key
    if (object.key) {
      Configurator.#addObjectKey($el, parentName, object.key);
    }

    // input field
    const $input = document.createElement(object.textarea ? 'textarea' : 'input');

    // label
    if (object.label) {
      Configurator.#addLabel($el, object.label, domName);
    }
    else {
      $input.setAttribute('aria-label', I18n.getMessage(object.placeholder));
    }

    if (type === 'url') {
      $input.setAttribute('type', 'url');

      // url validations
      Configurator.#addInvalidLabel($wrapper, 'url', 'validation_invalid_url');
      validations.push('url');

      if (object.url_schemes) {
        $input.setAttribute('data-url-schemes', object.url_schemes.join(','));
      }
    }
    else if (type === 'number') {
      $wrapper.classList.add('number-wrapper');
      $input.setAttribute('type', 'text');
      $input.setAttribute('inputmode', 'numeric');
      $input.setAttribute('pattern', '[0-9]*');

      if (object.minimum) {
        $input.setAttribute('data-minimum', object.minimum);
      }

      if (object.maximum) {
        $input.setAttribute('data-maximum', object.maximum);
      }

      // number validation
      Configurator.#addInvalidLabel($wrapper, 'number', 'validation_invalid_number');
      validations.push('number');
    }
    else if (!object.textarea) {
      $input.setAttribute('type', 'text');
    }

    // dynamically adjust the textarea height based on the length of the content,
    // replace with CSS field-sizing once supported by Firefox
    if (object.textarea) {
      const borderSize = 4;
      Dom.addEventListener($input, 'input', e => {
        const $input = e.target;
        $input.style.height = 'auto';
        $input.style.height = `${$input.scrollHeight + borderSize}px`;
      });
    }

    // optional name
    if (object.name) {
      $input.setAttribute('data-name', object.name);
    }

    $input.setAttribute('id', domName);
    $input.setAttribute('placeholder', I18n.getMessage(object.placeholder));

    // common validations
    if (object.validations) {
      if (object.validations.includes('required')) {
        Configurator.#addInvalidLabel($wrapper, 'required', 'validation_required', true);
        $input.classList.add('invalid-input-style');
        validations.push('required');
      }

      if (object.validations.includes('json')) {
        Configurator.#addInvalidLabel($wrapper, 'json', 'validation_invalid_json');
        validations.push('json');
      }
    }

    // regex for custom validations
    if (object.regex?.pattern) {
      Configurator.#addInvalidLabel($wrapper, 'regex', object.regex.error);
      $input.setAttribute('data-regex-pattern', object.regex.pattern);
      validations.push('regex');
    }

    // add all the collected validations
    if (validations.length > 0) {
      $input.setAttribute('data-validations', validations.join(','));
    }

    // an empty value is allowed
    if (object.allow_empty_value) {
      $input.setAttribute('data-empty-value-allowed', 'true');
    }

    // filter to customize the output
    if (object.output_filter) {
      $input.setAttribute('data-output-filter', object.output_filter);
    }

    $wrapper.appendChild($input);

    if (type === 'number') {
      Configurator.#addNumberInputControls($wrapper);
    }

    $el.appendChild($wrapper);
  }

  /**
   * Add custom controls for numeric text fields.
   *
   * @param {HTMLElement} $wrapper - the wrapper of the input element
   *
   * @returns {void}
   */
  static #addNumberInputControls ($wrapper) {
    const $controls = document.createElement('div');
    const iconSize = 10;
    const decrementIconHeight = 2;

    $controls.classList.add('number-input-controls');
    $wrapper.appendChild($controls);

    for (const action of ['decrement', 'increment']) {
      const $button = document.createElement('button');
      const label = I18n.getMessage('number_input_' + action);

      $button.setAttribute('type', 'button');
      $button.setAttribute('aria-label', label);
      $button.setAttribute('title', label);
      $button.setAttribute('data-action', action);
      $button.classList.add('number-input-control');
      $controls.appendChild($button);

      const $icon = document.createElement('img');
      $icon.src = action === 'decrement' ? '/images/minus.svg' : '/images/plus.svg';
      $icon.width = iconSize;
      $icon.height = action === 'decrement' ? decrementIconHeight : iconSize;
      $icon.alt = '';
      $icon.classList.add('action-img');
      $button.appendChild($icon);
    }
  }

  /**
   * Keep pointer clicks on number controls from stealing focus from the input field.
   *
   * @param {MouseEvent} e - event object
   *
   * @returns {void}
   */
  static #preserveNumberInputFocus (e) {
    if (e.target.closest('.number-input-control')) {
      e.preventDefault();
    }
  }

  /**
   * Increment or decrement a numeric text field.
   *
   * @param {PointerEvent} e - event object
   *
   * @returns {void}
   */
  static #executeNumberInputAction (e) {
    const $button = e.target.closest('.number-input-control');

    if (!$button) {
      return;
    }

    const $input = $button.closest('.number-wrapper').querySelector('input');
    const min = parseInt($input.getAttribute('data-minimum') ?? '0');
    const max = $input.hasAttribute('data-maximum') ? parseInt($input.getAttribute('data-maximum')) : null;
    let value = Configurator.#isValidNumber($input.value) ? parseInt($input.value) : 0;

    e.preventDefault();

    value += $button.getAttribute('data-action') === 'increment' ? 1 : -1;
    value = Math.max(value, min);

    if (max !== null) {
      value = Math.min(value, max);
    }

    $input.value = value.toString();
    $input.dispatchEvent(new Event('input'));
    $input.focus();
  }

  /**
   * Initializes a sortable interaction for the given array wrapper element.
   *
   * @param {HTMLElement} $wrapper - the wrapper element containing sortable items
   *
   * @returns {void}
   */
  static #initSortable ($wrapper) {
    new Sortable($wrapper, {
      itemSelector: '.array-container',
      onUpdate: () => {
        Configurator.#updateArrayIndices($wrapper);
      }
    });
  }

  /**
   * Add remove and add buttons for arrays.
   *
   * @param {HTMLElement} $container - the DOM node of the container element
   * @param {string} parentName - the name of the parent object
   *
   * @returns {void}
   */
  static #addArrayActionButtons ($container, parentName) {
    // handle element
    const $handleButton = document.createElement('button');
    const label = I18n.getMessage('array_sort_a11y_drag_handle_label', ['1']);

    $handleButton.setAttribute('type', 'button');
    $handleButton.setAttribute('aria-label', label);
    $handleButton.setAttribute('aria-disabled', 'true');
    $handleButton.setAttribute('tabindex', '-1');
    $handleButton.classList.add('sortable-handle', 'disabled');
    $container.insertBefore($handleButton, $container.firstElementChild);

    // remove button
    const $removeButton = document.createElement('button');
    $removeButton.setAttribute('type', 'button');
    $removeButton.setAttribute('data-action', 'remove');
    $removeButton.setAttribute('aria-label', I18n.getMessage('title_remove_item'));
    $removeButton.setAttribute('aria-disabled', 'true');
    $removeButton.setAttribute('tabindex', '-1');
    $removeButton.classList.add('array-action', 'disabled-button');
    $container.appendChild($removeButton);

    const $removeIcon = document.createElement('img');
    $removeIcon.src = '/images/minus.svg';
    $removeIcon.width = 10;
    $removeIcon.height = 2;
    $removeIcon.alt = '';
    $removeIcon.classList.add('action-img');
    $removeButton.appendChild($removeIcon);

    // add button
    const $addButton = document.createElement('button');
    const addItemLabel = I18n.getMessage('title_add_item');
    $addButton.setAttribute('type', 'button');
    $addButton.setAttribute('data-action', 'add');
    $addButton.setAttribute('data-name', parentName);
    $addButton.setAttribute('title', addItemLabel);
    $addButton.setAttribute('aria-label', addItemLabel);
    $addButton.classList.add('array-action');
    $container.appendChild($addButton);

    const $addIcon = document.createElement('img');
    $addIcon.src = '/images/plus.svg';
    $addIcon.classList.add('action-img');
    $addIcon.width = 10;
    $addIcon.height = 10;
    $addIcon.alt = '';
    $addButton.appendChild($addIcon);
  }

  /**
   * Execute the add and remove actions for arrays.
   *
   * @param {MouseEvent} e - the click event
   *
   * @returns {void}
   */
  static #executeArrayActions (e) {
    switch (e.target.getAttribute('data-action')) {
      case 'add':
        Configurator.#addArrayItem(e.target);
        break;
      case 'remove':
        Configurator.#removeArrayItem(e.target);
        break;
      default:
      // do nothing
    }
  }

  /**
   * Execute the add action for arrays.
   *
   * @param {HTMLElement} $el - the DOM element of the "add" button
   *
   * @returns {void}
   */
  static #addArrayItem ($el) {
    const $wrapper = $el.closest('.array-wrapper');
    const $container = $el.closest('.array-container');
    const $handleButton = $container.querySelector(':scope > .sortable-handle');
    const $removeButton = $container.querySelector(':scope > [data-action="remove"]');

    // after adding a new array item, the handle button of the first one should no longer be disabled
    if ($handleButton.classList.contains('disabled')) {
      $handleButton.removeAttribute('aria-disabled');
      $handleButton.removeAttribute('tabindex');
      $handleButton.setAttribute('title', I18n.getMessage('title_move_item'));
      $handleButton.classList.remove('disabled');
    }

    // after adding a new array item, the remove button of the first one should no longer be disabled
    if ($removeButton.classList.contains('disabled-button')) {
      $removeButton.removeAttribute('aria-disabled');
      $removeButton.removeAttribute('tabindex');
      $removeButton.setAttribute('title', I18n.getMessage('title_remove_item'));
      $removeButton.classList.remove('disabled-button');
    }

    // clone the original array item
    const $addedNode = Dom.cloneNode($container);
    const $nestedArrayWrappers = $addedNode.querySelectorAll('.array-wrapper');

    // for the cloned element, we do not want to have more than one item in subarrays by default
    $addedNode.querySelectorAll('.array-container:not(:first-child)').forEach($el => {
      // untrack event listeners before removing the element
      $el.querySelectorAll('[data-validations]').forEach($el => {
        Dom.removeEventListener($el, 'input', Configurator.#validateInputField);
      });

      $el.querySelectorAll(':scope > .array-action').forEach($el => {
        Dom.removeEventListener($el, 'click', Configurator.#executeArrayActions);
      });

      // remove the subarray item
      $el.remove();
    });

    // we want empty fields for the copied array item
    $addedNode.querySelectorAll('input, textarea').forEach($el => {
      if ($el.getAttribute('type') === 'checkbox') {
        $el.checked = false;
      }
      else {
        $el.value = '';
      }

      // dispatch input event to trigger validation
      $el.dispatchEvent(new Event('input'));
    });

    // sortable arrays
    $nestedArrayWrappers.forEach($wrapper => {
      Configurator.#initSortable($wrapper);
    });

    // add the cloned array item to the DOM
    $el.parentElement.after($addedNode);

    // update the indices of all array items
    Configurator.#updateArrayIndices($wrapper);

    // set focus to the first input or select field of the newly added array item
    const $firstInputField = $addedNode.querySelector('input, select');

    if ($firstInputField) {
      $firstInputField.focus();
    }
  }

  /**
   * Execute the remove action for arrays.
   *
   * @param {HTMLElement} $el - the DOM element of the "remove" button
   *
   * @returns {void}
   */
  static #removeArrayItem ($el) {
    // skip for disabled buttons
    if ($el.classList.contains('disabled-button')) {
      return;
    }

    const $wrapper = $el.closest('.array-wrapper');
    const $container = $el.closest('.array-container');
    const $previousSibling = $container.previousElementSibling;

    // untrack event listeners before removing the container element
    $container.querySelectorAll('[data-validations]').forEach($el => {
      Dom.removeEventListener($el, 'input', Configurator.#validateInputField);
    });

    $container.querySelectorAll('.array-action').forEach($el => {
      Dom.removeEventListener($el, 'click', Configurator.#executeArrayActions);
    });

    // remove the container element
    $container.remove();

    const $containers = $wrapper.querySelectorAll(':scope > .array-container');

    if ($containers.length === 1) {
      // disable the handle button for the last array item
      const $handleButton = $containers[0].querySelector(':scope > .sortable-handle');
      $handleButton.setAttribute('aria-disabled', 'true');
      $handleButton.setAttribute('tabindex', '-1');
      $handleButton.removeAttribute('title');
      $handleButton.classList.add('disabled');

      // disable the remove button for the last array item
      const $removeButton = $containers[0].querySelector(':scope > [data-action="remove"]');
      $removeButton.setAttribute('aria-disabled', 'true');
      $removeButton.setAttribute('tabindex', '-1');
      $removeButton.removeAttribute('title');
      $removeButton.classList.add('disabled-button');
    }

    // set focus to the previous element, or the first one, if there is no previous element
    if ($previousSibling && $previousSibling.classList.contains('array-container')) {
      $previousSibling.querySelector('input, select').focus();
    }
    else {
      $containers[0].querySelector('input, select').focus();
    }

    // update the indices of all array items
    Configurator.#updateArrayIndices($wrapper);
  }

  /**
   * Update the DOM IDs of the array items to make sure that there is a consistent order.
   *
   * @param {HTMLElement} $wrapper - the wrapper element of the array container elements
   *
   * @returns {void}
   */
  static #updateArrayIndices ($wrapper) {
    const $containers = $wrapper.querySelectorAll(':scope > .array-container');
    const parentName = $containers[0]?.querySelector(':scope > .array-action[data-name]')?.getAttribute('data-name');

    $containers.forEach(($container, idx) => {
      const $handleButton = $container.querySelector(':scope > .sortable-handle');
      const label = I18n.getMessage('array_sort_a11y_drag_handle_label', (idx + 1).toString());
      $handleButton.setAttribute('aria-label', label);

      if (parentName) {
        const index = (idx + 1).toString();

        $container.querySelectorAll('[id]').forEach($el => {
          $el.id = Configurator.#replaceArrayIndex($el.id, parentName, index);
        });

        $container.querySelectorAll('label[for]').forEach($el => {
          $el.setAttribute(
            'for',
            Configurator.#replaceArrayIndex($el.getAttribute('for'), parentName, index)
          );
        });

        $container.querySelectorAll('input[name]').forEach($el => {
          $el.name = Configurator.#replaceArrayIndex($el.name, parentName, index);
        });

        $container.querySelectorAll('.array-action[data-name]').forEach($el => {
          $el.setAttribute(
            'data-name',
            Configurator.#replaceArrayIndex($el.getAttribute('data-name'), parentName, index)
          );
        });
      }
    });
  }

  /**
   * Replace the array index for a specific array level in a generated DOM identifier.
   *
   * @param {string} value - DOM identifier or data-name value
   * @param {string} parentName - generated name of the array wrapper
   * @param {string} index - new one-based array index
   *
   * @returns {string} - identifier with the array index replaced
   */
  static #replaceArrayIndex (value, parentName, index) {
    const marker = `${parentName}_array_`;
    const markerStart = value.indexOf(marker);

    if (markerStart === -1) {
      return value;
    }

    const indexStart = markerStart + marker.length;
    const indexEnd = value.indexOf('_', indexStart);

    if (indexEnd === -1) {
      return value;
    }

    return value.slice(0, indexStart) + index + value.slice(indexEnd);
  }

  /**
   * Add a key input field.
   *
   * @param {HTMLElement} $container - the DOM element of the container
   * @param {string} parentName - the name of the parent object
   * @param {object} key - the key object
   *
   * @returns {void}
   */
  static #addObjectKey ($container, parentName, key) {
    const $keyWrapper = document.createElement('div');
    $keyWrapper.classList.add('key-wrapper');

    // fixed value
    if (key.value) {
      $keyWrapper.setAttribute('data-value', key.value);
    }
    // input field
    else {
      const validations = [];
      const $input = document.createElement('input');
      $input.setAttribute('type', 'text');
      $input.setAttribute('id', parentName + '_key');
      $input.classList.add('invalid-input-style');

      Configurator.#addInvalidLabel($keyWrapper, 'required', 'validation_required', true);
      validations.push('required');

      if (key.validations?.includes('preference')) {
        Configurator.#addInvalidLabel($keyWrapper, 'preference', 'non_allowed_preference_label');
        validations.push('preference');
      }

      $input.setAttribute('data-validations', validations.join(','));

      if (key.placeholder) {
        $input.setAttribute('placeholder', I18n.getMessage(key.placeholder));
      }

      $keyWrapper.appendChild($input);
    }

    $container.appendChild($keyWrapper);
  }

  /**
   * Add the lock option.
   *
   * @param {HTMLElement} $options - the DOM element for the options
   * @param {string} parentName - the name of the parent object
   *
   * @returns {void}
   */
  static #addLockOption ($options, parentName) {
    const $checkbox = document.createElement('input');
    $checkbox.setAttribute('type', 'checkbox');
    $checkbox.setAttribute('id', parentName + '_Locked');
    $checkbox.setAttribute('name', parentName + '_Locked');
    $checkbox.classList.add('lock-checkbox');
    $options.appendChild($checkbox);

    const $label = document.createElement('label');
    $label.setAttribute('for', parentName + '_Locked');
    $label.textContent = I18n.getMessage('lock_preference');
    $options.appendChild($label);
  }

  /**
   * Add a label.
   *
   * @param {HTMLElement} $container - the DOM element of the container
   * @param {string} label - text content
   * @param {?string} id - DOM id of the input element, used for the label's "for" attribute
   *
   * @returns {void}
   */
  static #addLabel ($container, label, id = null) {
    const $label = document.createElement(id ? 'label' : 'div');

    if (id) {
      $label.setAttribute('for', id);
    }

    $label.classList.add('label');
    $label.textContent = I18n.getMessage(label);
    $container.appendChild($label);
  }

  /**
   * Add an info text.
   *
   * @param {HTMLElement} $container - the DOM element of the container
   * @param {string} message - text content
   * @param {string} icon - icon file name
   * @param {string} className - additional class name
   *
   * @returns {void}
   */
  static #addInfoText ($container, message, icon, className = '') {
    const $wrapper = document.createElement('div');
    $wrapper.classList.add('info-text');

    if (className) {
      $wrapper.classList.add(className);
    }

    $container.appendChild($wrapper);

    const $image = document.createElement('img');
    $image.src = '/images/' + icon + '.svg';
    $image.width = 18;
    $image.height = 18;
    $image.alt = '';
    $wrapper.appendChild($image);

    const $text = document.createTextNode(message);
    $wrapper.appendChild($text);
  }

  /**
   * Add a link.
   *
   * @param {HTMLElement} $container - the DOM element of the container
   * @param {string} link - URL of the info link
   *
   * @returns {void}
   */
  static #addLink ($container, link) {
    const $wrapper = document.createElement('div');
    $wrapper.classList.add('info-text');
    $container.appendChild($wrapper);

    const $link = document.createElement('a');
    $link.setAttribute('href', link);
    $link.setAttribute('target', '_blank');
    $wrapper.appendChild($link);

    const $image = document.createElement('img');
    $image.src = '/images/link.svg';
    $image.width = 18;
    $image.height = 18;
    $image.alt = '';
    $link.appendChild($image);

    const $label = document.createTextNode(I18n.getMessage('link_learn_more'));
    $link.appendChild($label);
  }

  /**
   * Add a label for invalid field inputs.
   *
   * @param {HTMLElement} $wrapper - the DOM element of the container element
   * @param {string} type - the type of the validation
   * @param {string} message - the translation key of the error message
   * @param {boolean} showByDefault - whether the label should be shown by default. Defaults to false
   *
   * @returns {void}
   */
  static #addInvalidLabel ($wrapper, type, message, showByDefault = false) {
    const $label = document.createElement('div');
    $label.classList.add('invalid-input-label');

    if (!showByDefault) {
      $label.classList.add('hidden');
    }

    $label.setAttribute('data-type', type);
    $label.textContent = I18n.getMessage(message);
    $wrapper.appendChild($label);
  }

  /**
   * Validate an input field.
   *
   * @param {KeyboardEvent} e - the keyboard event
   *
   * @returns {void}
   */
  static #validateInputField (e) {
    const $el = e.target;
    const $parentEl = $el.parentElement;
    const validations = $el.getAttribute('data-validations').split(',');
    const { value } = $el;
    let valid = true;

    if (validations.includes('required')) {
      if (!value) {
        $parentEl.querySelector('.invalid-input-label[data-type=required]').classList.remove('hidden');
        valid = false;
      }
      else {
        $parentEl.querySelector('.invalid-input-label[data-type=required]').classList.add('hidden');
      }
    }

    if (validations.includes('url')) {
      const schemes = $el.getAttribute('data-url-schemes')?.split(',') || ['file', 'http', 'https'];

      if (value && !Configurator.#isValidURL(value, schemes)) {
        $parentEl.querySelector('.invalid-input-label[data-type=url]').classList.remove('hidden');
        valid = false;
      }
      else {
        $parentEl.querySelector('.invalid-input-label[data-type=url]').classList.add('hidden');
      }
    }

    if (validations.includes('number')) {
      if (value && !Configurator.#isValidNumber(
        value, $el.getAttribute('data-minimum'), $el.getAttribute('data-maximum')
      )) {
        $parentEl.querySelector('.invalid-input-label[data-type=number]').classList.remove('hidden');
        valid = false;
      }
      else {
        $parentEl.querySelector('.invalid-input-label[data-type=number]').classList.add('hidden');
      }
    }

    if (validations.includes('preference')) {
      if (value && !Configurator.#isValidPreference(value)) {
        $parentEl.querySelector('.invalid-input-label[data-type=preference]').classList.remove('hidden');
        valid = false;
      }
      else {
        $parentEl.querySelector('.invalid-input-label[data-type=preference]').classList.add('hidden');
      }
    }

    if (validations.includes('json')) {
      if (value && !Configurator.#isValidJson(value)) {
        $parentEl.querySelector('.invalid-input-label[data-type=json]').classList.remove('hidden');
        valid = false;
      }
      else {
        $parentEl.querySelector('.invalid-input-label[data-type=json]').classList.add('hidden');
      }
    }

    if (validations.includes('regex')) {
      if (value && !Configurator.#isValidStringByPattern(value, $el.getAttribute('data-regex-pattern'))) {
        $parentEl.querySelector('.invalid-input-label[data-type=regex]').classList.remove('hidden');
        valid = false;
      }
      else {
        $parentEl.querySelector('.invalid-input-label[data-type=regex]').classList.add('hidden');
      }
    }

    if (valid) {
      $el.classList.remove('invalid-input-style');
    }
    else {
      $el.classList.add('invalid-input-style');
    }
  }

  /**
   * Validation for an URL field.
   *
   * @param {string} string - the string to check
   * @param {Array.<string>} schemes - the allowed URL schemes
   *
   * @returns {boolean} - whether the given string is a valid URL
   */
  static #isValidURL (string, schemes) {
    const normalizedString = string.toLowerCase();
    const schemesRequiringSlashes = ['file', 'http', 'https'];

    return schemes.some(scheme => {
      const normalizedScheme = scheme.toLowerCase();

      if (normalizedScheme === 'data') {
        return normalizedString.startsWith('data:image/');
      }

      if (schemesRequiringSlashes.includes(normalizedScheme)) {
        return normalizedString.startsWith(`${normalizedScheme}://`);
      }

      return normalizedString.startsWith(`${normalizedScheme}:`);
    });
  }

  /**
   * Validation for a number field.
   *
   * @param {string} value - the value to check
   * @param {?string} min - the minimum allowed value
   * @param {?string} max - the maximum allowed value
   *
   * @returns {boolean} - whether the given name is a valid number
   */
  static #isValidNumber (value, min = null, max = null) {
    const regexp = new RegExp(/^\d+$/, 'gi');

    if (!regexp.test(value)) {
      return false;
    }

    const number = parseInt(value);

    if (min !== null && number < parseInt(min)) {
      return false;
    }

    if (max !== null && number > parseInt(max)) {
      return false;
    }

    return true;
  }

  /**
   * Validation for a preference field.
   *
   * @param {string} name - the preference name to check
   *
   * @returns {boolean} - whether the given name is a valid preference
   */
  static #isValidPreference (name) {
    if (!name) {
      return true;
    }

    if (Configurator.#disallowedPreferences.includes(name)) {
      return false;
    }

    return Configurator.#allowedPreferences.some(prefix => {
      if (prefix.endsWith('.')) {
        return name.startsWith(prefix) && name !== prefix;
      }

      return name === prefix;
    });
  }

  /**
   * Validation for a string field by RegExp pattern.
   *
   * @param {string} text - the string to check
   * @param {string} pattern - the string to check
   *
   * @returns {boolean} - whether the given string is a valid string
   */
  static #isValidStringByPattern (text, pattern) {
    const regexp = new RegExp(pattern, 'gi');

    return regexp.test(text);
  }

  /**
   * Validation for a JSON field.
   *
   * @param {string} content - the text content to check
   *
   * @returns {boolean} - whether the given content is valid JSON
   */
  static #isValidJson (content) {
    let valid = true;
    try {
      JSON.parse(content.replace(/\n/g, ''));
    }
    catch (e) {
      valid = false;
    }

    return valid;
  }

  /**
   * Test if the "downloads" permission has been granted. If granted, the link for granting the permission will be
   * hidden and the real download link will be shown.
   *
   * @returns {void}
   */
  static async #testDownloadPermission () {
    const granted = await browser.permissions.contains(DOWNLOAD_PERMISSION);

    // if the "downloads" permission is granted, hide the link for granting permission and show the
    // real download link instead
    if (granted) {
      $grantDownloadPermissionLink.classList.add('hidden');
      $downloadButton.classList.remove('hidden');
    }
  }

  /**
   * Action for downloading the "policies.json" file.
   *
   * @returns {void}
   */
  static async #downloadPolicy () {
    const url = URL.createObjectURL(new Blob([PolicyManager.getConfiguration()]));

    try {
      await browser.downloads.download({
        saveAs: true,
        url: url,
        filename: 'policies.json'
      });
    }
    finally {
      URL.revokeObjectURL(url);
    }
  }

  /**
   * Setup for the filter field.
   *
   * @returns {void}
   */
  static #filterField () {
    const $filterWrapper = document.getElementById('filter-wrapper');
    const $filter = $filterWrapper.querySelector('input');
    const $openButton = $filterWrapper.querySelector('.open-filter');
    const $closeButton = $filterWrapper.querySelector('.close-filter');

    // re-apply active filter on reload
    Configurator.#applySearchFieldFilter($filter);

    const updateFilterState = () => {
      const isOpen = $filterWrapper.classList.contains('open');

      $filter.tabIndex = isOpen ? 0 : -1;
      $openButton.tabIndex = isOpen ? -1 : 0;
      $closeButton.tabIndex = isOpen ? 0 : -1;
      $filter.setAttribute('aria-hidden', (!isOpen).toString());
      $openButton.setAttribute('aria-expanded', isOpen.toString());
      $openButton.setAttribute('aria-hidden', isOpen.toString());
      $closeButton.setAttribute('aria-hidden', (!isOpen).toString());
    };

    const open = (focus = true) => {
      $filterWrapper.classList.add('open');
      updateFilterState();

      if (focus) {
        $filter.focus();
      }
    };

    const close = restoreFocus => {
      if (!$filterWrapper.classList.contains('open')) {
        return;
      }

      $filter.value = '';
      $filterWrapper.classList.remove('open');
      updateFilterState();
      Configurator.#applySearchFieldFilter($filter);

      if (restoreFocus) {
        $openButton.focus();
      }
    };

    if ($filter.value) {
      $filterWrapper.classList.add('no-transition');
      open(false);

      window.requestAnimationFrame(() => {
        $filterWrapper.classList.remove('no-transition');
      });
    }
    else {
      updateFilterState();
    }

    $openButton.addEventListener('click', open);

    window.addEventListener('keydown', e => {
      if (e.shiftKey && e.key === 'F' && !['text', 'textarea', 'url'].includes(document.activeElement.type)) {
        e.preventDefault();
        open();
      }
      else if (e.key === 'Escape' && document.activeElement === $filter) {
        close(false);
        $filter.blur();
      }
    });

    $closeButton.addEventListener('click', () => {
      close(true);
    });

    $filter.addEventListener('input', () => {
      Configurator.#applySearchFieldFilter($filter);
    });
  }

  /**
   * Show or hide polices based on the filter value.
   *
   * @param {HTMLInputElement} $filter - the input element of the filter field
   *
   * @returns {void}
   */
  static #applySearchFieldFilter ($filter) {
    const filterValue = $filter.value.trim();
    const normalizedFilterValue = filterValue.toLocaleLowerCase();
    const matchesFilter = text => text.toLocaleLowerCase().includes(normalizedFilterValue);

    document.querySelectorAll('.policy-container').forEach($policy => {
      Configurator.#clearFilterMatches($policy);

      $policy.querySelectorAll(':scope > label').forEach($label => {
        const name = $policy.getAttribute('data-name');
        let hasMatch = normalizedFilterValue === '';
        let hasTopLevelMatch = false;

        if (normalizedFilterValue) {
          const hasLabelMatch = Configurator.#highlightFilterText($label, filterValue);
          const hasNameMatch = matchesFilter(name);
          hasTopLevelMatch = hasLabelMatch || hasNameMatch;
          hasMatch = hasTopLevelMatch;

          if (hasNameMatch) {
            Configurator.#addFilterMatchBadge($label, name);
          }

          // search through the options
          $policy.querySelectorAll('.options [data-name]:not(.array-action)').forEach($el => {
            const optionName = $el.getAttribute('data-name');
            const $optionTarget = Configurator.#getFilterMatchTarget($policy, $el);
            const hasOptionLabelMatch = $optionTarget?.matches('.label, .object-label, label') &&
              Configurator.#highlightFilterText($optionTarget, filterValue);
            const hasOptionNameMatch = matchesFilter(optionName);

            if (hasOptionNameMatch || hasOptionLabelMatch) {
              hasMatch = true;

              if ($optionTarget) {
                Configurator.#addFilterMatchBadge($optionTarget, optionName);
              }
            }
          });
        }

        if (hasMatch) {
          $policy.classList.remove('hidden');
        }
        else {
          $policy.classList.add('hidden');
        }
      });
    });
  }

  /**
   * Remove filter highlights and badges from an element.
   *
   * @param {HTMLElement} $el - the element to clean up
   *
   * @returns {void}
   */
  static #clearFilterMatches ($el) {
    $el.querySelectorAll('.filter-match-badge-wrapper').forEach($badge => $badge.remove());
    $el.querySelectorAll('.filter-match-badge').forEach($badge => $badge.remove());

    $el.querySelectorAll('.filter-highlight').forEach($highlight => {
      const $parent = $highlight.parentNode;
      $highlight.replaceWith(document.createTextNode($highlight.textContent));
      $parent.normalize();
    });
  }

  /**
   * Highlight matching visible text inside an element.
   *
   * @param {HTMLElement} $el - the element containing visible text
   * @param {string} filterValue - the text to highlight
   *
   * @returns {boolean} - whether a match was highlighted
   */
  static #highlightFilterText ($el, filterValue) {
    if ($el.querySelector('.filter-highlight')) {
      return true;
    }

    const textNodes = [];
    const walker = document.createTreeWalker($el, NodeFilter.SHOW_TEXT, {
      acceptNode: node => {
        if (node.parentElement.closest('.filter-match-badge-wrapper')) {
          return NodeFilter.FILTER_REJECT;
        }

        return NodeFilter.FILTER_ACCEPT;
      }
    });
    const normalizedFilterValue = filterValue.toLocaleLowerCase();
    let node = walker.nextNode();
    let hasMatch = false;

    while (node) {
      textNodes.push(node);
      node = walker.nextNode();
    }

    textNodes.forEach(textNode => {
      const text = textNode.textContent;
      const normalizedText = text.toLocaleLowerCase();
      const matchIndex = normalizedText.indexOf(normalizedFilterValue);

      if (matchIndex === -1) {
        return;
      }

      const fragment = document.createDocumentFragment();
      const $highlight = document.createElement('mark');
      $highlight.classList.add('filter-highlight');
      $highlight.textContent = text.substring(matchIndex, matchIndex + filterValue.length);
      fragment.append(
        document.createTextNode(text.substring(0, matchIndex)),
        $highlight,
        document.createTextNode(text.substring(matchIndex + filterValue.length))
      );
      textNode.replaceWith(fragment);
      hasMatch = true;
    });

    return hasMatch;
  }

  /**
   * Find the visible target that best represents a filter match.
   *
   * @param {HTMLElement} $policy - the policy container
   * @param {HTMLElement} $el - the matching element
   *
   * @returns {?HTMLElement} - the target element or null
   */
  static #getFilterMatchTarget ($policy, $el) {
    if ($el.id) {
      const $label = Array.from($policy.querySelectorAll('label')).find($label => $label.htmlFor === $el.id);

      if ($label) {
        return $label;
      }
    }

    if ($el.previousElementSibling?.matches('.label, .object-label')) {
      return $el.previousElementSibling;
    }

    const $innerLabel = $el.querySelector(':scope .label, :scope .object-label');

    if ($innerLabel) {
      return $innerLabel;
    }

    const $fieldWrapper = $el.closest('.input-wrapper, .key-wrapper, .enum-wrapper');

    if ($fieldWrapper) {
      return $fieldWrapper;
    }

    return null;
  }

  /**
   * Add a badge for matches that come from technical property names.
   *
   * @param {HTMLElement} $el - the element the badge should be appended to
   * @param {string} text - the badge text
   *
   * @returns {void}
   */
  static #addFilterMatchBadge ($el, text) {
    const $wrapper = document.createElement('span');
    const $badge = document.createElement('span');
    $wrapper.classList.add('filter-match-badge-wrapper');
    $badge.classList.add('filter-match-badge');
    $badge.textContent = text;
    $wrapper.append(document.createTextNode(' '), $badge);
    $el.appendChild($wrapper);
  }
}

Configurator.init();
