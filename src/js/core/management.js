'use strict';

/* global DOWNLOAD_PERMISSION, I18n, Migrator, Output, PolicyManager, POPOVER_DURATION_IN_MS, Serializer, Sortable */

const BASE64_BINARY_CHUNK_SIZE = 8192;
const DIALOG_CLOSE_ANIMATION_DURATION_IN_MS = 300;
const SCHEMA_VERSION_CURRENT = 2;
const SCHEMA_VERSION_MIN_SUPPORTED = 2;

const $configurationTable = document.getElementById('list-configurations-table');
const $importConfigurationButton = document.getElementById('import-configuration');
const $importConfigurationDialog = document.getElementById('import-configuration-dialog');
const $importPoliciesJsonReportDialog = document.getElementById('import-policies-json-report-dialog');
const $incompatibleConfigurationDialog = document.getElementById('incompatible-configuration-dialog');
const $listConfigurationsButton = document.getElementById('list-configurations');
const $listConfigurationDialog = document.getElementById('configuration-list-dialog');
const $noSavedConfigurations = document.getElementById('no-saved-configurations');
const $deleteConfigurationDialog = document.getElementById('delete-configuration-dialog');
const $renameConfigurationDialog = document.getElementById('rename-configuration-dialog');
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
   * Timeout for hiding the currently visible status popover.
   *
   * @type {?number}
   */
  static #statusPopoverTimeout = null;

  /**
   * Set up the event listeners for the configuration management buttons.
   *
   * @returns {void}
   */
  static init () {
    Management.#setupDialogAnimations();
    Management.#setupSaveConfigurationDialog();
    Management.#setupListConfigurationsDialog();
    Management.#setupRenameConfigurationDialog();
    Management.#setupDeleteConfigurationDialog();
    Management.#setupImportConfigurationDialog();
    Management.#setupImportPoliciesJsonReportDialog();
    Management.#setupIncompatibleConfigurationDialog();

    $saveConfigurationButton.addEventListener('click', () => {
      $saveConfigurationDialog.showModal();
    });

    $listConfigurationsButton.addEventListener('click', () => {
      $listConfigurationDialog.showModal();
      void Management.#listConfigurations();
    });

    $importConfigurationButton.addEventListener('click', () => {
      $importConfigurationDialog.showModal();
    });
  }

  /**
   * Set up the animated dialog closing.
   *
   * @returns {void}
   */
  static #setupDialogAnimations () {
    document.querySelectorAll('dialog').forEach($dialog => {
      $dialog.addEventListener('cancel', e => {
        e.preventDefault();
        void Management.#closeDialog($dialog);
      });

      $dialog.addEventListener('close', () => {
        $dialog.classList.remove('closing');
      });
    });
  }

  /**
   * Close a dialog after the CSS exit transition has finished.
   *
   * @param {HTMLDialogElement} $dialog - the dialog to close
   *
   * @returns {Promise<void>}
   */
  static #closeDialog ($dialog) {
    if (!$dialog.open) {
      return Promise.resolve();
    }

    if ($dialog.classList.contains('closing')) {
      return new Promise(resolve => {
        $dialog.addEventListener('close', resolve, { once: true });
      });
    }

    $dialog.classList.add('closing');

    return new Promise(resolve => {
      let didClose = false;
      const close = () => {
        if (didClose) {
          return;
        }

        didClose = true;
        $dialog.close();
      };

      const onTransitionEnd = e => {
        if (e.target === $dialog && e.propertyName === 'opacity') {
          close();
        }
      };

      window.setTimeout(close, DIALOG_CLOSE_ANIMATION_DURATION_IN_MS);
      $dialog.addEventListener('close', () => {
        $dialog.removeEventListener('transitionend', onTransitionEnd);
        resolve();
      }, { once: true });
      $dialog.addEventListener('transitionend', onTransitionEnd);
    });
  }

  /**
   * Show a temporary status popover.
   *
   * @param {HTMLElement} $popover - the popover to show
   *
   * @returns {void}
   */
  static #showStatusPopover ($popover) {
    document.querySelectorAll('.popover:popover-open').forEach($openPopover => {
      $openPopover.hidePopover();
    });

    $popover.showPopover();

    if (Management.#statusPopoverTimeout) {
      window.clearTimeout(Management.#statusPopoverTimeout);
    }

    Management.#statusPopoverTimeout = window.setTimeout(() => {
      $popover.hidePopover();
      Management.#statusPopoverTimeout = null;
    }, POPOVER_DURATION_IN_MS);
  }

  /**
   * Render the generated policies output.
   *
   * @returns {object} the generated top-level policies object
   */
  static #renderPolicyOutput () {
    const $policyOutput = document.getElementById('policy-output');
    let output = null;

    // only supported in Firefox 148+
    if ('Sanitizer' in window) {
      const sanitizer = new Sanitizer({ elements: ['span'], attributes: ['class'] });
      $policyOutput.setHTML(Output.generatePoliciesOutput(true), { sanitizer });
      output = PolicyManager.getConfiguration();
    }
    else {
      output = Output.generatePoliciesOutput();
      $policyOutput.textContent = output;
    }

    return JSON.parse(output).policies;
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

    const saveConfiguration = async () => {
      if (!$name.value) {
        return;
      }

      await Management.#saveConfiguration($name.value);
      await Management.#closeDialog($saveConfigurationDialog);
      Management.#showStatusPopover(document.getElementById('save-configuration-popover'));
    };

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
      void Management.#closeDialog($saveConfigurationDialog);
    });

    // submit button
    $submitButton.addEventListener('click', () => {
      void saveConfiguration();
    });

    // save configuration by pressing Enter
    window.addEventListener('keydown', e => {
      if ($saveConfigurationDialog.open && e.key === 'Enter') {
        e.preventDefault();

        void saveConfiguration();
      }
    });
  }

  /**
   * Save the current configuration with a name and the current date and time.
   *
   * @param {string} name - the name of the configuration
   *
   * @returns {Promise<void>}
   */
  static async #saveConfiguration (name) {
    const { configurations } = await browser.storage.local.get({ configurations: [] });

    const configuration = {
      schema: SCHEMA_VERSION_CURRENT,
      version: Migrator.storageVersion,
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
      void Management.#closeDialog($listConfigurationDialog);
    });

    new Sortable($configurationTable.querySelector('.configuration-list-body'), {
      itemSelector: '.configuration-row',
      getDragElementContainer: $item => $item.parentElement,
      overlapThreshold: 0.5,
      onUpdate: items => {
        void Management.#reorderConfigurations(items);
      }
    });
  }

  /**
   * Show a secondary configuration dialog while keeping the list dialog backdrop stable.
   *
   * @param {HTMLDialogElement} $dialog - the dialog shown above the list dialog
   *
   * @returns {void}
   */
  static #showDialogOverConfigurationList ($dialog) {
    $dialog.setAttribute('data-restore-list-dialog', '');
    $listConfigurationDialog.classList.add('covered-by-subdialog');
    $dialog.showModal();
    $listConfigurationDialog.inert = true;
  }

  /**
   * Restore the configuration list dialog after a secondary dialog has been closed.
   *
   * @param {HTMLDialogElement} $dialog - the dialog that has been closed
   *
   * @returns {void}
   */
  static #restoreConfigurationListDialog ($dialog) {
    const shouldRestoreListDialog = $dialog.hasAttribute('data-restore-list-dialog');
    const shouldRefreshListDialog = !$dialog.hasAttribute('data-skip-list-refresh');

    $dialog.removeAttribute('data-restore-list-dialog');
    $dialog.removeAttribute('data-skip-list-refresh');

    if (shouldRestoreListDialog) {
      $listConfigurationDialog.inert = false;
      $listConfigurationDialog.classList.remove('covered-by-subdialog');

      if (shouldRefreshListDialog) {
        void Management.#listConfigurations();
      }
    }
  }

  /**
   * Show the incompatible configuration dialog after a failed import.
   *
   * @returns {void}
   */
  static #showIncompatibleConfigurationAfterImport () {
    Management.previousDialog = $importConfigurationDialog;
    $incompatibleConfigurationDialog.showModal();
  }

  /**
   * Set up the event listeners for the "rename configuration" dialog.
   *
   * @returns {void}
   */
  static #setupRenameConfigurationDialog () {
    const $name = $renameConfigurationDialog.querySelector('#rename-dialog-name');
    const $submitButton = $renameConfigurationDialog.querySelector('#button-rename-config-ok');
    const $closeButton = $renameConfigurationDialog.querySelector('#button-rename-config-cancel');

    const updateSubmitButton = () => {
      if ($name.value && $name.value !== ($renameConfigurationDialog.getAttribute('data-original-name') ?? '')) {
        $submitButton.removeAttribute('disabled');
      }
      else {
        $submitButton.setAttribute('disabled', 'disabled');
      }
    };

    $renameConfigurationDialog.addEventListener('close', () => {
      $renameConfigurationDialog.removeAttribute('data-idx');
      $renameConfigurationDialog.removeAttribute('data-original-name');
      $name.value = '';
      $submitButton.setAttribute('disabled', 'disabled');
      Management.#restoreConfigurationListDialog($renameConfigurationDialog);
    });

    $name.addEventListener('input', updateSubmitButton);

    $closeButton.addEventListener('click', () => {
      void Management.#closeDialog($renameConfigurationDialog);
    });

    $submitButton.addEventListener('click', () => {
      void Management.#renameSelectedConfiguration();
    });

    window.addEventListener('keydown', e => {
      if ($renameConfigurationDialog.open && e.key === 'Enter') {
        e.preventDefault();

        void Management.#renameSelectedConfiguration();
      }
    });
  }

  /**
   * Set up the event listeners for the "delete configuration" confirmation dialog.
   *
   * @returns {void}
   */
  static #setupDeleteConfigurationDialog () {
    const $submitButton = $deleteConfigurationDialog.querySelector('#button-delete-config-ok');
    const $closeButton = $deleteConfigurationDialog.querySelector('#button-delete-config-cancel');

    $deleteConfigurationDialog.addEventListener('close', () => {
      $deleteConfigurationDialog.removeAttribute('data-idx');
      $deleteConfigurationDialog.querySelector('#delete-configuration-dialog-text').textContent = '';
      Management.#restoreConfigurationListDialog($deleteConfigurationDialog);
    });

    // close the dialog by clicking the cancel button
    $closeButton.addEventListener('click', () => {
      void Management.#closeDialog($deleteConfigurationDialog);
    });

    $submitButton.addEventListener('click', () => {
      void Management.#deleteConfirmedConfiguration();
    });
  }

  /**
   * Set the delete confirmation text and highlight the configuration name.
   *
   * @param {string} configurationName - the name of the configuration
   *
   * @returns {void}
   */
  static #setDeleteConfigurationDialogText (configurationName) {
    const $text = $deleteConfigurationDialog.querySelector('#delete-configuration-dialog-text');
    const placeholder = '__CONFIGURATION_NAME__';
    const [messageStart, messageEnd] = I18n.getMessage(
      'delete_configuration_dialog_intro',
      [placeholder]
    ).split(placeholder);
    const $configurationName = document.createElement('strong');

    $configurationName.textContent = configurationName;
    $text.replaceChildren(messageStart, $configurationName, messageEnd);
  }

  /**
   * List the saved configurations.
   *
   * @returns {Promise<void>}
   */
  static async #listConfigurations () {
    const { configurations } = await browser.storage.local.get({ configurations: [] });

    // show notice if no configurations are saved, otherwise show the table of configurations
    if (configurations.length === 0) {
      $noSavedConfigurations.classList.remove('hidden');
      $configurationTable.classList.add('hidden');
    }
    else {
      $noSavedConfigurations.classList.add('hidden');
      $configurationTable.classList.remove('hidden');
    }

    // configuration list items will be added here
    const $configurationList = $configurationTable.querySelector('.configuration-list-body');

    // remove old content
    while ($configurationList.firstChild) {
      $configurationList.removeChild($configurationList.firstChild);
    }

    // add configurations to the list
    for (const [idx, configuration] of configurations.entries()) {
      const isConfigurationCompatible = Management.#isSupportedConfigurationSchema(configuration.schema);

      // list item
      const $row = document.createElement('div');
      $row.classList.add('configuration-row');
      $row.setAttribute('role', 'listitem');
      $row.setAttribute('data-idx', idx.toString());
      $configurationList.appendChild($row);

      // reorder column
      const $reorderColumn = document.createElement('div');
      $reorderColumn.classList.add('reorder');
      $row.appendChild($reorderColumn);

      const $reorderButton = document.createElement('button');
      $reorderButton.setAttribute('type', 'button');
      $reorderButton.classList.add('sortable-handle', 'configuration-sortable-handle');
      $reorderColumn.appendChild($reorderButton);

      // name column
      const $nameColumn = document.createElement('div');
      $nameColumn.classList.add('name');
      $nameColumn.textContent = configuration.name;
      $row.appendChild($nameColumn);

      // time column
      const $timeColumn = document.createElement('div');
      $timeColumn.classList.add('time');
      $timeColumn.textContent = new Intl.DateTimeFormat('default', {
        day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
      }).format(configuration.time);
      $row.appendChild($timeColumn);

      // icon column
      const $iconColumn = document.createElement('div');
      $iconColumn.classList.add('actions');
      $row.appendChild($iconColumn);

      // load icon
      const $loadButton = document.createElement('button');
      const loadConfigurationLabel = I18n.getMessage(
        isConfigurationCompatible ? 'configuration_action_load' : 'configuration_action_show_incompatible',
        [configuration.name]
      );
      $loadButton.setAttribute('type', 'button');
      $loadButton.setAttribute('title', loadConfigurationLabel);
      $loadButton.setAttribute('aria-label', loadConfigurationLabel);
      $loadButton.setAttribute('data-idx', idx.toString());
      $loadButton.classList.add('icon');
      $iconColumn.appendChild($loadButton);

      // configurations outside the supported schema range cannot be loaded safely
      if (isConfigurationCompatible) {
        $loadButton.addEventListener('click', Management.#applyConfiguration);
      }
      else {
        $loadButton.addEventListener('click', () => {
          Management.#showDialogOverConfigurationList($incompatibleConfigurationDialog);
        });
      }

      const $loadIcon = document.createElement('img');
      const checkmarkIconWidth = 19;
      const warningIconSize = 18;

      $loadIcon.src = `/images/${isConfigurationCompatible ? 'checkmark' : 'warning'}.svg`;
      $loadIcon.width = isConfigurationCompatible ? checkmarkIconWidth : warningIconSize;
      $loadIcon.height = warningIconSize;
      $loadIcon.alt = '';
      $loadButton.appendChild($loadIcon);

      // export icon
      const exportConfigurationLabel = I18n.getMessage('configuration_action_export', [configuration.name]);
      const $exportButton = document.createElement('button');
      $exportButton.setAttribute('type', 'button');
      $exportButton.setAttribute('title', exportConfigurationLabel);
      $exportButton.setAttribute('aria-label', exportConfigurationLabel);
      $exportButton.setAttribute('data-idx', idx.toString());
      $exportButton.classList.add('icon');
      $exportButton.addEventListener('click', Management.#exportConfiguration);
      $iconColumn.appendChild($exportButton);

      const $exportIcon = document.createElement('img');
      $exportIcon.src = '/images/export.svg';
      $exportIcon.width = 20;
      $exportIcon.height = 18;
      $exportIcon.alt = '';
      $exportButton.appendChild($exportIcon);

      // rename icon
      const $renameButton = document.createElement('button');
      const renameConfigurationLabel = I18n.getMessage('configuration_action_rename', [configuration.name]);
      $renameButton.setAttribute('type', 'button');
      $renameButton.setAttribute('title', renameConfigurationLabel);
      $renameButton.setAttribute('aria-label', renameConfigurationLabel);
      $renameButton.setAttribute('data-idx', idx.toString());
      $renameButton.classList.add('icon');
      $renameButton.addEventListener('click', Management.#renameConfiguration);
      $iconColumn.appendChild($renameButton);

      const $renameIcon = document.createElement('img');
      $renameIcon.src = '/images/rename.svg';
      $renameIcon.width = 18;
      $renameIcon.height = 15;
      $renameIcon.alt = '';
      $renameButton.appendChild($renameIcon);

      // delete icon
      const $deleteButton = document.createElement('button');
      const deleteConfigurationLabel = I18n.getMessage('configuration_action_delete', [configuration.name]);
      $deleteButton.setAttribute('type', 'button');
      $deleteButton.setAttribute('title', deleteConfigurationLabel);
      $deleteButton.setAttribute('aria-label', deleteConfigurationLabel);
      $deleteButton.setAttribute('data-idx', idx.toString());
      $deleteButton.classList.add('icon', 'trash-icon');
      $deleteButton.addEventListener('click', Management.#deleteConfiguration);
      $iconColumn.appendChild($deleteButton);

      const $deleteIcon = document.createElement('img');
      $deleteIcon.src = '/images/trash.svg';
      $deleteIcon.width = 15;
      $deleteIcon.height = 17;
      $deleteIcon.alt = '';
      $deleteButton.appendChild($deleteIcon);
    }

    Management.#updateConfigurationRowIndices();
  }

  /**
   * Store the manually reordered configuration list.
   *
   * @param {HTMLElement[]} items - configuration rows in their new order
   *
   * @returns {Promise<void>}
   */
  static async #reorderConfigurations (items) {
    const order = items.map($row => Number($row.getAttribute('data-idx')));
    const { configurations } = await browser.storage.local.get({ configurations: [] });

    if (
      order.length !== configurations.length ||
      new Set(order).size !== configurations.length ||
      order.some(idx => !Number.isInteger(idx) || idx < 0 || idx >= configurations.length)
    ) {
      return;
    }

    await browser.storage.local.set({
      configurations: order.map(idx => configurations[idx])
    });

    Management.#updateConfigurationRowIndices();
  }

  /**
   * Update row and action indexes after configurations have been reordered.
   *
   * @returns {void}
   */
  static #updateConfigurationRowIndices () {
    const $rows = $configurationTable.querySelectorAll('.configuration-list-body .configuration-row');
    const disableReorder = $rows.length <= 1;

    $rows.forEach(($row, idx) => {
      $row.setAttribute('data-idx', idx.toString());

      $row.querySelectorAll('[data-idx]').forEach($action => {
        $action.setAttribute('data-idx', idx.toString());
      });

      Management.#updateConfigurationReorderButton(
        $row.querySelector('.configuration-sortable-handle'),
        idx,
        disableReorder
      );
    });
  }

  /**
   * Update the accessible label and state for a configuration reorder button.
   *
   * @param {?Element} $button - the reorder button
   * @param {number} idx - the current row index
   * @param {boolean} disabled - whether reordering is unavailable
   *
   * @returns {void}
   */
  static #updateConfigurationReorderButton ($button, idx, disabled) {
    if (!$button) {
      return;
    }

    const label = I18n.getMessage('array_sort_a11y_drag_handle_label', [(idx + 1).toString()]);

    $button.setAttribute('aria-label', label);

    if (disabled) {
      $button.setAttribute('aria-disabled', 'true');
      $button.setAttribute('tabindex', '-1');
      $button.removeAttribute('title');
      $button.classList.add('disabled');

      return;
    }

    $button.removeAttribute('aria-disabled');
    $button.removeAttribute('tabindex');
    $button.setAttribute('title', label);
    $button.classList.remove('disabled');
  }

  /**
   * Apply the selected configuration.
   *
   * @param {MouseEvent} e - the mouse event
   *
   * @returns {Promise<void>}
   */
  static async #applyConfiguration (e) {
    const idx = Number(e.currentTarget.getAttribute('data-idx'));
    const { configurations } = await browser.storage.local.get({ configurations: [] });

    Serializer.unserialize(configurations[idx].configuration);
    Management.#renderPolicyOutput();
    document.getElementById('action-buttons').classList.remove('hidden');
    await Management.#closeDialog($listConfigurationDialog);
    Management.#showStatusPopover(document.getElementById('load-configuration-popover'));
  }

  /**
   * Open the dialog for renaming a configuration.
   *
   * @param {MouseEvent} e - the mouse event
   *
   * @returns {Promise<void>}
   */
  static async #renameConfiguration (e) {
    const idx = Number(e.currentTarget.getAttribute('data-idx'));
    const { configurations } = await browser.storage.local.get({ configurations: [] });
    const configuration = configurations[idx];

    if (!configuration) {
      return;
    }

    const $name = $renameConfigurationDialog.querySelector('#rename-dialog-name');

    $renameConfigurationDialog.setAttribute('data-idx', idx.toString());
    $renameConfigurationDialog.setAttribute('data-original-name', configuration.name);
    $name.value = configuration.name;
    Management.#showDialogOverConfigurationList($renameConfigurationDialog);
    $name.focus();
    $name.select();
  }

  /**
   * Rename the selected configuration.
   *
   * @returns {Promise<void>}
   */
  static async #renameSelectedConfiguration () {
    const $name = $renameConfigurationDialog.querySelector('#rename-dialog-name');

    if (!$name.value || $name.value === ($renameConfigurationDialog.getAttribute('data-original-name') ?? '')) {
      return;
    }

    const { configurations } = await browser.storage.local.get({ configurations: [] });
    const idx = Number($renameConfigurationDialog.getAttribute('data-idx'));

    if (!configurations[idx]) {
      void Management.#closeDialog($renameConfigurationDialog);

      return;
    }

    configurations[idx].name = $name.value;
    await browser.storage.local.set({ configurations: configurations });
    await Management.#closeDialog($renameConfigurationDialog);
    Management.#showStatusPopover(document.getElementById('rename-configuration-popover'));
  }

  /**
   * Delete the selected configuration.
   *
   * @param {MouseEvent} e - the mouse event
   *
   * @returns {void}
   */
  static async #deleteConfiguration (e) {
    const idx = Number(e.currentTarget.getAttribute('data-idx'));
    const { configurations } = await browser.storage.local.get({ configurations: [] });
    const configuration = configurations[idx];

    $deleteConfigurationDialog.setAttribute('data-idx', idx.toString());
    Management.#setDeleteConfigurationDialogText(configuration.name);
    Management.#showDialogOverConfigurationList($deleteConfigurationDialog);
  }

  /**
   * Delete the selected configuration after the confirmation dialog has been accepted.
   *
   * @returns {Promise<void>}
   */
  static async #deleteConfirmedConfiguration () {
    const { configurations } = await browser.storage.local.get({ configurations: [] });
    const idx = Number($deleteConfigurationDialog.getAttribute('data-idx'));

    if (!configurations[idx]) {
      void Management.#closeDialog($deleteConfigurationDialog);

      return;
    }

    configurations.splice(idx, 1);
    await browser.storage.local.set({ configurations: configurations });
    await Management.#closeDialog($deleteConfigurationDialog);
    Management.#showStatusPopover(document.getElementById('delete-configuration-popover'));
  }

  /**
   * Exports a configuration.
   *
   * @param {MouseEvent} e - event
   *
   * @returns {Promise<void>}
   */
  static async #exportConfiguration (e) {
    const idx = Number(e.currentTarget.getAttribute('data-idx'));
    const granted = await browser.permissions.request(DOWNLOAD_PERMISSION);

    if (granted) {
      await Management.#exportConfigurationByIndex(idx);
    }
  }

  /**
   * Exports a configuration by its index.
   *
   * @param {number} idx - the configuration index
   *
   * @returns {Promise<void>}
   */
  static async #exportConfigurationByIndex (idx) {
    const { configurations } = await browser.storage.local.get({ configurations: [] });
    const configuration = configurations[idx];
    const bytes = new TextEncoder().encode(JSON.stringify(configuration));
    const bytesLength = bytes.length;
    let binary = '';

    // keep the intermediate string chunks small to avoid argument length limits
    for (let i = 0; i < bytesLength; i += BASE64_BINARY_CHUNK_SIZE) {
      binary += String.fromCharCode(...bytes.subarray(i, i + BASE64_BINARY_CHUNK_SIZE));
    }

    const serializedConfig = window.btoa(binary);
    const url = URL.createObjectURL(new Blob([serializedConfig]));

    try {
      await browser.downloads.download({
        saveAs: true,
        url: url,
        filename: 'policy-export-' + configuration.time.getTime() + '.policy'
      });
    }
    finally {
      URL.revokeObjectURL(url);
    }
  }

  /**
   * Set up the event listeners for the unified import dialog.
   *
   * @returns {void}
   */
  static #setupImportConfigurationDialog () {
    const importTypeConfiguration = 'configuration';
    const importTypePoliciesJson = 'policies-json';
    const $fileInput = $importConfigurationDialog.querySelector('#import-file-input');
    const $error = $importConfigurationDialog.querySelector('#import-configuration-error');
    const $submitButton = $importConfigurationDialog.querySelector('#button-import-config-ok');
    const $closeButton = $importConfigurationDialog.querySelector('#button-import-config-cancel');

    const updateFileDescription = () => {
      const descriptions = ['import-file-help'];

      if (!$error.classList.contains('hidden')) {
        descriptions.push('import-configuration-error');
      }

      $fileInput.setAttribute('aria-describedby', descriptions.join(' '));
    };

    const hideImportError = () => {
      $error.classList.add('hidden');
      $fileInput.removeAttribute('aria-invalid');
      updateFileDescription();
    };

    const showImportError = () => {
      $error.classList.remove('hidden');
      $fileInput.setAttribute('aria-invalid', 'true');
      $fileInput.focus();
      updateFileDescription();
    };

    const resetImportType = () => {
      $importConfigurationDialog.removeAttribute('data-import-type');
    };

    const updateSubmitButton = () => {
      if ($importConfigurationDialog.hasAttribute('data-import-type') && $fileInput.files[0]) {
        $submitButton.removeAttribute('disabled');
      }
      else {
        $submitButton.setAttribute('disabled', 'disabled');
      }
    };

    const setImportType = type => {
      $importConfigurationDialog.setAttribute('data-import-type', type);

      updateFileDescription();
      updateSubmitButton();
    };

    const detectImportType = async () => {
      const file = $fileInput.files[0];

      hideImportError();
      resetImportType();
      updateSubmitButton();

      if (!file) {
        return;
      }

      try {
        await Management.#readConfigurationFile($fileInput);
        setImportType(importTypeConfiguration);

        return;
      }
      catch {
        // keep trying the policies.json format
      }

      try {
        Management.#getPoliciesJsonPolicies(JSON.parse(await file.text()));
        setImportType(importTypePoliciesJson);
      }
      catch {
        showImportError();
      }
    };

    const importFile = async () => {
      const importType = $importConfigurationDialog.getAttribute('data-import-type');

      if (!importType || !$fileInput.value) {
        return;
      }

      hideImportError();
      $submitButton.setAttribute('disabled', 'disabled');

      try {
        if (importType === importTypeConfiguration) {
          const configurationWasImported = await Management.#importConfiguration($fileInput);

          if (!configurationWasImported) {
            await Management.#closeDialog($importConfigurationDialog);
            Management.#showIncompatibleConfigurationAfterImport();

            return;
          }

          await Management.#closeDialog($importConfigurationDialog);
          $listConfigurationDialog.showModal();
          await Management.#listConfigurations();
          Management.#showStatusPopover(document.getElementById('import-configuration-popover'));

          return;
        }

        const report = await Management.#importPoliciesJson($fileInput.files[0]);

        if (report.partial.length > 0 || report.skipped.length > 0) {
          await Management.#replaceImportDialogWithConfigurationList();
          Management.#showPoliciesJsonImportReport(report, true);

          return;
        }

        await Management.#closeDialog($importConfigurationDialog);
        $listConfigurationDialog.showModal();
        await Management.#listConfigurations();
        Management.#showStatusPopover(document.getElementById('import-configuration-popover'));
      }
      catch {
        showImportError();
        updateSubmitButton();
      }
    };

    $importConfigurationDialog.addEventListener('close', () => {
      $fileInput.value = '';
      $submitButton.setAttribute('disabled', 'disabled');
      resetImportType();
      hideImportError();
    });

    const handleFileSelection = () => {
      void detectImportType();
    };

    $fileInput.addEventListener('input', handleFileSelection);
    $fileInput.addEventListener('change', handleFileSelection);

    $closeButton.addEventListener('click', () => {
      void Management.#closeDialog($importConfigurationDialog);
    });

    window.addEventListener('keydown', e => {
      if ($importConfigurationDialog.open && e.key === 'Enter') {
        e.preventDefault();

        void importFile();
      }
    });

    $submitButton.addEventListener('click', () => {
      void importFile();
    });
  }

  /**
   * Set up the event listeners for the "policies.json import report" dialog.
   *
   * @returns {void}
   */
  static #setupImportPoliciesJsonReportDialog () {
    $importPoliciesJsonReportDialog
      .querySelector('#button-import-policies-json-report-close')
      .addEventListener('click', () => {
        void Management.#closeDialog($importPoliciesJsonReportDialog);
      });

    $importPoliciesJsonReportDialog.addEventListener('close', () => {
      Management.#restoreConfigurationListDialog($importPoliciesJsonReportDialog);
    });
  }

  /**
   * Replace the import dialog with the configuration list while keeping the backdrop stable.
   *
   * @returns {Promise<void>}
   */
  static async #replaceImportDialogWithConfigurationList () {
    $importConfigurationDialog.classList.add('covered-by-subdialog');
    $importConfigurationDialog.inert = true;
    $listConfigurationDialog.classList.add('covered-by-subdialog');
    $listConfigurationDialog.setAttribute('data-stable-backdrop', '');
    $listConfigurationDialog.showModal();
    $listConfigurationDialog.inert = true;
    await Management.#listConfigurations();
    $importConfigurationDialog.close();
    $importConfigurationDialog.inert = false;
    $importConfigurationDialog.classList.remove('covered-by-subdialog');
    $listConfigurationDialog.removeAttribute('data-stable-backdrop');
  }

  /**
   * Import an exported EPG configuration file.
   *
   * @param {HTMLInputElement} $localFile - the DOM element of the configuration file input
   *
   * @returns {Promise<boolean>} true if the configuration was imported, otherwise false
   */
  static async #importConfiguration ($localFile) {
    const data = await Management.#readConfigurationFile($localFile);

    // configurations outside the supported schema range cannot be migrated safely
    if (!Management.#isSupportedConfigurationSchema(data.schema)) {
      return false;
    }

    const { configurations } = await browser.storage.local.get({ configurations: [] });

    const configuration = {
      schema: data.schema,
      version: data.version,
      product: data.product,
      name: data.name ?? $localFile.files[0].name.replace(/\.policy$/i, ''),
      time: new Date(),
      configuration: data.configuration
    };

    // migrate old configuration files before adding them to the current storage
    Migrator.migrateConfiguration(configuration);
    configurations.push(configuration);
    await browser.storage.local.set({ configurations: configurations, schema: SCHEMA_VERSION_CURRENT });

    return true;
  }

  /**
   * Import a policies.json file as a saved configuration.
   *
   * @param {File} file - selected policies.json file
   *
   * @returns {Promise<object>} detailed import report
   */
  static async #importPoliciesJson (file) {
    const data = JSON.parse(await file.text());
    const sourcePolicies = Management.#getPoliciesJsonPolicies(data);
    const currentConfiguration = Serializer.serialize();
    let generatedPolicies = {};
    let importedConfiguration = {};

    try {
      Serializer.unserializePoliciesJson(sourcePolicies);
      generatedPolicies = JSON.parse(Output.generatePoliciesOutput()).policies;
      importedConfiguration = Serializer.serialize();
    }
    finally {
      Serializer.unserialize(currentConfiguration);
    }

    const { configurations } = await browser.storage.local.get({ configurations: [] });

    configurations.push({
      schema: SCHEMA_VERSION_CURRENT,
      version: Migrator.storageVersion,
      product: 'firefox',
      name: file.name.replace(/\.json$/i, ''),
      time: new Date(),
      configuration: importedConfiguration
    });
    await browser.storage.local.set({ configurations: configurations, schema: SCHEMA_VERSION_CURRENT });

    return Management.#createPoliciesJsonImportReport(sourcePolicies, generatedPolicies);
  }

  /**
   * Extract the top-level policies object from a parsed policies.json file.
   *
   * @param {object} data - parsed policies.json data
   *
   * @returns {object} top-level policies object
   * @throws {Error} if no policies object exists
   */
  static #getPoliciesJsonPolicies (data) {
    const policies = data?.policies ?? data;

    if (!policies || typeof policies !== 'object' || Array.isArray(policies)) {
      throw new Error();
    }

    return policies;
  }

  /**
   * Create a detailed import report by comparing source and generated policies.
   *
   * @param {object} sourcePolicies - policies from the selected policies.json file
   * @param {object} generatedPolicies - policies generated after applying the import
   *
   * @returns {object} import report
   */
  static #createPoliciesJsonImportReport (sourcePolicies, generatedPolicies) {
    const report = {
      imported: [],
      partial: [],
      skipped: [],
      total: Object.keys(sourcePolicies).length
    };

    for (const [name, sourceValue] of Object.entries(sourcePolicies)) {
      if (!document.querySelector(`.policy-container[data-name="${CSS.escape(name)}"]`)) {
        report.skipped.push({
          name: name,
          reason: I18n.getMessage('configuration_import_policies_json_report_reason_unknown_policy')
        });
      }
      else if (!Object.hasOwn(generatedPolicies, name)) {
        report.skipped.push({
          name: name,
          reason: I18n.getMessage('configuration_import_policies_json_report_reason_unsupported_value')
        });
      }
      else if (Management.#valuesAreEqual(sourceValue, generatedPolicies[name])) {
        report.imported.push(name);
      }
      else {
        report.partial.push({
          name: name,
          source: sourceValue,
          result: generatedPolicies[name]
        });
      }
    }

    return report;
  }

  /**
   * Show the detailed policies.json import report.
   *
   * @param {object} report - import report
   * @param {boolean} skipListRefresh - whether the configuration list has already been refreshed
   *
   * @returns {void}
   */
  static #showPoliciesJsonImportReport (report, skipListRefresh = false) {
    document.getElementById('import-policies-json-report-summary').textContent = I18n.getMessage(
      'configuration_import_policies_json_report_summary',
      [
        report.imported.length.toString(),
        report.total.toString(),
        report.partial.length.toString(),
        report.skipped.length.toString()
      ]
    );

    const $details = document.getElementById('import-policies-json-report-details');
    $details.replaceChildren();

    Management.#addPoliciesJsonImportReportSection(
      $details, 'configuration_import_policies_json_report_imported', report.imported, Management.#createReportNameEntry
    );
    Management.#addPoliciesJsonImportReportSection(
      $details, 'configuration_import_policies_json_report_partial', report.partial, Management.#createReportPartialEntry
    );
    Management.#addPoliciesJsonImportReportSection(
      $details, 'configuration_import_policies_json_report_skipped', report.skipped, Management.#createReportSkippedEntry
    );

    if ($listConfigurationDialog.open) {
      if (skipListRefresh) {
        $importPoliciesJsonReportDialog.setAttribute('data-skip-list-refresh', '');
      }

      Management.#showDialogOverConfigurationList($importPoliciesJsonReportDialog);
    }
    else {
      $importPoliciesJsonReportDialog.showModal();
    }
  }

  /**
   * Add a section to the policies.json import report.
   *
   * @param {HTMLElement} $container - report container
   * @param {string} headline - headline message key
   * @param {Array<*>} items - section items
   * @param {Function} createEntry - callback for creating an entry
   *
   * @returns {void}
   */
  static #addPoliciesJsonImportReportSection ($container, headline, items, createEntry) {
    const $section = document.createElement('section');
    const $headline = document.createElement('h3');
    const $list = document.createElement('ul');

    $section.classList.add('import-report-section');
    $headline.textContent = `${I18n.getMessage(headline)} (${items.length})`;
    $list.classList.add('import-report-list');

    if (items.length > 0) {
      for (const item of items) {
        $list.appendChild(createEntry(item));
      }
    }
    else {
      const $entry = document.createElement('li');
      $entry.classList.add('import-report-empty');
      $entry.textContent = I18n.getMessage('configuration_import_policies_json_report_empty_section');
      $list.appendChild($entry);
    }

    $section.appendChild($headline);
    $section.appendChild($list);
    $container.appendChild($section);
  }

  /**
   * Create a report entry that only contains a policy name.
   *
   * @param {string} name - policy name
   *
   * @returns {HTMLLIElement} report entry
   */
  static #createReportNameEntry (name) {
    const $entry = document.createElement('li');
    $entry.classList.add('import-report-name-entry');
    $entry.textContent = name;

    return $entry;
  }

  /**
   * Create a report entry for a partially imported policy.
   *
   * @param {object} item - report item
   *
   * @returns {HTMLLIElement} report entry
   */
  static #createReportPartialEntry (item) {
    const $entry = document.createElement('li');
    const $details = document.createElement('details');
    const $summary = document.createElement('summary');

    $details.classList.add('import-report-entry');
    $summary.textContent = item.name;
    $details.appendChild($summary);
    $details.appendChild(Management.#createReportCodeBlock(
      I18n.getMessage('configuration_import_policies_json_report_source'), item.source
    ));
    $details.appendChild(Management.#createReportCodeBlock(
      I18n.getMessage('configuration_import_policies_json_report_result'), item.result
    ));
    $entry.appendChild($details);

    return $entry;
  }

  /**
   * Create a report entry for a skipped policy.
   *
   * @param {object} item - report item
   *
   * @returns {HTMLLIElement} report entry
   */
  static #createReportSkippedEntry (item) {
    const $entry = document.createElement('li');
    const $name = document.createElement('strong');
    const $reason = document.createElement('span');

    $entry.classList.add('import-report-skipped-entry');
    $name.textContent = item.name;
    $reason.classList.add('import-report-reason');
    $reason.textContent = item.reason;
    $entry.appendChild($name);
    $entry.appendChild($reason);

    return $entry;
  }

  /**
   * Create a labeled JSON code block for the import report.
   *
   * @param {string} label - block label
   * @param {any} value - value to render as JSON
   *
   * @returns {HTMLDivElement} report code block
   */
  static #createReportCodeBlock (label, value) {
    const $wrapper = document.createElement('div');
    const $label = document.createElement('div');
    const $code = document.createElement('pre');

    $wrapper.classList.add('import-report-code-wrapper');
    $label.classList.add('import-report-code-label');
    $label.textContent = label;
    $code.classList.add('import-report-code');
    $code.textContent = JSON.stringify(value, null, 2);
    $wrapper.appendChild($label);
    $wrapper.appendChild($code);

    return $wrapper;
  }

  /**
   * Compare two values independent from object key order.
   *
   * @param {any} source - source value
   * @param {any} result - generated value
   *
   * @returns {boolean} whether the values are equal
   */
  static #valuesAreEqual (source, result) {
    return JSON.stringify(Management.#normalizeForComparison(source)) ===
      JSON.stringify(Management.#normalizeForComparison(result));
  }

  /**
   * Normalize object keys before values are compared.
   *
   * @param {any} value - value to normalize
   *
   * @returns {any} normalized value
   */
  static #normalizeForComparison (value) {
    if (Array.isArray(value)) {
      return value.map(item => Management.#normalizeForComparison(item));
    }

    if (value && typeof value === 'object') {
      return Object.fromEntries(
        Object.keys(value).sort().map(key => [key, Management.#normalizeForComparison(value[key])])
      );
    }

    return value;
  }

  /**
   * Check whether a configuration schema can be loaded or migrated by this version.
   *
   * @param {number} schema - the configuration schema version
   *
   * @returns {boolean} whether the schema version is supported
   */
  static #isSupportedConfigurationSchema (schema) {
    return Number.isInteger(schema) &&
      schema >= SCHEMA_VERSION_MIN_SUPPORTED &&
      schema <= SCHEMA_VERSION_CURRENT;
  }

  /**
   * Read and decode a configuration file.
   *
   * @param {HTMLInputElement} $localFile - the DOM element of the configuration file input
   *
   * @returns {Promise<object>} the decoded configuration data
   * @throws {Error} if the file cannot be read or decoded
   * @rejects {Error} if the file cannot be read or decoded
   */
  static async #readConfigurationFile ($localFile) {
    const file = $localFile.files[0];

    if (!file) {
      throw new Error();
    }

    const content = await file.text();

    try {
      const binary = window.atob(content);
      const bytes = Uint8Array.from(binary, character => character.charCodeAt(0));
      let decoded = null;

      try {
        decoded = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
      }
      catch {
        decoded = binary;
      }

      return JSON.parse(decoded);
    }
    catch {
      throw new Error();
    }
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
      Management.#restoreConfigurationListDialog($incompatibleConfigurationDialog);

      if (Management.previousDialog) {
        Management.previousDialog.showModal();
        Management.previousDialog = null;
      }
    });

    // close the dialog by clicking the cancel button
    $closeButton.addEventListener('click', () => {
      void Management.#closeDialog($incompatibleConfigurationDialog);
    });
  }
}

Management.init();
