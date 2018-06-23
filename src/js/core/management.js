'use strict';

/* global serializer */

const elSaveConfigurationLink = document.getElementById('save-configuration');

/**
 * @exports management
 */
const management = {
  /**
   * The init() method. Defines the event listeners for the configuration management links.
   *
   * @returns {void}
   */
  init () {
    elSaveConfigurationLink.addEventListener('click', (e) => {
      e.preventDefault();

      management.showSaveConfigurationDialog();
    });
  },

  /**
   * Show the "save configuration" dialog. This method also defines the behaviour of the dialog.
   *
   * @returns {void}
   */
  showSaveConfigurationDialog () {
    // show dialog
    const modal = document.getElementById('modal-save-dialog');
    modal.classList.add('visible');

    // close dialog by clicking the cancel button
    const closeButton = document.getElementById('button-save-dialog-cancel');
    closeButton.addEventListener('click', () => {
      management.closeSaveConfigurationDialog(modal);
    });

    // close dialog by pressing ESC
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        management.closeSaveConfigurationDialog(modal);
      }
    });

    // focus the name input field
    const elName = document.getElementById('save-dialog-name');
    elName.focus();

    // submit button
    const submitButton = document.getElementById('button-save-dialog-ok');
    submitButton.onclick = function (e) {
      e.preventDefault();

      management.closeSaveConfigurationDialog(modal);
      management.saveConfiguration(elName.value);
    };
  },

  /**
   * Close the "save configuration" dialog.
   *
   * @param {HTMLElement} modal - the DOM element of the modal dialog
   *
   * @returns {void}
   */
  closeSaveConfigurationDialog (modal) {
    modal.classList.remove('visible');
    document.getElementById('save-dialog-name').value = '';
  },

  /**
   * Saves the current configuration with a name and the current date and time.
   *
   * @param {string} name - the name of the configuration
   *
   * @returns {void}
   */
  async saveConfiguration (name) {
    const { configurations } = await browser.storage.local.get({
      configurations : []
    });

    const configuration = {
      name : name,
      time : new Date(),
      configuration : serializer.serialize()
    }

    configurations.push(configuration);

    browser.storage.local.set({
      configurations : configurations
    });
  }
};

management.init();
