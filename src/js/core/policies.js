'use strict';

/**
 * @exports policies
 */
const policies = {
  // block access

  BlockAboutAddons : {
    description : browser.i18n.getMessage('policy_description_BlockAboutAddons'),
    enterprise_only : false,
    first_available : { mainstream : '60.0', esr : '60.0' },
    info_link : null,
    is_lockable : false,
    ui_category : 'block-access',
    type : 'boolean'
  },

  BlockAboutConfig : {
    description : browser.i18n.getMessage('policy_description_BlockAboutConfig'),
    enterprise_only : false,
    first_available : { mainstream : '60.0', esr : '60.0' },
    info_link : null,
    is_lockable : false,
    ui_category : 'block-access',
    type : 'boolean'
  },

  BlockAboutProfiles : {
    description : browser.i18n.getMessage('policy_description_BlockAboutProfiles'),
    enterprise_only : false,
    first_available : { mainstream : '60.0', esr : '60.0' },
    info_link : null,
    is_lockable : false,
    ui_category : 'block-access',
    type : 'boolean'
  },

  BlockAboutSupport : {
    description : browser.i18n.getMessage('policy_description_BlockAboutSupport'),
    enterprise_only : false,
    first_available : { mainstream : '60.0', esr : '60.0' },
    info_link : null,
    is_lockable : false,
    ui_category : 'block-access',
    type : 'boolean'
  },

  // disable features

  DisablePrivateBrowsing : {
    description : browser.i18n.getMessage('policy_description_DisablePrivateBrowsing'),
    enterprise_only : false,
    first_available : { mainstream : '60.0', esr : '60.0' },
    info_link : null,
    is_lockable : false,
    ui_category : 'disable-features',
    type : 'boolean'
  },

  DisableFormHistory : {
    description : browser.i18n.getMessage('policy_description_DisableFormHistory'),
    enterprise_only : false,
    first_available : { mainstream : '60.0', esr : '60.0' },
    info_link : null,
    is_lockable : false,
    ui_category : 'disable-features',
    type : 'boolean'
  },

  DisableBuiltinPDFViewer : {
    description : browser.i18n.getMessage('policy_description_DisableBuiltinPDFViewer'),
    enterprise_only : false,
    first_available : { mainstream : '60.0', esr : '60.0' },
    info_link : null,
    is_lockable : false,
    ui_category : 'disable-features',
    type : 'boolean'
  },

  DisableFirefoxScreenshots : {
    description : browser.i18n.getMessage('policy_description_DisableFirefoxScreenshots'),
    enterprise_only : false,
    first_available : { mainstream : '60.0', esr : '60.0' },
    info_link : null,
    is_lockable : false,
    ui_category : 'disable-features',
    type : 'boolean'
  },

  DisableDeveloperTools : {
    description : browser.i18n.getMessage('policy_description_DisableDeveloperTools'),
    enterprise_only : false,
    first_available : { mainstream : '60.0', esr : '60.0' },
    info_link : null,
    is_lockable : false,
    ui_category : 'disable-features',
    type : 'boolean'
  },

  DisablePocket : {
    description : browser.i18n.getMessage('policy_description_DisablePocket'),
    enterprise_only : false,
    first_available : { mainstream : '60.0', esr : '60.0' },
    info_link : null,
    is_lockable : false,
    ui_category : 'disable-features',
    type : 'boolean'
  },

  DisableFirefoxAccounts : {
    description : browser.i18n.getMessage('policy_description_DisableFirefoxAccounts'),
    enterprise_only : false,
    first_available : { mainstream : '60.0', esr : '60.0' },
    info_link : null,
    is_lockable : false,
    ui_category : 'disable-features',
    type : 'boolean'
  },

  DisableMasterPasswordCreation : {
    description : browser.i18n.getMessage('policy_description_DisableMasterPasswordCreation'),
    enterprise_only : false,
    first_available : { mainstream : '60.0', esr : '60.0' },
    info_link : null,
    is_lockable : false,
    ui_category : 'disable-features',
    type : 'boolean'
  },

  DisableSetDesktopBackground : {
    description : browser.i18n.getMessage('policy_description_DisableSetDesktopBackground'),
    enterprise_only : false,
    first_available : { mainstream : '60.0', esr : '60.0' },
    info_link : null,
    is_lockable : false,
    ui_category : 'disable-features',
    type : 'boolean'
  },

  DisableForgetButton : {
    description : browser.i18n.getMessage('policy_description_DisableForgetButton'),
    enterprise_only : false,
    first_available : { mainstream : '60.0', esr : '60.0' },
    info_link : null,
    is_lockable : false,
    ui_category : 'disable-features',
    type : 'boolean'
  },

  DisableProfileImport : {
    description : browser.i18n.getMessage('policy_description_DisableProfileImport'),
    enterprise_only : false,
    first_available : { mainstream : '60.0', esr : '60.0' },
    info_link : null,
    is_lockable : false,
    ui_category : 'disable-features',
    type : 'boolean'
  },

  DisableProfileRefresh : {
    description : browser.i18n.getMessage('policy_description_DisableProfileRefresh'),
    enterprise_only : false,
    first_available : { mainstream : '60.0', esr : '60.0' },
    info_link : null,
    is_lockable : false,
    ui_category : 'disable-features',
    type : 'boolean'
  },

  DisableFeedbackCommands : {
    description : browser.i18n.getMessage('policy_description_DisableFeedbackCommands'),
    enterprise_only : false,
    first_available : { mainstream : '60.0', esr : '60.0' },
    info_link : null,
    is_lockable : false,
    ui_category : 'disable-features',
    type : 'boolean'
  },

  // customization

  RequestedLocales : {
    description : browser.i18n.getMessage('policy_description_RequestedLocales'),
    enterprise_only : false,
    additional_note : browser.i18n.getMessage('policy_description_RequestedLocales_Requirement'),
    first_available : { mainstream : '64.0', esr : '60.3.1' },
    info_link : 'https://addons.mozilla.org/firefox/language-tools/',
    is_lockable : false,
    ui_category : 'customization',
    type : 'flat-array',
    value : {
      label : browser.i18n.getMessage('policy_description_RequestedLocales_Value'),
      mandatory : true
    }
  },

  DisplayMenuBar : {
    description : browser.i18n.getMessage('policy_description_DisplayMenuBar'),
    enterprise_only : false,
    additional_note : browser.i18n.getMessage('requirement_windows_or_linux'),
    first_available : { mainstream : '60.0', esr : '60.0' },
    info_link : null,
    is_lockable : false,
    ui_category : 'customization',
    type : 'boolean'
  },

  DisplayBookmarksToolbar : {
    description : browser.i18n.getMessage('policy_description_DisplayBookmarksToolbar'),
    enterprise_only : false,
    first_available : { mainstream : '60.0', esr : '60.0' },
    info_link : null,
    is_lockable : false,
    ui_category : 'customization',
    type : 'boolean'
  },

  Homepage : {
    description : browser.i18n.getMessage('policy_description_Homepage'),
    enterprise_only : false,
    first_available : { mainstream : '62.0', esr : '60.0' },
    info_link : null,
    is_lockable : true,
    ui_category : 'customization',
    type : 'object',
    properties : [
      {
        name : 'URL',
        label : browser.i18n.getMessage('policy_description_Homepage_URL'),
        mandatory : true,
        type : 'url'
      },
      {
        name : 'Additional',
        label : browser.i18n.getMessage('policy_description_Homepage_Additional'),
        mandatory : false,
        type : 'array',
        items : {
          label : browser.i18n.getMessage('policy_description_Homepage_URL'),
          type : 'url'
        }
      }
    ]
  },

  SearchBar : {
    description : browser.i18n.getMessage('policy_description_SearchBar'),
    enterprise_only : false,
    first_available : { mainstream : '62.0', esr : '60.0' },
    info_link : null,
    is_lockable : false,
    ui_category : 'customization',
    type : 'enum',
    label : null,
    options : [
      {
        label : browser.i18n.getMessage('policy_description_SearchBar_options_unified'),
        value : 'unified'
      },
      {
        label : browser.i18n.getMessage('policy_description_SearchBar_options_separate'),
        value : 'separate'
      }
    ]
  },

  SearchEngines : {
    description : browser.i18n.getMessage('policy_description_SearchEngines'),
    enterprise_only : true,
    first_available : { mainstream : '60.0', esr : '60.0' },
    info_link : null,
    is_lockable : false,
    ui_category : 'customization',
    type : 'object',
    properties : [
      {
        name : 'Default',
        label : browser.i18n.getMessage('policy_description_SearchEngines_Default'),
        mandatory : false,
        type : 'string'
      },
      {
        name : 'PreventInstalls',
        label : browser.i18n.getMessage('policy_description_SearchEngines_PreventInstalls'),
        mandatory : false,
        type : 'enum',
        options : [
          {
            label : browser.i18n.getMessage('policy_description_SearchEngines_PreventInstalls_false'),
            value : 'false'
          },
          {
            label : browser.i18n.getMessage('policy_description_SearchEngines_PreventInstalls_true'),
            value : 'true'
          }
        ]
      },
      {
        name : 'Add',
        label : browser.i18n.getMessage('policy_description_SearchEngines_Add'),
        mandatory : false,
        type : 'object-array',
        items : [
          {
            name : 'Name',
            label : browser.i18n.getMessage('policy_description_SearchEngines_Add_Name'),
            mandatory : true,
            type : 'string'
          },
          {
            name : 'URLTemplate',
            label : browser.i18n.getMessage('policy_description_SearchEngines_Add_URL'),
            mandatory : true,
            type : 'string'
          },
          {
            name : 'IconURL',
            label : browser.i18n.getMessage('policy_description_SearchEngines_Add_IconURL'),
            mandatory : false,
            type : 'url'
          },
          {
            name : 'Alias',
            label : browser.i18n.getMessage('policy_description_SearchEngines_Add_Alias'),
            mandatory : false,
            type : 'string'
          },
          {
            name : 'Description',
            label : browser.i18n.getMessage('policy_description_SearchEngines_Add_Description'),
            mandatory : false,
            type : 'string'
          },
          {
            name : 'SuggestURLTemplate',
            label : browser.i18n.getMessage('policy_description_SearchEngines_Add_SuggestURLTemplate'),
            mandatory : false,
            type : 'string'
          },
          {
            name : 'Method',
            label : browser.i18n.getMessage('policy_description_SearchEngines_Add_Method'),
            mandatory : false,
            type : 'enum',
            options : [
              {
                label : browser.i18n.getMessage('policy_description_SearchEngines_Add_Method_GET'),
                value : 'GET'
              },
              {
                label : browser.i18n.getMessage('policy_description_SearchEngines_Add_Method_POST'),
                value : 'POST'
              }
            ]
          }
        ]
      },
      {
        name : 'Remove',
        label : browser.i18n.getMessage('policy_description_SearchEngines_Remove'),
        mandatory : false,
        type : 'array',
        items : {
          label : browser.i18n.getMessage('policy_description_SearchEngines_Remove_Name'),
          type : 'string'
        }
      }
    ]
  },

  NoDefaultBookmarks : {
    description : browser.i18n.getMessage('policy_description_NoDefaultBookmarks'),
    enterprise_only : false,
    first_available : { mainstream : '60.0', esr : '60.0' },
    info_link : null,
    is_lockable : false,
    ui_category : 'customization',
    type : 'boolean'
  },

  Bookmarks : {
    description : browser.i18n.getMessage('policy_description_Bookmarks'),
    enterprise_only : false,
    first_available : { mainstream : '60.0', esr : '60.0' },
    info_link : null,
    is_lockable : false,
    ui_category : 'customization',
    type : 'array',
    items : [
      {
        name : 'Title',
        label : browser.i18n.getMessage('policy_description_Bookmarks_Title'),
        mandatory : true,
        type : 'string'
      },
      {
        name : 'URL',
        label : browser.i18n.getMessage('policy_description_Bookmarks_URL'),
        mandatory : true,
        type : 'url'
      },
      {
        name : 'Favicon',
        label : browser.i18n.getMessage('policy_description_Bookmarks_Favicon'),
        mandatory : false,
        type : 'url'
      },
      {
        name : 'Folder',
        label : browser.i18n.getMessage('policy_description_Bookmarks_Folder'),
        mandatory : false,
        type : 'string'
      },
      {
        name : 'Placement',
        label : browser.i18n.getMessage('policy_description_Bookmarks_Placement'),
        mandatory : false,
        type : 'enum',
        options : [
          {
            label : browser.i18n.getMessage('policy_description_Bookmarks_Placement_Toolbar'),
            value : 'toolbar'
          },
          {
            label : browser.i18n.getMessage('policy_description_Bookmarks_Placement_Menu'),
            value : 'menu'
          }
        ]
      }
    ]
  },

  InstallAddonsPermission : {
    description : browser.i18n.getMessage('policy_description_InstallAddonsPermission'),
    enterprise_only : false,
    first_available : { mainstream : '60.0', esr : '60.0' },
    info_link : null,
    is_lockable : false,
    ui_category : 'customization',
    type : 'object',
    properties : [
      {
        name : 'Default',
        label : null,
        mandatory : false,
        type : 'enum',
        options : [
          {
            label : browser.i18n.getMessage('policy_description_InstallAddonsPermission_Default_true'),
            value : 'true'
          },
          {
            label : browser.i18n.getMessage('policy_description_InstallAddonsPermission_Default_false'),
            value : 'false'
          }
        ]
      },
      {
        name : 'Allow',
        label : browser.i18n.getMessage('policy_description_InstallAddonsPermission_Allow'),
        mandatory : false,
        type : 'array',
        items : {
          label : browser.i18n.getMessage('policy_description_InstallAddonsPermission_Allow_URL'),
          type : 'url'
        }
      }
    ]
  },

  Extensions : {
    description : browser.i18n.getMessage('policy_description_Extensions'),
    enterprise_only : false,
    first_available : { mainstream : '62.0', esr : '60.0' },
    info_link : null,
    is_lockable : false,
    ui_category : 'customization',
    type : 'object',
    properties : [
      {
        name : 'Install',
        label : browser.i18n.getMessage('policy_description_Extensions_Install'),
        mandatory : false,
        type : 'array',
        items : {
          label : browser.i18n.getMessage('policy_description_Extensions_Install_URL_or_Path'),
          type : 'string'
        }
      },
      {
        name : 'Uninstall',
        label : browser.i18n.getMessage('policy_description_Extensions_Uninstall'),
        mandatory : false,
        type : 'array',
        items : {
          label : browser.i18n.getMessage('policy_description_Extensions_Uninstall_ID'),
          type : 'string'
        }
      },
      {
        name : 'Locked',
        label : browser.i18n.getMessage('policy_description_Extensions_Locked'),
        mandatory : false,
        type : 'array',
        items : {
          label : browser.i18n.getMessage('policy_description_Extensions_Locked_ID'),
          type : 'string'
        }
      }
    ]
  },

  // network

  WebsiteFilter : {
    description : browser.i18n.getMessage('policy_description_WebsiteFilter'),
    enterprise_only : false,
    first_available : { mainstream : '62.0', esr : '60.0' },
    info_link : 'https://developer.mozilla.org/Add-ons/WebExtensions/Match_patterns',
    is_lockable : false,
    ui_category : 'network',
    type : 'object',
    properties : [
      {
        name : 'Block',
        label : browser.i18n.getMessage('policy_description_WebsiteFilter_Block'),
        mandatory : false,
        type : 'array',
        items : {
          label : browser.i18n.getMessage('policy_description_WebsiteFilter_Block_URL'),
          type : 'string'
        }
      },
      {
        name : 'Exceptions',
        label : browser.i18n.getMessage('policy_description_WebsiteFilter_Exceptions'),
        mandatory : false,
        type : 'array',
        items : {
          label : browser.i18n.getMessage('policy_description_WebsiteFilter_Exceptions_URL'),
          type : 'string'
        }
      }
    ]
  },

  DNSOverHTTPS : {
    description : browser.i18n.getMessage('policy_description_DNSOverHTTPS'),
    enterprise_only : false,
    first_available : { mainstream : '63.0', esr : null },
    info_link : null,
    is_lockable : true,
    ui_category : 'network',
    type : 'object',
    properties : [
      {
        name : 'Enabled',
        label : browser.i18n.getMessage('policy_description_DNSOverHTTPS_Enabled'),
        mandatory : false,
        type : 'enum',
        options : [
          {
            label : browser.i18n.getMessage('policy_description_DNSOverHTTPS_Enabled_true'),
            value : 'true'
          },
          {
            label : browser.i18n.getMessage('policy_description_DNSOverHTTPS_Enabled_false'),
            value : 'false'
          }
        ]
      },
      {
        name : 'ProviderURL',
        label : browser.i18n.getMessage('policy_description_DNSOverHTTPS_ProviderURL'),
        mandatory : false,
        type : 'url'
      }
    ]
  },

  Proxy : {
    description : browser.i18n.getMessage('policy_description_Proxy'),
    enterprise_only : false,
    first_available : { mainstream : '60.0', esr : '60.0' },
    info_link : null,
    is_lockable : true,
    ui_category : 'network',
    type : 'object',
    properties : [
      {
        name : 'Mode',
        label : null,
        mandatory : false,
        type : 'enum',
        options : [
          {
            label : browser.i18n.getMessage('policy_description_Proxy_Mode_none'),
            value : 'none'
          },
          {
            label : browser.i18n.getMessage('policy_description_Proxy_Mode_system'),
            value : 'system'
          },
          {
            label : browser.i18n.getMessage('policy_description_Proxy_Mode_autoDetect'),
            value : 'autoDetect'
          },
          {
            label : browser.i18n.getMessage('policy_description_Proxy_Mode_manual'),
            value : 'manual'
          },
          {
            label : browser.i18n.getMessage('policy_description_Proxy_Mode_autoConfig'),
            value : 'autoConfig'
          }
        ]
      },
      {
        name : 'HTTPProxy',
        label : browser.i18n.getMessage('policy_description_Proxy_HTTPProxy'),
        mandatory : false,
        type : 'string'
      },
      {
        name : 'UseHTTPProxyForAllProtocols',
        label : null,
        type : 'enum',
        options : [
          {
            label : browser.i18n.getMessage('policy_description_Proxy_UseHTTPProxyForAllProtocols_true'),
            value : 'true'
          },
          {
            label : browser.i18n.getMessage('policy_description_Proxy_UseHTTPProxyForAllProtocols_false'),
            value : 'false'
          }
        ]
      },
      {
        name : 'SSLProxy',
        label : browser.i18n.getMessage('policy_description_Proxy_SSLProxy'),
        mandatory : false,
        type : 'string'
      },
      {
        name : 'FTPProxy',
        label : browser.i18n.getMessage('policy_description_Proxy_FTPProxy'),
        mandatory : false,
        type : 'string'
      },
      {
        name : 'SOCKSProxy',
        label : browser.i18n.getMessage('policy_description_Proxy_SOCKSProxy'),
        mandatory : false,
        type : 'string'
      },
      {
        name : 'SOCKSVersion',
        label : null,
        type : 'enum',
        options : [
          {
            label : browser.i18n.getMessage('policy_description_Proxy_SOCKSVersion_v4'),
            value : '4'
          },
          {
            label : browser.i18n.getMessage('policy_description_Proxy_SOCKSVersion_v5'),
            value : '5'
          }
        ]
      },
      {
        name : 'Passthrough',
        label : browser.i18n.getMessage('policy_description_Proxy_Passthrough'),
        mandatory : false,
        type : 'string'
      },
      {
        name : 'AutoConfigURL',
        label : browser.i18n.getMessage('policy_description_Proxy_AutoConfigURL'),
        mandatory : false,
        type : 'url'
      },
      {
        name : 'AutoLogin',
        label : browser.i18n.getMessage('policy_description_Proxy_AutoLogin'),
        type : 'enum',
        options : [
          {
            label : browser.i18n.getMessage('policy_description_Proxy_AutoLogin_true'),
            value : 'true'
          },
          {
            label : browser.i18n.getMessage('policy_description_Proxy_AutoLogin_false'),
            value : 'false'
          }
        ]
      },
      {
        name : 'UseProxyForDNS',
        label : browser.i18n.getMessage('policy_description_Proxy_UseProxyForDNS'),
        type : 'enum',
        options : [
          {
            label : browser.i18n.getMessage('policy_description_Proxy_UseProxyForDNS_false'),
            value : 'false'
          },
          {
            label : browser.i18n.getMessage('policy_description_Proxy_UseProxyForDNS_true'),
            value : 'true'
          }
        ]
      }
    ]
  },

  Authentication : {
    description : browser.i18n.getMessage('policy_description_Authentication'),
    enterprise_only : false,
    first_available : { mainstream : '62.0', esr : '60.0' },
    info_link : 'https://developer.mozilla.org/docs/Mozilla/Integrated_authentication',
    is_lockable : false,
    ui_category : 'network',
    type : 'object',
    properties : [
      {
        name : 'SPNEGO',
        label : browser.i18n.getMessage('policy_description_Authentication_SPNEGO'),
        mandatory : false,
        type : 'array',
        items : {
          label : browser.i18n.getMessage('policy_description_Authentication_SPNEGO_URL'),
          type : 'string'
        }
      },
      {
        name : 'Delegated',
        label : browser.i18n.getMessage('policy_description_Authentication_Delegated'),
        mandatory : false,
        type : 'array',
        items : {
          label : browser.i18n.getMessage('policy_description_Authentication_Delegated_URL'),
          type : 'string'
        }
      },
      {
        name : 'NTLM',
        label : browser.i18n.getMessage('policy_description_Authentication_NTLM'),
        mandatory : false,
        type : 'array',
        items : {
          label : browser.i18n.getMessage('policy_description_Authentication_NTLM_URL'),
          type : 'string'
        }
      },
      {
        name : 'AllowNonFQDN',
        label : browser.i18n.getMessage('policy_description_Authentication_AllowNonFQDN'),
        mandatory : false,
        type : 'object',
        properties : [
          {
            name : 'SPNEGO',
            label : browser.i18n.getMessage('policy_description_Authentication_AllowNonFQDN_SPNEGO'),
            type : 'boolean'
          },
          {
            name : 'NTLM',
            label : browser.i18n.getMessage('policy_description_Authentication_AllowNonFQDN_NTLM'),
            type : 'boolean'
          }
        ]
      }
    ]
  },

  // privacy

  Cookies : {
    description : browser.i18n.getMessage('policy_description_Cookies'),
    enterprise_only : false,
    first_available : { mainstream : '60.0', esr : '60.0' },
    info_link : null,
    is_lockable : true,
    ui_category : 'privacy',
    type : 'object',
    properties : [
      {
        name : 'Allow',
        label : browser.i18n.getMessage('policy_description_Cookies_Allow'),
        mandatory : false,
        type : 'array',
        items : {
          label : browser.i18n.getMessage('policy_description_Cookies_Allow_Domain'),
          type : 'url'
        }
      },
      {
        name : 'Block',
        label : browser.i18n.getMessage('policy_description_Cookies_Block'),
        mandatory : false,
        type : 'array',
        items : {
          label : browser.i18n.getMessage('policy_description_Cookies_Block_Domain'),
          type : 'url'
        }
      },
      {
        name : 'Default',
        label : browser.i18n.getMessage('policy_description_Cookies_Default'),
        mandatory : false,
        type : 'enum',
        options : [
          {
            label : browser.i18n.getMessage('policy_description_Cookies_Default_true'),
            value : 'true'
          },
          {
            label : browser.i18n.getMessage('policy_description_Cookies_Default_false'),
            value : 'false'
          }
        ]
      },
      {
        name : 'AcceptThirdParty',
        label : browser.i18n.getMessage('policy_description_Cookies_AcceptThirdParty'),
        mandatory : false,
        type : 'enum',
        options : [
          {
            label : browser.i18n.getMessage('policy_description_Cookies_AcceptThirdParty_always'),
            value : 'always'
          },
          {
            label : browser.i18n.getMessage('policy_description_Cookies_AcceptThirdParty_never'),
            value : 'never'
          },
          {
            label : browser.i18n.getMessage('policy_description_Cookies_AcceptThirdParty_from_visited'),
            value : 'from-visited'
          }
        ]
      },
      {
        name : 'ExpireAtSessionEnd',
        label : browser.i18n.getMessage('policy_description_Cookies_ExpireAtSessionEnd'),
        mandatory : false,
        type : 'enum',
        options : [
          {
            label : browser.i18n.getMessage('policy_description_Cookies_ExpireAtSessionEnd_true'),
            value : 'true'
          },
          {
            label : browser.i18n.getMessage('policy_description_Cookies_ExpireAtSessionEnd_false'),
            value : 'false'
          }
        ]
      },
      {
        name : 'RejectTracker',
        label : browser.i18n.getMessage('policy_description_Cookies_RejectTracker'),
        type : 'boolean'
      }
    ]
  },

  SanitizeOnShutdown : {
    description : browser.i18n.getMessage('policy_description_SanitizeOnShutdown'),
    enterprise_only : false,
    first_available : { mainstream : '60.0', esr : '60.0' },
    info_link : null,
    is_lockable : false,
    ui_category : 'privacy',
    type : 'boolean'
  },

  EnableTrackingProtection : {
    description : browser.i18n.getMessage('policy_description_EnableTrackingProtection'),
    enterprise_only : false,
    first_available : { mainstream : '60.0', esr : '60.0' },
    info_link : null,
    is_lockable : true,
    ui_category : 'privacy',
    type : 'object',
    properties : [
      {
        name : 'Value',
        label : null,
        mandatory : false,
        type : 'enum',
        options : [
          {
            label : browser.i18n.getMessage('policy_description_EnableTrackingProtection_Value_true'),
            value : 'true'
          },
          {
            label : browser.i18n.getMessage('policy_description_EnableTrackingProtection_Value_false'),
            value : 'false'
          }
        ]
      }
    ]
  },

  Permissions : {
    description : browser.i18n.getMessage('policy_description_Permissions'),
    enterprise_only : false,
    first_available : { mainstream : '62.0', esr : '60.2' },
    info_link : null,
    is_lockable : false,
    ui_category : 'privacy',
    type : 'object',
    properties : [
      {
        name : 'Location',
        label : browser.i18n.getMessage('policy_description_Permissions_Location'),
        mandatory : false,
        is_lockable : true,
        type : 'object',
        properties : [
          {
            name : 'Allow',
            label : browser.i18n.getMessage('policy_description_Permissions_Location_Allow'),
            mandatory : false,
            type : 'array',
            items : {
              label : browser.i18n.getMessage('policy_description_Permissions_Location_Allow_URL'),
              type : 'url'
            }
          },
          {
            name : 'Block',
            label : browser.i18n.getMessage('policy_description_Permissions_Location_Block'),
            mandatory : false,
            type : 'array',
            items : {
              label : browser.i18n.getMessage('policy_description_Permissions_Location_Block_URL'),
              type : 'url'
            }
          },
          {
            name : 'BlockNewRequests',
            label : browser.i18n.getMessage('policy_description_Permissions_Location_BlockNewRequests'),
            type : 'boolean'
          }
        ]
      },
      {
        name : 'Camera',
        label : browser.i18n.getMessage('policy_description_Permissions_Camera'),
        mandatory : false,
        is_lockable : true,
        type : 'object',
        properties : [
          {
            name : 'Allow',
            label : browser.i18n.getMessage('policy_description_Permissions_Camera_Allow'),
            mandatory : false,
            type : 'array',
            items : {
              label : browser.i18n.getMessage('policy_description_Permissions_Camera_Allow_URL'),
              type : 'url'
            }
          },
          {
            name : 'Block',
            label : browser.i18n.getMessage('policy_description_Permissions_Camera_Block'),
            mandatory : false,
            type : 'array',
            items : {
              label : browser.i18n.getMessage('policy_description_Permissions_Camera_Block_URL'),
              type : 'url'
            }
          },
          {
            name : 'BlockNewRequests',
            label : browser.i18n.getMessage('policy_description_Permissions_Camera_BlockNewRequests'),
            type : 'boolean'
          }
        ]
      },
      {
        name : 'Microphone',
        label : browser.i18n.getMessage('policy_description_Permissions_Microphone'),
        mandatory : false,
        is_lockable : true,
        type : 'object',
        properties : [
          {
            name : 'Allow',
            label : browser.i18n.getMessage('policy_description_Permissions_Microphone_Allow'),
            mandatory : false,
            type : 'array',
            items : {
              label : browser.i18n.getMessage('policy_description_Permissions_Microphone_Allow_URL'),
              type : 'url'
            }
          },
          {
            name : 'Block',
            label : browser.i18n.getMessage('policy_description_Permissions_Microphone_Block'),
            mandatory : false,
            type : 'array',
            items : {
              label : browser.i18n.getMessage('policy_description_Permissions_Microphone_Block_URL'),
              type : 'url'
            }
          },
          {
            name : 'BlockNewRequests',
            label : browser.i18n.getMessage('policy_description_Permissions_Microphone_BlockNewRequests'),
            type : 'boolean'
          }
        ]
      },
      {
        name : 'Notifications',
        label : browser.i18n.getMessage('policy_description_Permissions_Notifications'),
        mandatory : false,
        is_lockable : true,
        type : 'object',
        properties : [
          {
            name : 'Allow',
            label : browser.i18n.getMessage('policy_description_Permissions_Notifications_Allow'),
            mandatory : false,
            type : 'array',
            items : {
              label : browser.i18n.getMessage('policy_description_Permissions_Notifications_Allow_URL'),
              type : 'url'
            }
          },
          {
            name : 'Block',
            label : browser.i18n.getMessage('policy_description_Permissions_Notifications_Block'),
            mandatory : false,
            type : 'array',
            items : {
              label : browser.i18n.getMessage('policy_description_Permissions_Notifications_Block_URL'),
              type : 'url'
            }
          },
          {
            name : 'BlockNewRequests',
            label : browser.i18n.getMessage('policy_description_Permissions_Notifications_BlockNewRequests'),
            type : 'boolean'
          }
        ]
      }
    ]
  },

  // security

  FlashPlugin : {
    description : browser.i18n.getMessage('policy_description_FlashPlugin'),
    enterprise_only : false,
    first_available : { mainstream : '60.0', esr : '60.0' },
    info_link : null,
    is_lockable : true,
    ui_category : 'security',
    type : 'object',
    properties : [
      {
        name : 'Default',
        label : browser.i18n.getMessage('policy_description_FlashPlugin_Default'),
        mandatory : false,
        type : 'enum',
        options : [
          {
            label : browser.i18n.getMessage('policy_description_FlashPlugin_Default_null'),
            value : null
          },
          {
            label : browser.i18n.getMessage('policy_description_FlashPlugin_Default_true'),
            value : 'true'
          },
          {
            label : browser.i18n.getMessage('policy_description_FlashPlugin_Default_false'),
            value : 'false'
          }
        ]
      },
      {
        name : 'Allow',
        label : browser.i18n.getMessage('policy_description_FlashPlugin_Allow'),
        mandatory : false,
        type : 'array',
        items : {
          label : browser.i18n.getMessage('policy_description_FlashPlugin_Allow_URL'),
          type : 'url'
        }
      },
      {
        name : 'Block',
        label : browser.i18n.getMessage('policy_description_FlashPlugin_Block'),
        mandatory : false,
        type : 'array',
        items : {
          label : browser.i18n.getMessage('policy_description_FlashPlugin_Block_URL'),
          type : 'url'
        }
      }
    ]
  },

  DisableSecurityBypass : {
    description : browser.i18n.getMessage('policy_description_DisableSecurityBypass'),
    enterprise_only : false,
    first_available : { mainstream : '60.0', esr : '60.0' },
    info_link : null,
    is_lockable : false,
    ui_category : 'security',
    type : 'object',
    properties : [
      {
        name : 'InvalidCertificate',
        label : browser.i18n.getMessage('policy_description_DisableSecurityBypass_InvalidCertificate'),
        mandatory : false,
        type : 'enum',
        options : [
          {
            label : browser.i18n.getMessage('policy_description_DisableSecurityBypass_InvalidCertificate_null'),
            value : null
          },
          {
            label : browser.i18n.getMessage('policy_description_DisableSecurityBypass_InvalidCertificate_true'),
            value : 'true'
          },
          {
            label : browser.i18n.getMessage('policy_description_DisableSecurityBypass_InvalidCertificate_false'),
            value : 'false'
          }
        ]
      },
      {
        name : 'SafeBrowsing',
        label : browser.i18n.getMessage('policy_description_DisableSecurityBypass_SafeBrowsing'),
        mandatory : false,
        type : 'enum',
        options : [
          {
            label : browser.i18n.getMessage('policy_description_DisableSecurityBypass_SafeBrowsing_null'),
            value : null
          },
          {
            label : browser.i18n.getMessage('policy_description_DisableSecurityBypass_SafeBrowsing_true'),
            value : 'true'
          },
          {
            label : browser.i18n.getMessage('policy_description_DisableSecurityBypass_SafeBrowsing_false'),
            value : 'false'
          }
        ]
      }
    ]
  },

  Certificates : {
    description : browser.i18n.getMessage('policy_description_Certificates'),
    enterprise_only : false,
    additional_note : browser.i18n.getMessage('requirement_certificates_policy'),
    first_available : { mainstream : '60.0', esr : '60.0' },
    info_link : null,
    is_lockable : false,
    ui_category : 'security',
    type : 'object',
    properties : [
      {
        name : 'ImportEnterpriseRoots',
        label : null,
        mandatory : false,
        type : 'enum',
        options : [
          {
            label : browser.i18n.getMessage('policy_description_Certificates_ImportEnterpriseRoots_true'),
            value : 'true'
          },
          {
            label : browser.i18n.getMessage('policy_description_Certificates_ImportEnterpriseRoots_false'),
            value : 'false'
          }
        ]
      }
    ]
  },

  // udpates and data collection

  DisableAppUpdate : {
    description : browser.i18n.getMessage('policy_description_DisableAppUpdate'),
    enterprise_only : false,
    first_available : { mainstream : '62.0', esr : '60.0' },
    info_link : null,
    is_lockable : false,
    ui_category : 'updates-and-data',
    type : 'boolean'
  },

  AppUpdateURL : {
    description : browser.i18n.getMessage('policy_description_AppUpdateURL'),
    enterprise_only : false,
    first_available : { mainstream : '62.0', esr : '60.2' },
    info_link : null,
    is_lockable : false,
    ui_category : 'updates-and-data',
    mandatory : true,
    type : 'url',
    label : 'URL'
  },

  DisableSystemAddonUpdate : {
    description : browser.i18n.getMessage('policy_description_DisableSystemAddonUpdate'),
    enterprise_only : false,
    first_available : { mainstream : '62.0', esr : '60.0' },
    info_link : null,
    is_lockable : false,
    ui_category : 'updates-and-data',
    type : 'boolean'
  },

  DisableTelemetry : {
    description : browser.i18n.getMessage('policy_description_DisableTelemetry'),
    enterprise_only : false,
    first_available : { mainstream : '62.0', esr : '60.0' },
    info_link : null,
    is_lockable : false,
    ui_category : 'updates-and-data',
    type : 'boolean'
  },

  DisableFirefoxStudies : {
    description : browser.i18n.getMessage('policy_description_DisableFirefoxStudies'),
    enterprise_only : false,
    first_available : { mainstream : '60.0', esr : '60.0' },
    info_link : null,
    is_lockable : false,
    ui_category : 'updates-and-data',
    type : 'boolean'
  },

  // others

  HardwareAcceleration : {
    description : browser.i18n.getMessage('policy_description_HardwareAcceleration'),
    enterprise_only : false,
    first_available : { mainstream : '62.0', esr : '60.2' },
    info_link : null,
    is_lockable : false,
    ui_category : 'others',
    type : 'boolean-inverse'
  },

  PopupBlocking : {
    description : browser.i18n.getMessage('policy_description_PopupBlocking'),
    enterprise_only : false,
    first_available : { mainstream : '60.0', esr : '60.0' },
    info_link : null,
    is_lockable : true,
    ui_category : 'others',
    type : 'object',
    properties : [
      {
        name : 'Default',
        label : null,
        mandatory : false,
        type : 'enum',
        options : [
          {
            label : browser.i18n.getMessage('policy_description_PopupBlocking_Default_true'),
            value : 'true'
          },
          {
            label : browser.i18n.getMessage('policy_description_PopupBlocking_Default_false'),
            value : 'false'
          }
        ]
      },
      {
        name : 'Allow',
        label : browser.i18n.getMessage('policy_description_PopupBlocking_Allow'),
        mandatory : false,
        type : 'array',
        items : {
          label : browser.i18n.getMessage('policy_description_PopupBlocking_Allow_URL'),
          type : 'url'
        }
      }
    ]
  },

  OfferToSaveLogins : {
    description : browser.i18n.getMessage('policy_description_OfferToSaveLogins'),
    enterprise_only : false,
    first_available : { mainstream : '60.0', esr : '60.0' },
    info_link : null,
    is_lockable : false,
    ui_category : 'others',
    type : 'enum',
    label : null,
    options : [
      {
        label : browser.i18n.getMessage('policy_description_OfferToSaveLogins_options_true'),
        value : 'true'
      },
      {
        label : browser.i18n.getMessage('policy_description_OfferToSaveLogins_options_false'),
        value : 'false'
      }
    ]
  },

  DontCheckDefaultBrowser : {
    description : browser.i18n.getMessage('policy_description_DontCheckDefaultBrowser'),
    enterprise_only : false,
    first_available : { mainstream : '60.0', esr : '60.0' },
    info_link : null,
    is_lockable : false,
    ui_category : 'others',
    type : 'boolean'
  },

  OverrideFirstRunPage : {
    description : browser.i18n.getMessage('policy_description_OverrideFirstRunPage'),
    enterprise_only : false,
    first_available : { mainstream : '62.0', esr : '60.0' },
    info_link : null,
    is_lockable : false,
    ui_category : 'others',
    mandatory : false,
    type : 'url',
    label : 'URL'
  },

  OverridePostUpdatePage : {
    description : browser.i18n.getMessage('policy_description_OverridePostUpdatePage'),
    enterprise_only : false,
    first_available : { mainstream : '62.0', esr : '60.0' },
    info_link : null,
    is_lockable : false,
    ui_category : 'others',
    mandatory : false,
    type : 'url',
    label : 'URL'
  }
};
