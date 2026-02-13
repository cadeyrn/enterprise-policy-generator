'use strict';

/* global I18n, Migrator */

class Background {
  /**
   * Fired when the extension is first installed, when the extension is updated to a new version, or when the browser
   * is updated to a new version. We use this event to call the schema migrator on extension updates.
   *
   * @param {runtime.OnInstalledReason} details - contains the reason why this event is being dispatched
   *
   * @returns {void}
   */
  static onInstalledHandler (details) {
    if (details.reason === 'update') {
      Migrator.migrate();
    }
  }

  /**
   * Open the options page when the toolbar icon is clicked.
   *
   * @returns {void}
   */
  static async openUserInterface () {
    await browser.runtime.openOptionsPage();
  }
}

browser.runtime.onInstalled.addListener(Background.onInstalledHandler);
browser.action.onClicked.addListener(Background.openUserInterface);

browser.runtime.onInstalled.addListener(() => {
  browser.menus.create({
    id: 'epg-tools-menu-entry',
    title: I18n.getMessage('extension_name'),
    contexts: ['tools_menu'],
    command: '_execute_action'
  });
});
