'use strict';

/* global policymanager */

/**
 * @exports output
 */
const output = {
  /**
   * Generates the JSON output for the selected polices, calls the appropriate method.
   *
   * @returns {string} - the JSON output
   */
  generatePoliciesOutput () {
    policymanager.init();

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
        else if (el.getAttribute('data-type') === 'object') {
          output.generateOutputForObjects(el);
        }
        else if (el.getAttribute('data-type') === 'string') {
          output.generateOutputForStrings(el);
        }
        else if (el.getAttribute('data-type') === 'url') {
          output.generateOutputForUrls(el);
        }
      }
    });

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
        [...el.querySelectorAll(':scope input')].forEach((el) => {
          output.addInputValue(el, item);
        });

        // enum fields
        [...el.querySelectorAll(':scope select')].forEach((el) => {
          item[el.getAttribute('data-name')] = output.parseEnumContent(el);
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
      policymanager.add(el.getAttribute('data-name'), output.parseEnumContent(el));
    });
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
            obj[el.getAttribute('data-name')] = output.parseEnumContent(el);
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
      policy[el.getAttribute('data-name')] = output.parseEnumContent(el);
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
   * Generates output for policies of type "string".
   *
   * @param {HTMLElement} el - the DOM element of the policy
   *
   * @returns {void}
   */
  generateOutputForStrings (el) {
    policymanager.add(el.getAttribute('data-name'), el.parentNode.querySelector('input[type=text]').value);
  },

  /**
   * Generates output for policies of type "url".
   *
   * @param {HTMLElement} el - the DOM element of the policy
   *
   * @returns {void}
   */
  generateOutputForUrls (el) {
    const inputField = el.parentNode.querySelector('input[type=url]');

    if (!inputField.classList.contains('invalid-url-style')) {
      policymanager.add(el.getAttribute('data-name'), inputField.value);
    }
  },

  /**
   * Checks if a policy has invalid values.
   *
   * @param {HTMLElement} el - the DOM element of the policy
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
   * @param {Object} policy - the policy object
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
   * @param {Object} policy - the policy object
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
   * @param {Object} policy - the policy object
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
