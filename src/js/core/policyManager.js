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
   * Returns the JSON configuration with syntax highlighting and line numbers. All policies are sorted alphabetically.
   *
   * @param {HTMLElement} $codeContainer - the <pre> element for the generated JSON code
   *
   * @returns {string} - the policies.json configuration as HTML string
   */
  static getHighlightedConfiguration ($codeContainer) {
    // get the configuration as JSON string
    const configuration = PolicyManager.getConfiguration();

    // tokenize the JSON string for syntax highlighting
    const regex = new RegExp(
      [
        '(?<delimiter>[\\[\\]{}:,])',
        '(?<string>"(\\\\.|[^"\\\\])*")',
        '(?<number>-?\\d+)',
        '(?<boolean>true|false)'
      ].join('|'), 'g'
    );
    let output = '';
    let last = 0;

    for (const match of configuration.matchAll(regex)) {
      const { index, groups } = match;
      const content = match[0];
      let type = null;

      output += configuration.slice(last, index);

      if (groups.delimiter) {
        type = 'delimiter';
      }
      else if (groups.string) {
        const followingText = configuration.slice(index + content.length);
        const isKey = /^\s*:/.test(followingText);
        type = isKey ? 'key' : 'string';
      }
      else if (groups.number) {
        type = 'number';
      }
      else if (groups.boolean) {
        type = 'boolean';
      }

      if (type) {
        output += `<span class="token-${type}">${content}</span>`;
      }

      last = index + content.length;
    }

    output += configuration.slice(last);

    // add the line numbers
    output = output.split('\n').map(line => `<span class="line">${line}</span>`).join('');

    // adjust the line number width based on the number of digits
    const lines = configuration.split('\n').length;
    const digits = String(lines).length;
    $codeContainer.style.setProperty('--line-number-width', `${digits + 1}ch`);

    return output;
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
