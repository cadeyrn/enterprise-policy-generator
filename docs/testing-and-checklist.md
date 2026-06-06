# Tests and checklist

Before committing new policies or options, run the relevant project checks.

## Check the schema

```bash
npm run lint:policies-schema
```

Checks the structure of `policies-schema.json`.

## Check policies

```bash
npm run lint:policies
```

Validates `src/policies/*.json` against `policies-schema.json`.

## Check translations

```bash
npm run lint:locales
```

Checks whether all locale files contain the same message keys.

## Check JavaScript and JSON

```bash
npm run lint:js
```

Checks JavaScript and JSON files, including alphabetic sorting of JSON keys.

## Run the full lint

```bash
npm run lint
```

Runs all lint tasks and collects failures instead of stopping after the first one.

## Test transformations

```bash
npm run test:policy-transformations
```

Checks important transformations:

- importing `policies.json`
- generating the `policies.json` output
- saving and loading internal configurations
- exporting and importing `.policy` files

To run a single fixture, pass its path with `--fixture`:

```bash
npm run test:policy-transformations -- --fixture=tests/fixtures/match-pattern-array-values.json
```

Passing only the file name works, but using the path allows shell autocompletion.

The top-level JSON files in `tests/fixtures/` are targeted positive roundtrip fixtures. Each file must import from
`policies.json`, generate the same `policies.json` output again, survive internal serialization, load from a saved
configuration, export to `.policy`, and import that `.policy` file again without changing the resulting policies.

Fixtures must be named after the behavior or schema shape they cover, not after the Firefox policies used as examples.
Avoid mixing unrelated behaviors in one file unless the combination itself is the case being tested.

The `tests/fixtures/real-world/` directory contains real-world configurations. Keep these files in the test suite, but
do not rely on them as the only coverage for a schema feature or policy behavior. If a relevant case is only covered by
a real-world fixture, add a smaller targeted fixture as well.

The `tests/fixtures/import-reports/` directory contains negative import fixtures. These files intentionally include
policies or values that cannot be represented completely by the current UI and are expected to open the detailed import
report instead of roundtripping exactly.

## Manual checklist

- The new policy has `availability`, `tags`, and `schema`.
- The category matches the actual meaning.
- The UI description explains the effect neutrally and clearly.
- Optional select fields use a `null` state where possible, so configuration is not generated accidentally.
- Required fields are genuinely required by the policy.
- URL fields only use additional schemes if the Firefox policy supports them.
- All new message keys exist in every locale file.
- The generated `policies.json` matches the Firefox documentation.
- Import, save, load, and export work with the new structure.

---

Previous: [Recipes](recipes.md)
