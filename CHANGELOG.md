# Firefox Add-on: Enterprise Policy Generator

## Release Notes

### Version 8.0.0 (Work in Progress)

> [!IMPORTANT]
> Important note for existing users: For technical reasons, it is not possible to load or import configurations that
> were saved in earlier versions of the extensions into Enterprise Policy Generator 8.0 or higher. The following options
> are available for you:
> 
> - Saved configurations must be recreated and saved in Enterprise Policy Generator 8.0 or higher. Compatibility with
> future updates will be guaranteed again, as it has been in the past. This is a one-time incompatibility resulting
> from a fundamental re-development of the extension.
> - It is understandable that you want to be sure that saved configurations will continue to work without an update
> causing any extra work. I offer to create a new configuration file for Enterprise Policy Generator 8.0 based on your
> previous configuration. All you need to do is [send me a message](https://www.soeren-hentzschel.at/kontakt/). I will
> then contact you with a way to send me either your previous configuration or policies.json file, and I will send the
> new configuration file back within a few days. If multiple configurations are affected, that's no problem. You can
> send me all affected files.
> - Use an older version: Enterprise Policy Generator up to and including version 7.3 supports loading and importing
> previous configurations and can still be used.

#### Enhancements

- Enterprise Policy Generator does not collect any data. A new property in the extension manifest makes this explicit.
  Users now see a corresponding note during installation and in the add-ons manager, see
  [#341](https://github.com/cadeyrn/enterprise-policy-generator/issues/341)
- Firefox 140 or higher is required now. Also, Enterprise Policy Generator no
  longer displays the minimum required Firefox version for policies implemented before Firefox 140.0, see
  [#316](https://github.com/cadeyrn/enterprise-policy-generator/issues/316)
- Large parts of the extension backend have been rewritten from scratch. The new code base is significantly leaner and
  more comprehensible, resulting in improved maintainability and allowing for faster delivery of updates. Further
  advantages include greater consistency in layout and fewer bugs in edge cases. The development workflow has also been
  updated, and a schema for validating the completely new JSON-based configuration has been introduced to simplify
  development. see [#306](https://github.com/cadeyrn/enterprise-policy-generator/issues/306)
- Revised design, which is more modern and has also been optimized for smaller screen sizes. For fields that allow
  multiple values, it is now much clearer which input field belongs to which item, see
  [#306](https://github.com/cadeyrn/enterprise-policy-generator/issues/306)
- Significantly improved accessibility, including greatly improved keyboard navigation. As part of this, two completely
  new keyboard shortcuts have been introduced: You can use <kbd>Shift</kbd> + <kbd>F</kbd> to focus the filter field,
  and <kbd>Shift</kbd> + <kbd>G</kbd> to focus the button to generate the policies, see
  [#306](https://github.com/cadeyrn/enterprise-policy-generator/issues/306)
- For fields that allow multiple values, these can now be moved using drag and drop. Control via keyboard is also
  possible: Press <kbd>Space</kbd> to pick up an item. Use <kbd>Arrow Up</kbd> and <kbd>Arrow Down</kbd> to move it.
  Press <kbd>Space</kbd> or <kbd>Enter</kbd> to drop. Press <kbd>Escape</kbd> to cancel, see
  [#361](https://github.com/cadeyrn/enterprise-policy-generator/issues/361)
- Added validation for fields that expect a specific placeholder, see
  [#306](https://github.com/cadeyrn/enterprise-policy-generator/issues/306)
- The filter field can be used to find policies based on the top-level key and its description. From now on, the keys
  and descriptions of the respective options will also be searched, see
  [#358](https://github.com/cadeyrn/enterprise-policy-generator/issues/358)
- To avoid clutter in the user interface, information like the required Firefox version, additional notes, or links are
  now only displayed for enabled policies, see [#363](https://github.com/cadeyrn/enterprise-policy-generator/issues/363)
- The height of text areas (currently only used for `3rdparty` policy) now automatically increases and decreases
  depending on the length of the content, see [#359](https://github.com/cadeyrn/enterprise-policy-generator/issues/359)
- The button for selecting the generated code now copies it directly to the clipboard, see
  [#364](https://github.com/cadeyrn/enterprise-policy-generator/issues/364)
- When attempting to load or import an incompatible configuration, a corresponding warning is displayed, see
  [#362](https://github.com/cadeyrn/enterprise-policy-generator/issues/362)
- Added a promo box to give users of the extension an easy way to support the development of this extension, see
  [#360](https://github.com/cadeyrn/enterprise-policy-generator/issues/360)

#### Enterprise Policies

- Added support for the `ContentAnalysis` policy to configure the use of a Data Loss Prevention (DLP) solution, see
  [#259](https://github.com/cadeyrn/enterprise-policy-generator/issues/259)
- The `ManagedBookmarks` policy now also supports the creation of bookmark folders, see
  [#283](https://github.com/cadeyrn/enterprise-policy-generator/issues/283)
- Removed support for the `Extensions` policy as there is the `ExtensionSettings` policy which provides more features,
  [#170](https://github.com/cadeyrn/enterprise-policy-generator/issues/170)
- Options that used the legacy version of the `Preferences` policy have been removed. These can all be replaced by the
  newer `Preferences` policy, see [#306](https://github.com/cadeyrn/enterprise-policy-generator/issues/306)

#### Dependencies

- Added sourcemeta/jsonschema for validation of the new JSON configuration
- Updated eslint from version 9.39.2 to 10.0.3
- Updated eslint/json from version 0.14.0 to 1.0.1
- Updated eslint-plugin-jsdoc from version 61.4.1 to 62.7.1
- Updated stylelint from version 17.0.0 to 17.4.0
- Updated stylistic/eslint-plugin from version 5.7.1 to 5.10.0
- Updated web-ext from version 9.2.0 to 9.4.0
- Replaced htmllint and gulp-htmllint with html-eslint
- Removed eslint-plugin-sort-requires, gulp, gulp-eslint-new, gulp-jsdoc3, jsdoc, jsdoc-strip-async-await, and
  npm-run-all

---

### [Version 7.3.0](https://github.com/cadeyrn/enterprise-policy-generator/releases/tag/v7.3.0) (2026-01-29)

#### Enterprise Policies

- Added support for the `DisableRemoteImprovements` policy to prevent Firefox from applying performance, stability, and
  feature changes between updates, see [#354](https://github.com/cadeyrn/enterprise-policy-generator/issues/354)
- Some small policies cleanup, see [#351](https://github.com/cadeyrn/enterprise-policy-generator/issues/351)

#### Notable Changes

- Removed the browser_style property from the manifest because it's no longer supported by Firefox and not needed
  anyway, see [#353](https://github.com/cadeyrn/enterprise-policy-generator/issues/353)
- Changed copyright year from 2025 to 2026, see
  [#352](https://github.com/cadeyrn/enterprise-policy-generator/issues/352)

#### Dependencies

- Updated eslint from version 9.39.1 to 9.39.2
- Updated eslint-plugin-jsdoc from version 61.2.1 to 62.4.1
- Updated stylelint from version 16.25.0 to 17.0.0
- Updated stylelint-order from version 7.0.0 to 7.0.1
- Updated stylistic/eslint-plugin from version 5.5.0 to 5.7.1
- Updated web-ext from version 9.1.0 to 9.2.0

**This is the last release with support for Firefox 128.**

[All Changes](https://github.com/cadeyrn/enterprise-policy-generator/compare/v7.2.0...v7.3.0)<br />
[Download Signed WebExtension](https://addons.mozilla.org/en-US/firefox/addon/enterprise-policy-generator/versions/?page=1#version-7.3.0)

---

### [Version 7.2.0](https://github.com/cadeyrn/enterprise-policy-generator/releases/tag/v7.2.0) (2025-11-17)

#### Enterprise Policies

- Added support for the `BrowserDataBackup` policy to manage Firefox backups, see
  [#346](https://github.com/cadeyrn/enterprise-policy-generator/issues/346)
- Added support for `security.webauthn.always_allow_direct_attestation` in `Preferences` policy, see
  [#347](https://github.com/cadeyrn/enterprise-policy-generator/issues/347)

#### Dependencies

- Updated eslint from version 9.36.0 to 9.39.1
- Updated eslint/json from version 0.13.2 to 0.14.0
- Updated eslint-plugin-jsdoc from version 60.2.0 to 61.2.1
- Updated jsdoc from version 4.0.4 to 4.0.5
- Updated stylelint from version 16.24.0 to 16.25.0
- Updated stylistic/eslint-plugin from version 5.4.0 to 5.5.0
- Updated web-ext from version 8.10.0 to 9.1.0

[All Changes](https://github.com/cadeyrn/enterprise-policy-generator/compare/v7.1.0...v7.2.0)<br />
[Download Signed WebExtension](https://addons.mozilla.org/en-US/firefox/addon/enterprise-policy-generator/versions/?page=1#version-7.2.0)

---

### [Version 7.1.0](https://github.com/cadeyrn/enterprise-policy-generator/releases/tag/v7.1.0) (2025-09-23)

#### Enterprise Policies

- Added support for the `GenerativeAI` policy to disable several generative AI features, see
  [#332](https://github.com/cadeyrn/enterprise-policy-generator/issues/332)
- Added support for the `VisualSearchEnabled` policy to disable the reverse image search via Google Lens, see
  [#339](https://github.com/cadeyrn/enterprise-policy-generator/issues/339)

#### Notable Changes

- Improved instruction for Linux users and mentioned /etc/firefox/policies as a possible location for system-wide
  policies, see [#343](https://github.com/cadeyrn/enterprise-policy-generator/issues/343)

#### Dependencies

- Updated eslint from version 9.35.0 to 9.36.0
- Updated eslint-plugin-jsdoc from version 55.0.0 to 60.2.0 and updated configuration
- Updated gulp-eslint-new from version 2.4.0 to 2.5.0
- Updated stylistic/eslint-plugin from version 5.3.1 to 5.4.0
- Updated web-ext from version 8.9.0 to 8.10.0

[All Changes](https://github.com/cadeyrn/enterprise-policy-generator/compare/v7.0.0...v7.1.0)<br />
[Download Signed WebExtension](https://addons.mozilla.org/en-US/firefox/addon/enterprise-policy-generator/versions/?page=1#version-7.1.0)

---

### [Version 7.0.0](https://github.com/cadeyrn/enterprise-policy-generator/releases/tag/v7.0.0) (2025-09-08)

#### Enhancements

- Firefox 128 or higher is required now. Also, Enterprise Policy Generator no
  longer displays the minimum required Firefox version for policies implemented before Firefox 128.0, see
  [#315](https://github.com/cadeyrn/enterprise-policy-generator/issues/315)

#### Bugfixes

- Fixed a bug that caused the value for the `OverrideFirstRunPage` policy to be “undefined” when the configuration was
  exported and then reimported, see [#338](https://github.com/cadeyrn/enterprise-policy-generator/issues/338)

#### Enterprise Policies

- Added support for `mathml.disabled`, `privacy.baselineFingerprintingProtection`, `privacy.fingerprintingProtection`,
  `security.csp.reporting.enabled`, `security.pki.certificate_transparency.disable_for_hosts`,
  `security.pki.certificate_transparency.disable_for_spki_hashes`, `security.pki.certificate_transparency.mode`,
  `svg.context-properties.content.enabled`, `svg.disabled`, `webgl.disabled`, `webgl.force-enabled`, and
  `xpinstall.enabled`, removed support for `security.osclientcerts.assume_rsa_pss_support` in `Preferences` policy, see
  [#308](https://github.com/cadeyrn/enterprise-policy-generator/issues/308)
- Reintroduced the `DisableBuiltinPDFViewer` policy with a new description, as the behavior was changed in Firefox 140.
  Support for this policy was originally removed in Enterprise Policy Generator 6.0 because the `PDFjs` policy was
  introduced to get the same behavior. The `DisableBuiltinPDFViewer` and `PDFjs` policies exclude each other, see
  [#334](https://github.com/cadeyrn/enterprise-policy-generator/issues/334)
- Updated some descriptions for `EnableTrackingProtection` policy, see
  [#331](https://github.com/cadeyrn/enterprise-policy-generator/issues/331)
- Updated `EnableTrackingProtection` to support the `SuspectedFingerprinting` option, see
  [#327](https://github.com/cadeyrn/enterprise-policy-generator/issues/327)
- Updated `EnableTrackingProtection` to support the `BaselineExceptions` and `ConvenienceExceptions` options, see
  [#328](https://github.com/cadeyrn/enterprise-policy-generator/issues/328)
- Updated `EnableTrackingProtection` to support the `Category` option, see
  [#330](https://github.com/cadeyrn/enterprise-policy-generator/issues/330)
- Updated `Permissions` policy to support the configuration of screen sharing requests, see
  [#329](https://github.com/cadeyrn/enterprise-policy-generator/issues/329)
- Updated `SanitizeOnShutdown` policy: removed obsolete `Downloads` and `OfflineApps` options, added compatibility note
  for `FormData` option, improved order and descriptions of all options, see
  [#296](https://github.com/cadeyrn/enterprise-policy-generator/issues/296)
- The `temporarily_allow_weak_signatures` option in the `ExtensionSettings` policy was only available as a global
  option, but not for individual extensions, see [#333](https://github.com/cadeyrn/enterprise-policy-generator/issues/333)
- Replaced `DisableFirefoxAccounts` policy by `DisableAccounts` policy and migrated existing configurations, see
  [#260](https://github.com/cadeyrn/enterprise-policy-generator/issues/260)
- Removed `DisablePrivateBrowsing` policy and migrated to `PrivateBrowsingModeAvailability` policy in existing
  configurations, see [#307](https://github.com/cadeyrn/enterprise-policy-generator/issues/307)

#### Code Quality

- Use CSS nesting for better CSS maintainability, see
  [#223](https://github.com/cadeyrn/enterprise-policy-generator/issues/223)
- Replaced JavaScript method to hide empty categories after filtering with CSS solution, see
  [#336](https://github.com/cadeyrn/enterprise-policy-generator/issues/336)

#### Dependencies

- Updated eslint from version 9.34.0 to 9.35.0
- Updated eslint-plugin-jsdoc from version 54.1.1 to 55.0.0
- Updated stylelint from version 16.23.1 to 16.24.0
- Updated stylistic/eslint-plugin from version 5.2.3 to 5.3.1

[All Changes](https://github.com/cadeyrn/enterprise-policy-generator/compare/v6.6.0...v7.0.0)<br />
[Download Signed WebExtension](https://addons.mozilla.org/en-US/firefox/addon/enterprise-policy-generator/versions/?page=1#version-7.0.0)

---

### [Version 6.6.0](https://github.com/cadeyrn/enterprise-policy-generator/releases/tag/v6.6.0) (2025-08-31)

#### Enhancements

- If a filter was active and the user interface was reloaded, the search term was still in the filter field, but the
  filter was not active and the input field was not visible. Now the filter remains active, see
  [#318](https://github.com/cadeyrn/enterprise-policy-generator/issues/318)
- It was already possible to exclude another policy with a specific value, but it was not possible to exclude another
  policy if the current policy has a specific value. This is now possible, see
  [#300](https://github.com/cadeyrn/enterprise-policy-generator/issues/300)
- The `Preferences` policy does not allow the use of all Firefox options. There has already been a validation to ensure
  that no option name is used that is not allowed to be used or does not start with a certain prefix. However, there are
  also a few options that start with a permitted prefix but are still not allowed. These options are now also recognized
  as incorrect by the validation, see [#309](https://github.com/cadeyrn/enterprise-policy-generator/issues/309)
- Added support for number fields, used in new `ContentAnalysis` policy (not yet implemented), see
  [#321](https://github.com/cadeyrn/enterprise-policy-generator/issues/321)
- Added support for space-separated array fields, used in new `ContentAnalysis` policy (not yet implemented), see
  [#323](https://github.com/cadeyrn/enterprise-policy-generator/issues/323)
- Added support for escaping values in array fields, used in new `ContentAnalysis` policy (not yet implemented), see
  [#325](https://github.com/cadeyrn/enterprise-policy-generator/issues/325)
- The field descriptions should not take up more space in width than the fields themselves, see
  [#322](https://github.com/cadeyrn/enterprise-policy-generator/issues/322)

#### Enterprise Policies

- The `UseSystemPrintDialog` and `PrintingEnabled=false` policies should exclude each other, see
  [#319](https://github.com/cadeyrn/enterprise-policy-generator/issues/319)
- Removed support for the `DisablePocket` policy because Pocket has been shut down, see
  [#303](https://github.com/cadeyrn/enterprise-policy-generator/issues/303)
- Removed support for the legacy `Preferences` policies `privacy.file_unique_origin` and
  `security.ssl.errorReporting.enabled`, because these options no longer exist in Firefox, see
  [#320](https://github.com/cadeyrn/enterprise-policy-generator/issues/320)

#### Dependencies

- Updated eslint from version 9.28.0 to 9.34.0
- Updated eslint/json from version 0.12.0 to 0.13.2
- Updated eslint-plugin-jsdoc from version 50.8.0 to 54.1.1
- Updated stylelint from version 16.20.0 to 16.23.1 and updated configuration
- Updated stylistic/eslint-plugin from version 4.4.1 to 5.2.3
- Updated web-ext from version 8.7.1 to 8.9.0

**This is the last release with support for Firefox 115.**

[All Changes](https://github.com/cadeyrn/enterprise-policy-generator/compare/v6.5.0...v6.6.0)<br />
[Download Signed WebExtension](https://addons.mozilla.org/en-US/firefox/addon/enterprise-policy-generator/versions/?page=1#version-6.6.0)

---

### [Version 6.5.0](https://github.com/cadeyrn/enterprise-policy-generator/releases/tag/v6.5.0) (2025-06-11)

#### Enhancements

- Improved nested-object policy type, needed for `Containers` policy, see
  [#252](https://github.com/cadeyrn/enterprise-policy-generator/issues/252)
- Added support for sorting enum fields by their localized labels, used in the new `Containers` policy, see
  [#302](https://github.com/cadeyrn/enterprise-policy-generator/issues/302)

#### Enterprise Policies

- Added support for `Containers` policy to set the initial set of tab containers, see
  [#252](https://github.com/cadeyrn/enterprise-policy-generator/issues/252)
- Added support for `AllowFileSelectionDialogs` policy to disable file selection dialogs, see
  [#258](https://github.com/cadeyrn/enterprise-policy-generator/issues/258)
- Added support for `DisableEncryptedClientHello` policy to disable use of the TLS feature Encrypted Client Hello (ECH),
  see [#261](https://github.com/cadeyrn/enterprise-policy-generator/issues/261)
- Added `Fallback` option to `DNSOverHTTPS` policy to determine whether Firefox will use your default DNS resolver if
  there is a problem with the secure DNS provider, see
  [#262](https://github.com/cadeyrn/enterprise-policy-generator/issues/262)
- Added support for `HttpAllowlist` policy to configure sites that will not automatically be upgraded to HTTPS, see
  [#264](https://github.com/cadeyrn/enterprise-policy-generator/issues/264)
- Added support for `HttpsOnlyMode` policy to configure the HTTPS-Only mode, see
  [#265](https://github.com/cadeyrn/enterprise-policy-generator/issues/265)
- Added support for `PostQuantumKeyAgreementEnabled` policy to enable or disable post-quantum key agreement for TLS, see
  [#266](https://github.com/cadeyrn/enterprise-policy-generator/issues/266)
- Added support for `TranslateEnabled` policy to enable or disable the local translation feature, see
  [#267](https://github.com/cadeyrn/enterprise-policy-generator/issues/267)
- Added support for `PrivateBrowsingModeAvailability` policy to set the availability of private windows. It cannot be
  used together with the `DisablePrivateBrowsing` policy, see
  [#281](https://github.com/cadeyrn/enterprise-policy-generator/issues/281)
- Added `FirefoxLabs` option to `UserMessaging` policy to enable or disable the “Firefox Labs” section in the Firefox
  settings, see [#284](https://github.com/cadeyrn/enterprise-policy-generator/issues/284)
- Added support for `MicrosoftEntraSSO` policy to allow single sign-on for Microsoft Entra accounts, see
  [#285](https://github.com/cadeyrn/enterprise-policy-generator/issues/285)
- Added support for `identity.fxaccounts.toolbar.` and `security.block_fileuri_script_with_wrong_mime` in `Preferences`
  policy, see [#286](https://github.com/cadeyrn/enterprise-policy-generator/issues/286)
- Added `private_browsing` option to `ExtensionSettings` policy to configure whether an extension should be enabled in
  private browsing, see [#287](https://github.com/cadeyrn/enterprise-policy-generator/issues/287)
- Starting with Firefox 139, the `SearchEngines` policy is no longer ESR only, see
  [#298](https://github.com/cadeyrn/enterprise-policy-generator/issues/298)
- Removed `WhatsNew` option from `UserMessaging` policy (Thanks, berkaynayman!) and removed it from existing
  configurations, see [#310](https://github.com/cadeyrn/enterprise-policy-generator/issues/310)
- Added support for additional cryptographic ciphers to `DisabledCiphers` policy, see
  [#312](https://github.com/cadeyrn/enterprise-policy-generator/issues/312)

#### Translations

- Fixed a wrong environment variable in the description of `Certificates | Install` policy, see
  [#317](https://github.com/cadeyrn/enterprise-policy-generator/issues/317)
- Updated wording for `AutofillAddressEnabled` and `AutofillCreditCardEnabled` policies
- Updated Russian translation (Thanks, solokot!)

#### Dependencies

- Updated eslint from version 9.25.1 to 9.28.0
- Updated eslint-plugin-jsdoc from version 50.6.11 to 50.8.0
- Updated gulp from version 5.0.0 to 5.0.1
- Updated stylelint from version 15.11.0 to 16.20.0, removed no longer existing rules, and added a few new rules
- Updated stylelint-order from version 6.0.4 to 7.0.0
- Updated web-ext from version 8.6.0 to 8.7.1
- Migrated from stylistic/eslint-plugin-js to stylistic/eslint-plugin and updated from version 4.2.0 to 4.4.1
- Removed gulp-stylelint to unblock stylelint upgrade and to allow installing dependencies without --force again
- Removed stylelint-csstree-validator

[All Changes](https://github.com/cadeyrn/enterprise-policy-generator/compare/v6.4.0...v6.5.0)<br />
[Download Signed WebExtension](https://addons.mozilla.org/en-US/firefox/addon/enterprise-policy-generator/versions/?page=1#version-6.5.0)

---

### [Version 6.4.0](https://github.com/cadeyrn/enterprise-policy-generator/releases/tag/v6.4.0) (2025-04-28)

#### Enterprise Policies

- Added support for `AutofillAddressEnabled` policy to enable or disable the saving and automatic filling for addresses,
  see [#250](https://github.com/cadeyrn/enterprise-policy-generator/issues/250)
- Added support for `AutofillCreditCardEnabled` policy to enable or disable the saving and automatic filling for payment
  methods, see [#251](https://github.com/cadeyrn/enterprise-policy-generator/issues/251)
- Added support for `FirefoxSuggest` policy to configure Firefox Suggest feature, see
  [#256](https://github.com/cadeyrn/enterprise-policy-generator/issues/256)
- Added support for `PrintingEnabled` policy to enable or disable printing, see
  [#257](https://github.com/cadeyrn/enterprise-policy-generator/issues/257)
- Added support for `SkipTermsOfUse` policy to skip the terms of use and privacy notice when Firefox is started for the
  first time (Firefox 138+), see [#299](https://github.com/cadeyrn/enterprise-policy-generator/issues/299)
- Added `default_area` option to `ExtensionSettings` policy to define the initial placement of the extension button, see
  [#255](https://github.com/cadeyrn/enterprise-policy-generator/issues/255)
- Added `EmailTracking` option to `EnableTrackingProtection` policy to block e-mail tracking, see
  [#254](https://github.com/cadeyrn/enterprise-policy-generator/issues/254)

#### Dependencies

- Updated eslint from version 9.23.0 to 9.25.1
- Updated eslint-plugin-jsdoc from version 50.6.6 to 50.6.11
- Updated eslint/json from version 0.11.0 to 0.12.0
- Updated web-ext from version 8.4.0 to 8.6.0

[All Changes](https://github.com/cadeyrn/enterprise-policy-generator/compare/v6.3.0...v6.4.0)<br />
[Download Signed WebExtension](https://addons.mozilla.org/en-US/firefox/addon/enterprise-policy-generator/versions/?page=1#version-6.4.0)

---

### [Version 6.3.0](https://github.com/cadeyrn/enterprise-policy-generator/releases/tag/v6.3.0) (2025-03-16)

#### Enhancements

- Added support for version pattern validations, needed for `AppUpdatePin` policy, see
  [#294](https://github.com/cadeyrn/enterprise-policy-generator/issues/294)
- Added support for boolean options in key-object-list policies, needed for updated `ExtensionSettings` policy, see
  [#295](https://github.com/cadeyrn/enterprise-policy-generator/issues/295)
- Added support for key-value-pairs options in object policies, needed for updated `SecurityDevices` policy, see
  [#297](https://github.com/cadeyrn/enterprise-policy-generator/issues/297)

#### Enterprise Policies

- Added support for `AppUpdatePin` policy to prevent Firefox from being updated beyond the specified version, see
  [#241](https://github.com/cadeyrn/enterprise-policy-generator/issues/241)
- Added support for `StartDownloadsInTempDirectory` policy to force downloads to start in a temporary location rather
  than in the default download directory, see [#247](https://github.com/cadeyrn/enterprise-policy-generator/issues/247)
- Added support for `UseSystemPrintDialog` policy to use the system print dialog instead of the print preview window,
  see [#249](https://github.com/cadeyrn/enterprise-policy-generator/issues/249)
- Added support for `ExemptDomainFileTypePairsFromFileTypeDownloadWarnings` policy to disable download warnings based on
  file extension and domains, see [#243](https://github.com/cadeyrn/enterprise-policy-generator/issues/243)
- Added support for `GoToIntranetSiteForSingleWordEntryInAddressBar` policy to force direct intranet site navigation
  instead of searching when typing single word entries in the address bar, see
  [#245](https://github.com/cadeyrn/enterprise-policy-generator/issues/245)
- Added `MoreFromMozilla` option to `UserMessaging` policy to show or hide “More from Mozilla” section in the settings,
  see [#248](https://github.com/cadeyrn/enterprise-policy-generator/issues/248)
- Added `temporarily_allow_weak_signatures` option in the `ExtensionSettings` policy to allow installation of extensions
  with a weak signature algorithm (Firefox 127+), see
  [#263](https://github.com/cadeyrn/enterprise-policy-generator/issues/263)
- Added `sitepermission` as possible type for the `allowed_types` option in the `ExtensionSettings` policy to allow the
  installation of site permission but not other types of add-ons, see
  [#244](https://github.com/cadeyrn/enterprise-policy-generator/issues/244)
- Updated `DisplayBookmarksToolbar` policy to support only showing the bookmarks toolbar for new tabs, and migrated
  policy in existing configurations, see [#242](https://github.com/cadeyrn/enterprise-policy-generator/issues/242)
- Updated `SecurityDevices` policy to support new syntax for adding devices, to support removing devices, and added
  migration for existing configurations, see [#246](https://github.com/cadeyrn/enterprise-policy-generator/issues/246)
- `AppUpdateURL` and `DisableAppUpdate` should exclude each other, see
  [#293](https://github.com/cadeyrn/enterprise-policy-generator/issues/293)
- Fixed broken info links for two policies, see
  [#292](https://github.com/cadeyrn/enterprise-policy-generator/issues/292)

#### Dependencies

- Updated eslint from version 9.21.0 to 9.22.0
- Updated eslint/json from version 0.10.0 to 0.11.0
- Updated eslint-plugin-jsdoc from version 50.6.3 to 50.6.6
- Updated stylistic/eslint-plugin-js from version 4.1.0 to 4.2.0

[All Changes](https://github.com/cadeyrn/enterprise-policy-generator/compare/v6.2.0...v6.3.0)<br />
[Download Signed WebExtension](https://addons.mozilla.org/en-US/firefox/addon/enterprise-policy-generator/versions/?page=1#version-6.3.0)

---

### [Version 6.2.0](https://github.com/cadeyrn/enterprise-policy-generator/releases/tag/v6.2.0) (2025-03-02)

#### Enhancements

- Allow excluding multiple policies and to exclude a policy by its value, see
  [#288](https://github.com/cadeyrn/enterprise-policy-generator/issues/288)
- Added option for URL validation to flat-array policies, see
  [#291](https://github.com/cadeyrn/enterprise-policy-generator/issues/291)

#### Bugfixes

- It was possible to enter a scenario in which a policy with an enum field is first enabled and then excluded by
  another policy. In this case, the visually correctly disabled policy was actually still active, see
  [#290](https://github.com/cadeyrn/enterprise-policy-generator/issues/290)

#### Enterprise Policies

- Added support for `BackgroundAppUpdate` policy to allow or disallow installing updates of Firefox in the background,
  when the application is not running, see [#233](https://github.com/cadeyrn/enterprise-policy-generator/issues/233)
- Added support for `ManualAppUpdateOnly` policy to disable prompts for Firefox updates, see
  [#237](https://github.com/cadeyrn/enterprise-policy-generator/issues/237)
- Added `SponsoredTopSites` and `SponsoredPocket` options to `FirefoxHome` policy, removed the `Snippets` option (also
  from existing configurations), updated order and translations of all options to reflect the current order and naming
  in Firefox, see [#236](https://github.com/cadeyrn/enterprise-policy-generator/issues/236)
- Added `Behavior` and `BehaviorPrivateBrowsing` options to `Cookies` policy, removed `Default`, `AcceptThirdParty`, and
  `RejectTracker` options, migrated them to the `Behavior` option in existing configurations, and made
  `ExpireAtSessionEnd` option optional, see [#234](https://github.com/cadeyrn/enterprise-policy-generator/issues/234)
- Added support for `PasswordManagerExceptions` policy to prevent Firefox from saving passwords for specific sites, see
  [#238](https://github.com/cadeyrn/enterprise-policy-generator/issues/238)
- Added support for `WindowsSSO` policy to allow or disallow Windows single sign-on for Microsoft, work, and school
  accounts, see [#240](https://github.com/cadeyrn/enterprise-policy-generator/issues/240)
- Added several new cryptographic ciphers to `DisabledCiphers` policy and sorted them alphabetically, see
  [#235](https://github.com/cadeyrn/enterprise-policy-generator/issues/235)
- Added `Encoding` option to `SearchEngines` policy, see
  [#239](https://github.com/cadeyrn/enterprise-policy-generator/issues/239)

#### Notable Changes and Code Quality

- Changed copyright year from 2024 to 2025, see
  [#289](https://github.com/cadeyrn/enterprise-policy-generator/issues/289)
- Enabled linting for translation files

#### Dependencies

- Added stylistic/eslint-plugin-js 4.1.0 as a new development dependency
- Added eslint/json 0.10.0 as a new development dependency
- Updated eslint from version 9.9.1 to 9.21.0, switched to flat configuration and replaced / removed deprecated rules
- Updated eslint-plugin-jsdoc from version 50.2.2 to 50.6.3
- Updated gulp-eslint-new from version 2.3.0 to 2.4.0
- Updated jsdoc from version 4.0.3 to 4.0.4
- Updated web-ext from version 8.2.0 to 8.4.0

[All Changes](https://github.com/cadeyrn/enterprise-policy-generator/compare/v6.1.0...v6.2.0)<br />
[Download Signed WebExtension](https://addons.mozilla.org/en-US/firefox/addon/enterprise-policy-generator/versions/?page=1#version-6.2.0)

---

### [Version 6.1.0](https://github.com/cadeyrn/enterprise-policy-generator/releases/tag/v6.1.0) (2024-09-07)

#### Enhancements

- Added support for a new policy type, needed for the new `ManagedBookmarks` policy, see
  [#231](https://github.com/cadeyrn/enterprise-policy-generator/issues/231)
- Added support for a new policy type, needed for the new `AllowedDomainsForApps` policy, see
  [#228](https://github.com/cadeyrn/enterprise-policy-generator/issues/228)
- Added support for a new policy type, needed for the updated `OverrideFirstRunPage` policy, see
  [#270](https://github.com/cadeyrn/enterprise-policy-generator/issues/270)
- Added support for array fields in array objects, needed for the new `AutoLaunchProtocolsFromOrigins` policy, see
  [#229](https://github.com/cadeyrn/enterprise-policy-generator/issues/229)
- Added an option for URL fields to require a secure connection (https://), see
  [#277](https://github.com/cadeyrn/enterprise-policy-generator/issues/277)
- Added an option to set an info link for array properties, see
  [#279](https://github.com/cadeyrn/enterprise-policy-generator/issues/279)
- For fields with multiple possible values, it should be possible to remove the last one, see
  [#274](https://github.com/cadeyrn/enterprise-policy-generator/issues/274)
- Legacy `Preferences` policies now use the syntax of the new `Preferences` policy, see
  [#280](https://github.com/cadeyrn/enterprise-policy-generator/issues/280)

#### Bugfixes

- Fixed several issues with the `Handlers` policy, especially when loaded from saved configurations, see
  [#272](https://github.com/cadeyrn/enterprise-policy-generator/issues/272),
  [#273](https://github.com/cadeyrn/enterprise-policy-generator/issues/273),
  [#275](https://github.com/cadeyrn/enterprise-policy-generator/issues/275),
  [#276](https://github.com/cadeyrn/enterprise-policy-generator/issues/276), and
  [#278](https://github.com/cadeyrn/enterprise-policy-generator/issues/278)
- It was possible to save preferences with an invalid preference name and use it in policies.json when loaded from
  saved configurations, see [#282](https://github.com/cadeyrn/enterprise-policy-generator/issues/282)

#### Enterprise Policies

- Added support for `ManagedBookmarks` policy to configure bookmarks managed by an administrator that cannot be
  changed by the user. Support for folders will be added in a future release, see
  [#231](https://github.com/cadeyrn/enterprise-policy-generator/issues/231)
- Added support for `AllowedDomainsForApps` policy to define domains that are allowed to access Google Workspace, see
  [#228](https://github.com/cadeyrn/enterprise-policy-generator/issues/228)
- Added support for `AutoLaunchProtocolsFromOrigins` policy to define a list of external protocols that can be used from
  listed origins without prompting the user, see
  [#229](https://github.com/cadeyrn/enterprise-policy-generator/issues/229)
- Updated `OverrideFirstRunPage` policy to allow multiple URLs, and migrated existing configurations, see
  [#270](https://github.com/cadeyrn/enterprise-policy-generator/issues/270)
- Updated the description and added an info link to the `install_sources` property of `ExtensionSettings` policy to make
  clear that match patterns are allowed for URLs, see [#279](https://github.com/cadeyrn/enterprise-policy-generator/issues/279)

#### Dependencies

- Updated eslint from version 9.6.0 to 9.9.1
- Updated eslint-plugin-jsdoc from version 48.5.0 to 50.2.2
- Updated gulp-eslint-new from version 2.1.0 to 2.3.0

[All Changes](https://github.com/cadeyrn/enterprise-policy-generator/compare/v6.0.0...v6.1.0)<br />
[Download Signed WebExtension](https://addons.mozilla.org/en-US/firefox/addon/enterprise-policy-generator/versions/?page=1#version-6.1.0)

---

### [Version 6.0.0](https://github.com/cadeyrn/enterprise-policy-generator/releases/tag/v6.0.0) (2024-06-30)

#### Enhancements

- Enterprise Policy Generator now uses Manifest v3, see
  [#188](https://github.com/cadeyrn/enterprise-policy-generator/issues/188)
- Firefox 115 or higher is required now. Also, Enterprise Policy Generator no
  longer displays the minimum required Firefox version for policies implemented before Firefox 115.0, see
  [#138](https://github.com/cadeyrn/enterprise-policy-generator/issues/138)
- Implemented a schema migrator so that policies in saved configurations can be migrated during extension updates or 
  when old configurations get imported on newer versions of the extension, see
  [#143](https://github.com/cadeyrn/enterprise-policy-generator/issues/143)
- Added support for a new policy type, needed for the `Handlers` policy, see
  [#152](https://github.com/cadeyrn/enterprise-policy-generator/issues/152)
- Added support for a new policy type, needed for the `3rdParty` policy, see
  [#78](https://github.com/cadeyrn/enterprise-policy-generator/issues/78)
- Added support for a new policy type, needed for the `Preferences` policy, see
  [#142](https://github.com/cadeyrn/enterprise-policy-generator/issues/142)
- Support for many new policies, including big ones like policies to set arbitrary preferences or to configure
  application handlers, see the detailed list below
  
#### Bugfixes

- Fixed error messages in the browser console, see
  [#141](https://github.com/cadeyrn/enterprise-policy-generator/issues/141) and
  [#169](https://github.com/cadeyrn/enterprise-policy-generator/issues/169)
- Improved enum fields so that these no longer cause empty policy objects if no value is set, see
  [#146](https://github.com/cadeyrn/enterprise-policy-generator/issues/146) 
- Configuring more than one extension in the ExtensionSettings policy was broken, see
  [#160](https://github.com/cadeyrn/enterprise-policy-generator/issues/160) and
  [#269](https://github.com/cadeyrn/enterprise-policy-generator/issues/269)
- The `RequestedLocales` policy allows an empty string to use the operating system's language. However, empty strings
  should not be allowed if more than one value is used. Also, it shouldn't be possible to add duplicate language codes,
  see [#161](https://github.com/cadeyrn/enterprise-policy-generator/issues/161)
- Integer values were parsed as strings in preference policies, see
  [#171](https://github.com/cadeyrn/enterprise-policy-generator/issues/171)

#### Notable Changes and Code Quality

- For version compatibility notes, the old Firefox shape was still used. The logo has been replaced with the current
  one, see [#134](https://github.com/cadeyrn/enterprise-policy-generator/issues/134)
- Optimized the file size of a few images, see
  [#222](https://github.com/cadeyrn/enterprise-policy-generator/issues/222)
- Replaced the translation mechanism with the newest version to share more code with other extensions and improve the
  maintainability, see [#221](https://github.com/cadeyrn/enterprise-policy-generator/issues/221)
- Changed copyright year from 2020 to 2024, see
  [#220](https://github.com/cadeyrn/enterprise-policy-generator/issues/220)
- Improved instruction for users of Apple macOS, see
  [#210](https://github.com/cadeyrn/enterprise-policy-generator/issues/210)
- Disabled native CSS outlines for input fields because we have our own focus style, see
  [#159](https://github.com/cadeyrn/enterprise-policy-generator/issues/159)
- Several code quality and code style improvements
  
#### Enterprise Policies

- Added policy to allow or prevent Firefox from messaging the user, see
  [#145](https://github.com/cadeyrn/enterprise-policy-generator/issues/145)
- Added policy to enable or disable the picture in picture (PiP) feature for videos, see
  [#151](https://github.com/cadeyrn/enterprise-policy-generator/issues/151)
- Added policy to require or prevent using a primary password; the `DisableMasterPasswordCreation` policy was removed,
  the value of the `DisableMasterPasswordCreation` policy will automatically be migrated in saved configurations, see
  [#153](https://github.com/cadeyrn/enterprise-policy-generator/issues/153)
- Added policies to either enable the legacy default behavior for SameSite cookies or to enable the legacy behavior
  for specific websites; both policies exclude each other, see
  [#154](https://github.com/cadeyrn/enterprise-policy-generator/issues/154)
- Added policy to disable the default browser agent, see
  [#155](https://github.com/cadeyrn/enterprise-policy-generator/issues/155)
- Added policy to disable or configure the built-in PDF viewer; the `DisableBuiltinPDFViewer` policy was removed, the
  value of the `DisableBuiltinPDFViewer` policy will automatically be migrated in saved configurations, see
  [#156](https://github.com/cadeyrn/enterprise-policy-generator/issues/156)
- Added policy to enable or disable specific cryptographic ciphers, see
  [#163](https://github.com/cadeyrn/enterprise-policy-generator/issues/163)
- Added policy to enable or disable Encrypted Media Extensions; the policy to enable or disable the download of the
  Widevine CDM was removed, the value will automatically be migrated in saved configurations, see
  [#164](https://github.com/cadeyrn/enterprise-policy-generator/issues/164)
- Added policy to enable or disable the automatic installation of Firefox updates; this policy and the policy to
  completely disable Firefox updates excludes each other, see
  [#166](https://github.com/cadeyrn/enterprise-policy-generator/issues/166)
- Added policy to show the home button on the toolbar, see
  [#232](https://github.com/cadeyrn/enterprise-policy-generator/issues/232)
- Added policy to preconfigure the settings for extensions that use `chrome.storage.managed`, see
  [#78](https://github.com/cadeyrn/enterprise-policy-generator/issues/78)
- Added policy to specify user-defined preferences (about:config), see
  [#142](https://github.com/cadeyrn/enterprise-policy-generator/issues/142)
- Added policy to configure the application handlers, see
  [#152](https://github.com/cadeyrn/enterprise-policy-generator/issues/152)
- Updated `Permissions` policy to control autoplay of media and access to virtual reality devices, see
  [#136](https://github.com/cadeyrn/enterprise-policy-generator/issues/136)
- Updated `EnableTrackingProtection` policy to be able to add exceptions, see
  [#144](https://github.com/cadeyrn/enterprise-policy-generator/issues/144)
- Updated `SanitizeOnShutdown` policy, so that you can only set some of them instead of all or
  nothing, and to be able to lock only some these options, all or none, see
  [#147](https://github.com/cadeyrn/enterprise-policy-generator/issues/147)
- Updated `DNSoverHTTPS` policy to be able to add excluded domains, see
  [#148](https://github.com/cadeyrn/enterprise-policy-generator/issues/148)
- Updated `Homepage` policy to be able to set the homepage to either allow or forbid optionally starting with the
  previous session, see [#149](https://github.com/cadeyrn/enterprise-policy-generator/issues/149)
- Updated `Cookies` policy to allow configuring domains where cookies are only allowed for the current session, see
  [#157](https://github.com/cadeyrn/enterprise-policy-generator/issues/157)
- Updated `Authentication` policy to enable or disable integrated authentication in private browsing, see
  [#150](https://github.com/cadeyrn/enterprise-policy-generator/issues/150)
- Updated `Authentication` policy with an option for proxy servers, see
  [#162](https://github.com/cadeyrn/enterprise-policy-generator/issues/162)
- Updated `ExtensionSettings` policy to be able to define domains on which content scripts can't be run, see
  [#165](https://github.com/cadeyrn/enterprise-policy-generator/issues/165)
- Updated `ExtensionSettings` policy to be able to disallow automatic updates for individual extensions, see
  [#230](https://github.com/cadeyrn/enterprise-policy-generator/issues/230)
- Replaced the `DisplayMenuBar` policy with a new one that accepts more options; the old policy will automatically be
  migrated in saved configurations, see [#127](https://github.com/cadeyrn/enterprise-policy-generator/issues/127)
- Removed `SearchEngines | DefaultPrivate` because this feature never reached a stable release of Firefox, see
  [#140](https://github.com/cadeyrn/enterprise-policy-generator/issues/140)
- Removed `InstallAddonsPermission` policy and migrated all data to `ExtensionSettings` policy in saved configurations,
  see [#168](https://github.com/cadeyrn/enterprise-policy-generator/issues/168)
- Removed `FlashPlugin` policy as Flash is no longer a thing, and removed it in saved configurations, see
  [#218](https://github.com/cadeyrn/enterprise-policy-generator/issues/218)
- Renamed “Firefox Account” to “Mozilla account” in `DisableFirefoxAccounts` policy, see
  [#268](https://github.com/cadeyrn/enterprise-policy-generator/issues/268)

#### Dependencies

- Added eslint-plugin-jsdoc 48.5.0
- Updated eslint from version 6.8.0 to 9.6.0 and updated configuration
- Updated eslint-plugin-xss from version 0.1.10 to 0.1.12
- Updated gulp from version 4.0.2 to 5.0.0
- Updated gulp-htmllint from version 0.0.16 to 0.0.19
- Updated gulp-jsdoc3 from version 2.0.0 to 3.0.0
- Updated htmllint configuration
- Updated jsdoc from version 3.6.3 to 4.0.3
- Updated stylelint from version 13.2.0 to 15.11.0 and updated configuration
- Updated stylelint-csstree-validator from version 1.8.0 to 3.0.0
- Updated stylelint-order from version 4.0.0 to 6.0.4
- Updated web-ext from version 4.1.0 to 8.2.0
- Replaced gulp-eslint with gulp-eslint-new 2.1.0
- Removed eslint-plugin-compat
- Removed eslint-plugin-no-unsanitized
- Removed eslint-plugin-promise

[All Changes](https://github.com/cadeyrn/enterprise-policy-generator/compare/v5.1.0...v6.0.0)<br />
[Download Signed WebExtension](https://addons.mozilla.org/en-US/firefox/addon/enterprise-policy-generator/versions/?page=1#version-6.0.0)

---

### [Version 5.1.0](https://github.com/cadeyrn/enterprise-policy-generator/releases/tag/v5.1.0) (2020-02-27)

#### Enhancements

- Added a mechanism to exclude policies from each other — for example, it doesn't make sense to use both the
  `OfferToSaveLogins` and the `OfferToSaveLoginsDefault` policy, see
  [#120](https://github.com/cadeyrn/enterprise-policy-generator/issues/120)
  
#### Bugfixes

- `SearchEngines | PreventInstalls` should be optional when using `SearchEngines` policy, see
  [#121](https://github.com/cadeyrn/enterprise-policy-generator/issues/121)
- Disabling the `LocalFileLinks` or `RequestedLocales` policy has only hidden the first field if more than one field was
  visible, see [#130](https://github.com/cadeyrn/enterprise-policy-generator/issues/130)

#### Enterprise Policies

- Added policy to doesn’t allow passwords to be revealed in saved logins (Firefox 71+), see
  [#108](https://github.com/cadeyrn/enterprise-policy-generator/issues/108) (Thanks, varshannagarajan!)
- Added an option to set the default search engine for private browsing mode (Firefox Pre-Release 71+, Firefox ESR 78+),
  see [#111](https://github.com/cadeyrn/enterprise-policy-generator/issues/111) (Thanks, varshannagarajan!)
  
#### Translations

- Added Russian translation, see [#115](https://github.com/cadeyrn/enterprise-policy-generator/issues/115)
  (Thanks, wvxwxvw!)
- Updated wording for `OfferToSaveLogins` and `OfferToSaveLoginsDefault` policies,
  see [#112](https://github.com/cadeyrn/enterprise-policy-generator/issues/112) (Thanks, musonius!)
- Fixed typo in the German translation, see [#112](https://github.com/cadeyrn/enterprise-policy-generator/issues/112)
  (Thanks, musonius!)
  
#### Code Quality

- Removed optional properties from the configuration to simplify the configuration file, see
  [#131](https://github.com/cadeyrn/enterprise-policy-generator/issues/131)
- It's no longer necessary to define the description key for every policy in the configuration file, the Enterprise
  Policy Generator now automatically picks the description from the translation files, see
  [#132](https://github.com/cadeyrn/enterprise-policy-generator/issues/132)
- Removed the `enterprise_only` property because it was only used by one policy and the `additional_note` property looks
  exactly the same, see [#133](https://github.com/cadeyrn/enterprise-policy-generator/issues/133)
  
#### Dependencies

- Updated eslint from version 6.5.1 to 6.8.0 and updated configuration
- Updated eslint-plugin-compat from version 3.3.0 to 3.5.1
- Updated eslint-plugin-xss from version 0.1.9 to 0.1.10
- Updated gulp-stylelint from version 9.0.0 to 13.0.0
- Updated stylelint from version 11.1.1 to 13.2.0
- Updated stylelint-csstree-validator from version 1.6.1 to 1.8.0
- Updated stylelint-order from version 3.1.1 to 4.0.0
- Updated web-ext from version 3.2.0 to 4.1.0

[All Changes](https://github.com/cadeyrn/enterprise-policy-generator/compare/v5.0.0...v5.1.0)<br />
[Download Signed WebExtension](https://addons.mozilla.org/en-US/firefox/addon/enterprise-policy-generator/versions/?page=1#version-5.1.0)

---

### [Version 5.0.0](https://github.com/cadeyrn/enterprise-policy-generator/releases/tag/v5.0.0) (2019-10-10)

#### Enhancements

- Deprecation of Firefox 60. Firefox 68 or higher is required now. Also, Enterprise Policy Generator no longer
  shows the minimum required Firefox version for policies older than Firefox 68.0, see
  [#80](https://github.com/cadeyrn/enterprise-policy-generator/issues/80)
- Added support for a new “preference” policy type, see
  [#89](https://github.com/cadeyrn/enterprise-policy-generator/issues/89)
- Added support for a new “key-object-list” policy type, see
  [#92](https://github.com/cadeyrn/enterprise-policy-generator/issues/92)
- Added support for a new “multiselect” policy property, see
  [#92](https://github.com/cadeyrn/enterprise-policy-generator/issues/92)
- Added mechanism for marking deprecated policies, see
  [#92](https://github.com/cadeyrn/enterprise-policy-generator/issues/92)
- Enhanced URL validation method to allow file:// URLs for URL properties, see
  [#93](https://github.com/cadeyrn/enterprise-policy-generator/issues/93)
- Enhanced URL validation method to optionally allow data:image URI for some policies, see
  [#96](https://github.com/cadeyrn/enterprise-policy-generator/issues/96)
- Some minor improvements and fixes (design, validation, translation files)

#### Enterprise Policies

- Added policy to allow specific websites to link to local files, see
  [#83](https://github.com/cadeyrn/enterprise-policy-generator/issues/83)
- Added policy to set the default download directory, see
  [#84](https://github.com/cadeyrn/enterprise-policy-generator/issues/84)
- Added policy to set the download directory and lock it, see
  [#84](https://github.com/cadeyrn/enterprise-policy-generator/issues/84)
- Added policy to ask where to save each file before downloading, see
  [#84](https://github.com/cadeyrn/enterprise-policy-generator/issues/84)
- Added policy to customize the Firefox homepage, see
  [#85](https://github.com/cadeyrn/enterprise-policy-generator/issues/85)
- Added policy to enable or disable search suggestions, see
  [#86](https://github.com/cadeyrn/enterprise-policy-generator/issues/86)
- Allow empty value for `RequestedLocales` policy to use the operating system language as Firefox language, see
  [#87](https://github.com/cadeyrn/enterprise-policy-generator/issues/87)
- Added policy to enable or disable the page that appears when opening a new tab, see
  [#88](https://github.com/cadeyrn/enterprise-policy-generator/issues/88)
- Added policy to enable or disable storing cache on the hard drive, see
  [#89](https://github.com/cadeyrn/enterprise-policy-generator/issues/89)
- Added policy to change the location of the disk cache, see
  [#89](https://github.com/cadeyrn/enterprise-policy-generator/issues/89)
- Added policy to send single words in the address bar to DNS first and not directly to the search engine, see
  [#89](https://github.com/cadeyrn/enterprise-policy-generator/issues/89)
- Added policy to display the punycode version of internationalized domain names, see
  [#89](https://github.com/cadeyrn/enterprise-policy-generator/issues/89)
- Added policy to control the preference to suggest bookmarks when using the address bar, see
  [#89](https://github.com/cadeyrn/enterprise-policy-generator/issues/89)
- Added policy to control the preference to suggest browsing history when using the address bar, see
  [#89](https://github.com/cadeyrn/enterprise-policy-generator/issues/89)
- Added policy to control the preference to suggest open tabs when using the address bar, see
  [#89](https://github.com/cadeyrn/enterprise-policy-generator/issues/89)
- Added policy to hide the privacy policy tab on the first run, see
  [#89](https://github.com/cadeyrn/enterprise-policy-generator/issues/89)
- Added policy to restore old behavior regarding keypress event and non-printable keys for certain domains, see
  [#89](https://github.com/cadeyrn/enterprise-policy-generator/issues/89)
- Added policy to restore old behavior regarding `keyCode` and `charCode` for certain domains, see
  [#89](https://github.com/cadeyrn/enterprise-policy-generator/issues/89)
- Added policy to disable the search for search engine updates, see
  [#89](https://github.com/cadeyrn/enterprise-policy-generator/issues/89)
- Added policy to disable the warning when the browser is closed, see
  [#89](https://github.com/cadeyrn/enterprise-policy-generator/issues/89)
- Added policy to disallow websites to override the context menu, see
  [#89](https://github.com/cadeyrn/enterprise-policy-generator/issues/89)
- Added policy to disallow websites to move and resize windows, see
  [#89](https://github.com/cadeyrn/enterprise-policy-generator/issues/89)
- Added policy to allow websites to monkey with window focus, see
  [#89](https://github.com/cadeyrn/enterprise-policy-generator/issues/89)
- Added policy to hide the recommendations tab in the add-ons manager, see
  [#89](https://github.com/cadeyrn/enterprise-policy-generator/issues/89)
- Added policy to disable download of the Widevine plugin, see
  [#89](https://github.com/cadeyrn/enterprise-policy-generator/issues/89)
- Added policy to disable download of the OpenH264 plugin, see
  [#89](https://github.com/cadeyrn/enterprise-policy-generator/issues/89)
- Added policy to disable IPv6 DNS lookups, see
  [#89](https://github.com/cadeyrn/enterprise-policy-generator/issues/89)
- Added policy to disable browsing history, see
  [#89](https://github.com/cadeyrn/enterprise-policy-generator/issues/89)
- Added policy to automatically choose the default personal certificate, see
  [#89](https://github.com/cadeyrn/enterprise-policy-generator/issues/89)
- Added policy to disable the feature to send TLS errors to Mozilla, see
  [#89](https://github.com/cadeyrn/enterprise-policy-generator/issues/89)
- Added policy to disable the <kbd>Alt</kbd> key to show the menu bar on Windows and Linux, see
  [#89](https://github.com/cadeyrn/enterprise-policy-generator/issues/89)
- Added policy to allow local files to access other local files (Firefox 68.0.1+, Firefox ESR 68.1+), see
  [#89](https://github.com/cadeyrn/enterprise-policy-generator/issues/89)
- Replaced the old `SanitizeOnShutdown` policy to clear all data on shutdown with new selective `SanitizeOnShutdown`
  policy. Users of the old policy: Please have a look at your configuration and adjust accordingly, see
  [#91](https://github.com/cadeyrn/enterprise-policy-generator/issues/91)
- Added policy to manage the installation and uninstallation of add-ons, see
  [#92](https://github.com/cadeyrn/enterprise-policy-generator/issues/92)
- Re-added `DisableSafeMode` policy (removed in Enterprise Policy Generator 4.1.0), but with a better description, see
  [#94](https://github.com/cadeyrn/enterprise-policy-generator/issues/94)
- Improved labels for the `Certificates |A dd` policy, see
  [#95](https://github.com/cadeyrn/enterprise-policy-generator/issues/95)
- Allow data:image URI for `IconURL` property of `SearchEngine | Add` policy, see
  [#96](https://github.com/cadeyrn/enterprise-policy-generator/issues/96)
- Added policy to completely disable the password manager (Firefox 70+, Firefox ESR 68.2+), see
  [#98](https://github.com/cadeyrn/enterprise-policy-generator/issues/98)
- Added policy to set the default value for allowing Firefox to offer to remember saved logins and passwords
  (Firefox 70+, Firefox ESR 68.2+), see [#99](https://github.com/cadeyrn/enterprise-policy-generator/issues/99)
- Added `Cryptomining` and `Fingerprinting` to `EnableTrackingProtection` policy (Firefox 70+, Firefox ESR 68.2+), and
  changed some wording to better align with the current wording of Firefox, see
  [#100](https://github.com/cadeyrn/enterprise-policy-generator/issues/100)
- The `Authentication` policy can optionally be locked starting with Firefox 71, was always locked before, see
  [#104](https://github.com/cadeyrn/enterprise-policy-generator/issues/104)
  
#### Translations

- Fixed the French translation (some translations were not used because of broken translation keys)
- Unified some phrases in German translation

#### Dependencies

- Updated eslint from version 5.15.3 to 6.5.1 and updated configuration
- Updated eslint-plugin-compat from version 3.0.1 to 3.3.0
- Updated eslint-plugin-promise from version 4.0.1 to 4.2.1
- Updated gulp from version 4.0.0 to 4.0.2
- Updated gulp-eslint from version 5.0.0 to 6.0.0
- Updated gulp-stylelint from version 8.0.0 to 9.0.0
- Updated htmllint from version 0.7.3 to 0.8.0
- Updated jsdoc from version 3.5.5 to 3.6.3
- Updated stylelint from version 9.10.1 to 11.1.1 and updated configuration
- Updated stylelint-csstree-validator from version 1.3.0 to 1.6.1
- Updated stylelint-order from version 2.1.0 to 3.1.1
- Updated web-ext from version 3.0.0 to 3.2.0

[All Changes](https://github.com/cadeyrn/enterprise-policy-generator/compare/v4.4.0...v5.0.0)<br />
[Download Signed WebExtension](https://addons.mozilla.org/en-US/firefox/addon/enterprise-policy-generator/versions/?page=1#version-5.0.0)

---

### [Version 4.4.0](https://github.com/cadeyrn/enterprise-policy-generator/releases/tag/v4.4.0) (2019-03-20)

#### Enterprise Policies

- Added policy to enable or disable captive portal support (Firefox 67+, Firefox ESR 60.7+), see
  [#69](https://github.com/cadeyrn/enterprise-policy-generator/issues/69)
- Added policy to enable or disable network prediction (DNS prefetching) (Firefox 67+, Firefox ESR 60.7+), see
  [#71](https://github.com/cadeyrn/enterprise-policy-generator/issues/71)
- Added policy to enable or disable automatic extension updates (Firefox 67+, Firefox ESR 60.7+), see
  [#73](https://github.com/cadeyrn/enterprise-policy-generator/issues/73)
- Added policy to add a custom support menu item to the help menu (Firefox 67+, Firefox ESR 60.7+), see
  [#74](https://github.com/cadeyrn/enterprise-policy-generator/issues/74)
- Added support for the POST method in `SearchEngines` policy (Firefox 67+, Firefox ESR 60.7+), see
  [#76](https://github.com/cadeyrn/enterprise-policy-generator/issues/76)
- It's now possible to enable the default browser check on startup, not only to disable it (Firefox 66+,
  Firefox ESR 60.6+), see [#77](https://github.com/cadeyrn/enterprise-policy-generator/issues/77)
- Changed the description of the `DisableFirefoxStudies` policy to reflect that the policy not only disables shield
  studies, but also contextual feature recommendations, see
  [#75](https://github.com/cadeyrn/enterprise-policy-generator/issues/75)

#### Dependencies

- Updated eslint from version 5.12.1 to 5.15.3
- Updated eslint-plugin-compat from version 2.6.3 to 3.0.1
- Updated stylelint-order from version 2.0.0 to 2.1.0
- Updated web-ext from version 2.9.3 to 3.0.0

[All Changes](https://github.com/cadeyrn/enterprise-policy-generator/compare/v4.3.0...v4.4.0)<br />
[Download Signed WebExtension](https://addons.mozilla.org/en-US/firefox/addon/enterprise-policy-generator/versions/?page=1#version-4.4.0)

---

### [Version 4.3.0](https://github.com/cadeyrn/enterprise-policy-generator/releases/tag/v4.3.0) (2019-01-28)

#### Enhancements

- Policies with select field can now have a different default value than the first one, see
  [#67](https://github.com/cadeyrn/enterprise-policy-generator/issues/67)
- Added support for a new “key-value-pairs” policy type, see
  [#48](https://github.com/cadeyrn/enterprise-policy-generator/issues/48)

#### Enterprise Policies

- Added policies to set the minimum required and the maximum supported TLS version (Firefox 66+), see
  [#66](https://github.com/cadeyrn/enterprise-policy-generator/issues/66)
- Added policy for adding PKCS #11 security modules (Firefox 64+, Firefox ESR 60.4+), see
  [#48](https://github.com/cadeyrn/enterprise-policy-generator/issues/48)

#### Dependencies

- Updated eslint from version 5.10.0 to 5.12.1 and updated eslint configuration
- Updated gulp from version 3.9.1 to 4.0.0
- Updated htmllint from version 0.7.2 to 0.7.3 and added one new rule
- Updated stylelint from version 9.9.0 to 9.10.1 and added one new rule
- Updated web-ext from version 2.9.2 to 2.9.3

[All Changes](https://github.com/cadeyrn/enterprise-policy-generator/compare/v4.2.0...v4.3.0)<br />
[Download Signed WebExtension](https://addons.mozilla.org/en-US/firefox/addon/enterprise-policy-generator/versions/?page=1#version-4.3.0)

---

### [Version 4.2.0](https://github.com/cadeyrn/enterprise-policy-generator/releases/tag/v4.2.0) (2018-12-10)

#### Enhancements

- Added a note that starting with Firefox 63 there is an overview of all active policies and errors in the file
  “policies.json” at about:policies, see [#38](https://github.com/cadeyrn/enterprise-policy-generator/issues/38)

#### Enterprise Policies

- Added policy to change the interface language of Firefox (Firefox 64+, Firefox ESR 60.3.1+), see
  [#52](https://github.com/cadeyrn/enterprise-policy-generator/issues/52)
- Added an option to start Firefox with an empty page or the previous session as part of the `Homepage` policy
  (Firefox 64+, Firefox ESR 60.3.1+), see [#54](https://github.com/cadeyrn/enterprise-policy-generator/issues/54)
- Added an option to import certificates as part of the `Certificates` policy
  (Firefox 64+, Firefox ESR 60.3.1+), see [#60](https://github.com/cadeyrn/enterprise-policy-generator/issues/60)

#### Dependencies

- Updated eslint from version 5.9.0 to 5.10.0
- Updated npm-run-all from version 4.1.3 to 4.1.5
- Updated stylelint from version 9.8.0 to 9.9.0
- Updated stylelint-order from version 1.0.0 to 2.0.0

[All Changes](https://github.com/cadeyrn/enterprise-policy-generator/compare/v4.1.1...4.2.0)<br />
[Download Signed WebExtension](https://addons.mozilla.org/en-US/firefox/addon/enterprise-policy-generator/versions/?page=1#version-4.2.0)

---

### [Version 4.1.1](https://github.com/cadeyrn/enterprise-policy-generator/releases/tag/v4.1.1) (2018-11-18)
  
#### Bugfixes

- Fixed a bug that caused saved configurations not to load under certain circumstances, see
  [#63](https://github.com/cadeyrn/enterprise-policy-generator/issues/63)
  
#### Translations

- Fixed typo in English translation (Thanks, a1346054!), see [#62](https://github.com/cadeyrn/enterprise-policy-generator/pull/62)

#### Dependencies

- Updated eslint from version 5.8.0 to 5.9.0
- Updated stylelint from version 9.7.1 to 9.8.0
- Updated web-ext from version 2.9.1 to 2.9.2

[All Changes](https://github.com/cadeyrn/enterprise-policy-generator/compare/v4.1.0...v4.1.1)<br />
[Download Signed WebExtension](https://addons.mozilla.org/en-US/firefox/addon/enterprise-policy-generator/versions/?page=1#version-4.1.1)

---

### [Version 4.1.0](https://github.com/cadeyrn/enterprise-policy-generator/releases/tag/v4.1.0) (2018-11-04)

#### Enhancements

- Added support for additional policy notes, for example, if a policy is not supported on all operating systems, see
  [#57](https://github.com/cadeyrn/enterprise-policy-generator/issues/57)
  
#### Bugfixes

- Fixed a bug which caused that the order of bookmarks was wrong when loading a saved configuration, see
  [#47](https://github.com/cadeyrn/enterprise-policy-generator/issues/47)
  
#### Enterprise Policies

- Added policy to configure DNS over HTTPS (Firefox 63+), see
  [#53](https://github.com/cadeyrn/enterprise-policy-generator/issues/53)
- Added a note that the policy to hide the menu bar is Windows / Linux only, see
  [#56](https://github.com/cadeyrn/enterprise-policy-generator/issues/56)
- Added a note that the policy to read certificates from the system certificate store also works on macOS starting
  with Firefox 63, see [#39](https://github.com/cadeyrn/enterprise-policy-generator/issues/39)
- Added a note that the option not to read certificates from the system certificate store only works on Firefox 64
  and higher, see [#46](https://github.com/cadeyrn/enterprise-policy-generator/issues/46)
- Removed the policy to disable the safe mode because it's not supported via policies.json, only via GPO, see
  [#58](https://github.com/cadeyrn/enterprise-policy-generator/issues/58)

#### Dependencies

- Updated eslint from version 5.5.0 to 5.8.0
- Updated eslint-plugin-compat from version 2.5.1 to 2.6.3
- Updated eslint-plugin-promise from version 4.0.0 to 4.0.1
- Updated gulp-stylelint from version 7.0.0 to 8.0.0
- Updated stylelint from version 9.5.0 to 9.7.1

[All Changes](https://github.com/cadeyrn/enterprise-policy-generator/compare/v4.0.0...v4.1.0)<br />
[Download Signed WebExtension](https://addons.mozilla.org/en-US/firefox/addon/enterprise-policy-generator/versions/?page=1#version-4.1.0)

---

### [Version 4.0.0](https://github.com/cadeyrn/enterprise-policy-generator/releases/tag/v4.0.0) (2018-09-01)

#### Enhancements

- **A filter field has been added. Both the descriptions of the policies and the internal policy names can be
  searched**, see [#14](https://github.com/cadeyrn/enterprise-policy-generator/issues/14)

#### Enterprise Policies

- Added option to reject trackers for cookies policy (Firefox 63+), see
  [#40](https://github.com/cadeyrn/enterprise-policy-generator/issues/40)
- The policy to disable telemetry is also available from Firefox 62, see
  [#36](https://github.com/cadeyrn/enterprise-policy-generator/issues/36)
- The policy to set or lock the homepage is also available from Firefox 62, see
  [#36](https://github.com/cadeyrn/enterprise-policy-generator/issues/36)
- The policy to set the default location of the search bar is also available from Firefox 62, see
  [#36](https://github.com/cadeyrn/enterprise-policy-generator/issues/36)
- The policy to install, uninstall, or lock extensions is also available from Firefox 62, see
  [#36](https://github.com/cadeyrn/enterprise-policy-generator/issues/36)
- The policy to block websites from being visited is also available from Firefox 62, see
  [#36](https://github.com/cadeyrn/enterprise-policy-generator/issues/36)
- The policy to configure integrated authentication is also available from Firefox 62, see
  [#36](https://github.com/cadeyrn/enterprise-policy-generator/issues/36)
- The policy to override the first run page is also available from Firefox 62, see
  [#36](https://github.com/cadeyrn/enterprise-policy-generator/issues/36)
- The policy to override the post-update “What's New” page is also available from Firefox 62, see
  [#36](https://github.com/cadeyrn/enterprise-policy-generator/issues/36)
- Policy to configure integrated authentication: “Always allow SPNEGO or NTLM on non-FQDNs” is also available from
  Firefox 62 and Firefox ESR 60.2, see [#36](https://github.com/cadeyrn/enterprise-policy-generator/issues/36)
- The policy to set a different server URL for Firefox updates is also available from Firefox 62 and Firefox ESR 60.2,
  see [#36](https://github.com/cadeyrn/enterprise-policy-generator/issues/36)
  
#### Translations

- Updated Simplified Chinese translation (Thanks, fang5566!), see [#37](https://github.com/cadeyrn/enterprise-policy-generator/issues/37)

#### Dependencies

- Updated eslint from version 5.3.0 to 5.5.0
- Updated gulp-htmllint from version 0.0.15 to 0.0.16
- Updated stylelint from version 9.4.0 to 9.5.0
- Updated stylelint-order from version 0.8.1 to 1.0.0
- Updated web-ext from version 2.8.0 to 2.9.1

[All Changes](https://github.com/cadeyrn/enterprise-policy-generator/compare/v3.1.1...v4.0.0)<br />
[Download Signed WebExtension](https://addons.mozilla.org/en-US/firefox/addon/enterprise-policy-generator/versions/?page=1#version-4.0.0)

---

### [Version 3.1.1](https://github.com/cadeyrn/enterprise-policy-generator/releases/tag/v3.1.1) (2018-08-08)

#### Translations

- Updated Simplified Chinese translation (Thanks, yfdyh000!), see [#35](https://github.com/cadeyrn/enterprise-policy-generator/issues/35)
- Fixed typo in English translation

[All Changes](https://github.com/cadeyrn/enterprise-policy-generator/compare/v3.1.0...v3.1.1)<br />
[Download Signed WebExtension](https://addons.mozilla.org/en-US/firefox/addon/enterprise-policy-generator/versions/?page=1#version-3.1.1)

---

### [Version 3.1.0](https://github.com/cadeyrn/enterprise-policy-generator/releases/tag/v3.1.0) (2018-08-05)

#### Enhancements

- Small design improvements, see [#32](https://github.com/cadeyrn/enterprise-policy-generator/issues/32) and
  [#33](https://github.com/cadeyrn/enterprise-policy-generator/issues/33)

#### Translations

- Added Simplified Chinese translation (Thanks, fang5566!), see
  [#31](https://github.com/cadeyrn/enterprise-policy-generator/issues/31)

#### Code Quality

- Use flexbox for two column layout instead of floats, fixed by
  [#33](https://github.com/cadeyrn/enterprise-policy-generator/issues/33)
- Use CSS variables for most colors, see [#34](https://github.com/cadeyrn/enterprise-policy-generator/issues/34)

#### Dependencies

- Updated eslint from version 5.2.0 to 5.3.0
- Updated stylelint from version 9.3.0 to 9.4.0
- Updated web-ext from version 2.7.0 to 2.8.0

[All Changes](https://github.com/cadeyrn/enterprise-policy-generator/compare/v3.0.0...v3.1.0)<br />
[Download Signed WebExtension](https://addons.mozilla.org/en-US/firefox/addon/enterprise-policy-generator/versions/?page=1#version-3.1.0)

---

### [Version 3.0.0](https://github.com/cadeyrn/enterprise-policy-generator/releases/tag/v3.0.0) (2018-07-24)

#### Enhancements

- **Configurations could already be saved and loaded at a later time since version 2.0.0. Now configurations can also be
  exported and reimported on other devices**, see
  [#22](https://github.com/cadeyrn/enterprise-policy-generator/issues/22)
- **Added a basic validation for fields where a valid URL is required**. Basic means simple protocol check (https:// or
  http://) because a full URL validation is a science, see
  [#11](https://github.com/cadeyrn/enterprise-policy-generator/issues/11)
- Show a notice in the list configurations dialog if no configurations have been saved yet, see
  [#24](https://github.com/cadeyrn/enterprise-policy-generator/issues/24)
- Set focus to the first input or the first select field when checking a policy checkbox or when adding a new array
  field, set focus to the previous field when removing an array field, see
  [#13](https://github.com/cadeyrn/enterprise-policy-generator/issues/13)

#### Enterprise Policies

- Added policy to configure permissions for location, camera, microphone, and notifications (Firefox 62+, Firefox ESR
  60.2+), see [#18](https://github.com/cadeyrn/enterprise-policy-generator/issues/18)
- Added policy to set a different server URL for Firefox updates (Firefox 63+), see
  [#29](https://github.com/cadeyrn/enterprise-policy-generator/issues/29)
- Added option for policy to configure integrated authentication: always allow SPNEGO or NTLM on non fully qualified
  domain names (Firefox 63+), see [#23](https://github.com/cadeyrn/enterprise-policy-generator/issues/23)
- The policy to disable Firefox updates is no longer ESR only and is also available from Firefox 62, see
  [#25](https://github.com/cadeyrn/enterprise-policy-generator/issues/25)
- The policy to disable system add-on updates is no longer ESR only and is also available from Firefox 62, see
  [#25](https://github.com/cadeyrn/enterprise-policy-generator/issues/25)
- The policy to disable telemetry is no longer ESR only and is also available from Firefox 63, see
  [#25](https://github.com/cadeyrn/enterprise-policy-generator/issues/25)
- The policy to set or lock the homepage is no longer ESR only and is also available from Firefox 63, see
  [#25](https://github.com/cadeyrn/enterprise-policy-generator/issues/25)
- The policy to set the default location of the search bar is no longer ESR only and is also available from Firefox 63,
  see [#25](https://github.com/cadeyrn/enterprise-policy-generator/issues/25)
- The policy to install, uninstall, or lock extensions is no longer ESR only and is also available from Firefox 63, see
  [#25](https://github.com/cadeyrn/enterprise-policy-generator/issues/25)
- The policy to block websites from being visited is no longer ESR only and is also available from Firefox 63, see
  [#25](https://github.com/cadeyrn/enterprise-policy-generator/issues/25)
- The policy to configure integrated authentication is no longer ESR only and is also available from Firefox 63, see
  [#25](https://github.com/cadeyrn/enterprise-policy-generator/issues/25)
- The policy to override the first run page is no longer ESR only and is also available from Firefox 63, see
  [#25](https://github.com/cadeyrn/enterprise-policy-generator/issues/25)
- The policy to override the post-update “What's New” page is no longer ESR only and is also available from Firefox 63,
  see [#25](https://github.com/cadeyrn/enterprise-policy-generator/issues/25)
- The policy to disable hardware acceleration is also available from Firefox ESR 60.2, see
  [#25](https://github.com/cadeyrn/enterprise-policy-generator/issues/25)
- The option to remove search engines in the `SearchEngines` policy is also available from Firefox ESR 60.2, see
  [#25](https://github.com/cadeyrn/enterprise-policy-generator/issues/25)

#### Translations

- Updated French translation (Thanks, Rom!)

#### Dependencies

- Migrated from gulp-html-lint 0.0.2 to gulp-htmllint 0.0.15 because gulp-html-lint is no longer maintained
- Updated eslint from version 5.0.0 to 5.2.0
- Updated eslint-plugin-compat from version 2.4.0 to 2.5.1
- Updated gulp-eslint from version 4.0.2 to 5.0.0

[All Changes](https://github.com/cadeyrn/enterprise-policy-generator/compare/v2.0.0...v3.0.0)<br />
[Download Signed WebExtension](https://addons.mozilla.org/en-US/firefox/addon/enterprise-policy-generator/versions/?page=1#version-3.0.0)

---

### [Version 2.0.0](https://github.com/cadeyrn/enterprise-policy-generator/releases/tag/v2.0.0) (2018-06-24)

#### Enhancements

- **Now with configuration management!** You can save any number of different configurations, load them at a later time
  (and of course delete them), see [#3](https://github.com/cadeyrn/enterprise-policy-generator/issues/3)
- **Shows minimum required Firefox version!** If a policy requires a newer version than Firefox 60.0 or Firefox ESR
  60.0, a notice is displayed, see [#4](https://github.com/cadeyrn/enterprise-policy-generator/issues/4)
- Some design improvements

#### Enterprise Policies

- New policy to disable hardware acceleration (Firefox 62+), see
  [#9](https://github.com/cadeyrn/enterprise-policy-generator/issues/9)
- Added the option to remove search engines to the `SearchEngines` policy (Firefox 62+), see
  [#19](https://github.com/cadeyrn/enterprise-policy-generator/issues/19)

#### Translations

- Added French translation (Thanks, Rom!)

#### Dependencies

- Updated eslint from version 4.19.1 to 5.0.0
- Updated eslint-plugin-compat from version 2.3.0 to 2.4.0
- Updated stylelint from version 9.2.1 to 9.3.0
- Updated stylelint-csstree-validator from version 9.2.1 to 9.3.0

[All Changes](https://github.com/cadeyrn/enterprise-policy-generator/compare/v1.1.0...v2.0.0)<br />
[Download Signed WebExtension](https://addons.mozilla.org/en-US/firefox/addon/enterprise-policy-generator/versions/?page=1#version-2.0.0)

---

### [Version 1.1.0](https://github.com/cadeyrn/enterprise-policy-generator/releases/tag/v1.1.0) (2018-05-27)

#### Enhancements

- **The downloads permission is no longer mandatory!** This means that the extension can now be used completely
  without any special permission. If you want to download the “policies.json” file, you can easily grant the
  permission at runtime, see [#5](https://github.com/cadeyrn/enterprise-policy-generator/issues/5)

#### Translations

- Added Upper Sorbian translation (Thanks, milupo!)
- Added Lower Sorbian translation (Thanks, milupo!)

#### Code Quality

- A lot of code refactoring to improve code maintainability and to make it easier for others to contribute to the
  code base, see [#8](https://github.com/cadeyrn/enterprise-policy-generator/issues/8)

#### Dependencies

- Updated eslint-plugin-compat from version 2.2.0 to 2.3.0
- Updated eslint-plugin-no-unsanitized from version 3.0.1 to 3.0.2
- Updated web-ext from version 2.6.0 to 2.7.0

[All Changes](https://github.com/cadeyrn/enterprise-policy-generator/compare/v1.0.1...v1.1.0)<br />
[Download Signed WebExtension](https://addons.mozilla.org/en-US/firefox/addon/enterprise-policy-generator/versions/?page=1#version-1.1.0)

---

### [Version 1.0.1](https://github.com/cadeyrn/enterprise-policy-generator/releases/tag/v1.0.1) (2018-05-20)

#### Translations

- Fixed typo in English translation

[All Changes](https://github.com/cadeyrn/enterprise-policy-generator/compare/v1.0.0...v1.0.1)<br />
[Download Signed WebExtension](https://addons.mozilla.org/en-US/firefox/addon/enterprise-policy-generator/versions/?page=1#version-1.0.1)

---

### [Version 1.0.0](https://github.com/cadeyrn/enterprise-policy-generator/releases/tag/v1.0.0) (2018-05-20)

- Initial release for [addons.mozilla.org](https://addons.mozilla.org/en-US/firefox/addon/enterprise-policy-generator/)

#### Features of the first version

- Click together the desired Enterprise Policies
- Supports all policies that are supported by Firefox 60
- Validation for mandatory fields
- Special marking of policies that only work with Firefox ESR
- Info links for some policies to get additional information

[Download Signed WebExtension](https://addons.mozilla.org/en-US/firefox/addon/enterprise-policy-generator/versions/?page=1#version-1.0.0)
