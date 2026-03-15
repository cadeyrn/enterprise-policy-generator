'use strict';

/* global DOWNLOAD_PERMISSION, I18n, Migrator, Output, Serializer */

const $configurationTable = document.getElementById('list-configurations-table');
const $importConfigurationButton = document.getElementById('import-configuration');
const $importConfigurationDialog = document.getElementById('import-configuration-dialog');
const $incompatibleConfigurationDialog = document.getElementById('incompatible-configuration-dialog');
const $listConfigurationsButton = document.getElementById('list-configurations');
const $listConfigurationDialog = document.getElementById('configuration-list-dialog');
const $noSavedConfigurations = document.getElementById('no-saved-configurations');
const $saveConfigurationButton = document.getElementById('save-configuration');
const $saveConfigurationDialog = document.getElementById('save-configuration-dialog');

class Management {
  /**
   * Store the previous dialog that was open before the current dialog was closed.
   *
   * @type {HTMLDialogElement}
   */
  static previousDialog;

  /**
   * Set up the event listeners for the configuration management buttons.
   *
   * @returns {void}
   */
  static init () {
    Management.#setupSaveConfigurationDialog();
    Management.#setupListConfigurationsDialog();
    Management.#setupImportConfigurationDialog();
    Management.#setupIncompatibleConfigurationDialog();

    $saveConfigurationButton.addEventListener('click', () => {
      $saveConfigurationDialog.showModal();
    });

    $listConfigurationsButton.addEventListener('click', () => {
      $listConfigurationDialog.showModal();
      Management.#listConfigurations();
    });

    $importConfigurationButton.addEventListener('click', () => {
      $importConfigurationDialog.showModal();
    });
  }

  /**
   * Set up the event listeners for the "save configuration" dialog.
   *
   * @returns {void}
   */
  static #setupSaveConfigurationDialog () {
    const $name = $saveConfigurationDialog.querySelector('#save-dialog-name');
    const $submitButton = $saveConfigurationDialog.querySelector('#button-save-dialog-ok');
    const $closeButton = $saveConfigurationDialog.querySelector('#button-save-dialog-cancel');

    // do things on the dialog close
    $saveConfigurationDialog.addEventListener('close', () => {
      $saveConfigurationDialog.querySelector('#save-dialog-name').value = '';
      $submitButton.setAttribute('disabled', 'disabled');
    });

    // the name field must not be empty
    $name.addEventListener('input', () => {
      if ($name.value) {
        $submitButton.removeAttribute('disabled');
      }
      else {
        $submitButton.setAttribute('disabled', 'disabled');
      }
    });

    // close the dialog by clicking the cancel button
    $closeButton.addEventListener('click', () => {
      $saveConfigurationDialog.close();
    });

    // submit button
    $submitButton.addEventListener('click', () => {
      Management.#saveConfiguration($name.value);
      $saveConfigurationDialog.close();
    });

    // save configuration by pressing Enter
    window.addEventListener('keydown', e => {
      if ($saveConfigurationDialog.open && e.key === 'Enter') {
        e.preventDefault();

        if ($name.value) {
          Management.#saveConfiguration($name.value);
          $saveConfigurationDialog.close();
        }
      }
    });
  }

  /**
   * Save the current configuration with a name and the current date and time.
   *
   * @param {string} name - the name of the configuration
   *
   * @returns {void}
   */
  static async #saveConfiguration (name) {
    const { configurations } = await browser.storage.local.get({ configurations: [] });

    const configuration = {
      schema: 2,
      product: 'firefox',
      name: name,
      time: new Date(),
      configuration: Serializer.serialize()
    };

    configurations.push(configuration);

    await browser.storage.local.set({ configurations: configurations });
  }

  /**
   * Set up the event listeners for the "load configuration" dialog.
   *
   * @returns {void}
   */
  static #setupListConfigurationsDialog () {
    // close the dialog by clicking the cancel button
    const $closeButton = $listConfigurationDialog.querySelector('#button-list-dialog-cancel');
    $closeButton.addEventListener('click', () => {
      $listConfigurationDialog.close();
    });
  }

  /**
   * List the saved configurations.
   *
   * @returns {void}
   */
  static async #listConfigurations () {
    const { configurations } = await browser.storage.local.get({ configurations: [] });

    // show notice if no configurations are saved, otherwise show the configurations table
    if (configurations.length === 0) {
      $noSavedConfigurations.classList.remove('hidden');
      $configurationTable.classList.add('hidden');
    }
    else {
      $noSavedConfigurations.classList.add('hidden');
      $configurationTable.classList.remove('hidden');
    }

    // tbody element, configuration rows will be added here
    const $tableBody = $configurationTable.querySelector('tbody');

    // remove old content
    while ($tableBody.firstChild) {
      $tableBody.removeChild($tableBody.firstChild);
    }

    // add configurations to the table
    for (const [idx, configuration] of configurations.entries()) {
      // row
      const $row = document.createElement('tr');
      $tableBody.appendChild($row);

      // name column
      const $nameColumn = document.createElement('td');
      $nameColumn.textContent = configuration.name;
      $row.appendChild($nameColumn);

      // time column
      const $timeColumn = document.createElement('td');
      $timeColumn.textContent = configuration.time.toLocaleString();
      $row.appendChild($timeColumn);

      // icon column
      const $iconColumn = document.createElement('td');
      $iconColumn.classList.add('actions');
      $row.appendChild($iconColumn);

      // remove icon
      const $removeButton = document.createElement('button');
      $removeButton.setAttribute('type', 'button');
      $removeButton.setAttribute('title', I18n.getMessage('title_remove_configuration'));
      $removeButton.setAttribute('data-idx', idx.toString());
      $removeButton.classList.add('icon', 'trash-icon');
      $removeButton.addEventListener('click', Management.#removeConfiguration);
      $iconColumn.appendChild($removeButton);

      const $removeIcon = document.createElement('img');
      $removeIcon.src = '/images/trash.svg';
      $removeIcon.width = 18;
      $removeIcon.height = 18;
      $removeIcon.alt = I18n.getMessage('title_remove_configuration');
      $removeButton.appendChild($removeIcon);

      // fake export icon (permission not yet granted)
      const $fakeExportButton = document.createElement('button');
      $fakeExportButton.setAttribute('type', 'button');
      $fakeExportButton.setAttribute('title', I18n.getMessage('configuration_export'));
      $fakeExportButton.setAttribute('data-idx', idx.toString());
      $fakeExportButton.classList.add('icon', 'fake-export-link');
      $fakeExportButton.addEventListener('click', Management.#grantDownloadPermission);
      $iconColumn.appendChild($fakeExportButton);

      const $fakeExportIcon = document.createElement('img');
      $fakeExportIcon.src = '/images/export.svg';
      $fakeExportIcon.width = 18;
      $fakeExportIcon.height = 18;
      $fakeExportIcon.alt = I18n.getMessage('configuration_export');
      $fakeExportButton.appendChild($fakeExportIcon);

      // export icon
      const $exportButton = document.createElement('button');
      $exportButton.setAttribute('type', 'button');
      $exportButton.setAttribute('title', I18n.getMessage('configuration_export'));
      $exportButton.setAttribute('data-idx', idx.toString());
      $exportButton.classList.add('icon', 'export-link', 'hidden');
      $exportButton.addEventListener('click', Management.#exportConfiguration);
      $iconColumn.appendChild($exportButton);

      const $exportIcon = document.createElement('img');
      $exportIcon.src = '/images/export.svg';
      $exportIcon.width = 18;
      $exportIcon.height = 18;
      $exportIcon.alt = I18n.getMessage('configuration_export');
      $exportButton.appendChild($exportIcon);

      // load icon
      const $loadButton = document.createElement('button');
      $loadButton.setAttribute('type', 'button');
      $loadButton.setAttribute('title', I18n.getMessage('title_apply_configuration'));
      $loadButton.setAttribute('data-idx', idx.toString());
      $loadButton.classList.add('icon');
      $iconColumn.appendChild($loadButton);

      // configurations saved before EPG 8.0 did not have the schema key and are not compatible
      if (configuration.schema) {
        $loadButton.addEventListener('click', Management.#applyConfiguration);
      }
      else {
        $loadButton.addEventListener('click', () => {
          Management.previousDialog = $listConfigurationDialog;
          $listConfigurationDialog.close();
          $incompatibleConfigurationDialog.showModal();
        });
      }

      const $loadIcon = document.createElement('img');
      $loadIcon.src = `/images/${configuration.schema ? 'checkmark' : 'warning'}.svg`;
      $loadIcon.width = 18;
      $loadIcon.height = 18;
      $loadIcon.alt = I18n.getMessage('title_apply_configuration');
      $loadButton.appendChild($loadIcon);
    }

    Management.#testDownloadPermission();
  }

  /**
   * Apply the selected configuration.
   *
   * @param {MouseEvent} e - the mouse event
   *
   * @returns {void}
   */
  static async #applyConfiguration (e) {
    const { configurations } = await browser.storage.local.get({ configurations: [] });
    const $policyOutput = document.getElementById('policy-output');

    Serializer.unserialize(configurations[e.target.getAttribute('data-idx')].configuration);
    $listConfigurationDialog.close();

    // only supported in Firefox 148+
    if ('Sanitizer' in window) {
      const sanitizer = new Sanitizer({ elements: ['span'], attributes: ['class'] });
      $policyOutput.setHTML(Output.generatePoliciesOutput(true), { sanitizer });
    }
    else {
      $policyOutput.textContent = Output.generatePoliciesOutput();
    }

    document.getElementById('action-links').classList.remove('hidden');
  }

  /**
   * Remove the selected configuration.
   *
   * @param {MouseEvent} e - the mouse event
   *
   * @returns {void}
   */
  static async #removeConfiguration (e) {
    const { configurations } = await browser.storage.local.get({ configurations: [] });
    configurations.splice(e.target.getAttribute('data-idx'), 1);
    await browser.storage.local.set({ configurations: configurations });
    Management.#listConfigurations();
  }

  /**
   * Test if the downloads permission has been granted or not. If granted, the link for granting the permission
   * will be hidden and the real export link will be shown.
   *
   * @returns {void}
   */
  static async #testDownloadPermission () {
    const granted = await browser.permissions.contains(DOWNLOAD_PERMISSION);

    // if the downloads permission is granted, hide the link for granting permission and show the
    // real export link instead
    if (granted) {
      const $fakeExportLink = document.querySelector('.fake-export-link');
      const $exportLink = document.querySelector('.export-link');

      if ($fakeExportLink) {
        $fakeExportLink.classList.add('hidden');
      }

      if ($exportLink) {
        $exportLink.classList.remove('hidden');
      }
    }
  }

  /**
   * Grant the download permission and exports the configuration once granted.
   *
   * @param {MouseEvent} e - the mouse event
   *
   * @returns {void}
   */
  static async #grantDownloadPermission (e) {
    const granted = await browser.permissions.request(DOWNLOAD_PERMISSION);

    // immediately prompt for download after the downloads permission has been granted
    if (granted) {
      Management.#exportConfiguration(e);
    }
  }

  /**
   * Exports a configuration.
   *
   * @param {MouseEvent} e - event
   *
   * @returns {void}
   */
  static async #exportConfiguration (e) {
    const { configurations } = await browser.storage.local.get({ configurations: [] });
    const configuration = configurations[e.target.getAttribute('data-idx')];
    const serializedConfig = window.btoa(JSON.stringify(configuration));

    await browser.downloads.download({
      saveAs: true,
      url: URL.createObjectURL(new Blob([serializedConfig])),
      filename: 'policy-export-' + configuration.time.getTime() + '.policy'
    });
  }

  /**
   * Set up the event listeners for the "import configuration" dialog.
   *
   * @returns {void}
   */
  static #setupImportConfigurationDialog () {
    const $name = $importConfigurationDialog.querySelector('#import-dialog-name');
    const $fileInput = $importConfigurationDialog.querySelector('#import-file-input');
    const $submitButton = $importConfigurationDialog.querySelector('#button-import-config-ok');
    const $closeButton = $importConfigurationDialog.querySelector('#button-import-config-cancel');

    $importConfigurationDialog.addEventListener('close', () => {
      $importConfigurationDialog.querySelector('#import-dialog-name').value = '';
      $importConfigurationDialog.querySelector('#import-file-input').value = '';
      $submitButton.setAttribute('disabled', 'disabled');
    });

    const disableSubmitButton = () => {
      if ($name.value && $fileInput.value) {
        $submitButton.removeAttribute('disabled');
      }
      else {
        $submitButton.setAttribute('disabled', 'disabled');
      }
    };

    // the name and the file input field must not be empty
    $name.addEventListener('input', disableSubmitButton);
    $fileInput.addEventListener('input', disableSubmitButton);

    // close the dialog by clicking the cancel button
    $closeButton.addEventListener('click', () => {
      $importConfigurationDialog.close();
    });

    // import configuration by pressing Enter, close the dialog by pressing ESC
    window.addEventListener('keydown', e => {
      if ($importConfigurationDialog.open && e.key === 'Enter') {
        e.preventDefault();

        if ($name.value && $fileInput.value) {
          Management.#importConfiguration($name.value, $fileInput);
          $importConfigurationDialog.close();
        }
      }
    });

    // submit button
    $submitButton.addEventListener('click', () => {
      Management.#importConfiguration($name.value, $fileInput);
      $importConfigurationDialog.close();
    });
  }

  /**
   * Import a configuration file.
   *
   * @param {string} name - the name of the configuration
   * @param {HTMLInputElement} $localFile - the DOM element of the configuration file input
   *
   * @returns {void}
   */
  static #importConfiguration (name, $localFile) {
    const reader = new FileReader();

    reader.readAsText($localFile.files[0]);
    reader.addEventListener('loadend', async () => {
      const { configurations } = await browser.storage.local.get({ configurations: [] });
      const file = reader.result.toString();
      const data = JSON.parse(window.atob(file));

      // configurations saved before EPG 8.0 did not have the schema key, and we don't want to import them
      if (!data.schema) {
        Management.previousDialog = $importConfigurationDialog;
        $incompatibleConfigurationDialog.showModal();

        return;
      }

      const configuration = {
        name: name,
        time: new Date(),
        configuration: data.configuration
      };

      configurations.push(configuration);

      // migrate old configuration files
      await browser.storage.local.set({ configurations: configurations, schema: 2, version: 1 });
      Migrator.migrate();

      $listConfigurationDialog.showModal();
      Management.#listConfigurations();
    });
  }

  /**
   * Set up the event listeners for the "incompatible configuration" dialog.
   *
   * @returns {void}
   */
  static #setupIncompatibleConfigurationDialog () {
    const $submitButton = $incompatibleConfigurationDialog.querySelector('#button-incompatible-config-ok');
    const $closeButton = $incompatibleConfigurationDialog.querySelector('#button-incompatible-config-cancel');

    $submitButton.addEventListener('click', () => {
      window.open('https://www.soeren-hentzschel.at/kontakt/?utm_campaign=webext&utm_term=enterprise-migration', '_blank');
    });

    $incompatibleConfigurationDialog.addEventListener('close', () => {
      Management.previousDialog.showModal();
    });

    // close the dialog by clicking the cancel button
    $closeButton.addEventListener('click', () => {
      $incompatibleConfigurationDialog.close();
    });
  }
}

Management.init();
