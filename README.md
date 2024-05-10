# Firefox Add-on: Enterprise Policy Generator

<img src="src/images/logo-large.png" alt="Logo" width="790" border="0" />

## Support the development

**Please consider making [a donation](https://www.paypal.com/paypalme/agenedia/) to support the further development of
Enterprise Policy Generator. Thank you very much!**

## Description

Generates Enterprise Policies for Firefox.

With Firefox 60 and Firefox ESR 60, Mozilla has introduced the so-called Enterprise Policy Engine. The Enterprise Policy
Engine allows administrators to configure Firefox via a configuration file. The advantage of this configuration file over
Group Policy Objects (GPO) is that this method does not only work on Windows, but cross-platform on Windows, Apple macOS
and Linux.

Although this extension is not directly related to the CCK2 Wizard, it shares the same idea as CCK2 Wizard, but it is for Firefox 60 or
higher and Enterprise Policies. The Enterprise Policy Generator helps to create the configuration file, so that no in-depth study
of the documentation and all possible options is necessary. Administrators can simply click together the desired Enterprise Policies.

**Enterprise Policy Generator is a WebExtension and compatible with Firefox 60 and higher (Firefox 115 or
higher is required for the latest version of Enterprise Policy Generator).**

### Features

- simply click together the desired Enterprise Policies
- supports all policies which are supported by Firefox 60 and newer
- validation for mandatory fields and URLs
- special marking of policies that only work with Firefox ESR
- info links for some policies to get additional information
- you can save any number of different configurations, load them at a later time (and of course delete them)
- you can also export configurations and import them on other devices
- if a policy requires a newer version than Firefox 60.0 or Firefox ESR 60.0 a notice is displayed
- a filter field allows to search in the descriptions of the policies and in the internal policy names

### Shortcuts

The interface can be accessed via the toolbar button or the keyboard. For this purpose the combination **Shift + F10** is
reserved. Or you can open the interface via a menu entry in the tools menu.

### Planned features

You can find the roadmap and request new features in the
[issues tracker](https://github.com/cadeyrn/enterprise-policy-generator/issues).

### Languages

The add-on is currently available in the following languages:

- English
- German
- French (Thanks, Rom and Toinane!)
- Simplified Chinese (Thanks, fang5566 and yfdyh000!)
- Russian (Thanks, wvxwxvw!)
- Upper Sorbian (Thanks, milupo!)
- Lower Sorbian (Thanks, milupo!)

### Permissions

Enterprise Policy Generator needs several permissions to work properly.

#### mandatory permissions

**No special permissions are needed to install and use Enterprise Policy Generator!**

#### optional permissions

This permission is not needed to install and use Enterprise Policy Generator but Enterprise Policy Generator will
ask you at runtime once the following permissions is needed:

##### download files and read and modify the browser's download history

This permission is needed for providing the option to download the generated “policies.json” file or to export
configurations.

#### silent permissions

Enterprise Policy Generator needs some more permissions, but Firefox does not prompt for the following permissions:

##### menus

The menus permission is needed for providing a menu entry in the tools menu to access Enterprise Policy Generator's user
interface.

##### storage
_(since 2.0.0)_

The storage permission is needed so that you can save and load configurations.

## Download

[Download Enterprise Policy Generator](https://addons.mozilla.org/en-US/firefox/addon/enterprise-policy-generator/)

## Release Notes

[Release Notes](CHANGELOG.md "Release Notes")
