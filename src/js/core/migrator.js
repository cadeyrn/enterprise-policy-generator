'use strict';

class Migrator {
  /**
   * Executes migrations on extension updates.
   *
   * @returns {void}
   */
  static async migrate () {
    const { version } = await browser.storage.local.get({ schema: 2, version: 1 });

    if (typeof Migrator['#migration_' + version] === 'function') {
      Migrator['#migration_' + version]();
    }
  }
}
