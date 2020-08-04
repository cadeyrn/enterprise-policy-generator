'use strict';

/* global migrator */

/**
 * @exports background
 */
const background = {
  /**
   * Fired when the extension is first installed, when the extension is updated to a new version or when the browser
   * is updated to a new version. We use this event to call the schema migrator on extension updates.
   *
   * @param {runtime.OnInstalledReason} details - details.reason contains the reason why this event is being dispatched
   *
   * @returns {void}
   */
  onInstalledHandler (details) {
    if (details.reason === 'update') {
      migrator.migrate();
    }
  },

  /**
   * Open the options page when the toolbar icon is clicked.
   *
   * @returns {void}
   */
  openUserInterface () {
    browser.runtime.openOptionsPage();
  }
};

browser.runtime.onInstalled.addListener(background.onInstalledHandler);
browser.browserAction.onClicked.addListener(background.openUserInterface);

browser.menus.create({
  title : browser.i18n.getMessage('extension_name'),
  contexts : ['tools_menu'],
  command : '_execute_browser_action'
});
