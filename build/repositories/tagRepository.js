"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  init: function init(name) {
    this.filename = name + ".json";
    var content = "";
    if (_fs2.default.existsSync(this.filename)) content = _fs2.default.readFileSync(this.filename);else content = "{}";
    this.data = JSON.parse(content) || {};
  },

  insert: function insert(collectionName, tag) {
    if (!this.data[collectionName]) {
      this.data[collectionName] = [];
    }
    this.data[collectionName].push(tag);
  },

  selectAll: function selectAll(collectionName) {
    return this.data[collectionName];
  },

  save: function save() {
    console.log(this.data);
    var content = JSON.stringify(this.data);
    console.log(content);
    _fs2.default.writeFileSync(this.filename, content);
  }
};