# Schema types

The value of `schema` decides which UI is generated and which value is written to `policies.json`.

## `boolean`

A boolean policy does not need additional options.

```json
{
  "availability": { "mainstream": "60.0", "esr": "60.0" },
  "tags": ["privacy"],
  "schema": "boolean"
}
```

When enabled, it outputs `true` by default.

```json
{
  "policies": {
    "DisableTelemetry": true
  }
}
```

With `inverse: true`, enabling the policy outputs `false`.

## `enum`

`enum` creates a select field.

```json
{
  "schema": "enum",
  "options": [
    {
      "label": "enum_value_yes",
      "value": true
    },
    {
      "label": "enum_value_no",
      "value": false
    }
  ]
}
```

Instead of defining options directly, a preset can be used.

```json
{
  "schema": "enum",
  "preset": "boolean_optional"
}
```

Important properties:

- `options`: list of visible options
- `preset`: name of an entry from `presets`
- `default`: preselected value
- `sort_options`: sorts options by translated label

An option value of `null` means that no output is generated.

## `string`

`string` creates an input field or a textarea.

```json
{
  "schema": "string",
  "placeholder": "common_url",
  "validations": ["required", "url"]
}
```

Important properties:

- `name`: property name in the generated object
- `label`: visible label above the field
- `placeholder`: placeholder and accessible name if no label exists
- `textarea`: creates a multiline input
- `validations`: enables validations
- `regex`: additional pattern check
- `allow_empty_value`: allows empty output
- `output_filter`: transforms the output value

## `object`

`object` groups multiple properties.

```json
{
  "schema": "object",
  "properties": [
    {
      "name": "Enabled",
      "schema": "enum",
      "preset": "boolean_optional"
    }
  ]
}
```

Objects only generate output if at least one child option generates a value.

Important properties:

- `name`: property name in the parent object
- `label`: heading shown before the object
- `properties`: child options
- `lockable`: adds an option to write `Locked: true`
- `key`: creates a dynamic or fixed object key

## `array`

`array` creates repeatable entries.

```json
{
  "schema": "array",
  "items": {
    "schema": "string",
    "placeholder": "common_url",
    "validations": ["url"]
  }
}
```

Arrays can contain strings, booleans, objects, nested arrays, or enums.

Important properties:

- `items`: describes the array item
- `label`: visible heading
- `join`: outputs a string array as a joined string
- `allow_empty_value`: allows an empty output value
- `additions`: adds fixed sections before or after the normal entries

## `heading`

`heading` is only allowed inside `object.properties`. It creates a visible section heading but does not generate output.

```json
{
  "schema": "heading",
  "label": "policy_description_Example_heading"
}
```

`heading` does not need a `name`.

---

Previous: [Policy metadata](policy-metadata.md)  
Next: [Objects and arrays](objects-and-arrays.md)
