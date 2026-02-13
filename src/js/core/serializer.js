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
        if (Serializer.#isPolicyEnabled($el) && $el.value) {
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
    // reset the configuration form
    document.getElementById('generator-form').reset();

    // remove all additional array items
    document.querySelectorAll('[data-action="remove"]:not(.disabled-link)').forEach($el => {
      $el.click();
    });

    // arrays
    for (const group of Object.entries(data.arrays)) {
      const $el = document.querySelector(`.array-action[data-name="${group[0]}"]`);

      if ($el) {
        for (let i = 1; i <= group[1]; i++) {
          $el.click();
        }
      }
    }

    // checkboxes
    for (const id of Object.keys(data.checkboxes)) {
      const $el = document.getElementById(id);

      if ($el) {
        $el.checked = true;
      }
    }

    // enum fields
    for (const id of Object.keys(data.selects)) {
      const $el = document.querySelector(`#${id} [value="${data.selects[id]}"]`);

      if ($el) {
        $el.selected = true;
      }
    }

    // text fields
    for (const id of Object.keys(data.inputs)) {
      const $el = document.getElementById(id);

      if ($el) {
        $el.value = data.inputs[id] ?? null;

        // hide validation hint because it's guaranteed by the serializer that the element has a value
        const validationHint = $el.parentElement.querySelector('[data-type=required]');
        if (validationHint) {
          validationHint.classList.add('hidden');
          $el.classList.remove('invalid-input-style');
        }
      }
    }

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
