'use strict';

/* global I18n */

/**
 * @typedef {object} SortableOptions
 * @property {string} [itemSelector='.sortable-item'] - CSS selector for sortable items (must be direct children)
 * @property {string} [handleSelector='.sortable-handle'] - CSS selector for the drag handle inside each item
 * @property {string} [placeholderClass='sortable-placeholder'] - class name applied to the temporary placeholder
 * @property {number} [overlapThreshold=0.2] - reorder trigger threshold (0..1), direction-aware
 * @property {(items: HTMLElement[]) => void} onUpdate - callback fired after a completed reorder
 */

/**
 * @typedef {object} DragState
 * @property {?HTMLElement} $item - active dragged item
 * @property {?HTMLElement} $placeholder - placeholder occupying the potential drop slot
 * @property {{x: number, y: number, offsetY: number}} pointer - last pointer coordinates and Y offset
 * @property {number} frame - active requestAnimationFrame id
 * @property {number} fixedLeft - fixed X position for vertical-only dragging
 * @property {number} startTop - initial top position when drag started
 * @property {number} currentTranslateY -current translateY offset during drag
 * @property {number} lastPointerY -last pointer Y for direction detection
 * @property {'down'|'up'} moveDir - last significant movement direction
 * @property {?number} activePointerId - pointer id captured for this drag
 * @property {Map<HTMLElement, DOMRect>} cachedRects - cached sibling rects for reorder checks
 */

class Sortable {
  /**
   * Create an instance of the sortable component.
   *
   * @param {HTMLElement} $container - container whose immediate children are sortable items
   * @param {SortableOptions} options - configuration object
   */
  constructor ($container, options = {}) {
    // configuration
    this.$container = $container;
    this.handleSelector = options.handleSelector ?? '.sortable-handle';
    this.itemSelector = options.itemSelector ?? '.sortable-item';
    this.placeholderClass = options.placeholderClass ?? 'sortable-placeholder';
    this.onUpdate = typeof options.onUpdate === 'function' ? options.onUpdate : null;

    // eslint-disable-next-line no-magic-numbers
    this.overlapThreshold = this.#clampNumber(options.overlapThreshold, 0.2, 0.01, 0.99);

    /** @type {DragState} */
    this.dragState = this.#createInitialDragState();

    // keyboard drag state
    this.$kbItem = null;
    this.$kbHandle = null;
    this.kbDragging = false;
    this.kbStartIndex = -1;

    // a11y
    requestAnimationFrame(() => {
      this.#setupA11y();
    });

    // event handlers
    this.onPointerDownHandler = e => this.#onPointerDown(e);
    this.onPointerMoveHandler = e => this.#onPointerMove(e);
    this.onPointerUpHandler = e => this.#onPointerUp(e);
    this.onKeyDownHandler = e => this.#onKeyDown(e);
    this.onFocusInHandler = e => this.#onFocusIn(e);
    this.renderDragHandler = () => this.#renderDrag();

    this.$container.addEventListener('pointerdown', this.onPointerDownHandler, { passive: false });
    this.$container.addEventListener('keydown', this.onKeyDownHandler);
    document.addEventListener('focusin', this.onFocusInHandler);
  }

  /**
   * Clamp a given number within the specified minimum and maximum boundaries.
   * If the provided value is not a finite number, a default value is returned.
   *
   * @param {number} value - the number to be clamped
   * @param {number} defaultValue - the value to return if the input is not a finite number
   * @param {number} min - the minimum boundary for the clamp operation
   * @param {number} max - the maximum boundary for the clamp operation
   *
   * @returns {number} - the clamped number, or the default value if the input is invalid
   */
  #clampNumber (value, defaultValue, min, max) {
    const number = Number(value);
    if (!Number.isFinite(number)) {
      return defaultValue;
    }

    return Math.min(Math.max(number, min), max);
  }

  /**
   * Build the initial drag state object.
   *
   * @returns {DragState} - the initial drag state object
   */
  #createInitialDragState () {
    return {
      $item: null,
      $placeholder: null,
      pointer: { x: 0, y: 0, offsetY: 0 },
      frame: 0,
      fixedLeft: 0,
      startTop: 0,
      currentTranslateY: 0,
      lastPointerY: 0,
      moveDir: 'down',
      activePointerId: null,
      cachedRects: new Map()
    };
  }

  /**
   * Initialize accessibility helper nodes and semantics.
   *
   * @returns {void}
   */
  #setupA11y () {
    let $instructions = document.getElementById('sortable-instructions');

    if (!$instructions) {
      $instructions = document.createElement('div');
      $instructions.setAttribute('id', 'sortable-instructions');
      $instructions.classList.add('visually-hidden');
      $instructions.textContent = I18n.getMessage('array_sort_a11y_instructions');
      document.body.appendChild($instructions);
    }

    this.$container.setAttribute('aria-describedby', $instructions.id);

    this.$liveRegion = document.createElement('div');
    this.$liveRegion.setAttribute('aria-live', 'polite');
    this.$liveRegion.setAttribute('aria-atomic', 'true');
    this.$liveRegion.classList.add('visually-hidden');

    this.$container.appendChild(this.$liveRegion);

    this.lastAnnouncementAt = null;
  }

  /**
   * Announce an accessibility message through the live region.
   *
   * @param {string} message - the message to be announced
   *
   * @returns {void}
   */
  #announce (message) {
    const minIntervalMs = 250;
    const now = Date.now();
    const lastAnnouncementAt = this.lastAnnouncementAt ?? 0;

    // throttling for rapid repeat updates.
    if (now - lastAnnouncementAt < minIntervalMs) {
      return;
    }

    this.lastAnnouncementAt = now;
    this.$liveRegion.textContent = message;
  }

  /**
   * Return sortable items from direct container children.
   *
   * @returns {Element[]} - the sortable items
   */
  #getItems () {
    return Array.from(this.$container.children).filter($el => $el.matches(this.itemSelector));
  }

  /**
   * Focus the drag handle for an item.
   *
   * @param {HTMLElement} $item - the current item
   * @param {?HTMLElement} $overrideHandle - an optional override handle to focus instead of the item's default'
   *
   * @returns {void}
   */
  #focusHandle ($item, $overrideHandle = null) {
    const $handle = $overrideHandle || $item.querySelector(this.handleSelector);
    if ($handle) {
      $handle.focus({ preventScroll: true });
    }
  }

  /**
   * Cache sibling bounds for an inexpensive overlap check during dragging.
   *
   * @returns {void}
   */
  #cacheSiblingRects () {
    const drag = this.dragState;
    const $siblings = this.#getItems().filter(
      $el => $el !== drag.$item && $el !== drag.$placeholder
    );

    drag.cachedRects.clear();
    for (const $el of $siblings) {
      drag.cachedRects.set($el, $el.getBoundingClientRect());
    }
  }

  /**
   * Handle drag start for pointer interactions.
   *
   * @param {PointerEvent} e - pointer event
   *
   * @returns {void}
   */
  #onPointerDown (e) {
    if (this.kbDragging) {
      return;
    }

    const $handle = e.target.closest(this.handleSelector);
    if (!$handle || $handle.classList.contains('disabled')) {
      return;
    }

    const $item = $handle.closest(this.itemSelector);
    if (!$item || $item.parentElement !== this.$container) {
      return;
    }

    e.preventDefault();

    const rect = $item.getBoundingClientRect();
    const style = getComputedStyle($item);
    const { width, height } = style;
    const drag = this.dragState;

    drag.$item = $item;
    drag.pointer.offsetY = e.clientY - rect.top;
    drag.pointer.x = e.clientX;
    drag.pointer.y = e.clientY;
    drag.fixedLeft = rect.left;
    drag.startTop = rect.top;
    drag.currentTranslateY = 0;
    drag.lastPointerY = e.clientY;
    drag.moveDir = 'down';
    drag.activePointerId = e.pointerId;

    // capture the pointer so the drag continues even if the pointer leaves the handle/item
    $item.setPointerCapture(e.pointerId);

    drag.$placeholder = document.createElement($item.tagName);
    drag.$placeholder.className = this.placeholderClass;
    drag.$placeholder.style.height = `${rect.height}px`;
    drag.$placeholder.style.width = `${rect.width}px`;
    drag.$placeholder.setAttribute('aria-hidden', 'true');

    $item.after(drag.$placeholder);

    $item.style.position = 'fixed';
    $item.style.left = `${rect.left}px`;
    $item.style.top = `${rect.top}px`;
    $item.style.width = width;
    $item.style.height = height;
    $item.style.transform = 'translate3d(0, 0, 0)';
    $item.style.zIndex = 1000;
    $item.style.pointerEvents = 'none';
    $item.style.willChange = 'transform';

    document.body.style.userSelect = 'none';

    this.#cacheSiblingRects();

    document.addEventListener('pointermove', this.onPointerMoveHandler, { passive: true });
    document.addEventListener('pointerup', this.onPointerUpHandler, { passive: true });
    document.addEventListener('pointercancel', this.onPointerUpHandler, { passive: true });

    drag.frame = requestAnimationFrame(this.renderDragHandler);
  }

  /**
   * Track pointer movement and schedule drag rendering.
   *
   * @param {PointerEvent} e - pointer event
   *
   * @returns {void}
   */
  #onPointerMove (e) {
    const drag = this.dragState;

    // ignore unrelated pointers (e.g. multi-touch) during an active drag
    if (drag.activePointerId !== null && e.pointerId !== drag.activePointerId) {
      return;
    }

    const dragY = e.clientY - drag.lastPointerY;
    drag.lastPointerY = e.clientY;

    // dead zone avoids rapid direction flip noise from tiny pointer jitter
    // eslint-disable-next-line no-magic-numbers
    if (Math.abs(dragY) >= 3) {
      drag.moveDir = dragY > 0 ? 'down' : 'up';
    }

    drag.pointer.x = e.clientX;
    drag.pointer.y = e.clientY;

    if (!drag.frame) {
      drag.frame = requestAnimationFrame(this.renderDragHandler);
    }
  }

  /**
   * Finish pointer drag and commit the reordered position.
   *
   * @param {PointerEvent} e - pointer event
   *
   * @returns {void}
   */
  #onPointerUp (e) {
    const drag = this.dragState;

    // ignore unrelated pointers (e.g. multi-touch) during an active drag
    if (drag.activePointerId !== null && e.pointerId !== drag.activePointerId) {
      return;
    }

    if (!drag.$item || !drag.$placeholder) {
      return;
    }

    this.$container.insertBefore(drag.$item, drag.$placeholder);
    const { $item } = drag;

    if (drag.activePointerId !== null) {
      $item.releasePointerCapture(drag.activePointerId);
    }

    this.#teardownDrag();
    this.#commitUpdate();
    this.#focusHandle($item);
  }

  /**
   * Render a drag frame: position the active item and update the placeholder location.
   *
   * @returns {void}
   */
  #renderDrag () {
    const drag = this.dragState;
    drag.frame = 0;

    if (!drag.$item || !drag.$placeholder) {
      return;
    }

    const containerRect = this.$container.getBoundingClientRect();

    // clamp the drag position so the drop target remains inside the container.
    const clampedY = Math.min(Math.max(drag.pointer.y, containerRect.top), containerRect.bottom);
    const nextTop = clampedY - drag.pointer.offsetY;

    drag.$item.style.left = `${drag.fixedLeft}px`;
    drag.currentTranslateY = nextTop - drag.startTop;
    drag.$item.style.transform = `translate3d(0, ${drag.currentTranslateY}px, 0)`;

    const dragTop = drag.startTop + drag.currentTranslateY;
    const $siblings = this.#getItems().filter(
      $el => $el !== drag.$item && $el !== drag.$placeholder
    );
    let inserted = false;

    for (const $el of $siblings) {
      const rect = drag.cachedRects.get($el) || $el.getBoundingClientRect();

      // eslint-disable-next-line no-magic-numbers
      const overlapPx = Math.min(rect.height * this.overlapThreshold, 100);
      const triggerY = drag.moveDir === 'down' ? rect.top + overlapPx : rect.bottom - overlapPx;

      if (dragTop < triggerY) {
        if (drag.$placeholder.nextSibling !== $el) {
          this.$container.insertBefore(drag.$placeholder, $el);
          this.#cacheSiblingRects();
        }

        inserted = true;
        break;
      }
    }

    if (!inserted && this.$container.lastElementChild !== drag.$placeholder) {
      this.$container.appendChild(drag.$placeholder);
      this.#cacheSiblingRects();
    }
  }

  /**
   * Reset pointer drag styles/state and detach global listeners.
   *
   * @returns {void}
   */
  #teardownDrag () {
    const drag = this.dragState;

    if (drag.frame) {
      cancelAnimationFrame(drag.frame);
      drag.frame = 0;
    }

    document.removeEventListener('pointermove', this.onPointerMoveHandler);
    document.removeEventListener('pointerup', this.onPointerUpHandler);
    document.removeEventListener('pointercancel', this.onPointerUpHandler);
    document.body.style.userSelect = '';

    if (drag.$item) {
      drag.$item.style.position = '';
      drag.$item.style.left = '';
      drag.$item.style.top = '';
      drag.$item.style.width = '';
      drag.$item.style.height = '';
      drag.$item.style.transform = '';
      drag.$item.style.zIndex = '';
      drag.$item.style.pointerEvents = '';
      drag.$item.style.willChange = '';
    }

    if (drag.$placeholder?.parentElement) {
      drag.$placeholder.parentElement.removeChild(drag.$placeholder);
    }

    this.dragState = this.#createInitialDragState();
  }

  /**
   * Notify consumers about the new order.
   *
   * @returns {void}
   */
  #commitUpdate () {
    if (typeof this.onUpdate === 'function') {
      this.onUpdate(this.#getItems());
    }
  }

  /**
   * Keyboard reordering entry point for the drag handle.
   *
   * @param {KeyboardEvent} e - keyboard event
   *
   * @returns {void}
   */
  #onKeyDown (e) {
    const $handle = e.target.closest(this.handleSelector);
    if (!$handle || !this.$container.contains($handle)) {
      return;
    }

    const $item = $handle.closest(this.itemSelector);
    if (!$item || $item.parentElement !== this.$container) {
      return;
    }

    const { key } = e;

    // drop already active keyboard drags
    if ((key === ' ' || key === 'Enter') && this.kbDragging && this.$kbItem !== $item) {
      e.preventDefault();
      this.#dropKeyboardDrag();
      this.#focusHandle($item, $handle);
      this.#onKeyDown(e);

      return;
    }

    // start keyboard drag mode from focused handle
    if (!this.kbDragging && (key === ' ' || key === 'Enter')) {
      e.preventDefault();
      this.kbDragging = true;
      this.$kbItem = $item;
      this.kbStartIndex = this.#getItems().indexOf($item);
      this.$kbHandle = $handle;
      this.$kbHandle.setAttribute('aria-pressed', 'true');
      const message = I18n.getMessage(
        'array_sort_a11y_drag_action_start',
        [(this.kbStartIndex + 1).toString(), this.#getItems().length.toString()]
      );

      this.#announce(message);

      return;
    }

    if (!this.kbDragging || this.$kbItem !== $item) {
      return;
    }

    if (key === 'Escape') {
      e.preventDefault();
      this.#cancelKeyboardDrag();

      return;
    }

    if (key === 'ArrowUp') {
      e.preventDefault();
      this.#moveKeyboardDrag(-1);

      return;
    }

    if (key === 'ArrowDown') {
      e.preventDefault();
      this.#moveKeyboardDrag(1);

      return;
    }

    if (key === ' ' || key === 'Enter') {
      e.preventDefault();
      this.#dropKeyboardDrag();
    }
  }

  /**
   * Handle global focus changes while keyboard drag mode is active.
   *
   * @param {FocusEvent} e - focus event
   *
   * @returns {void}
   */
  #onFocusIn (e) {
    if (!this.kbDragging) {
      return;
    }

    if (!this.$container.contains(e.target)) {
      this.#cancelKeyboardDrag();

      return;
    }

    if (this.$kbHandle && e.target !== this.$kbHandle) {
      this.$kbHandle.setAttribute('aria-pressed', 'false');
    }
  }

  /**
   * Move keyboard-dragged item up/down by one position.
   *
   * @param {number} delta - Use -1 for up, +1 for down.
   *
   * @returns {void}
   */
  #moveKeyboardDrag (delta) {
    if (!this.kbDragging || !this.$kbItem) {
      return;
    }

    const $item = this.$kbItem;
    const items = this.#getItems();
    const idx = items.indexOf($item);
    const next = idx + delta;

    if (next < 0 || next >= items.length) {
      return;
    }

    if (delta < 0) {
      this.$container.insertBefore($item, items[next]);
    }
    else {
      this.$container.insertBefore(items[next], $item);
    }

    const pos = this.#getItems().indexOf($item) + 1;
    const message = I18n.getMessage(
      'array_sort_a11y_drag_action_move',
      [pos.toString(), this.#getItems().length.toString()]
    );
    this.#announce(message);
    this.#focusHandle($item, this.$kbHandle);
  }

  /**
   * Commit keyboard drag and fire the update callback.
   *
   * @returns {void}
   */
  #dropKeyboardDrag () {
    if (!this.kbDragging || !this.$kbItem) {
      return;
    }

    const $item = this.$kbItem;
    const pos = this.#getItems().indexOf($item) + 1;

    if (this.$kbHandle) {
      this.$kbHandle.setAttribute('aria-pressed', 'false');
    }

    this.kbDragging = false;
    this.$kbItem = null;
    this.kbStartIndex = -1;

    this.#commitUpdate();
    const message = I18n.getMessage(
      'array_sort_a11y_drag_action_end',
      [pos.toString(), this.#getItems().length.toString()]
    );
    this.#announce(message);
    this.#focusHandle($item, this.$kbHandle);
    this.$kbHandle = null;
  }

  /**
   * Cancel keyboard drag and restore the original index.
   *
   * @returns {void}
   */
  #cancelKeyboardDrag () {
    if (!this.kbDragging || !this.$kbItem) {
      return;
    }

    const $item = this.$kbItem;
    const targetIndex = this.kbStartIndex;

    // restore the original position from the drag-start index.
    const itemsWithout = this.#getItems().filter($el => $el !== $item);
    const $before = itemsWithout[targetIndex] ?? null;

    this.$container.insertBefore($item, $before);

    if (this.$kbHandle) {
      this.$kbHandle.setAttribute('aria-pressed', 'false');
    }

    this.kbDragging = false;
    this.$kbItem = null;
    this.kbStartIndex = -1;

    const message = I18n.getMessage(
      'array_sort_a11y_drag_action_cancel',
      [(this.#getItems().indexOf($item) + 1).toString()]
    );

    this.#announce(message);
    this.#focusHandle($item, this.$kbHandle);
    this.$kbHandle = null;
  }
}
