'use strict';

class PolicyManager {
  /**
   * Contains the policy object.
   *
   * @type {object}
   */
  static #data = null;

  /**
   * Initializes an empty policies object.
   *
   * @returns {void}
   */
  static init () {
    PolicyManager.#data = { policies: {} };
  }

  /**
   * Add a policy to the output object.
   *
   * @param {string} key - key of the policy
   * @param {any} value - value of the policy, can be of any type
   *
   * @returns {void}
   */
  static add (key, value) {
    PolicyManager.#data.policies[key] = value;
  }

  /**
   * Returns the JSON configuration as string. All policies are sorted alphabetically.
   *
   * @returns {string} - the policies.json configuration as string
   */
  static getConfiguration () {
    return JSON.stringify(PolicyManager.#sort(PolicyManager.#data), null, 2);
  }

  /**
   * This method sorts the policies.json output alphabetically.
   *
   * @param {object} object - object to be sorted alphabetically
   *
   * @returns {object} - the sorted object
   */
  static #sort (object) {
    if (object instanceof Array) {
      const { length } = object;
      for (let i = 0; i < length; i++) {
        object[i] = PolicyManager.#sort(object[i]);
      }

      return object;
    }
    else if (typeof object !== 'object') {
      return object;
    }

    let keys = Object.keys(object);
    keys = keys.sort();

    const sorted = {};

    for (const key of keys) {
      sorted[key] = PolicyManager.#sort(object[key]);
    }

    return sorted;
  }
}
