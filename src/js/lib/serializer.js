'use strict';

/**
 * @exports serializer
 */
const serializer = {
  serialize (form) {
    const { elements } = form;
    const { length } = elements;
    const data = { };

    data.checkboxes = { };
    data.input = { };
    data.select = { };

    for (let i = 0; i < length; i++) {
      const node = elements[i];

      // checkboxes
      if (node.type === 'checkbox') {
        if (node.checked) {
          data.checkboxes[node.name] = node.value;
        }
      }
      // select fields
      else if (node.type === 'select-one') {
        data.select[node.name] = node.value;
      }
      // text fields
      else if (node.type === 'text') {
        if (node.value) {
          data.input[node.name] = node.value;
        }
      }
    }

    return data;
  }
};
