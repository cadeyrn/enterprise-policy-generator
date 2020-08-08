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
          delete configuration.input.SearchEngines_DefaultPrivate;
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

        /*
         * @from
         *
         * "InstallAddonsPermission": { "Allow": [], "Default": true|false }
         *
         * @to
         *
         * "ExtensionSettings": { "*" : { "install_sources": [], "installation_mode": "allowed"|"blocked" } }
         */
        if (configuration.checkboxes.InstallAddonsPermission && !configuration.checkboxes.ExtensionSettings) {
          configuration.checkboxes.ExtensionSettings = true;

          // installation_mode
          const mode = configuration.select.InstallAddonsPermission_Default === 'true' ? 'allowed' : 'blocked';
          configuration.select.ExtensionSettings_installation_mode_installation_mode = mode;
          delete configuration.select.InstallAddonsPermission_Default;

          // install_sources
          if (!configuration.arrayfields.ExtensionSettings_install_sources_install_sources) {
            configuration.arrayfields.ExtensionSettings_install_sources_install_sources = [];
          }

          for (const idx of Object.values(configuration.arrayfields.InstallAddonsPermission_Allow)) {
            configuration.arrayfields.ExtensionSettings_install_sources_install_sources.push(idx);
          }

          delete configuration.arrayfields.InstallAddonsPermission_Allow;

          for (const [key, url] of Object.entries(configuration.input)) {
            const matches = key.match(/^InstallAddonsPermission_Allow_(\d+)/i);
            // eslint-disable-next-line max-depth
            if (matches) {
              configuration.input['ExtensionSettings_install_sources_install_sources_' + matches[1]] = url;
              delete configuration.input['InstallAddonsPermission_Allow_' + matches[1]];
            }
          }

          delete configuration.checkboxes.InstallAddonsPermission;
        }

        configurations[i].configuration = configuration;
      }

      await browser.storage.local.set({ configurations : configurations, schemaVersion : 2 });
      migrator.migrate();
    }
  }
};
