'use strict';

/**
 * @exports policymanager
 */
const policymanager = {
  /**
   * The data property contains the JSON object
   *
   * @type {Object}
   */
  data : null,

  /**
   * This method creates an empty policies object.
   *
   * @returns {void}
   */
  init () {
    policymanager.data = { policies : {} };
  },

  /**
   * This method adds a policy to the output object.
   *
   * @param {string} key - key of the policy
   * @param {*} value - value of the policy, can be of any type
   *
   * @returns {void}
   */
  add (key, value) {
    policymanager.data.policies[key] = value;
  },

  /**
   * This method sorts the output alphabetically.
   *
   * @param {Object} object - object to be sorted alphabetically
   *
   * @returns {Object} - the sorted object
   */
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

  /**
   * Returns the JSON configuration as string. All policies are sorted alphabetically.
   *
   * @returns {string} - the JSON configuration as string
   */
  getConfiguration () {
    return JSON.stringify(policymanager.sort(policymanager.data), null, 2);
  }
};
