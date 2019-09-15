# Firefox Add-on: Enterprise Policy Generator (WebExtension)

## Release Notes

### (Work in Progress) Version 5.0.0

#### Enhancements

- deprecation of Firefox 60. Firefox Browser 68 or higher is required now. Also Enterprise Policy Generator no longer
  shows minimum required Firefox version for policies older than Firefox 68.0, fixes
  [#80](https://github.com/cadeyrn/enterprise-policy-generator/issues/80)
- enhanced URL validation method to optionally allow data:image URI for some policies, see
  [#96](https://github.com/cadeyrn/enterprise-policy-generator/issues/96)

#### Enterprise Policies

- policies to set the minimum required and the maximum supported TLS version are also available in Firefox ESR,
  see [#90](https://github.com/cadeyrn/enterprise-policy-generator/issues/90)
- policy to enable or disable captive portal support is also available in Firefox ESR, see
  [#90](https://github.com/cadeyrn/enterprise-policy-generator/issues/90)
- policy to enable or disable network prediction (DNS prefetching) is also available in Firefox ESR, see
  [#90](https://github.com/cadeyrn/enterprise-policy-generator/issues/90)
- policy to enable or disable automatic extension updates is also available in Firefox ESR, see
  [#90](https://github.com/cadeyrn/enterprise-policy-generator/issues/90)
- policy to add a custom support menu item to the help menu is also available in Firefox ESR, see
  [#90](https://github.com/cadeyrn/enterprise-policy-generator/issues/90)
- improved labels for Certificates/Add policy, fixes
  [#95](https://github.com/cadeyrn/enterprise-policy-generator/issues/95)

#### Dependencies

- updated eslint from version 5.15.3 to 6.4.0 and updated configuration
- updated eslint-plugin-compat from version 3.0.1 to 3.3.0
- updated eslint-plugin-promise from version 4.0.1 to 4.2.1
- updated gulp from version 4.0.0 to 4.0.2
- updated gulp-eslint from version 5.0.0 to 6.0.0
- updated gulp-stylelint from version 8.0.0 to 9.0.0
- updated htmllint from version 0.7.3 to 0.8.0
- updated jsdoc from version 3.5.5 to 3.6.3
- updated stylelint from version 9.10.1 to 10.1.0
- updated stylelint-csstree-validator from version 1.3.0 to 1.5.2
- updated stylelint-order from version 2.1.0 to 3.1.0
- updated web-ext from version 3.0.0 to 3.1.1

[All Changes](https://github.com/cadeyrn/enterprise-policy-generator/compare/v4.4.0...master)<br />

---

### [Version 4.4.0](https://github.com/cadeyrn/enterprise-policy-generator/releases/tag/v4.4.0) (2019-03-20)

#### Enterprise Policies

- new policy to enable or disable captive portal support (Firefox 67+), fixes
  [#69](https://github.com/cadeyrn/enterprise-policy-generator/issues/69)
- new policy to enable or disable network prediction (DNS prefetching) (Firefox 67+), fixes
  [#71](https://github.com/cadeyrn/enterprise-policy-generator/issues/71)
- new policy to enable or disable automatic extension updates (Firefox 67+), fixes
  [#73](https://github.com/cadeyrn/enterprise-policy-generator/issues/73)
- new policy to add a custom support menu item to the help menu (Firefox 67+), fixes
  [#74](https://github.com/cadeyrn/enterprise-policy-generator/issues/74)
- added support for POST method in SearchEngines policy (Firefox 67+), fixes
  [#76](https://github.com/cadeyrn/enterprise-policy-generator/issues/76)
- it's now possible to enable the default browser check on startup, not only to disable it (Firefox 66+,
  Firefox ESR 60.6+), fixes [#77](https://github.com/cadeyrn/enterprise-policy-generator/issues/77)
- changed description of DisableFirefoxStudies policy to reflect that the policy not only disables shield studies but
  also contextual feature recommendations, fixes [#75](https://github.com/cadeyrn/enterprise-policy-generator/issues/75)

#### Dependencies

- updated eslint from version 5.12.1 to 5.15.3
- updated eslint-plugin-compat from version 2.6.3 to 3.0.1
- updated stylelint-order from version 2.0.0 to 2.1.0
- updated web-ext from version 2.9.3 to 3.0.0

[All Changes](https://github.com/cadeyrn/enterprise-policy-generator/compare/v4.3.0...v4.4.0)<br />
[Download Signed WebExtension](https://addons.mozilla.org/en-US/firefox/addon/enterprise-policy-generator/versions/?page=1#version-4.4.0)

---

### [Version 4.3.0](https://github.com/cadeyrn/enterprise-policy-generator/releases/tag/v4.3.0) (2019-01-28)

#### Enhancements

- policies with select field can now have a different default value than the first one, fixes
  [#67](https://github.com/cadeyrn/enterprise-policy-generator/issues/67)
- added support for new "key-value-pairs" policy type, see
  [#48](https://github.com/cadeyrn/enterprise-policy-generator/issues/48)

#### Enterprise Policies

- new policies to set the minimum required and the maximum supported TLS version (Firefox 66+), fixes
  [#66](https://github.com/cadeyrn/enterprise-policy-generator/issues/66)
- new policy for adding PKCS #11 security modules (Firefox 64+, Firefox ESR 60.4+), fixes
  [#48](https://github.com/cadeyrn/enterprise-policy-generator/issues/48)

#### Dependencies

- updated eslint from version 5.10.0 to 5.12.1 and updated eslint configuration
- updated gulp from version 3.9.1 to 4.0.0
- updated htmllint from version 0.7.2 to 0.7.3 and added one new rule
- updated stylelint from version 9.9.0 to 9.10.1 and added one new rule
- updated web-ext from version 2.9.2 to 2.9.3

[All Changes](https://github.com/cadeyrn/enterprise-policy-generator/compare/v4.2.0...v4.3.0)<br />
[Download Signed WebExtension](https://addons.mozilla.org/en-US/firefox/addon/enterprise-policy-generator/versions/?page=1#version-4.3.0)

---

### [Version 4.2.0](https://github.com/cadeyrn/enterprise-policy-generator/releases/tag/v4.2.0) (2018-12-10)

#### Enhancements

- added a note that starting with Firefox 63 there is an overview of all active policies and errors in the file
  “policies.json” at about:policies, fixes [#38](https://github.com/cadeyrn/enterprise-policy-generator/issues/38)

#### Enterprise Policies

- new policy to change the interface language of Firefox (Firefox 64+, Firefox ESR 60.3.1+), fixes
  [#52](https://github.com/cadeyrn/enterprise-policy-generator/issues/52)
- new option to start Firefox with an empty page or the previous session as part of the homepage policy
  (Firefox 64+, Firefox ESR 60.3.1+), fixes [#54](https://github.com/cadeyrn/enterprise-policy-generator/issues/54)
- new option to import certificates as part of the certificates policy
  (Firefox 64+, Firefox ESR 60.3.1+), fixes [#60](https://github.com/cadeyrn/enterprise-policy-generator/issues/60)

#### Dependencies

- updated eslint from version 5.9.0 to 5.10.0
- updated npm-run-all from version 4.1.3 to 4.1.5
- updated stylelint from version 9.8.0 to 9.9.0
- updated stylelint-order from version 1.0.0 to 2.0.0

[All Changes](https://github.com/cadeyrn/enterprise-policy-generator/compare/v4.1.1...4.2.0)<br />
[Download Signed WebExtension](https://addons.mozilla.org/en-US/firefox/addon/enterprise-policy-generator/versions/?page=1#version-4.2.0)

---

### [Version 4.1.1](https://github.com/cadeyrn/enterprise-policy-generator/releases/tag/v4.1.1) (2018-11-18)
  
#### Bugfixes

- fixed a bug that caused saved configurations not to load under certain circumstances, fixes
  [#63](https://github.com/cadeyrn/enterprise-policy-generator/issues/63)
  
#### Translations

- fixed typo in English translation (Thanks, a1346054!), fixes [#62](https://github.com/cadeyrn/enterprise-policy-generator/pull/62)

#### Dependencies

- updated eslint from version 5.8.0 to 5.9.0
- updated stylelint from version 9.7.1 to 9.8.0
- updated web-ext from version 2.9.1 to 2.9.2

[All Changes](https://github.com/cadeyrn/enterprise-policy-generator/compare/v4.1.0...v4.1.1)<br />
[Download Signed WebExtension](https://addons.mozilla.org/en-US/firefox/addon/enterprise-policy-generator/versions/?page=1#version-4.1.1)

---

### [Version 4.1.0](https://github.com/cadeyrn/enterprise-policy-generator/releases/tag/v4.1.0) (2018-11-04)

#### Enhancements

- added support for additional policy notes, for example if a policy is not supported on all operating systems, fixes
  [#57](https://github.com/cadeyrn/enterprise-policy-generator/issues/57)
  
#### Bugfixes

- fixed a bug which caused that the order of bookmarks was wrong when loading a saved configuration, fixes
  [#47](https://github.com/cadeyrn/enterprise-policy-generator/issues/47)
  
#### Enterprise Policies

- new policy to configure DNS over HTTPS (Firefox 63+), fixes
  [#53](https://github.com/cadeyrn/enterprise-policy-generator/issues/53)
- added a note that the policy to hide the menu bar is Windows / Linux only, fixes
  [#56](https://github.com/cadeyrn/enterprise-policy-generator/issues/56)
- added a note that the policy to read certificates from the system certificate store also works on macOS starting
  with Firefox 63, fixes [#39](https://github.com/cadeyrn/enterprise-policy-generator/issues/39)
- added a note that the option not to read certificates from the system certificate store only works on Firefox 64
  and higher, fixes [#46](https://github.com/cadeyrn/enterprise-policy-generator/issues/46)
- removed the policy to disable the safe mode because it's not supported via policies.json, only via GPO, fixes
  [#58](https://github.com/cadeyrn/enterprise-policy-generator/issues/58)

#### Dependencies

- updated eslint from version 5.5.0 to 5.8.0
- updated eslint-plugin-compat from version 2.5.1 to 2.6.3
- updated eslint-plugin-promise from version 4.0.0 to 4.0.1
- updated gulp-stylelint from version 7.0.0 to 8.0.0
- updated stylelint from version 9.5.0 to 9.7.1

[All Changes](https://github.com/cadeyrn/enterprise-policy-generator/compare/v4.0.0...v4.1.0)<br />
[Download Signed WebExtension](https://addons.mozilla.org/en-US/firefox/addon/enterprise-policy-generator/versions/?page=1#version-4.1.0)

---

### [Version 4.0.0](https://github.com/cadeyrn/enterprise-policy-generator/releases/tag/v4.0.0) (2018-09-01)

#### Enhancements

- **a filter field has been added. Both the descriptions of the policies and the internal policy names can be
  searched**, fixes [#14](https://github.com/cadeyrn/enterprise-policy-generator/issues/14)

#### Enterprise Policies

- new option to reject trackers for cookies policy (Firefox 63+), fixes
  [#40](https://github.com/cadeyrn/enterprise-policy-generator/issues/40)
- policy to disable telemetry is also available from Firefox 62, see
  [#36](https://github.com/cadeyrn/enterprise-policy-generator/issues/36)
- policy to set or lock the homepage is also available from Firefox 62, see
  [#36](https://github.com/cadeyrn/enterprise-policy-generator/issues/36)
- policy to set the default location of the search bar is also available from Firefox 62, see
  [#36](https://github.com/cadeyrn/enterprise-policy-generator/issues/36)
- policy to install, uninstall or lock extensions is also available from Firefox 62, see
  [#36](https://github.com/cadeyrn/enterprise-policy-generator/issues/36)
- policy to block websites from being visited is also available from Firefox 62, see
  [#36](https://github.com/cadeyrn/enterprise-policy-generator/issues/36)
- policy to configure integrated authentication is also available from Firefox 62, see
  [#36](https://github.com/cadeyrn/enterprise-policy-generator/issues/36)
- policy to override the first run page is also available from Firefox 62, see
  [#36](https://github.com/cadeyrn/enterprise-policy-generator/issues/36)
- policy to override the post-update "What's New" page is also available from Firefox 62, see
  [#36](https://github.com/cadeyrn/enterprise-policy-generator/issues/36)
- policy to configure integrated authentication: "Always allow SPNEGO or NTLM on non FQDNs" is also available from Firefox 62 and
  Firefox ESR 60.2, see [#36](https://github.com/cadeyrn/enterprise-policy-generator/issues/36)
- policy to set a different server URL for Firefox updates is also available from Firefox 62 and Firefox ESR 60.2, see
  [#36](https://github.com/cadeyrn/enterprise-policy-generator/issues/36)
  
#### Translations

- updated Simplified Chinese translation (Thanks, fang5566!), fixes [#37](https://github.com/cadeyrn/enterprise-policy-generator/issues/37)

#### Dependencies

- updated eslint from version 5.3.0 to 5.5.0
- updated gulp-htmllint from version 0.0.15 to 0.0.16
- updated stylelint from version 9.4.0 to 9.5.0
- updated stylelint-order from version 0.8.1 to 1.0.0
- updated web-ext from version 2.8.0 to 2.9.1

[All Changes](https://github.com/cadeyrn/enterprise-policy-generator/compare/v3.1.1...v4.0.0)<br />
[Download Signed WebExtension](https://addons.mozilla.org/en-US/firefox/addon/enterprise-policy-generator/versions/?page=1#version-4.0.0)

---

### [Version 3.1.1](https://github.com/cadeyrn/enterprise-policy-generator/releases/tag/v3.1.1) (2018-08-08)

#### Translations

- updated Simplified Chinese translation (Thanks, yfdyh000!), fixes [#35](https://github.com/cadeyrn/enterprise-policy-generator/issues/35)
- fixed typo in English translation

[All Changes](https://github.com/cadeyrn/enterprise-policy-generator/compare/v3.1.0...v3.1.1)<br />
[Download Signed WebExtension](https://addons.mozilla.org/en-US/firefox/addon/enterprise-policy-generator/versions/?page=1#version-3.1.1)

---

### [Version 3.1.0](https://github.com/cadeyrn/enterprise-policy-generator/releases/tag/v3.1.0) (2018-08-05)

#### Enhancements

- small design improvements, fixes [#32](https://github.com/cadeyrn/enterprise-policy-generator/issues/32) and
  [#33](https://github.com/cadeyrn/enterprise-policy-generator/issues/33)

#### Translations

- added Simplified Chinese translation (Thanks, fang5566!), fixes [#31](https://github.com/cadeyrn/enterprise-policy-generator/issues/31)

#### Code Quality

- use flexbox for two column layout instead of floats, fixed by [#33](https://github.com/cadeyrn/enterprise-policy-generator/issues/33)
- use CSS variables for most colors, fixes [#34](https://github.com/cadeyrn/enterprise-policy-generator/issues/34)

#### Dependencies

- updated eslint from version 5.2.0 to 5.3.0
- updated stylelint from version 9.3.0 to 9.4.0
- updated web-ext from version 2.7.0 to 2.8.0

[All Changes](https://github.com/cadeyrn/enterprise-policy-generator/compare/v3.0.0...v3.1.0)<br />
[Download Signed WebExtension](https://addons.mozilla.org/en-US/firefox/addon/enterprise-policy-generator/versions/?page=1#version-3.1.0)

---

### [Version 3.0.0](https://github.com/cadeyrn/enterprise-policy-generator/releases/tag/v3.0.0) (2018-07-24)

#### Enhancements

- **configurations could already be saved and loaded at a later time since version 2.0.0. Now configurations can also be exported and
  re-imported on other devices**, fixes [#22](https://github.com/cadeyrn/enterprise-policy-generator/issues/22)
- **added a basic validation for fields where a valid URL is required**. Basic means simple protocol check (https:// or http://)
  because a full URL validation is a science, fixes [#11](https://github.com/cadeyrn/enterprise-policy-generator/issues/11)
- show a notice in the list configurations dialog if no configurations have been saved yet, fixes
  [#24](https://github.com/cadeyrn/enterprise-policy-generator/issues/24)
- set focus to first input or select field when checking a policy checkbox or when adding a new array field, set focus to previous
  field when removing an array field, fixes [#13](https://github.com/cadeyrn/enterprise-policy-generator/issues/13)

#### Enterprise Policies

- new policy to configure permissions for location, camera, microphone and notifications (Firefox 62+, Firefox ESR 60.2+), fixes
  [#18](https://github.com/cadeyrn/enterprise-policy-generator/issues/18)
- new policy to set a different server URL for Firefox updates (Firefox 63+), fixes
  [#29](https://github.com/cadeyrn/enterprise-policy-generator/issues/29)
- new option for policy to configure integrated authentication: always allow SPNEGO or NTLM on non fully qualified domain names
  (Firefox 63+), fixes [#23](https://github.com/cadeyrn/enterprise-policy-generator/issues/23)
- policy to disable Firefox updates is no longer ESR only and is also available from Firefox 62, see
  [#25](https://github.com/cadeyrn/enterprise-policy-generator/issues/25)
- policy to disable system add-on updates is no longer ESR only and is also available from Firefox 62, see
  [#25](https://github.com/cadeyrn/enterprise-policy-generator/issues/25)
- policy to disable telemetry is no longer ESR only and is also available from Firefox 63, see
  [#25](https://github.com/cadeyrn/enterprise-policy-generator/issues/25)
- policy to set or lock the homepage is no longer ESR only and is also available from Firefox 63, see
  [#25](https://github.com/cadeyrn/enterprise-policy-generator/issues/25)
- policy to set the default location of the search bar is no longer ESR only and is also available from Firefox 63, see
  [#25](https://github.com/cadeyrn/enterprise-policy-generator/issues/25)
- policy to install, uninstall or lock extensions is no longer ESR only and is also available from Firefox 63, see
  [#25](https://github.com/cadeyrn/enterprise-policy-generator/issues/25)
- policy to block websites from being visited is no longer ESR only and is also available from Firefox 63, see
  [#25](https://github.com/cadeyrn/enterprise-policy-generator/issues/25)
- policy to configure integrated authentication is no longer ESR only and is also available from Firefox 63, see
  [#25](https://github.com/cadeyrn/enterprise-policy-generator/issues/25)
- policy to override the first run page is no longer ESR only and is also available from Firefox 63, see
  [#25](https://github.com/cadeyrn/enterprise-policy-generator/issues/25)
- policy to override the post-update "What's New" page is no longer ESR only and is also available from Firefox 63, see
  [#25](https://github.com/cadeyrn/enterprise-policy-generator/issues/25)
- policy to disable hardware acceleration is also available from Firefox ESR 60.2, see
  [#25](https://github.com/cadeyrn/enterprise-policy-generator/issues/25)
- option to remove search engines in search engines policy is also available from Firefox ESR 60.2, see
  [#25](https://github.com/cadeyrn/enterprise-policy-generator/issues/25)

#### Translations

- updated French translation (Thanks, Rom!)

#### Dependencies

- migrated from gulp-html-lint 0.0.2 to gulp-htmllint 0.0.15 because gulp-html-lint is no longer maintained
- updated eslint from version 5.0.0 to 5.2.0
- updated eslint-plugin-compat from version 2.4.0 to 2.5.1
- updated gulp-eslint from version 4.0.2 to 5.0.0

[All Changes](https://github.com/cadeyrn/enterprise-policy-generator/compare/v2.0.0...v3.0.0)<br />
[Download Signed WebExtension](https://addons.mozilla.org/en-US/firefox/addon/enterprise-policy-generator/versions/?page=1#version-3.0.0)

---

### [Version 2.0.0](https://github.com/cadeyrn/enterprise-policy-generator/releases/tag/v2.0.0) (2018-06-24)

#### Enhancements

- **now with configuration management!** You can save any number of different configurations, load them at a later time (and of course
  delete them), fixes [#3](https://github.com/cadeyrn/enterprise-policy-generator/issues/3)
- **shows minimum required Firefox version!** If a policy requires a newer version than Firefox 60.0 or Firefox ESR 60.0 a notice is
  displayed, fixes [#4](https://github.com/cadeyrn/enterprise-policy-generator/issues/4)
- some design improvements

#### Enterprise Policies

- new policy to disable hardware acceleration (Firefox 62+), fixes [#9](https://github.com/cadeyrn/enterprise-policy-generator/issues/9)
- added option to remove search engines to search engines policy (Firefox 62+), fixes
  [#19](https://github.com/cadeyrn/enterprise-policy-generator/issues/19)

#### Translations

- added French translation (Thanks, Rom!)

#### Dependencies

- updated eslint from version 4.19.1 to 5.0.0
- updated eslint-plugin-compat from version 2.3.0 to 2.4.0
- updated stylelint from version 9.2.1 to 9.3.0
- updated stylelint-csstree-validator from version 9.2.1 to 9.3.0

[All Changes](https://github.com/cadeyrn/enterprise-policy-generator/compare/v1.1.0...v2.0.0)<br />
[Download Signed WebExtension](https://addons.mozilla.org/en-US/firefox/addon/enterprise-policy-generator/versions/?page=1#version-2.0.0)

---

### [Version 1.1.0](https://github.com/cadeyrn/enterprise-policy-generator/releases/tag/v1.1.0) (2018-05-27)

#### Enhancements

- **the downloads permission is no longer mandatory!** This means that the extension can now be used completely
  without any special permission. If you want to download the “policies.json” file, you can easily grant the
  permission at runtime, fixes [#5](https://github.com/cadeyrn/enterprise-policy-generator/issues/5)

#### Translations

- added Upper Sorbian translation (Thanks, milupo!)
- added Lower Sorbian translation (Thanks, milupo!)

#### Code Quality

- a lot of code refactoring to improve code maintainability and to make it easier for others to contribute to the
  code base, fixes [#8](https://github.com/cadeyrn/enterprise-policy-generator/issues/8)

#### Dependencies

- updated eslint-plugin-compat from version 2.2.0 to 2.3.0
- updated eslint-plugin-no-unsanitized from version 3.0.1 to 3.0.2
- updated web-ext from version 2.6.0 to 2.7.0

[All Changes](https://github.com/cadeyrn/enterprise-policy-generator/compare/v1.0.1...v1.1.0)<br />
[Download Signed WebExtension](https://addons.mozilla.org/en-US/firefox/addon/enterprise-policy-generator/versions/?page=1#version-1.1.0)

---

### [Version 1.0.1](https://github.com/cadeyrn/enterprise-policy-generator/releases/tag/v1.0.1) (2018-05-20)

#### Translations

- fixed typo in English translation

[All Changes](https://github.com/cadeyrn/enterprise-policy-generator/compare/v1.0.0...v1.0.1)<br />
[Download Signed WebExtension](https://addons.mozilla.org/en-US/firefox/addon/enterprise-policy-generator/versions/?page=1#version-1.0.1)

---

### [Version 1.0.0](https://github.com/cadeyrn/enterprise-policy-generator/releases/tag/v1.0.0) (2018-05-20)

- initial release for [addons.mozilla.org](https://addons.mozilla.org/en-US/firefox/addon/enterprise-policy-generator/)

#### Features of the first version

- simply click together the desired Enterprise Policies
- supports all policies which are supported by Firefox 60
- validation for mandatory fields
- special marking of policies that only work with Firefox ESR
- info links for some policies to get additional information

[Download Signed WebExtension](https://addons.mozilla.org/en-US/firefox/addon/enterprise-policy-generator/versions/?page=1#version-1.0.0)
