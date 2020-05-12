const fs = require('fs');
const path = require('path');
const YAML = require('yaml');
const stringify = require('json-stringify-pretty-compact');

const args = require('yargs').option('yaml', {
  alias: 'y',
  type: 'boolean',
  description: 'Output as YAML instead of JSON',
}).argv;

const langParser = args.yaml ? YAML : { stringify };
const fullPath = path.resolve(...args._);

if (args._.length === 0 || !fs.existsSync(fullPath)) {
  console.error(`ERROR: ${fullPath} does not exist`);
  process.exit(1);
}

const userModule = require(path.resolve(...args._));

(async function () {
  let result = userModule;
  if (typeof userModule === 'function') {
    result = await userModule(args);
  }

  console.log(langParser.stringify(result));
})();
