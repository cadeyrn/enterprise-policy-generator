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
    description : 'Disable the private browsing mode',
    enterprise_only : false,
    first_available : '60.0',
    ui_category : 'disable-features',
    type : 'boolean'
  },

  DisableFormHistory : {
    description : 'Disable the form and search bar history',
    enterprise_only : false,
    first_available : '60.0',
    ui_category : 'disable-features',
    type : 'boolean'
  },

  DisableBuiltinPDFViewer : {
    description : 'Disable the built-in PDF viewer (PDF.js)',
    enterprise_only : false,
    first_available : '60.0',
    ui_category : 'disable-features',
    type : 'boolean'
  },

  DisableFirefoxScreenshots : {
    description : 'Disable the built-in screenshot tool (Firefox Screenshots)',
    enterprise_only : false,
    first_available : '60.0',
    ui_category : 'disable-features',
    type : 'boolean'
  },

  DisableDeveloperTools : {
    description : 'Disable the built-in developer tools',
    enterprise_only : false,
    first_available : '60.0',
    ui_category : 'disable-features',
    type : 'boolean'
  },

  DisablePocket : {
    description : 'Disable the integration of Pocket, a service by Mozilla',
    enterprise_only : false,
    first_available : '60.0',
    ui_category : 'disable-features',
    type : 'boolean'
  },

  DisableFirefoxAccounts : {
    description : 'Disable Firefox Account based services, including Firefox Sync',
    enterprise_only : false,
    first_available : '60.0',
    ui_category : 'disable-features',
    type : 'boolean'
  },

  DisableMasterPasswordCreation : {
    description : 'Disable the master password feature',
    enterprise_only : false,
    first_available : '60.0',
    ui_category : 'disable-features',
    type : 'boolean'
  },

  DisableSetDesktopBackground : {
    description : 'Disable the feature to set an image as desktop background',
    enterprise_only : false,
    first_available : '60.0',
    ui_category : 'disable-features',
    type : 'boolean'
  },

  DisableForgetButton : {
    description : 'Disable the "Forget" toolbar button which can be used to forget the last browsing history',
    enterprise_only : false,
    first_available : '60.0',
    ui_category : 'disable-features',
    type : 'boolean'
  },

  DisableProfileImport : {
    description : 'Disable the "Import data from another browser" menu item in the library',
    enterprise_only : false,
    first_available : '60.0',
    ui_category : 'disable-features',
    type : 'boolean'
  },

  DisableProfileRefresh : {
    description : 'Disable the "Refresh Firefox" button in about:support',
    enterprise_only : false,
    first_available : '60.0',
    ui_category : 'disable-features',
    type : 'boolean'
  },

  DisableSafeMode : {
    description : 'Disable the ability to restart Firefox with add-ons disabled (safe mode)',
    enterprise_only : false,
    first_available : '60.0',
    ui_category : 'disable-features',
    type : 'boolean'
  },

  DisableFeedbackCommands : {
    description : 'Disable the menu items "Submit Feedback" and "Report Deceptive Site" in the help menu',
    enterprise_only : false,
    first_available : '60.0',
    ui_category : 'disable-features',
    type : 'boolean'
  },

  // customization

  DisplayMenuBar : {
    description : 'Show the menu bar by default',
    enterprise_only : false,
    first_available : '60.0',
    ui_category : 'customization',
    type : 'boolean'
  },

  DisplayBookmarksToolbar : {
    description : 'Show the bookmarks toolbar by default',
    enterprise_only : false,
    first_available : '60.0',
    ui_category : 'customization',
    type : 'boolean'
  },

  Homepage : {
    description : 'Set the homepage',
    enterprise_only : true,
    first_available : '60.0',
    ui_category : 'customization',
    type : 'object',
    properties : [
      {
        name : 'URL',
        label : 'URL',
        mandatory: true,
        type : 'url'
      },
      {
        name : 'Additional',
        label : 'Additional URLs',
        mandatory : false,
        type : 'array',
        items: {
          label : 'URL',
          type : 'url'
        }
      }
    ]
  },

  NoDefaultBookmarks : {
    description : 'Don\'t create the default bookmarks bundled with Firefox, including the smart mookmarks (most visited and recent tags). Note: this policy is only effective if used before the first run of the profile',
    enterprise_only : false,
    first_available : '60.0',
    ui_category : 'customization',
    type : 'boolean'
  },

  Bookmarks : {
    description : 'Create default bookmarks',
    enterprise_only : false,
    first_available : '60.0',
    ui_category : 'customization',
    type : 'array',
    items : [
      {
        name : 'Title',
        label : 'Title',
        mandatory : true,
        type : 'string'
      },
      {
        name : 'URL',
        label : 'URL',
        mandatory : true,
        type : 'url'
      },
      {
        name : 'Favicon',
        label : 'Favicon',
        mandatory : false,
        type : 'url'
      },
      {
        name : 'Placement',
        label : 'Placement',
        mandatory : false,
        type : 'enum',
        options : [
          {
            label : 'Toolbar',
            value : 'toolbar'
          },
          {
            label : 'Menu',
            value : 'menu'
          }
        ]
      },
      {
        name : 'Folder',
        label : 'Folder',
        mandatory : false,
        type : 'string'
      }
    ]
  },

  InstallAddonsPermission : {
    description : 'Allow webites to install add-ons',
    enterprise_only : false,
    first_available : '60.0',
    ui_category : 'customization',
    type : 'object',
    properties : [
      {
        name : 'Default',
        label : 'If this is set to false, add-ons cannot be installed by the user',
        mandatory : false,
        type : 'enum',
        options : [
          {
            label : 'add-ons can be installed by the user',
            value : 'true'
          },
          {
            label : 'add-ons can\'t be installed by the user',
            value : 'false'
          }
        ]
      },
      {
        name : 'Allow',
        label : 'Websites that can install extensions (unless the installation of add-ons is disabled)',
        mandatory : false,
        type : 'array',
        items: {
          label : 'URL',
          type : 'url'
        }
      }
    ]
  },

  Extensions : {
    description : 'Install, uninstall or lock extensions',
    enterprise_only : true,
    first_available : '60.0',
    ui_category : 'customization',
    type : 'object',
    properties : [
      {
        name : 'Install',
        label : 'You can specify a list of URLs or paths',
        mandatory: false,
        type : 'array',
        items: {
          label : 'Path',
          type : 'string'
        }
      },
      {
        name : 'Uninstall',
        label : 'Please specify extension IDs',
        mandatory: false,
        type : 'array',
        items: {
          label : 'Add-on ID',
          type : 'string'
        }
      },
      {
        name : 'Locked',
        label : 'Locked extensions cannot be disabled or uninstalled. Please specify extension IDs',
        mandatory: false,
        type : 'array',
        items: {
          label : 'Add-on ID',
          type : 'string'
        }
      }
    ]
  },

  // privacy

  Cookies : {
    description : 'Allow or deny websites to set cookies',
    enterprise_only : false,
    first_available : '60.0',
    ui_category : 'privacy',
    type : 'object',
    properties : [
      {
        name : 'Allow',
        label : 'Domains where cookies are always allowed',
        mandatory : false,
        type : 'array',
        items: {
          label : 'Domain',
          type : 'string'
        }
      },
      {
        name : 'Block',
        label : 'Domains where cookies are always blocked',
        mandatory : false,
        type : 'array',
        items: {
          label : 'Domain',
          type : 'string'
        }
      },
      {
        name : 'Default',
        label : 'The default value for "Accept cookies from websites"',
        mandatory : false,
        type : 'enum',
        options : [
          {
            label : 'accept cookies',
            value : 'true'
          },
          {
            label : 'don\'t accept cookies',
            value : 'false'
          }
        ]
      },
      {
        name : 'AcceptThirdParty',
        label : 'The default value for "Accept third-party cookies"',
        mandatory : false,
        type : 'enum',
        options : [
          {
            label : 'always',
            value : 'always'
          },
          {
            label : 'never',
            value : 'never'
          },
          {
            label : 'from visited',
            value : 'from-visited'
          }
        ]
      },
      {
        name : 'ExpireAtSessionEnd',
        label : 'This determines when cookies expire',
        mandatory : false,
        type : 'enum',
        options : [
          {
            label : 'expire at session end',
            value : 'true'
          },
          {
            label : 'don\'t expire at session end',
            value : 'false'
          }
        ]
      }
    ]
  },

  SanitizeOnShutdown : {
    description : 'Clear all browser data on shutdown',
    enterprise_only : false,
    first_available : '60.0',
    ui_category : 'privacy',
    type : 'boolean'
  },

  EnableTrackingProtection : {
    description : 'Enable or disables tracking protection',
    enterprise_only : false,
    first_available : '60.0',
    ui_category : 'privacy',
    type : 'object',
    properties : [
      {
        name : 'Value',
        label : 'Enable or disables tracking protection',
        mandatory : true,
        type : 'enum',
        options : [
          {
            label : 'enable',
            value : 'true'
          },
          {
            label : 'disable',
            value : 'false'
          }
        ]
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
