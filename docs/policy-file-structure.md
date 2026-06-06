# File structure

The file `src/policies/firefox.json` has four top-level sections:

```json
{
  "policies": {},
  "preferences": {},
  "presets": {},
  "tags": []
}
```

## `policies`

`policies` contains the actual Firefox policies. The object key is the policy name used in the generated `policies.json`.

```json
{
  "policies": {
    "DisableTelemetry": {
      "availability": { "mainstream": "60.0", "esr": "60.0" },
      "tags": ["privacy"],
      "schema": "boolean"
    }
  }
}
```

Each policy must define at least:

- `availability`
- `tags`
- `schema`

## `preferences`

`preferences` is used to validate preference names. This applies to policies where users can enter custom Firefox preferences.

```json
{
  "preferences": {
    "allowed": ["browser."],
    "disallowed": ["app.update.channel"]
  }
}
```

`allowed` contains allowed names or prefixes. `disallowed` contains explicit exceptions.

## `presets`

`presets` defines reusable select options for `enum` fields.

```json
{
  "presets": {
    "boolean_optional": [
      { "label": "enum_value_no_preference", "value": null },
      { "label": "enum_value_yes", "value": true },
      { "label": "enum_value_no", "value": false }
    ]
  }
}
```

A preset is referenced from a policy using `preset`:

```json
{
  "schema": "enum",
  "preset": "boolean_optional"
}
```

## `tags`

`tags` defines the categories shown in the user interface. Each policy must use exactly one category.

```json
{
  "tags": [
    "block-access",
    "features",
    "customization"
  ]
}
```

The category of a policy is set through `tags`:

```json
{
  "tags": ["features"]
}
```

---

Previous: [Writing policy definitions](README.md)  
Next: [Policy metadata](policy-metadata.md)
