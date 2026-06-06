# Objects and arrays

Objects and arrays are the main building blocks for complex policies.

## Object with properties

```json
{
  "schema": "object",
  "properties": [
    {
      "name": "Enabled",
      "schema": "enum",
      "preset": "boolean_optional"
    },
    {
      "name": "URL",
      "schema": "string",
      "placeholder": "common_url",
      "validations": ["url"]
    }
  ]
}
```

If users set both values, the output is:

```json
{
  "Enabled": true,
  "URL": "https://example.com/"
}
```

## Names and output

`name` determines the property name in the generated JSON.

```json
{
  "name": "Install",
  "schema": "array",
  "items": {
    "schema": "string",
    "placeholder": "common_url"
  }
}
```

Without `name`, the field is not written as its own property in an object. This is mostly useful at policy level or in special array structures.

## `lockable`

```json
{
  "schema": "object",
  "lockable": true,
  "properties": []
}
```

`lockable` adds a checkbox that writes `Locked: true` to the object when enabled.

## Dynamic keys

With `key`, an object or string in an array can be output as a keyed object.

```json
{
  "schema": "array",
  "items": {
    "schema": "object",
    "key": {
      "placeholder": "policy_description_Example_key"
    },
    "properties": [
      {
        "name": "installation_mode",
        "schema": "enum",
        "preset": "enable_optional"
      }
    ]
  }
}
```

If users enter `example@example.com` as the key, the output is:

```json
{
  "example@example.com": {
    "installation_mode": true
  }
}
```

## Fixed keys

`key.value` creates a fixed key without an input field.

```json
{
  "key": {
    "value": "*"
  }
}
```

This is useful for fixed special cases inside keyed arrays.

## Key validation

For preference keys, the `preference` validation can be used.

```json
{
  "key": {
    "placeholder": "policy_description_Preferences_key",
    "validations": ["preference"]
  }
}
```

The allowed and blocked prefixes are defined in the top-level `preferences` section.

## Array of strings

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

This creates a list of strings.

## Array of objects

```json
{
  "schema": "array",
  "items": {
    "schema": "object",
    "properties": [
      {
        "name": "name",
        "schema": "string",
        "placeholder": "policy_description_Example_name",
        "validations": ["required"]
      },
      {
        "name": "url",
        "schema": "string",
        "placeholder": "common_url",
        "validations": ["required", "url"]
      }
    ]
  }
}
```

This creates a list of objects.

## Boolean array

Boolean arrays create a fixed group of checkboxes.

```json
{
  "schema": "array",
  "items": {
    "schema": "boolean",
    "options": [
      {
        "name": "extension",
        "label": "policy_description_Example_extension"
      },
      {
        "name": "theme",
        "label": "policy_description_Example_theme"
      }
    ]
  }
}
```

Enabled options are written as string values in the array.

## `join`

`join` joins string-array values into a single string.

```json
{
  "schema": "array",
  "items": {
    "schema": "string",
    "placeholder": "policy_description_Example_value",
    "join": ","
  }
}
```

Allowed separators are:

- `,`
- `|`
- a space

## `allow_empty_value` for arrays

At array level, `allow_empty_value` allows an empty input to be written intentionally.

For a string array, this can output an empty string. For an array of objects, this can output an array containing an empty object.

## `additions`

`additions` adds fixed sections before or after the repeatable array entries.

```json
{
  "schema": "array",
  "items": {
    "schema": "object",
    "additions": {
      "prepend": {
        "schema": "object",
        "properties": []
      },
      "append": {
        "schema": "array",
        "items": {
          "schema": "object",
          "properties": []
        }
      }
    },
    "properties": []
  }
}
```

Use `additions` sparingly. It is mainly useful when a Firefox policy consists of a mix of fixed and repeatable structures.

---

Previous: [Schema types](schema-types.md)  
Next: [String fields and validation](string-fields-and-validation.md)
