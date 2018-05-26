'use strict';

/* global policymanager */

/**
 * @exports output
 */
const output = {
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
      }
    });

    return policymanager.getConfiguration();
  },

  generateOutputForArrays (el) {
    const items = [];

    [...el.parentNode.querySelectorAll(':scope > div')].forEach((el) => {
      if (!output.hasInvalidFields(el)) {
        const item = { };

        [...el.querySelectorAll(':scope input')].forEach((el) => {
          if (el.value) {
            item[el.name] = el.value;
          }
        });

        [...el.querySelectorAll(':scope select')].forEach((el) => {
          item[el.name] = output.parseEnumContent(el);
        });

        items.push(item);
      }
    });

    if (items.length > 0) {
      policymanager.add(el.name, items);
    }
  },

  generateOutputForBooleans (el) {
    policymanager.add(el.name, !el.getAttribute('data-inverse'));
  },

  generateOutputForEnums (el) {
    const { name } = el;

    [...el.parentNode.querySelectorAll(':scope > .enum select')].forEach((el) => {
      policymanager.add(name, output.parseEnumContent(el));
    });
  },

  generateOutputForObjects (el) {
    const policy = { };

    [...el.parentNode.querySelectorAll(':scope > div > .object-array')].forEach((el) => {
      const items = [];

      [...el.querySelectorAll(':scope > div:not(.label)')].forEach((el) => {
        if (!output.hasInvalidFields(el)) {
          const obj = {};

          [...el.querySelectorAll(':scope > .input input')].forEach((arrEl) => {
            if (arrEl.value) {
              obj[arrEl.name] = arrEl.value;
            }
          });

          [...el.querySelectorAll(':scope > .enum select')].forEach((el) => {
            obj[el.name] = output.parseEnumContent(el);
          });

          // only add non-empty object
          if (Object.keys(obj).length > 0) {
            items.push(obj);
          }
        }
      });

      if (items.length > 0) {
        policy[el.getAttribute('data-name')] = items;
      }
    });

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
      policy[el.name] = output.parseEnumContent(el);
    });

    [...el.parentNode.querySelectorAll(':scope > div > .input input')].forEach((el) => {
      if (el.value) {
        policy[el.name] = el.value;
      }
    });

    // set "Locked" field
    output.addLockedField(el, policy);

    // only add non-empty policies
    if (Object.keys(policy).length > 0) {
      policymanager.add(el.name, policy);
    }
  },

  generateOutputForStrings (el) {
    policymanager.add(el.name, el.parentNode.querySelector('input[type=text]').value);
  },

  hasInvalidFields (el) {
    let hasInvalidFields = false;

    if (el.querySelectorAll(':scope .mandatory-style').length > 0) {
      hasInvalidFields = true;
    }

    return hasInvalidFields;
  },

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

  addLockedField (el, policy) {
    const lockable = el.parentNode.querySelector('.lock-checkbox');

    if (lockable && lockable.checked) {
      policy['Locked'] = true;
    }
  }
};
