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
         * @removed
         *
         * "FlashPlugin"
         */
        if (configuration.checkboxes.FlashPlugin) {
          delete configuration.checkboxes.FlashPlugin;
          delete configuration.checkboxes.FlashPlugin_Locked;
          delete configuration.arrayfields.FlashPlugin_Allow;
          delete configuration.select.FlashPlugin_Default;

          for (const [key] of Object.entries(configuration.input)) {
            const allowMatches = key.match(/^FlashPlugin_Allow_(\d+)/i);
            if (allowMatches) {
              delete configuration.input['FlashPlugin_Allow_' + allowMatches[1]];
            }

            const blockMatches = key.match(/^FlashPlugin_Block_(\d+)/i);
            if (blockMatches) {
              delete configuration.input['FlashPlugin_Block_' + blockMatches[1]];
            }
          }
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

          if (configuration.arrayfields.InstallAddonsPermission_Allow) {
            for (const idx of Object.values(configuration.arrayfields.InstallAddonsPermission_Allow)) {
              configuration.arrayfields.ExtensionSettings_install_sources_install_sources.push(idx);
            }

            delete configuration.arrayfields.InstallAddonsPermission_Allow;
          }

          for (const [key, url] of Object.entries(configuration.input)) {
            const matches = key.match(/^InstallAddonsPermission_Allow_(\d+)/i);
            if (matches) {
              configuration.input['ExtensionSettings_install_sources_install_sources_' + matches[1]] = url;
              delete configuration.input['InstallAddonsPermission_Allow_' + matches[1]];
            }
          }

          delete configuration.checkboxes.InstallAddonsPermission;
        }

        /*
         * @from
         *
         * "Preferences": { "media.gmp-widevinecdm.enabled": true|false }
         *
         * @to
         *
         * "EncryptedMediaExtensions": { "Enabled": true|false, "Locked": true }
         */
        if (configuration.checkboxes.Preference_media_gmp_widevinecdm_enabled) {
          const boolean = configuration.select.Preference_media_gmp_widevinecdm_enabled_Select === 'true';
          configuration.checkboxes.EncryptedMediaExtensions = true;
          configuration.checkboxes.EncryptedMediaExtensions_Locked = true;
          configuration.select.EncryptedMediaExtensions_Enabled = boolean.toString();
          delete configuration.checkboxes.Preference_media_gmp_widevinecdm_enabled;
          delete configuration.select.Preference_media_gmp_widevinecdm_enabled_Select;
        }

        /*
         * @removed
         *
         * "SearchEngines": { "DefaultPrivate": "foo" }
         */
        if (configuration.input.SearchEngines_DefaultPrivate) {
          delete configuration.input.SearchEngines_DefaultPrivate;
        }

        configurations[i].configuration = configuration;
      }

      await browser.storage.local.set({ configurations : configurations, schemaVersion : 2 });
      migrator.migrate();
    }
  },

  /**
   * Version: EPG 6.1.0
   *
   * @returns {void}
   */
  async migration_2 () {
    const { configurations } = await browser.storage.local.get({ configurations : [] });
    const configurationLength = configurations.length;

    if (configurationLength > 0) {
      for (let i = 0; i < configurationLength; i++) {
        const { configuration } = configurations[i];

        /*
         * @from
         *
         * "OverrideFirstRunPage": [url]
         *
         * @to
         *
         * "OverrideFirstRunPage": [split-url]
         */
        if (configuration.checkboxes.OverrideFirstRunPage) {
          configuration.input.OverrideFirstRunPage_Value_1 = configuration.input.OverrideFirstRunPage_Text;
          delete configuration.input.OverrideFirstRunPage_Text;
        }

        configurations[i].configuration = configuration;
      }

      await browser.storage.local.set({ configurations : configurations, schemaVersion : 3 });
      migrator.migrate();
    }
  },

  /**
   * Version: EPG 6.2.0
   *
   * @returns {void}
   */
  async migration_3 () {
    const { configurations } = await browser.storage.local.get({ configurations : [] });
    const configurationLength = configurations.length;

    if (configurationLength > 0) {
      for (let i = 0; i < configurationLength; i++) {
        const { configuration } = configurations[i];

        /*
         * @removed
         *
         * "FirefoxHome": { "Snippets" }
         */
        if (configuration.select.FirefoxHome_Snippets) {
          delete configuration.select.FirefoxHome_Snippets;
        }

        /*
         * @from
         *
         * "Cookies": { "Default", "AcceptThirdParty", "RejectTracker" }
         *
         * @to
         *
         * "Cookies": { "Behavior" }
         */
        if (configuration.checkboxes.Cookies) {
          if (configuration.checkboxes.Cookies_RejectTracker && configuration.select.Cookies_Default === 'true') {
            configuration.select.Cookies_Behavior = 'reject-tracker';
          }
          else if (configuration.select.Cookies_Default === 'true') {
            if (configuration.select.Cookies_AcceptThirdParty === 'always') {
              configuration.select.Cookies_Behavior = 'accept';
            }
            else if (configuration.select.Cookies_AcceptThirdParty === 'never') {
              configuration.select.Cookies_Behavior = 'reject-foreign';
            }
            else if (configuration.select.Cookies_AcceptThirdParty === 'from-visited') {
              configuration.select.Cookies_Behavior = 'limit-foreign';
            }
          }
          else if (configuration.select.Cookies_Default === 'false') {
            configuration.select.Cookies_Behavior = 'reject';
          }

          if (configuration.checkboxes.Cookies_RejectTracker) {
            delete configuration.checkboxes.Cookies_RejectTracker;
          }

          delete configuration.select.Cookies_Default;
          delete configuration.select.Cookies_AcceptThirdParty;
        }

        configurations[i].configuration = configuration;
      }

      await browser.storage.local.set({ configurations : configurations, schemaVersion : 4 });
      migrator.migrate();
    }
  },

  /**
   * Version: EPG 6.3.0
   *
   * @returns {void}
   */
  async migration_4 () {
    const { configurations } = await browser.storage.local.get({ configurations : [] });
    const configurationLength = configurations.length;

    if (configurationLength > 0) {
      for (let i = 0; i < configurationLength; i++) {
        const { configuration } = configurations[i];

        /*
         * @from
         *
         * "DisplayBookmarksToolbar": true
         *
         * @to
         *
         * "DisplayBookmarksToolbar": "always"
         */
        if (configuration.checkboxes.DisplayBookmarksToolbar) {
          configuration.select.DisplayBookmarksToolbar_Select = 'always';
        }

        /*
         * @updated
         *
         * "ExtensionSettings": { "*" }
         */
        if (configuration.input.ExtensionSettings_install_sources_1_install_sources_1) {
          configuration.input.ExtensionSettings_1_install_sources_1 = configuration.input.ExtensionSettings_install_sources_1_install_sources_1;
          delete configuration.input.ExtensionSettings_install_sources_1_install_sources_1;
        }

        if (configuration.input.ExtensionSettings_restricted_domains_1_restricted_domains_1) {
          configuration.input.ExtensionSettings_1_restricted_domains_1 = configuration.input.ExtensionSettings_restricted_domains_1_restricted_domains_1;
          delete configuration.input.ExtensionSettings_restricted_domains_1_restricted_domains_1;
        }

        if (configuration.input.ExtensionSettings_blocked_install_message_blocked_install_message) {
          configuration.input.ExtensionSettings_1_restricted_domains_1 = configuration.input.ExtensionSettings_blocked_install_message_blocked_install_message;
          delete configuration.input.ExtensionSettings_blocked_install_message;
        }

        if (configuration.select.ExtensionSettings_installation_mode_installation_mode) {
          configuration.select.ExtensionSettings_installation_mode = configuration.select.ExtensionSettings_installation_mode_installation_mode;
          delete configuration.select.ExtensionSettings_installation_mode_installation_mode;
        }

        /*
         * @from
         *
         * "SecurityDevices": { "Key" : "Value" }
         *
         * @to
         *
         * "SecurityDevices": { "Add" : { "Key" : "Value" } }
         */
        if (configuration.checkboxes.SecurityDevices) {
          configuration.arrayfields.SecurityDevices_Add = configuration.arrayfields.SecurityDevices;
          delete configuration.arrayfields.SecurityDevices;

          for (let i = 1; i <= configuration.arrayfields.SecurityDevices_Add[0]; i++) {
            configuration.input['SecurityDevices_Add_Key_' + i] = configuration.input['SecurityDevices_Key_Value_' + i];
            configuration.input['SecurityDevices_Add_Value_' + i] = configuration.input['SecurityDevices_Value_Value_' + i];
            delete configuration.input['SecurityDevices_Key_Value_' + i];
            delete configuration.input['SecurityDevices_Value_Value_' + i];
          }
        }

        configurations[i].configuration = configuration;
      }

      await browser.storage.local.set({ configurations : configurations, schemaVersion : 5 });
      migrator.migrate();
    }
  },

  /**
   * Version: EPG 6.5.0
   *
   * @returns {void}
   */
  async migration_5 () {
    const { configurations } = await browser.storage.local.get({ configurations : [] });
    const configurationLength = configurations.length;

    if (configurationLength > 0) {
      for (let i = 0; i < configurationLength; i++) {
        const { configuration } = configurations[i];

        /*
         * @removed
         *
         * "UserMessaging": { "WhatsNew" }
         */
        if (configuration.select.UserMessaging_WhatsNew) {
          delete configuration.select.UserMessaging_WhatsNew;
        }

        configurations[i].configuration = configuration;
      }

      await browser.storage.local.set({ configurations : configurations, schemaVersion : 6 });
      migrator.migrate();
    }
  },

  /**
   * Version: EPG 6.6.0
   *
   * @returns {void}
   */
  async migration_6 () {
    const { configurations } = await browser.storage.local.get({ configurations : [] });
    const configurationLength = configurations.length;

    if (configurationLength > 0) {
      for (let i = 0; i < configurationLength; i++) {
        const { configuration } = configurations[i];

        /*
         * @removed
         *
         * "DisablePocket"
         */
        if (configuration.checkboxes.DisablePocket) {
          delete configuration.checkboxes.DisablePocket;
        }

        /*
         * @removed
         *
         * "Preference_privacy_file_unique_origin"
         */
        if (configuration.checkboxes.Preference_privacy_file_unique_origin) {
          delete configuration.checkboxes.Preference_privacy_file_unique_origin;
          delete configuration.select.Preference_privacy_file_unique_origin_Select;
        }

        /*
         * @removed
         *
         * "Preference_security_ssl_errorReporting_enabled"
         */
        if (configuration.checkboxes.Preference_security_ssl_errorReporting_enabled) {
          delete configuration.checkboxes.Preference_security_ssl_errorReporting_enabled;
          delete configuration.select.Preference_security_ssl_errorReporting_enabled_Select;
        }

        configurations[i].configuration = configuration;
      }

      await browser.storage.local.set({ configurations : configurations, schemaVersion : 7 });
      migrator.migrate();
    }
  },

  /**
   * Version: EPG 7.0.0
   *
   * @returns {void}
   */
  async migration_7 () {
    const { configurations } = await browser.storage.local.get({ configurations : [] });
    const configurationLength = configurations.length;

    if (configurationLength > 0) {
      for (let i = 0; i < configurationLength; i++) {
        const { configuration } = configurations[i];

        /*
         * @from
         *
         * "DisableFirefoxAccounts": true
         *
         * @to
         *
         * "DisableAccounts": true
         */
        if (configuration.checkboxes.DisableFirefoxAccounts) {
          configuration.checkboxes.DisableAccounts = true;
          delete configuration.checkboxes.DisableFirefoxAccounts;
        }

        configurations[i].configuration = configuration;
      }

      await browser.storage.local.set({ configurations : configurations, schemaVersion : 8 });
      migrator.migrate();
    }
  }
};
