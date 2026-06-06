# Localization

All visible text comes from the files in `src/_locales/*/messages.json`.

## New text

Write new messages in English first. Add the same key to every locale file. If a locale has no human translation yet,
use the English text there as well.

```bash
npm run lint:locales
```

Locale linting checks whether all locale files contain the same message keys.

## Policy descriptions

Each policy needs a description key following this pattern:

```text
policy_description_<PolicyName>
```

For a policy named `DisableTelemetry`, this key must exist:

```json
{
  "policy_description_DisableTelemetry": {
    "message": "Disable telemetry"
  }
}
```

## Labels and placeholders

Labels and placeholders are referenced from `firefox.json` as message keys.

```json
{
  "name": "URL",
  "schema": "string",
  "label": "policy_description_Example_URL_label",
  "placeholder": "common_url"
}
```

The key must exist in every locale file.

## Missing translations

Do not leave message keys out. Missing translations can be replaced later; missing keys should not reach the codebase.

## Key order

The JSON files are checked by ESLint for alphabetically sorted keys. New keys should therefore be inserted alphabetically.

```bash
npm run lint:js
```

## Naming

Recommended patterns:

- `policy_description_<PolicyName>` for policies
- `policy_description_<PolicyName>_<OptionName>` for options
- `policy_description_<PolicyName>_note` for notices
- `policy_description_<PolicyName>_deprecation` for deprecation notices
- `validation_<Name>` for validation errors

Names should describe the actual meaning, not just the UI position.

---

Previous: [String fields and validation](string-fields-and-validation.md)  
Next: [Recipes](recipes.md)
