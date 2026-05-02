'use strict';

/* global PolicyManager */

class Output {
  /**
   * Generate the policies.json output.
   *
   * @param {boolean} withSyntaxHighlighting - whether to enable the syntax highlighting
   *
   * @returns {string} - the policies.json output
   */
  static generatePoliciesOutput (withSyntaxHighlighting = false) {
    PolicyManager.init();

    // iterate over all checked policy fields and generate output
    document.querySelectorAll('.policy-checkbox:not([disabled])').forEach($el => {
      if ($el.checked) {
        const $container = $el.closest('.policy-container');
        const type = $container.getAttribute('data-type');
        let policy = null;

        switch (type) {
          case 'array':
            policy = Output.#addArrayValue($container.querySelector('.array-wrapper'));
            break;
          case 'boolean':
            policy = Output.#addBooleanValue($el);
            break;
          case 'enum':
            policy = Output.#addEnumValue($container.querySelector('.options > .enum-wrapper > select'));
            break;
          case 'object':
            policy = Output.#addObjectValue($container.querySelector('.options > .object-wrapper'));
            break;
          case 'string':
            policy = Output.#addStringValue($container.querySelector('.options > .input-wrapper > input'));
            break;
          default:
            // do nothing
        }

        if (policy !== null) {
          PolicyManager.add($container.getAttribute('data-name'), policy);
        }
      }
    });

    if (withSyntaxHighlighting) {
      return PolicyManager.getHighlightedConfiguration(document.getElementById('policy-output').parentElement);
    }

    return PolicyManager.getConfiguration();
  }

  /**
   * Add the value of an array field to the output.
   *
   * @param {HTMLInputElement} $el - the DOM element of the array container
   *
   * @returns {object} - the value for the field
   */
  static #addArrayValue ($el) {
    // empty value is allowed
    if ($el.hasAttribute('data-empty-value-allowed')) {
      const $containers = $el.querySelectorAll(':scope > .array-container');
      if ($containers.length === 1) {
        const $container = $containers[0];
        const $objectWrapper = $container.querySelector(':scope > .object-wrapper');
        if ($objectWrapper) {
          if (!Array.from($objectWrapper.querySelectorAll('input')).some($el => $el.value)) {
            return [{}];
          }
        }
        else if ($container.querySelector(':scope > .input-wrapper > input').value === '') {
          return '';
        }
      }
    }

    const $keyWrappers = $el.querySelectorAll('.key-wrapper');
    const items = $keyWrappers.length > 0 ? {} : [];

    $el.querySelectorAll(':scope > :is(.additional-item, .array-container)').forEach($el => {
      if (!Output.#hasInvalidFields($el)) {
        // array fields
        $el.querySelectorAll(':scope > .array-wrapper').forEach($el => {
          const value = Output.#addArrayValue($el);
          if (value !== null) {
            items.push(value);
          }
        });

        // boolean fields
        $el.querySelectorAll(':scope > .boolean-wrapper input').forEach($el => {
          const value = Output.#addBooleanValue($el);
          if (value) {
            items.push(value);
          }
        });

        // input fields
        $el.querySelectorAll(':scope > .input-wrapper > input').forEach($el => {
          const value = Output.#addStringValue($el);
          if (value !== null) {
            if ($keyWrappers.length > 0) {
              const $keyWrapper = $el.parentElement.parentElement.querySelector('.key-wrapper');
              const key = $keyWrapper.querySelector(':scope > input');
              const keyValue = key ? key.value : $keyWrapper.getAttribute('data-value');
              items[keyValue] = value;
            }
            else {
              items.push(value);
            }
          }
        });

        // object fields
        $el.querySelectorAll(':scope > .object-wrapper').forEach($el => {
          const obj = Output.#addObjectValue($el);
          if (obj !== null) {
            const $container = $el.querySelector(':scope > .key-wrapper');

            if ($container) {
              const key = $container.querySelector(':scope > input');
              const value = key ? key.value : $container.getAttribute('data-value');
              $keyWrappers ? items[value] = obj : items.push(obj);
            }
            else {
              items.push(obj);
            }
          }
        });

        // textarea fields
        $el.querySelectorAll(':scope > .input-wrapper > textarea').forEach($el => {
          const obj = Output.#addStringValue($el);
          if (obj !== null) {
            const $container = $el.parentElement.parentElement.querySelector(':scope > .key-wrapper');

            if ($container) {
              const key = $container.querySelector(':scope > input');
              const value = key ? key.value : $container.getAttribute('data-value');
              $keyWrappers ? items[value] = obj : items.push(obj);
            }
            else {
              items.push(obj);
            }
          }
        });
      }
    });

    if ($keyWrappers.length > 0 && Object.keys(items).length > 0) {
      return items;
    }
    else if (items.length > 0) {
      const uniqueItems = [...new Set(items.filter(item => item))];

      if ($el.getAttribute('data-join')) {
        return uniqueItems.join($el.getAttribute('data-join'));
      }

      return uniqueItems;
    }

    return null;
  }

  /**
   * Add the value of a boolean field to the output.
   *
   * @param {HTMLInputElement} $el - the DOM element of the checkbox
   *
   * @returns {boolean|string|null} - the value for the field
   */
  static #addBooleanValue ($el) {
    if ($el.checked) {
      // array of checkboxes
      if ($el.parentElement.parentElement.classList.contains('array-container')) {
        return $el.getAttribute('data-name');
      }

      // simple checkbox
      return !$el.getAttribute('data-inverse');
    }

    return null;
  }

  /**
   * Add the value of an enum field to the output.
   *
   * @param {HTMLSelectElement} $el - the DOM element of the select element
   *
   * @returns {string|integer|boolean|null} - the value for the field
   */
  static #addEnumValue ($el) {
    let { value } = $el.options[$el.selectedIndex];

    // null represents an empty state, there is nothing to do
    if (value === 'null') {
      return null;
    }

    // if the value is a number, treat it as a number
    if (!isNaN(value)) {
      value = parseInt(value);
    }

    // if the value is a boolean, treat it as a boolean
    if (value === 'true' || value === 'false') {
      value = JSON.parse(value);
    }

    return value;
  }

  /**
   * Add the value of the "object" field to the output.
   *
   * @param {HTMLElement} $el - the DOM element of the object container
   *
   * @returns {?object} - the value for the field
   */
  static #addObjectValue ($el) {
    const obj = {};

    // array fields
    $el.querySelectorAll(':scope > .array-wrapper').forEach($el => {
      const value = Output.#addArrayValue($el);
      if (value !== null) {
        obj[$el.getAttribute('data-name')] = value;
      }
    });

    // boolean fields
    $el.querySelectorAll(':scope > .boolean-wrapper input').forEach($el => {
      const value = Output.#addBooleanValue($el);
      if (value !== null) {
        obj[$el.getAttribute('data-name')] = value;
      }
    });

    // enum fields
    $el.querySelectorAll(':scope > .enum-wrapper > select').forEach($el => {
      const value = Output.#addEnumValue($el);
      if (value !== null) {
        obj[$el.getAttribute('data-name')] = value;
      }
    });

    // input fields
    $el.querySelectorAll(':scope > .input-wrapper > input').forEach($el => {
      const value = Output.#addStringValue($el);
      if (value !== null) {
        obj[$el.getAttribute('data-name')] = value;
      }
    });

    // locked field
    if ($el.querySelector(':scope > .lock-checkbox')?.checked) {
      obj['Locked'] = true;
    }

    // object fields
    $el.querySelectorAll(':scope > .object-wrapper').forEach($el => {
      const value = Output.#addObjectValue($el);
      if (value !== null) {
        obj[$el.getAttribute('data-name')] = value;
      }
    });

    return Object.keys(obj).length > 0 ? obj : null;
  }

  /**
   * Add the value of a string field to the output.
   *
   * @param {HTMLInputElement} $el - the DOM element of the input field
   *
   * @returns {?string} - the value for the field
   */
  static #addStringValue ($el) {
    const outputFilter = $el.getAttribute('data-output-filter');
    let { value } = $el;

    if (value && !$el.classList.contains('invalid-input-style')) {
      // update the value based on a filter method
      if (outputFilter) {
        if (outputFilter === 'ends_with_dot' && !value.endsWith('.')) {
          value += '.';
        }
        else if (outputFilter === 'type_aware') {
          const $container = $el.closest('.object-wrapper');
          const type = $container.querySelector('[data-name="Type"]').value;

          if (type === 'number') {
            if (!isNaN(parseInt(value))) {
              value = parseInt(value);
            }
          }
          else if (type === 'boolean') {
            if (value === 'true' || value === 'false') {
              value = JSON.parse(value);
            }
          }
        }
      }

      // JSON field
      if ($el.getAttribute('data-validations')?.includes('json')) {
        return JSON.parse(value.replace(/\n/g, ''));
      }

      return $el.getAttribute('inputmode') === 'numeric' ? parseInt(value) : value;
    }

    return null;
  }

  /**
   * Check if there are invalid values.
   *
   * @param {HTMLElement} $el - the DOM element to check
   *
   * @returns {boolean} - whether the policy has invalid values
   */
  static #hasInvalidFields ($el) {
    let hasInvalidFields = false;

    if ($el.querySelectorAll('.invalid-input-label:not(.hidden)').length > 0) {
      hasInvalidFields = true;
    }

    return hasInvalidFields;
  }
}
