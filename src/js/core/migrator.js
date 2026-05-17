'use strict';

class Migrator {
  /**
   * Storage migrations keyed by the previous storage version.
   *
   * @type {object}
   */
  static #migrations = {

  };

  /**
   * The current storage version after all known migrations have been applied.
   *
   * @returns {number} the current storage version
   */
  static get storageVersion () {
    return Math.max(0, ...Object.keys(Migrator.#migrations).map(Number)) + 1;
  }

  /**
   * Migrate a single imported configuration before it is saved.
   *
   * @param {object} configuration - the configuration to migrate
   *
   * @returns {Promise<void>}
   */
  static async migrateConfiguration (configuration) {
    const storage = {
      configurations: [configuration],
      version: configuration.version ?? 1
    };

    await Migrator.#migrateStorage(storage);
    Migrator.#updateConfigurationVersions(storage);
  }

  /**
   * Executes migrations on extension updates.
   *
   * @returns {Promise<void>}
   */
  static async migrate () {
    const storage = await browser.storage.local.get({ configurations: [], version: 1 });
    const originalVersion = storage.version;

    await Migrator.#migrateStorage(storage);
    const configurationsWereUpdated = Migrator.#updateConfigurationVersions(storage);

    if (storage.version !== originalVersion || configurationsWereUpdated) {
      await browser.storage.local.set({
        configurations: storage.configurations,
        version: storage.version
      });
    }
  }

  /**
   * Executes all migrations starting from the given storage version.
   *
   * @param {object} storage - the storage data to migrate
   *
   * @returns {Promise<void>}
   */
  static async #migrateStorage (storage) {
    let migration = Migrator.#migrations[storage.version];

    while (typeof migration === 'function') {
      // migrations must run sequentially because each version builds on the previous one
      // eslint-disable-next-line no-await-in-loop
      await migration(storage);
      storage.version++;
      migration = Migrator.#migrations[storage.version];
    }
  }

  /**
   * Assigns the current storage version to configurations that do not have their own version yet.
   *
   * @param {object} storage - the storage data
   *
   * @returns {boolean} whether a configuration was updated
   */
  static #updateConfigurationVersions (storage) {
    let updated = false;

    for (const configuration of storage.configurations) {
      if (!configuration.version || configuration.version < storage.version) {
        configuration.version = storage.version;
        updated = true;
      }
    }

    return updated;
  }
}
