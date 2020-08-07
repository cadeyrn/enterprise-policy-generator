'use strict';

/**
 * @exports migrator
 */
const migrator = {
  /**
   * Executes migrations.
   *
   * @returns {void}
   */
  async migrate () {
    const { schemaVersion } = await browser.storage.local.get({ schemaVersion : 1 });

    if (typeof migrator['migration_' + schemaVersion] === 'function') {
      migrator['migration_' + schemaVersion]();
    }
  },

  /**
   * Version: EPG 6.0.0
   *
   * @returns {void}
   */
  async migration_1 () {
    const { configurations } = await browser.storage.local.get({ configurations : [] });
    const configurationLength = configurations.length;

    if (configurationLength > 0) {
      for (let i = 0; i < configurationLength; i++) {
        const { configuration } = configurations[i];

        /*
         * @removed
         *
         * "SearchEngines": { "DefaultPrivate": "foo" }
         */
        if (configuration.input.SearchEngines_DefaultPrivate) {
          delete configuration.select.SearchEngines_DefaultPrivate;
        }

        /*
         * @from
         *
         * "DisplayMenuBar": true
         *
         * @to
         *
         * "DisplayMenuBar": "default-on"
         */
        if (configuration.checkboxes.DisplayMenuBar) {
          configuration.select.DisplayMenuBar_Select = 'default-on';
        }

        /*
         * @from
         *
         * "DisableMasterPasswordCreation": true
         *
         * @to
         *
         * "PrimaryPassword": false
         */
        if (configuration.checkboxes.DisableMasterPasswordCreation) {
          configuration.checkboxes.PrimaryPassword = true;
          configuration.select.PrimaryPassword_Select = 'false';
          delete configuration.checkboxes.DisableMasterPasswordCreation;
        }

        /*
         * @from
         *
         * "DisableBuiltinPDFViewer": true
         *
         * @to
         *
         * "PDFjs": { "Enabled": false }
         */
        if (configuration.checkboxes.DisableBuiltinPDFViewer) {
          configuration.checkboxes.PDFjs = true;
          configuration.select.PDFjs_Enabled = 'false';
          delete configuration.checkboxes.DisableBuiltinPDFViewer;
        }

        configurations[i].configuration = configuration;
      }

      await browser.storage.local.set({ configurations : configurations, schemaVersion : 2 });
      migrator.migrate();
    }
  }
};
