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
    exclude : 'PrivateBrowsingModeAvailability',
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

  TranslateEnabled : {
    first_available : { mainstream : '126.0', esr : '128.0' },
    ui_category : 'disable-features',
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
      },
      {
        name : 'FirefoxLabs',
        label : browser.i18n.getMessage('policy_description_UserMessaging_FirefoxLabs'),
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
        name : 'MoreFromMozilla',
        label : browser.i18n.getMessage('policy_description_UserMessaging_MoreFromMozilla'),
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
    additional_note : browser.i18n.getMessage('requirement_windows'),
    first_available : { mainstream : '75.0', esr : '78.0' },
    ui_category : 'disable-features',
    type : 'boolean'
  },

  AllowFileSelectionDialogs : {
    first_available : { mainstream : '124.0', esr : '128.0' },
    ui_category : 'disable-features',
    type : 'boolean-inverse'
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
    first_available : { mainstream : '109.0', esr : '102.7' },
    ui_category : 'customization',
    type : 'enum',
    options : [
      {
        label : browser.i18n.getMessage('policy_description_DisplayBookmarksToolbar_always'),
        value : 'always'
      },
      {
        label : browser.i18n.getMessage('policy_description_DisplayBookmarksToolbar_never'),
        value : 'never'
      },
      {
        label : browser.i18n.getMessage('policy_description_DisplayBookmarksToolbar_newtab'),
        value : 'newtab'
      }
    ]
  },

  ShowHomeButton : {
    first_available : { mainstream : '88.0', esr : '78.10' },
    ui_category : 'customization',
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
        name : 'SponsoredTopSites',
        label : browser.i18n.getMessage('policy_description_FirefoxHome_SponsoredTopSites'),
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
        name : 'SponsoredPocket',
        label : browser.i18n.getMessage('policy_description_FirefoxHome_SponsoredPocket'),
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
      }
    ]
  },

  FirefoxSuggest : {
    first_available : { mainstream : '118.0', esr : '115.3' },
    is_lockable : true,
    ui_category : 'customization',
    type : 'object',
    properties : [
      {
        name : 'WebSuggestions',
        label : browser.i18n.getMessage('policy_description_FirefoxSuggest_WebSuggestions'),
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
        name : 'SponsoredSuggestions',
        label : browser.i18n.getMessage('policy_description_FirefoxSuggest_SponsoredSuggestions'),
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
        name : 'ImproveSuggest',
        label : browser.i18n.getMessage('policy_description_FirefoxSuggest_ImproveSuggest'),
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

  Containers : {
    first_available : { mainstream : '113.0', esr : '115.0' },
    ui_category : 'customization',
    type : 'nested-object',
    sub_key : 'Default',
    children : {
      properties : [
        {
          name : 'name',
          label : browser.i18n.getMessage('policy_description_Containers_name'),
          type : 'string',
          mandatory : true
        },
        {
          name : 'icon',
          label : browser.i18n.getMessage('policy_description_Containers_icon'),
          type : 'enum',
          options : [
            {
              label : browser.i18n.getMessage('policy_description_Containers_icon_briefcase'),
              value : 'briefcase'
            },
            {
              label : browser.i18n.getMessage('policy_description_Containers_icon_cart'),
              value : 'cart'
            },
            {
              label : browser.i18n.getMessage('policy_description_Containers_icon_chill'),
              value : 'chill'
            },
            {
              label : browser.i18n.getMessage('policy_description_Containers_icon_circle'),
              value : 'circle'
            },
            {
              label : browser.i18n.getMessage('policy_description_Containers_icon_dollar'),
              value : 'dollar'
            },
            {
              label : browser.i18n.getMessage('policy_description_Containers_icon_fence'),
              value : 'fence'
            },
            {
              label : browser.i18n.getMessage('policy_description_Containers_icon_fingerprint'),
              value : 'fingerprint'
            },
            {
              label : browser.i18n.getMessage('policy_description_Containers_icon_food'),
              value : 'food'
            },
            {
              label : browser.i18n.getMessage('policy_description_Containers_icon_fruit'),
              value : 'fruit'
            },
            {
              label : browser.i18n.getMessage('policy_description_Containers_icon_gift'),
              value : 'gift'
            },
            {
              label : browser.i18n.getMessage('policy_description_Containers_icon_pet'),
              value : 'pet'
            },
            {
              label : browser.i18n.getMessage('policy_description_Containers_icon_tree'),
              value : 'tree'
            },
            {
              label : browser.i18n.getMessage('policy_description_Containers_icon_vacation'),
              value : 'vacation'
            }
          ],
          sorted : true
        },
        {
          name : 'color',
          label : browser.i18n.getMessage('policy_description_Containers_color'),
          type : 'enum',
          options : [
            {
              label : browser.i18n.getMessage('policy_description_Containers_color_blue'),
              value : 'blue'
            },
            {
              label : browser.i18n.getMessage('policy_description_Containers_color_green'),
              value : 'green'
            },
            {
              label : browser.i18n.getMessage('policy_description_Containers_color_orange'),
              value : 'orange'
            },
            {
              label : browser.i18n.getMessage('policy_description_Containers_color_pink'),
              value : 'pink'
            },
            {
              label : browser.i18n.getMessage('policy_description_Containers_color_purple'),
              value : 'purple'
            },
            {
              label : browser.i18n.getMessage('policy_description_Containers_color_red'),
              value : 'red'
            },
            {
              label : browser.i18n.getMessage('policy_description_Containers_color_toolbar'),
              value : 'toolbar'
            },
            {
              label : browser.i18n.getMessage('policy_description_Containers_color_turquoise'),
              value : 'turquoise'
            },
            {
              label : browser.i18n.getMessage('policy_description_Containers_color_yellow'),
              value : 'yellow'
            }
          ],
          sorted : true
        }
      ]
    }
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
            type : 'url',
            dataUriAllowed : true
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
          },
          {
            name : 'Encoding',
            label : browser.i18n.getMessage('policy_description_SearchEngines_Add_Encoding'),
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

  ManagedBookmarks : {
    first_available : { mainstream : '83.0', esr : '78.5' },
    ui_category : 'customization',
    type : 'nested-object',
    extra : {
      name : 'toplevel_name',
      label : browser.i18n.getMessage('policy_description_ManagedBookmarks_toplevel_name'),
      type : 'string',
      mandatory : true
    },
    children : {
      properties : [
        {
          name : 'name',
          label : browser.i18n.getMessage('policy_description_ManagedBookmarks_name'),
          type : 'string',
          mandatory : true
        },
        {
          name : 'url',
          label : browser.i18n.getMessage('common_url'),
          type : 'url',
          mandatory : true
        }
      ]
    }
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
          name : 'temporarily_allow_weak_signatures',
          label : browser.i18n.getMessage('policy_description_ExtensionSettings_temporarily_allow_weak_signatures'),
          type : 'boolean'
        },
        {
          name : 'install_sources',
          label : browser.i18n.getMessage('policy_description_ExtensionSettings_install_sources'),
          info_link : 'https://developer.mozilla.org/Add-ons/WebExtensions/Match_patterns',
          type : 'array',
          items : {
            label : browser.i18n.getMessage('common_url'),
            type : 'string'
          }
        },
        {
          name : 'restricted_domains',
          label : browser.i18n.getMessage('policy_description_ExtensionSettings_restricted_domains'),
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
            },
            {
              value : 'sitepermission',
              label : browser.i18n.getMessage('policy_description_ExtensionSettings_allowed_types_sitepermission')
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
      },
      {
        name : 'updates_disabled',
        label : browser.i18n.getMessage('policy_description_ExtensionSettings_updates_disabled'),
        type : 'enum',
        options : [
          {
            label : browser.i18n.getMessage('enum_value_no_preference'),
            value : null
          },
          {
            label : browser.i18n.getMessage('enum_value_yes'),
            value : 'false'
          },
          {
            label : browser.i18n.getMessage('enum_value_no'),
            value : 'true'
          }
        ]
      },
      {
        name : 'default_area',
        label : browser.i18n.getMessage('policy_description_ExtensionSettings_default_area'),
        type : 'enum',
        options : [
          {
            label : browser.i18n.getMessage('enum_value_no_preference'),
            value : null
          },
          {
            label : browser.i18n.getMessage('policy_description_ExtensionSettings_default_area_menupanel'),
            value : 'menupanel'
          },
          {
            label : browser.i18n.getMessage('policy_description_ExtensionSettings_default_area_navbar'),
            value : 'navbar'
          }
        ]
      }
    ]
  },

  '3rdparty' : {
    first_available : { mainstream : '67.0', esr : '68.0' },
    ui_category : 'customization',
    type : 'json-array',
    sub_key : 'Extensions',
    label_key : browser.i18n.getMessage('policy_description_3rdparty_Label_Key'),
    properties : [
      {
        caption : browser.i18n.getMessage('policy_description_3rdparty_JSON_caption'),
        label : browser.i18n.getMessage('policy_description_3rdparty_JSON_label'),
        type : 'json'
      }
    ]
  },

  Preferences : {
    first_available : { mainstream : '81.0', esr : '78.3' },
    ui_category : 'customization',
    type : 'key-object-list',
    validator : 'preference',
    label_key : browser.i18n.getMessage('policy_description_Preferences_Label_Key'),
    properties : [
      {
        name : 'Value',
        mandatory : true,
        caption : browser.i18n.getMessage('policy_description_Preferences_Value'),
        label : browser.i18n.getMessage('policy_description_Preferences_Value'),
        type : 'string'
      },
      {
        name : 'Type',
        label : browser.i18n.getMessage('policy_description_Preferences_Type'),
        type : 'enum',
        options : [
          {
            label : browser.i18n.getMessage('enum_value_no_preference'),
            value : null
          },
          {
            label : browser.i18n.getMessage('policy_description_Preferences_Type_string'),
            value : 'string'
          },
          {
            label : browser.i18n.getMessage('policy_description_Preferences_Type_number'),
            value : 'number'
          },
          {
            label : browser.i18n.getMessage('policy_description_Preferences_Type_boolean'),
            value : 'boolean'
          }
        ]
      },
      {
        name : 'Status',
        label : browser.i18n.getMessage('policy_description_Preferences_Status'),
        type : 'enum',
        options : [
          {
            label : browser.i18n.getMessage('policy_description_Preferences_Status_user'),
            value : 'user'
          },
          {
            label : browser.i18n.getMessage('policy_description_Preferences_Status_default'),
            value : 'default'
          },
          {
            label : browser.i18n.getMessage('policy_description_Preferences_Status_locked'),
            value : 'locked'
          },
          {
            label : browser.i18n.getMessage('policy_description_Preferences_Status_clear'),
            value : 'clear'
          }
        ]
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

  HttpAllowlist : {
    first_available : { mainstream : '127.0', esr : '128.0' },
    ui_category : 'network',
    type : 'flat-array',
    value : {
      label : browser.i18n.getMessage('common_url'),
      mandatory : true,
      url : true
    }
  },

  HttpsOnlyMode : {
    first_available : { mainstream : '127.0', esr : '128.0' },
    ui_category : 'network',
    type : 'enum',
    options : [
      {
        label : browser.i18n.getMessage('policy_description_HttpsOnlyMode_allowed'),
        value : 'allowed'
      },
      {
        label : browser.i18n.getMessage('policy_description_HttpsOnlyMode_disallowed'),
        value : 'disallowed'
      },
      {
        label : browser.i18n.getMessage('policy_description_HttpsOnlyMode_enabled'),
        value : 'enabled'
      },
      {
        label : browser.i18n.getMessage('policy_description_HttpsOnlyMode_force_enabled'),
        value : 'force_enabled'
      }
    ]
  },

  DNSOverHTTPS : {
    first_available : { mainstream : '63.0', esr : '68.0' },
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
      },
      {
        name : 'Fallback',
        label : browser.i18n.getMessage('policy_description_DNSOverHTTPS_Fallback'),
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
    info_link : 'https://htmlpreview.github.io/?https://github.com/mdn/archived-content/blob/main/files/en-us/mozilla/integrated_authentication/raw.html',
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
      },
      {
        name : 'AllowProxies',
        label : browser.i18n.getMessage('policy_description_Authentication_AllowProxies'),
        type : 'object',
        properties : [
          {
            name : 'SPNEGO',
            label : browser.i18n.getMessage('policy_description_Authentication_AllowProxies_SPNEGO'),
            type : 'boolean'
          },
          {
            name : 'NTLM',
            label : browser.i18n.getMessage('policy_description_Authentication_AllowProxies_NTLM'),
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

  GoToIntranetSiteForSingleWordEntryInAddressBar : {
    first_available : { mainstream : '104.0', esr : '102.2' },
    ui_category : 'network',
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

  // privacy

  AutofillAddressEnabled : {
    first_available : { mainstream : '125.0', esr : '115.10' },
    ui_category : 'privacy',
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

  AutofillCreditCardEnabled : {
    first_available : { mainstream : '125.0', esr : '115.10' },
    ui_category : 'privacy',
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

  PrivateBrowsingModeAvailability : {
    first_available : { mainstream : '130.0', esr : '128.3' },
    exclude : 'DisablePrivateBrowsing',
    ui_category : 'privacy',
    type : 'enum',
    options : [
      {
        label : browser.i18n.getMessage('policy_description_PrivateBrowsingModeAvailability_0'),
        value : 0
      },
      {
        label : browser.i18n.getMessage('policy_description_PrivateBrowsingModeAvailability_1'),
        value : 1
      },
      {
        label : browser.i18n.getMessage('policy_description_PrivateBrowsingModeAvailability_2'),
        value : 2
      }
    ]
  },

  Cookies : {
    first_available : { mainstream : '60.0', esr : '60.0' },
    is_lockable : true,
    ui_category : 'privacy',
    type : 'object',
    properties : [
      {
        name : 'Behavior',
        label : browser.i18n.getMessage('policy_description_Cookies_Behavior'),
        type : 'enum',
        options : [
          {
            label : browser.i18n.getMessage('enum_value_no_preference'),
            value : null
          },
          {
            label : browser.i18n.getMessage('policy_description_Cookies_Behavior_accept'),
            value : 'accept'
          },
          {
            label : browser.i18n.getMessage('policy_description_Cookies_Behavior_reject'),
            value : 'reject'
          },
          {
            label : browser.i18n.getMessage('policy_description_Cookies_Behavior_reject_foreign'),
            value : 'reject-foreign'
          },
          {
            label : browser.i18n.getMessage('policy_description_Cookies_Behavior_limit_foreign'),
            value : 'limit-foreign'
          },
          {
            label : browser.i18n.getMessage('policy_description_Cookies_Behavior_reject_tracker'),
            value : 'reject-tracker'
          },
          {
            label : browser.i18n.getMessage('policy_description_Cookies_Behavior_reject_tracker_and_partition_foreign'),
            value : 'reject-tracker-and-partition-foreign'
          }
        ]
      },
      {
        name : 'BehaviorPrivateBrowsing',
        label : browser.i18n.getMessage('policy_description_Cookies_BehaviorPrivateBrowsing'),
        type : 'enum',
        options : [
          {
            label : browser.i18n.getMessage('enum_value_no_preference'),
            value : null
          },
          {
            label : browser.i18n.getMessage('policy_description_Cookies_Behavior_accept'),
            value : 'accept'
          },
          {
            label : browser.i18n.getMessage('policy_description_Cookies_Behavior_reject'),
            value : 'reject'
          },
          {
            label : browser.i18n.getMessage('policy_description_Cookies_Behavior_reject_foreign'),
            value : 'reject-foreign'
          },
          {
            label : browser.i18n.getMessage('policy_description_Cookies_Behavior_limit_foreign'),
            value : 'limit-foreign'
          },
          {
            label : browser.i18n.getMessage('policy_description_Cookies_BehaviorPrivateBrowsing_reject_tracker'),
            value : 'reject-tracker'
          },
          {
            label : browser.i18n.getMessage('policy_description_Cookies_BehaviorPrivateBrowsing_reject_tracker_and_partition_foreign'),
            value : 'reject-tracker-and-partition-foreign'
          }
        ]
      },
      {
        name : 'ExpireAtSessionEnd',
        label : browser.i18n.getMessage('policy_description_Cookies_ExpireAtSessionEnd'),
        type : 'enum',
        options : [
          {
            label : browser.i18n.getMessage('enum_value_no_preference'),
            value : null
          },
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
      }
    ]
  },

  SanitizeOnShutdown : {
    first_available : { mainstream : '60.0', esr : '60.0' },
    is_lockable : false,
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
      },
      {
        name : 'Locked',
        label : browser.i18n.getMessage('lock_preference'),
        type : 'enum',
        options : [
          {
            label : browser.i18n.getMessage('policy_description_SanitizeOnShutdown_Locked_false'),
            value : 'false'
          },
          {
            label : browser.i18n.getMessage('policy_description_SanitizeOnShutdown_Locked_true'),
            value : 'true'
          },
          {
            label : browser.i18n.getMessage('policy_description_SanitizeOnShutdown_Locked_null'),
            value : null
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
        name : 'EmailTracking',
        label : browser.i18n.getMessage('policy_description_EnableTrackingProtection_EmailTracking'),
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

  PasswordManagerExceptions : {
    first_available : { mainstream : '101.0', esr : '91.10' },
    ui_category : 'security',
    type : 'flat-array',
    value : {
      label : browser.i18n.getMessage('common_url'),
      mandatory : true,
      url : true
    }
  },

  DisablePasswordReveal : {
    first_available : { mainstream : '71.0', esr : '68.3' },
    ui_category : 'security',
    type : 'boolean'
  },

  WindowsSSO : {
    additional_note : browser.i18n.getMessage('requirement_windows'),
    first_available : { mainstream : '91.0', esr : '91.0' },
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
    ],
    default : 'true'
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

  DisabledCiphers : {
    first_available : { mainstream : '76.0', esr : '68.8' },
    ui_category : 'security',
    type : 'object',
    properties : [
      {
        name : 'TLS_DHE_RSA_WITH_AES_128_CBC_SHA',
        type : 'enum',
        label : 'TLS_DHE_RSA_WITH_AES_128_CBC_SHA',
        options : [
          {
            label : browser.i18n.getMessage('enum_value_no_preference'),
            value : null
          },
          {
            label : browser.i18n.getMessage('enum_value_enable_yes'),
            value : 'false'
          },
          {
            label : browser.i18n.getMessage('enum_value_enable_no'),
            value : 'true'
          }
        ]
      },
      {
        name : 'TLS_DHE_RSA_WITH_AES_256_CBC_SHA',
        type : 'enum',
        label : 'TLS_DHE_RSA_WITH_AES_256_CBC_SHA',
        options : [
          {
            label : browser.i18n.getMessage('enum_value_no_preference'),
            value : null
          },
          {
            label : browser.i18n.getMessage('enum_value_enable_yes'),
            value : 'false'
          },
          {
            label : browser.i18n.getMessage('enum_value_enable_no'),
            value : 'true'
          }
        ]
      },
      {
        name : 'TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA',
        type : 'enum',
        label : 'TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA',
        options : [
          {
            label : browser.i18n.getMessage('enum_value_no_preference'),
            value : null
          },
          {
            label : browser.i18n.getMessage('enum_value_enable_yes'),
            value : 'false'
          },
          {
            label : browser.i18n.getMessage('enum_value_enable_no'),
            value : 'true'
          }
        ]
      },
      {
        name : 'TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256',
        type : 'enum',
        label : 'TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256',
        options : [
          {
            label : browser.i18n.getMessage('enum_value_no_preference'),
            value : null
          },
          {
            label : browser.i18n.getMessage('enum_value_enable_yes'),
            value : 'false'
          },
          {
            label : browser.i18n.getMessage('enum_value_enable_no'),
            value : 'true'
          }
        ]
      },
      {
        name : 'TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA',
        type : 'enum',
        label : 'TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA',
        options : [
          {
            label : browser.i18n.getMessage('enum_value_no_preference'),
            value : null
          },
          {
            label : browser.i18n.getMessage('enum_value_enable_yes'),
            value : 'false'
          },
          {
            label : browser.i18n.getMessage('enum_value_enable_no'),
            value : 'true'
          }
        ]
      },
      {
        name : 'TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384',
        type : 'enum',
        label : 'TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384',
        options : [
          {
            label : browser.i18n.getMessage('enum_value_no_preference'),
            value : null
          },
          {
            label : browser.i18n.getMessage('enum_value_enable_yes'),
            value : 'false'
          },
          {
            label : browser.i18n.getMessage('enum_value_enable_no'),
            value : 'true'
          }
        ]
      },
      {
        name : 'TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256',
        type : 'enum',
        label : 'TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256',
        options : [
          {
            label : browser.i18n.getMessage('enum_value_no_preference'),
            value : null
          },
          {
            label : browser.i18n.getMessage('enum_value_enable_yes'),
            value : 'false'
          },
          {
            label : browser.i18n.getMessage('enum_value_enable_no'),
            value : 'true'
          }
        ]
      },
      {
        name : 'TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA',
        type : 'enum',
        label : 'TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA',
        options : [
          {
            label : browser.i18n.getMessage('enum_value_no_preference'),
            value : null
          },
          {
            label : browser.i18n.getMessage('enum_value_enable_yes'),
            value : 'false'
          },
          {
            label : browser.i18n.getMessage('enum_value_enable_no'),
            value : 'true'
          }
        ]
      },
      {
        name : 'TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256',
        type : 'enum',
        label : 'TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256',
        options : [
          {
            label : browser.i18n.getMessage('enum_value_no_preference'),
            value : null
          },
          {
            label : browser.i18n.getMessage('enum_value_enable_yes'),
            value : 'false'
          },
          {
            label : browser.i18n.getMessage('enum_value_enable_no'),
            value : 'true'
          }
        ]
      },
      {
        name : 'TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA',
        type : 'enum',
        label : 'TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA',
        options : [
          {
            label : browser.i18n.getMessage('enum_value_no_preference'),
            value : null
          },
          {
            label : browser.i18n.getMessage('enum_value_enable_yes'),
            value : 'false'
          },
          {
            label : browser.i18n.getMessage('enum_value_enable_no'),
            value : 'true'
          }
        ]
      },
      {
        name : 'TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384',
        type : 'enum',
        label : 'TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384',
        options : [
          {
            label : browser.i18n.getMessage('enum_value_no_preference'),
            value : null
          },
          {
            label : browser.i18n.getMessage('enum_value_enable_yes'),
            value : 'false'
          },
          {
            label : browser.i18n.getMessage('enum_value_enable_no'),
            value : 'true'
          }
        ]
      },
      {
        name : 'TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256',
        type : 'enum',
        label : 'TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256',
        options : [
          {
            label : browser.i18n.getMessage('enum_value_no_preference'),
            value : null
          },
          {
            label : browser.i18n.getMessage('enum_value_enable_yes'),
            value : 'false'
          },
          {
            label : browser.i18n.getMessage('enum_value_enable_no'),
            value : 'true'
          }
        ]
      },
      {
        name : 'TLS_RSA_WITH_3DES_EDE_CBC_SHA',
        type : 'enum',
        label : 'TLS_RSA_WITH_3DES_EDE_CBC_SHA',
        options : [
          {
            label : browser.i18n.getMessage('enum_value_no_preference'),
            value : null
          },
          {
            label : browser.i18n.getMessage('enum_value_enable_yes'),
            value : 'false'
          },
          {
            label : browser.i18n.getMessage('enum_value_enable_no'),
            value : 'true'
          }
        ]
      },
      {
        name : 'TLS_RSA_WITH_AES_128_CBC_SHA',
        type : 'enum',
        label : 'TLS_RSA_WITH_AES_128_CBC_SHA',
        options : [
          {
            label : browser.i18n.getMessage('enum_value_no_preference'),
            value : null
          },
          {
            label : browser.i18n.getMessage('enum_value_enable_yes'),
            value : 'false'
          },
          {
            label : browser.i18n.getMessage('enum_value_enable_no'),
            value : 'true'
          }
        ]
      },
      {
        name : 'TLS_RSA_WITH_AES_128_GCM_SHA256',
        type : 'enum',
        label : 'TLS_RSA_WITH_AES_128_GCM_SHA256',
        options : [
          {
            label : browser.i18n.getMessage('enum_value_no_preference'),
            value : null
          },
          {
            label : browser.i18n.getMessage('enum_value_enable_yes'),
            value : 'false'
          },
          {
            label : browser.i18n.getMessage('enum_value_enable_no'),
            value : 'true'
          }
        ]
      },
      {
        name : 'TLS_RSA_WITH_AES_256_CBC_SHA',
        type : 'enum',
        label : 'TLS_RSA_WITH_AES_256_CBC_SHA',
        options : [
          {
            label : browser.i18n.getMessage('enum_value_no_preference'),
            value : null
          },
          {
            label : browser.i18n.getMessage('enum_value_enable_yes'),
            value : 'false'
          },
          {
            label : browser.i18n.getMessage('enum_value_enable_no'),
            value : 'true'
          }
        ]
      },
      {
        name : 'TLS_RSA_WITH_AES_256_GCM_SHA384',
        type : 'enum',
        label : 'TLS_RSA_WITH_AES_256_GCM_SHA384',
        options : [
          {
            label : browser.i18n.getMessage('enum_value_no_preference'),
            value : null
          },
          {
            label : browser.i18n.getMessage('enum_value_enable_yes'),
            value : 'false'
          },
          {
            label : browser.i18n.getMessage('enum_value_enable_no'),
            value : 'true'
          }
        ]
      }
    ]
  },

  DisableEncryptedClientHello : {
    first_available : { mainstream : '127.0', esr : '128.0' },
    ui_category : 'security',
    type : 'boolean'
  },

  PostQuantumKeyAgreementEnabled : {
    first_available : { mainstream : '127.0', esr : '128.0' },
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
    first_available : { mainstream : '114.0', esr : '102.12' },
    ui_category : 'security',
    type : 'object',
    properties : [
      {
        name : 'Add',
        label : browser.i18n.getMessage('policy_description_SecurityDevices_Add'),
        type : 'key-value-pairs',
        label_key : browser.i18n.getMessage('policy_description_SecurityDevices_label_key'),
        label_value : browser.i18n.getMessage('policy_description_SecurityDevices_label_value')
      },
      {
        name : 'Delete',
        label : browser.i18n.getMessage('policy_description_SecurityDevices_Delete'),
        type : 'array',
        items : {
          label : 'Name',
          type : 'string'
        }
      }
    ]
  },

  // updates and data collection

  DisableAppUpdate : {
    first_available : { mainstream : '62.0', esr : '60.0' },
    exclude : ['AppAutoUpdate', 'AppUpdatePin', 'AppUpdateURL', 'BackgroundAppUpdate', 'ManualAppUpdateOnly'],
    ui_category : 'updates-and-data',
    type : 'boolean'
  },

  AppAutoUpdate : {
    first_available : { mainstream : '75.0', esr : '68.7' },
    exclude : 'DisableAppUpdate',
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

  BackgroundAppUpdate : {
    additional_note : browser.i18n.getMessage('requirement_windows'),
    first_available : { mainstream : '90.0', esr : '91.0' },
    exclude : ['DisableAppUpdate', 'AppAutoUpdate=false'],
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

  ManualAppUpdateOnly : {
    exclude : 'DisableAppUpdate',
    first_available : { mainstream : '87.0', esr : '91.0' },
    ui_category : 'updates-and-data',
    type : 'boolean'
  },

  AppUpdatePin : {
    exclude : 'DisableAppUpdate',
    first_available : { mainstream : '102.0', esr : '102.0' },
    ui_category : 'updates-and-data',
    mandatory : true,
    type : 'version',
    label : browser.i18n.getMessage('policy_description_AppUpdatePin_placeholder')
  },

  AppUpdateURL : {
    exclude : 'DisableAppUpdate',
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

  Handlers : {
    first_available : { mainstream : '78.0', esr : '78.0' },
    ui_category : 'others',
    type : 'object',
    properties : [
      {
        name : 'mimeTypes',
        label : browser.i18n.getMessage('policy_description_Handlers_type_mime_type'),
        placeholder_key : browser.i18n.getMessage('policy_description_Handlers_type_mime_type_placeholder'),
        type : 'object-list',
        items : [
          {
            name : 'action',
            label : browser.i18n.getMessage('policy_description_Handlers_property_action'),
            type : 'enum',
            options : [
              {
                label : browser.i18n.getMessage('policy_description_Handlers_property_action_saveToDisk'),
                value : 'saveToDisk'
              },
              {
                label : browser.i18n.getMessage('policy_description_Handlers_property_action_useHelperApp'),
                value : 'useHelperApp'
              },
              {
                label : browser.i18n.getMessage('policy_description_Handlers_property_action_useSystemDefault'),
                value : 'useSystemDefault'
              }
            ]
          },
          {
            name : 'ask',
            label : browser.i18n.getMessage('policy_description_Handlers_property_ask'),
            type : 'enum',
            options : [
              {
                label : browser.i18n.getMessage('policy_description_Handlers_property_ask_true'),
                value : 'true'
              },
              {
                label : browser.i18n.getMessage('policy_description_Handlers_property_ask_false'),
                value : 'false'
              }
            ]
          },
          {
            name : 'handlers',
            label : browser.i18n.getMessage('policy_description_Handlers_property_handlers'),
            type : 'object-array',
            items : [
              {
                name : 'name',
                label : browser.i18n.getMessage('policy_description_Handlers_property_handlers_name'),
                type : 'string'
              },
              {
                name : 'path',
                label : browser.i18n.getMessage('policy_description_Handlers_property_handlers_path'),
                type : 'string'
              },
              {
                name : 'uriTemplate',
                label : browser.i18n.getMessage('policy_description_Handlers_property_handlers_uriTemplate'),
                type : 'url',
                secure : true
              }
            ]
          }
        ]
      },
      {
        name : 'schemes',
        label : browser.i18n.getMessage('policy_description_Handlers_type_schema'),
        placeholder_key : browser.i18n.getMessage('policy_description_Handlers_type_schema_placeholder'),
        type : 'object-list',
        items : [
          {
            name : 'action',
            label : browser.i18n.getMessage('policy_description_Handlers_property_action'),
            type : 'enum',
            options : [
              {
                label : browser.i18n.getMessage('policy_description_Handlers_property_action_saveToDisk'),
                value : 'saveToDisk'
              },
              {
                label : browser.i18n.getMessage('policy_description_Handlers_property_action_useHelperApp'),
                value : 'useHelperApp'
              },
              {
                label : browser.i18n.getMessage('policy_description_Handlers_property_action_useSystemDefault'),
                value : 'useSystemDefault'
              }
            ]
          },
          {
            name : 'ask',
            label : browser.i18n.getMessage('policy_description_Handlers_property_ask'),
            type : 'enum',
            options : [
              {
                label : browser.i18n.getMessage('policy_description_Handlers_property_ask_true'),
                value : 'true'
              },
              {
                label : browser.i18n.getMessage('policy_description_Handlers_property_ask_false'),
                value : 'false'
              }
            ]
          },
          {
            name : 'handlers',
            label : browser.i18n.getMessage('policy_description_Handlers_property_handlers'),
            type : 'object-array',
            items : [
              {
                name : 'name',
                label : browser.i18n.getMessage('policy_description_Handlers_property_handlers_name'),
                type : 'string'
              },
              {
                name : 'path',
                label : browser.i18n.getMessage('policy_description_Handlers_property_handlers_path'),
                type : 'string'
              },
              {
                name : 'uriTemplate',
                label : browser.i18n.getMessage('policy_description_Handlers_property_handlers_uriTemplate'),
                type : 'url',
                secure : true
              }
            ]
          }
        ]
      },
      {
        name : 'extensions',
        label : browser.i18n.getMessage('policy_description_Handlers_type_file_extension'),
        placeholder_key : browser.i18n.getMessage('policy_description_Handlers_type_file_extension_placeholder'),
        type : 'object-list',
        items : [
          {
            name : 'action',
            label : browser.i18n.getMessage('policy_description_Handlers_property_action'),
            type : 'enum',
            options : [
              {
                label : browser.i18n.getMessage('policy_description_Handlers_property_action_saveToDisk'),
                value : 'saveToDisk'
              },
              {
                label : browser.i18n.getMessage('policy_description_Handlers_property_action_useHelperApp'),
                value : 'useHelperApp'
              },
              {
                label : browser.i18n.getMessage('policy_description_Handlers_property_action_useSystemDefault'),
                value : 'useSystemDefault'
              }
            ]
          },
          {
            name : 'ask',
            label : browser.i18n.getMessage('policy_description_Handlers_property_ask'),
            type : 'enum',
            options : [
              {
                label : browser.i18n.getMessage('policy_description_Handlers_property_ask_true'),
                value : 'true'
              },
              {
                label : browser.i18n.getMessage('policy_description_Handlers_property_ask_false'),
                value : 'false'
              }
            ]
          },
          {
            name : 'handlers',
            label : browser.i18n.getMessage('policy_description_Handlers_property_handlers'),
            type : 'object-array',
            items : [
              {
                name : 'name',
                label : browser.i18n.getMessage('policy_description_Handlers_property_handlers_name'),
                type : 'string'
              },
              {
                name : 'path',
                label : browser.i18n.getMessage('policy_description_Handlers_property_handlers_path'),
                type : 'string'
              },
              {
                name : 'uriTemplate',
                label : browser.i18n.getMessage('policy_description_Handlers_property_handlers_uriTemplate'),
                type : 'url',
                secure : true
              }
            ]
          }
        ]
      }
    ]
  },

  AutoLaunchProtocolsFromOrigins : {
    first_available : { mainstream : '90.0', esr : '78.12' },
    ui_category : 'others',
    type : 'array',
    items : [
      {
        name : 'protocol',
        label : browser.i18n.getMessage('policy_description_AutoLaunchProtocolsFromOrigins_protocol'),
        mandatory : true,
        type : 'string'
      },
      {
        name : 'allowed_origins',
        label : browser.i18n.getMessage('policy_description_AutoLaunchProtocolsFromOrigins_allowed_origins'),
        type : 'array',
        items : {
          label : browser.i18n.getMessage('common_origin'),
          mandatory : true,
          type : 'url'
        }
      }
    ]
  },

  PDFjs : {
    first_available : { mainstream : '77.0', esr : '78.0' },
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

  EncryptedMediaExtensions : {
    first_available : { mainstream : '77.0', esr : '68.9' },
    is_lockable : true,
    ui_category : 'others',
    type : 'object',
    properties : [
      {
        name : 'Enabled',
        type : 'enum',
        label : browser.i18n.getMessage('policy_description_EncryptedMediaExtensions_Enabled'),
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

  StartDownloadsInTempDirectory : {
    first_available : { mainstream : '102.0', esr : '102.0' },
    ui_category : 'others',
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

  ExemptDomainFileTypePairsFromFileTypeDownloadWarnings : {
    first_available : { mainstream : '102.0', esr : '102.0' },
    ui_category : 'others',
    type : 'array',
    items : [
      {
        name : 'file_extension',
        label : browser.i18n.getMessage('policy_description_ExemptDomainFileTypePairsFromFileTypeDownloadWarnings_file_extension'),
        mandatory : true,
        type : 'string'
      },
      {
        name : 'domains',
        label : browser.i18n.getMessage('policy_description_ExemptDomainFileTypePairsFromFileTypeDownloadWarnings_domains'),
        type : 'array',
        items : {
          label : browser.i18n.getMessage('common_domain'),
          mandatory : true,
          type : 'string'
        }
      }
    ]
  },

  PrintingEnabled : {
    first_available : { mainstream : '120.0', esr : '115.5' },
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

  UseSystemPrintDialog : {
    first_available : { mainstream : '102.0', esr : '102.0' },
    ui_category : 'others',
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

  AllowedDomainsForApps : {
    first_available : { mainstream : '89.0', esr : '78.11' },
    ui_category : 'others',
    type : 'split-string',
    label : browser.i18n.getMessage('common_domain')
  },

  Preference_dom_keyboardevent_keypress_hack_dispatch_non_printable_keys_addl : {
    first_available : { mainstream : '68.0', esr : '68.0' },
    info_link : 'https://support.mozilla.org/kb/dom-events-changes-introduced-firefox-66',
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

  SkipTermsOfUse : {
    first_available : { mainstream : '138.0', esr : '140.0' },
    ui_category : 'others',
    type : 'enum',
    options : [
      {
        label : browser.i18n.getMessage('enum_value_yes'),
        value : 'false'
      },
      {
        label : browser.i18n.getMessage('enum_value_no'),
        value : 'true'
      }
    ]
  },

  OverrideFirstRunPage : {
    first_available : { mainstream : '62.0', esr : '60.0' },
    ui_category : 'others',
    type : 'split-url',
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
