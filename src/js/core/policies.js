'use strict';

/**
 * @exports policies
 */
const policies = {
  // block access

  BlockAboutAddons : {
    description : browser.i18n.getMessage('policy_description_BlockAboutAddons'),
    enterprise_only : false,
    first_available : '60.0',
    ui_category : 'block-access',
    type : 'boolean'
  },

  BlockAboutConfig : {
    description : browser.i18n.getMessage('policy_description_BlockAboutConfig'),
    enterprise_only : false,
    first_available : '60.0',
    ui_category : 'block-access',
    type : 'boolean'
  },

  BlockAboutProfiles : {
    description : browser.i18n.getMessage('policy_description_BlockAboutProfiles'),
    enterprise_only : false,
    first_available : '60.0',
    ui_category : 'block-access',
    type : 'boolean'
  },

  BlockAboutSupport : {
    description : browser.i18n.getMessage('policy_description_BlockAboutSupport'),
    enterprise_only : false,
    first_available : '60.0',
    ui_category : 'block-access',
    type : 'boolean'
  },

  // disable features

  DisablePrivateBrowsing : {
    description : browser.i18n.getMessage('policy_description_DisablePrivateBrowsing'),
    enterprise_only : false,
    first_available : '60.0',
    ui_category : 'disable-features',
    type : 'boolean'
  },

  DisableFormHistory : {
    description : browser.i18n.getMessage('policy_description_DisableFormHistory'),
    enterprise_only : false,
    first_available : '60.0',
    ui_category : 'disable-features',
    type : 'boolean'
  },

  DisableBuiltinPDFViewer : {
    description : browser.i18n.getMessage('policy_description_DisableBuiltinPDFViewer'),
    enterprise_only : false,
    first_available : '60.0',
    ui_category : 'disable-features',
    type : 'boolean'
  },

  DisableFirefoxScreenshots : {
    description : browser.i18n.getMessage('policy_description_DisableFirefoxScreenshots'),
    enterprise_only : false,
    first_available : '60.0',
    ui_category : 'disable-features',
    type : 'boolean'
  },

  DisableDeveloperTools : {
    description : browser.i18n.getMessage('policy_description_DisableDeveloperTools'),
    enterprise_only : false,
    first_available : '60.0',
    ui_category : 'disable-features',
    type : 'boolean'
  },

  DisablePocket : {
    description : browser.i18n.getMessage('policy_description_DisablePocket'),
    enterprise_only : false,
    first_available : '60.0',
    ui_category : 'disable-features',
    type : 'boolean'
  },

  DisableFirefoxAccounts : {
    description : browser.i18n.getMessage('policy_description_DisableFirefoxAccounts'),
    enterprise_only : false,
    first_available : '60.0',
    ui_category : 'disable-features',
    type : 'boolean'
  },

  DisableMasterPasswordCreation : {
    description : browser.i18n.getMessage('policy_description_DisableMasterPasswordCreation'),
    enterprise_only : false,
    first_available : '60.0',
    ui_category : 'disable-features',
    type : 'boolean'
  },

  DisableSetDesktopBackground : {
    description : browser.i18n.getMessage('policy_description_DisableSetDesktopBackground'),
    enterprise_only : false,
    first_available : '60.0',
    ui_category : 'disable-features',
    type : 'boolean'
  },

  DisableForgetButton : {
    description : browser.i18n.getMessage('policy_description_DisableForgetButton'),
    enterprise_only : false,
    first_available : '60.0',
    ui_category : 'disable-features',
    type : 'boolean'
  },

  DisableProfileImport : {
    description : browser.i18n.getMessage('policy_description_DisableProfileImport'),
    enterprise_only : false,
    first_available : '60.0',
    ui_category : 'disable-features',
    type : 'boolean'
  },

  DisableProfileRefresh : {
    description : browser.i18n.getMessage('policy_description_DisableProfileRefresh'),
    enterprise_only : false,
    first_available : '60.0',
    ui_category : 'disable-features',
    type : 'boolean'
  },

  DisableSafeMode : {
    description : browser.i18n.getMessage('policy_description_DisableSafeMode'),
    enterprise_only : false,
    first_available : '60.0',
    ui_category : 'disable-features',
    type : 'boolean'
  },

  DisableFeedbackCommands : {
    description : browser.i18n.getMessage('policy_description_DisableFeedbackCommands'),
    enterprise_only : false,
    first_available : '60.0',
    ui_category : 'disable-features',
    type : 'boolean'
  },

  // customization

  DisplayMenuBar : {
    description : browser.i18n.getMessage('policy_description_DisplayMenuBar'),
    enterprise_only : false,
    first_available : '60.0',
    ui_category : 'customization',
    type : 'boolean'
  },

  DisplayBookmarksToolbar : {
    description : browser.i18n.getMessage('policy_description_DisplayBookmarksToolbar'),
    enterprise_only : false,
    first_available : '60.0',
    ui_category : 'customization',
    type : 'boolean'
  },

  Homepage : {
    description : browser.i18n.getMessage('policy_description_Homepage'),
    enterprise_only : true,
    first_available : '60.0',
    ui_category : 'customization',
    type : 'object',
    properties : [
      {
        name : 'URL',
        label : browser.i18n.getMessage('policy_description_Homepage_URL'),
        mandatory: true,
        type : 'url'
      },
      {
        name : 'Additional',
        label : browser.i18n.getMessage('policy_description_Homepage_Additional'),
        mandatory : false,
        type : 'array',
        items: {
          label : browser.i18n.getMessage('policy_description_Homepage_URL'),
          type : 'url'
        }
      }
    ]
  },

  SearchBar : {
    description : browser.i18n.getMessage('policy_description_SearchBar'),
    enterprise_only : true,
    first_available : '60.0',
    ui_category : 'customization',
    type : 'enum',
    label : browser.i18n.getMessage('policy_description_SearchBar_label'),
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

  NoDefaultBookmarks : {
    description : browser.i18n.getMessage('policy_description_Homepage_URL'),
    enterprise_only : false,
    first_available : '60.0',
    ui_category : 'customization',
    type : 'boolean'
  },

  Bookmarks : {
    description : browser.i18n.getMessage('policy_description_Bookmarks'),
    enterprise_only : false,
    first_available : '60.0',
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
      },
      {
        name : 'Folder',
        label : browser.i18n.getMessage('policy_description_Bookmarks_Folder'),
        mandatory : false,
        type : 'string'
      }
    ]
  },

  InstallAddonsPermission : {
    description : browser.i18n.getMessage('policy_description_InstallAddonsPermission'),
    enterprise_only : false,
    first_available : '60.0',
    ui_category : 'customization',
    type : 'object',
    properties : [
      {
        name : 'Default',
        label : browser.i18n.getMessage('policy_description_InstallAddonsPermission_Default'),
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
        items: {
          label : browser.i18n.getMessage('policy_description_InstallAddonsPermission_Allow_URL'),
          type : 'url'
        }
      }
    ]
  },

  Extensions : {
    description : browser.i18n.getMessage('policy_description_Extensions'),
    enterprise_only : true,
    first_available : '60.0',
    ui_category : 'customization',
    type : 'object',
    properties : [
      {
        name : 'Install',
        label : browser.i18n.getMessage('policy_description_Extensions_Install'),
        mandatory: false,
        type : 'array',
        items: {
          label : browser.i18n.getMessage('policy_description_Extensions_Install_URL_or_Path'),
          type : 'string'
        }
      },
      {
        name : 'Uninstall',
        label : browser.i18n.getMessage('policy_description_Extensions_Uninstall'),
        mandatory: false,
        type : 'array',
        items: {
          label : browser.i18n.getMessage('policy_description_Extensions_Uninstall_ID'),
          type : 'string'
        }
      },
      {
        name : 'Locked',
        label : browser.i18n.getMessage('policy_description_Extensions_Locked'),
        mandatory: false,
        type : 'array',
        items: {
          label : browser.i18n.getMessage('policy_description_Extensions_Locked_ID'),
          type : 'string'
        }
      }
    ]
  },

  // network

  WebsiteFilter : {
    description : browser.i18n.getMessage('policy_description_WebsiteFilter'),
    enterprise_only : true,
    first_available : '60.0',
    ui_category : 'network',
    type : 'object',
    properties : [
      {
        name : 'Block',
        label : browser.i18n.getMessage('policy_description_WebsiteFilter_Block'),
        mandatory: false,
        type : 'array',
        items: {
          label : browser.i18n.getMessage('policy_description_WebsiteFilter_Block_URL'),
          type : 'string'
        }
      },
      {
        name : 'Exceptions',
        label : browser.i18n.getMessage('policy_description_WebsiteFilter_Exceptions'),
        mandatory : false,
        type : 'array',
        items: {
          label : browser.i18n.getMessage('policy_description_WebsiteFilter_Exceptions_URL'),
          type : 'string'
        }
      }
    ]
  },

  Proxy : {
    description : browser.i18n.getMessage('policy_description_Proxy'),
    enterprise_only : false,
    first_available : '60.0',
    ui_category : 'network',
    type : 'object',
    properties : [
      {
        name : 'Mode',
        label : browser.i18n.getMessage('policy_description_Proxy_Mode'),
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
        label : browser.i18n.getMessage('policy_description_Proxy_UseHTTPProxyForAllProtocols'),
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
        label : browser.i18n.getMessage('policy_description_Proxy_SOCKSVersion'),
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
        type : 'string'
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
    enterprise_only : true,
    first_available : '60.0',
    ui_category : 'network',
    type : 'object',
    properties : [
      {
        name : 'SPNEGO',
        label : browser.i18n.getMessage('policy_description_Authentication_SPNEGO'),
        mandatory : false,
        type : 'array',
        items: {
          label : browser.i18n.getMessage('policy_description_Authentication_SPNEGO_URL'),
          type : 'string'
        }
      },
      {
        name : 'Delegated',
        label : browser.i18n.getMessage('policy_description_Authentication_Delegated'),
        mandatory : false,
        type : 'array',
        items: {
          label : browser.i18n.getMessage('policy_description_Authentication_Delegated_URL'),
          type : 'string'
        }
      },
      {
        name : 'NTLM',
        label : browser.i18n.getMessage('policy_description_Authentication_NTLM'),
        mandatory : false,
        type : 'array',
        items: {
          label : browser.i18n.getMessage('policy_description_Authentication_NTLM_URL'),
          type : 'string'
        }
      }
    ]
  },

  // privacy

  Cookies : {
    description : browser.i18n.getMessage('policy_description_Cookies'),
    enterprise_only : false,
    first_available : '60.0',
    ui_category : 'privacy',
    type : 'object',
    properties : [
      {
        name : 'Allow',
        label : browser.i18n.getMessage('policy_description_Cookies_Allow'),
        mandatory : false,
        type : 'array',
        items: {
          label : browser.i18n.getMessage('policy_description_Cookies_Allow_Domain'),
          type : 'string'
        }
      },
      {
        name : 'Block',
        label : browser.i18n.getMessage('policy_description_Cookies_Block'),
        mandatory : false,
        type : 'array',
        items: {
          label : browser.i18n.getMessage('policy_description_Cookies_Block_Domain'),
          type : 'string'
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
      }
    ]
  },

  SanitizeOnShutdown : {
    description : browser.i18n.getMessage('policy_description_SanitizeOnShutdown'),
    enterprise_only : false,
    first_available : '60.0',
    ui_category : 'privacy',
    type : 'boolean'
  },

  EnableTrackingProtection : {
    description : browser.i18n.getMessage('policy_description_EnableTrackingProtection'),
    enterprise_only : false,
    first_available : '60.0',
    ui_category : 'privacy',
    type : 'object',
    properties : [
      {
        name : 'Value',
        label : browser.i18n.getMessage('policy_description_EnableTrackingProtection_Value'),
        mandatory : true,
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

  // security

  FlashPlugin : {
    description : browser.i18n.getMessage('policy_description_FlashPlugin'),
    enterprise_only : false,
    first_available : '60.0',
    ui_category : 'security',
    type : 'object',
    properties : [
      {
        name : 'Allow',
        label : browser.i18n.getMessage('policy_description_FlashPlugin_Allow'),
        mandatory: false,
        type : 'array',
        items: {
          label : browser.i18n.getMessage('policy_description_FlashPlugin_Allow_URL'),
          type : 'string'
        }
      },
      {
        name : 'Block',
        label : browser.i18n.getMessage('policy_description_FlashPlugin_Block'),
        mandatory: false,
        type : 'array',
        items: {
          label : browser.i18n.getMessage('policy_description_FlashPlugin_Block_URL'),
          type : 'string'
        }
      },
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
      }
    ]
  },

  DisableSecurityBypass : {
    description : browser.i18n.getMessage('policy_description_DisableSecurityBypass'),
    enterprise_only : false,
    first_available : '60.0',
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
            label : 'prevent',
            value : browser.i18n.getMessage('policy_description_DisableSecurityBypass_SafeBrowsing_true')
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
    first_available : '60.0',
    ui_category : 'security',
    type : 'object',
    properties : [
      {
        name : 'ImportEnterpriseRoots',
        label : browser.i18n.getMessage('policy_description_Certificates_ImportEnterpriseRoots'),
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
    enterprise_only : true,
    first_available : '60.0',
    ui_category : 'updates-and-data',
    type : 'boolean'
  },

  DisableSystemAddonUpdate : {
    description : browser.i18n.getMessage('policy_description_DisableSystemAddonUpdate'),
    enterprise_only : true,
    first_available : '60.0',
    ui_category : 'updates-and-data',
    type : 'boolean'
  },

  DisableTelemetry : {
    description : browser.i18n.getMessage('policy_description_DisableTelemetry'),
    enterprise_only : true,
    first_available : '60.0',
    ui_category : 'updates-and-data',
    type : 'boolean'
  },

  DisableFirefoxStudies : {
    description : browser.i18n.getMessage('policy_description_DisableFirefoxStudies'),
    enterprise_only : false,
    first_available : '60.0',
    ui_category : 'updates-and-data',
    type : 'boolean'
  },

  // others

  PopupBlocking : {
    description : browser.i18n.getMessage('policy_description_PopupBlocking'),
    enterprise_only : false,
    first_available : '60.0',
    ui_category : 'others',
    type : 'object',
    properties : [
      {
        name : 'Default',
        label : browser.i18n.getMessage('policy_description_PopupBlocking_Default'),
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
        items: {
          label : browser.i18n.getMessage('policy_description_PopupBlocking_Allow_URL'),
          type : 'url'
        }
      }
    ]
  },

  OfferToSaveLogins : {
    description : browser.i18n.getMessage('policy_description_OfferToSaveLogins'),
    enterprise_only : false,
    first_available : '60.0',
    ui_category : 'others',
    type : 'enum',
    label : browser.i18n.getMessage('policy_description_OfferToSaveLogins_label'),
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
    first_available : '60.0',
    ui_category : 'others',
    type : 'boolean'
  },

  OverrideFirstRunPage : {
    description : browser.i18n.getMessage('policy_description_OverrideFirstRunPage'),
    enterprise_only : true,
    first_available : '60.0',
    ui_category : 'others',
    type : 'string',
    label : 'URL'
  },

  OverridePostUpdatePage : {
    description: browser.i18n.getMessage('policy_description_OverridePostUpdatePage'),
    enterprise_only: true,
    first_available: '60.0',
    ui_category: 'others',
    type: 'string',
    label: 'URL'
  }
};
