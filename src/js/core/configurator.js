'use strict';

/* global policies, policymanager */

const elActionLinks = document.getElementById('action-links');
const elDownloadLink = document.getElementById('download');
const elPolicyGeneratorButton = document.getElementById('generate');
const elPolicyOutput = document.getElementById('policy-output');
const elSelectAllLink = document.getElementById('select-all');

/**
 * @exports configurator
 */
const configurator = {
  uiCategoryElements : [],

  init () {
    configurator.uiCategoryElements['block-access'] = document.getElementById('options-block-access');
    configurator.uiCategoryElements['disable-features'] = document.getElementById('options-disable-features');
    configurator.uiCategoryElements['customization'] = document.getElementById('options-customization');
    configurator.uiCategoryElements['network'] = document.getElementById('options-network');
    configurator.uiCategoryElements['privacy'] = document.getElementById('options-privacy');
    configurator.uiCategoryElements['security'] = document.getElementById('options-security');
    configurator.uiCategoryElements['updates-and-data'] = document.getElementById('options-updates-and-data');
    configurator.uiCategoryElements['others'] = document.getElementById('options-others');

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

    [...document.querySelectorAll('.primary-checkbox')].forEach((el) => {
      el.addEventListener('change', () => {
        const elSubOptions = el.parentNode.getElementsByClassName('sub-options');
        if (elSubOptions.length > 0) {
          elSubOptions[0].classList.toggle('disabled');
        }
      });
    });

    [...document.querySelectorAll('.array-action')].forEach((el) => {
      el.addEventListener('click', configurator.addArrayActionListenerns);
    });

    elPolicyGeneratorButton.onclick = function (e) {
      e.preventDefault();

      elPolicyOutput.innerText = configurator.generatePoliciesOutput();
      elActionLinks.classList.remove('hidden');
    };

    elSelectAllLink.onclick = function (e) {
      e.preventDefault();

      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(elPolicyOutput);
      selection.removeAllRanges();
      selection.addRange(range);
    };

    elDownloadLink.onclick = function (e) {
      e.preventDefault();

      browser.downloads.download({
        'saveAs' : true,
        'url' : URL.createObjectURL(new Blob([elPolicyOutput.innerText])),
        'filename' : 'policies.js',
      });
    };
  },

  addArrayActionListenerns (e) {
    e.preventDefault();

    switch (e.target.getAttribute('data-action')) {
      case 'add':
        if (e.target.parentNode.parentNode.querySelector('.disabled-link')) {
          e.target.parentNode.parentNode.querySelector('.disabled-link').classList.remove('disabled-link');
        }

        const addedNode = e.target.parentNode.cloneNode(true);

        addedNode.querySelectorAll('input').forEach((el) => {
          const randomId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);

          el.value = '';
          el.setAttribute('id', randomId);
        });

        addedNode.querySelectorAll('a').forEach((el) => {
          el.addEventListener('click', configurator.addArrayActionListenerns);
        });

        e.target.parentNode.after(addedNode);
        break;
      case 'remove':
        const elGrandParent = e.target.parentNode.parentNode;
        const hasSubOptions = elGrandParent.querySelectorAll('.sub-options').length > 0;
        let newLength = 0;

        if (hasSubOptions) {
          newLength = elGrandParent.querySelectorAll('.sub-options').length - 1;
        }
        else {
          newLength = elGrandParent.querySelectorAll('.input').length - 1;
        }

        if (!e.target.classList.contains('disabled-link')) {
          e.target.parentNode.remove();
        }

        if (newLength === 1) {
          elGrandParent.querySelector('[data-action="remove"]').classList.add('disabled-link');
        }

        break;
      default:
      // do nothing
    }
  },

  addProperty (el, policy, isArrayProperty) {
    switch (policy.type) {
      case 'array':
        configurator.addArrayProperty(el, policy);
        break;
      case 'boolean':
        configurator.addBooleanProperty(el, policy);
        break;
      case 'enum':
        configurator.addEnumProperty(el, policy);
        break;
      case 'string':
        configurator.addStringProperty(el, policy, isArrayProperty);
        break;
      case 'url':
        configurator.addUrlProperty(el, policy, isArrayProperty);
        break;
      default:
      // do nothing
    }
  },

  addBooleanProperty (el, policy) {
    const elObjectWrapper = document.createElement('div');
    elObjectWrapper.classList.add('checkbox');

    const elInput = document.createElement('input');
    elInput.setAttribute('type', 'checkbox');
    elInput.setAttribute('name', policy.name);
    elInput.setAttribute('id', policy.name);

    if (policy.mandatory) {
      elInput.setAttribute('data-mandatory', 'true');
    }

    elObjectWrapper.appendChild(elInput);

    const elLabel = document.createElement('label');
    elLabel.setAttribute('for', policy.name);
    elLabel.textContent = policy.label;
    elObjectWrapper.appendChild(elLabel);

    el.appendChild(elObjectWrapper);
  },

  addEnumProperty (el, policy) {
    const elObjectWrapper = document.createElement('div');
    elObjectWrapper.classList.add('enum');

    const elSelect = document.createElement('select');
    elSelect.setAttribute('name', policy.name);
    elSelect.setAttribute('id', policy.name);

    if (policy.mandatory) {
      elSelect.setAttribute('data-mandatory', 'true');
    }

    for (const key in policy.options) {
      if ({}.hasOwnProperty.call(policy.options, key)) {
        const elOptionLabel = document.createTextNode(policy.options[key].label);
        const elOption = document.createElement('option');
        elOption.setAttribute('value', policy.options[key].value);
        elOption.appendChild(elOptionLabel);
        elSelect.appendChild(elOption);
      }
    }

    elObjectWrapper.appendChild(elSelect);

    const elLabel = document.createElement('label');
    elLabel.setAttribute('for', policy.name);
    elLabel.textContent = policy.label;
    elObjectWrapper.appendChild(elLabel);

    el.appendChild(elObjectWrapper);
  },

  addStringProperty (el, policy, isArrayProperty) {
    const elObjectWrapper = document.createElement('div');
    elObjectWrapper.classList.add('input');

    if (isArrayProperty) {
      policy.name = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    }

    const elInput = document.createElement('input');
    elInput.setAttribute('type', 'text');
    elInput.setAttribute('name', policy.name);
    elInput.setAttribute('id', policy.name);
    elInput.setAttribute('placeholder', policy.label);

    if (policy.mandatory) {
      elInput.setAttribute('data-mandatory', 'true');
    }

    elObjectWrapper.appendChild(elInput);

    if (isArrayProperty) {
      const elRemoveIconText = document.createTextNode('[-]');
      const elRemoveIcon = document.createElement('a');
      elRemoveIcon.appendChild(elRemoveIconText);
      elRemoveIcon.setAttribute('href', '#');
      elRemoveIcon.setAttribute('data-action', 'remove');
      elRemoveIcon.setAttribute('title', browser.i18n.getMessage('title_remove_row'));
      elRemoveIcon.classList.add('array-action');
      elRemoveIcon.classList.add('disabled-link');
      elObjectWrapper.appendChild(elRemoveIcon);

      const elAddIconText = document.createTextNode('[+]');
      const elAddIcon = document.createElement('a');
      elAddIcon.appendChild(elAddIconText);
      elAddIcon.setAttribute('href', '#');
      elAddIcon.setAttribute('data-action', 'add');
      elAddIcon.setAttribute('title', browser.i18n.getMessage('title_add_row'));
      elAddIcon.classList.add('array-action');
      elObjectWrapper.appendChild(elAddIcon);
    }

    el.appendChild(elObjectWrapper);
  },

  addUrlProperty (el, policy, isArrayProperty) {
    const elObjectWrapper = document.createElement('div');
    elObjectWrapper.classList.add('input');

    if (isArrayProperty) {
      policy.name = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    }

    const elInput = document.createElement('input');
    elInput.setAttribute('type', 'url');
    elInput.setAttribute('name', policy.name);
    elInput.setAttribute('id', policy.name);
    elInput.setAttribute('placeholder', policy.label);

    if (policy.mandatory) {
      elInput.setAttribute('data-mandatory', 'true');
    }

    elObjectWrapper.appendChild(elInput);

    if (isArrayProperty) {
      const elRemoveIconText = document.createTextNode('[-]');
      const elRemoveIcon = document.createElement('a');
      elRemoveIcon.appendChild(elRemoveIconText);
      elRemoveIcon.setAttribute('href', '#');
      elRemoveIcon.setAttribute('data-action', 'remove');
      elRemoveIcon.setAttribute('title', browser.i18n.getMessage('title_remove_row'));
      elRemoveIcon.classList.add('array-action');
      elRemoveIcon.classList.add('disabled-link');
      elObjectWrapper.appendChild(elRemoveIcon);

      const elAddIconText = document.createTextNode('[+]');
      const elAddIcon = document.createElement('a');
      elAddIcon.appendChild(elAddIconText);
      elAddIcon.setAttribute('href', '#');
      elAddIcon.setAttribute('data-action', 'add');
      elAddIcon.setAttribute('title', browser.i18n.getMessage('title_add_row'));
      elAddIcon.classList.add('array-action');
      elObjectWrapper.appendChild(elAddIcon);
    }

    el.appendChild(elObjectWrapper);
  },

  addArrayProperty (el, policy) {
    const elObjectWrapper = document.createElement('div');
    elObjectWrapper.classList.add('array');
    elObjectWrapper.setAttribute('data-name', policy.name);

    const elCaption = document.createTextNode(policy.label);
    elObjectWrapper.appendChild(elCaption);

    if (policy.items) {
      configurator.addProperty(elObjectWrapper, policy.items, true);
    }

    el.appendChild(elObjectWrapper);
  },

  addOptionToUi (el, category) {
    configurator.uiCategoryElements[category].appendChild(el);
  },

  addArrayOption (key, policy) {
    const elObjectWrapper = document.createElement('div');
    elObjectWrapper.classList.add('checkbox');

    const elCheckbox = document.createElement('input');
    elCheckbox.setAttribute('type', 'checkbox');
    elCheckbox.setAttribute('name', key);
    elCheckbox.setAttribute('id', key);
    elCheckbox.setAttribute('data-type', 'array');
    elCheckbox.classList.add('primary-checkbox');

    elObjectWrapper.appendChild(elCheckbox);

    const elLabel = document.createElement('label');
    elLabel.setAttribute('for', key);
    elLabel.textContent = policy.description;
    elObjectWrapper.appendChild(elLabel);

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

    const elSubOptions = document.createElement('div');
    elSubOptions.classList.add('sub-options', 'disabled');
    elObjectWrapper.appendChild(elSubOptions);

    for (const key in policy.items) {
      if ({}.hasOwnProperty.call(policy.items, key)) {
        configurator.addProperty(elSubOptions, policy.items[key]);
      }
    }

    const elRemoveIconText = document.createTextNode('[-]');
    const elRemoveIcon = document.createElement('a');
    elRemoveIcon.appendChild(elRemoveIconText);
    elRemoveIcon.setAttribute('href', '#');
    elRemoveIcon.setAttribute('data-action', 'remove');
    elRemoveIcon.setAttribute('title', browser.i18n.getMessage('title_remove_row'));
    elRemoveIcon.classList.add('array-action');
    elRemoveIcon.classList.add('disabled-link');
    elSubOptions.appendChild(elRemoveIcon);

    const elAddIconText = document.createTextNode('[+]');
    const elAddIcon = document.createElement('a');
    elAddIcon.appendChild(elAddIconText);
    elAddIcon.setAttribute('href', '#');
    elAddIcon.setAttribute('data-action', 'add');
    elAddIcon.setAttribute('title', browser.i18n.getMessage('title_add_row'));
    elAddIcon.classList.add('array-action');
    elSubOptions.appendChild(elAddIcon);

    configurator.addOptionToUi(elObjectWrapper, policy.ui_category);
  },

  addBooleanOption (key, policy, inverse) {
    const elObjectWrapper = document.createElement('div');
    elObjectWrapper.classList.add('checkbox');

    const elCheckbox = document.createElement('input');
    elCheckbox.setAttribute('type', 'checkbox');
    elCheckbox.setAttribute('name', key);
    elCheckbox.setAttribute('id', key);
    elCheckbox.setAttribute('data-type', 'boolean');
    elCheckbox.classList.add('primary-checkbox');

    if (inverse) {
      elCheckbox.setAttribute('data-inverse', 'true');
    }

    elObjectWrapper.appendChild(elCheckbox);

    const elLabel = document.createElement('label');
    elLabel.setAttribute('for', key);
    elLabel.textContent = policy.description;
    elObjectWrapper.appendChild(elLabel);

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

    configurator.addOptionToUi(elObjectWrapper, policy.ui_category);
  },

  addEnumOption (key, policy) {
    const elObjectWrapper = document.createElement('div');
    elObjectWrapper.classList.add('checkbox');

    const elCheckbox = document.createElement('input');
    elCheckbox.setAttribute('type', 'checkbox');
    elCheckbox.setAttribute('name', key);
    elCheckbox.setAttribute('id', key);
    elCheckbox.setAttribute('data-type', 'enum');
    elCheckbox.classList.add('primary-checkbox');

    elObjectWrapper.appendChild(elCheckbox);

    const elLabel = document.createElement('label');
    elLabel.setAttribute('for', key);
    elLabel.textContent = policy.description;
    elObjectWrapper.appendChild(elLabel);

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

    const elSelectWrapper = document.createElement('div');
    elSelectWrapper.classList.add('enum', 'sub-options', 'disabled');

    const elSelect = document.createElement('select');
    elSelect.setAttribute('name', key + '_select');
    elSelect.setAttribute('id', key + '_select');

    elSelectWrapper.appendChild(elSelect);
    elObjectWrapper.appendChild(elSelectWrapper);

    for (const key in policy.options) {
      if ({}.hasOwnProperty.call(policy.options, key)) {
        const elOptionLabel = document.createTextNode(policy.options[key].label);
        const elOption = document.createElement('option');
        elOption.setAttribute('value', policy.options[key].value);
        elOption.appendChild(elOptionLabel);
        elSelect.appendChild(elOption);
      }
    }

    const elSelectLabel = document.createElement('label');
    elSelectLabel.setAttribute('for', key + '_select');
    elSelectLabel.textContent = policy.label;
    elSelectWrapper.appendChild(elSelectLabel);

    configurator.addOptionToUi(elObjectWrapper, policy.ui_category);
  },

  addStringOption (key, policy) {
    const elObjectWrapper = document.createElement('div');
    elObjectWrapper.classList.add('checkbox');

    const elCheckbox = document.createElement('input');
    elCheckbox.setAttribute('type', 'checkbox');
    elCheckbox.setAttribute('name', key);
    elCheckbox.setAttribute('id', key);
    elCheckbox.setAttribute('data-type', 'string');
    elCheckbox.classList.add('primary-checkbox');

    elObjectWrapper.appendChild(elCheckbox);

    const elLabel = document.createElement('label');
    elLabel.setAttribute('for', key);
    elLabel.textContent = policy.description;
    elObjectWrapper.appendChild(elLabel);

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

    const elSubOptions = document.createElement('div');
    elSubOptions.classList.add('sub-options', 'disabled');
    elObjectWrapper.appendChild(elSubOptions);

    const elInputWrapper = document.createElement('div');
    elInputWrapper.classList.add('input');

    const elInput = document.createElement('input');
    elInput.setAttribute('type', 'text');
    elInput.setAttribute('name', key + 'Text');
    elInput.setAttribute('id', key + 'Text');

    elSubOptions.appendChild(elInput);

    const elInputLabel = document.createElement('label');
    elInputLabel.setAttribute('for', key + 'Text');
    elInputLabel.textContent = policy.label;
    elSubOptions.appendChild(elInputLabel);

    configurator.addOptionToUi(elObjectWrapper, policy.ui_category);
  },

  addObjectOption (key, policy) {
    const elObjectWrapper = document.createElement('div');
    elObjectWrapper.classList.add('checkbox');

    const elCheckbox = document.createElement('input');
    elCheckbox.setAttribute('type', 'checkbox');
    elCheckbox.setAttribute('name', key);
    elCheckbox.setAttribute('id', key);
    elCheckbox.setAttribute('data-type', 'object');
    elCheckbox.classList.add('primary-checkbox');

    elObjectWrapper.appendChild(elCheckbox);

    const elLabel = document.createElement('label');
    elLabel.setAttribute('for', key);
    elLabel.textContent = policy.description;
    elObjectWrapper.appendChild(elLabel);

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

    const elSubOptions = document.createElement('div');
    elSubOptions.classList.add('sub-options', 'disabled');
    elObjectWrapper.appendChild(elSubOptions);

    if (policy.properties) {
      for (const key in policy.properties) {
        if ({}.hasOwnProperty.call(policy.properties, key)) {
          configurator.addProperty(elSubOptions, policy.properties[key]);
        }
      }
    }

    configurator.addOptionToUi(elObjectWrapper, policy.ui_category);
  },

  generatePoliciesOutput () {
    policymanager.init();

    [...document.querySelectorAll('.primary-checkbox')].forEach((el) => {
      if (el.checked) {
        if (el.getAttribute('data-type') === 'array') {
          const items = [];

          [...el.parentNode.querySelectorAll(':scope > div')].forEach((el) => {
            const item = { };

            [...el.querySelectorAll(':scope input')].forEach((el) => {
              if (el.value) {
                item[el.name] = el.value;
              }
            });

            [...el.querySelectorAll(':scope select')].forEach((el) => {
              let { value } = el.options[el.selectedIndex];

              switch (value) {
                case 'true':
                  value = true;
                  break;
                case 'false':
                  value = false;
                  break;
                default:
                // do nothing
              }

              item[el.name] = value;
            });

            items.push(item);
          });

          if (items.length > 0) {
            policymanager.add(el.name, items);
          }
        }
        else if (el.getAttribute('data-type') === 'boolean') {
          policymanager.add(el.name, !el.getAttribute('data-inverse'));
        }
        else if (el.getAttribute('data-type') === 'enum') {
          const { name } = el;

          [...el.parentNode.querySelectorAll(':scope > .enum select')].forEach((el) => {
            let { value } = el.options[el.selectedIndex];

            // null represents an empty state, there is nothing to do
            if (value === 'null') {
              return;
            }

            // if the value is a number treat it as number
            if (!isNaN(value)) {
              value = parseInt(value);
            }

            switch (value) {
              case 'true':
                value = true;
                break;
              case 'false':
                value = false;
                break;
              default:
              // do nothing
            }

            policymanager.add(name, value);
          });
        }
        else if (el.getAttribute('data-type') === 'object') {
          const policy = { };

          [...el.parentNode.querySelectorAll(':scope > div > .array')].forEach((el) => {
            const items = [];

            [...el.querySelectorAll(':scope > .input input')].forEach((arrEl) => {
              if (arrEl.value) {
                items.push(arrEl.value);
              }
            });

            if (items.length > 0) {
              policy[el.getAttribute('data-name')] = items;
            }
          });

          [...el.parentNode.querySelectorAll(':scope > div > .checkbox input')].forEach((el) => {
            if (el.checked) {
              policy[el.name] = true;
            }
          });

          [...el.parentNode.querySelectorAll(':scope > div > .enum select')].forEach((el) => {
            let { value } = el.options[el.selectedIndex];

            // null represents an empty state, there is nothing to do
            if (value === 'null') {
              return;
            }

            // if the value is a number treat it as number
            if (!isNaN(value)) {
              value = parseInt(value);
            }

            switch (value) {
              case 'true':
                value = true;
                break;
              case 'false':
                value = false;
                break;
              default:
              // do nothing
            }

            policy[el.name] = value;
          });

          [...el.parentNode.querySelectorAll(':scope > div > .input input')].forEach((el) => {
            if (el.value) {
              policy[el.name] = el.value;
            }
          });

          // only add non-empty policies
          if (Object.keys(policy).length > 0) {
            policymanager.add(el.name, policy);
          }
        }
        else if (el.getAttribute('data-type') === 'string') {
          policymanager.add(el.name, el.parentNode.querySelector('input[type=text]').value);
        }
      }
    });

    return policymanager.getConfiguration();
  }
};

configurator.init();
