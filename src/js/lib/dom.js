'use strict';

class Dom {
  /**
   * Internal map to track event listeners for each element.
   *
   * @type {WeakMap<HTMLElement, Array<{ type: string, listener: Function, options: object|boolean }>>}
   */
  static #eventListeners = new WeakMap();

  /**
   * Add an event listener for a DOM element and keeps track of it so that it can be cloned with its event listeners.
   *
   * @param {HTMLElement} $el - The element to add the event listener to
   * @param {string} type - The event type, for example, "click"
   * @param {Function} listener - The event listener function
   * @param {object|boolean} options - The event options or useCapture flag. Defaults to false
   *
   * @returns {void}
   */
  static addEventListener ($el, type, listener, options = false) {
    $el.addEventListener(type, listener, options);
    Dom.#trackEventListener($el, type, listener, options);
  }

  /**
   * Remove an event listener from a DOM element and stops tracking it.
   *
   * @param {HTMLElement} $el - The element to remove the event listener from
   * @param {string} type - The event type, for example, "click"
   * @param {Function} listener - The event listener function
   * @param {object|boolean} options - The event options or useCapture flag. Defaults to false
   *
   * @returns {void}
   */
  static removeEventListener ($el, type, listener, options = false) {
    $el.removeEventListener(type, listener, options);
    Dom.#untrackEventListener($el, type, listener, options);
  }

  /**
   * Clone a DOM element and (optionally) its descendants with its attached event listeners.
   *
   * @param {HTMLElement} $el - The element to clone
   * @param {boolean} deep - Whether to clone the element's descendants as well. Defaults to true
   *
   * @returns {HTMLElement} - The cloned element with event listeners
   */
  static cloneNode ($el, deep = true) {
    const $clone = $el.cloneNode(deep);

    Dom.#cloneEventListeners($el, $clone);

    if (deep) {
      const originalWalker = document.createTreeWalker($el, NodeFilter.SHOW_ELEMENT);
      const cloneWalker = document.createTreeWalker($clone, NodeFilter.SHOW_ELEMENT);

      let $originalNode = originalWalker.nextNode();
      let $cloneNode = cloneWalker.nextNode();

      while ($originalNode && $cloneNode) {
        Dom.#cloneEventListeners($originalNode, $cloneNode);
        $originalNode = originalWalker.nextNode();
        $cloneNode = cloneWalker.nextNode();
      }
    }

    return $clone;
  }

  /**
   * Track an event listener. This is necessary to clone DOM elements with their attached event listeners.
   *
   * @param {HTMLElement} $el - The element to track
   * @param {string} type - The event type, for example, "click"
   * @param {Function} listener - The event listener function
   * @param {object|boolean} options - The event options or useCapture flag
   *
   * @returns {void}
   */
  static #trackEventListener ($el, type, listener, options) {
    if (!Dom.#eventListeners.has($el)) {
      Dom.#eventListeners.set($el, []);
    }

    Dom.#eventListeners.get($el).push({ type, listener, options });
  }

  /**
   * Remove an event listener from the internal tracking map.
   *
   * @param {HTMLElement} $el - The element to untrack
   * @param {string} type - The event type, for example, "click"
   * @param {Function} listener - The event listener function
   * @param {object|boolean} options - The event options or useCapture flag
   *
   * @returns {void}
   */
  static #untrackEventListener ($el, type, listener, options) {
    if (Dom.#eventListeners.has($el)) {
      const listeners = Dom.#eventListeners.get($el);
      const index = listeners.findIndex(
        item => item.type === type && item.listener === listener && item.options === options
      );

      if (index !== -1) {
        listeners.splice(index, 1);
      }

      if (listeners.length === 0) {
        Dom.#eventListeners.delete($el);
      }
    }
  }

  /**
   * Clone event listeners.
   *
   * @param {HTMLElement} $source - The source element to clone event listeners from
   * @param {HTMLElement} $target - The target element to clone event listeners to
   *
   * @returns {void}
   */
  static #cloneEventListeners ($source, $target) {
    if (Dom.#eventListeners.has($source)) {
      const sourceListeners = Dom.#eventListeners.get($source);

      sourceListeners.forEach(({ type, listener, options }) => {
        $target.addEventListener(type, listener, options);
        Dom.#trackEventListener($target, type, listener, options);
      });
    }
  }
}
