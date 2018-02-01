module.exports = function (originalRequire, readdirSync) {
  const { join, parse } = require('path');

  const Module = require('module');
  // const originalRequire = Module.prototype.require//.bind(Module);

  Module.prototype.require = function (module) {
    const { dir, json } = package()
    if (json[module])
      return originalRequire.apply(this, [join(dir, json[module])]);
    else
      return originalRequire.apply(this, [module]);
  };

  const searchDir = (dir) =>
    readdirSync(dir)
    .filter(f => f == 'local-package.json')
    .map(f => join(dir, f))
    [0];

  const findPackage = () => {
    let dir = __dirname;
    let pack = undefined;
    while (dir != '/' && !(pack = searchDir(dir)))
      dir = parse(dir).dir
    if (!pack)
      throw new Error('No local-package.json file found.')
    return {
      dir: dir,
      json: originalRequire(pack)
    };
  }

  const package = (() => {
    let pack = undefined
    return () =>
      (pack
        ? pack
        : (pack = findPackage())
      )
  })()
};
