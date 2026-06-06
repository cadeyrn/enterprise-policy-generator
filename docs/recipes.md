# Recipes

Short examples for common policy and option shapes.

## Simple boolean policy

```json
{
  "ExampleBooleanPolicy": {
    "availability": { "mainstream": "140.0", "esr": "140.0" },
    "tags": ["features"],
    "schema": "boolean"
  }
}
```

When enabled, this outputs:

```json
{
  "policies": {
    "ExampleBooleanPolicy": true
  }
}
```

## Boolean policy with inverted output

```json
{
  "ExampleInvertedPolicy": {
    "availability": { "mainstream": "140.0", "esr": "140.0" },
    "tags": ["features"],
    "schema": "boolean",
    "inverse": true
  }
}
```

When enabled, this outputs:

```json
{
  "policies": {
    "ExampleInvertedPolicy": false
  }
}
```

## String policy with URL validation

```json
{
  "ExampleURLPolicy": {
    "availability": { "mainstream": "140.0", "esr": "140.0" },
    "tags": ["network"],
    "schema": "string",
    "placeholder": "common_url",
    "validations": ["required", "url"]
  }
}
```

Without `url_schemes`, `https://`, `http://`, and `file://` are allowed.

## URL field with JavaScript URLs

```json
{
  "name": "url",
  "schema": "string",
  "placeholder": "common_url",
  "validations": ["required", "url"],
  "url_schemes": ["https", "http", "file", "javascript"]
}
```

Use `javascript` only when the Firefox policy explicitly supports it.

## Optional select field

```json
{
  "name": "Enabled",
  "schema": "enum",
  "preset": "boolean_optional"
}
```

The `null` value in the preset does not generate output. This prevents writing configuration unless users make a concrete choice.

## Object with multiple options

```json
{
  "ExampleObjectPolicy": {
    "availability": { "mainstream": "140.0", "esr": "140.0" },
    "tags": ["privacy"],
    "schema": "object",
    "lockable": true,
    "properties": [
      {
        "name": "Enabled",
        "schema": "enum",
        "preset": "boolean_optional"
      },
      {
        "name": "Exceptions",
        "schema": "array",
        "items": {
          "schema": "string",
          "placeholder": "common_url",
          "validations": ["url"]
        }
      }
    ]
  }
}
```

## Array of objects

```json
{
  "ExampleBookmarks": {
    "availability": { "mainstream": "140.0", "esr": "140.0" },
    "tags": ["bookmarks"],
    "schema": "array",
    "items": {
      "schema": "object",
      "properties": [
        {
          "name": "name",
          "schema": "string",
          "placeholder": "policy_description_ExampleBookmarks_name",
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
}
```

## Keyed array

```json
{
  "ExampleSettings": {
    "availability": { "mainstream": "140.0", "esr": "140.0" },
    "tags": ["customization"],
    "schema": "array",
    "items": {
      "schema": "object",
      "key": {
        "placeholder": "policy_description_ExampleSettings_key"
      },
      "properties": [
        {
          "name": "Value",
          "schema": "string",
          "placeholder": "policy_description_ExampleSettings_value"
        }
      ]
    }
  }
}
```

Depending on the entered key, this outputs an object instead of an array.

## Section headings in options

```json
{
  "schema": "heading",
  "label": "policy_description_Example_heading"
}
```

`heading` can be used inside `object.properties` and does not generate output.

---

Previous: [Localization](localization.md)  
Next: [Tests and checklist](testing-and-checklist.md)
