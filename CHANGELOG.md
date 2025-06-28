# Firefox Add-on: Enterprise Policy Generator

## Release Notes

### Version 6.6.0 (Work in Progress)

#### Enhancements

- If a filter was active and the user interface was reloaded, the search term was still in the filter field, but the
  filter was not active and the input field was not visible. Now the filter remains active, see
  [#318](https://github.com/cadeyrn/enterprise-policy-generator/issues/318)
- It was already possible to exclude another policy with a specific value, but it was not possible to exclude another
  policy if the current policy has a specific value. This is now possible, see
  [#300](https://github.com/cadeyrn/enterprise-policy-generator/issues/300)
- The Preferences policy does not allow the use of all Firefox options. There has already been a validation to ensure
  that no option name is used that is not allowed to be used or does not start with a certain prefix. However, there are
  also a few options that start with a permitted prefix but are still not allowed. These options are now also recognized
  as incorrect by the validation, see [#309](https://github.com/cadeyrn/enterprise-policy-generator/issues/309)
- Added support for number fields, used in new ContentAnalysis policy, see
  [#321](https://github.com/cadeyrn/enterprise-policy-generator/issues/321)
- The field descriptions should not take up more space in width than the fields themselves, see
  [#322](https://github.com/cadeyrn/enterprise-policy-generator/issues/322)

#### Enterprise Policies

- The UseSystemPrintDialog and PrintingEnabled=false policies should exclude each other, see
  [#319](https://github.com/cadeyrn/enterprise-policy-generator/issues/319)
- Removed support for the DisablePocket policy because Pocket will be shut down next month, see
  [#303](https://github.com/cadeyrn/enterprise-policy-generator/issues/303)
- Removed support for the legacy preference policies privacy.file_unique_origin and security.ssl.errorReporting.enabled,
  because these options no longer exist in Firefox, see
  [#320](https://github.com/cadeyrn/enterprise-policy-generator/issues/320)

#### Dependencies

- Updated eslint from version 9.28.0 to 9.30.0
- Updated eslint-plugin-jsdoc from version 50.8.0 to 51.2.3
- Updated stylelint from version 16.20.0 to 16.21.0
- Updated stylistic/eslint-plugin from version 4.4.1 to 5.0.0
- Updated web-ext from version 8.7.1 to 8.8.0

---

### [Version 6.5.0](https://github.com/cadeyrn/enterprise-policy-generator/releases/tag/v6.5.0) (2025-06-11)

#### Enhancements

- Improved nested-object policy type, needed for Containers policy, see
  [#252](https://github.com/cadeyrn/enterprise-policy-generator/issues/252)
- Added support for sorting enum fields by their localized labels, used in new Containers policy, see
  [#302](https://github.com/cadeyrn/enterprise-policy-generator/issues/302)

#### Enterprise Policies

- Added support for Containers policy to set the initial set of tab containers, see
  [#252](https://github.com/cadeyrn/enterprise-policy-generator/issues/252)
- Added support for AllowFileSelectionDialogs policy to disable file selection dialogs, see
  [#258](https://github.com/cadeyrn/enterprise-policy-generator/issues/258)
- Added support for DisableEncryptedClientHello policy to disable use of the TLS feature Encrypted Client Hello (ECH),
  see [#261](https://github.com/cadeyrn/enterprise-policy-generator/issues/261)
- Added Fallback option to DNSOverHTTPS policy to determines whether Firefox will use your default DNS resolver if there
  is a problem with the secure DNS provider, see
  [#262](https://github.com/cadeyrn/enterprise-policy-generator/issues/262)
- Added support for HttpAllowlist policy to configure sites that will not automatically be upgraded to HTTPS, see
  [#264](https://github.com/cadeyrn/enterprise-policy-generator/issues/264)
- Added support for HttpsOnlyMode policy to configure the HTTPS-Only mode, see
  [#265](https://github.com/cadeyrn/enterprise-policy-generator/issues/265)
- Added support for PostQuantumKeyAgreementEnabled policy to enable or disable post-quantum key agreement for TLS, see
  [#266](https://github.com/cadeyrn/enterprise-policy-generator/issues/266)
- Added support for TranslateEnabled policy to enable or disable the local translation feature, see
  [#267](https://github.com/cadeyrn/enterprise-policy-generator/issues/267)
- Added support for PrivateBrowsingModeAvailability policy to set the availability of private windows. It cannot be
  used together with the DisablePrivateBrowsing policy, see
  [#281](https://github.com/cadeyrn/enterprise-policy-generator/issues/281)
- Added FirefoxLabs option to UserMessaging policy to enable or disable the “Firefox Labs” section in the Firefox
  settings, see [#284](https://github.com/cadeyrn/enterprise-policy-generator/issues/284)
- Added support for MicrosoftEntraSSO policy to allow single sign-on for Microsoft Entra accounts, see
  [#285](https://github.com/cadeyrn/enterprise-policy-generator/issues/285)
- Added support for identity.fxaccounts.toolbar. and security.block_fileuri_script_with_wrong_mime in Preferences
  policy, see [#286](https://github.com/cadeyrn/enterprise-policy-generator/issues/286)
- Added private_browsing option to ExtensionSettings policy to configure whether an extension should be enabled in
  private browsing, see [#287](https://github.com/cadeyrn/enterprise-policy-generator/issues/287)
- Starting with Firefox 139, the SearchEngines policy is no longer ESR only, see
  [#298](https://github.com/cadeyrn/enterprise-policy-generator/issues/298)
- Removed WhatsNew option from UserMessaging policy (Thanks, berkaynayman!) and removed it from existing configurations,
  see [#310](https://github.com/cadeyrn/enterprise-policy-generator/issues/310)
- Added support for additional cryptographic ciphers to DisabledCiphers policy, see
  [#312](https://github.com/cadeyrn/enterprise-policy-generator/issues/312)

#### Translations

- Fixed wrong environment variable in description of Certificates|Install policy, see
  [#317](https://github.com/cadeyrn/enterprise-policy-generator/issues/317)
- Updated wording for AutofillAddressEnabled and AutofillCreditCardEnabled policies
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

- Added support for AutofillAddressEnabled policy to enable or disable the saving and automatic filling for addresses,
  see [#250](https://github.com/cadeyrn/enterprise-policy-generator/issues/250)
- Added support for AutofillCreditCardEnabled policy to enable or disable the saving and automatic filling for payment
  methods, see [#251](https://github.com/cadeyrn/enterprise-policy-generator/issues/251)
- Added support for FirefoxSuggest policy to configure Firefox Suggest feature (US only), see
  [#256](https://github.com/cadeyrn/enterprise-policy-generator/issues/256)
- Added support for PrintingEnabled policy to enable or disable printing, see
  [#257](https://github.com/cadeyrn/enterprise-policy-generator/issues/257)
- Added support for SkipTermsOfUse policy to skip the terms of use and privacy notice when Firefox is started for the
  first time (Firefox 138+), see [#299](https://github.com/cadeyrn/enterprise-policy-generator/issues/299)
- Added default_area option to ExtensionSettings policy to define the initial placement of the extension button, see
  [#255](https://github.com/cadeyrn/enterprise-policy-generator/issues/255)
- Added EmailTracking option to EnableTrackingProtection policy to block e-mail tracking, see
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

- Added support for version pattern validations, needed for AppUpdatePin policy, see
  [#294](https://github.com/cadeyrn/enterprise-policy-generator/issues/294)
- Added support for boolean options in key-object-list policies, needed for updated ExtensionSettings policy, see
  [#295](https://github.com/cadeyrn/enterprise-policy-generator/issues/295)
- Added support for key-value-pairs options in object policies, needed for updated SecurityDevices policy, see
  [#297](https://github.com/cadeyrn/enterprise-policy-generator/issues/297)

#### Enterprise Policies

- Added support for AppUpdatePin policy to prevent Firefox from being updated beyond the specified version, see
  [#241](https://github.com/cadeyrn/enterprise-policy-generator/issues/241)
- Added support for StartDownloadsInTempDirectory policy to force downloads to start in a temporary location rather than
  in the default download directory, see [#247](https://github.com/cadeyrn/enterprise-policy-generator/issues/247)
- Added support for UseSystemPrintDialog policy to use the system print dialog instead of the print preview window, see
  [#249](https://github.com/cadeyrn/enterprise-policy-generator/issues/249)
- Added support for ExemptDomainFileTypePairsFromFileTypeDownloadWarnings policy to disable download warnings based on
  file extension and domains, see [#243](https://github.com/cadeyrn/enterprise-policy-generator/issues/243)
- Added support for GoToIntranetSiteForSingleWordEntryInAddressBar policy to force direct intranet site navigation
  instead of searching when typing single word entries in the address bar, see
  [#245](https://github.com/cadeyrn/enterprise-policy-generator/issues/245)
- Added MoreFromMozilla option to UserMessaging policy to show or hide “More from Mozilla” section in the settings, see
  [#248](https://github.com/cadeyrn/enterprise-policy-generator/issues/248)
- Added temporarily_allow_weak_signatures option in the ExtensionSettings policy to allow installation of extensions
  with a weak signature algorithm (Firefox 127+), see
  [#263](https://github.com/cadeyrn/enterprise-policy-generator/issues/263)
- Added sitepermission as possible type for the allowed_types option in the ExtensionSettings policy to allow the
  installation of site permission but not other types of add-ons, see
  [#244](https://github.com/cadeyrn/enterprise-policy-generator/issues/244)
- Updated DisplayBookmarksToolbar policy to support only showing the bookmarks toolbar for new tabs, and migrated policy
  in existing configurations, see [#242](https://github.com/cadeyrn/enterprise-policy-generator/issues/242)
- Updated SecurityDevices policy to support new syntax for adding devices, to support removing devices, and added
  migration for existing configurations, see [#246](https://github.com/cadeyrn/enterprise-policy-generator/issues/246)
- AppUpdateURL and DisableAppUpdate should exclude each other, see
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

- Allow to exclude multiple policies and to exclude a policy by its value, see
  [#288](https://github.com/cadeyrn/enterprise-policy-generator/issues/288)
- Added option for URL validation to flat-array policies, see
  [#291](https://github.com/cadeyrn/enterprise-policy-generator/issues/291)

#### Bugfixes

- It was possible to enter a scenario in which a policy with an enum field is first enabled and then excluded by
  another policy. In this case, the visually correctly disabled policy was actually still active, see
  [#290](https://github.com/cadeyrn/enterprise-policy-generator/issues/290)

#### Enterprise Policies

- Added support for BackgroundAppUpdate policy to allow or disallow installing updates of Firefox in the background,
  when the application is not running, see [#233](https://github.com/cadeyrn/enterprise-policy-generator/issues/233)
- Added support for ManualAppUpdateOnly policy to disable prompts for Firefox updates, see
  [#237](https://github.com/cadeyrn/enterprise-policy-generator/issues/237)
- Added SponsoredTopSites and SponsoredPocket options to FirefoxHome policy, removed Snippets option (also from existing
  configurations), updated order and translations of all options to reflect the current order and naming in Firefox, see
  [#236](https://github.com/cadeyrn/enterprise-policy-generator/issues/236)
- Added Behavior and BehaviorPrivateBrowsing options to Cookies policy, removed Default, AcceptThirdParty and
  RejectTracker options, migrated them to Behavior option in existing configurations and made ExpireAtSessionEnd option
  optional, see [#234](https://github.com/cadeyrn/enterprise-policy-generator/issues/234)
- Added support for PasswordManagerExceptions policy to prevent Firefox from saving passwords for specific sites, see
  [#238](https://github.com/cadeyrn/enterprise-policy-generator/issues/238)
- Added support for WindowsSSO policy to allow or disallow Windows single sign-on for Microsoft, work, and school
  accounts, see [#240](https://github.com/cadeyrn/enterprise-policy-generator/issues/240)
- Added several new cryptographic ciphers to DisabledCiphers policy and sorted them alphabetically, see
  [#235](https://github.com/cadeyrn/enterprise-policy-generator/issues/235)
- Added Encoding option to SearchEngines policy, see
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

- Added support for a new policy type, needed for the new ManagedBookmarks policy, see
  [#231](https://github.com/cadeyrn/enterprise-policy-generator/issues/231)
- Added support for a new policy type, needed for the new AllowedDomainsForApps policy, see
  [#228](https://github.com/cadeyrn/enterprise-policy-generator/issues/228)
- Added support for a new policy type, needed for the updated OverrideFirstRunPage policy, see
  [#270](https://github.com/cadeyrn/enterprise-policy-generator/issues/270)
- Added support for array fields in array objects, needed for the new AutoLaunchProtocolsFromOrigins policy, see
  [#229](https://github.com/cadeyrn/enterprise-policy-generator/issues/229)
- Added option for URL fields to require secure connection (https://), see
  [#277](https://github.com/cadeyrn/enterprise-policy-generator/issues/277)
- Added option to set info link for array properties, see
  [#279](https://github.com/cadeyrn/enterprise-policy-generator/issues/279)
- For fields with multiple possible values, it should be possible to remove the last one, see
  [#274](https://github.com/cadeyrn/enterprise-policy-generator/issues/274)
- Legacy preference policies now use the syntax of the new Preferences policy, see
  [#280](https://github.com/cadeyrn/enterprise-policy-generator/issues/280)

#### Bugfixes

- Fixed several issues with the Handlers policy, especially when loaded from saved configurations, see
  [#272](https://github.com/cadeyrn/enterprise-policy-generator/issues/272),
  [#273](https://github.com/cadeyrn/enterprise-policy-generator/issues/273),
  [#275](https://github.com/cadeyrn/enterprise-policy-generator/issues/275),
  [#276](https://github.com/cadeyrn/enterprise-policy-generator/issues/276), and
  [#278](https://github.com/cadeyrn/enterprise-policy-generator/issues/278)
- It was possible to save preferences with an invalid preference name and use it in policies.json when loaded from
  saved configurations, see [#282](https://github.com/cadeyrn/enterprise-policy-generator/issues/282)

#### Enterprise Policies

- Added support for ManagedBookmarks policy to configure bookmarks managed by an administrator that cannot be
  changed by the user. Support for folders will be added in a future release, see
  [#231](https://github.com/cadeyrn/enterprise-policy-generator/issues/231)
- Added support for AllowedDomainsForApps policy to define domains that are allowed to access Google Workspace, see
  [#228](https://github.com/cadeyrn/enterprise-policy-generator/issues/228)
- Added support for AutoLaunchProtocolsFromOrigins policy to define a list of external protocols that can be used from
  listed origins without prompting the user, see
  [#229](https://github.com/cadeyrn/enterprise-policy-generator/issues/229)
- Updated OverrideFirstRunPage policy to allow multiple URLs, and migrated existing configurations, see
  [#270](https://github.com/cadeyrn/enterprise-policy-generator/issues/270)
- Updated description and added info link to install_sources property of ExtensionSettings policy to make clear that
  match patterns are allowed for URLs, see [#279](https://github.com/cadeyrn/enterprise-policy-generator/issues/279)

#### Dependencies

- Updated eslint from version 9.6.0 to 9.9.1
- Updated eslint-plugin-jsdoc from version 48.5.0 to 50.2.2
- Updated gulp-eslint-new from version 2.1.0 to 2.3.0

[All Changes](https://github.com/cadeyrn/enterprise-policy-generator/compare/v6.0.0...v6.1.0)<br />
[Download Signed WebExtension](https://addons.mozilla.org/en-US/firefox/addon/enterprise-policy-generator/versions/?page=1#version-6.1.0)

---

### [Version 6.0.0](https://github.com/cadeyrn/enterprise-policy-generator/releases/tag/v6.0.0) (2024-06-30)

#### Enhancements

- Enterprise Policy Generator now uses Manifest v3, fixes
  [#188](https://github.com/cadeyrn/enterprise-policy-generator/issues/188)
- Firefox 115 or higher is required now. Also, Enterprise Policy Generator no
  longer displays the minimum required Firefox version for policies implemented before Firefox 115.0, see
  [#138](https://github.com/cadeyrn/enterprise-policy-generator/issues/138)
- Implemented a schema migrator so that policies in saved configurations can be migrated during extension updates or 
  when old configurations get imported on newer versions of the extension, see
  [#143](https://github.com/cadeyrn/enterprise-policy-generator/issues/143)
- Added support for a new policy type, needed for the Handlers policy, see
  [#152](https://github.com/cadeyrn/enterprise-policy-generator/issues/152)
- Added support for a new policy type, needed for the 3rdParty policy, see
  [#78](https://github.com/cadeyrn/enterprise-policy-generator/issues/78)
- Added support for a new policy type, needed for the Preferences policy, see
  [#142](https://github.com/cadeyrn/enterprise-policy-generator/issues/142)
- Support for many new policies, including big ones like policies to set arbitrary preferences or to configure
  application handlers, see detailed list below
  
#### Bugfixes

- Fixed error messages in browser console, see [#141](https://github.com/cadeyrn/enterprise-policy-generator/issues/141)
  and [#169](https://github.com/cadeyrn/enterprise-policy-generator/issues/169)
- Improved enum fields so that these no longer causes empty policy objects if no value is set, see
  [#146](https://github.com/cadeyrn/enterprise-policy-generator/issues/146) 
- Configuring more than one extension in ExtensionSettings policy was broken, see
  [#160](https://github.com/cadeyrn/enterprise-policy-generator/issues/160) and
  [#269](https://github.com/cadeyrn/enterprise-policy-generator/issues/269)
- The RequestedLocales policy allows an empty string to use the operating system's language. However, empty strings
  should not be allowed if more than one value is used. Also, it shouldn't be possible to add duplicate language codes,
  see [#161](https://github.com/cadeyrn/enterprise-policy-generator/issues/161)
- Integer values were parsed as strings in preference policies, see
  [#171](https://github.com/cadeyrn/enterprise-policy-generator/issues/171)

#### Notable Changes and Code Quality

- For version compatibility notes, the old Firefox shape was still used. The logo has been replaced with the current
  one, see [#134](https://github.com/cadeyrn/enterprise-policy-generator/issues/134)
- Optimized the file size of a few images, fixes
  [#222](https://github.com/cadeyrn/enterprise-policy-generator/issues/222)
- Replaced the translation mechanism with the newest version to share more code with other extensions and improve the
  maintainability, fixes [#221](https://github.com/cadeyrn/enterprise-policy-generator/issues/221)
- Changed copyright year from 2020 to 2024, fixes
  [#220](https://github.com/cadeyrn/enterprise-policy-generator/issues/220)
- Improved instruction for users of Apple macOS, see
  [#210](https://github.com/cadeyrn/enterprise-policy-generator/issues/210)
- Disabled native CSS outlines for input fields because we have our own focus style, see
  [#159](https://github.com/cadeyrn/enterprise-policy-generator/issues/159)
- Several code quality and code style improvements
  
#### Enterprise Policies

- New policy to allow or prevent Firefox from messaging the user, see
  [#145](https://github.com/cadeyrn/enterprise-policy-generator/issues/145)
- New policy to enable or disable the picture in picture (PiP) feature for videos, see
  [#151](https://github.com/cadeyrn/enterprise-policy-generator/issues/151)
- New policy to require or prevent using a primary password; the DisableMasterPasswordCreation policy was removed, the
  value of the DisableMasterPasswordCreation policy will automatically be migrated in saved configurations, see
  [#153](https://github.com/cadeyrn/enterprise-policy-generator/issues/153)
- New policies to either enable the legacy default behaviour for SameSite cookies or to enable the legacy behaviour
  for specific websites; both policies excludes each other, see
  [#154](https://github.com/cadeyrn/enterprise-policy-generator/issues/154)
- New policy to disable the default browser agent, see
  [#155](https://github.com/cadeyrn/enterprise-policy-generator/issues/155)
- New policy to disable or configure the built-in PDF viewer; the DisableBuiltinPDFViewer policy was removed, the value
  of the DisableBuiltinPDFViewer policy will automatically be migrated in saved configurations, see
  [#156](https://github.com/cadeyrn/enterprise-policy-generator/issues/156)
- New policy to enable or disable specific cryptographic ciphers, see
  [#163](https://github.com/cadeyrn/enterprise-policy-generator/issues/163)
- New policy to enable or disable Encrypted Media Extensions; the policy to enable or disable the download of the
  Widevine CDM was removed, the value will automatically be migrated in saved configurations, see
  [#164](https://github.com/cadeyrn/enterprise-policy-generator/issues/164)
- New policy to enable or disable the automatic installation of Firefox updates; this policy and the policy to
  completely disable Firefox updates excludes each other, see
  [#166](https://github.com/cadeyrn/enterprise-policy-generator/issues/166)
- New policy to show the home button on the toolbar, see
  [#232](https://github.com/cadeyrn/enterprise-policy-generator/issues/232)
- New policy to preconfigure the settings for extensions that use chrome.storage.managed, see
  [#78](https://github.com/cadeyrn/enterprise-policy-generator/issues/78)
- New policy to specify user-defined preferences (about:config), see
  [#142](https://github.com/cadeyrn/enterprise-policy-generator/issues/142)
- New policy to configure the application handlers, see
  [#152](https://github.com/cadeyrn/enterprise-policy-generator/issues/152)
- Updated permissions policy to control autoplay of media and access to virtual reality devices, see
  [#136](https://github.com/cadeyrn/enterprise-policy-generator/issues/136)
- Updated tracking protection policy to be able to add exceptions, see
  [#144](https://github.com/cadeyrn/enterprise-policy-generator/issues/144)
- Updated policy to clear browser data on shutdown, so that you can only set some of them instead of all or
  nothing, and to be able to lock only some these options, all or none, see
  [#147](https://github.com/cadeyrn/enterprise-policy-generator/issues/147)
- Updated DNS over HTTPS policy to be able to add excluded domains, see
  [#148](https://github.com/cadeyrn/enterprise-policy-generator/issues/148)
- Updated homepage policy to be able to set the homepage to either allow or forbid to optionally start with the
  previous session, see [#149](https://github.com/cadeyrn/enterprise-policy-generator/issues/149)
- Updated authentication policy to enable or disable integrated authentication in private browsing, see
  [#150](https://github.com/cadeyrn/enterprise-policy-generator/issues/150)
- Updated cookies policy to allow to configure domains where cookies are only allowed for the current session, see
  [#157](https://github.com/cadeyrn/enterprise-policy-generator/issues/157)
- Updated authentication policy with an option for proxy servers, see
  [#162](https://github.com/cadeyrn/enterprise-policy-generator/issues/162)
- Updated extension settings policy to be able to define domains on which content scripts can't be run, see
  [#165](https://github.com/cadeyrn/enterprise-policy-generator/issues/165)
- Updated extension settings policy to be able to disallow automatic updates for individual extensions, see
  [#230](https://github.com/cadeyrn/enterprise-policy-generator/issues/230)
- Replaced menu bar policy with new one that accepts more options; the old policy will automatically be migrated in
  saved configurations, see [#127](https://github.com/cadeyrn/enterprise-policy-generator/issues/127)
- Removed SearchEngines | DefaultPrivate because this feature never reached a stable release of Firefox, see
  [#140](https://github.com/cadeyrn/enterprise-policy-generator/issues/140)
- Removed InstallAddonsPermission policy and migrated all data to ExtensionSettings policy in saved configurations, see
  [#168](https://github.com/cadeyrn/enterprise-policy-generator/issues/168)
- Removed FlashPlugin policy as Flash is no longer a thing, and removed it in saved configurations, see
  [#218](https://github.com/cadeyrn/enterprise-policy-generator/issues/218)
- Renamed Firefox Account to Mozilla account in DisableFirefoxAccounts policy, see
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
