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
    description : 'Blocks websites from being visited. Only http/https accesses are supported at the moment, you can also use "<all_urls>"',
    enterprise_only : true,
    first_available : '60.0',
    ui_category : 'network',
    type : 'object',
    properties : [
      {
        name : 'Block',
        label : 'Block the following URLs',
        mandatory: false,
        type : 'array',
        items: {
          label : 'URL',
          type : 'string'
        }
      },
      {
        name : 'Exceptions',
        label : 'Exceptions',
        mandatory : false,
        type : 'array',
        items: {
          label : 'URL',
          type : 'string'
        }
      }
    ]
  },

  Proxy : {
    description : 'Configure proxy settings.',
    enterprise_only : false,
    first_available : '60.0',
    ui_category : 'network',
    type : 'object',
    properties : [
      {
        name : 'Mode',
        label : 'Configure proxy access to the internet',
        mandatory : false,
        type : 'enum',
        options : [
          {
            label : 'no proxy',
            value : 'none'
          },
          {
            label : 'use system proxy settings',
            value : 'system'
          },
          {
            label : 'auto-detect proxy settings for this network',
            value : 'autoDetect'
          },
          {
            label : 'manual proxy configuration',
            value : 'manual'
          },
          {
            label : 'automatic proxy configuration url',
            value : 'autoConfig'
          }
        ]
      },
      {
        name : 'HTTPProxy',
        label : 'HTTP Proxy. To configure port numbers please add a ":" followed by the port number',
        mandatory : false,
        type : 'string'
      },
      {
        name : 'UseHTTPProxyForAllProtocols',
        label : 'Use this proxy server for all protocols',
        type : 'enum',
        options : [
          {
            label : 'use for all',
            value : 'true'
          },
          {
            label : 'don\'t use for all',
            value : 'false'
          }
        ]
      },
      {
        name : 'SSLProxy',
        label : 'SSL Proxy. To configure port numbers please add a ":" followed by the port number',
        mandatory : false,
        type : 'string'
      },
      {
        name : 'FTPProxy',
        label : 'FTP Proxy. To configure port numbers please add a ":" followed by the port number',
        mandatory : false,
        type : 'string'
      },
      {
        name : 'SOCKSProxy',
        label : 'SOCKS Host. To configure port numbers please add a ":" followed by the port number',
        mandatory : false,
        type : 'string'
      },
      {
        name : 'SOCKSVersion',
        label : 'SOCKS Version',
        type : 'enum',
        options : [
          {
            label : 'SOCKS v4',
            value : '4'
          },
          {
            label : 'SOCKS v5',
            value : '5'
          }
        ]
      },
      {
        name : 'Passthrough',
        label : 'List of passthrough addresses / domains',
        mandatory : false,
        type : 'string'
      },
      {
        name : 'AutoConfigURL',
        label : 'Automatic proxy configuration URL',
        mandatory : false,
        type : 'string'
      },
      {
        name : 'AutoLogin',
        label : 'AutoLogin',
        type : 'enum',
        options : [
          {
            label : 'true',
            value : 'true'
          },
          {
            label : 'false',
            value : 'false'
          }
        ]
      },
      {
        name : 'UseProxyForDNS',
        label : 'Use proxy for DNS',
        type : 'enum',
        options : [
          {
            label : 'true',
            value : 'true'
          },
          {
            label : 'false',
            value : 'false'
          }
        ]
      }
    ]
  },

  Authentication : {
    description : 'Sites that support integrated authentication',
    enterprise_only : true,
    first_available : '60.0',
    ui_category : 'network',
    type : 'object',
    properties : [
      {
        name : 'SPNEGO',
        label : 'SPNEGO',
        mandatory : false,
        type : 'array',
        items: {
          label : 'URL',
          type : 'string'
        }
      },
      {
        name : 'Delegated',
        label : 'Delegated',
        mandatory : false,
        type : 'array',
        items: {
          label : 'URL',
          type : 'string'
        }
      },
      {
        name : 'NTLM',
        label : 'NTLM',
        mandatory : false,
        type : 'array',
        items: {
          label : 'URL',
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
    description : 'Allow or deny flash plugin usage',
    enterprise_only : false,
    first_available : '60.0',
    ui_category : 'security',
    type : 'object',
    properties : [
      {
        name : 'Allow',
        label : 'For these URLs Flash is enabled by default unless Flash is completely disabled',
        mandatory: false,
        type : 'array',
        items: {
          label : 'URL',
          type : 'string'
        }
      },
      {
        name : 'Block',
        label : 'For these URLs Flash is blocked',
        mandatory: false,
        type : 'array',
        items: {
          label : 'URL',
          type : 'string'
        }
      },
      {
        name : 'Default',
        label : 'Always enable or disable Flash',
        mandatory : false,
        type : 'enum',
        options : [
          {
            label : 'No preference',
            value : null
          },
          {
            label : 'Flash is always enabled',
            value : 'true'
          },
          {
            label : 'Flash is always disabled',
            value : 'false'
          }
        ]
      }
    ]
  },

  DisableSecurityBypass : {
    description : 'Bypass certain security warnings',
    enterprise_only : false,
    first_available : '60.0',
    ui_category : 'security',
    type : 'object',
    properties : [
      {
        name : 'InvalidCertificate',
        label : 'Prevent adding an exception when an invalid certificate is shown',
        mandatory : false,
        type : 'enum',
        options : [
          {
            label : 'prevent',
            value : 'true'
          },
          {
            label : 'don\'t prevent',
            value : 'false'
          }
        ]
      },
      {
        name : 'SafeBrowsing',
        label : 'Prevent selecting "ignore the risk" and visiting a harmful site anyway',
        mandatory : false,
        type : 'enum',
        options : [
          {
            label : 'prevent',
            value : 'true'
          },
          {
            label : 'don\'t prevent',
            value : 'false'
          }
        ]
      }
    ]
  },

  Certificates : {
    description : 'Whether or not to use built in certs. This policy is Windows only',
    enterprise_only : false,
    first_available : '60.0',
    ui_category : 'security',
    type : 'object',
    properties : [
      {
        name : 'ImportEnterpriseRoots',
        label : 'Import enterprise roots',
        mandatory : false,
        type : 'enum',
        options : [
          {
            label : 'import',
            value : 'true'
          },
          {
            label : 'don\'t import',
            value : 'false'
          }
        ]
      }
    ]
  },

  // udpates and data collection

  DisableAppUpdate : {
    description : 'Prevent Firefox from updating',
    enterprise_only : true,
    first_available : '60.0',
    ui_category : 'updates-and-data',
    type : 'boolean'
  },

  DisableSystemAddonUpdate : {
    description : 'Prevent Firefox from installing and updating system add-ons',
    enterprise_only : true,
    first_available : '60.0',
    ui_category : 'updates-and-data',
    type : 'boolean'
  },

  DisableTelemetry : {
    description : 'Prevent Firefox from sending technical and interaction data to Mozilla (telemetry)',
    enterprise_only : true,
    first_available : '60.0',
    ui_category : 'updates-and-data',
    type : 'boolean'
  },

  DisableFirefoxStudies : {
    description : 'Prevent Firefox from installing and running studies (SHIELD studies)',
    enterprise_only : false,
    first_available : '60.0',
    ui_category : 'updates-and-data',
    type : 'boolean'
  },

  // others

  PopupBlocking : {
    description : 'Allow or deny popup usage',
    enterprise_only : false,
    first_available : '60.0',
    ui_category : 'others',
    type : 'object',
    properties : [
      {
        name : 'Default',
        label : 'Block pop-up windows',
        mandatory : false,
        type : 'enum',
        options : [
          {
            label : 'pop-ups are blocked by default',
            value : 'true'
          },
          {
            label : 'pop-ups are not blocked by default when pop-ups are blocked',
            value : 'false'
          }
        ]
      },
      {
        name : 'Allow',
        label : 'Domains for which pop-up windows are allowed',
        mandatory : false,
        type : 'array',
        items: {
          label : 'URL',
          type : 'url'
        }
      }
    ]
  },

  OfferToSaveLogins : {
    description : 'Enforce the setting to allow Firefox to offer to remember saved logins and passwords',
    enterprise_only : false,
    first_available : '60.0',
    ui_category : 'others',
    type : 'boolean'
  },

  DontCheckDefaultBrowser : {
    description : 'Don\'t check for the default browser on startup',
    enterprise_only : false,
    first_available : '60.0',
    ui_category : 'others',
    type : 'boolean'
  },

  OverrideFirstRunPage : {
    description : 'Override the first run page. Set this policy to blank if you want to disable the first run page',
    enterprise_only : true,
    first_available : '60.0',
    ui_category : 'others',
    type : 'string',
    label : 'URL'
  },

  OverridePostUpdatePage : {
    description: 'Override the post-update "What\'s New" page. Set this policy to blank if you want to disable the post-update page',
    enterprise_only: true,
    first_available: '60.0',
    ui_category: 'others',
    type: 'string',
    label: 'URL'
  }
};
