'use strict';

/**
 * @exports policymanager
 */
const policymanager = {
  data : null,

  init () {
    policymanager.data = { policies : {} };
  },

  add (key, value) {
    policymanager.data.policies[key] = value;
  },

  sort (object) {
    if (object instanceof Array) {
      const { length } = object;
      for (let i = 0; i < length; i++) {
        object[i] = policymanager.sort(object[i]);
      }

      return object;
    }
    else if (typeof object !== 'object') {
      return object;
    }

    let keys = Object.keys(object);
    keys = keys.sort();

    const sorted = {};
    const { length } = keys;

    for (let i = 0; i < length; i++) {
      sorted[keys[i]] = policymanager.sort(object[keys[i]]);
    }

    return sorted;
  },

  getConfiguration () {
    return JSON.stringify(policymanager.sort(policymanager.data), null, 2);
  }
};
