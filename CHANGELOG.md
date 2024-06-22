# Firefox Add-on: Enterprise Policy Generator (WebExtension)

## Release Notes

### (Work in Progress) Version 6.0.0

#### Enhancements

- Enterprise Policy Generator now uses Manifest v3, fixes
  [#188](https://github.com/cadeyrn/enterprise-policy-generator/issues/188)
- deprecation of old Firefox versions. Firefox 115 or higher is required now. Also, Enterprise Policy Generator no
  longer shows minimum required Firefox version for policies older than Firefox 115.0, see
  [#138](https://github.com/cadeyrn/enterprise-policy-generator/issues/138)
- for version compatibility notes the old Firefox shape was still used. Replaced the logo with the current one,
  see [#134](https://github.com/cadeyrn/enterprise-policy-generator/issues/134)
- implemented a schema migrator so that saved configurations can be migrated during extension updates or when old
  configurations get imported on newer versions of the extension, see
  [#143](https://github.com/cadeyrn/enterprise-policy-generator/issues/143)
- improved instruction for users of Apple macOS, see
  [#210](https://github.com/cadeyrn/enterprise-policy-generator/issues/210)
- disabled native CSS outlines for input fields because we have our own focus style, see
  [#159](https://github.com/cadeyrn/enterprise-policy-generator/issues/159)
  
#### Bugfixes

- fixed error messages in browser console, see [#141](https://github.com/cadeyrn/enterprise-policy-generator/issues/141)
  and [#169](https://github.com/cadeyrn/enterprise-policy-generator/issues/169)
- improved enum fields so that these no longer causes empty policy objects if no value is set, see
  [#146](https://github.com/cadeyrn/enterprise-policy-generator/issues/146)
- when adding configurations for more than one extension in the ExtensionSettings policy it was not possible to remove
  these fields again, see [#160](https://github.com/cadeyrn/enterprise-policy-generator/issues/160)
- the RequestedLocales policy allows an empty string to use the operating system's language. However, empty strings
  should not be allowed if more than one value is used. Also, it shouldn't be possible to add duplicate language codes,
  see [#161](https://github.com/cadeyrn/enterprise-policy-generator/issues/161)
- integer values were parsed as strings in preference policies, see
  [#171](https://github.com/cadeyrn/enterprise-policy-generator/issues/171)

#### Notable Changes and Code Quality

- optimized the file size of a few images, fixes
  [#222](https://github.com/cadeyrn/enterprise-policy-generator/issues/222)
- replaced the translation mechanism with the newest version to share more code with other extensions and improve the
  maintainability, fixes [#221](https://github.com/cadeyrn/enterprise-policy-generator/issues/221)
- changed copyright year from 2020 to 2024, fixes
  [#220](https://github.com/cadeyrn/enterprise-policy-generator/issues/220)
- several code quality and code style improvements
  
#### Enterprise Policies

- new policy to allow or prevent Firefox from messaging the user, see
  [#145](https://github.com/cadeyrn/enterprise-policy-generator/issues/145)
- new policy to enable or disable the picture in picture feature for videos, see
  [#151](https://github.com/cadeyrn/enterprise-policy-generator/issues/151)
- new policy to require or prevent using a primary password; the DisableMasterPasswordCreation policy was removed, the
  value of the DisableMasterPasswordCreation policy will automatically be migrated in saved configurations, see
  [#153](https://github.com/cadeyrn/enterprise-policy-generator/issues/153)
- new policies to either enable the legacy default behaviour for SameSite cookies or to enable the legacy behaviour
  for specific websites; both policies excludes each other, see
  [#154](https://github.com/cadeyrn/enterprise-policy-generator/issues/154)
- new policy to disable the default browser agent, see
  [#155](https://github.com/cadeyrn/enterprise-policy-generator/issues/155)
- new policy to disable or configure the built-in PDF viewer; the DisableBuiltinPDFViewer policy was removed, the value
  of the DisableBuiltinPDFViewer policy will automatically be migrated in saved configurations, see
  [#156](https://github.com/cadeyrn/enterprise-policy-generator/issues/156)
- new policy to enable or disable specific cryptographic ciphers, see
  [#163](https://github.com/cadeyrn/enterprise-policy-generator/issues/163)
- new policy to enable or disable Encrypted Media Extensions; the policy to enable or disable the download of the
  Widevine CDM was removed, the value will automatically be migrated in saved configurations, see
  [#164](https://github.com/cadeyrn/enterprise-policy-generator/issues/164)
- new policy to enable or disable the automatic installation of Firefox updates; this policy and the policy to
  completely disable Firefox updates excludes each other, see
  [#166](https://github.com/cadeyrn/enterprise-policy-generator/issues/166)
- new policy to show the home button on the toolbar, see
  [#232](https://github.com/cadeyrn/enterprise-policy-generator/issues/232)
- enhanced permissions policy to control autoplay of media and access to virtual reality devices, see
  [#136](https://github.com/cadeyrn/enterprise-policy-generator/issues/136)
- enhanced tracking protection policy to add exceptions, see
  [#144](https://github.com/cadeyrn/enterprise-policy-generator/issues/144)
- enhanced policy to clear browser data on shutdown to be lockable and to allow setting some and not only all or
  nothing, see [#147](https://github.com/cadeyrn/enterprise-policy-generator/issues/147)
- enhanced DNS over HTTPS policy to add excluded domains, see
  [#148](https://github.com/cadeyrn/enterprise-policy-generator/issues/148)
- enhanced homepage policy to be able to set the homepage to either allow or forbid to optionally start with the
  previous session, see [#149](https://github.com/cadeyrn/enterprise-policy-generator/issues/149)
- enhanced authentication policy to enable or disable integrated authentication in private browsing, see
  [#150](https://github.com/cadeyrn/enterprise-policy-generator/issues/150)
- enhanced cookies policy to allow to configure domains where cookies are only allowed for the current session, see
  [#157](https://github.com/cadeyrn/enterprise-policy-generator/issues/157)
- enhanced authentication policy by option for proxy servers, see
  [#162](https://github.com/cadeyrn/enterprise-policy-generator/issues/162)
- enhanced extension settings policy to be able to define domains on which content scripts can't be run, see
  [#165](https://github.com/cadeyrn/enterprise-policy-generator/issues/165)
- replaced menu bar policy with new one that accepts more options; the old policy will automatically be migrated in
  saved configurations, see [#127](https://github.com/cadeyrn/enterprise-policy-generator/issues/127)
- removed SearchEngines | DefaultPrivate because this feature never reached a stable release of Firefox, see
  [#140](https://github.com/cadeyrn/enterprise-policy-generator/issues/140)
- removed InstallAddonsPermission policy and migrated all data to ExtensionSettings policy in saved configurations, see
  [#168](https://github.com/cadeyrn/enterprise-policy-generator/issues/168)
- removed FlashPlugin policy as Flash is no longer a thing, see
  [#218](https://github.com/cadeyrn/enterprise-policy-generator/issues/218)
- renamed Firefox Account to Mozilla account in DisableFirefoxAccounts policy, see
  [#268](https://github.com/cadeyrn/enterprise-policy-generator/issues/268)

#### Dependencies

- added eslint-plugin-jsdoc 48.2.13
- updated eslint from version 6.8.0 to 9.5.0 and updated configuration
- updated eslint-plugin-xss from version 0.1.10 to 0.1.12
- updated gulp from version 4.0.2 to 5.0.0
- updated gulp-htmllint from version 0.0.16 to 0.0.19
- updated gulp-jsdoc3 from version 2.0.0 to 3.0.0
- updated htmllint configuration
- updated jsdoc from version 3.6.3 to 4.0.3
- updated stylelint from version 13.2.0 to 15.11.0 and updated configuration
- updated stylelint-csstree-validator from version 1.8.0 to 3.0.0
- updated stylelint-order from version 4.0.0 to 6.0.4
- updated web-ext from version 4.1.0 to 8.2.0
- replaced gulp-eslint with gulp-eslint-new 2.1.0
- removed eslint-plugin-compat
- removed eslint-plugin-no-unsanitized
- removed eslint-plugin-promise

[All Changes](https://github.com/cadeyrn/enterprise-policy-generator/compare/v5.1.0...master)

---

### [Version 5.1.0](https://github.com/cadeyrn/enterprise-policy-generator/releases/tag/v5.1.0) (2020-02-27)

#### Enhancements

- add mechanism to exclude policies from each other, for example it doesn't make sense to use both the OfferToSaveLogins
  and the OfferToSaveLoginsDefault policy, see [#120](https://github.com/cadeyrn/enterprise-policy-generator/issues/120)
  
#### Bugfixes

- SearchEngines | PreventInstalls should be optional when using SearchEngines policy, see
  [#121](https://github.com/cadeyrn/enterprise-policy-generator/issues/121)
- disabling the LocalFileLinks or RequestedLocales policy has only hidden the first field if more than one field was
  visible, see [#130](https://github.com/cadeyrn/enterprise-policy-generator/issues/130)

#### Enterprise Policies

- new policy to not allow passwords to be revealed in saved logins (Firefox 71+), see
  [#108](https://github.com/cadeyrn/enterprise-policy-generator/issues/108) (Thanks, varshannagarajan!)
- added option to set the default search engine for private browsing mode (Firefox Pre-Release 71+, Firefox ESR 78+),
  see [#111](https://github.com/cadeyrn/enterprise-policy-generator/issues/111) (Thanks, varshannagarajan!)
  
#### Translations

- added Russian translation, see [#115](https://github.com/cadeyrn/enterprise-policy-generator/issues/115)
  (Thanks, wvxwxvw!)
- updated wording for OfferToSaveLogins and OfferToSaveLoginsDefault policies,
  see [#112](https://github.com/cadeyrn/enterprise-policy-generator/issues/112) (Thanks, musonius!)
- fixed typo in German translation, see [#112](https://github.com/cadeyrn/enterprise-policy-generator/issues/112)
  (Thanks, musonius!)
  
#### Code Quality

- removed optional properties from configuration to simplify the configuration file. In the future there will be
  an online developer documentation where you can find all possible options, see
  [#131](https://github.com/cadeyrn/enterprise-policy-generator/issues/131)
- it's no longer needed to define the description key for every policy in the configuration file, the Enterprise
  Policy Generator now automatically picks the description from the translation files, see
  [#132](https://github.com/cadeyrn/enterprise-policy-generator/issues/132)
- removed the enterprise_only property because it was only used by one policy and the additional_note property looks
  exactly the same, see [#133](https://github.com/cadeyrn/enterprise-policy-generator/issues/133)
  
#### Dependencies

- updated eslint from version 6.5.1 to 6.8.0 and updated configuration
- updated eslint-plugin-compat from version 3.3.0 to 3.5.1
- updated eslint-plugin-xss from version 0.1.9 to 0.1.10
- updated gulp-stylelint from version 9.0.0 to 13.0.0
- updated stylelint from version 11.1.1 to 13.2.0
- updated stylelint-csstree-validator from version 1.6.1 to 1.8.0
- updated stylelint-order from version 3.1.1 to 4.0.0
- updated web-ext from version 3.2.0 to 4.1.0

[All Changes](https://github.com/cadeyrn/enterprise-policy-generator/compare/v5.0.0...v5.1.0)<br />
[Download Signed WebExtension](https://addons.mozilla.org/en-US/firefox/addon/enterprise-policy-generator/versions/?page=1#version-5.1.0)

---

### [Version 5.0.0](https://github.com/cadeyrn/enterprise-policy-generator/releases/tag/v5.0.0) (2019-10-10)

#### Enhancements

- deprecation of Firefox 60. Firefox 68 or higher is required now. Also, Enterprise Policy Generator no longer
  shows minimum required Firefox version for policies older than Firefox 68.0, see
  [#80](https://github.com/cadeyrn/enterprise-policy-generator/issues/80)
- added support for new "preference" policy type, see
  [#89](https://github.com/cadeyrn/enterprise-policy-generator/issues/89)
- added support for new "key-object-list" policy type, see
  [#92](https://github.com/cadeyrn/enterprise-policy-generator/issues/92)
- added support for new "multiselect" policy property, see
  [#92](https://github.com/cadeyrn/enterprise-policy-generator/issues/92)
- added mechanism for marking deprecated policies, see
  [#92](https://github.com/cadeyrn/enterprise-policy-generator/issues/92)
- enhanced URL validation method to allow file:// URLs for URL properties, see
  [#93](https://github.com/cadeyrn/enterprise-policy-generator/issues/93)
- enhanced URL validation method to optionally allow data:image URI for some policies, see
  [#96](https://github.com/cadeyrn/enterprise-policy-generator/issues/96)
- some minor improvements and fixes (design, validation, translation files)

#### Enterprise Policies

- new policy to allow specific websites to link to local files, see
  [#83](https://github.com/cadeyrn/enterprise-policy-generator/issues/83)
- new policy to set the default download directory, see
  [#84](https://github.com/cadeyrn/enterprise-policy-generator/issues/84)
- new policy to set the download directory and lock it, see
  [#84](https://github.com/cadeyrn/enterprise-policy-generator/issues/84)
- new policy to ask where to save each file before downloading, see
  [#84](https://github.com/cadeyrn/enterprise-policy-generator/issues/84)
- new policy to customize the Firefox home page, see
  [#85](https://github.com/cadeyrn/enterprise-policy-generator/issues/85)
- new policy to enable or disable search suggestions, see
  [#86](https://github.com/cadeyrn/enterprise-policy-generator/issues/86)
- allow empty value for RequestedLocales policy to use the operating system language as Firefox language, see
  [#87](https://github.com/cadeyrn/enterprise-policy-generator/issues/87)
- new policy to enable or disable the page that appears when opening a new tab, see
  [#88](https://github.com/cadeyrn/enterprise-policy-generator/issues/88)
- new policy to enable or disable storing cache on the hard drive, see
  [#89](https://github.com/cadeyrn/enterprise-policy-generator/issues/89)
- new policy to change the location of the disk cache, see
  [#89](https://github.com/cadeyrn/enterprise-policy-generator/issues/89)
- new policy to send single words in address bar to DNS first and not directly to search engine, see
  [#89](https://github.com/cadeyrn/enterprise-policy-generator/issues/89)
- new policy to display the punycode version of internationalized domain names, see
  [#89](https://github.com/cadeyrn/enterprise-policy-generator/issues/89)
- new policy to control the preference to suggest bookmarks when using the address bar, see
  [#89](https://github.com/cadeyrn/enterprise-policy-generator/issues/89)
- new policy to control the preference to suggest browsing history when using the address bar, see
  [#89](https://github.com/cadeyrn/enterprise-policy-generator/issues/89)
- new policy to control the preference to suggest open tabs when using the address bar, see
  [#89](https://github.com/cadeyrn/enterprise-policy-generator/issues/89)
- new policy to hide the privacy policy tab on first run, see
  [#89](https://github.com/cadeyrn/enterprise-policy-generator/issues/89)
- new policy to restore old behavior regarding keypress event and non-printable keys for certain domains, see
  [#89](https://github.com/cadeyrn/enterprise-policy-generator/issues/89)
- new policy to restore old behavior regarding keyCode and charCode for certain domains, see
  [#89](https://github.com/cadeyrn/enterprise-policy-generator/issues/89)
- new policy to disable the search for search engine updates, see
  [#89](https://github.com/cadeyrn/enterprise-policy-generator/issues/89)
- new policy to disable the warning when the browser is closed, see
  [#89](https://github.com/cadeyrn/enterprise-policy-generator/issues/89)
- new policy to disallow websites to override the context menu, see
  [#89](https://github.com/cadeyrn/enterprise-policy-generator/issues/89)
- new policy to disallow websites to move and resize windows, see
  [#89](https://github.com/cadeyrn/enterprise-policy-generator/issues/89)
- new policy to allow websites to monkey with window focus, see
  [#89](https://github.com/cadeyrn/enterprise-policy-generator/issues/89)
- new policy to hide recommendations tab in add-ons manager, see
  [#89](https://github.com/cadeyrn/enterprise-policy-generator/issues/89)
- new policy to disable download of the Widevine plugin, see
  [#89](https://github.com/cadeyrn/enterprise-policy-generator/issues/89)
- new policy to disable download of the OpenH264 plugin, see
  [#89](https://github.com/cadeyrn/enterprise-policy-generator/issues/89)
- new policy to disable IPv6 DNS lookups, see
  [#89](https://github.com/cadeyrn/enterprise-policy-generator/issues/89)
- new policy to disable browsing history, see
  [#89](https://github.com/cadeyrn/enterprise-policy-generator/issues/89)
- new policy to automatically choose the default personal certificate, see
  [#89](https://github.com/cadeyrn/enterprise-policy-generator/issues/89)
- new policy to disable the feature to send TLS errors to Mozilla, see
  [#89](https://github.com/cadeyrn/enterprise-policy-generator/issues/89)
- new policy to disable the Alt key to show the menu bar on Windows and Linux, see
  [#89](https://github.com/cadeyrn/enterprise-policy-generator/issues/89)
- new policy to allow local files to access other local files (Firefox 68.0.1+, Firefox ESR 68.1+), see
  [#89](https://github.com/cadeyrn/enterprise-policy-generator/issues/89)
- replaced old SanitizeOnShutdown policy to clear all data on shutdown with new selective SanitizeOnShutdown policy.
  Users of the old policy: Please have a look at your configuration and adjust accordingly, see
  [#91](https://github.com/cadeyrn/enterprise-policy-generator/issues/91)
- new policy to manage the installation and uninstallation of add-ons, see
  [#92](https://github.com/cadeyrn/enterprise-policy-generator/issues/92)
- re-added DisableSafeMode policy (removed in Enterprise Policy Generator 4.1.0) but with better description, see
  [#94](https://github.com/cadeyrn/enterprise-policy-generator/issues/94)
- improved labels for Certificates|Add policy, see
  [#95](https://github.com/cadeyrn/enterprise-policy-generator/issues/95)
- allow data:image URI for IconURL property of SearchEngine|Add policy, see
  [#96](https://github.com/cadeyrn/enterprise-policy-generator/issues/96)
- new policy to completely disable the password manager (Firefox 70+, Firefox ESR 68.2+), see
  [#98](https://github.com/cadeyrn/enterprise-policy-generator/issues/98)
- new policy to set the default value for allowing Firefox to offer to remember saved logins and passwords
  (Firefox 70+, Firefox ESR 68.2+), see [#99](https://github.com/cadeyrn/enterprise-policy-generator/issues/99)
- added cryptomining and fingerprinting to EnableTrackingProtection policy (Firefox 70+, Firefox ESR 68.2+) and changed
  some wording to better align with the current wording of Firefox, see
  [#100](https://github.com/cadeyrn/enterprise-policy-generator/issues/100)
- Authentication policy can optionally be locked starting with Firefox 71, was always locked before, see
  [#104](https://github.com/cadeyrn/enterprise-policy-generator/issues/104)
  
#### Translations

- fixed broken French translation (some translations were not used because of broken translation keys)
- unified some phrases in German translation

#### Dependencies

- updated eslint from version 5.15.3 to 6.5.1 and updated configuration
- updated eslint-plugin-compat from version 3.0.1 to 3.3.0
- updated eslint-plugin-promise from version 4.0.1 to 4.2.1
- updated gulp from version 4.0.0 to 4.0.2
- updated gulp-eslint from version 5.0.0 to 6.0.0
- updated gulp-stylelint from version 8.0.0 to 9.0.0
- updated htmllint from version 0.7.3 to 0.8.0
- updated jsdoc from version 3.5.5 to 3.6.3
- updated stylelint from version 9.10.1 to 11.1.1 and updated configuration
- updated stylelint-csstree-validator from version 1.3.0 to 1.6.1
- updated stylelint-order from version 2.1.0 to 3.1.1
- updated web-ext from version 3.0.0 to 3.2.0

[All Changes](https://github.com/cadeyrn/enterprise-policy-generator/compare/v4.4.0...v5.0.0)<br />
[Download Signed WebExtension](https://addons.mozilla.org/en-US/firefox/addon/enterprise-policy-generator/versions/?page=1#version-5.0.0)

---

### [Version 4.4.0](https://github.com/cadeyrn/enterprise-policy-generator/releases/tag/v4.4.0) (2019-03-20)

#### Enterprise Policies

- new policy to enable or disable captive portal support (Firefox 67+, Firefox ESR 60.7+), fixes
  [#69](https://github.com/cadeyrn/enterprise-policy-generator/issues/69)
- new policy to enable or disable network prediction (DNS prefetching) (Firefox 67+, Firefox ESR 60.7+), fixes
  [#71](https://github.com/cadeyrn/enterprise-policy-generator/issues/71)
- new policy to enable or disable automatic extension updates (Firefox 67+, Firefox ESR 60.7+), fixes
  [#73](https://github.com/cadeyrn/enterprise-policy-generator/issues/73)
- new policy to add a custom support menu item to the help menu (Firefox 67+, Firefox ESR 60.7+), fixes
  [#74](https://github.com/cadeyrn/enterprise-policy-generator/issues/74)
- added support for POST method in SearchEngines policy (Firefox 67+, Firefox ESR 60.7+), fixes
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
