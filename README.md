# Firefox Add-on: Enterprise Policy Generator

<img src="src/images/logo-large.webp" alt="Logo" width="305" border="0" />

## Support the development

**Please consider making [a donation](https://www.paypal.com/paypalme/agenedia/) to support the further development of
Enterprise Policy Generator. Thank you very much!**

## Description

Generates enterprise policies for Firefox.

With Firefox 60, Mozilla introduced enterprise policies. One way to configure Firefox using enterprise policies is
through a file named policies.json. The advantage of this file over Group Policy Objects (GPO) is that this method works
across Windows, macOS, and Linux.

While this extension is not directly related to CCK2 Wizard, it shares the same idea for enterprise policies in
Firefox 60 and later. The Enterprise Policy Generator helps you create the configuration file, without studying all
documentation and options in depth.

**Enterprise Policy Generator is a WebExtension and compatible with Firefox 60 and later. The latest release requires
Firefox 140 or later.**

### Features

- Configure Firefox enterprise policies via an intuitive user interface
- Import existing `policies.json` files and continue editing supported policies in Enterprise Policy Generator, with an
  import report when a file cannot be fully converted
- View generated output with syntax highlighting or fullscreen mode, download it as `policies.json`, or copy it to the
  clipboard
- Save, load, rename, delete, reorder, export, and import generator configurations
- Get clear confirmation feedback after common actions such as copying, saving, loading, importing, or deleting
- Search policy names, options, and descriptions, with matching results highlighted
- Validate fields that require specific values, including URLs, required values
- Use drag and drop for fields and saved configurations that support reordering
- Get version notices, additional information, links, and security warnings where appropriate
- Use keyboard shortcuts and accessible controls throughout the interface
- Use controls for number fields to increase or decrease values without typing

### Keyboard shortcuts

The interface can be accessed via the toolbar button or the keyboard. Use <kbd>Shift</kbd> + <kbd>F10</kbd> to open the
interface. You can also open the interface via a menu entry in the "Tools" menu.

You can use <kbd>Shift</kbd> + <kbd>F</kbd> to focus the filter field, and <kbd>Shift</kbd> + <kbd>G</kbd> to focus the
button to generate the policies.

Fields that allow multiple values can be moved using the keyboard: Press <kbd>Space</kbd> to pick up an item. Use
<kbd>Arrow Up</kbd> and <kbd>Arrow Down</kbd> to move it. Press <kbd>Space</kbd> or <kbd>Enter</kbd> to drop. Press
<kbd>Escape</kbd> to cancel.

### Languages

The add-on is currently available in the following languages:

- English
- German
- French (Thanks, Rom and Toinane!)
- Simplified Chinese (Thanks, fang5566 and yfdyh000!)
- Russian (Thanks, wvxwxvw and solokot!)
- Upper Sorbian (Thanks, milupo!)
- Lower Sorbian (Thanks, milupo!)

### Roadmap

You can view the roadmap and request new features in the
[issues tracker](https://github.com/cadeyrn/enterprise-policy-generator/issues).

### Contributing

Contributions are welcome. If you want to add or change Firefox policies, see the
[policy documentation](docs/README.md) for details about the structure of `src/policies/firefox.json`, supported schema
types, validations, localization, and tests.

### Permissions

Enterprise Policy Generator requires several permissions to work properly.

#### Mandatory Permissions

No special permissions are required to install and use Enterprise Policy Generator!

#### Optional Permissions

This permission is not required to install and use Enterprise Policy Generator, but Enterprise Policy Generator will
ask you at runtime when the following permission is required:

##### download files and read and modify the browser's download history

This permission is required to provide the option to download the generated “policies.json” file or to export
configurations.

#### Silent Permissions

Enterprise Policy Generator requires additional permissions, but Firefox does not prompt for the following permissions:

##### menus

The menus permission is required to provide a menu entry in the "Tools" menu to access Enterprise Policy Generator's user
interface.

##### storage
_(since 2.0.0)_

The storage permission is required so that you can save and load configurations.

## Download

[Download Enterprise Policy Generator](https://addons.mozilla.org/en-US/firefox/addon/enterprise-policy-generator/)

## Release Notes

[Release Notes](CHANGELOG.md "Release Notes")
