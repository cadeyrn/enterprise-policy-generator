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
  }
};
