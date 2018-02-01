const assert = require('assert');
const { readdirSync } = require('fs');
const REquire = require('../REquire.js');
const originalRequire = require('module').prototype.require;

REquire(originalRequire, readdirSync);

describe('REquire', function() {
  describe("=> The Hitchhiker's Guide to the Galaxy", function() {
    it('It should return an object with question and answer keys.', function() {
      assert.deepEqual(require('thgttg'), {
        question: 'What is the answer to the Ultimate Question of Life, the Universe, and Everything?',
        answer: 42
      });
    });
  });
  describe("=> Lorem Ipsum", function() {
    it('It should return a function imported through the original require function.', function() {
      assert.equal(typeof(require('lorem-ipsum')), 'function');
    });
  });
  describe("=> Uninstalled dependency.", function() {
    it('It should throw an error.', function() {
      assert.throws(require.bind(null, 'nonexistent'), Error, "Error: Cannot find module 'nonexistent'");
    })
  })
  describe("=> Missing local-package.json", function() {
    before(() =>
      REquire(originalRequire, {
        readdirSync: () => []
      })
    );
    it('It should throw an -> Error: No local-package.json file found.', function() {
      assert.throws(require, Error, 'Error: No local-package.json file found.');
    });

  });
});
