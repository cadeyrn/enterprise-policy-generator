# Writing policy definitions

These notes are for changes to `src/policies/firefox.json`: adding new Firefox policies, extending existing policies,
and keeping the generated UI, output, translations, and tests in sync.

The files you will usually touch are:

- [`src/policies/firefox.json`](../src/policies/firefox.json): policies, categories, options, presets, and validations
- [`src/_locales/*/messages.json`](../src/_locales): all visible text
- [`policies-schema.json`](../policies-schema.json): validation schema for `firefox.json`

The UI and output code are mostly generic. If a policy can be described in `firefox.json`, prefer that over adding
policy-specific JavaScript.

If a change needs more context, these files are usually the next stop:

- [`src/js/core/configurator.js`](../src/js/core/configurator.js): builds the form from `firefox.json`
- [`src/js/core/output.js`](../src/js/core/output.js): turns the form state into `policies.json`

## Reading order

- [File structure](policy-file-structure.md): top-level sections in `firefox.json`
- [Policy metadata](policy-metadata.md): availability, categories, notices, links, and special flags
- [Schema types](schema-types.md): `boolean`, `enum`, `string`, `object`, `array`, and `heading`
- [Objects and arrays](objects-and-arrays.md): nested structures, dynamic keys, and repeatable fields
- [String fields and validation](string-fields-and-validation.md): required fields, URL schemes, numbers, JSON, and regex checks
- [Localization](localization.md): message keys and locale requirements
- [Recipes](recipes.md): copyable examples for common policy shapes
- [Tests and checklist](testing-and-checklist.md): checks to run before committing

## Before adding a policy

Every policy definition should answer three questions:

- Where does it appear in the UI?
- Which controls does the user need?
- What exact JSON should be generated?

If those answers are clear in `firefox.json`, the rest of the generator usually works without additional code.

---

Next: [File structure](policy-file-structure.md)
