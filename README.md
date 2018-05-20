# Firefox Add-on: Enterprise Policy Generator (WebExtension)

<img src="src/images/logo-large.png" alt="Logo" width="790" border="0" />

## Description

Generates Enterprise Policies for Firefox.

With Firefox 60 and Firefox ESR 60, Mozilla has introduced the so-called Enterprise Policy Engine. The Enterprise Policy
Engine allows administrators to configure Firefox via a configuration file. The advantage of this configuration file over
Group Policy Objects (GPO) is that this method does not only work on Windows, but cross-platform on Windows, Apple macOS
and Linux.

Although this extension is not directly related to the CCK2 Wizard, it can be seen as a kind of spiritual successor
of the CCK2 Wizard for Firefox Quantum. The Enterprise Policy Generator helps to create the configuration file,
so that no in-depth study of the documentation and all possible options is necessary. Administrators can simply click
together the desired Enterprise Policies.

**Enterprise Policy Generator is a WebExtension and compatible with Firefox Quantum (Firefox 60 and later).**

### Features

- simply click together the desired Enterprise Policies
- supports all policies which are supported by Firefox 60
- validation for mandatory fields
- special marking of policies that only work with Firefox ESR
- info links for some policies to get additional information

### Shortcuts

The interface can be accessed via the toolbar button or the keyboard. For this purpose the combination **Shift + F10** is
reserved. Or you can open the interface via a menu entry in the tools menu.

### Planned features

There are already some features planned for the future.

- store and load configurations
- show the minimum required Firefox version for each policy once more policies has been added in later versions of Firefox
- & more…

Please suggest your feature requests in the [issues tracker](https://github.com/cadeyrn/enterprise-policy-generator/issues).

### Languages

The add-on is currently available in the following languages:

- English
- German

### Permissions

Enterprise Policy Generator needs several permissions to work properly.

#### mandatory permissions

Enterprise Policy Generator does not work without the following permission:

##### download files and read and modify the browser's download history

This permission is needed for providing the option to download the generated “policies.json” file.

#### silent permissions

Enterprise Policy Generator needs one more permission, but Firefox does not prompt for the following permission:

##### menus

The menus permission is needed for providing a menu entry in the tools menu to access Enterprise Policy Generator's user
interface.

## Compatibility

Enterprise Policy Generator requires at least Firefox 60. Because the add-on is a tool for the new Enterprise Policy
Engine, there is no point in supporting older versions of Firefox.

## Download

[Download Enterprise Policy Generator](https://addons.mozilla.org/en-US/firefox/addon/enterprise-policy-generator/)

## Release Notes

[Release Notes](CHANGELOG.md "Release Notes")
