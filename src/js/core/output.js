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
      let hasInvalidFields = false;

      if (el.querySelectorAll(':scope .mandatory-style').length > 0) {
        hasInvalidFields = true;
      }

      if (!hasInvalidFields) {
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
  },

  generateOutputForObjects (el) {
    const policy = { };

    [...el.parentNode.querySelectorAll(':scope > div > .object-array')].forEach((el) => {
      const items = [];

      [...el.querySelectorAll(':scope > div:not(.label)')].forEach((el) => {
        let hasInvalidFields = false;

        if (el.querySelectorAll(':scope .mandatory-style').length > 0) {
          hasInvalidFields = true;
        }

        if (!hasInvalidFields) {
          const obj = {};

          [...el.querySelectorAll(':scope > .input input')].forEach((arrEl) => {
            if (arrEl.value) {
              obj[arrEl.name] = arrEl.value;
            }
          });

          [...el.querySelectorAll(':scope > .enum select')].forEach((el) => {
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

            obj[el.name] = value;
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

    const lockable = el.parentNode.querySelector('.lock-checkbox');
    if (lockable && lockable.checked) {
      policy['Locked'] = true;
    }

    // only add non-empty policies
    if (Object.keys(policy).length > 0) {
      policymanager.add(el.name, policy);
    }
  },

  generateOutputForStrings (el) {
    policymanager.add(el.name, el.parentNode.querySelector('input[type=text]').value);
  }
};