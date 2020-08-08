'use strict';

/**
 * @exports policies
 */
const policies = {
  // block access

  BlockAboutAddons : {
    first_available : { mainstream : '60.0', esr : '60.0' },
    ui_category : 'block-access',
    type : 'boolean'
  },

  BlockAboutConfig : {
    first_available : { mainstream : '60.0', esr : '60.0' },
    ui_category : 'block-access',
    type : 'boolean'
  },

  BlockAboutProfiles : {
    first_available : { mainstream : '60.0', esr : '60.0' },
    ui_category : 'block-access',
    type : 'boolean'
  },

  BlockAboutSupport : {
    first_available : { mainstream : '60.0', esr : '60.0' },
    ui_category : 'block-access',
    type : 'boolean'
  },

  // disable features

  DisablePrivateBrowsing : {
    first_available : { mainstream : '60.0', esr : '60.0' },
    ui_category : 'disable-features',
    type : 'boolean'
  },

  DisableFormHistory : {
    first_available : { mainstream : '60.0', esr : '60.0' },
    ui_category : 'disable-features',
    type : 'boolean'
  },

  DisableFirefoxScreenshots : {
    first_available : { mainstream : '60.0', esr : '60.0' },
    ui_category : 'disable-features',
    type : 'boolean'
  },

  DisableDeveloperTools : {
    first_available : { mainstream : '60.0', esr : '60.0' },
    ui_category : 'disable-features',
    type : 'boolean'
  },

  DisablePocket : {
    first_available : { mainstream : '60.0', esr : '60.0' },
    ui_category : 'disable-features',
    type : 'boolean'
  },

  DisableFirefoxAccounts : {
    first_available : { mainstream : '60.0', esr : '60.0' },
    ui_category : 'disable-features',
    type : 'boolean'
  },

  DisableSetDesktopBackground : {
    first_available : { mainstream : '60.0', esr : '60.0' },
    ui_category : 'disable-features',
    type : 'boolean'
  },

  DisableForgetButton : {
    first_available : { mainstream : '60.0', esr : '60.0' },
    ui_category : 'disable-features',
    type : 'boolean'
  },

  DisableProfileImport : {
    first_available : { mainstream : '60.0', esr : '60.0' },
    ui_category : 'disable-features',
    type : 'boolean'
  },

  DisableSafeMode : {
    first_available : { mainstream : '60.0', esr : '60.0' },
    ui_category : 'disable-features',
    type : 'boolean'
  },

  DisableProfileRefresh : {
    first_available : { mainstream : '60.0', esr : '60.0' },
    ui_category : 'disable-features',
    type : 'boolean'
  },

  DisableFeedbackCommands : {
    first_available : { mainstream : '60.0', esr : '60.0' },
    ui_category : 'disable-features',
    type : 'boolean'
  },

  PictureInPicture : {
    first_available : { mainstream : '78.0', esr : '78.0' },
    is_lockable : true,
    ui_category : 'disable-features',
    type : 'object',
    properties : [
      {
        name : 'Enabled',
        type : 'enum',
        options : [
          {
            label : browser.i18n.getMessage('enum_value_no_preference'),
            value : null
          },
          {
            label : browser.i18n.getMessage('enum_value_enable_yes'),
            value : 'true'
          },
          {
            label : browser.i18n.getMessage('enum_value_enable_no'),
            value : 'false'
          }
        ]
      }
    ]
  },

  UserMessaging : {
    first_available : { mainstream : '75.0', esr : '68.7' },
    is_lockable : true,
    ui_category : 'disable-features',
    type : 'object',
    properties : [
      {
        name : 'WhatsNew',
        label : browser.i18n.getMessage('policy_description_UserMessaging_WhatsNew'),
        type : 'enum',
        options : [
          {
            label : browser.i18n.getMessage('enum_value_no_preference'),
            value : null
          },
          {
            label : browser.i18n.getMessage('enum_value_yes'),
            value : 'true'
          },
          {
            label : browser.i18n.getMessage('enum_value_no'),
            value : 'false'
          }
        ]
      },
      {
        name : 'ExtensionRecommendations',
        label : browser.i18n.getMessage('policy_description_UserMessaging_ExtensionRecommendations'),
        type : 'enum',
        options : [
          {
            label : browser.i18n.getMessage('enum_value_no_preference'),
            value : null
          },
          {
            label : browser.i18n.getMessage('enum_value_yes'),
            value : 'true'
          },
          {
            label : browser.i18n.getMessage('enum_value_no'),
            value : 'false'
          }
        ]
      },
      {
        name : 'FeatureRecommendations',
        label : browser.i18n.getMessage('policy_description_UserMessaging_FeatureRecommendations'),
        type : 'enum',
        options : [
          {
            label : browser.i18n.getMessage('enum_value_no_preference'),
            value : null
          },
          {
            label : browser.i18n.getMessage('enum_value_yes'),
            value : 'true'
          },
          {
            label : browser.i18n.getMessage('enum_value_no'),
            value : 'false'
          }
        ]
      },
      {
        name : 'UrlbarInterventions',
        label : browser.i18n.getMessage('policy_description_UserMessaging_UrlbarInterventions'),
        type : 'enum',
        options : [
          {
            label : browser.i18n.getMessage('enum_value_no_preference'),
            value : null
          },
          {
            label : browser.i18n.getMessage('enum_value_yes'),
            value : 'true'
          },
          {
            label : browser.i18n.getMessage('enum_value_no'),
            value : 'false'
          }
        ]
      },
      {
        name : 'SkipOnboarding',
        label : browser.i18n.getMessage('policy_description_UserMessaging_SkipOnboarding'),
        type : 'enum',
        options : [
          {
            label : browser.i18n.getMessage('enum_value_no_preference'),
            value : null
          },
          {
            label : browser.i18n.getMessage('enum_value_yes'),
            value : 'true'
          },
          {
            label : browser.i18n.getMessage('enum_value_no'),
            value : 'false'
          }
        ]
      }
    ]
  },

  DisableDefaultBrowserAgent : {
    first_available : { mainstream : '75.0', esr : '68.7' },
    ui_category : 'disable-features',
    type : 'boolean'
  },

  // customization

  RequestedLocales : {
    additional_note : browser.i18n.getMessage('policy_description_RequestedLocales_Requirement'),
    first_available : { mainstream : '64.0', esr : '60.3.1' },
    info_link : 'https://addons.mozilla.org/firefox/language-tools/',
    ui_category : 'customization',
    type : 'flat-array',
    value : {
      label : browser.i18n.getMessage('policy_description_RequestedLocales_Value'),
      allow_empty_value : true
    }
  },

  DisplayMenuBar : {
    additional_note : browser.i18n.getMessage('requirement_windows_or_linux'),
    first_available : { mainstream : '73.0', esr : '68.5' },
    ui_category : 'customization',
    type : 'enum',
    options : [
      {
        label : browser.i18n.getMessage('policy_description_DisplayMenuBar_always'),
        value : 'always'
      },
      {
        label : browser.i18n.getMessage('policy_description_DisplayMenuBar_never'),
        value : 'never'
      },
      {
        label : browser.i18n.getMessage('policy_description_DisplayMenuBar_default_on'),
        value : 'default-on'
      },
      {
        label : browser.i18n.getMessage('policy_description_DisplayMenuBar_default_off'),
        value : 'default-off'
      }
    ]
  },

  Preference_ui_key_menuAccessKeyFocuses : {
    additional_note : browser.i18n.getMessage('requirement_windows_or_linux'),
    first_available : { mainstream : '68.0', esr : '68.0' },
    ui_category : 'customization',
    type : 'preference',
    properties : {
      option : 'ui.key.menuAccessKeyFocuses',
      type : 'boolean',
      default : 'true'
    }
  },

  DisplayBookmarksToolbar : {
    first_available : { mainstream : '60.0', esr : '60.0' },
    ui_category : 'customization',
    type : 'boolean'
  },

  Homepage : {
    first_available : { mainstream : '62.0', esr : '60.0' },
    is_lockable : true,
    ui_category : 'customization',
    type : 'object',
    properties : [
      {
        name : 'StartPage',
        label : browser.i18n.getMessage('policy_description_Homepage_StartPage'),
        type : 'enum',
        options : [
          {
            label : browser.i18n.getMessage('policy_description_Homepage_StartPage_Homepage'),
            value : 'homepage'
          },
          {
            label : browser.i18n.getMessage('policy_description_Homepage_StartPage_Homepage_locked'),
            value : 'homepage-locked'
          },
          {
            label : browser.i18n.getMessage('policy_description_Homepage_StartPage_None'),
            value : 'none'
          },
          {
            label : browser.i18n.getMessage('policy_description_Homepage_StartPage_Previous_Session'),
            value : 'previous-session'
          }
        ]
      },
      {
        name : 'URL',
        label : browser.i18n.getMessage('common_url'),
        type : 'url'
      },
      {
        name : 'Additional',
        label : browser.i18n.getMessage('policy_description_Homepage_Additional'),
        type : 'array',
        items : {
          label : browser.i18n.getMessage('common_url'),
          type : 'url'
        }
      }
    ]
  },

  FirefoxHome : {
    first_available : { mainstream : '68.0', esr : '68.0' },
    is_lockable : true,
    ui_category : 'customization',
    type : 'object',
    properties : [
      {
        name : 'Search',
        label : browser.i18n.getMessage('policy_description_FirefoxHome_Search'),
        type : 'enum',
        options : [
          {
            label : browser.i18n.getMessage('enum_value_no_preference'),
            value : null
          },
          {
            label : browser.i18n.getMessage('enum_value_yes'),
            value : 'true'
          },
          {
            label : browser.i18n.getMessage('enum_value_no'),
            value : 'false'
          }
        ]
      },
      {
        name : 'TopSites',
        label : browser.i18n.getMessage('policy_description_FirefoxHome_TopSites'),
        type : 'enum',
        options : [
          {
            label : browser.i18n.getMessage('enum_value_no_preference'),
            value : null
          },
          {
            label : browser.i18n.getMessage('enum_value_yes'),
            value : 'true'
          },
          {
            label : browser.i18n.getMessage('enum_value_no'),
            value : 'false'
          }
        ]
      },
      {
        name : 'Highlights',
        label : browser.i18n.getMessage('policy_description_FirefoxHome_Highlights'),
        type : 'enum',
        options : [
          {
            label : browser.i18n.getMessage('enum_value_no_preference'),
            value : null
          },
          {
            label : browser.i18n.getMessage('enum_value_yes'),
            value : 'true'
          },
          {
            label : browser.i18n.getMessage('enum_value_no'),
            value : 'false'
          }
        ]
      },
      {
        name : 'Pocket',
        label : browser.i18n.getMessage('policy_description_FirefoxHome_Pocket'),
        type : 'enum',
        options : [
          {
            label : browser.i18n.getMessage('enum_value_no_preference'),
            value : null
          },
          {
            label : browser.i18n.getMessage('enum_value_yes'),
            value : 'true'
          },
          {
            label : browser.i18n.getMessage('enum_value_no'),
            value : 'false'
          }
        ]
      },
      {
        name : 'Snippets',
        label : browser.i18n.getMessage('policy_description_FirefoxHome_Snippets'),
        type : 'enum',
        options : [
          {
            label : browser.i18n.getMessage('enum_value_no_preference'),
            value : null
          },
          {
            label : browser.i18n.getMessage('enum_value_yes'),
            value : 'true'
          },
          {
            label : browser.i18n.getMessage('enum_value_no'),
            value : 'false'
          }
        ]
      }
    ]
  },

  NewTabPage : {
    first_available : { mainstream : '68.0', esr : '68.0' },
    ui_category : 'customization',
    type : 'enum',
    options : [
      {
        label : browser.i18n.getMessage('enum_value_enable_yes'),
        value : 'true'
      },
      {
        label : browser.i18n.getMessage('enum_value_enable_no'),
        value : 'false'
      }
    ]
  },

  SearchBar : {
    first_available : { mainstream : '62.0', esr : '60.0' },
    ui_category : 'customization',
    type : 'enum',
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
    additional_note : browser.i18n.getMessage('enterprise_only_label'),
    first_available : { mainstream : '60.0', esr : '60.0' },
    ui_category : 'customization',
    type : 'object',
    properties : [
      {
        name : 'Default',
        label : browser.i18n.getMessage('policy_description_SearchEngines_Default'),
        type : 'string'
      },
      {
        name : 'PreventInstalls',
        label : browser.i18n.getMessage('policy_description_SearchEngines_PreventInstalls'),
        type : 'enum',
        options : [
          {
            label : browser.i18n.getMessage('enum_value_no_preference'),
            value : null
          },
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
            type : 'url'
          },
          {
            name : 'IconURL',
            label : browser.i18n.getMessage('policy_description_SearchEngines_Add_IconURL'),
            type : 'urlOrData'
          },
          {
            name : 'Alias',
            label : browser.i18n.getMessage('policy_description_SearchEngines_Add_Alias'),
            type : 'string'
          },
          {
            name : 'Description',
            label : browser.i18n.getMessage('policy_description_SearchEngines_Add_Description'),
            type : 'string'
          },
          {
            name : 'SuggestURLTemplate',
            label : browser.i18n.getMessage('policy_description_SearchEngines_Add_SuggestURLTemplate'),
            type : 'url'
          },
          {
            name : 'Method',
            label : browser.i18n.getMessage('policy_description_SearchEngines_Add_Method'),
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
          },
          {
            name : 'PostData',
            label : browser.i18n.getMessage('policy_description_SearchEngines_Add_PostData'),
            type : 'string'
          }
        ]
      },
      {
        name : 'Remove',
        label : browser.i18n.getMessage('policy_description_SearchEngines_Remove'),
        type : 'array',
        items : {
          label : browser.i18n.getMessage('policy_description_SearchEngines_Remove_Name'),
          type : 'string'
        }
      }
    ]
  },

  NoDefaultBookmarks : {
    first_available : { mainstream : '60.0', esr : '60.0' },
    ui_category : 'customization',
    type : 'boolean'
  },

  Bookmarks : {
    first_available : { mainstream : '60.0', esr : '60.0' },
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
        label : browser.i18n.getMessage('common_url'),
        mandatory : true,
        type : 'url'
      },
      {
        name : 'Favicon',
        label : browser.i18n.getMessage('policy_description_Bookmarks_Favicon'),
        type : 'url'
      },
      {
        name : 'Folder',
        label : browser.i18n.getMessage('policy_description_Bookmarks_Folder'),
        type : 'string'
      },
      {
        name : 'Placement',
        label : browser.i18n.getMessage('policy_description_Bookmarks_Placement'),
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

  Preference_extensions_getAddons_showPane : {
    first_available : { mainstream : '68.0', esr : '68.0' },
    ui_category : 'customization',
    type : 'preference',
    properties : {
      option : 'extensions.getAddons.showPane',
      type : 'boolean',
      default : 'true'
    }
  },

  InstallAddonsPermission : {
    deprecation_note : browser.i18n.getMessage('policy_description_InstallAddonsPermission_Deprecated'),
    first_available : { mainstream : '60.0', esr : '60.0' },
    ui_category : 'customization',
    type : 'object',
    properties : [
      {
        name : 'Default',
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
        type : 'array',
        items : {
          label : browser.i18n.getMessage('common_url'),
          type : 'url'
        }
      }
    ]
  },

  Extensions : {
    deprecation_note : browser.i18n.getMessage('policy_description_Extensions_Deprecated'),
    first_available : { mainstream : '62.0', esr : '60.0' },
    ui_category : 'customization',
    type : 'object',
    properties : [
      {
        name : 'Install',
        label : browser.i18n.getMessage('policy_description_Extensions_Install'),
        type : 'array',
        items : {
          label : browser.i18n.getMessage('policy_description_Extensions_Install_URL_or_Path'),
          type : 'string'
        }
      },
      {
        name : 'Uninstall',
        label : browser.i18n.getMessage('policy_description_Extensions_Uninstall'),
        type : 'array',
        items : {
          label : browser.i18n.getMessage('policy_description_Extensions_Uninstall_ID'),
          type : 'string'
        }
      },
      {
        name : 'Locked',
        label : browser.i18n.getMessage('policy_description_Extensions_Locked'),
        type : 'array',
        items : {
          label : browser.i18n.getMessage('policy_description_Extensions_Locked_ID'),
          type : 'string'
        }
      }
    ]
  },

  ExtensionSettings : {
    first_available : { mainstream : '69.0', esr : '68.1' },
    ui_category : 'customization',
    type : 'key-object-list',
    label_key : browser.i18n.getMessage('policy_description_ExtensionSettings_Label_Key'),
    extra : {
      key : '*',
      caption_pre : browser.i18n.getMessage('policy_description_ExtensionSettings_extra_caption_pre'),
      caption_post : browser.i18n.getMessage('policy_description_ExtensionSettings_extra_caption_post'),
      properties : [
        {
          name : 'installation_mode',
          label : browser.i18n.getMessage('policy_description_ExtensionSettings_installation_mode'),
          type : 'enum',
          options : [
            {
              label : browser.i18n.getMessage('enum_value_no_preference'),
              value : null
            },
            {
              label : browser.i18n.getMessage('policy_description_ExtensionSettings_installation_mode_allowed_all'),
              value : 'allowed'
            },
            {
              label : browser.i18n.getMessage('policy_description_ExtensionSettings_installation_mode_blocked_all'),
              value : 'blocked'
            }
          ]
        },
        {
          name : 'install_sources',
          label : browser.i18n.getMessage('policy_description_ExtensionSettings_install_sources'),
          type : 'array',
          items : {
            label : browser.i18n.getMessage('common_url'),
            type : 'string'
          }
        },
        {
          name : 'allowed_types',
          label : browser.i18n.getMessage('policy_description_ExtensionSettings_allowed_types'),
          type : 'multiselect',
          options : [
            {
              value : 'extension',
              label : browser.i18n.getMessage('policy_description_ExtensionSettings_allowed_types_extension')
            },
            {
              value : 'theme',
              label : browser.i18n.getMessage('policy_description_ExtensionSettings_allowed_types_theme')
            },
            {
              value : 'dictionary',
              label : browser.i18n.getMessage('policy_description_ExtensionSettings_allowed_types_dictionary')
            },
            {
              value : 'langpack',
              label : browser.i18n.getMessage('policy_description_ExtensionSettings_allowed_types_langpack')
            }
          ]
        },
        {
          name : 'blocked_install_message',
          caption : browser.i18n.getMessage('policy_description_ExtensionSettings_blocked_install_message_caption_all'),
          label : browser.i18n.getMessage('policy_description_ExtensionSettings_blocked_install_message_label'),
          type : 'string'
        }
      ]
    },
    properties : [
      {
        name : 'installation_mode',
        label : browser.i18n.getMessage('policy_description_ExtensionSettings_installation_mode'),
        type : 'enum',
        options : [
          {
            label : browser.i18n.getMessage('enum_value_no_preference'),
            value : null
          },
          {
            label : browser.i18n.getMessage('policy_description_ExtensionSettings_installation_mode_allowed_single'),
            value : 'allowed'
          },
          {
            label : browser.i18n.getMessage('policy_description_ExtensionSettings_installation_mode_blocked_single'),
            value : 'blocked'
          },
          {
            label : browser.i18n.getMessage('policy_description_ExtensionSettings_installation_mode_force_installed'),
            value : 'force_installed'
          },
          {
            label : browser.i18n.getMessage('policy_description_ExtensionSettings_installation_mode_normal_installed'),
            value : 'normal_installed'
          }
        ]
      },
      {
        name : 'install_url',
        caption : browser.i18n.getMessage('policy_description_ExtensionSettings_install_url_caption'),
        label : browser.i18n.getMessage('common_url'),
        type : 'url'
      },
      {
        name : 'blocked_install_message',
        caption : browser.i18n.getMessage('policy_description_ExtensionSettings_blocked_install_message_caption_single'),
        label : browser.i18n.getMessage('policy_description_ExtensionSettings_blocked_install_message_label'),
        type : 'string'
      }
    ]
  },

  // network

  WebsiteFilter : {
    first_available : { mainstream : '62.0', esr : '60.0' },
    info_link : 'https://developer.mozilla.org/Add-ons/WebExtensions/Match_patterns',
    ui_category : 'network',
    type : 'object',
    properties : [
      {
        name : 'Block',
        label : browser.i18n.getMessage('policy_description_WebsiteFilter_Block'),
        type : 'array',
        items : {
          label : browser.i18n.getMessage('common_url'),
          type : 'string'
        }
      },
      {
        name : 'Exceptions',
        label : browser.i18n.getMessage('policy_description_WebsiteFilter_Exceptions'),
        type : 'array',
        items : {
          label : browser.i18n.getMessage('common_url'),
          type : 'string'
        }
      }
    ]
  },

  DNSOverHTTPS : {
    first_available : { mainstream : '63.0', esr : null },
    is_lockable : true,
    ui_category : 'network',
    type : 'object',
    properties : [
      {
        name : 'Enabled',
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
        type : 'url'
      },
      {
        name : 'ExcludedDomains',
        label : browser.i18n.getMessage('policy_description_DNSOverHTTPS_ExcludedDomains'),
        type : 'array',
        items : {
          label : browser.i18n.getMessage('common_url'),
          type : 'url'
        }
      }
    ]
  },

  NetworkPrediction : {
    first_available : { mainstream : '67.0', esr : '60.7' },
    ui_category : 'network',
    type : 'enum',
    options : [
      {
        label : browser.i18n.getMessage('policy_description_NetworkPrediction_options_true'),
        value : 'true'
      },
      {
        label : browser.i18n.getMessage('policy_description_NetworkPrediction_options_false'),
        value : 'false'
      }
    ]
  },

  Preference_network_dns_disableIPv6 : {
    first_available : { mainstream : '68.0', esr : '68.0' },
    ui_category : 'network',
    type : 'preference',
    properties : {
      option : 'network.dns.disableIPv6',
      type : 'boolean-inverse',
      default : 'false'
    }
  },

  Preference_browser_fixup_dns_first_for_single_words : {
    first_available : { mainstream : '68.0', esr : '68.0' },
    ui_category : 'network',
    type : 'preference',
    properties : {
      option : 'browser.fixup.dns_first_for_single_words',
      type : 'boolean',
      default : 'false'
    }
  },

  Proxy : {
    first_available : { mainstream : '60.0', esr : '60.0' },
    is_lockable : true,
    ui_category : 'network',
    type : 'object',
    properties : [
      {
        name : 'Mode',
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
        type : 'string'
      },
      {
        name : 'UseHTTPProxyForAllProtocols',
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
        type : 'string'
      },
      {
        name : 'FTPProxy',
        label : browser.i18n.getMessage('policy_description_Proxy_FTPProxy'),
        type : 'string'
      },
      {
        name : 'SOCKSProxy',
        label : browser.i18n.getMessage('policy_description_Proxy_SOCKSProxy'),
        type : 'string'
      },
      {
        name : 'SOCKSVersion',
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
        type : 'string'
      },
      {
        name : 'AutoConfigURL',
        label : browser.i18n.getMessage('policy_description_Proxy_AutoConfigURL'),
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
    first_available : { mainstream : '62.0', esr : '60.0' },
    info_link : 'https://developer.mozilla.org/docs/Mozilla/Integrated_authentication',
    is_lockable : true,
    ui_category : 'network',
    type : 'object',
    properties : [
      {
        name : 'PrivateBrowsing',
        label : browser.i18n.getMessage('policy_description_Authentication_PrivateBrowsing'),
        type : 'enum',
        options : [
          {
            label : browser.i18n.getMessage('enum_value_no_preference'),
            value : null
          },
          {
            label : browser.i18n.getMessage('enum_value_yes'),
            value : 'true'
          },
          {
            label : browser.i18n.getMessage('enum_value_no'),
            value : 'false'
          }
        ]
      },
      {
        name : 'SPNEGO',
        label : browser.i18n.getMessage('policy_description_Authentication_SPNEGO'),
        type : 'array',
        items : {
          label : browser.i18n.getMessage('common_url'),
          type : 'string'
        }
      },
      {
        name : 'Delegated',
        label : browser.i18n.getMessage('policy_description_Authentication_Delegated'),
        type : 'array',
        items : {
          label : browser.i18n.getMessage('common_url'),
          type : 'string'
        }
      },
      {
        name : 'NTLM',
        label : browser.i18n.getMessage('policy_description_Authentication_NTLM'),
        type : 'array',
        items : {
          label : browser.i18n.getMessage('common_url'),
          type : 'string'
        }
      },
      {
        name : 'AllowNonFQDN',
        label : browser.i18n.getMessage('policy_description_Authentication_AllowNonFQDN'),
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

  CaptivePortal : {
    first_available : { mainstream : '67.0', esr : '60.7' },
    ui_category : 'network',
    type : 'enum',
    options : [
      {
        label : browser.i18n.getMessage('policy_description_CaptivePortal_options_true'),
        value : 'true'
      },
      {
        label : browser.i18n.getMessage('policy_description_CaptivePortal_options_false'),
        value : 'false'
      }
    ]
  },

  // privacy

  Cookies : {
    first_available : { mainstream : '60.0', esr : '60.0' },
    is_lockable : true,
    ui_category : 'privacy',
    type : 'object',
    properties : [
      {
        name : 'Allow',
        label : browser.i18n.getMessage('policy_description_Cookies_Allow'),
        type : 'array',
        items : {
          label : browser.i18n.getMessage('policy_description_Cookies_Allow_Domain'),
          type : 'url'
        }
      },
      {
        name : 'AllowSession',
        label : browser.i18n.getMessage('policy_description_Cookies_AllowSession'),
        type : 'array',
        items : {
          label : browser.i18n.getMessage('policy_description_Cookies_AllowSession_Domain'),
          type : 'url'
        }
      },
      {
        name : 'Block',
        label : browser.i18n.getMessage('policy_description_Cookies_Block'),
        type : 'array',
        items : {
          label : browser.i18n.getMessage('policy_description_Cookies_Block_Domain'),
          type : 'url'
        }
      },
      {
        name : 'Default',
        label : browser.i18n.getMessage('policy_description_Cookies_Default'),
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
    first_available : { mainstream : '60.0', esr : '60.0' },
    is_lockable : true,
    ui_category : 'privacy',
    type : 'object',
    properties : [
      {
        name : 'Cache',
        label : browser.i18n.getMessage('policy_description_SanitizeOnShutdown_Cache'),
        type : 'enum',
        options : [
          {
            label : browser.i18n.getMessage('enum_value_no_preference'),
            value : null
          },
          {
            label : browser.i18n.getMessage('enum_value_yes'),
            value : 'true'
          },
          {
            label : browser.i18n.getMessage('enum_value_no'),
            value : 'false'
          }
        ]
      },
      {
        name : 'Cookies',
        label : browser.i18n.getMessage('policy_description_SanitizeOnShutdown_Cookies'),
        type : 'enum',
        options : [
          {
            label : browser.i18n.getMessage('enum_value_no_preference'),
            value : null
          },
          {
            label : browser.i18n.getMessage('enum_value_yes'),
            value : 'true'
          },
          {
            label : browser.i18n.getMessage('enum_value_no'),
            value : 'false'
          }
        ]
      },
      {
        name : 'Downloads',
        label : browser.i18n.getMessage('policy_description_SanitizeOnShutdown_Downloads'),
        type : 'enum',
        options : [
          {
            label : browser.i18n.getMessage('enum_value_no_preference'),
            value : null
          },
          {
            label : browser.i18n.getMessage('enum_value_yes'),
            value : 'true'
          },
          {
            label : browser.i18n.getMessage('enum_value_no'),
            value : 'false'
          }
        ]
      },
      {
        name : 'FormData',
        label : browser.i18n.getMessage('policy_description_SanitizeOnShutdown_FormData'),
        type : 'enum',
        options : [
          {
            label : browser.i18n.getMessage('enum_value_no_preference'),
            value : null
          },
          {
            label : browser.i18n.getMessage('enum_value_yes'),
            value : 'true'
          },
          {
            label : browser.i18n.getMessage('enum_value_no'),
            value : 'false'
          }
        ]
      },
      {
        name : 'History',
        label : browser.i18n.getMessage('policy_description_SanitizeOnShutdown_History'),
        type : 'enum',
        options : [
          {
            label : browser.i18n.getMessage('enum_value_no_preference'),
            value : null
          },
          {
            label : browser.i18n.getMessage('enum_value_yes'),
            value : 'true'
          },
          {
            label : browser.i18n.getMessage('enum_value_no'),
            value : 'false'
          }
        ]
      },
      {
        name : 'Sessions',
        label : browser.i18n.getMessage('policy_description_SanitizeOnShutdown_Sessions'),
        type : 'enum',
        options : [
          {
            label : browser.i18n.getMessage('enum_value_no_preference'),
            value : null
          },
          {
            label : browser.i18n.getMessage('enum_value_yes'),
            value : 'true'
          },
          {
            label : browser.i18n.getMessage('enum_value_no'),
            value : 'false'
          }
        ]
      },
      {
        name : 'SiteSettings',
        label : browser.i18n.getMessage('policy_description_SanitizeOnShutdown_SiteSettings'),
        type : 'enum',
        options : [
          {
            label : browser.i18n.getMessage('enum_value_no_preference'),
            value : null
          },
          {
            label : browser.i18n.getMessage('enum_value_yes'),
            value : 'true'
          },
          {
            label : browser.i18n.getMessage('enum_value_no'),
            value : 'false'
          }
        ]
      },
      {
        name : 'OfflineApps',
        label : browser.i18n.getMessage('policy_description_SanitizeOnShutdown_OfflineApps'),
        type : 'enum',
        options : [
          {
            label : browser.i18n.getMessage('enum_value_no_preference'),
            value : null
          },
          {
            label : browser.i18n.getMessage('enum_value_yes'),
            value : 'true'
          },
          {
            label : browser.i18n.getMessage('enum_value_no'),
            value : 'false'
          }
        ]
      }
    ]
  },

  EnableTrackingProtection : {
    first_available : { mainstream : '60.0', esr : '60.0' },
    is_lockable : true,
    ui_category : 'privacy',
    type : 'object',
    properties : [
      {
        name : 'Value',
        label : browser.i18n.getMessage('policy_description_EnableTrackingProtection_Value'),
        type : 'enum',
        options : [
          {
            label : browser.i18n.getMessage('enum_value_no_preference'),
            value : null
          },
          {
            label : browser.i18n.getMessage('enum_value_block_yes'),
            value : 'true'
          },
          {
            label : browser.i18n.getMessage('enum_value_block_no'),
            value : 'false'
          }
        ]
      },
      {
        name : 'Cryptomining',
        label : browser.i18n.getMessage('policy_description_EnableTrackingProtection_Cryptomining'),
        type : 'enum',
        options : [
          {
            label : browser.i18n.getMessage('enum_value_no_preference'),
            value : null
          },
          {
            label : browser.i18n.getMessage('enum_value_block_yes'),
            value : 'true'
          },
          {
            label : browser.i18n.getMessage('enum_value_block_no'),
            value : 'false'
          }
        ]
      },
      {
        name : 'Fingerprinting',
        label : browser.i18n.getMessage('policy_description_EnableTrackingProtection_Fingerprinting'),
        type : 'enum',
        options : [
          {
            label : browser.i18n.getMessage('enum_value_no_preference'),
            value : null
          },
          {
            label : browser.i18n.getMessage('enum_value_block_yes'),
            value : 'true'
          },
          {
            label : browser.i18n.getMessage('enum_value_block_no'),
            value : 'false'
          }
        ]
      },
      {
        name : 'Exceptions',
        label : browser.i18n.getMessage('policy_description_EnableTrackingProtection_Exceptions'),
        type : 'array',
        items : {
          label : browser.i18n.getMessage('common_url'),
          type : 'url'
        }
      }
    ]
  },

  Permissions : {
    first_available : { mainstream : '62.0', esr : '60.2' },
    ui_category : 'privacy',
    type : 'object',
    properties : [
      {
        name : 'Location',
        label : browser.i18n.getMessage('policy_description_Permissions_Location'),
        is_lockable : true,
        type : 'object',
        properties : [
          {
            name : 'Allow',
            label : browser.i18n.getMessage('policy_description_Permissions_Location_Allow'),
            type : 'array',
            items : {
              label : browser.i18n.getMessage('common_url'),
              type : 'url'
            }
          },
          {
            name : 'Block',
            label : browser.i18n.getMessage('policy_description_Permissions_Location_Block'),
            type : 'array',
            items : {
              label : browser.i18n.getMessage('common_url'),
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
        is_lockable : true,
        type : 'object',
        properties : [
          {
            name : 'Allow',
            label : browser.i18n.getMessage('policy_description_Permissions_Camera_Allow'),
            type : 'array',
            items : {
              label : browser.i18n.getMessage('common_url'),
              type : 'url'
            }
          },
          {
            name : 'Block',
            label : browser.i18n.getMessage('policy_description_Permissions_Camera_Block'),
            type : 'array',
            items : {
              label : browser.i18n.getMessage('common_url'),
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
        is_lockable : true,
        type : 'object',
        properties : [
          {
            name : 'Allow',
            label : browser.i18n.getMessage('policy_description_Permissions_Microphone_Allow'),
            type : 'array',
            items : {
              label : browser.i18n.getMessage('common_url'),
              type : 'url'
            }
          },
          {
            name : 'Block',
            label : browser.i18n.getMessage('policy_description_Permissions_Microphone_Block'),
            type : 'array',
            items : {
              label : browser.i18n.getMessage('common_url'),
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
        is_lockable : true,
        type : 'object',
        properties : [
          {
            name : 'Allow',
            label : browser.i18n.getMessage('policy_description_Permissions_Notifications_Allow'),
            type : 'array',
            items : {
              label : browser.i18n.getMessage('common_url'),
              type : 'url'
            }
          },
          {
            name : 'Block',
            label : browser.i18n.getMessage('policy_description_Permissions_Notifications_Block'),
            type : 'array',
            items : {
              label : browser.i18n.getMessage('common_url'),
              type : 'url'
            }
          },
          {
            name : 'BlockNewRequests',
            label : browser.i18n.getMessage('policy_description_Permissions_Notifications_BlockNewRequests'),
            type : 'boolean'
          }
        ]
      },
      {
        name : 'Autoplay',
        label : browser.i18n.getMessage('policy_description_Permissions_Autoplay'),
        is_lockable : true,
        type : 'object',
        properties : [
          {
            name : 'Default',
            label : browser.i18n.getMessage('policy_description_Permissions_Autoplay_Default'),
            type : 'enum',
            options : [
              {
                label : browser.i18n.getMessage('enum_value_no_preference'),
                value : null
              },
              {
                label : browser.i18n.getMessage('policy_description_Permissions_Autoplay_Default_allow_audio_video'),
                value : 'allow-audio-video'
              },
              {
                label : browser.i18n.getMessage('policy_description_Permissions_Autoplay_Default_block_audio'),
                value : 'block-audio'
              },
              {
                label : browser.i18n.getMessage('policy_description_Permissions_Autoplay_Default_block_audio_video'),
                value : 'block-audio-video'
              }
            ]
          },
          {
            name : 'Allow',
            label : browser.i18n.getMessage('policy_description_Permissions_Autoplay_Allow'),
            type : 'array',
            items : {
              label : browser.i18n.getMessage('common_url'),
              type : 'url'
            }
          },
          {
            name : 'Block',
            label : browser.i18n.getMessage('policy_description_Permissions_Autoplay_Block'),
            type : 'array',
            items : {
              label : browser.i18n.getMessage('common_url'),
              type : 'url'
            }
          }
        ]
      },
      {
        name : 'VirtualReality',
        label : browser.i18n.getMessage('policy_description_Permissions_VirtualReality'),
        is_lockable : true,
        type : 'object',
        properties : [
          {
            name : 'Allow',
            label : browser.i18n.getMessage('policy_description_Permissions_VirtualReality_Allow'),
            type : 'array',
            items : {
              label : browser.i18n.getMessage('common_url'),
              type : 'url'
            }
          },
          {
            name : 'Block',
            label : browser.i18n.getMessage('policy_description_Permissions_VirtualReality_Block'),
            type : 'array',
            items : {
              label : browser.i18n.getMessage('common_url'),
              type : 'url'
            }
          },
          {
            name : 'BlockNewRequests',
            label : browser.i18n.getMessage('policy_description_Permissions_VirtualReality_BlockNewRequests'),
            type : 'boolean'
          }
        ]
      }
    ]
  },

  // security

  Preference_network_IDN_show_punycode : {
    first_available : { mainstream : '68.0', esr : '68.0' },
    ui_category : 'security',
    type : 'preference',
    properties : {
      option : 'network.IDN_show_punycode',
      type : 'boolean',
      default : 'false'
    }
  },

  PrimaryPassword : {
    first_available : { mainstream : '79.0', esr : '78.1' },
    ui_category : 'security',
    type : 'enum',
    options : [
      {
        label : browser.i18n.getMessage('policy_description_PrimaryPassword_true'),
        value : 'true'
      },
      {
        label : browser.i18n.getMessage('policy_description_PrimaryPassword_false'),
        value : 'false'
      }
    ]
  },

  OfferToSaveLogins : {
    first_available : { mainstream : '60.0', esr : '60.0' },
    exclude : 'OfferToSaveLoginsDefault',
    ui_category : 'security',
    type : 'enum',
    options : [
      {
        label : browser.i18n.getMessage('enum_value_yes'),
        value : 'true'
      },
      {
        label : browser.i18n.getMessage('enum_value_no'),
        value : 'false'
      }
    ]
  },

  OfferToSaveLoginsDefault : {
    first_available : { mainstream : '70.0', esr : '68.2' },
    exclude : 'OfferToSaveLogins',
    ui_category : 'security',
    type : 'enum',
    options : [
      {
        label : browser.i18n.getMessage('enum_value_yes'),
        value : 'true'
      },
      {
        label : browser.i18n.getMessage('enum_value_no'),
        value : 'false'
      }
    ]
  },

  PasswordManagerEnabled : {
    first_available : { mainstream : '70.0', esr : '68.2' },
    ui_category : 'security',
    type : 'enum',
    options : [
      {
        label : browser.i18n.getMessage('enum_value_enable_yes'),
        value : 'true'
      },
      {
        label : browser.i18n.getMessage('enum_value_enable_no'),
        value : 'false'
      }
    ]
  },

  DisablePasswordReveal : {
    first_available : { mainstream : '71.0', esr : '68.3' },
    ui_category : 'security',
    type : 'boolean'
  },

  FlashPlugin : {
    first_available : { mainstream : '60.0', esr : '60.0' },
    is_lockable : true,
    ui_category : 'security',
    type : 'object',
    properties : [
      {
        name : 'Default',
        label : browser.i18n.getMessage('policy_description_FlashPlugin_Default'),
        type : 'enum',
        options : [
          {
            label : browser.i18n.getMessage('enum_value_no_preference'),
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
        type : 'array',
        items : {
          label : browser.i18n.getMessage('common_url'),
          type : 'url'
        }
      },
      {
        name : 'Block',
        label : browser.i18n.getMessage('policy_description_FlashPlugin_Block'),
        type : 'array',
        items : {
          label : browser.i18n.getMessage('common_url'),
          type : 'url'
        }
      }
    ]
  },

  Preference_privacy_file_unique_origin : {
    first_available : { mainstream : '68.0.1', esr : '68.1' },
    info_link : 'https://www.mozilla.org/en-US/security/advisories/mfsa2019-21/#CVE-2019-11730',
    ui_category : 'security',
    type : 'preference',
    properties : {
      option : 'privacy.file_unique_origin',
      type : 'boolean-inverse',
      default : 'true'
    }
  },

  DisableSecurityBypass : {
    first_available : { mainstream : '60.0', esr : '60.0' },
    ui_category : 'security',
    type : 'object',
    properties : [
      {
        name : 'InvalidCertificate',
        label : browser.i18n.getMessage('policy_description_DisableSecurityBypass_InvalidCertificate'),
        type : 'enum',
        options : [
          {
            label : browser.i18n.getMessage('enum_value_no_preference'),
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
        type : 'enum',
        options : [
          {
            label : browser.i18n.getMessage('enum_value_no_preference'),
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

  SSLVersionMin : {
    first_available : { mainstream : '66.0', esr : '60.6' },
    ui_category : 'security',
    type : 'enum',
    options : [
      {
        label : 'TLS 1.0 (' + browser.i18n.getMessage('policy_label_default') + ')',
        value : 'tls1'
      },
      {
        label : 'TLS 1.1',
        value : 'tls1.1'
      },
      {
        label : 'TLS 1.2',
        value : 'tls1.2'
      },
      {
        label : 'TLS 1.3',
        value : 'tls1.3'
      }
    ],
    default : 'tls1'
  },

  SSLVersionMax : {
    first_available : { mainstream : '66.0', esr : '60.6' },
    ui_category : 'security',
    type : 'enum',
    options : [
      {
        label : 'TLS 1.0',
        value : 'tls1'
      },
      {
        label : 'TLS 1.1',
        value : 'tls1.1'
      },
      {
        label : 'TLS 1.2',
        value : 'tls1.2'
      },
      {
        label : 'TLS 1.3 (' + browser.i18n.getMessage('policy_label_default') + ')',
        value : 'tls1.3'
      }
    ],
    default : 'tls1.3'
  },

  Preference_security_default_personal_cert : {
    first_available : { mainstream : '68.0', esr : '68.0' },
    ui_category : 'security',
    type : 'preference',
    properties : {
      option : 'security.default_personal_cert',
      type : 'enum',
      options : [
        {
          label : browser.i18n.getMessage('policy_description_Preference_security_default_personal_cert_ask_every_time'),
          value : 'Ask Every Time'
        },
        {
          label : browser.i18n.getMessage('policy_description_Preference_security_default_personal_cert_select_automatically'),
          value : 'Select Automatically'
        }
      ],
      default : 'Ask Every Time'
    }
  },

  Certificates : {
    first_available : { mainstream : '60.0', esr : '60.0' },
    ui_category : 'security',
    type : 'object',
    properties : [
      {
        name : 'ImportEnterpriseRoots',
        label : browser.i18n.getMessage('policy_description_Certificates_ImportEnterpriseRoots'),
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
      },
      {
        name : 'Install',
        label : browser.i18n.getMessage('policy_description_Certificates_Install'),
        type : 'array',
        items : {
          label : browser.i18n.getMessage('policy_description_Certificates_Install_Value'),
          type : 'string'
        }
      }
    ]
  },

  SecurityDevices : {
    first_available : { mainstream : '64.0', esr : '60.4' },
    ui_category : 'security',
    type : 'key-value-pairs',
    label_key : browser.i18n.getMessage('policy_description_SecurityDevices_label_key'),
    label_value : browser.i18n.getMessage('policy_description_SecurityDevices_label_value')
  },

  // udpates and data collection

  DisableAppUpdate : {
    first_available : { mainstream : '62.0', esr : '60.0' },
    exclude: 'AppAutoUpdate',
    ui_category : 'updates-and-data',
    type : 'boolean'
  },

  AppAutoUpdate : {
    first_available : { mainstream : '75.0', esr : '68.7' },
    exclude: 'DisableAppUpdate',
    ui_category : 'updates-and-data',
    type : 'enum',
    options : [
      {
        label : browser.i18n.getMessage('enum_value_yes'),
        value : 'true'
      },
      {
        label : browser.i18n.getMessage('enum_value_no'),
        value : 'false'
      }
    ]
  },

  AppUpdateURL : {
    first_available : { mainstream : '62.0', esr : '60.2' },
    ui_category : 'updates-and-data',
    mandatory : true,
    type : 'url',
    label : browser.i18n.getMessage('common_url')
  },

  ExtensionUpdate : {
    first_available : { mainstream : '67.0', esr : '60.7' },
    ui_category : 'updates-and-data',
    type : 'enum',
    options : [
      {
        label : browser.i18n.getMessage('policy_description_ExtensionUpdate_options_true'),
        value : 'true'
      },
      {
        label : browser.i18n.getMessage('policy_description_ExtensionUpdate_options_false'),
        value : 'false'
      }
    ]
  },

  DisableSystemAddonUpdate : {
    first_available : { mainstream : '62.0', esr : '60.0' },
    ui_category : 'updates-and-data',
    type : 'boolean'
  },

  Preference_browser_search_update : {
    first_available : { mainstream : '68.0', esr : '68.0' },
    ui_category : 'updates-and-data',
    type : 'preference',
    properties : {
      option : 'browser.search.update',
      type : 'boolean',
      default : 'true'
    }
  },

  DisableTelemetry : {
    first_available : { mainstream : '62.0', esr : '60.0' },
    ui_category : 'updates-and-data',
    type : 'boolean'
  },

  DisableFirefoxStudies : {
    first_available : { mainstream : '60.0', esr : '60.0' },
    ui_category : 'updates-and-data',
    type : 'boolean'
  },

  Preference_security_ssl_errorReporting_enabled : {
    first_available : { mainstream : '68.0', esr : '68.0' },
    ui_category : 'updates-and-data',
    type : 'preference',
    properties : {
      option : 'security.ssl.errorReporting.enabled',
      type : 'boolean',
      default : 'true'
    }
  },

  Preference_media_gmp_widevinecdm_enabled : {
    first_available : { mainstream : '68.0', esr : '68.0' },
    ui_category : 'updates-and-data',
    type : 'preference',
    properties : {
      option : 'media.gmp-widevinecdm.enabled',
      type : 'boolean',
      default : 'true'
    }
  },

  Preference_media_gmp_gmpopenh264_enabled : {
    first_available : { mainstream : '68.0', esr : '68.0' },
    ui_category : 'updates-and-data',
    type : 'preference',
    properties : {
      option : 'media.gmp-gmpopenh264.enabled',
      type : 'boolean',
      default : 'true'
    }
  },

  // others

  PDFjs : {
    first_available : { mainstream : '77.0', esr : '68.9' },
    ui_category : 'others',
    type : 'object',
    properties : [
      {
        name : 'Enabled',
        type : 'enum',
        label : browser.i18n.getMessage('policy_description_PDFjs_Enabled'),
        options : [
          {
            label : browser.i18n.getMessage('enum_value_no_preference'),
            value : null
          },
          {
            label : browser.i18n.getMessage('enum_value_enable_yes'),
            value : 'true'
          },
          {
            label : browser.i18n.getMessage('enum_value_enable_no'),
            value : 'false'
          }
        ]
      },
      {
        name : 'EnablePermissions',
        type : 'enum',
        label : browser.i18n.getMessage('policy_description_PDFjs_EnablePermissions'),
        options : [
          {
            label : browser.i18n.getMessage('enum_value_no_preference'),
            value : null
          },
          {
            label : browser.i18n.getMessage('enum_value_yes'),
            value : 'true'
          },
          {
            label : browser.i18n.getMessage('enum_value_no'),
            value : 'false'
          }
        ]
      }
    ]
  },

  DefaultDownloadDirectory : {
    first_available : { mainstream : '68.0', esr : '68.0' },
    ui_category : 'others',
    mandatory : true,
    type : 'string',
    label : browser.i18n.getMessage('policy_description_DefaultDownloadDirectory_Label')
  },

  DownloadDirectory : {
    first_available : { mainstream : '68.0', esr : '68.0' },
    ui_category : 'others',
    mandatory : true,
    type : 'string',
    label : browser.i18n.getMessage('policy_description_DownloadDirectory_Label')
  },

  PromptForDownloadLocation : {
    first_available : { mainstream : '68.0', esr : '68.0' },
    ui_category : 'others',
    mandatory : true,
    type : 'enum',
    options : [
      {
        label : browser.i18n.getMessage('enum_value_yes'),
        value : 'true'
      },
      {
        label : browser.i18n.getMessage('enum_value_no'),
        value : 'false'
      }
    ]
  },

  Preference_browser_cache_disk_enable : {
    first_available : { mainstream : '68.0', esr : '68.0' },
    ui_category : 'others',
    type : 'preference',
    properties : {
      option : 'browser.cache.disk.enable',
      type : 'boolean',
      default : 'true'
    }
  },

  Preference_browser_cache_disk_parent_directory : {
    first_available : { mainstream : '68.0', esr : '68.0' },
    ui_category : 'others',
    type : 'preference',
    properties : {
      option : 'browser.cache.disk.parent_directory',
      type : 'string',
      label : browser.i18n.getMessage('policy_description_Preference_browser_cache_disk_parent_directory_label')
    }
  },

  HardwareAcceleration : {
    first_available : { mainstream : '62.0', esr : '60.2' },
    ui_category : 'others',
    type : 'boolean-inverse'
  },

  PopupBlocking : {
    first_available : { mainstream : '60.0', esr : '60.0' },
    is_lockable : true,
    ui_category : 'others',
    type : 'object',
    properties : [
      {
        name : 'Default',
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
        type : 'array',
        items : {
          label : browser.i18n.getMessage('common_url'),
          type : 'url'
        }
      }
    ]
  },

  LocalFileLinks : {
    first_available : { mainstream : '68.0', esr : '68.0' },
    ui_category : 'others',
    type : 'flat-array',
    value : {
      label : browser.i18n.getMessage('common_url'),
      mandatory : true
    }
  },

  Preference_browser_tabs_warnOnClose : {
    first_available : { mainstream : '68.0', esr : '68.0' },
    ui_category : 'others',
    type : 'preference',
    properties : {
      option : 'browser.tabs.warnOnClose',
      type : 'boolean',
      default : 'true'
    }
  },

  Preference_places_history_enabled : {
    first_available : { mainstream : '68.0', esr : '68.0' },
    ui_category : 'others',
    type : 'preference',
    properties : {
      option : 'places.history.enabled',
      type : 'boolean',
      default : 'true'
    }
  },

  SearchSuggestEnabled : {
    first_available : { mainstream : '68.0', esr : '68.0' },
    ui_category : 'others',
    type : 'enum',
    options : [
      {
        label : browser.i18n.getMessage('enum_value_enable_yes'),
        value : 'true'
      },
      {
        label : browser.i18n.getMessage('enum_value_enable_no'),
        value : 'false'
      }
    ]
  },

  Preference_browser_urlbar_suggest_history : {
    first_available : { mainstream : '68.0', esr : '68.0' },
    ui_category : 'others',
    type : 'preference',
    properties : {
      option : 'browser.urlbar.suggest.history',
      type : 'boolean',
      default : 'true'
    }
  },

  Preference_browser_urlbar_suggest_bookmark : {
    first_available : { mainstream : '68.0', esr : '68.0' },
    ui_category : 'others',
    type : 'preference',
    properties : {
      option : 'browser.urlbar.suggest.bookmark',
      type : 'boolean',
      default : 'true'
    }
  },

  Preference_browser_urlbar_suggest_openpage : {
    first_available : { mainstream : '68.0', esr : '68.0' },
    ui_category : 'others',
    type : 'preference',
    properties : {
      option : 'browser.urlbar.suggest.openpage',
      type : 'boolean',
      default : 'true'
    }
  },

  Preference_dom_event_contextmenu_enabled : {
    first_available : { mainstream : '68.0', esr : '68.0' },
    ui_category : 'others',
    type : 'preference',
    properties : {
      option : 'dom.event.contextmenu.enabled',
      type : 'boolean',
      default : 'true'
    }
  },

  Preference_dom_disable_window_move_resize : {
    first_available : { mainstream : '68.0', esr : '68.0' },
    ui_category : 'others',
    type : 'preference',
    properties : {
      option : 'dom.disable_window_move_resize',
      type : 'boolean-inverse',
      default : 'false'
    }
  },

  Preference_dom_disable_window_flip : {
    first_available : { mainstream : '68.0', esr : '68.0' },
    ui_category : 'others',
    type : 'preference',
    properties : {
      option : 'dom.disable_window_flip',
      type : 'boolean-inverse',
      default : 'true'
    }
  },

  Preference_dom_keyboardevent_keypress_hack_dispatch_non_printable_keys_addl : {
    first_available : { mainstream : '68.0', esr : '68.0' },
    info_link : 'https://www.fxsitecompat.dev/en-CA/docs/2018/non-printable-keys-no-longer-fire-keypress-event/',
    ui_category : 'others',
    type : 'preference',
    properties : {
      option : 'dom.keyboardevent.keypress.hack.dispatch_non_printable_keys.addl',
      type : 'array',
      items : {
        label : browser.i18n.getMessage('common_domain'),
        type : 'string'
      }
    }
  },

  Preference_dom_keyboardevent_keypress_hack_use_legacy_keycode_and_charcode_addl : {
    first_available : { mainstream : '68.0', esr : '68.0' },
    info_link : 'https://support.mozilla.org/kb/dom-events-changes-introduced-firefox-66',
    ui_category : 'others',
    type : 'preference',
    properties : {
      option : 'dom.keyboardevent.keypress.hack.use_legacy_keycode_and_charcode.addl',
      type : 'array',
      items : {
        label : browser.i18n.getMessage('common_domain'),
        type : 'string'
      }
    }
  },

  LegacySameSiteCookieBehaviorEnabled : {
    first_available : { mainstream : '76.0', esr : '78.0' },
    exclude : 'LegacySameSiteCookieBehaviorEnabledForDomainList',
    ui_category : 'others',
    type : 'boolean'
  },

  LegacySameSiteCookieBehaviorEnabledForDomainList : {
    first_available : { mainstream : '76.0', esr : '78.0' },
    exclude : 'LegacySameSiteCookieBehaviorEnabled',
    ui_category : 'others',
    type : 'flat-array',
    value : {
      label : browser.i18n.getMessage('common_url'),
      mandatory : true
    }
  },

  DontCheckDefaultBrowser : {
    first_available : { mainstream : '60.0', esr : '60.0' },
    ui_category : 'others',
    type : 'enum',
    options : [
      {
        label : browser.i18n.getMessage('policy_description_DontCheckDefaultBrowser_options_true'),
        value : 'true'
      },
      {
        label : browser.i18n.getMessage('policy_description_DontCheckDefaultBrowser_options_false'),
        value : 'false'
      }
    ]
  },

  Preference_datareporting_policy_dataSubmissionPolicyBypassNotification : {
    first_available : { mainstream : '68.0', esr : '68.0' },
    ui_category : 'others',
    type : 'preference',
    properties : {
      option : 'datareporting.policy.dataSubmissionPolicyBypassNotification',
      type : 'boolean-inverse',
      default : 'false'
    }
  },

  OverrideFirstRunPage : {
    first_available : { mainstream : '62.0', esr : '60.0' },
    ui_category : 'others',
    type : 'url',
    label : browser.i18n.getMessage('common_url')
  },

  OverridePostUpdatePage : {
    first_available : { mainstream : '62.0', esr : '60.0' },
    ui_category : 'others',
    type : 'url',
    label : browser.i18n.getMessage('common_url')
  },

  SupportMenu : {
    first_available : { mainstream : '67.0', esr : '60.7' },
    ui_category : 'others',
    type : 'object',
    properties : [
      {
        name : 'Title',
        label : browser.i18n.getMessage('policy_description_SupportMenu_Title'),
        mandatory : true,
        type : 'string'
      },
      {
        name : 'URL',
        label : browser.i18n.getMessage('common_url'),
        mandatory : true,
        type : 'url'
      },
      {
        name : 'AccessKey',
        label : browser.i18n.getMessage('policy_description_SupportMenu_AccessKey'),
        type : 'string'
      }
    ]
  }
};
