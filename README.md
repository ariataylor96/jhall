# jhall
## Like dhall, but with a language you already know

Are you tired of your config files developing their own domain specific languages?

Feel like your static, declarative configuration files could stand to be a little more dynamic?

Want to use functions to declare your data?

We can probably fix some of those.

## Installation

`npm install -g jhall`

or with `yarn`,

`yarn global add jhall`

## Usage

You now have the `jhall` binary on your path. Call it with the path to a CJS JavaScript file, and it will output your configuration to `stdout`.

You can optionally pass the `-y` flag to transform the output into YAML.

```sh
$ jhall config.js > config.json
# or
$ jhall -y config.js > config.yaml
```

## Examples

### DRY static config

```js
const homeDir = userName => `/home/${username.toLowerCase()}`;
const users = ['Mark', 'Jet', 'Dave', 'Shay'];

module.exports = {
  users: users.map(u => ({homeDir: homeDir(u), name: u})),
};
```

### Checking program arguments

```js
module.exports = args => ({
  inYaml: args.yaml, // true/false
  flagB: args.b, // true/false
  optionX: args.x, // 'someValue'/undefined
  positionalArguments: args._, // ['arg1', 'arg2', 'arg3']
});
```

### Asynchronous results

```js
module.exports = async () => {
  const response = await fetchSomeData();

  return { remoteIp: response.data.requestIp };
};
```
