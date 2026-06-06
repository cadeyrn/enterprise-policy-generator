# Policy metadata

Each policy in `policies` can define additional metadata besides `schema`. This metadata controls placement, notices, compatibility, and special behavior.

## `availability`

`availability` describes which Firefox version introduced a policy.

```json
{
  "availability": {
    "mainstream": "144.0",
    "esr": "140.4"
  }
}
```

Both values must be present. Version strings and `null` are allowed.

If a policy is newer than the minimum version supported by the extension, the user interface shows a version notice.

## `tags`

`tags` contains exactly one category.

```json
{
  "tags": ["security"]
}
```

The available categories are listed in the top-level `tags` section.

## `schema`

`schema` determines which value the policy generates and which UI controls are shown.

Allowed policy-level values are:

- `array`
- `boolean`
- `enum`
- `object`
- `string`

## `enabled`

With `enabled: false`, a policy remains in `firefox.json` but is not shown in the user interface.

```json
{
  "enabled": false
}
```

This is useful for prepared or temporarily disabled policies.

## `exclude`

`exclude` defines mutually exclusive policies.

```json
{
  "exclude": ["OtherPolicy"]
}
```

When the policy is enabled, the excluded policies are disabled in the user interface.

## `inverse`

`inverse` is only relevant for `boolean` policies.

Normally, an enabled boolean policy generates the value `true`. With `inverse: true`, it generates `false` instead.

```json
{
  "schema": "boolean",
  "inverse": true
}
```

## `deprecation`

`deprecation` shows a translated notice when a policy is deprecated.

```json
{
  "deprecation": "policy_description_Example_deprecation"
}
```

The value is a key from the locale files.

## `note`

`note` shows an additional notice.

```json
{
  "note": "policy_description_Example_note"
}
```

The value is also a translation key.

## `security_warning`

`security_warning: true` shows a reusable security warning for policies that can weaken important Firefox security protections.

```json
{
  "security_warning": true
}
```

Use this for policies where users should be explicitly reminded to understand the security impact before enabling them.

## `link`

`link` shows a link to further information.

```json
{
  "link": "https://example.com/documentation"
}
```

Links are opened in a new tab.

---

Previous: [File structure](policy-file-structure.md)  
Next: [Schema types](schema-types.md)
