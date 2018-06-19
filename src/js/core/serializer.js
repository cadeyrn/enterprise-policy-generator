'use strict';

/* global configurator */

/**
 * @exports serializer
 */
const serializer = {
  serialize (form) {
    const { elements } = form;
    const { length } = elements;
    const data = { };

    data.arrayfields = { };
    data.checkboxes = { };
    data.input = { };
    data.select = { };

    document.querySelectorAll('.primary-checkbox:checked').forEach((el) => {
      el.closest('.checkbox').querySelectorAll('[data-count]').forEach((el) => {
        const result = el.id.match(/^Array_Add_(\w+)_(\d+)$/i);

        if (result) {
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

  unserialize (data) {
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
  },

  isPolicyEnabled (el) {
    return el.closest('.checkbox').querySelector(':scope > .primary-checkbox').checked;
  }
};
