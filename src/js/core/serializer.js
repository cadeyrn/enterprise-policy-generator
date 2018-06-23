'use strict';

/* global configurator */

/**
 * @exports serializer
 */
const serializer = {
  /**
   * The serializer stores all the array fields and form values in an object.
   *
   * @returns {Object} - the serialized form as object
   */
  serialize () {
    const { elements } = document.getElementById('generator-form');
    const { length } = elements;
    const data = { };

    data.arrayfields = { };
    data.checkboxes = { };
    data.input = { };
    data.select = { };

    // array fields
    document.querySelectorAll('.primary-checkbox:checked').forEach((el) => {
      el.closest('.checkbox').querySelectorAll('[data-count]').forEach((el) => {
        const result = el.id.match(/^Array_Add_(\w+)_(\d+)$/i);

        if (result) {
          // we don't need to store the first array field because there is always at least one array field visible
          if (result[2] > 1) {
            if (!data.arrayfields[result[1]]) {
              data.arrayfields[result[1]] = [];
            }

            data.arrayfields[result[1]].push(result[2]);
          }
        }
      });
    });

    for (let i = 0; i < length; i++) {
      const node = elements[i];

      // checkboxes
      if (node.type === 'checkbox') {
        if (serializer.isPolicyEnabled(node) && node.checked) {
          data.checkboxes[node.id] = true;
        }
      }
      // select fields
      else if (node.type === 'select-one') {
        if (serializer.isPolicyEnabled(node)) {
          data.select[node.id] = node.value;
        }
      }
      // text fields
      else if (node.type === 'text') {
        if (serializer.isPolicyEnabled(node) && node.value) {
          data.input[node.id] = node.value;
        }
      }
    }

    return data;
  },

  /**
   * The unserializer applies the values of a stored configuration on the generator form.
   *
   * @param {Object} data - the serialized form as object
   *
   * @returns {void}
   */
  unserialize (data) {
    // reset the configuration form
    configurator.init(true);

    // array fields
    Object.keys(data.arrayfields).forEach((id) => {
      const newCountValue = Math.max(...data.arrayfields[id]);

      data.arrayfields[id].forEach((key) => {
        configurator.addArrayField(document.getElementById('Array_Add_' + id + '_1'), key, newCountValue);
      });
    });

    // checkboxes
    Object.keys(data.checkboxes).forEach((id) => {
      const el = document.getElementById(id);

      if (el) {
        el.checked = true;
      }
    });

    // select fields
    Object.keys(data.select).forEach((id) => {
      const el = document.querySelector('#' + id + ' [value="' + data.select[id] + '"]');

      if (el) {
        el.selected = true;
      }
    });

    // text fields
    Object.keys(data.input).forEach((id) => {
      const el = document.getElementById(id);

      if (el) {
        el.value = data.input[id];

        // remove validation hint, because it's guaranteed by the serializer that the element has a value
        if (el.hasAttribute('data-mandatory')) {
          el.classList.remove('mandatory-style');
          el.parentNode.querySelector('.mandatory-label').classList.add('hidden');
        }
      }
    });

    // remove "hidden" state from enabled policies
    [...document.querySelectorAll('.primary-checkbox')].forEach((el) => {
      if (el.checked) {
        const elSubOptions = el.parentNode.getElementsByClassName('sub-options');
        if (elSubOptions.length > 0) {
          [...elSubOptions].forEach((el) => {
            el.classList.remove('disabled');
          });
        }
      }
    });
  },

  /**
   * Checks whether a policy is enabled or not.
   *
   * @param {HTMLElement} el - the DOM element of the policy to be checked
   *
   * @returns {boolean} - whether the policy is enabled or not
   */
  isPolicyEnabled (el) {
    return el.closest('.checkbox').querySelector(':scope > .primary-checkbox').checked;
  }
};
