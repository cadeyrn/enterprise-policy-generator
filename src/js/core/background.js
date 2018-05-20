'use strict';

/**
 * @exports background
 */
const background = {
  /**
   * Open the options page when the toolbar icon is clicked.
   *
   * @returns {void}
   */
  openUserInterface () {
    browser.runtime.openOptionsPage();
  }
};

browser.browserAction.onClicked.addListener(background.openUserInterface);

browser.menus.create({
  title : browser.i18n.getMessage('extension_name'),
  contexts : ['tools_menu'],
  command : '_execute_browser_action'
});
