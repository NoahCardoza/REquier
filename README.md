# Reequier
A handy node module that helps manage large projects.

### Installation
`npm i reequire`

### Usage
1. Create a `local-package.json` in the root project directory.
2. Add local dependencies as so:
```json
  {
    "{name}": "{path}"
  }
```
Check out the [local-package.json](local-package.json) for an example.
3. Don't forget to add `require('reequire');` at the beginning of your entry point file.


### Example
* `/local-modules/my-module/index.js`:

```js
  module.exports = {
    answer: 42
  }
```
* `local-package.json`:

```json
  {
    "my-module": "local-modules/my-module"
  }
```
* `/index.js`:

```js
  require('reequire');
  const myModule = require('my-module');
  console.log(myModule.answer); // => 42
```

__Voilà!__
