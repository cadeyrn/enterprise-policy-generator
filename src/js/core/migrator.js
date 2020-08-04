'use strict';

/**
 * @exports migrator
 */
const migrator = {
  async migrate () {
    const { schemaVersion } = await browser.storage.local.get({ schemaVersion : 1 });

    if (typeof migrator['migration_' + schemaVersion] === 'function') {
      migrator['migration_' + schemaVersion]();
    }
  }
};
