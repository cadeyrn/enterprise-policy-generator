'use strict';

/* global Configurator */

class Serializer {
  /**
   * The serializer stores all the array items and form values in an object.
   *
   * @returns {object} - the serialized data as an object
   */
  static serialize () {
    const { elements } = document.getElementById('generator-form');
    const data = { };

    data.arrays = { };
    data.checkboxes = { };
    data.inputs = { };
    data.selects = { };

    // arrays
    document.querySelectorAll('.policy-checkbox:checked').forEach($el => {
      const $items = $el.parentElement.querySelectorAll('.array-action[data-name]');
      const groupedItems = {};

      // group items by their date-name attribute
      for (const $item of $items) {
        const groupKey = $item.getAttribute('data-name');
        (groupedItems[groupKey] = groupedItems[groupKey] || []).push($item);
      }

      for (const group of Object.entries(groupedItems)) {
        const { length } = group[1];

        // only store groups with more than one item because one item is always there by default
        if (length > 1) {
          // reduce the length by 1 to only store the number of added items
          data.arrays[group[0]] = length - 1;
        }
      }
    });

    for (const $el of elements) {
      // checkboxes
      if ($el.type === 'checkbox') {
        if (Serializer.#isPolicyEnabled($el) && $el.checked) {
          data.checkboxes[$el.id] = true;
        }
      }
      // enum fields
      else if ($el.type === 'select-one') {
        if (Serializer.#isPolicyEnabled($el) && $el.value !== 'null') {
          data.selects[$el.id] = $el.value;
        }
      }
      // text fields
      else if (['text', 'textarea', 'url'].includes($el.type)) {
        if (Serializer.#isPolicyEnabled($el) && $el.value && !$el.classList.contains('invalid-input-style')) {
          data.inputs[$el.id] = $el.value;
        }
      }
    }

    return data;
  }

  /**
   * The unserializer applies the values of a stored configuration on the generator form.
   *
   * @param {object} data - the serialized data as an object
   *
   * @returns {void}
   */
  static unserialize (data) {
    Serializer.#resetForm();

    const arrays = data.arrays ?? {};
    const checkboxes = data.checkboxes ?? {};
    const inputs = data.inputs ?? {};
    const selects = data.selects ?? {};

    // arrays
    for (const group of Object.entries(arrays).sort((a, b) => Serializer.#arrayNestingDepth(a[0]) - Serializer.#arrayNestingDepth(b[0]))) {
      const $el = Array.from(document.querySelectorAll('.array-action[data-name]'))
        .find($el => $el.getAttribute('data-name') === group[0]);

      if ($el) {
        for (let i = 1; i <= group[1]; i++) {
          $el.click();
        }
      }
    }

    // checkboxes
    for (const id of Object.keys(checkboxes)) {
      const $el = document.getElementById(id);

      if ($el) {
        $el.checked = true;
      }
    }

    // enum fields
    for (const id of Object.keys(selects)) {
      const $select = document.getElementById(id);
      const $option = Array.from($select?.options ?? [])
        .find($option => $option.value === selects[id]);

      if ($option) {
        $option.selected = true;
      }
    }

    // text fields
    for (const id of Object.keys(inputs)) {
      const $el = document.getElementById(id);

      if ($el) {
        $el.value = inputs[id] ?? null;

        // hide validation hint because it's guaranteed by the serializer that the element has a value
        const validationHint = $el.parentElement.querySelector('[data-type=required]');
        if (validationHint) {
          validationHint.classList.add('hidden');
          $el.classList.remove('invalid-input-style');
        }
      }
    }

    Serializer.#updateFormState();
  }

  /**
   * Apply a policies.json file as far as the existing UI structure can represent it.
   *
   * @param {object} data - parsed policies.json data
   *
   * @returns {number} - number of imported top-level policies
   * @throws {Error} if the file does not contain a usable policies object
   */
  static unserializePoliciesJson (data) {
    const policies = data?.policies ?? data;

    if (!policies || typeof policies !== 'object' || Array.isArray(policies)) {
      throw new Error();
    }

    Serializer.#resetForm();

    let importedPolicies = 0;

    for (const [name, value] of Object.entries(policies)) {
      const $policy = document.querySelector(`.policy-container[data-name="${CSS.escape(name)}"]`);

      if ($policy && Serializer.#applyPolicyValue($policy, value)) {
        importedPolicies++;
      }
    }

    Serializer.#updateFormState();

    return importedPolicies;
  }

  /**
   * Reset the configuration form to its default state.
   *
   * @returns {void}
   */
  static #resetForm () {
    document.getElementById('generator-form').reset();

    Array.from(document.querySelectorAll('[data-action="remove"]:not(.disabled-button)')).reverse().forEach($el => {
      $el.click();
    });
  }

  /**
   * Count how deeply an array name is nested in generated DOM identifiers.
   *
   * @param {string} name - generated array name
   *
   * @returns {number} - array nesting depth
   */
  static #arrayNestingDepth (name) {
    return name.match(/_array_/g)?.length ?? 0;
  }

  /**
   * Update option visibility and exclusion states after values have been applied.
   *
   * @returns {void}
   */
  static #updateFormState () {
    document.querySelectorAll('.policy-checkbox').forEach($el => {
      // update the disabled state for policy options
      const $options = $el.parentElement.querySelector(':scope > .options');
      if ($options) {
        if ($el.checked) {
          $options.classList.remove('disabled');
        }
        else {
          $options.classList.add('disabled');
        }
      }

      // update the excluded state for policies
      if ($el.hasAttribute('data-exclude')) {
        Configurator.handlePolicyExclusion($el);
      }
    });
  }

  /**
   * Apply a top-level policy value to its UI controls.
   *
   * @param {HTMLElement} $policy - policy container
   * @param {*} value - policy value from policies.json
   *
   * @returns {boolean} - whether the value could be applied
   */
  static #applyPolicyValue ($policy, value) {
    const $checkbox = $policy.querySelector(':scope > .policy-checkbox');
    const type = $policy.getAttribute('data-type');

    if (type === 'boolean') {
      const checkedValue = !$checkbox.getAttribute('data-inverse');

      if (value !== checkedValue) {
        return false;
      }

      $checkbox.checked = true;

      return true;
    }

    const $options = $policy.querySelector(':scope > .options');
    let imported = false;

    switch (type) {
      case 'array':
        imported = Serializer.#applyArrayValue($options.querySelector(':scope > .array-wrapper'), value);
        break;
      case 'enum':
        imported = Serializer.#setSelectValue($options.querySelector(':scope > .enum-wrapper > select'), value);
        break;
      case 'object':
        imported = Serializer.#applyObjectValue($options.querySelector(':scope > .object-wrapper'), value);
        break;
      case 'string':
        imported = Serializer.#setInputValue($options.querySelector(':scope > .input-wrapper > input'), value);
        break;
      default:
        // do nothing
    }

    if (imported) {
      $checkbox.checked = true;
    }

    return imported;
  }

  /**
   * Apply an array value to an array wrapper.
   *
   * @param {HTMLElement} $wrapper - array wrapper
   * @param {*} value - array value from policies.json
   *
   * @returns {boolean} - whether the value could be applied
   */
  static #applyArrayValue ($wrapper, value) {
    if (!$wrapper) {
      return false;
    }

    let arrayValue = value;

    if ($wrapper.getAttribute('data-join') && typeof value === 'string') {
      arrayValue = value === '' ? [''] : value.split($wrapper.getAttribute('data-join'));
    }
    else if ($wrapper.hasAttribute('data-empty-value-allowed') && value === '') {
      arrayValue = [''];
    }

    if (Array.isArray(arrayValue)) {
      const $booleanFields = $wrapper.querySelectorAll(':scope > .array-container > .boolean-wrapper > input');

      if ($booleanFields.length > 0) {
        let imported = false;

        $booleanFields.forEach($el => {
          if (arrayValue.includes($el.getAttribute('data-name'))) {
            $el.checked = true;
            imported = true;
          }
        });

        return imported;
      }

      return Serializer.#applyArrayItems($wrapper, arrayValue);
    }

    if (arrayValue && typeof arrayValue === 'object') {
      return Serializer.#applyKeyedArrayValue($wrapper, arrayValue);
    }

    return false;
  }

  /**
   * Apply ordered array items to an array wrapper.
   *
   * @param {HTMLElement} $wrapper - array wrapper
   * @param {Array<*>} items - array items from policies.json
   *
   * @returns {boolean} - whether at least one item could be applied
   */
  static #applyArrayItems ($wrapper, items) {
    const remainingItems = [...items];
    let imported = false;

    $wrapper.querySelectorAll(':scope > .additional-item > .object-wrapper').forEach($objectWrapper => {
      const idx = remainingItems.findIndex(item => Serializer.#objectMatchesValue($objectWrapper, item));

      if (idx !== -1) {
        imported = Serializer.#applyObjectValue($objectWrapper, remainingItems[idx]) || imported;
        remainingItems.splice(idx, 1);
      }
    });

    let $containers = Array.from($wrapper.querySelectorAll(':scope > .array-container'));

    for (const item of [...remainingItems]) {
      const $container = $containers.find($container => Serializer.#arrayContainerMatchesValue($container, item));

      if ($container) {
        while ($containers.filter($container => $container.dataset.imported !== 'true').length === 0) {
          const previousLength = $containers.length;
          $containers.at(-1).querySelector(':scope > .array-action[data-action="add"]')?.click();
          $containers = Array.from($wrapper.querySelectorAll(':scope > .array-container'));
          Serializer.#clearImportedState($containers.slice(previousLength));
        }

        const $target = $containers.find($container => $container.dataset.imported !== 'true');
        $target.dataset.imported = 'true';
        imported = Serializer.#applyArrayContainerValue($target, item) || imported;
        remainingItems.splice(remainingItems.indexOf(item), 1);
      }
    }

    $containers.forEach($container => {
      delete $container.dataset.imported;
    });

    $wrapper.querySelectorAll(':scope > .additional-item > .array-wrapper').forEach($arrayWrapper => {
      if (remainingItems.length > 0) {
        imported = Serializer.#applyArrayValue($arrayWrapper, remainingItems) || imported;
      }
    });

    return imported;
  }

  /**
   * Apply keyed object values to an array wrapper.
   *
   * @param {HTMLElement} $wrapper - array wrapper
   * @param {object} value - keyed object from policies.json
   *
   * @returns {boolean} - whether at least one item could be applied
   */
  static #applyKeyedArrayValue ($wrapper, value) {
    const entries = Object.entries(value);
    const remainingEntries = [...entries];
    let imported = false;

    $wrapper.querySelectorAll(':scope > .additional-item').forEach($item => {
      const fixedKey = $item.querySelector(':scope .key-wrapper[data-value]')?.getAttribute('data-value');
      const idx = remainingEntries.findIndex(entry => entry[0] === fixedKey);

      if (idx !== -1) {
        imported = Serializer.#applyArrayContainerValue($item, remainingEntries[idx][1]) || imported;
        remainingEntries.splice(idx, 1);
      }
    });

    let $containers = Array.from($wrapper.querySelectorAll(':scope > .array-container'));

    for (const [key, itemValue] of remainingEntries) {
      const $target = $containers.find($container => $container.dataset.imported !== 'true');

      if (!$target) {
        const previousLength = $containers.length;
        $containers.at(-1).querySelector(':scope > .array-action[data-action="add"]')?.click();
        $containers = Array.from($wrapper.querySelectorAll(':scope > .array-container'));
        Serializer.#clearImportedState($containers.slice(previousLength));
      }

      const $container = $containers.find($container => $container.dataset.imported !== 'true');
      const $keyInput = $container.querySelector(':scope .key-wrapper > input');

      if ($keyInput) {
        Serializer.#setInputValue($keyInput, key);
      }

      $container.dataset.imported = 'true';
      imported = Serializer.#applyArrayContainerValue($container, itemValue) || imported;
    }

    $containers.forEach($container => {
      delete $container.dataset.imported;
    });

    return imported;
  }

  /**
   * Check whether an array container can represent a value.
   *
   * @param {HTMLElement} $container - array item container
   * @param {*} value - value from policies.json
   *
   * @returns {boolean} - whether the value fits the container
   */
  static #arrayContainerMatchesValue ($container, value) {
    const $objectWrapper = $container.querySelector(':scope > .object-wrapper');

    if ($objectWrapper) {
      return Serializer.#objectMatchesValue($objectWrapper, value);
    }

    return Boolean($container.querySelector(':scope > .input-wrapper, :scope > .enum-wrapper, :scope > .array-wrapper'));
  }

  /**
   * Remove temporary import state from newly cloned array items.
   *
   * @param {Array<HTMLElement>} $containers - newly added array containers
   *
   * @returns {void}
   */
  static #clearImportedState ($containers) {
    $containers.forEach($container => {
      delete $container.dataset.imported;
    });
  }

  /**
   * Apply a value to an array item container.
   *
   * @param {HTMLElement} $container - array item container
   * @param {*} value - value from policies.json
   *
   * @returns {boolean} - whether the value could be applied
   */
  static #applyArrayContainerValue ($container, value) {
    const $objectWrapper = $container.querySelector(':scope > .object-wrapper');
    const $arrayWrapper = $container.querySelector(':scope > .array-wrapper');
    const $select = $container.querySelector(':scope > .enum-wrapper > select');
    const $input = $container.querySelector(':scope > .input-wrapper > input, :scope > .input-wrapper > textarea');

    if ($objectWrapper) {
      return Serializer.#applyObjectValue($objectWrapper, value);
    }

    if ($arrayWrapper) {
      return Serializer.#applyArrayValue($arrayWrapper, value);
    }

    if ($select) {
      return Serializer.#setSelectValue($select, value);
    }

    if ($input) {
      return Serializer.#setInputValue($input, value);
    }

    return false;
  }

  /**
   * Apply an object value to an object wrapper.
   *
   * @param {HTMLElement} $wrapper - object wrapper
   * @param {*} value - object value from policies.json
   *
   * @returns {boolean} - whether at least one field could be applied
   */
  static #applyObjectValue ($wrapper, value) {
    if (!$wrapper || !value || typeof value !== 'object' || Array.isArray(value)) {
      return false;
    }

    const normalizedValue = { ...value };
    const $typeSelect = $wrapper.querySelector(':scope > .enum-wrapper > select[data-name="Type"]');

    if ($typeSelect && Object.hasOwn(normalizedValue, 'Value') && !Object.hasOwn(normalizedValue, 'Type')) {
      normalizedValue.Type = typeof normalizedValue.Value;
    }

    let imported = false;

    $wrapper.querySelectorAll(':scope > .array-wrapper[data-name]').forEach($el => {
      const name = $el.getAttribute('data-name');

      if (Object.hasOwn(normalizedValue, name)) {
        imported = Serializer.#applyArrayValue($el, normalizedValue[name]) || imported;
      }
    });

    $wrapper.querySelectorAll(':scope > .boolean-wrapper > input[data-name]').forEach($el => {
      const name = $el.getAttribute('data-name');

      if (normalizedValue[name] === true) {
        $el.checked = true;
        imported = true;
      }
    });

    $wrapper.querySelectorAll(':scope > .enum-wrapper > select[data-name]').forEach($el => {
      const name = $el.getAttribute('data-name');

      if (Object.hasOwn(normalizedValue, name)) {
        imported = Serializer.#setSelectValue($el, normalizedValue[name]) || imported;
      }
    });

    $wrapper.querySelectorAll(':scope > .input-wrapper > input[data-name], :scope > .input-wrapper > textarea[data-name]').forEach($el => {
      const name = $el.getAttribute('data-name');

      if (Object.hasOwn(normalizedValue, name)) {
        imported = Serializer.#setInputValue($el, normalizedValue[name]) || imported;
      }
    });

    $wrapper.querySelectorAll(':scope > .object-wrapper[data-name]').forEach($el => {
      const name = $el.getAttribute('data-name');

      if (Object.hasOwn(normalizedValue, name)) {
        imported = Serializer.#applyObjectValue($el, normalizedValue[name]) || imported;
      }
    });

    if (normalizedValue.Locked === true) {
      const $lockCheckbox = $wrapper.querySelector(':scope > .lock-checkbox');

      if ($lockCheckbox) {
        $lockCheckbox.checked = true;
        imported = true;
      }
    }

    return imported;
  }

  /**
   * Check whether an object wrapper can represent an object value.
   *
   * @param {HTMLElement} $wrapper - object wrapper
   * @param {*} value - object value from policies.json
   *
   * @returns {boolean} - whether the object value fits the wrapper
   */
  static #objectMatchesValue ($wrapper, value) {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      return false;
    }

    const fieldNames = Array.from($wrapper.querySelectorAll(
      ':scope > .array-wrapper[data-name], ' +
      ':scope > .boolean-wrapper > input[data-name], ' +
      ':scope > .enum-wrapper > select[data-name], ' +
      ':scope > .input-wrapper > input[data-name], ' +
      ':scope > .input-wrapper > textarea[data-name], ' +
      ':scope > .object-wrapper[data-name]'
    )).map($el => $el.getAttribute('data-name'));

    const requiredFieldNames = Array.from($wrapper.querySelectorAll(
      ':scope > .input-wrapper > input[data-name][data-validations*="required"], ' +
      ':scope > .input-wrapper > textarea[data-name][data-validations*="required"]'
    )).map($el => $el.getAttribute('data-name'));

    return fieldNames.some(name => Object.hasOwn(value, name)) &&
      requiredFieldNames.every(name => Object.hasOwn(value, name));
  }

  /**
   * Set a select field value.
   *
   * @param {?HTMLSelectElement} $select - select element
   * @param {*} value - value from policies.json
   *
   * @returns {boolean} - whether the value could be set
   */
  static #setSelectValue ($select, value) {
    const $option = Array.from($select?.options ?? [])
      .find($option => $option.value === String(value));

    if (!$option) {
      return false;
    }

    $option.selected = true;

    return true;
  }

  /**
   * Set an input field value.
   *
   * @param {?HTMLInputElement|HTMLTextAreaElement} $input - input element
   * @param {*} value - value from policies.json
   *
   * @returns {boolean} - whether the value could be set
   */
  static #setInputValue ($input, value) {
    if (!$input || value === null || typeof value === 'undefined') {
      return false;
    }

    if ($input.getAttribute('data-validations')?.includes('json') && typeof value === 'object') {
      $input.value = JSON.stringify(value, null, 2);
    }
    else {
      $input.value = String(value);
    }

    $input.dispatchEvent(new Event('input'));

    return true;
  }

  /**
   * Checks whether a policy is enabled.
   *
   * @param {HTMLElement} $el - the DOM element of the policy to be checked
   *
   * @returns {boolean} - whether the policy is enabled
   */
  static #isPolicyEnabled ($el) {
    return $el.closest('.policy-container').querySelector(':scope > .policy-checkbox').checked;
  }
}
