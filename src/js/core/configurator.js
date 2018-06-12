'use strict';

/* global output, policies, policymanager */

const DOWNLOAD_PERMISSION = { permissions : ['downloads'] };

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
   * @type {Array.<string>}
   */
  uiCategoryElements : [],

  /**
   * The init() method. Defines UI categories, adds policies to UI, setup all the event listeners.
   *
   * @returns {void}
   */
  init () {
    // define ui categories
    const categories = [
      'block-access', 'disable-features', 'customization', 'network', 'privacy', 'security',
      'updates-and-data', 'others'
    ];

    const categoriesLength = categories.length;
    for (let i = 0; i < categoriesLength; i++) {
      configurator.uiCategoryElements[categories[i]] = document.getElementById('options-' + categories[i]);
    }

    // iterate over polices from policies.js and call the appropriate option type for each policy
    for (const key in policies) {
      if (policies[key].type === 'array') {
        configurator.addArrayOption(key, policies[key]);
      }
      else if (policies[key].type === 'boolean') {
        configurator.addBooleanOption(key, policies[key]);
      }
      else if (policies[key].type === 'boolean-inverse') {
        configurator.addBooleanOption(key, policies[key], true);
      }
      else if (policies[key].type === 'enum') {
        configurator.addEnumOption(key, policies[key]);
      }
      else if (policies[key].type === 'object') {
        configurator.addObjectOption(key, policies[key]);
      }
      else if (policies[key].type === 'string') {
        configurator.addStringOption(key, policies[key]);
      }
    }

    // test if the download permission is granted or not
    configurator.testDownloadPermission();

    // remove "hidden" state from enabled policies
    [...document.querySelectorAll('.primary-checkbox')].forEach((el) => {
      if (el.checked) {
        const elSubOptions = el.parentNode.getElementsByClassName('sub-options');
        if (elSubOptions.length > 0) {
          elSubOptions[0].classList.remove('disabled');
        }
      }
    });

    // show suboptions for enabled policies and hide suboptions for disabled policies
    [...document.querySelectorAll('.primary-checkbox')].forEach((el) => {
      el.addEventListener('change', () => {
        const elSubOptions = el.parentNode.getElementsByClassName('sub-options');
        if (elSubOptions.length > 0) {
          elSubOptions[0].classList.toggle('disabled');
        }
      });
    });

    // add event listener for array field actions (plus / minus icons)
    [...document.querySelectorAll('.array-action')].forEach((el) => {
      el.addEventListener('click', configurator.executeArrayFieldActions);
    });

    // add event listener for mandatory field validation
    [...document.querySelectorAll('input[data-mandatory]')].forEach((el) => {
      el.addEventListener('input', configurator.validateMandatoryFields);
    });

    // action for clicking the "generate policies" button
    elPolicyGeneratorButton.addEventListener('click', (e) => {
      e.preventDefault();

      elPolicyOutput.innerText = output.generatePoliciesOutput();
      elActionLinks.classList.remove('hidden');
    });

    // action for clicking the "select all" link
    elSelectAllLink.addEventListener('click', (e) => {
      e.preventDefault();

      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(elPolicyOutput);
      selection.removeAllRanges();
      selection.addRange(range);
    });

    // action for clicking the "download policies.json" link if downloads permission is not granted
    elGrantDownloadPermissionLink.addEventListener('click', async (e) => {
      e.preventDefault();

      const granted = await browser.permissions.request(DOWNLOAD_PERMISSION);

      // immediately prompt for download after the downloads permission has been granted
      if (granted) {
        configurator.downloadPolicy();
      }
    });

    // action for clicking the "download policies.json" link if downloads permission is granted
    elDownloadLink.addEventListener('click', (e) => {
      e.preventDefault();

      configurator.downloadPolicy();
    });
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
        configurator.addArrayField(e.target);
        break;
      case 'remove':
        configurator.removeArrayField(e.target);
        break;
      default:
      // do nothing
    }
  },

  addArrayField (el, i, overrideCount) {
    // after adding a new array item the remove link of the first one shouldn't be disabled
    if (el.parentNode.parentNode.querySelector('.disabled-link')) {
      el.parentNode.parentNode.querySelector('.disabled-link').classList.remove('disabled-link');
    }

    // increment array field counter
    const count = (overrideCount ? overrideCount : parseInt(el.getAttribute('data-count'))) + 1;

    el.closest('.checkbox').querySelectorAll('[data-count]').forEach((el) => {
      el.setAttribute('data-count', count);
    });

    // copy the array item
    const addedNode = el.parentNode.cloneNode(true);

    // we want an empty input field for the copied array item, we also need a new DOM ID
    addedNode.querySelectorAll('input').forEach((el) => {
      const id = el.id.replace(/^(\w+)_(\d+)$/i, (fullMatch, name) => name + '_' + (i ? i : count));

      el.value = '';
      el.setAttribute('id', id);
      el.setAttribute('name', id);
    });

    // for select fields we also need a new DOM ID
    addedNode.querySelectorAll('select').forEach((el) => {
      const id = el.id.replace(/^(\w+)_(\d+)$/i, (fullMatch, name) => name + '_' + (i ? i : count));
      el.setAttribute('id', id);
      el.setAttribute('name', id);
    });

    // we have to re-add our event listener for executing the array field actions
    addedNode.querySelectorAll('a').forEach((el) => {
      el.addEventListener('click', configurator.executeArrayFieldActions);
    });

    // we also have to re-add the event listener for the validation of mandatory fields
    addedNode.querySelectorAll('input[data-mandatory]').forEach((el) => {
      el.addEventListener('input', configurator.validateMandatoryFields);
      el.classList.add('mandatory-style');
      el.parentNode.querySelector('.mandatory-label').classList.remove('hidden');
    });

    // add the copied array item to the DOM
    el.parentNode.after(addedNode);
  },

  removeArrayField (el) {
    // different object types have different DOM structures, we need to know the number of total array items
    const elGrandParent = el.parentNode.parentNode;
    const isObjectArray = elGrandParent.classList.contains('object-array');
    const hasSubOptions = elGrandParent.querySelectorAll('.sub-options').length > 0;
    let newLength = 0;

    if (isObjectArray) {
      newLength = elGrandParent.querySelectorAll(':scope > div').length - 2;
    }
    else if (hasSubOptions) {
      newLength = elGrandParent.querySelectorAll('.sub-options').length - 1;
    }
    else {
      newLength = elGrandParent.querySelectorAll('.input').length - 1;
    }

    // remove the array item from the DOM
    if (!el.classList.contains('disabled-link')) {
      el.parentNode.remove();
    }

    // if there is only one array item after removing another array item the remove link should be disabled
    if (newLength === 1) {
      elGrandParent.querySelector('[data-action="remove"]').classList.add('disabled-link');
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
   * Appends policy element to the appropriate UI category in the DOM.
   *
   * @param {HTMLElement} el - the DOM element
   * @param {string} category - the name of the category
   *
   * @returns {void}
   */
  addOptionToUi (el, category) {
    configurator.uiCategoryElements[category].appendChild(el);
  },

  /**
   * Adds policy of the type "array" to the DOM.
   *
   * @param {string} key - the name of the policy
   * @param {Object} policy - the policy object
   *
   * @returns {void}
   */
  addArrayOption (key, policy) {
    const elObjectWrapper = configurator.addPolicyNode(key, policy, 'array');
    const elSubOptions = configurator.addSubOptions(elObjectWrapper);

    // add array properties
    const optionsLength = policy.items.length;
    for (let i = 0; i < optionsLength; i++) {
      configurator.addProperty(elSubOptions, key + '_' + policy.items[i].name, policy.items[i], true, true);
    }

    // add array field action links
    configurator.addArrayFieldActionLinks(elSubOptions);

    // add option to UI
    configurator.addOptionToUi(elObjectWrapper, policy.ui_category);
  },

  /**
   * Adds policy of the type "boolean" to the DOM.
   *
   * @param {string} key - the name of the policy
   * @param {Object} policy - the policy object
   * @param {boolean} inverse - if true, the value for the policy will be false instead of true
   *
   * @returns {void}
   */
  addBooleanOption (key, policy, inverse) {
    const elObjectWrapper = configurator.addPolicyNode(key, policy, 'boolean', inverse);

    // add option to UI
    configurator.addOptionToUi(elObjectWrapper, policy.ui_category);
  },

  /**
   * Adds policy of the type "enum" to the DOM.
   *
   * @param {string} key - the name of the policy
   * @param {Object} policy - the policy object
   *
   * @returns {void}
   */
  addEnumOption (key, policy) {
    const elObjectWrapper = configurator.addPolicyNode(key, policy, 'enum');

    const elSelectWrapper = document.createElement('div');
    elSelectWrapper.classList.add('enum', 'sub-options', 'select-wrapper', 'disabled');

    // label
    if (policy.label) {
      configurator.addSelectLabel(elSelectWrapper, key + '_select', policy);
    }

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
      elSelect.appendChild(elOption);
    }

    // add option to UI
    configurator.addOptionToUi(elObjectWrapper, policy.ui_category);
  },

  /**
   * Adds policy of the type "object" to the DOM.
   *
   * @param {string} key - the name of the policy
   * @param {Object} policy - the policy object
   *
   * @returns {void}
   */
  addObjectOption (key, policy) {
    const elObjectWrapper = configurator.addPolicyNode(key, policy, 'object');
    const elSubOptions = configurator.addSubOptions(elObjectWrapper);

    // policy can be locked
    if (policy.is_lockable) {
      configurator.addLockableLink(elSubOptions, key);
    }

    // add properties
    if (policy.properties) {
      const optionsLength = policy.properties.length;
      for (let i = 0; i < optionsLength; i++) {
        configurator.addProperty(elSubOptions, key, policy.properties[i]);
      }
    }

    // add option to UI
    configurator.addOptionToUi(elObjectWrapper, policy.ui_category);
  },

  /**
   * Adds policy of the type "string" to the DOM.
   *
   * @param {string} key - the name of the policy
   * @param {Object} policy - the policy object
   *
   * @returns {void}
   */
  addStringOption (key, policy) {
    const elObjectWrapper = configurator.addPolicyNode(key, policy, 'string');
    const elSubOptions = configurator.addSubOptions(elObjectWrapper);

    // input field
    const elInputWrapper = document.createElement('div');
    elInputWrapper.classList.add('input');

    const elInput = document.createElement('input');
    elInput.setAttribute('type', 'text');
    elInput.setAttribute('id', key + '_Text');
    elInput.setAttribute('name', key + '_Text');
    elInput.setAttribute('data-name', key);
    elInput.setAttribute('placeholder', policy.label);

    elSubOptions.appendChild(elInput);

    // add option to UI
    configurator.addOptionToUi(elObjectWrapper, policy.ui_category);
  },

  /**
   * Adds a property to a policy field, calls the appropriate method.
   *
   * @param {HTMLElement} el - the DOM element of the policy
   * @param {string} parentName - the name of the parent policy object
   * @param {Object} policy - the policy object
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
        configurator.addBooleanProperty(el, policy);
        break;
      case 'enum':
        configurator.addEnumProperty(el, parentName, policy, isArrayProperty);
        break;
      case 'object-array':
        configurator.addObjectArrayProperty(el, parentName, policy);
        break;
      case 'string':
        configurator.addStringProperty(el, parentName, policy, false, isArrayProperty, hideArrayActionLinks);
        break;
      case 'url':
        configurator.addStringProperty(el, parentName, policy, true, isArrayProperty, hideArrayActionLinks);
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
   * @param {Object} policy - the policy object
   *
   * @returns {void}
   */
  addArrayProperty (el, parentName, policy) {
    const elObjectWrapper = document.createElement('div');
    elObjectWrapper.classList.add('array');
    elObjectWrapper.setAttribute('data-name', policy.name);

    const elCaptionWrapper = document.createElement('div');
    elCaptionWrapper.classList.add('label');
    elObjectWrapper.appendChild(elCaptionWrapper);

    const elCaption = document.createTextNode(policy.label);
    elCaptionWrapper.appendChild(elCaption);

    // add array items
    if (policy.items) {
      configurator.addProperty(elObjectWrapper, parentName + '_' + policy.name, policy.items, true);
    }

    el.appendChild(elObjectWrapper);
  },

  /**
   * Adds property of the type "boolean" to a policy.
   *
   * @param {HTMLElement} el - the DOM element of the policy
   * @param {Object} policy - the policy object
   *
   * @returns {void}
   */
  addBooleanProperty (el, policy) {
    const elObjectWrapper = document.createElement('div');
    elObjectWrapper.classList.add('checkbox');

    // checkbox
    const elInput = document.createElement('input');
    elInput.setAttribute('type', 'checkbox');
    elInput.setAttribute('id', policy.name);
    elInput.setAttribute('name', policy.name);
    elInput.setAttribute('data-name', policy.name);

    // mandatory field
    if (policy.mandatory) {
      configurator.addMandatoryLabel(elInput, elObjectWrapper);
    }

    elObjectWrapper.appendChild(elInput);

    // label
    const elLabel = document.createElement('label');
    elLabel.setAttribute('for', policy.name);
    elLabel.textContent = policy.label;
    elObjectWrapper.appendChild(elLabel);

    el.appendChild(elObjectWrapper);
  },

  /**
   * Adds property of the type "enum" to a policy.
   *
   * @param {HTMLElement} el - the DOM element of the policy
   * @param {string} parentName - the name of the parent policy object
   * @param {Object} policy - the policy object
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

    // we need an unique and deterministic name as DOM id and name
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

    // add options to select element
    const optionsLength = policy.options.length;
    for (let i = 0; i < optionsLength; i++) {
      const elOptionLabel = document.createTextNode(policy.options[i].label);
      const elOption = document.createElement('option');
      elOption.setAttribute('value', policy.options[i].value);
      elOption.appendChild(elOptionLabel);
      elSelect.appendChild(elOption);
    }

    elSelectWrapper.appendChild(elSelect);

    el.appendChild(elObjectWrapper);
  },

  /**
   * Adds property of the type "object-array" to a policy.
   *
   * @param {HTMLElement} el - the DOM element of the policy
   * @param {string} parentName - the name of the parent policy object
   * @param {Object} policy - the policy object
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
    configurator.addArrayFieldActionLinks(elSubOptions);
  },

  /**
   * Adds property of the type "string" or "url" to a policy.
   *
   * @param {HTMLElement} el - the DOM element of the policy
   * @param {string} parentName - the name of the parent policy object
   * @param {Object} policy - the policy object
   * @param {boolean} isUrl - if true, the property is of the type "url", otherwise it's of the type "string"
   * @param {boolean} isArrayProperty - whether this call is within an array field or not
   * @param {boolean} hideArrayActionLinks - whether this is an array item but no action links should be added
   *
   * @returns {void}
   */
  addStringProperty (el, parentName, policy, isUrl, isArrayProperty, hideArrayActionLinks) {
    const elObjectWrapper = document.createElement('div');
    elObjectWrapper.classList.add('input');

    // we need an unique and deterministic name as DOM id and name
    const domName = isArrayProperty ? parentName + '_1' : parentName + '_' + policy.name;

    // input field
    const elInput = document.createElement('input');
    elInput.setAttribute('type', 'text');
    elInput.setAttribute('id', domName);
    elInput.setAttribute('name', domName);
    elInput.setAttribute('placeholder', policy.label);

    if (!isArrayProperty || hideArrayActionLinks) {
      elInput.setAttribute('data-name', policy.name);
    }

    // mandatory field
    if (policy.mandatory) {
      configurator.addMandatoryLabel(elInput, elObjectWrapper);
    }

    elObjectWrapper.appendChild(elInput);

    // add array field action links if property of an array
    if (isArrayProperty && !hideArrayActionLinks) {
      configurator.addArrayFieldActionLinks(elObjectWrapper);
    }

    el.appendChild(elObjectWrapper);
  },

  /**
   * Adds a policy node the DOM. This method generates the common code which is the same for all object types.
   *
   * @param {string} key - the name of the policy
   * @param {Object} policy - the policy object
   * @param {string} type - the type of the policy
   * @param {boolean} inverse - if true, the value for the policy will be false instead of true
   *
   * @returns {HTMLElement} - the DOM node containing the policy option
   */
  addPolicyNode (key, policy, type, inverse) {
    // start node for each policy
    const elObjectWrapper = document.createElement('div');
    elObjectWrapper.classList.add('checkbox');

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

    elObjectWrapper.appendChild(elCheckbox);

    // label
    const elLabel = document.createElement('label');
    elLabel.setAttribute('for', key);
    elLabel.textContent = policy.description;
    elObjectWrapper.appendChild(elLabel);

    // esr only notice
    if (policy.enterprise_only) {
      const elESRNotice = document.createElement('div');
      elESRNotice.classList.add('esr-only');
      elLabel.appendChild(elESRNotice);

      const elESRImage = document.createElement('img');
      elESRImage.src = '/images/warning.svg';
      elESRNotice.appendChild(elESRImage);

      const elESRText = document.createTextNode(browser.i18n.getMessage('enterprise_only_label'));
      elESRNotice.appendChild(elESRText);
    }

    // info link
    if (policy.info_link) {
      const elInfoLinkWrapper = document.createElement('div');
      elInfoLinkWrapper.classList.add('info-link');
      elLabel.appendChild(elInfoLinkWrapper);

      const elInfoLink = document.createElement('a');
      elInfoLink.setAttribute('href', policy.info_link);
      elInfoLink.setAttribute('target', '_blank');
      elInfoLink.setAttribute('rel', 'noopener');
      elInfoLinkWrapper.appendChild(elInfoLink);

      const elInfoLinkImage = document.createElement('img');
      elInfoLinkImage.src = '/images/link.svg';
      elInfoLink.appendChild(elInfoLinkImage);

      const elInfoLinkText = document.createTextNode(browser.i18n.getMessage('link_learn_more'));
      elInfoLink.appendChild(elInfoLinkText);
    }

    return elObjectWrapper;
  },

  /**
   * Adds a label for select elements.
   *
   * @param {HTMLElement} elSelectWrapper - the DOM node of the wrapping element
   * @param {string} name - the name of the policy
   * @param {Object} policy - the policy object
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
   * Adds a remove and an add link for array fields to a policy node.
   *
   * @param {HTMLElement} elSubOptions - the DOM node of the wrapping element
   *
   * @returns {void}
   */
  addArrayFieldActionLinks (elSubOptions) {
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
    elMandatoryLabel.innerText = browser.i18n.getMessage('mandatory-label');
    elMandatoryWrapper.appendChild(elMandatoryLabel);
  }
};

configurator.init();
