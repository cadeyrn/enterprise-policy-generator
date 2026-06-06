import { spawn } from 'node:child_process'
import { existsSync } from 'node:fs'
import { mkdtemp, readFile, readdir, rm } from 'node:fs/promises'
import http from 'node:http'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const TEST_TIMEOUT_IN_MS = Number(process.env.TEST_TIMEOUT_IN_MS ?? 90000)
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const fixturesDirectory = path.join(projectRoot, 'tests/fixtures')
const importReportFixturesDirectory = path.join(fixturesDirectory, 'import-reports')
const realWorldFixturesDirectory = path.join(fixturesDirectory, 'real-world')
const profilePrefix = 'epg-policy-transformations-'
const sourceDirectory = path.join(projectRoot, 'src')
const ignoredFirefoxStderrPatterns = [
  /^\*\*\* You are running in headless mode\.$/,
  /^\[fluent] Missing message in locale [^:]+: .+$/
]

const getSelectedFixture = () => {
  const fixturePrefix = '--fixture='
  const args = process.argv.slice(2)
  let selectedFixture = null

  for (let i = 0; i < args.length; i++) {
    const argument = args[i]

    if (argument === '--fixture') {
      selectedFixture = args[++i]
    }
    else if (argument.startsWith(fixturePrefix)) {
      selectedFixture = argument.slice(fixturePrefix.length)
    }
    else {
      throw new Error(`Unknown argument: ${argument}`)
    }

    if (!selectedFixture) {
      throw new Error('Missing fixture name')
    }
  }

  return selectedFixture
}

const selectedFixture = getSelectedFixture()
const selectedFixturePath = selectedFixture && /[\\/]/.test(selectedFixture)
  ? path.resolve(process.cwd(), selectedFixture)
  : null

const fixtureMatchesSelection = (directory, file) => {
  if (!selectedFixture) {
    return true
  }

  if (selectedFixturePath) {
    return path.resolve(directory, file) === selectedFixturePath
  }

  return file === selectedFixture
}

const loadFixtures = async directory => {
  const files = (await readdir(directory))
    .filter(file => file.endsWith('.json'))
    .filter(file => fixtureMatchesSelection(directory, file))
    .sort()

  return Promise.all(files.map(async file => ({
    data: JSON.parse(await readFile(path.join(directory, file), 'utf8')),
    name: file
  })))
}

const getRelevantFirefoxStderr = stderr => stderr
  .split('\n')
  .map(line => line.trim())
  .filter(line => line && !ignoredFirefoxStderrPatterns.some(pattern => pattern.test(line)))
  .join('\n')

const printFirefoxStderr = stderr => {
  const relevantStderr = getRelevantFirefoxStderr(stderr)

  if (relevantStderr) {
    console.error('\nFirefox stderr:')
    console.error(relevantStderr)
  }
}

const cleanupOldProfiles = async () => {
  // temporary Firefox profiles can survive hard process kills, so clean up leftovers before creating a fresh profile
  const temporaryDirectory = os.tmpdir()
  const entries = await readdir(temporaryDirectory, { withFileTypes: true })

  await Promise.all(entries
    .filter(entry => entry.isDirectory() && entry.name.startsWith(profilePrefix))
    .map(entry => rm(path.join(temporaryDirectory, entry.name), { force: true, recursive: true })))
}

const createBrowserStub = () => `
  <script>
    // the configurator expects WebExtension APIs; these stubs keep the UI code unchanged while tests run over HTTP
    window.testErrors = [];
    window.testDownloads = [];
    window.testStorage = {};

    window.addEventListener('error', e => {
      window.testErrors.push({
        colno: e.colno,
        filename: e.filename,
        lineno: e.lineno,
        message: e.message,
        stack: e.error?.stack,
        type: 'error'
      });
    });
    window.addEventListener('unhandledrejection', e => {
      window.testErrors.push({
        message: e.reason?.message || String(e.reason),
        stack: e.reason?.stack,
        type: 'unhandledrejection'
      });
    });

    window.browser = {
      downloads: {
        download: async options => {
          const content = await fetch(options.url).then(response => response.text());
          window.testDownloads.push({ ...options, content });

          return window.testDownloads.length;
        }
      },
      i18n: {
        getMessage: (key, substitutions = null) => {
          if (!substitutions) {
            return key;
          }

          const values = Array.isArray(substitutions) ? substitutions : [substitutions];

          return values.reduce(
            (message, value, index) => message.replaceAll('$' + (index + 1), value),
            key
          );
        },
        getUILanguage: () => 'en'
      },
      permissions: {
        contains: async () => false,
        request: async () => true
      },
      runtime: {
        getURL: file => '/src/' + file
      },
      storage: {
        local: {
          get: async defaults => ({ ...defaults, ...window.testStorage }),
          set: async data => {
            Object.assign(window.testStorage, data);
          }
        }
      }
    };

    navigator.clipboard = {
      writeText: async () => {}
    };
  </script>`

const createBrowserRunner = (fixtures, importReportFixtures) => `
  <script>
    (() => {
      const fixtures = ${JSON.stringify(fixtures)};
      const importReportFixtures = ${JSON.stringify(importReportFixtures)};

      // policy object key order should not affect comparisons between generated and source policies
      const normalizeForComparison = value => {
        if (Array.isArray(value)) {
          return value.map(item => normalizeForComparison(item));
        }

        if (value && typeof value === 'object') {
          return Object.fromEntries(
            Object.keys(value).sort().map(key => [key, normalizeForComparison(value[key])])
          );
        }

        return value;
      };

      const valuesAreEqual = (source, result) =>
        JSON.stringify(normalizeForComparison(source)) === JSON.stringify(normalizeForComparison(result));

      const createPolicyDiff = (source, result) => {
        const sourceNames = Object.keys(source);
        const resultNames = Object.keys(result);

        return {
          different: sourceNames.filter(name => Object.hasOwn(result, name) && !valuesAreEqual(source[name], result[name])),
          missing: sourceNames.filter(name => !Object.hasOwn(result, name)),
          unexpected: resultNames.filter(name => !Object.hasOwn(source, name))
        };
      };

      const waitFor = (callback, message) => new Promise((resolve, reject) => {
        const started = Date.now();
        const timer = window.setInterval(() => {
          if (callback()) {
            window.clearInterval(timer);
            resolve();
          }
          else if (Date.now() - started > 10000) {
            window.clearInterval(timer);
            reject(new Error(message));
          }
        }, 50);
      });

      const waitForUi = () => waitFor(
        () => typeof Output !== 'undefined' &&
          typeof Serializer !== 'undefined' &&
          document.querySelector('.policy-container'),
        'UI did not initialize: ' + JSON.stringify(window.testErrors)
      );

      const createPhaseResult = (phase, source, result) => {
        const diff = createPolicyDiff(source, result);

        return {
          diff,
          ok: diff.different.length === 0 && diff.missing.length === 0 && diff.unexpected.length === 0,
          phase,
          result,
          source
        };
      };

      const createImportReportResult = (fixture, actual) => {
        const expected = fixture.data.expected;
        const ok = valuesAreEqual(expected.imported, actual.imported) &&
          valuesAreEqual(expected.partial, actual.partial) &&
          valuesAreEqual(expected.skipped, actual.skipped);

        return {
          actual,
          expected,
          name: 'import report: ' + fixture.name,
          ok,
          type: 'import-report'
        };
      };

      const getGeneratedPolicies = () =>
        JSON.parse(document.getElementById('policy-output').textContent).policies;

      const generatePoliciesViaButton = () => {
        document.getElementById('generate').click();

        return getGeneratedPolicies();
      };

      const selectImportFile = (name, content, type) => {
        const $file = document.getElementById('import-file-input');
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(new File([content], name, { type }));
        $file.files = dataTransfer.files;
        $file.dispatchEvent(new Event('input', { bubbles: true }));
        $file.dispatchEvent(new Event('change', { bubbles: true }));
      };

      const submitImportDialog = async () => {
        await waitFor(
          () => !document.getElementById('button-import-config-ok').disabled,
          'Import button was not enabled'
        );

        document.getElementById('button-import-config-ok').click();
      };

      const closeOpenDialogs = () => {
        document.querySelectorAll('dialog[open]').forEach($dialog => {
          $dialog.close();
        });
      };

      const resetTestState = () => {
        closeOpenDialogs();
        window.testDownloads = [];
        window.testStorage = { configurations: [] };
        Serializer.unserialize({});
        document.getElementById('policy-output').replaceChildren();
      };

      const saveCurrentConfiguration = async name => {
        const expectedConfigurationCount = (window.testStorage.configurations?.length ?? 0) + 1;

        document.getElementById('save-configuration').click();

        const $name = document.getElementById('save-dialog-name');
        $name.value = name;
        $name.dispatchEvent(new Event('input', { bubbles: true }));
        document.getElementById('button-save-dialog-ok').click();

        await waitFor(
          () => window.testStorage.configurations?.length === expectedConfigurationCount,
          'Configuration was not saved'
        );
      };

      const openConfigurationList = async (minimumRows = 1) => {
        const $dialog = document.getElementById('configuration-list-dialog');

        if ($dialog.open && document.querySelectorAll('.configuration-list-body .configuration-row').length < minimumRows) {
          $dialog.close();
        }

        if (!$dialog.open) {
          document.getElementById('list-configurations').click();
        }

        await waitFor(
          () => document.querySelectorAll('.configuration-list-body .configuration-row').length >= minimumRows,
          'Configuration list did not open'
        );
      };

      const getConfigurationAction = (configurationIndex, actionIndex) =>
        document.querySelectorAll('.configuration-list-body .configuration-row')[configurationIndex]
          .querySelectorAll('.actions > button')[actionIndex];

      const loadConfiguration = async (configurationIndex = 0) => {
        await openConfigurationList(configurationIndex + 1);
        getConfigurationAction(configurationIndex, 0).click();

        await waitFor(
          () => document.getElementById('policy-output').textContent.trim().startsWith('{'),
          'Configuration was not loaded'
        );

        return getGeneratedPolicies();
      };

      const exportConfiguration = async (configurationIndex = 0) => {
        await openConfigurationList(configurationIndex + 1);
        getConfigurationAction(configurationIndex, 1).click();

        await waitFor(
          () => window.testDownloads.length === 1,
          'Configuration was not exported'
        );

        closeOpenDialogs();

        return window.testDownloads[0].content;
      };

      const importPoliciesJsonFile = async (name, data) => {
        document.getElementById('import-configuration').click();
        selectImportFile(name, JSON.stringify(data), 'application/json');
        await submitImportDialog();

        await waitFor(
          () => window.testStorage.configurations?.length === 1 &&
            document.getElementById('configuration-list-dialog').open,
          'policies.json was not imported as a saved configuration'
        );

        if (document.getElementById('import-policies-json-report-dialog').open) {
          document.getElementById('button-import-policies-json-report-close').click();

          await waitFor(
            () => !document.getElementById('import-policies-json-report-dialog').open,
            'policies.json import report did not close'
          );
        }

        return loadConfiguration();
      };

      const importPolicyFile = async (name, content) => {
        window.testStorage = { configurations: [] };
        document.getElementById('import-configuration').click();
        selectImportFile(name + '.policy', content, 'application/octet-stream');
        await submitImportDialog();

        await waitFor(
          () => window.testStorage.configurations?.length === 1,
          'Configuration was not imported'
        );
      };

      const readImportReport = () => {
        const sections = Array.from(document.querySelectorAll(
          '#import-policies-json-report-details .import-report-section'
        ));

        const getListItems = (index, selector) =>
          Array.from(sections[index]?.querySelectorAll(selector) ?? [])
            .map($item => $item.textContent.trim())
            .filter(text => text !== 'configuration_import_policies_json_report_empty_section');

        return {
          imported: getListItems(0, '.import-report-name-entry'),
          partial: getListItems(1, '.import-report-entry > summary'),
          skipped: Array.from(sections[2]?.querySelectorAll('.import-report-skipped-entry') ?? [])
            .map($entry => ({
              name: $entry.querySelector('strong').textContent.trim(),
              reason: $entry.querySelector('.import-report-reason').textContent.trim()
            }))
        };
      };

      const importPoliciesJsonForReport = async fixture => {
        document.getElementById('import-configuration').click();
        selectImportFile(fixture.name, JSON.stringify(fixture.data.input), 'application/json');
        await submitImportDialog();

        await waitFor(
          () => document.getElementById('import-policies-json-report-dialog').open,
          'policies.json import report did not open'
        );

        return readImportReport();
      };

      const runTests = async () => {
        await waitForUi();

        const results = [];

        for (const fixture of fixtures) {
          try {
            resetTestState();

            const sourcePolicies = fixture.data.policies;
            const phases = [];

            // start from a real policies.json import, because it is the least structured input format
            phases.push(createPhaseResult(
              'policies.json import dialog -> load action -> policies.json output',
              sourcePolicies,
              await importPoliciesJsonFile(fixture.name, fixture.data)
            ));

            const serializedConfiguration = Serializer.serialize();

            // verify the internal storage representation can recreate the same generated output
            Serializer.unserialize(serializedConfiguration);
            phases.push(createPhaseResult(
              'serialized configuration -> generate button -> policies.json output',
              sourcePolicies,
              generatePoliciesViaButton()
            ));
            phases.at(-1).configuration = serializedConfiguration;

            await saveCurrentConfiguration(fixture.name.replace(/\\.json$/, ''));
            const savedConfigurationIndex = window.testStorage.configurations.length - 1;

            // verify saved configurations load through the same UI action users use in the dialog
            phases.push(createPhaseResult(
              'saved configuration -> load action -> policies.json output',
              sourcePolicies,
              await loadConfiguration(savedConfigurationIndex)
            ));

            const exportedPolicyFile = await exportConfiguration(savedConfigurationIndex);
            await importPolicyFile(fixture.name.replace(/\\.json$/, '-imported'), exportedPolicyFile);
            // verify the exported .policy format can be imported again without losing data
            phases.push(createPhaseResult(
              '.policy export -> .policy import -> load action -> policies.json output',
              sourcePolicies,
              await loadConfiguration()
            ));

            results.push({
              phases,
              name: fixture.name,
              ok: phases.every(phase => phase.ok)
            });
          }
          catch (error) {
            results.push({
              message: error.message,
              name: fixture.name,
              ok: false,
              stack: error.stack
            });
          }
        }

        for (const fixture of importReportFixtures) {
          try {
            resetTestState();
            results.push(createImportReportResult(
              fixture,
              await importPoliciesJsonForReport(fixture)
            ));
          }
          catch (error) {
            results.push({
              message: error.message,
              name: 'import report: ' + fixture.name,
              ok: false,
              stack: error.stack,
              type: 'import-report'
            });
          }
        }

        return results;
      };

      runTests()
        .then(results => fetch('/result', {
          body: JSON.stringify({ ok: results.every(result => result.ok), results }),
          method: 'POST'
        }))
        .catch(error => fetch('/result', {
          body: JSON.stringify({
            message: error.message,
            ok: false,
            stack: error.stack,
            testErrors: window.testErrors
          }),
          method: 'POST'
        }));
    })();
  </script>`

const createServer = (fixtures, importReportFixtures, onResult) => {
  const browserStub = createBrowserStub()
  const browserRunner = createBrowserRunner(fixtures, importReportFixtures)

  // serve the local extension files and inject the stubs plus the browser-side test runner into the HTML page
  return http.createServer(async (request, response) => {
    const url = new URL(request.url, 'http://127.0.0.1')

    if (url.pathname === '/result') {
      let body = ''
      request.setEncoding('utf8')
      request.on('data', chunk => {
        body += chunk
      })
      request.on('end', () => {
        onResult(JSON.parse(body))
        response.writeHead(204)
        response.end()
      })
      return
    }

    const requestPath = url.pathname === '/' ? '/src/html/configurator.html' : decodeURIComponent(url.pathname)
    const file = path.join(projectRoot, requestPath)

    if (!file.startsWith(sourceDirectory) || !existsSync(file)) {
      response.writeHead(404)
      response.end('not found')
      return
    }

    let content = await readFile(file)

    if (file.endsWith('/src/html/configurator.html')) {
      content = content.toString()
        .replace('<head>', () => `<head>${browserStub}`)
        .replace('</body>', () => `${browserRunner}</body>`)
    }

    response.writeHead(200)
    response.end(content)
  })
}

const printResults = result => {
  const logDetail = message => {
    console.log(`  ${message}`)
  }

  const logNestedDetail = message => {
    console.log(`    ${message}`)
  }

  if (result.results) {
    for (const item of result.results) {
      const status = item.ok ? 'PASS' : 'FAIL'
      console.log(`${status} ${item.name}`)

      if (!item.ok) {
        if (item.message) {
          logDetail(item.message)
        }

        for (const phase of item.phases ?? []) {
          if (phase.ok) {
            continue
          }

          logDetail(phase.phase)
          logNestedDetail(`missing: ${phase.diff.missing.join(', ') || '-'}`)
          logNestedDetail(`different: ${phase.diff.different.join(', ') || '-'}`)
          logNestedDetail(`unexpected: ${phase.diff.unexpected.join(', ') || '-'}`)

          for (const name of phase.diff.different) {
            logNestedDetail(`source ${name}: ${JSON.stringify(phase.source[name], null, 2)}`)
            logNestedDetail(`result ${name}: ${JSON.stringify(phase.result[name], null, 2)}`)
          }

          if (phase.configuration) {
            logNestedDetail(`serialized configuration: ${JSON.stringify(phase.configuration, null, 2)}`)
          }
        }

        if (item.type === 'import-report') {
          logDetail(`expected: ${JSON.stringify(item.expected, null, 2)}`)
          logDetail(`actual: ${JSON.stringify(item.actual, null, 2)}`)
        }
      }
    }
  }

  if (result.message) {
    console.error(result.message)
  }

  if (result.stack) {
    console.error(result.stack)
  }
}

const run = async () => {
  await cleanupOldProfiles()

  const fixtures = await loadFixtures(fixturesDirectory)
  const realWorldFixtures = await loadFixtures(realWorldFixturesDirectory)
  const importReportFixtures = await loadFixtures(importReportFixturesDirectory)

  if (fixtures.length === 0 && realWorldFixtures.length === 0 && importReportFixtures.length === 0) {
    if (selectedFixture) {
      throw new Error(`No fixture matching "${selectedFixture}" found`)
    }

    throw new Error(`No fixtures found in ${fixturesDirectory}, ${realWorldFixturesDirectory}, or ${importReportFixturesDirectory}`)
  }

  let child = null
  let profile = null
  let timeout = null
  let firefoxStderr = ''

  const cleanup = async () => {
    // each run gets an isolated Firefox profile and removes it again on success, failure, or timeout
    if (child) {
      child.kill()
    }

    if (profile) {
      await rm(profile, { force: true, recursive: true })
    }
  }

  const exit = async (server, code) => {
    clearTimeout(timeout)
    await cleanup()
    server.close(() => {
      process.exit(code)
    })
  }

  const server = createServer([...fixtures, ...realWorldFixtures], importReportFixtures, result => {
    printResults(result)

    if (!result.ok && firefoxStderr) {
      printFirefoxStderr(firefoxStderr)
    }

    void exit(server, result.ok ? 0 : 1)
  })

  server.listen(0, '127.0.0.1', async () => {
    const { port } = server.address()
    profile = await mkdtemp(path.join(os.tmpdir(), profilePrefix))
    child = spawn('firefox', [
      '--headless',
      '--new-instance',
      '--profile',
      profile,
      `http://127.0.0.1:${port}/src/html/configurator.html`
    ], {
      stdio: ['ignore', 'ignore', 'pipe']
    })

    child.stderr.on('data', data => {
      firefoxStderr += data

      if (process.env.DEBUG_FIREFOX) {
        process.stderr.write(data)
      }
    })

    child.on('error', error => {
      console.error(error.message)
      void exit(server, 1)
    })
  })

  timeout = setTimeout(() => {
    console.error(`Timed out after ${TEST_TIMEOUT_IN_MS} ms`)

    if (firefoxStderr) {
      printFirefoxStderr(firefoxStderr)
    }

    void exit(server, 1)
  }, TEST_TIMEOUT_IN_MS)
}

run().catch(error => {
  console.error(error.message)
  process.exit(1)
})
