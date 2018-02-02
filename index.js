const Module = require('module');

module.exports = (
  Module.prototype.require.reequire
  ? Module.prototype.require
  : require('./Reequire.js')(
    __dirname,
    Module.prototype.require,
    require('fs').readdirSync
  )
)
