'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _analysis = require('./analysis');

var _analysis2 = _interopRequireDefault(_analysis);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _express2.default.Router();

router.use('/analysis', _analysis2.default);

exports.default = router;