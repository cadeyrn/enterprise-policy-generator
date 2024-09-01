'use strict';

/* global policymanager */

/**
 * @exports output
 */
const output = {
  /**
   * Contains the values of the policies of the type "preferences".
   *
   * @type {object}
   */
  preferences : {},

  /**
   * Generates the JSON output for the selected polices, calls the appropriate method.
   *
   * @returns {string} - the JSON output
   */
  generatePoliciesOutput () {
    policymanager.init();

    // reset "preferences" property to prevent outdated entries when generating policies multiple times
    output.preferences = {};

    // iterate over all checked policy fields and generate output
    [...document.querySelectorAll('.primary-checkbox')].forEach((el) => {
      if (el.checked) {
        if (el.getAttribute('data-type') === 'array') {
          output.generateOutputForArrays(el);
        }
        else if (el.getAttribute('data-type') === 'boolean') {
          output.generateOutputForBooleans(el);
        }
        else if (el.getAttribute('data-type') === 'enum') {
          output.generateOutputForEnums(el);
        }
        else if (el.getAttribute('data-type') === 'flat-array') {
          output.generateOutputForFlatArrays(el);
        }
        else if (el.getAttribute('data-type') === 'json-array') {
          output.generateOutputForJsonArrays(el);
        }
        else if (el.getAttribute('data-type') === 'key-object-list') {
          output.generateOutputForKeyObjectList(el);
        }
        else if (el.getAttribute('data-type') === 'key-value-pairs') {
          output.generateOutputForKeyValuePairs(el);
        }
        else if (el.getAttribute('data-type') === 'object') {
          output.generateOutputForObjects(el);
        }
        else if (el.getAttribute('data-type') === 'preference') {
          output.collectPreferences(el);
        }
        else if (el.getAttribute('data-type') === 'split-string') {
          output.generateOutputForSplitStrings(el);
        }
        else if (el.getAttribute('data-type') === 'split-url') {
          output.generateOutputForSplitUrls(el);
        }
        else if (el.getAttribute('data-type') === 'string') {
          output.generateOutputForStrings(el);
        }
        else if (el.getAttribute('data-type') === 'url') {
          output.generateOutputForUrls(el);
        }
      }
    });

    output.generateOutputForPreferences();

    return policymanager.getConfiguration();
  },

  /**
   * Generates output for policies of type "array".
   *
   * @param {HTMLElement} el - the DOM element of the policy
   *
   * @returns {void}
   */
  generateOutputForArrays (el) {
    const items = [];

    [...el.parentNode.querySelectorAll(':scope > div')].forEach((el) => {
      if (!output.hasInvalidFields(el)) {
        const item = { };

        // input fields
        [...el.querySelectorAll(':scope > .input input')].forEach((el) => {
          output.addInputValue(el, item);
        });

        // enum fields
        [...el.querySelectorAll(':scope > .enum select')].forEach((el) => {
          const enumContent = output.parseEnumContent(el);

          if (typeof enumContent !== 'undefined') {
            item[el.getAttribute('data-name')] = enumContent;
          }
        });

        // simple arrays
        [...el.querySelectorAll(':scope .array')].forEach((innerEl) => {
          const items = [];

          // input fields
          [...innerEl.querySelectorAll(':scope > .input input')].forEach((arrEl) => {
            if (arrEl.value && !arrEl.classList.contains('invalid-url-style')) {
              items.push(arrEl.value);
            }
          });

          // only add non-empty arrays
          if (items.length > 0) {
            item[innerEl.getAttribute('data-name')] = items;
          }
        });

        items.push(item);
      }
    });

    // only add non-empty arrays
    if (items.length > 0) {
      policymanager.add(el.getAttribute('data-name'), items);
    }
  },

  /**
   * Generates output for policies of type "boolean".
   *
   * @param {HTMLElement} el - the DOM element of the policy
   *
   * @returns {void}
   */
  generateOutputForBooleans (el) {
    policymanager.add(el.getAttribute('data-name'), !el.getAttribute('data-inverse'));
  },

  /**
   * Generates output for policies of type "enum".
   *
   * @param {HTMLElement} el - the DOM element of the policy
   *
   * @returns {void}
   */
  generateOutputForEnums (el) {
    [...el.parentNode.querySelectorAll(':scope > .enum select')].forEach((el) => {
      const enumContent = output.parseEnumContent(el);

      if (typeof enumContent !== 'undefined') {
        policymanager.add(el.getAttribute('data-name'), enumContent);
      }
    });
  },

  /**
   * Generates output for policies of type "flat-array".
   *
   * @param {HTMLElement} el - the DOM element of the policy
   *
   * @returns {void}
   */
  generateOutputForFlatArrays (el) {
    const items = [];

    [...el.parentNode.querySelectorAll(':scope > div')].forEach((el) => {
      if (!output.hasInvalidFields(el)) {
        [...el.querySelectorAll(':scope input')].forEach((el) => {
          if (el.value || el.getAttribute('data-empty-value-allowed')) {
            items.push(el.value);
          }
        });
      }
    });

    // only add non-empty arrays
    if (items.length > 0) {
      // add empty string instead of array if there is only one empty item
      if (items.length === 1 && items[0] === '') {
        policymanager.add(el.getAttribute('data-name'), '');
      }
      else {
        // only allow unique and non-empty values
        const uniqueItems = [...new Set(items.filter((item) => item))];

        policymanager.add(el.getAttribute('data-name'), uniqueItems);
      }
    }
  },

  /**
   * Generates output for policies of type "json-array".
   *
   * @param {HTMLElement} el - the DOM element of the policy
   *
   * @returns {void}
   */
  generateOutputForJsonArrays (el) {
    const subKey = el.getAttribute('data-sub-key');
    const items = {};

    [...el.parentNode.querySelectorAll(':scope .sub-options')].forEach((el) => {
      const elKey = el.getElementsByClassName('key')[0];
      const key = elKey ? elKey.value : el.getAttribute('data-key');

      if (key) {
        let properties = null;

        // textarea fields
        [...el.querySelectorAll(':scope textarea')].forEach((el) => {
          if (el.value) {
            properties = el.value.replace(/\n/g, '');

            try {
              properties = JSON.parse(properties);
            }
            /* eslint-disable no-unused-vars */
            catch (e) {
              properties = null;
            }
          }
        });

        // only add non-empty properties
        if (properties) {
          if (subKey) {
            if (!items[subKey]) {
              items[subKey] = {};
            }

            items[subKey][key] = properties;
          }
          else {
            items[key] = properties;
          }
        }
      }
    });

    // only add non-empty policies
    if (Object.keys(items).length > 0) {
      policymanager.add(el.getAttribute('data-name'), items);
    }
  },

  /**
   * Generates output for policies of type "key-object-list".
   *
   * @param {HTMLElement} el - the DOM element of the policy
   *
   * @returns {void}
   */
  generateOutputForKeyObjectList (el) {
    const items = {};

    [...el.parentNode.querySelectorAll(':scope .extra-options, :scope .sub-options')].forEach((el) => {
      const elKey = el.getElementsByClassName('key')[0];
      const key = elKey ? elKey.value : el.getAttribute('data-key');

      if (key && !output.hasInvalidFields(el) && !output.hasInvalidPreferenceFields(el)) {
        const properties = {};

        // arrays
        [...el.querySelectorAll(':scope > .array')].forEach((innerEl) => {
          const items = [];

          // input fields
          [...innerEl.querySelectorAll(':scope > .input input')].forEach((arrEl) => {
            if (arrEl.value && !arrEl.classList.contains('invalid-url-style')) {
              items.push(arrEl.value);
            }
          });

          // only add non-empty arrays
          if (items.length > 0) {
            properties[innerEl.getAttribute('data-name')] = items;
          }
        });

        // multiselect checkboxes
        [...el.querySelectorAll(':scope > .multiselect')].forEach((innerEl) => {
          const items = [];

          [...el.querySelectorAll(':scope .checkbox > input')].forEach((arrEl) => {
            if (arrEl.checked) {
              items.push(arrEl.value);
            }
          });

          // only add non-empty arrays
          if (items.length > 0) {
            properties[innerEl.getAttribute('data-name')] = items;
          }
        });

        // input fields
        [...el.querySelectorAll(':scope > .input input:not(.key), :scope .sub-sub-options > .input input')].forEach((el) => {
          let { value } = el;

          if (value && !el.classList.contains('invalid-url-style')) {
            if (el.getAttribute('data-preference-policy')) {
              const type = el.closest('.sub-sub-options').querySelector('[data-name="Type"]').value;

              if (type === 'number') {
                if (!isNaN(value)) {
                  value = parseInt(value);
                }
              }
              else if (type === 'boolean') {
                if (value === 'true' || value === 'false') {
                  value = JSON.parse(value);
                }
              }
            }

            properties[el.getAttribute('data-name')] = value;
          }
        });

        // enum fields
        [...el.querySelectorAll(':scope > .enum select, :scope .sub-sub-options > .enum select')].forEach((el) => {
          const enumContent = output.parseEnumContent(el);

          if (typeof enumContent !== 'undefined') {
            properties[el.getAttribute('data-name')] = enumContent;
          }
        });

        // only add non-empty properties
        if (Object.values(properties).length > 0) {
          items[key] = properties;
        }
      }
    });

    // only add non-empty policies
    if (Object.keys(items).length > 0) {
      policymanager.add(el.getAttribute('data-name'), items);
    }
  },

  /**
   * Generates output for policies of type "key-value-pairs".
   *
   * @param {HTMLElement} el - the DOM element of the policy
   *
   * @returns {void}
   */
  generateOutputForKeyValuePairs (el) {
    const items = {};

    [...el.parentNode.querySelectorAll(':scope > div')].forEach((el) => {
      const key = el.getElementsByClassName('key')[0];
      const value = el.getElementsByClassName('value')[0];
      if (!output.hasInvalidFields(el)) {
        items[key.value] = value.value;
      }
    });

    // only add non-empty policies
    if (Object.keys(items).length > 0) {
      policymanager.add(el.getAttribute('data-name'), items);
    }
  },

  /**
   * Generates output for policies of type "object".
   *
   * @param {HTMLElement} el - the DOM element of the policy
   *
   * @returns {void}
   */
  generateOutputForObjects (el) {
    const policy = { };

    // objects
    [...el.parentNode.querySelectorAll(':scope > div > .object')].forEach((el) => {
      const obj = {};

      // checkboxes
      [...el.querySelectorAll(':scope .checkbox > input')].forEach((el) => {
        output.addCheckboxValue(el, obj);
      });

      // simple arrays
      [...el.querySelectorAll(':scope > div > .array')].forEach((innerEl) => {
        const items = [];

        // input fields
        [...innerEl.querySelectorAll(':scope > .input input')].forEach((arrEl) => {
          if (arrEl.value && !arrEl.classList.contains('invalid-url-style')) {
            items.push(arrEl.value);
          }
        });

        // only add non-empty arrays
        if (items.length > 0) {
          obj[innerEl.getAttribute('data-name')] = items;
        }
      });

      // enum fields
      [...el.querySelectorAll(':scope > div > .enum select')].forEach((el) => {
        const enumContent = output.parseEnumContent(el);

        if (typeof enumContent !== 'undefined') {
          obj[el.getAttribute('data-name')] = enumContent;
        }
      });

      // only add non-empty policies
      if (Object.keys(obj).length > 0) {
        policy[el.getAttribute('data-name')] = obj;
      }

      // locked property
      const lockable = el.querySelector(':scope > div > .lock-checkbox');
      if (lockable && lockable.checked) {
        if (!policy[el.getAttribute('data-name')]) {
          policy[el.getAttribute('data-name')] = {};
        }

        policy[el.getAttribute('data-name')]['Locked'] = true;
      }

      if (policy[el.getAttribute('data-name')]) {
        output.addLockedField(el.querySelector(':scope > div'), policy[el.getAttribute('data-name')]);
      }
    });

    // object arrays
    [...el.parentNode.querySelectorAll(':scope > div > .object-array')].forEach((el) => {
      const items = [];

      [...el.querySelectorAll(':scope > div:not(.label)')].forEach((el) => {
        if (!output.hasInvalidFields(el)) {
          const obj = {};

          // input fields
          [...el.querySelectorAll(':scope > .input input')].forEach((arrEl) => {
            if (!arrEl.classList.contains('invalid-url-style')) {
              output.addInputValue(arrEl, obj);
            }
          });

          // enum fields
          [...el.querySelectorAll(':scope > .enum select')].forEach((el) => {
            const enumContent = output.parseEnumContent(el);

            if (typeof enumContent !== 'undefined') {
              obj[el.getAttribute('data-name')] = enumContent;
            }
          });

          // only add non-empty objects
          if (Object.keys(obj).length > 0) {
            items.push(obj);
          }
        }
      });

      // only add non-empty arrays
      if (items.length > 0) {
        policy[el.getAttribute('data-name')] = items;
      }
    });

    // object lists
    [...el.parentNode.querySelectorAll(':scope > div > .object-list')].forEach((el) => {
      const category = {};

      [...el.querySelectorAll(':scope .sub-options')].forEach((el) => {
        const obj = {};

        // enum fields
        [...el.querySelectorAll(':scope .enum select')].forEach((el) => {
          const enumContent = output.parseEnumContent(el);

          if (typeof enumContent !== 'undefined') {
            obj[el.getAttribute('data-name')] = enumContent;
          }
        });

        [...el.querySelectorAll(':scope .object-array')].forEach((el) => {
          const items = [];

          [...el.querySelectorAll(':scope > div:not(.label)')].forEach((el) => {
            const innerObj = {};

            // input fields
            /* eslint-disable max-nested-callbacks */
            [...el.querySelectorAll(':scope > .input input')].forEach((arrEl) => {
              output.addInputValue(arrEl, innerObj);
            });

            // allow empty objects
            items.push(innerObj);
          });

          // only add non-empty arrays
          if (items.length > 0) {
            obj[el.getAttribute('data-name')] = items;
          }
        });

        const key = el.querySelector(':scope > .input input').value;

        // only add non-empty objects
        if (key && Object.keys(obj).length > 0) {
          category[key] = obj;
        }
      });

      // only add non-empty arrays
      if (Object.keys(category).length > 0) {
        policy[el.getAttribute('data-name')] = category;
      }
    });

    // simple arrays
    [...el.parentNode.querySelectorAll(':scope > div > .array')].forEach((el) => {
      const items = [];

      // input fields
      [...el.querySelectorAll(':scope > .input input')].forEach((arrEl) => {
        if (arrEl.value && !arrEl.classList.contains('invalid-url-style')) {
          items.push(arrEl.value);
        }
      });

      // only add non-empty arrays
      if (items.length > 0) {
        policy[el.getAttribute('data-name')] = items;
      }
    });

    // checkboxes
    [...el.parentNode.querySelectorAll(':scope > div > .checkbox input')].forEach((el) => {
      output.addCheckboxValue(el, policy);
    });

    // enum fields
    [...el.parentNode.querySelectorAll(':scope > div > .enum select')].forEach((el) => {
      const enumContent = output.parseEnumContent(el);

      if (typeof enumContent !== 'undefined') {
        policy[el.getAttribute('data-name')] = enumContent;
      }
    });

    // input fields
    [...el.parentNode.querySelectorAll(':scope > div > .input input')].forEach((el) => {
      if (!el.classList.contains('invalid-url-style')) {
        output.addInputValue(el, policy);
      }
    });

    // set "Locked" field
    output.addLockedField(el, policy);

    // only add non-empty policies
    if (Object.keys(policy).length > 0) {
      policymanager.add(el.getAttribute('data-name'), policy);
    }
  },

  /**
   * Collects values for policies of type "preference" in a global property, output will be generated in
   * generateOutputForPreferences().
   *
   * @param {HTMLElement} el - the DOM element of the policy
   *
   * @returns {void}
   */
  collectPreferences (el) {
    // arrays
    [...el.parentNode.querySelectorAll(':scope > .array')].forEach((innerEl) => {
      const items = [];

      // input fields
      [...innerEl.querySelectorAll(':scope > .input')].forEach((arrEl) => {
        if (arrEl.firstChild.value) {
          items.push(arrEl.firstChild.value);
        }
      });

      // only add non-empty arrays
      if (items.length > 0) {
        output.preferences[innerEl.getAttribute('data-name')] = items.join(',');
      }
    });

    // boolean fields
    [...el.parentNode.querySelectorAll(':scope > .boolean')].forEach((el) => {
      const value = JSON.parse(el.firstChild.options[el.firstChild.selectedIndex].value);
      output.preferences[el.getAttribute('data-name')] = value;
    });

    // enum fields
    [...el.parentNode.querySelectorAll(':scope > .enum')].forEach((el) => {
      output.preferences[el.getAttribute('data-name')] = output.parseEnumContent(el.firstChild);
    });

    // input fields
    [...el.parentNode.querySelectorAll(':scope > .input')].forEach((el) => {
      if (el.firstChild.value) {
        output.preferences[el.getAttribute('data-name')] = el.firstChild.value;
      }
    });
  },

  /**
   * Generates output for policies of type "preference", collected before in collectPreferences().
   *
   * @returns {void}
   */
  generateOutputForPreferences () {
    // only add non-empty arrays
    if (Object.keys(output.preferences).length > 0) {
      if (policymanager.data.policies['Preferences']) {
        output.preferences = { ...output.preferences, ...policymanager.data.policies['Preferences'] };
      }

      policymanager.add('Preferences', output.preferences);
    }
  },

  /**
   * Generates output for policies of type "split-string".
   *
   * @param {HTMLElement} el - the DOM element of the policy
   *
   * @returns {void}
   */
  generateOutputForSplitStrings (el) {
    const items = [];

    [...el.parentNode.querySelectorAll(':scope > div')].forEach((el) => {
      if (!output.hasInvalidFields(el)) {
        [...el.querySelectorAll(':scope input')].forEach((el) => {
          if (el.value) {
            items.push(el.value);
          }
        });
      }
    });

    const uniqueItems = [...new Set(items.filter((item) => item))];
    policymanager.add(el.getAttribute('data-name'), uniqueItems.join(','));
  },

  /**
   * Generates output for policies of type "split-url".
   *
   * @param {HTMLElement} el - the DOM element of the policy
   *
   * @returns {void}
   */
  generateOutputForSplitUrls (el) {
    const items = [];

    [...el.parentNode.querySelectorAll(':scope > div')].forEach((el) => {
      if (!output.hasInvalidFields(el)) {
        [...el.querySelectorAll(':scope input')].forEach((el) => {
          items.push(el.value);
        });
      }
    });

    // add empty string if there is only one empty item
    if (items.length === 1 && items[0] === '') {
      policymanager.add(el.getAttribute('data-name'), '');
    }
    else {
      // only allow unique and non-empty values
      const uniqueItems = [...new Set(items.filter((item) => item))];

      policymanager.add(el.getAttribute('data-name'), uniqueItems.join('|'));
    }
  },

  /**
   * Generates output for policies of type "string".
   *
   * @param {HTMLElement} el - the DOM element of the policy
   *
   * @returns {void}
   */
  generateOutputForStrings (el) {
    if (!output.hasInvalidFields(el.parentNode)) {
      policymanager.add(el.getAttribute('data-name'), el.parentNode.querySelector('input[type=text]').value);
    }
  },

  /**
   * Generates output for policies of type "url".
   *
   * @param {HTMLElement} el - the DOM element of the policy
   *
   * @returns {void}
   */
  generateOutputForUrls (el) {
    if (!output.hasInvalidFields(el.parentNode)) {
      const inputField = el.parentNode.querySelector('input[type=url]');

      if (!inputField.classList.contains('invalid-url-style')) {
        policymanager.add(el.getAttribute('data-name'), inputField.value);
      }
    }
  },

  /**
   * Checks if a policy has invalid values.
   *
   * @param {HTMLElement|ParentNode} el - the DOM element of the policy
   *
   * @returns {boolean} - whether the policy has invalid values or not
   */
  hasInvalidFields (el) {
    let hasInvalidFields = false;

    if (el.querySelectorAll(':scope .mandatory-style').length > 0) {
      hasInvalidFields = true;
    }

    return hasInvalidFields;
  },

  /**
   * Checks if a policy has invalid preference values.
   *
   * @param {HTMLElement|ParentNode} el - the DOM element of the policy
   *
   * @returns {boolean} - whether the policy has invalid values or not
   */
  hasInvalidPreferenceFields (el) {
    let hasInvalidFields = false;

    if (el.querySelectorAll(':scope .invalid-preference-style').length > 0) {
      hasInvalidFields = true;
    }

    return hasInvalidFields;
  },

  /**
   * Parses enum fields, there are a few special values.
   *
   * @param {HTMLSelectElement} el - the DOM element of the policy
   *
   * @returns {string} - the parsed value of the enum field
   */
  parseEnumContent (el) {
    let { value } = el.options[el.selectedIndex];

    // null represents an empty state, there is nothing to do
    if (value === 'null') {
      return void 0;
    }

    // if the value is a number treat it as number
    if (!isNaN(value)) {
      value = parseInt(value);
    }

    // if the value is a boolean treat it as boolean
    if (value === 'true' || value === 'false') {
      value = JSON.parse(value);
    }

    return value;
  },

  /**
   * Adds the value of an input field to the output.
   *
   * @param {HTMLInputElement} el - the DOM element of the policy
   * @param {object} policy - the policy object
   *
   * @returns {void}
   */
  addInputValue (el, policy) {
    if (el.value) {
      policy[el.getAttribute('data-name')] = el.value;
    }
  },

  /**
   * Adds the value of a checkbox field to the output.
   *
   * @param {HTMLInputElement} el - the DOM element of the policy
   * @param {object} policy - the policy object
   *
   * @returns {void}
   */
  addCheckboxValue (el, policy) {
    if (el.checked) {
      policy[el.getAttribute('data-name')] = true;
    }
  },

  /**
   * Adds the value of the "Locked" field to the output.
   *
   * @param {HTMLElement} el - the DOM element of the policy
   * @param {object} policy - the policy object
   *
   * @returns {void}
   */
  addLockedField (el, policy) {
    const lockable = el.parentNode.querySelector(':scope > div > .lock-checkbox');

    if (lockable && lockable.checked) {
      policy['Locked'] = true;
    }
  }
};
