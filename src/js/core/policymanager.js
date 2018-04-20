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

  getConfiguration () {
    return JSON.stringify(policymanager.data, null, 2);
  }
};
