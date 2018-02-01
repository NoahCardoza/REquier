const Module = require('module');
module.exports = require('./REquire.js')(Module.prototype.require, require('fs'))
