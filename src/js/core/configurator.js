'use strict';

/* global output, policies, policymanager */

const DOWNLOAD_PERMISSION = { permissions : ['downloads'] };
const FILTER_ANIMATION_DELAY_IN_MS = 1500;
const MINIMUM_SUPPORTED_VERSION = 115.0;

const elActionLinks = document.getElementById('action-links');
const elDownloadLink = document.getElementById('download');
const elGrantDownloadPermissionLink = document.getElementById('grant-download-permission');
const elPolicyGeneratorButton = document.getElementById('generate');
const elPolicyOutput = document.getElementById('policy-output');
const elSelectAllLink = document.getElementById('select-all');

/**
 * @exports configurator
 */
const configurator = {
  /**
   * Contains the UI categories.
   *
   * @type {Array.<HTMLElement>}
   */
  uiCategoryElements : [],

  /**
   * The init() method. Defines UI categories, adds policies to UI, setup all the event listeners.
   *
   * @param {boolean} unserializeStep - (optional) whether the extra step for the unserializer should be executed or not
   *
   * @returns {void}
   */
  init (unserializeStep) {
    // define ui categories
    const categories = [
      'block-access', 'disable-features', 'customization', 'network', 'privacy', 'security',
      'updates-and-data', 'others'
    ];

    const categoriesLength = categories.length;

    for (let i = 0; i < categoriesLength; i++) {
      // remove all policies from generator so that it can be re-added (used by unserializer)
      if (unserializeStep) {
        const node = document.getElementById('options-' + categories[i]);

        while (node.firstChild) {
          node.removeChild(node.firstChild);
        }
      }

      configurator.uiCategoryElements[categories[i]] = document.getElementById('options-' + categories[i]);
    }

    // iterate over polices from policies.js and call the appropriate option type for each policy
    for (const key in policies) {
      if (policies[key].type === 'array') {
        configurator.addArrayOption(key, policies[key]);
      }
      else if (policies[key].type === 'boolean') {
        configurator.addBooleanOption(key, policies[key], false);
      }
      else if (policies[key].type === 'boolean-inverse') {
        configurator.addBooleanOption(key, policies[key], true);
      }
      else if (policies[key].type === 'enum') {
        configurator.addEnumOption(key, policies[key]);
      }
      else if (policies[key].type === 'flat-array') {
        configurator.addFlatArrayOption(key, policies[key]);
      }
      else if (policies[key].type === 'json-array') {
        configurator.addJsonArrayOption(key, policies[key]);
      }
      else if (policies[key].type === 'key-object-list') {
        configurator.addKeyObjectListOption(key, policies[key]);
      }
      else if (policies[key].type === 'key-value-pairs') {
        configurator.addKeyValuePairsOption(key, policies[key]);
      }
      else if (policies[key].type === 'nested-object') {
        configurator.addNestedObjectOption(key, policies[key]);
      }
      else if (policies[key].type === 'object') {
        configurator.addObjectOption(key, policies[key]);
      }
      else if (policies[key].type === 'preference') {
        configurator.addPreferenceOption(key, policies[key]);
      }
      else if (policies[key].type === 'split-string') {
        configurator.addSplitStringOption(key, policies[key]);
      }
      else if (policies[key].type === 'split-url') {
        configurator.addSplitUrlOption(key, policies[key]);
      }
      else if (policies[key].type === 'string') {
        configurator.addStringOption(key, policies[key], 'string');
      }
      else if (policies[key].type === 'url') {
        configurator.addStringOption(key, policies[key], 'url');
      }
      else if (policies[key].type === 'version') {
        configurator.addStringOption(key, policies[key], 'version');
      }
    }

    // test if the download permission is granted or not
    configurator.testDownloadPermission();

    // show sub options for enabled policies and hide sub options for disabled policies
    [...document.querySelectorAll('.primary-checkbox')].forEach((el) => {
      const excludePolicy = el.getAttribute('data-exclude');

      el.addEventListener('change', () => {
        const elSubOptions = el.parentNode.getElementsByClassName('sub-options');
        const elExtraOptions = el.parentNode.getElementsByClassName('extra-options');

        if (elSubOptions.length > 0) {
          [...elSubOptions].forEach((el) => {
            el.classList.toggle('disabled');
          });

          // set focus to first input or select field after a policy checkbox has been checked
          if (!elSubOptions[0].classList.contains('disabled') && elExtraOptions.length === 0) {
            const firstInputField = elSubOptions[0].querySelector('input[type=text], input[type=url], select');

            if (firstInputField) {
              firstInputField.focus();
            }
          }
        }

        if (elExtraOptions.length > 0) {
          elExtraOptions[0].classList.toggle('disabled');

          // set focus to first input or select field after a policy checkbox has been checked
          if (!elExtraOptions[0].classList.contains('disabled')) {
            const firstInputField = elExtraOptions[0].querySelector('input[type=text], input[type=url], select');

            if (firstInputField) {
              firstInputField.focus();
            }
          }
        }
      });

      if (excludePolicy) {
        excludePolicy.split(',').forEach((policy) => {
          configurator.handlePolicyExclusion(el, policy);
        });
      }
    });

    // add event listener for array field actions (plus / minus icons)
    [...document.querySelectorAll('.array-action')].forEach((el) => {
      el.addEventListener('click', configurator.executeArrayFieldActions);
    });

    // add event listener for mandatory field validation
    [...document.querySelectorAll('input[data-mandatory]')].forEach((el) => {
      el.addEventListener('input', configurator.validateMandatoryFields);
    });

    // add event listener for preference field validation
    [...document.querySelectorAll('input[data-preference]')].forEach((el) => {
      el.addEventListener('input', configurator.validatePreferenceFields);
    });

    // add event listener for JSON field validation
    [...document.querySelectorAll('textarea[data-json]')].forEach((el) => {
      el.addEventListener('input', configurator.validateJsonFields);
    });

    // add event listener for URL field validation
    [...document.querySelectorAll('input[type=url]')].forEach((el) => {
      el.addEventListener('input', configurator.validateUrlFields);
    });

    // add event listener for version pattern field validation
    [...document.querySelectorAll('input[data-type=version-pattern]')].forEach((el) => {
      el.addEventListener('input', configurator.validateVersionPatternFields);
    });

    // action for clicking the "generate policies" button
    elPolicyGeneratorButton.onclick = (e) => {
      e.preventDefault();

      elPolicyOutput.innerText = output.generatePoliciesOutput();
      elActionLinks.classList.remove('hidden');
    };

    // action for clicking the "select all" link
    elSelectAllLink.onclick = (e) => {
      e.preventDefault();

      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(elPolicyOutput);
      selection.removeAllRanges();
      selection.addRange(range);
    };

    // action for clicking the "download policies.json" link if downloads permission is not granted
    elGrantDownloadPermissionLink.onclick = async (e) => {
      e.preventDefault();

      const granted = await browser.permissions.request(DOWNLOAD_PERMISSION);

      // immediately prompt for download after the downloads permission has been granted
      if (granted) {
        configurator.downloadPolicy();
      }
    };

    // action for clicking the "download policies.json" link if downloads permission is granted
    elDownloadLink.onclick = (e) => {
      e.preventDefault();

      configurator.downloadPolicy();
    };

    // filter field
    configurator.filterField();
  },

  /**
   * Tests if the downloads permission has been granted or not. If granted, the link for granting the permission
   * will be hidden and the real download link will be shown.
   *
   * @returns {void}
   */
  async testDownloadPermission () {
    const granted = await browser.permissions.contains(DOWNLOAD_PERMISSION);

    // if the downloads permission is granted hide the link for granting permission and show the
    // real download link instead
    if (granted) {
      elGrantDownloadPermissionLink.classList.add('hidden');
      elDownloadLink.classList.remove('hidden');
    }
  },

  /**
   * Method for downloading the "policies.json" file.
   *
   * @returns {void}
   */
  downloadPolicy () {
    browser.downloads.download({
      saveAs : true,
      url : URL.createObjectURL(new Blob([elPolicyOutput.innerText])),
      filename : 'policies.json'
    });
  },

  /**
   * Executes the add and remove actions for array fields.
   *
   * @param {MouseEvent} e - event
   *
   * @returns {void}
   */
  executeArrayFieldActions (e) {
    e.preventDefault();

    switch (e.target.getAttribute('data-action')) {
      case 'add':
        configurator.addArrayField(e.target, null, null);
        break;
      case 'remove':
        configurator.removeArrayField(e.target);
        break;
      default:
      // do nothing
    }
  },

  /**
   * Executes the add action for array fields, called by executeArrayFieldActions().
   *
   * @param {HTMLElement} el - the DOM element of the array field which should be duplicated
   * @param {string|null} key - (optional) the array field index which should be used for DOM IDs and names
   * @param {number|null} overrideCountValue - (optional) use this value for the data-count attribute
   *
   * @returns {void}
   */
  addArrayField (el, key, overrideCountValue) {
    const trigger = el;
    const removeBtn = el.previousElementSibling;

    // if the key parameter is used, this method is called by the unserializer. Let's make sure that we append new
    // items always to the end to preserve the original order
    if (key) {
      const closest = el.closest('.array-action-links');

      if (closest) {
        const arrayActionElements = closest.getElementsByClassName('array-action');
        // eslint-disable-next-line no-param-reassign
        el = arrayActionElements[arrayActionElements.length - 1];
      }
    }

    // after adding a new array item the remove link of the first one shouldn't be disabled
    if (removeBtn.classList.contains('disabled-link')) {
      removeBtn.classList.remove('disabled-link');
    }

    // increment array field counter
    const count = overrideCountValue ? overrideCountValue : parseInt(el.getAttribute('data-count')) + 1;

    el.parentNode.parentNode.querySelectorAll(':scope > div > [data-count]').forEach((el) => {
      el.setAttribute('data-count', count.toString());
    });

    // copy the array item
    const addedNode = el.parentNode.cloneNode(true);

    // remove the disabled link class for cloned items
    addedNode.querySelector(':scope > .disabled-link')?.classList.remove('disabled-link');

    // we want an empty input / textarea field for the copied array item, we also need a new DOM ID
    addedNode.querySelectorAll('input, textarea, select, a').forEach((el) => {
      let id = null;

      if (trigger.parentNode?.parentNode?.parentNode?.classList.contains('object-list')) {
        if (el.classList.contains('key') || el.parentNode?.querySelector('input')?.classList.contains('key')) {
          id = el.id.replace(/^(\w+)_(\d+)$/i, (fullMatch, name) => name + '_' + (key ? key : count));
        }
        else if (el.nodeName === 'SELECT') {
          id = el.id.replace(/^(\w+)_(\d+)_(\d+)$/i, (fullMatch, name, parentCount, count) => name + '_' + parseInt(trigger.dataset.count) + '_' + count);
        }
        else {
          id = el.id.replace(/^(\w+)_(\d+)_(\w+)_(\d+)$/i, (fullMatch, name, parentCount, key, count) => name + '_' + parseInt(trigger.dataset.count) + '_' + key + '_' + count);
        }
      }
      else if (
        trigger.closest('.checkbox').querySelector('.primary-checkbox[data-type="array"]') &&
        el.parentNode?.parentNode?.classList.contains('array')
      ) {
        id = el.id.replace(/^(\w+)_(\d+)_(\w+)_(\d+)$/i, (fullMatch, name, parentCount, key, count) => name + '_' + parseInt(trigger.dataset.count) + '_' + key + '_' + count);
      }
      else {
        id = el.id.replace(/^(\w+)_(\d+)$/i, (fullMatch, name) => name + '_' + (key ? key : count));
      }

      if (el.nodeName === 'INPUT' || el.nodeName === 'TEXTAREA') {
        el.value = '';
        el.setAttribute('id', id);
        el.setAttribute('name', id);
      }
      else if (el.nodeName === 'SELECT') {
        el.setAttribute('id', id);
        el.setAttribute('name', id);
      }
      else if (el.nodeName === 'A') {
        el.setAttribute('id', id);
        el.addEventListener('click', configurator.executeArrayFieldActions);
      }
    });

    // we also have to re-add the event listener for the validation of mandatory fields
    addedNode.querySelectorAll('input[data-mandatory]').forEach((el) => {
      el.addEventListener('input', configurator.validateMandatoryFields);
      el.classList.add('mandatory-style');
      el.parentNode.querySelector('.mandatory-label').classList.remove('hidden');
    });

    // we also have to re-add the event listener for the validation of preference fields
    addedNode.querySelectorAll('input[data-preference]').forEach((el) => {
      el.addEventListener('input', configurator.validatePreferenceFields);
      el.classList.add('invalid-preference');
      el.parentNode.querySelector('.invalid-preference').classList.remove('hidden');
    });

    // we also have to re-add the event listener for the validation of JSON fields
    addedNode.querySelectorAll('textarea[data-json]').forEach((el) => {
      el.addEventListener('input', configurator.validateJsonFields);
      el.classList.add('invalid-json');
      el.parentNode.querySelector('.invalid-json').classList.remove('hidden');
    });

    // we also have to re-add the event listener for the validation of URL fields
    addedNode.querySelectorAll('input[type=url]').forEach((el) => {
      el.addEventListener('input', configurator.validateUrlFields);
      el.parentNode.querySelector('.invalid-url-label').classList.add('hidden');
    });

    // we also have to re-add the event listener for the validation of version pattern fields
    addedNode.querySelectorAll('input[data-type=version-pattern]').forEach((el) => {
      el.addEventListener('input', configurator.validateVersionPatternFields);
      el.parentNode.querySelector('.invalid-version-pattern-label').classList.add('hidden');
    });

    // add the copied array item to the DOM
    el.parentNode.after(addedNode);

    // set focus to first input or select field of the newly added array field
    const firstInputField = addedNode.querySelector('input[type=text], input[type=url], select');

    if (firstInputField) {
      firstInputField.focus();
    }
  },

  /**
   * Executes the remove action for array fields, called by executeArrayFieldActions().
   *
   * @param {HTMLElement} el - the DOM element of the array field which should be removed
   *
   * @returns {void}
   */
  removeArrayField (el) {
    // different object types have different DOM structures, we need to know the number of total array items
    const elGrandParent = el.parentNode.parentNode;
    const isObjectArray = elGrandParent.classList.contains('object-array');
    const hasSubOptions = elGrandParent.querySelectorAll('.sub-options').length > 0;
    let newLength = 0;

    // object-array property of object type
    if (isObjectArray) {
      newLength = elGrandParent.querySelectorAll(':scope > div').length - 2;
    }
    // array type
    else if (hasSubOptions) {
      newLength = elGrandParent.querySelectorAll('.sub-options').length - 1;
    }
    // array property of object type
    else {
      newLength = elGrandParent.querySelectorAll('.input').length - 1;
    }

    // remove the array item from the DOM
    if (!el.classList.contains('disabled-link')) {
      // set focus to previous input or select field
      const { previousSibling } = el.parentNode;

      if (previousSibling) {
        const previousField = previousSibling.querySelector('input[type=text], input[type=url], select');

        if (previousField) {
          previousField.focus();
        }
      }

      el.parentNode.remove();
    }

    // if there is only one array item after removing another array item the remove link should be disabled
    if (newLength === 1) {
      elGrandParent.querySelector(':scope > div > [data-action="remove"]').classList.add('disabled-link');
    }
  },

  /**
   * Validation for mandatory fields.
   *
   * @param {InputEvent} e - event
   *
   * @returns {void}
   */
  validateMandatoryFields (e) {
    // the mandatory field has a value, hide visual indication
    if (e.target.value) {
      e.target.classList.remove('mandatory-style');
      e.target.parentNode.querySelector('.mandatory-label').classList.add('hidden');
    }
    // the mandatory field is empty, add visual indication
    else {
      e.target.classList.add('mandatory-style');
      e.target.parentNode.querySelector('.mandatory-label').classList.remove('hidden');
    }
  },

  /**
   * Validation for preference fields.
   *
   * @param {InputEvent} e - event
   *
   * @returns {void}
   */
  validatePreferenceFields (e) {
    const blockedPreferences = [
      'app.update.channel',
      'app.update.lastUpdateTime',
      'app.update.migrated',
      'browser.vpn_promo.disallowed_regions'
    ];
    const validPrefixes = [
      'accessibility.',
      'alerts.',
      'app.update.',
      'browser.',
      'datareporting.policy.',
      'dom.',
      'extensions.',
      'general.autoScroll',
      'general.smoothScroll',
      'geo.',
      'gfx.',
      'identity.fxaccounts.toolbar.',
      'intl.',
      'keyword.enabled',
      'layers.',
      'layout.',
      'media.',
      'network.',
      'pdfjs.',
      'places.',
      'pref.',
      'print.',
      'privacy.globalprivacycontrol.enabled',
      'privacy.userContext.enabled',
      'privacy.userContext.ui.enabled',
      'security.block_fileuri_script_with_wrong_mime',
      'security.default_personal_cert',
      'security.disable_button.openCertManager',
      'security.disable_button.openDeviceManager',
      'security.insecure_connection_text.enabled',
      'security.insecure_connection_text.pbmode.enabled',
      'security.mixed_content.block_active_content',
      'security.mixed_content.block_display_content',
      'security.mixed_content.upgrade_display_content',
      'security.OCSP.enabled',
      'security.OCSP.require',
      'security.osclientcerts.assume_rsa_pss_support',
      'security.osclientcerts.autoload',
      'security.ssl.enable_ocsp_stapling',
      'security.ssl.require_safe_negotiation',
      'security.tls.enable_0rtt_data',
      'security.tls.hello_downgrade_check',
      'security.tls.version.enable-deprecated',
      'security.warn_submit_secure_to_insecure',
      'signon.',
      'spellchecker.',
      'toolkit.legacyUserProfileCustomizations.stylesheets',
      'ui.',
      'widget.',
      'xpinstall.signatures.required',
      'xpinstall.whitelist.required'
    ];

    const validateName = (name) => {
      if (!name) {
        return true;
      }

      if (blockedPreferences.includes(name)) {
        return false;
      }

      return validPrefixes.some((prefix) => {
        if (prefix.endsWith('.')) {
          return name.startsWith(prefix) && name !== prefix;
        }

        return name === prefix;
      });
    };

    // the preference field contains a valid value, hide visual indication
    if (validateName(e.target.value)) {
      e.target.classList.remove('invalid-preference-style');
      e.target.parentNode.querySelector('.invalid-preference-label').classList.add('hidden');
    }
    // the preference is not allowed, add visual indication
    else {
      e.target.classList.add('invalid-preference-style');
      e.target.parentNode.querySelector('.invalid-preference-label').classList.remove('hidden');
    }
  },

  /**
   * Validation for JSON fields.
   *
   * @param {InputEvent} e - event
   *
   * @returns {void}
   */
  validateJsonFields (e) {
    let valid = true;
    try {
      JSON.parse(e.target.value.replace(/\n/g, ''));
    }
    /* eslint-disable no-unused-vars */
    catch (e) {
      valid = false;
    }

    // the textarea field contains valid JSON, hide visual indication
    if (valid || e.target.value === '') {
      e.target.classList.remove('invalid-json-style');
      e.target.parentNode.querySelector('.invalid-json-label').classList.add('hidden');
    }
    // the textarea field does not contain valid JSON, add visual indication
    else {
      e.target.classList.add('invalid-json-style');
      e.target.parentNode.querySelector('.invalid-json-label').classList.remove('hidden');
    }
  },

  /**
   * Validation for URL fields.
   *
   * @param {InputEvent} e - event
   *
   * @returns {void}
   */
  validateUrlFields (e) {
    const secure = e.target.getAttribute('data-secure') === 'true';
    const dataUriAllowed = e.target.getAttribute('data-data-uri-allowed') === 'true';

    // the URL field has a valid URL, hide visual indication
    if (!e.target.value || configurator.isValidURL(e.target.value, secure, dataUriAllowed)) {
      e.target.classList.remove('invalid-url-style');
      e.target.parentNode.querySelector('.invalid-url-label').classList.add('hidden');
    }
    // the URL field has not a valid URL, add visual indication
    else {
      e.target.classList.add('invalid-url-style');
      e.target.parentNode.querySelector('.invalid-url-label').classList.remove('hidden');
    }
  },

  /**
   * Tests if a given string is a valid URL.
   *
   * @param {string} string - the string to check
   * @param {boolean} secure - whether url must start with https:// or not
   * @param {boolean} dataUriAllowed - whether data URIs are allowed or not
   *
   * @returns {boolean} - whether the given string is a valid URL or not
   */
  isValidURL (string, secure, dataUriAllowed) {
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
  },

  /**
   * Validation for version pattern fields.
   *
   * @param {InputEvent} e - event
   *
   * @returns {void}
   */
  validateVersionPatternFields (e) {
    // the field has a valid version pattern, hide visual indication
    if (!e.target.value || configurator.isValidVersionPattern(e.target.value)) {
      e.target.classList.remove('invalid-version-pattern-style');
      e.target.parentNode.querySelector('.invalid-version-pattern-label').classList.add('hidden');
    }
    // the field has not a valid version pattern, add visual indication
    else {
      e.target.classList.add('invalid-version-pattern-style');
      e.target.parentNode.querySelector('.invalid-version-pattern-label').classList.remove('hidden');
    }
  },

  /**
   * Tests if a given string is a valid version pattern.
   *
   * @param {string} string - the string to check
   *
   * @returns {boolean} - whether the given string is a valid version pattern or not
   */
  isValidVersionPattern (string) {
    const pattern = new RegExp(/^\d{3}\.?(?:\d{1,3}\.?)?$/);

    return pattern.test(encodeURI(string));
  },

  /**
   * Appends policy element to the appropriate UI category in the DOM.
   *
   * @param {HTMLElement} el - the DOM element
   * @param {object} policy - the policy object
   *
   * @returns {void}
   */
  addOptionToUi (el, policy) {
    if (policy.exclude) {
      el.getElementsByClassName('primary-checkbox')[0].setAttribute('data-exclude', policy.exclude);
    }

    configurator.uiCategoryElements[policy.ui_category].appendChild(el);
  },

  /**
   * Adds policy of the type "array" to the DOM.
   *
   * @param {string} key - the name of the policy
   * @param {object} policy - the policy object
   *
   * @returns {void}
   */
  addArrayOption (key, policy) {
    const elObjectWrapper = configurator.addPolicyNode(key, policy, 'array', false);
    const elSubOptions = configurator.addSubOptions(elObjectWrapper);

    // add array properties
    const optionsLength = policy.items.length;
    for (let i = 0; i < optionsLength; i++) {
      if (policy.items[i].type === 'array') {
        configurator.addProperty(elSubOptions, key, policy.items[i], true, true);
      }
      else {
        configurator.addProperty(elSubOptions, key + '_' + policy.items[i].name, policy.items[i], true, true);
      }
    }

    // add array field action links
    elSubOptions.parentNode.classList.add('array-action-links');
    configurator.addArrayFieldActionLinks(elSubOptions, key + '_1');

    // add option to UI
    configurator.addOptionToUi(elObjectWrapper, policy);
  },

  /**
   * Adds policy of the type "boolean" to the DOM.
   *
   * @param {string} key - the name of the policy
   * @param {object} policy - the policy object
   * @param {boolean} inverse - if true, the value for the policy will be false instead of true
   *
   * @returns {void}
   */
  addBooleanOption (key, policy, inverse) {
    const elObjectWrapper = configurator.addPolicyNode(key, policy, 'boolean', inverse);

    // add option to UI
    configurator.addOptionToUi(elObjectWrapper, policy);
  },

  /**
   * Adds policy of the type "enum" to the DOM.
   *
   * @param {string} key - the name of the policy
   * @param {object} policy - the policy object
   *
   * @returns {void}
   */
  addEnumOption (key, policy) {
    const elObjectWrapper = configurator.addPolicyNode(key, policy, 'enum', false);

    const elSelectWrapper = document.createElement('div');
    elSelectWrapper.classList.add('enum', 'sub-options', 'select-wrapper', 'disabled');

    // add options to select element
    const elSelect = document.createElement('select');
    elSelect.setAttribute('id', key + '_Select');
    elSelect.setAttribute('name', key + '_Select');
    elSelect.setAttribute('data-name', key);

    elSelectWrapper.appendChild(elSelect);
    elObjectWrapper.appendChild(elSelectWrapper);

    const optionsLength = policy.options.length;
    for (let i = 0; i < optionsLength; i++) {
      const elOptionLabel = document.createTextNode(policy.options[i].label);
      const elOption = document.createElement('option');
      elOption.setAttribute('value', policy.options[i].value);
      elOption.appendChild(elOptionLabel);

      if (policy.options[i].value === policy.default) {
        elOption.setAttribute('selected', 'selected');
      }

      elSelect.appendChild(elOption);
    }

    // add option to UI
    configurator.addOptionToUi(elObjectWrapper, policy);
  },

  /**
   * Adds policy of the type "flat-array" to the DOM.
   *
   * @param {string} key - the name of the policy
   * @param {object} policy - the policy object
   *
   * @returns {void}
   */
  addFlatArrayOption (key, policy) {
    const elObjectWrapper = configurator.addPolicyNode(key, policy, 'flat-array', false);
    const elSubOptions = configurator.addSubOptions(elObjectWrapper);

    const elInput = document.createElement('input');
    elInput.setAttribute('type', 'text');

    if (policy.value.url) {
      elInput.setAttribute('type', 'url');
    }
    else {
      elInput.setAttribute('type', 'text');
    }

    elInput.setAttribute('id', key + '_Value_1');
    elInput.setAttribute('name', key + '_Value_1');
    elInput.setAttribute('data-name', key);
    elInput.setAttribute('placeholder', policy.value.label);

    // mandatory field
    if (policy.value.mandatory) {
      configurator.addMandatoryLabel(elInput, elSubOptions);
    }

    // URL validation label
    if (policy.value.url) {
      configurator.addInvalidUrlLabel(elSubOptions);
    }

    // empty value is allowed
    if (policy.value.allow_empty_value) {
      elInput.setAttribute('data-empty-value-allowed', 'true');
    }

    elSubOptions.appendChild(elInput);

    // add array field action links
    elSubOptions.parentNode.classList.add('array-action-links');
    configurator.addArrayFieldActionLinks(elSubOptions, key + '_1');

    // add option to UI
    configurator.addOptionToUi(elObjectWrapper, policy);
  },

  /**
   * Adds policy of the type "json-array" to the DOM.
   *
   * @param {string} key - the name of the policy
   * @param {object} policy - the policy object
   *
   * @returns {void}
   */
  addJsonArrayOption (key, policy) {
    const elObjectWrapper = configurator.addPolicyNode(key, policy, 'json-array', false);

    const elSubOptionsWrapper = document.createElement('div');
    elSubOptionsWrapper.classList.add('sub-options-wrapper');
    elObjectWrapper.appendChild(elSubOptionsWrapper);

    const elSubOptions = configurator.addSubOptions(elSubOptionsWrapper);

    const elInputWrapperKey = document.createElement('div');
    elInputWrapperKey.classList.add('input');

    const elInputKey = document.createElement('input');
    elInputKey.setAttribute('type', 'text');
    elInputKey.setAttribute('id', key + '_Key_1');
    elInputKey.setAttribute('name', key + '_Key_1');
    elInputKey.setAttribute('data-name', key);
    elInputKey.setAttribute('placeholder', policy.label_key);
    elInputKey.classList.add('key');

    configurator.addMandatoryLabel(elInputKey, elInputWrapperKey);

    elInputWrapperKey.appendChild(elInputKey);
    elSubOptions.appendChild(elInputWrapperKey);

    const elSubSubOptions = document.createElement('div');
    elSubSubOptions.classList.add('sub-sub-options');

    // add properties
    if (policy.properties) {
      const optionsLength = policy.properties.length;
      for (let i = 0; i < optionsLength; i++) {
        configurator.addProperty(elSubSubOptions, key + '_1', policy.properties[i], true, true);
      }
    }

    elSubOptions.appendChild(elSubSubOptions);

    // add array field action links
    elSubOptions.parentNode.classList.add('array-action-links');
    configurator.addArrayFieldActionLinks(elSubOptions, key + '_1');

    // add option to UI
    configurator.addOptionToUi(elObjectWrapper, policy);
  },

  /**
   * Adds policy of the type "key-object-list" to the DOM.
   *
   * @param {string} key - the name of the policy
   * @param {object} policy - the policy object
   *
   * @returns {void}
   */
  addKeyObjectListOption (key, policy) {
    const elObjectWrapper = configurator.addPolicyNode(key, policy, 'key-object-list', false);

    // add extra properties
    if (policy.extra && policy.extra.properties) {
      const elExtraOptions = document.createElement('div');
      elExtraOptions.classList.add('extra-options', 'disabled');
      elExtraOptions.setAttribute('data-key', policy.extra.key);
      elObjectWrapper.appendChild(elExtraOptions);

      const elPreCaptionWrapper = document.createElement('div');
      elPreCaptionWrapper.classList.add('label', 'pre-extra');
      elExtraOptions.appendChild(elPreCaptionWrapper);

      const elPreCaption = document.createTextNode(policy.extra.caption_pre);
      elPreCaptionWrapper.appendChild(elPreCaption);

      const optionsLength = policy.extra.properties.length;
      for (let i = 0; i < optionsLength; i++) {
        configurator.addProperty(elExtraOptions, key, policy.extra.properties[i], false, false);
      }

      const elPostCaptionWrapper = document.createElement('div');
      elPostCaptionWrapper.classList.add('label', 'post-extra');
      elExtraOptions.appendChild(elPostCaptionWrapper);

      const elPostCaption = document.createTextNode(policy.extra.caption_post);
      elPostCaptionWrapper.appendChild(elPostCaption);
    }

    const elSubOptionsWrapper = document.createElement('div');
    elSubOptionsWrapper.classList.add('sub-options-wrapper');
    elObjectWrapper.appendChild(elSubOptionsWrapper);

    const elSubOptions = configurator.addSubOptions(elSubOptionsWrapper);

    const elInputWrapperKey = document.createElement('div');
    elInputWrapperKey.classList.add('input');

    const elInputKey = document.createElement('input');
    elInputKey.setAttribute('type', 'text');
    elInputKey.setAttribute('id', key + '_Key_1');
    elInputKey.setAttribute('name', key + '_Key_1');
    elInputKey.setAttribute('data-name', key);
    elInputKey.setAttribute('placeholder', policy.label_key);
    elInputKey.classList.add('key');

    // preference validation
    if (policy.validator && policy.validator === 'preference') {
      elInputKey.setAttribute('data-preference', 'true');

      const elPreferenceLabel = document.createElement('div');
      elPreferenceLabel.classList.add('invalid-preference-label', 'hidden');
      elPreferenceLabel.innerText = browser.i18n.getMessage('non_allowed_preference_label');
      elInputWrapperKey.appendChild(elPreferenceLabel);
    }

    configurator.addMandatoryLabel(elInputKey, elInputWrapperKey);
    elInputWrapperKey.appendChild(elInputKey);
    elSubOptions.appendChild(elInputWrapperKey);

    const elSubSubOptions = document.createElement('div');
    elSubSubOptions.classList.add('sub-sub-options');

    // add properties
    if (policy.properties) {
      const optionsLength = policy.properties.length;
      for (let i = 0; i < optionsLength; i++) {
        configurator.addProperty(elSubSubOptions, key + '_' + policy.properties[i].name, policy.properties[i], true, true);
      }
    }

    elSubOptions.appendChild(elSubSubOptions);

    // add array field action links
    elSubOptions.parentNode.classList.add('array-action-links');
    configurator.addArrayFieldActionLinks(elSubOptions, key + '_1');

    // add option to UI
    configurator.addOptionToUi(elObjectWrapper, policy);
  },

  /**
   * Adds policy of the type "key-value-pairs" to the DOM.
   *
   * @param {string} key - the name of the policy
   * @param {object} policy - the policy object
   *
   * @returns {void}
   */
  addKeyValuePairsOption (key, policy) {
    const elObjectWrapper = configurator.addPolicyNode(key, policy, 'key-value-pairs', false);
    const elSubOptions = configurator.addSubOptions(elObjectWrapper);

    const elInputWrapperKey = document.createElement('div');
    elInputWrapperKey.classList.add('input');

    const elInputKey = document.createElement('input');
    elInputKey.setAttribute('type', 'text');
    elInputKey.setAttribute('id', key + '_Key_Value_1');
    elInputKey.setAttribute('name', key + '_Key_Value_1');
    elInputKey.setAttribute('data-name', key);
    elInputKey.setAttribute('placeholder', policy.label_key);
    elInputKey.classList.add('key');
    configurator.addMandatoryLabel(elInputKey, elInputWrapperKey);
    elInputWrapperKey.appendChild(elInputKey);
    elSubOptions.appendChild(elInputWrapperKey);

    const elInputWrapperValue = document.createElement('div');
    elInputWrapperValue.classList.add('input');

    const elInputValue = document.createElement('input');
    elInputValue.setAttribute('type', 'text');
    elInputValue.setAttribute('id', key + '_Value_Value_1');
    elInputValue.setAttribute('name', key + '_Value_Value_1');
    elInputValue.setAttribute('data-name', key);
    elInputValue.setAttribute('placeholder', policy.label_value);
    elInputValue.classList.add('value');
    configurator.addMandatoryLabel(elInputValue, elInputWrapperValue);
    elInputWrapperValue.appendChild(elInputValue);
    elSubOptions.appendChild(elInputWrapperValue);

    // add array field action links
    elSubOptions.parentNode.classList.add('array-action-links');
    configurator.addArrayFieldActionLinks(elSubOptions, key + '_1');

    // add option to UI
    configurator.addOptionToUi(elObjectWrapper, policy);
  },

  /**
   * Adds policy of the type "nested-object" to the DOM.
   *
   * @param {string} key - the name of the policy
   * @param {object} policy - the policy object
   *
   * @returns {void}
   */
  addNestedObjectOption (key, policy) {
    const elObjectWrapper = configurator.addPolicyNode(key, policy, 'nested-object', false);

    // add extra property
    if (policy.extra) {
      const elExtraOptions = document.createElement('div');
      elExtraOptions.classList.add('extra-options', 'disabled');
      elExtraOptions.setAttribute('data-key', policy.extra.name);
      elObjectWrapper.appendChild(elExtraOptions);

      configurator.addProperty(elExtraOptions, key, policy.extra, false, false);
    }

    if (policy.children.properties) {
      const elSubOptionsWrapper = document.createElement('div');
      elSubOptionsWrapper.classList.add('sub-options-wrapper');
      elObjectWrapper.appendChild(elSubOptionsWrapper);

      const elSubOptions = configurator.addSubOptions(elSubOptionsWrapper);

      const optionsLength = policy.children.properties.length;
      for (let i = 0; i < optionsLength; i++) {
        configurator.addProperty(elSubOptions, key + '_' + policy.children.properties[i].name, policy.children.properties[i], true, true);
      }

      // add array field action links
      elSubOptions.parentElement.classList.add('array-action-links');
      configurator.addArrayFieldActionLinks(elSubOptions, key + '_children_1');
    }

    // add option to UI
    configurator.addOptionToUi(elObjectWrapper, policy);
  },

  /**
   * Adds policy of the type "object" to the DOM.
   *
   * @param {string} key - the name of the policy
   * @param {object} policy - the policy object
   *
   * @returns {void}
   */
  addObjectOption (key, policy) {
    const elObjectWrapper = configurator.addPolicyNode(key, policy, 'object', false);
    const elSubOptions = configurator.addSubOptions(elObjectWrapper);

    // policy can be locked
    if (policy.is_lockable) {
      configurator.addLockableLink(elSubOptions, key);
    }

    // add properties
    if (policy.properties) {
      const optionsLength = policy.properties.length;
      for (let i = 0; i < optionsLength; i++) {
        configurator.addProperty(elSubOptions, key, policy.properties[i], false, false);
      }
    }

    // add option to UI
    configurator.addOptionToUi(elObjectWrapper, policy);
  },

  /**
   * Adds policy of the type "preference" to the DOM.
   *
   * @param {string} key - the name of the policy
   * @param {object} policy - the policy object
   *
   * @returns {void}
   */
  addPreferenceOption (key, policy) {
    const elObjectWrapper = configurator.addPolicyNode(key, policy, 'preference', false);

    if (policy.properties.type === 'array') {
      const elArrayWrapper = document.createElement('div');
      elArrayWrapper.setAttribute('data-name', policy.properties.option);
      elArrayWrapper.classList.add('array', 'sub-options', 'disabled');
      elObjectWrapper.appendChild(elArrayWrapper);

      // add array items
      if (policy.properties.items) {
        const parentName = policy.properties.option.replace(/\./g, '_');
        configurator.addProperty(elArrayWrapper, parentName, policy.properties.items, true, false);
      }
    }
    else if (policy.properties.type === 'boolean' || policy.properties.type === 'boolean-inverse') {
      const elSelectWrapper = document.createElement('div');
      elSelectWrapper.setAttribute('data-name', policy.properties.option);
      elSelectWrapper.classList.add('boolean', 'sub-options', 'select-wrapper', 'disabled');
      elObjectWrapper.appendChild(elSelectWrapper);

      const elSelect = document.createElement('select');
      elSelect.setAttribute('id', key + '_Select');
      elSelect.setAttribute('name', key + '_Select');
      elSelectWrapper.appendChild(elSelect);

      let elOptionTrueLabel = document.createTextNode(browser.i18n.getMessage('enum_value_enable_yes'));

      if (policy.properties.type === 'boolean-inverse') {
        elOptionTrueLabel = document.createTextNode(browser.i18n.getMessage('enum_value_enable_no'));
      }

      const elOptionTrue = document.createElement('option');
      elOptionTrue.setAttribute('value', 'true');
      elOptionTrue.appendChild(elOptionTrueLabel);

      if (policy.properties.default === 'true') {
        elOptionTrue.setAttribute('selected', 'selected');
      }

      let elOptionFalseLabel = document.createTextNode(browser.i18n.getMessage('enum_value_enable_no'));

      if (policy.properties.type === 'boolean-inverse') {
        elOptionFalseLabel = document.createTextNode(browser.i18n.getMessage('enum_value_enable_yes'));
      }

      const elOptionFalse = document.createElement('option');
      elOptionFalse.setAttribute('value', 'false');
      elOptionFalse.appendChild(elOptionFalseLabel);

      if (policy.properties.default === 'false') {
        elOptionFalse.setAttribute('selected', 'selected');
      }

      if (policy.properties.type === 'boolean-inverse') {
        elSelect.appendChild(elOptionFalse);
        elSelect.appendChild(elOptionTrue);
      }
      else {
        elSelect.appendChild(elOptionTrue);
        elSelect.appendChild(elOptionFalse);
      }
    }
    else if (policy.properties.type === 'enum') {
      const elSelectWrapper = document.createElement('div');
      elSelectWrapper.setAttribute('data-name', policy.properties.option);
      elSelectWrapper.classList.add('enum', 'sub-options', 'select-wrapper', 'disabled');
      elObjectWrapper.appendChild(elSelectWrapper);

      const elSelect = document.createElement('select');
      elSelect.setAttribute('id', key + '_Select');
      elSelect.setAttribute('name', key + '_Select');
      elSelectWrapper.appendChild(elSelect);

      // mandatory field
      if (policy.mandatory) {
        configurator.addMandatoryLabel(elSelect, elSelectWrapper);
      }

      // add options to select element
      const optionsLength = policy.properties.options.length;
      for (let i = 0; i < optionsLength; i++) {
        const elOptionLabel = document.createTextNode(policy.properties.options[i].label);
        const elOption = document.createElement('option');
        elOption.setAttribute('value', policy.properties.options[i].value);
        elOption.appendChild(elOptionLabel);

        if (policy.properties.options[i].value === policy.properties.default) {
          elOption.setAttribute('selected', 'selected');
        }

        elSelect.appendChild(elOption);
      }

      elSelectWrapper.appendChild(elSelect);
    }
    else if (policy.properties.type === 'string') {
      const elInputWrapper = document.createElement('div');
      elInputWrapper.setAttribute('data-name', policy.properties.option);
      elInputWrapper.classList.add('input', 'sub-options', 'disabled');
      elObjectWrapper.appendChild(elInputWrapper);

      const elInput = document.createElement('input');
      elInput.setAttribute('type', 'text');
      elInput.setAttribute('id', key + '_Text');
      elInput.setAttribute('name', key + '_Text');
      elInput.setAttribute('placeholder', policy.properties.label);
      elInputWrapper.appendChild(elInput);

      // preferences of type "string" should always be a mandatory field
      configurator.addMandatoryLabel(elInput, elInputWrapper);
    }

    // add option to UI
    configurator.addOptionToUi(elObjectWrapper, policy);
  },

  /**
   * Adds policy of the type "split-string" to the DOM.
   *
   * @param {string} key - the name of the policy
   * @param {object} policy - the policy object
   *
   * @returns {void}
   */
  addSplitStringOption (key, policy) {
    const elObjectWrapper = configurator.addPolicyNode(key, policy, 'split-string', false);
    const elSubOptions = configurator.addSubOptions(elObjectWrapper);

    const elInput = document.createElement('input');
    elInput.setAttribute('type', 'text');
    elInput.setAttribute('id', key + '_Value_1');
    elInput.setAttribute('name', key + '_Value_1');
    elInput.setAttribute('data-name', key);
    elInput.setAttribute('placeholder', policy.label);

    elSubOptions.appendChild(elInput);

    // add array field action links
    elSubOptions.parentNode.classList.add('array-action-links');
    configurator.addArrayFieldActionLinks(elSubOptions, key + '_1');

    // add option to UI
    configurator.addOptionToUi(elObjectWrapper, policy);
  },

  /**
   * Adds policy of the type "split-url" to the DOM.
   *
   * @param {string} key - the name of the policy
   * @param {object} policy - the policy object
   *
   * @returns {void}
   */
  addSplitUrlOption (key, policy) {
    const elObjectWrapper = configurator.addPolicyNode(key, policy, 'split-url', false);
    const elSubOptions = configurator.addSubOptions(elObjectWrapper);

    const elInput = document.createElement('input');
    elInput.setAttribute('type', 'url');
    elInput.setAttribute('id', key + '_Value_1');
    elInput.setAttribute('name', key + '_Value_1');
    elInput.setAttribute('data-name', key);
    elInput.setAttribute('placeholder', policy.label);

    // URL validation label
    configurator.addInvalidUrlLabel(elSubOptions);

    elSubOptions.appendChild(elInput);

    // add array field action links
    elSubOptions.parentNode.classList.add('array-action-links');
    configurator.addArrayFieldActionLinks(elSubOptions, key + '_1');

    // add option to UI
    configurator.addOptionToUi(elObjectWrapper, policy);
  },

  /**
   * Adds policy of the type "string" to the DOM.
   *
   * @param {string} key - the name of the policy
   * @param {object} policy - the policy object
   * @param {string} type - "string", "url", or "version"
   *
   * @returns {void}
   */
  addStringOption (key, policy, type) {
    const elObjectWrapper = configurator.addPolicyNode(key, policy, type, false);
    const elSubOptions = configurator.addSubOptions(elObjectWrapper);

    // input field
    const elInputWrapper = document.createElement('div');
    elInputWrapper.classList.add('input');

    const elInput = document.createElement('input');

    if (type === 'url') {
      elInput.setAttribute('type', 'url');
    }
    else {
      elInput.setAttribute('type', 'text');
    }

    if (type === 'version') {
      elInput.setAttribute('data-type', 'version-pattern');
    }

    elInput.setAttribute('id', key + '_Text');
    elInput.setAttribute('name', key + '_Text');
    elInput.setAttribute('data-name', key);
    elInput.setAttribute('placeholder', policy.label);

    // mandatory field
    if (policy.mandatory) {
      configurator.addMandatoryLabel(elInput, elSubOptions);
    }

    // validation labels
    if (type === 'url') {
      configurator.addInvalidUrlLabel(elSubOptions);
    }
    else if (type === 'version') {
      configurator.addInvalidVersionPatternLabel(elSubOptions);
    }

    elSubOptions.appendChild(elInput);

    // add option to UI
    configurator.addOptionToUi(elObjectWrapper, policy);
  },

  /**
   * Adds a property to a policy field, calls the appropriate method.
   *
   * @param {HTMLElement} el - the DOM element of the policy
   * @param {string} parentName - the name of the parent policy object
   * @param {object} policy - the policy object
   * @param {boolean} isArrayProperty - whether this call is within an array field or not
   * @param {boolean} hideArrayActionLinks - whether this is an array item but no action links should be added
   *
   * @returns {void}
   */
  addProperty (el, parentName, policy, isArrayProperty, hideArrayActionLinks) {
    switch (policy.type) {
      case 'array':
        configurator.addArrayProperty(el, parentName, policy);
        break;
      case 'boolean':
        configurator.addBooleanProperty(el, parentName, policy);
        break;
      case 'enum':
        configurator.addEnumProperty(el, parentName, policy, isArrayProperty);
        break;
      case 'json':
        configurator.addJsonProperty(el, parentName, policy);
        break;
      case 'key-value-pairs':
        configurator.addKeyValuePairsProperty(el, parentName, policy);
        break;
      case 'multiselect':
        configurator.addMultiselectProperty(el, parentName, policy);
        break;
      case 'number':
        configurator.addStringProperty(el, parentName, policy, 'number', isArrayProperty, hideArrayActionLinks);
        break;
      case 'object':
        configurator.addObjectProperty(el, parentName, policy);
        break;
      case 'object-array':
        configurator.addObjectArrayProperty(el, parentName, policy);
        break;
      case 'object-list':
        configurator.addObjectListProperty(el, parentName, policy);
        break;
      case 'string':
        configurator.addStringProperty(el, parentName, policy, 'string', isArrayProperty, hideArrayActionLinks);
        break;
      case 'url':
        configurator.addStringProperty(el, parentName, policy, 'url', isArrayProperty, hideArrayActionLinks);
        break;
      case 'urlOrData':
        configurator.addStringProperty(el, parentName, policy, 'url', isArrayProperty, hideArrayActionLinks);
        break;
      default:
        // do nothing
    }
  },

  /**
   * Adds property of the type "array" to a policy.
   *
   * @param {HTMLElement} el - the DOM element of the policy
   * @param {string} parentName - the name of the parent policy object
   * @param {object} policy - the policy object
   *
   * @returns {void}
   */
  addArrayProperty (el, parentName, policy) {
    const elObjectWrapper = document.createElement('div');
    elObjectWrapper.classList.add('array');
    elObjectWrapper.setAttribute('data-name', policy.name);

    if (policy.items?.separator) {
      elObjectWrapper.setAttribute('data-separator', policy.items.separator);
    }

    if (policy.items?.regex) {
      elObjectWrapper.setAttribute('data-regex', 'true');
    }

    const elCaptionWrapper = document.createElement('div');
    elCaptionWrapper.classList.add('label');
    elObjectWrapper.appendChild(elCaptionWrapper);

    const elCaption = document.createTextNode(policy.label);
    elCaptionWrapper.appendChild(elCaption);

    // info link
    if (policy.info_link) {
      configurator.addInfoLink(elCaptionWrapper, policy.info_link);
    }

    // add array items
    if (policy.items) {
      if (policy.type === 'array') {
        configurator.addProperty(elObjectWrapper, parentName + '_1_' + policy.name, policy.items, true, false);
      }
      else {
        configurator.addProperty(elObjectWrapper, parentName + policy.name, policy.items, true, false);
      }
    }

    el.appendChild(elObjectWrapper);
  },

  /**
   * Adds property of the type "boolean" to a policy.
   *
   * @param {HTMLElement} el - the DOM element of the policy
   * @param {string} parentName - the name of the parent policy object
   * @param {object} policy - the policy object
   *
   * @returns {void}
   */
  addBooleanProperty (el, parentName, policy) {
    const elObjectWrapper = document.createElement('div');
    elObjectWrapper.classList.add('checkbox');

    // property name
    const name = parentName ? parentName + '_' + policy.name : policy.name;

    // checkbox
    const elInput = document.createElement('input');
    elInput.setAttribute('type', 'checkbox');
    elInput.setAttribute('id', name);
    elInput.setAttribute('name', name);
    elInput.setAttribute('data-name', policy.name);
    elInput.classList.add('property-checkbox');

    // mandatory field
    if (policy.mandatory) {
      configurator.addMandatoryLabel(elInput, elObjectWrapper);
    }

    elObjectWrapper.appendChild(elInput);

    // label
    const elLabel = document.createElement('label');
    elLabel.setAttribute('for', name);
    elLabel.textContent = policy.label;
    elObjectWrapper.appendChild(elLabel);

    el.appendChild(elObjectWrapper);
  },

  /**
   * Adds property of the type "multiselect" to a policy.
   *
   * @param {HTMLElement} el - the DOM element of the policy
   * @param {string} parentName - the name of the parent policy object
   * @param {object} policy - the policy object
   *
   * @returns {void}
   */
  addMultiselectProperty (el, parentName, policy) {
    const elObjectWrapper = document.createElement('div');
    elObjectWrapper.classList.add('multiselect');
    elObjectWrapper.setAttribute('data-name', policy.name);

    // label
    if (policy.label) {
      configurator.addSelectLabel(elObjectWrapper, policy.name, policy);
    }

    // add checkboxes
    const elCheckboxesWrapper = document.createElement('div');
    elCheckboxesWrapper.classList.add('checkboxes-wrapper');
    elObjectWrapper.appendChild(elCheckboxesWrapper);

    // add options to select element
    const optionsLength = policy.options.length;
    for (let i = 0; i < optionsLength; i++) {
      const elCheckboxWrapper = document.createElement('div');
      elCheckboxWrapper.classList.add('checkbox');
      elCheckboxesWrapper.appendChild(elCheckboxWrapper);

      const elCheckbox = document.createElement('input');
      elCheckbox.setAttribute('type', 'checkbox');
      elCheckbox.setAttribute('id', policy.name + '_' + policy.options[i].value);
      elCheckbox.setAttribute('name', policy.name + '_' + policy.options[i].value);
      elCheckbox.setAttribute('value', policy.options[i].value);
      elCheckbox.classList.add('property-checkbox');
      elCheckboxWrapper.appendChild(elCheckbox);

      const elCheckboxLabel = document.createElement('label');
      elCheckboxLabel.setAttribute('for', policy.name + '_' + policy.options[i].value);
      elCheckboxLabel.textContent = policy.options[i].label;
      elCheckboxWrapper.appendChild(elCheckboxLabel);
    }

    el.appendChild(elObjectWrapper);
  },

  /**
   * Adds property of the type "enum" to a policy.
   *
   * @param {HTMLElement} el - the DOM element of the policy
   * @param {string} parentName - the name of the parent policy object
   * @param {object} policy - the policy object
   * @param {boolean} isArrayProperty - whether this call is within an array field or not
   *
   * @returns {void}
   */
  addEnumProperty (el, parentName, policy, isArrayProperty) {
    const elObjectWrapper = document.createElement('div');
    elObjectWrapper.classList.add('enum');

    // label
    if (policy.label) {
      configurator.addSelectLabel(elObjectWrapper, policy.name, policy);
    }

    // we need a unique and deterministic name as DOM id and name
    const domName = isArrayProperty ? parentName + '_1' : parentName + '_' + policy.name;

    // add select element
    const elSelectWrapper = document.createElement('div');
    elSelectWrapper.classList.add('select-wrapper');
    elObjectWrapper.appendChild(elSelectWrapper);

    const elSelect = document.createElement('select');
    elSelect.setAttribute('id', domName);
    elSelect.setAttribute('name', domName);
    elSelect.setAttribute('data-name', policy.name);

    // mandatory field
    if (policy.mandatory) {
      configurator.addMandatoryLabel(elSelect, elSelectWrapper);
    }

    // optionally sort by label
    if (policy.sorted) {
      policy.options.sort((a, b) => a.label.localeCompare(b.label));
    }

    // add options to select element
    const optionsLength = policy.options.length;
    for (let i = 0; i < optionsLength; i++) {
      const elOptionLabel = document.createTextNode(policy.options[i].label);
      const elOption = document.createElement('option');
      elOption.setAttribute('value', policy.options[i].value);
      elOption.appendChild(elOptionLabel);

      if (policy.options[i].value === policy.default) {
        elOption.setAttribute('selected', 'selected');
      }

      elSelect.appendChild(elOption);
    }

    elSelectWrapper.appendChild(elSelect);

    el.appendChild(elObjectWrapper);
  },

  /**
   * Adds property of the type "json" to a policy.
   *
   * @param {HTMLElement} el - the DOM element of the policy
   * @param {string} parentName - the name of the parent policy object
   * @param {object} policy - the policy object
   *
   * @returns {void}
   */
  addJsonProperty (el, parentName, policy) {
    const elObjectWrapper = document.createElement('div');
    elObjectWrapper.classList.add('input');

    // caption
    if (policy.caption) {
      const elCaptionWrapper = document.createElement('div');
      elCaptionWrapper.classList.add('label');
      elObjectWrapper.appendChild(elCaptionWrapper);

      const elCaption = document.createTextNode(policy.caption);
      elCaptionWrapper.appendChild(elCaption);
    }

    // input field
    const elTextarea = document.createElement('textarea');

    elTextarea.setAttribute('id', parentName);
    elTextarea.setAttribute('name', parentName);
    elTextarea.setAttribute('placeholder', policy.label);
    elTextarea.setAttribute('data-name', policy.name);
    elTextarea.setAttribute('data-json', 'true');

    elObjectWrapper.appendChild(elTextarea);

    configurator.addInvalidJsonLabel(elObjectWrapper);

    el.appendChild(elObjectWrapper);
  },

  /**
   * Adds property of the type "key-value-pairs" to a policy.
   *
   * @param {HTMLElement} el - the DOM element of the policy
   * @param {string} parentName - the name of the parent policy object
   * @param {object} policy - the policy object
   *
   * @returns {void}
   */
  addKeyValuePairsProperty (el, parentName, policy) {
    const elObjectWrapper = document.createElement('div');
    elObjectWrapper.classList.add('key-value-pairs');
    elObjectWrapper.setAttribute('data-name', policy.name);

    // label
    const elCaptionWrapper = document.createElement('div');
    elCaptionWrapper.classList.add('label');
    elObjectWrapper.appendChild(elCaptionWrapper);

    const elCaption = document.createTextNode(policy.label);
    elCaptionWrapper.appendChild(elCaption);

    // key-value-pairs
    const elSubOptions = configurator.addSubOptions(elObjectWrapper);
    const elInputWrapperKey = document.createElement('div');
    elInputWrapperKey.classList.add('input');

    const key = parentName + '_' + policy.name;

    const elInputKey = document.createElement('input');
    elInputKey.setAttribute('type', 'text');
    elInputKey.setAttribute('id', key + '_Key_1');
    elInputKey.setAttribute('name', key + '_Key_1');
    elInputKey.setAttribute('data-name', key);
    elInputKey.setAttribute('placeholder', policy.label_key);
    elInputKey.classList.add('key');
    configurator.addMandatoryLabel(elInputKey, elInputWrapperKey);
    elInputWrapperKey.appendChild(elInputKey);
    elSubOptions.appendChild(elInputWrapperKey);

    const elInputWrapperValue = document.createElement('div');
    elInputWrapperValue.classList.add('input');

    const elInputValue = document.createElement('input');
    elInputValue.setAttribute('type', 'text');
    elInputValue.setAttribute('id', key + '_Value_1');
    elInputValue.setAttribute('name', key + '_Value_1');
    elInputValue.setAttribute('data-name', key);
    elInputValue.setAttribute('placeholder', policy.label_value);
    elInputValue.classList.add('value');
    configurator.addMandatoryLabel(elInputValue, elInputWrapperValue);
    elInputWrapperValue.appendChild(elInputValue);
    elSubOptions.appendChild(elInputWrapperValue);

    // add array field action links
    elSubOptions.parentNode.classList.add('array-action-links');
    configurator.addArrayFieldActionLinks(elSubOptions, key + '_1');

    el.appendChild(elObjectWrapper);
  },

  /**
   * Adds property of the type "object" to a policy.
   *
   * @param {HTMLElement} el - the DOM element of the policy
   * @param {string} parentName - the name of the parent policy object
   * @param {object} policy - the policy object
   *
   * @returns {void}
   */
  addObjectProperty (el, parentName, policy) {
    const elObjectWrapper = document.createElement('div');
    elObjectWrapper.classList.add('object');
    elObjectWrapper.setAttribute('data-name', policy.name);

    // label
    const elCaptionWrapper = document.createElement('div');
    elCaptionWrapper.classList.add('label');
    elObjectWrapper.appendChild(elCaptionWrapper);

    const elCaption = document.createTextNode(policy.label);
    elCaptionWrapper.appendChild(elCaption);

    el.appendChild(elObjectWrapper);

    // add properties
    const elSubOptions = document.createElement('div');
    elObjectWrapper.appendChild(elSubOptions);

    // property can be locked
    if (policy.is_lockable) {
      configurator.addLockableLink(elSubOptions, parentName + '_' + policy.name);
    }

    const optionsLength = policy.properties.length;
    for (let i = 0; i < optionsLength; i++) {
      let name = '';

      if (policy.properties[i].type === 'boolean') {
        name = parentName + '_' + policy.name;
      }
      else {
        name = parentName + '_' + policy.name + '_' + policy.properties[i].name;
      }

      configurator.addProperty(elSubOptions, name, policy.properties[i], false, false);
    }
  },

  /**
   * Adds property of the type "object-array" to a policy.
   *
   * @param {HTMLElement} el - the DOM element of the policy
   * @param {string} parentName - the name of the parent policy object
   * @param {object} policy - the policy object
   *
   * @returns {void}
   */
  addObjectArrayProperty (el, parentName, policy) {
    const elObjectWrapper = document.createElement('div');
    elObjectWrapper.classList.add('object-array');
    elObjectWrapper.setAttribute('data-name', policy.name);

    // label
    const elCaptionWrapper = document.createElement('div');
    elCaptionWrapper.classList.add('label');
    elObjectWrapper.appendChild(elCaptionWrapper);

    const elCaption = document.createTextNode(policy.label);
    elCaptionWrapper.appendChild(elCaption);

    el.appendChild(elObjectWrapper);

    // add array items
    const elSubOptions = document.createElement('div');
    elObjectWrapper.appendChild(elSubOptions);

    const optionsLength = policy.items.length;
    for (let i = 0; i < optionsLength; i++) {
      const name = parentName + '_' + policy.name + '_' + policy.items[i].name;
      configurator.addProperty(elSubOptions, name, policy.items[i], true, true);
    }

    // add array field action links
    const arrayAddName = parentName + '_' + policy.name + '_1';
    elSubOptions.parentNode.classList.add('array-action-links');
    configurator.addArrayFieldActionLinks(elSubOptions, arrayAddName);
  },

  /**
   * Adds property of the type "object-list" to a policy.
   *
   * @param {HTMLElement} el - the DOM element of the policy
   * @param {string} parentName - the name of the parent policy object
   * @param {object} policy - the policy object
   *
   * @returns {void}
   */
  addObjectListProperty (el, parentName, policy) {
    const elObjectWrapper = document.createElement('div');
    elObjectWrapper.classList.add('object-list');
    elObjectWrapper.setAttribute('data-name', policy.name);

    // label
    const elCaptionWrapper = document.createElement('div');
    elCaptionWrapper.classList.add('label');
    elObjectWrapper.appendChild(elCaptionWrapper);

    const elCaption = document.createTextNode(policy.label);
    elCaptionWrapper.appendChild(elCaption);

    el.appendChild(elObjectWrapper);

    const elSubOptionsWrapper = document.createElement('div');
    elSubOptionsWrapper.classList.add('sub-options-wrapper');
    elObjectWrapper.appendChild(elSubOptionsWrapper);

    const elSubOptions = configurator.addSubOptions(elSubOptionsWrapper);

    const elInputWrapperKey = document.createElement('div');
    elInputWrapperKey.classList.add('input');

    // we need to make sure that we have a unique name per object-list item
    const id = parentName + '_' + policy.name;

    const elInputKey = document.createElement('input');
    elInputKey.setAttribute('type', 'text');
    elInputKey.setAttribute('id', id + '_Key_1');
    elInputKey.setAttribute('name', id + '_Key_1');
    elInputKey.setAttribute('data-name', id);
    elInputKey.setAttribute('placeholder', policy.placeholder_key);
    elInputKey.classList.add('key');
    elInputWrapperKey.appendChild(elInputKey);
    elSubOptions.appendChild(elInputWrapperKey);

    const elSubSubOptions = document.createElement('div');
    elSubSubOptions.classList.add('sub-sub-options');

    // add properties
    if (policy.items) {
      const optionsLength = policy.items.length;
      for (let i = 0; i < optionsLength; i++) {
        configurator.addProperty(elSubSubOptions, id + '_' + policy.items[i].name + '_1', policy.items[i], true, true);
      }
    }

    elSubOptions.appendChild(elSubSubOptions);

    // add array field action links
    configurator.addArrayFieldActionLinks(elSubOptions, parentName + '_1');
  },

  /**
   * Adds property of the type "string" or "url" to a policy.
   *
   * @param {HTMLElement} el - the DOM element of the policy
   * @param {string} parentName - the name of the parent policy object
   * @param {object} policy - the policy object
   * @param {string} type - can be "string", "url" or "number"
   * @param {boolean} isArrayProperty - whether this call is within an array field or not
   * @param {boolean} hideArrayActionLinks - whether this is an array item but no action links should be added
   *
   * @returns {void}
   */
  addStringProperty (el, parentName, policy, type, isArrayProperty, hideArrayActionLinks) {
    const elObjectWrapper = document.createElement('div');
    elObjectWrapper.classList.add('input');

    // we need a unique and deterministic name as DOM id and name
    const domName = isArrayProperty ? parentName + '_1' : parentName + '_' + policy.name;

    // optional caption
    if (policy.caption) {
      const elCaptionWrapper = document.createElement('div');
      elCaptionWrapper.classList.add('label');
      elObjectWrapper.appendChild(elCaptionWrapper);

      const elCaption = document.createTextNode(policy.caption);
      elCaptionWrapper.appendChild(elCaption);
    }

    // input field
    const elInput = document.createElement('input');
    let elInputWrapper = null;

    if (parentName === 'Preferences_Value') {
      elInput.setAttribute('data-preference-policy', 'true');
      elInputWrapper = document.createElement('div');
      elInputWrapper.classList.add('position-relative');
      elInputWrapper.appendChild(elInput);
      elObjectWrapper.appendChild(elInputWrapper);
    }

    if (type === 'url') {
      elInput.setAttribute('type', 'url');

      if (policy.secure) {
        elInput.setAttribute('data-secure', 'true');
      }
      else if (policy.dataUriAllowed) {
        elInput.setAttribute('data-data-uri-allowed', 'true');
      }
    }
    else if (type === 'number') {
      elInput.setAttribute('type', 'number');
      elInput.setAttribute('min', '0');
      elInput.addEventListener('input', () => {
        if (!/^\d$/.test(elInput.value)) {
          elInput.checkValidity();
        }
      });
    }
    else {
      elInput.setAttribute('type', 'text');
    }

    elInput.setAttribute('id', domName);
    elInput.setAttribute('name', domName);
    elInput.setAttribute('placeholder', policy.label);

    if (!isArrayProperty || hideArrayActionLinks) {
      elInput.setAttribute('data-name', policy.name);
    }

    // mandatory field
    if (policy.mandatory) {
      if (parentName === 'Preferences_Value') {
        configurator.addMandatoryLabel(elInput, elInputWrapper);
      }
      else {
        configurator.addMandatoryLabel(elInput, elObjectWrapper);
      }
    }

    // URL validation label
    if (type === 'url') {
      configurator.addInvalidUrlLabel(elObjectWrapper);
    }

    elObjectWrapper.appendChild(elInput);

    // add array field action links if property of an array
    if (isArrayProperty && !hideArrayActionLinks) {
      el.classList.add('array-action-links');
      configurator.addArrayFieldActionLinks(elObjectWrapper, domName);
    }

    el.appendChild(elObjectWrapper);
  },

  /**
   * Adds a policy node the DOM. This method generates the common code which is the same for all object types.
   *
   * @param {string} key - the name of the policy
   * @param {object} policy - the policy object
   * @param {string} type - the type of the policy
   * @param {boolean} inverse - if true, the value for the policy will be false instead of true
   *
   * @returns {HTMLElement} - the DOM node containing the policy option
   */
  addPolicyNode (key, policy, type, inverse) {
    // start node for each policy
    const elObjectWrapper = document.createElement('div');
    elObjectWrapper.classList.add('checkbox', 'policy-container');

    // checkbox
    const elCheckbox = document.createElement('input');
    elCheckbox.setAttribute('type', 'checkbox');
    elCheckbox.setAttribute('id', key);
    elCheckbox.setAttribute('name', key);
    elCheckbox.setAttribute('data-name', key);
    elCheckbox.setAttribute('data-type', type);
    elCheckbox.classList.add('primary-checkbox');

    // set reverse attribute, can be used for boolean options with false instead of true as value
    if (inverse) {
      elCheckbox.setAttribute('data-inverse', 'true');
    }

    // sub key
    if (policy.sub_key) {
      elCheckbox.setAttribute('data-sub-key', policy.sub_key);
    }

    elObjectWrapper.appendChild(elCheckbox);

    // label
    const elLabel = document.createElement('label');
    elLabel.setAttribute('for', key);
    elLabel.textContent = browser.i18n.getMessage('policy_description_' + key);
    elObjectWrapper.appendChild(elLabel);

    // additional note
    if (policy.additional_note) {
      const elAdditionalNote = document.createElement('div');
      elAdditionalNote.classList.add('additional-note');
      elLabel.appendChild(elAdditionalNote);

      const elAdditionalNoteImage = document.createElement('img');
      elAdditionalNoteImage.src = '/images/warning.svg';
      elAdditionalNote.appendChild(elAdditionalNoteImage);

      const elAdditionalNoteText = document.createTextNode(policy.additional_note);
      elAdditionalNote.appendChild(elAdditionalNoteText);
    }

    // deprecation note
    if (policy.deprecation_note) {
      const elDeprecationNote = document.createElement('div');
      elDeprecationNote.classList.add('deprecation-note');
      elLabel.appendChild(elDeprecationNote);
      elLabel.classList.add('deprecated');

      const elDeprecationNoteImage = document.createElement('img');
      elDeprecationNoteImage.src = '/images/minus.svg';
      elDeprecationNote.appendChild(elDeprecationNoteImage);

      const elDeprecationNoteText = document.createTextNode(policy.deprecation_note);
      elDeprecationNote.appendChild(elDeprecationNoteText);
    }

    // versions info
    if (
      parseFloat(policy.first_available.mainstream) > MINIMUM_SUPPORTED_VERSION ||
      parseFloat(policy.first_available.esr) > MINIMUM_SUPPORTED_VERSION
    ) {
      const elVersionsInfo = document.createElement('div');
      elVersionsInfo.classList.add('versions-info');
      elLabel.appendChild(elVersionsInfo);

      const elVersionsInfoImage = document.createElement('img');
      elVersionsInfoImage.src = '/images/firefox.svg';
      elVersionsInfo.appendChild(elVersionsInfoImage);

      let versionTextContent = browser.i18n.getMessage('version_required') + ': ';

      if (policy.first_available.mainstream) {
        versionTextContent += 'Firefox ' + policy.first_available.mainstream;
        versionTextContent += ' ' + browser.i18n.getMessage('version_or_higher');
      }

      if (policy.first_available.mainstream && policy.first_available.esr) {
        versionTextContent += ', ';
      }

      if (policy.first_available.esr) {
        versionTextContent += 'Firefox ESR ' + policy.first_available.esr;
        versionTextContent += ' ' + browser.i18n.getMessage('version_or_higher');
      }

      const elVersionsInfoText = document.createTextNode(versionTextContent);
      elVersionsInfo.appendChild(elVersionsInfoText);
    }

    // info link
    if (policy.info_link) {
      configurator.addInfoLink(elLabel, policy.info_link);
    }

    return elObjectWrapper;
  },

  /**
   * Adds a label for select elements.
   *
   * @param {HTMLElement} elSelectWrapper - the DOM node of the wrapping element
   * @param {string} name - the name of the policy
   * @param {object} policy - the policy object
   *
   * @returns {void}
   */
  addSelectLabel (elSelectWrapper, name, policy) {
    const elSelectLabel = document.createElement('label');
    elSelectLabel.setAttribute('for', name);
    elSelectLabel.classList.add('select-label');
    elSelectLabel.textContent = policy.label;
    elSelectWrapper.appendChild(elSelectLabel);
  },

  /**
   * Adds an info link.
   *
   * @param {HTMLElement} label - the DOM node of the label element
   * @param {string} link - the URL of the info link
   *
   * @returns {void}
   */
  addInfoLink (label, link) {
    const elInfoLinkWrapper = document.createElement('div');
    elInfoLinkWrapper.classList.add('info-link');
    label.appendChild(elInfoLinkWrapper);

    const elInfoLink = document.createElement('a');
    elInfoLink.setAttribute('href', link);
    elInfoLink.setAttribute('target', '_blank');
    elInfoLinkWrapper.appendChild(elInfoLink);

    const elInfoLinkImage = document.createElement('img');
    elInfoLinkImage.src = '/images/link.svg';
    elInfoLink.appendChild(elInfoLinkImage);

    const elInfoLinkText = document.createTextNode(browser.i18n.getMessage('link_learn_more'));
    elInfoLink.appendChild(elInfoLinkText);
  },

  /**
   * Adds a remove and an add link for array fields to a policy node.
   *
   * @param {HTMLElement} elSubOptions - the DOM node of the wrapping element
   * @param {string} id - the policy key used as part of the DOM id for the add link
   *
   * @returns {void}
   */
  addArrayFieldActionLinks (elSubOptions, id) {
    // remove link
    const elRemoveLink = document.createElement('a');
    elRemoveLink.setAttribute('href', '#');
    elRemoveLink.setAttribute('data-action', 'remove');
    elRemoveLink.setAttribute('title', browser.i18n.getMessage('title_remove_row'));
    elRemoveLink.classList.add('array-action', 'disabled-link');
    elSubOptions.appendChild(elRemoveLink);

    const elRemoveIcon = document.createElement('img');
    elRemoveIcon.src = '/images/minus.svg';
    elRemoveIcon.classList.add('action-img');
    elRemoveIcon.setAttribute('alt', browser.i18n.getMessage('title_remove_row'));
    elRemoveLink.appendChild(elRemoveIcon);

    // add link
    const elAddLink = document.createElement('a');
    elAddLink.setAttribute('id', 'Array_Add_' + id);
    elAddLink.setAttribute('href', '#');
    elAddLink.setAttribute('data-action', 'add');
    elAddLink.setAttribute('data-count', '1');
    elAddLink.setAttribute('title', browser.i18n.getMessage('title_add_row'));
    elAddLink.classList.add('array-action');
    elSubOptions.appendChild(elAddLink);

    const elAddIcon = document.createElement('img');
    elAddIcon.src = '/images/plus.svg';
    elAddIcon.classList.add('action-img');
    elAddIcon.setAttribute('alt', browser.i18n.getMessage('title_add_row'));
    elAddLink.appendChild(elAddIcon);
  },

  /**
   * Adds a wrapper node for suboptions.
   *
   * @param {HTMLElement} elObjectWrapper - the DOM node of the wrapping element
   *
   * @returns {HTMLElement} - the DOM node of the wrapper for suboptions
   */
  addSubOptions (elObjectWrapper) {
    const elSubOptions = document.createElement('div');
    elSubOptions.classList.add('sub-options', 'disabled');
    elObjectWrapper.appendChild(elSubOptions);

    return elSubOptions;
  },

  /**
   * Adds a link for the "Locked" property.
   *
   * @param {HTMLElement} elSubOptions - the DOM node of the wrapping element
   * @param {string} key - the name of the policy
   *
   * @returns {void}
   */
  addLockableLink (elSubOptions, key) {
    const elLockCheckbox = document.createElement('input');
    elLockCheckbox.setAttribute('type', 'checkbox');
    elLockCheckbox.setAttribute('id', key + '_Locked');
    elLockCheckbox.setAttribute('name', key + '_Locked');
    elLockCheckbox.classList.add('lock-checkbox');
    elSubOptions.appendChild(elLockCheckbox);

    const elLockLabel = document.createElement('label');
    elLockLabel.setAttribute('for', key + '_Locked');
    elLockLabel.textContent = browser.i18n.getMessage('lock_preference');
    elSubOptions.appendChild(elLockLabel);
  },

  /**
   * Adds a label for mandatory fields.
   *
   * @param {HTMLElement} elMandatory - the DOM node of the mandatory field
   * @param {HTMLElement} elMandatoryWrapper - the DOM node of the wrapping element
   *
   * @returns {void}
   */
  addMandatoryLabel (elMandatory, elMandatoryWrapper) {
    elMandatory.setAttribute('data-mandatory', 'true');
    elMandatory.classList.add('mandatory-style');

    const elMandatoryLabel = document.createElement('div');
    elMandatoryLabel.classList.add('mandatory-label');
    elMandatoryLabel.innerText = browser.i18n.getMessage('mandatory_label');
    elMandatoryWrapper.appendChild(elMandatoryLabel);
  },

  /**
   * Adds a label for invalid JSON.
   *
   * @param {HTMLElement} elObjectWrapper - the DOM node of the wrapping element
   *
   * @returns {void}
   */
  addInvalidJsonLabel (elObjectWrapper) {
    const elLabel = document.createElement('div');
    elLabel.classList.add('invalid-json-label', 'hidden');
    elLabel.innerText = browser.i18n.getMessage('invalid_json_label');
    elObjectWrapper.appendChild(elLabel);
  },

  /**
   * Adds a label for invalid URLs.
   *
   * @param {HTMLElement} elObjectWrapper - the DOM node of the wrapping element
   *
   * @returns {void}
   */
  addInvalidUrlLabel (elObjectWrapper) {
    const elLabel = document.createElement('div');
    elLabel.classList.add('invalid-url-label', 'hidden');
    elLabel.innerText = browser.i18n.getMessage('invalid_url_label');
    elObjectWrapper.appendChild(elLabel);
  },

  /**
   * Adds a label for invalid version patterns.
   *
   * @param {HTMLElement} elObjectWrapper - the DOM node of the wrapping element
   *
   * @returns {void}
   */
  addInvalidVersionPatternLabel (elObjectWrapper) {
    const elLabel = document.createElement('div');
    elLabel.classList.add('invalid-version-pattern-label', 'hidden');
    elLabel.innerText = browser.i18n.getMessage('invalid_version_pattern_label');
    elObjectWrapper.appendChild(elLabel);
  },

  /**
   * Handles the exclusion of policies.
   *
   * @param {HTMLInputElement} elPolicy - the DOM node of the current element
   * @param {string} excludedPolicyName - the name of the excluded element
   *
   * @returns {void}
   */
  handlePolicyExclusion (elPolicy, excludedPolicyName) {
    let elExcludedPolicy = null;

    if (excludedPolicyName.includes('=')) {
      const excludePolicyArray = excludedPolicyName.split('=');
      elExcludedPolicy = document.querySelector('[data-name="' + excludePolicyArray[0] + '"]');
      const elExcludedPolicyParent = elExcludedPolicy.parentElement;
      const elExcludedPolicySelect = elExcludedPolicyParent.querySelector('select');

      // let's create a copy of the DOM element as elExcludedPolicy may be null later in the code below
      const elExcludedPolicyCopy = elExcludedPolicy;

      if (elExcludedPolicySelect) {
        const elPolicyParent = elPolicy.parentElement;

        if (elExcludedPolicySelect.value !== excludePolicyArray[1]) {
          elExcludedPolicy = null;
        }

        elExcludedPolicyCopy.addEventListener('change', () => {
          if (elExcludedPolicyCopy.checked && elExcludedPolicySelect.value === excludePolicyArray[1]) {
            elPolicy.setAttribute('disabled', 'disabled');
            elPolicyParent.classList.add('excluded');
            elPolicyParent.querySelector('select')?.setAttribute('disabled', 'disabled');
          }
          else {
            elPolicy.removeAttribute('disabled');
            elPolicyParent.classList.remove('excluded');
            elPolicyParent.querySelector('select')?.removeAttribute('disabled');
          }
        });

        elExcludedPolicySelect.addEventListener('change', () => {
          if (elExcludedPolicySelect.value === excludePolicyArray[1]) {
            elPolicy.setAttribute('disabled', 'disabled');
            elPolicyParent.classList.add('excluded');
            elPolicyParent.querySelector('select')?.setAttribute('disabled', 'disabled');
          }
          else {
            elPolicy.removeAttribute('disabled');
            elPolicyParent.classList.remove('excluded');
            elPolicyParent.querySelector('select')?.removeAttribute('disabled');
          }
        });
      }
    }
    else {
      elExcludedPolicy = document.querySelector('[data-name="' + excludedPolicyName + '"]');

      elPolicy.addEventListener('change', () => {
        const elExcludedPolicyParent = elExcludedPolicy.parentNode;
        const elExcludedPolicySelect = elExcludedPolicyParent.querySelector('select');

        if (elPolicy.checked) {
          elExcludedPolicy.setAttribute('disabled', 'disabled');
          elExcludedPolicyParent.classList.add('excluded');
          elExcludedPolicySelect?.setAttribute('disabled', 'disabled');
        }
        else {
          elExcludedPolicy.removeAttribute('disabled');
          elExcludedPolicyParent.classList.remove('excluded');
          elExcludedPolicySelect?.removeAttribute('disabled');
        }
      });
    }
  },

  /**
   * Implements code related to the filter field.
   *
   * @returns {void}
   */
  filterField () {
    const filterWrapper = document.getElementById('filter-wrapper');
    const filter = document.getElementById('filter');
    const styleHelper = document.getElementById('filter-style-helper');

    // re-apply active filter on reload
    configurator.applySearchFieldFilter(filter);

    if (filter.value) {
      filterWrapper.classList.add('open');
    }

    const close = (e) => {
      e.preventDefault();

      if (!filterWrapper.classList.contains('open')) {
        return;
      }

      filter.value = '';

      filterWrapper.classList.add('close');
      filterWrapper.classList.remove('open');

      setTimeout(() => {
        filterWrapper.classList.remove('close');
      }, FILTER_ANIMATION_DELAY_IN_MS);

      configurator.applySearchFieldFilter(filter);
    };

    filter.onfocus = () => {
      if (filterWrapper.classList.contains('open')) {
        return;
      }

      filterWrapper.classList.add('in');

      setTimeout(() => {
        filterWrapper.classList.add('open');
        filterWrapper.classList.remove('in');
      }, FILTER_ANIMATION_DELAY_IN_MS);

      window.onkeydown = (e) => {
        if (e.key === 'Escape' && document.activeElement === filter) {
          close(e);
          filter.blur();
        }
      };
    };

    styleHelper.onclick = (e) => {
      close(e);
    };

    filter.oninput = () => {
      configurator.applySearchFieldFilter(filter);
    };
  },

  /**
   * This method sets or removes an attribute based on the content of the filter field.
   *
   * @param {HTMLInputElement} filter - event
   *
   * @returns {void}
   */
  applySearchFieldFilter (filter) {
    const matcher = new RegExp(filter.value, 'i');

    [...document.getElementsByClassName('policy-container')].forEach((policy) => {
      [...policy.querySelectorAll(':scope > label, :scope > .label')].forEach((label) => {
        const policyName = policy.querySelector('.primary-checkbox').getAttribute('data-name');

        if (matcher.test(label.textContent) || matcher.test(policyName)) {
          policy.setAttribute('data-filtered', 'true');
        }
        else {
          policy.removeAttribute('data-filtered');
        }
      });
    });

    configurator.showFilteredResult();
  },

  /**
   * This method is used to show the filtered result.
   *
   * @returns {void}
   */
  showFilteredResult () {
    [...document.getElementsByClassName('policy-container')].forEach((policy) => {
      if (policy.hasAttribute('data-filtered')) {
        policy.classList.remove('hidden');
      }
      else {
        policy.classList.add('hidden');
      }
    });

    configurator.hideEmptyCategories();
  },

  /**
   * This method is used to hide all categories without visible policies.
   *
   * @returns {void}
   */
  hideEmptyCategories () {
    [...document.getElementsByClassName('options-block')].forEach((block) => {
      const isVisible = block.querySelector('.policy-container:not(.hidden)');

      if (isVisible) {
        block.previousElementSibling.classList.remove('hidden');
      }
      else {
        block.previousElementSibling.classList.add('hidden');
      }
    });
  }
};

configurator.init(false);
