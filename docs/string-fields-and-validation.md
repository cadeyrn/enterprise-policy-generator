# String fields and validation

String fields are the most flexible input fields. They can accept text, URLs, numbers, or JSON.

## Simple string field

```json
{
  "name": "URL",
  "schema": "string",
  "placeholder": "common_url"
}
```

If `label` is missing, the placeholder is also used as the accessible name.

## Label and placeholder

```json
{
  "name": "Name",
  "schema": "string",
  "label": "policy_description_Example_name_label",
  "placeholder": "policy_description_Example_name_placeholder"
}
```

Use `label` when the meaning of the field should remain visible. Use only `placeholder` when the context is clear or the layout should stay compact.

## `required`

```json
{
  "validations": ["required"]
}
```

Required fields are initially marked as invalid until a value is entered.

## `url`

```json
{
  "validations": ["url"]
}
```

Without additional configuration, the following schemes are allowed:

- `https://`
- `http://`
- `file://`

For different cases, set `url_schemes`.

```json
{
  "validations": ["url"],
  "url_schemes": ["https", "http", "file", "javascript"]
}
```

Allowed values for `url_schemes` are:

- `data`
- `file`
- `http`
- `https`
- `javascript`

`data` is internally accepted only as `data:image/*`.

## `number`

Number fields are created as text fields with `inputmode="numeric"`. This keeps the custom plus/minus controls and validation consistent.

```json
{
  "name": "Duration",
  "schema": "string",
  "placeholder": "policy_description_Example_duration",
  "validations": ["number"],
  "minimum": 0,
  "maximum": 24
}
```

`minimum` and `maximum` may only be set when `validations` contains `number`.

## `json`

```json
{
  "schema": "string",
  "textarea": true,
  "placeholder": "policy_description_Example_json",
  "validations": ["json"]
}
```

If the JSON is valid, the content is written as an object or array, not as a string.

## `regex`

`regex` adds an additional pattern check.

```json
{
  "schema": "string",
  "placeholder": "policy_description_Example_template",
  "validations": ["url"],
  "regex": {
    "pattern": "%s",
    "error": "validation_missing_placeholder_s"
  }
}
```

`error` is a translation key for the error message.

## `allow_empty_value`

```json
{
  "schema": "string",
  "placeholder": "policy_description_Example_empty",
  "allow_empty_value": true
}
```

Normally, empty string fields do not generate output. With `allow_empty_value`, an empty string can be written intentionally.

## `output_filter`

`output_filter` changes the value immediately before output is generated.

Currently supported filters:

- `ends_with_dot`: appends a dot if the value does not already end with one
- `type_aware`: converts values to a number or boolean depending on a sibling `Type` select field

```json
{
  "schema": "string",
  "placeholder": "common_domain",
  "output_filter": "ends_with_dot"
}
```

New filters should only be added when the output cannot reasonably be represented through the UI structure itself.

---

Previous: [Objects and arrays](objects-and-arrays.md)  
Next: [Localization](localization.md)
