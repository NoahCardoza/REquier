module.exports = function (dirname, originalRequire, readdirSync) {
  const { join, parse } = require('path');

  const Module = require('module');

  Module.prototype.require = function (module) {
    const { dir, json } = getPackage()
    if (json[module])
      return originalRequire.apply(this, [join(dir, json[module])]);
    else
      return originalRequire.apply(this, [module]);
  };
  Module.prototype.require.reequire = true;

  const searchDir = (dir) =>
    readdirSync(dir)
    .filter(f => f == 'local-package.json')
    .map(f => join(dir, f))
    [0];

  const findPackage = () => {
    let dir = dirname || __dirname;
    let packageFile = undefined;
    while (dir != '/' && !(packageFile = searchDir(dir)))
      dir = parse(dir).dir
    if (!packageFile)
      throw new Error('No local-package.json file found.')
    return {
      dir: dir,
      json: originalRequire(packageFile)
    };
  }

  const getPackage = (() => {
    let data = undefined
    return () =>
      (data
        ? data
        : (data = findPackage())
      )
  })()
};
