const Module = require('module');
module.exports = require('./Reequire.js')(Module.prototype.require, require('fs'))
