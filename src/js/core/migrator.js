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
   * Migrate from:
   *
   * "DisplayMenuBar": true
   *
   * to:
   *
   * "DisplayMenuBar": "default-on"
   *
   * @returns {void}
   */
  async migration_1 () {
    const { configurations } = await browser.storage.local.get({ configurations : [] });
    const configurationLength = configurations.length;

    if (configurationLength > 0) {
      for (let i = 0; i < configurationLength; i++) {
        const { configuration } = configurations[i];

        if (configuration.checkboxes.DisplayMenuBar) {
          configuration.select.DisplayMenuBar_Select = 'default-on';
        }

        configurations[i].configuration = configuration;
      }

      await browser.storage.local.set({ configurations : configurations, schemaVersion : 2 });
      migrator.migrate();
    }
  }
};
