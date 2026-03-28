'use strict';

/* global Dom, I18n, Output, Sortable */

/** @type {browser.permissions.Permissions} */
const DOWNLOAD_PERMISSION = { permissions: ['downloads'] };

/** @type {int} */
const FILTER_ANIMATION_DELAY_IN_MS = 1500;

/** @type {number} */
const MINIMUM_SUPPORTED_VERSION = 140.0;

const $actionLinks = document.getElementById('action-links');
const $downloadLink = document.getElementById('download');
const $generatorForm = document.getElementById('generator-form');
const $grantDownloadPermissionLink = document.getElementById('grant-download-permission');
const $policyGeneratorButton = document.getElementById('generate');
const $policyOutput = document.getElementById('policy-output');
const $copyToClipboardButton = document.getElementById('copy-to-clipboard');

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

    // add event listeners for array actions (add / remove buttons)
    document.querySelectorAll('.array-action').forEach($el => {
      Dom.addEventListener($el, 'click', Configurator.#executeArrayActions);
    });

    // only supported in Firefox 148+
    if (!('Sanitizer' in window)) {
      // remove the gap for the line numbers if syntax highlighting is disabled
      $policyOutput.parentElement.classList.add('no-syntax-highlighting');
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

      $actionLinks.classList.remove('hidden');
    });

    // focus the "generate policies" button via keyboard shortcut
    window.addEventListener('keydown', e => {
      if (e.shiftKey && e.key === 'G' && !['text', 'textarea', 'url'].includes(document.activeElement.type)) {
        $policyGeneratorButton.focus();
      }
    });

    // add the event listener for the "copy to clipboard" button
    $copyToClipboardButton.addEventListener('click', () => {
      // select code
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents($policyOutput);
      selection.removeAllRanges();
      selection.addRange(range);

      // copy code to clipboard
      navigator.clipboard.writeText($policyOutput.innerText);
    });

    // add the event listener for the "download policies.json" button if downloads permission is not granted
    $grantDownloadPermissionLink.addEventListener('click', async () => {
      const granted = await browser.permissions.request(DOWNLOAD_PERMISSION);

      // immediately prompt for download after the downloads permission has been granted
      if (granted) {
        Configurator.#downloadPolicy();
      }
    });

    // add the event listener for the "download policies.json" link if downloads permission is granted
    $downloadLink.addEventListener('click', () => {
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
        const name = parentName + '_' + property.name;
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

    const isUrlType = object.validations?.some(type => ['secure-url', 'url', 'url-or-data'].includes(type));
    const isNumberType = object.validations?.includes('number');
    const type = isUrlType ? 'url' : isNumberType ? 'number' : 'text';
    const validations = [];
    const domName = parentName + '_input';

    // optional key
    if (object.key) {
      Configurator.#addObjectKey($el, parentName, object.key);
    }

    // label
    if (object.label) {
      Configurator.#addLabel($el, object.label, domName);
    }

    // input field
    const $input = document.createElement(object.textarea ? 'textarea' : 'input');

    if (type === 'url') {
      $input.setAttribute('type', 'url');

      // url validations
      Configurator.#addInvalidLabel($wrapper, 'url', 'validation_invalid_url');
      validations.push('url');

      if (object.validations) {
        if (object.validations.includes('secure-url')) {
          $input.setAttribute('data-secure', 'true');
        }
        else if (object.validations.includes('url-or-data')) {
          $input.setAttribute('data-data-uri-allowed', 'true');
        }
      }
    }
    else if (type === 'number') {
      $input.setAttribute('type', 'text');
      $input.setAttribute('inputmode', 'numeric');
      $input.setAttribute('pattern', '[0-9]*');

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

    // filter to customize the output
    if (object.output_filter) {
      $input.setAttribute('data-output-filter', object.output_filter);
    }

    $wrapper.appendChild($input);
    $el.appendChild($wrapper);
  }

  /**
   * Initializes a sortable interaction for the given array wrapper element.
   *
   * @param {HTMLElement} $wrapper - the wrapper element containing sortable items.
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
    $removeButton.setAttribute('aria-disabled', 'true');
    $removeButton.setAttribute('tabindex', '-1');
    $removeButton.classList.add('array-action', 'disabled-button');
    $container.appendChild($removeButton);

    const $removeIcon = document.createElement('img');
    $removeIcon.src = '/images/minus.svg';
    $removeIcon.width = 10;
    $removeIcon.height = 2;
    $removeIcon.alt = I18n.getMessage('title_remove_item');
    $removeIcon.classList.add('action-img');
    $removeButton.appendChild($removeIcon);

    // add button
    const $addButton = document.createElement('button');
    $addButton.setAttribute('type', 'button');
    $addButton.setAttribute('data-action', 'add');
    $addButton.setAttribute('data-name', parentName);
    $addButton.setAttribute('title', I18n.getMessage('title_add_item'));
    $addButton.classList.add('array-action');
    $container.appendChild($addButton);

    const $addIcon = document.createElement('img');
    $addIcon.src = '/images/plus.svg';
    $addIcon.classList.add('action-img');
    $addIcon.width = 10;
    $addIcon.height = 10;
    $addIcon.alt = I18n.getMessage('title_add_item');
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

    $containers.forEach(($container, idx) => {
      const $handleButton = $container.querySelector(':scope > .sortable-handle');
      const label = I18n.getMessage('array_sort_a11y_drag_handle_label', (idx + 1).toString());
      $handleButton.setAttribute('aria-label', label);

      $container.querySelectorAll(':scope > div > [id], :scope > div > div > [id]').forEach($el => {
        // update the index of the last occurrence
        $el.id = $el.id.replace(/(_array_)\d+(_)(?!.*\1)/, `$1${idx + 1}$2`);
      });

      // for nested arrays, update the first array index
      $container.querySelectorAll('.array-container')?.forEach($el => {
        $el.querySelectorAll(':scope > div > [id], :scope > div > div > [id]').forEach($el => {
          $el.id = $el.id.replace(/(_array_)\d+(_)/, `$1${idx + 1}$2`);
        });

        $el.querySelectorAll(':scope > .array-action[data-name]').forEach($el => {
          const name = $el.getAttribute('data-name');
          $el.setAttribute('data-name', name.replace(/(_array_)\d+(_)/, `$1${idx + 1}$2`));
        });
      });
    });
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
   *
   * @returns {void}
   */
  static #addInfoText ($container, message, icon) {
    const $wrapper = document.createElement('div');
    $wrapper.classList.add('info-text');
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
      const dataUriAllowed = $el.getAttribute('data-data-uri-allowed') === 'true';
      const secure = $el.getAttribute('data-secure') === 'true';

      if (value && !Configurator.#isValidURL(value, secure, dataUriAllowed)) {
        $parentEl.querySelector('.invalid-input-label[data-type=url]').classList.remove('hidden');
        valid = false;
      }
      else {
        $parentEl.querySelector('.invalid-input-label[data-type=url]').classList.add('hidden');
      }
    }

    if (validations.includes('number')) {
      if (value && !Configurator.#isValidNumber(value)) {
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
   * Validation for URL field.
   *
   * @param {string} string - the string to check
   * @param {boolean} secure - whether url must start with https://
   * @param {boolean} dataUriAllowed - whether data URIs are allowed
   *
   * @returns {boolean} - whether the given string is a valid URL
   */
  static #isValidURL (string, secure, dataUriAllowed) {
    let pattern = null;

    if (secure) {
      return string.toLowerCase().startsWith('https://');
    }

    if (dataUriAllowed) {
      pattern = new RegExp(/^((https?|file):\/\/|data:image\/)/, 'gi');
    }
    else {
      pattern = new RegExp(/^(https?|file):\/\//, 'gi');
    }

    return pattern.test(encodeURI(string));
  }

  /**
   * Validation for number field.
   *
   * @param {string} value - the value to check
   *
   * @returns {boolean} - whether the given name is a valid number
   */
  static #isValidNumber (value) {
    const regexp = new RegExp(/^\d+$/, 'gi');

    return regexp.test(value);
  }

  /**
   * Validation for preference field.
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
   * Validation for string field by RegExp pattern.
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
   * Validation for JSON field.
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
   * Test if the downloads permission has been granted. If granted, the link for granting the permission will be
   * hidden and the real download link will be shown.
   *
   * @returns {void}
   */
  static async #testDownloadPermission () {
    const granted = await browser.permissions.contains(DOWNLOAD_PERMISSION);

    // if the downloads permission is granted, hide the link for granting permission and show the
    // real download link instead
    if (granted) {
      $grantDownloadPermissionLink.classList.add('hidden');
      $downloadLink.classList.remove('hidden');
    }
  }

  /**
   * Action for downloading the "policies.json" file.
   *
   * @returns {void}
   */
  static async #downloadPolicy () {
    await browser.downloads.download({
      saveAs: true,
      url: URL.createObjectURL(new Blob([PolicyManager.getConfiguration()])),
      filename: 'policies.json'
    });
  }

  /**
   * Setup for the filter field.
   *
   * @returns {void}
   */
  static #filterField () {
    const $filterWrapper = document.getElementById('filter-wrapper');
    const $filter = $filterWrapper.querySelector('input');
    const $styleHelper = $filterWrapper.querySelector('button');

    // re-apply active filter on reload
    Configurator.#applySearchFieldFilter($filter);

    if ($filter.value) {
      $filterWrapper.classList.add('open');
    }

    const close = () => {
      if (!$filterWrapper.classList.contains('open')) {
        return;
      }

      $filter.value = '';

      $filterWrapper.classList.add('close');
      $filterWrapper.classList.remove('open');

      setTimeout(() => {
        $filterWrapper.classList.remove('close');
      }, FILTER_ANIMATION_DELAY_IN_MS);

      Configurator.#applySearchFieldFilter($filter);
    };

    $filter.addEventListener('focus', () => {
      if ($filterWrapper.classList.contains('open')) {
        return;
      }

      $filterWrapper.classList.add('in');

      setTimeout(() => {
        $filterWrapper.classList.add('open');
        $filterWrapper.classList.remove('in');
      }, FILTER_ANIMATION_DELAY_IN_MS);
    });

    window.addEventListener('keydown', e => {
      if (e.shiftKey && e.key === 'F' && !['text', 'textarea', 'url'].includes(document.activeElement.type)) {
        e.preventDefault();
        $filter.focus();
      }
      else if (e.key === 'Escape' && document.activeElement === $filter) {
        close();
        $filter.blur();
      }
    });

    $styleHelper.addEventListener('click', () => {
      close();
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
    const matcher = new RegExp($filter.value, 'i');

    document.querySelectorAll('.policy-container').forEach($policy => {
      $policy.querySelectorAll(':scope > label').forEach($label => {
        const name = $policy.getAttribute('data-name');
        let hasMatch = false;

        // top level matches
        if (matcher.test(name) || matcher.test($label.textContent)) {
          hasMatch = true;
        }
        // search through the options
        else {
          $policy.querySelectorAll('.options [data-name]').forEach($el => {
            const name = $el.getAttribute('data-name');
            const $label = $policy.querySelector(`[for="${$el.id}"]`);

            if (matcher.test(name) || matcher.test($label?.textContent)) {
              hasMatch = true;
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
}

Configurator.init();
