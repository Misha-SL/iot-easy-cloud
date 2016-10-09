'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _index = require('./api/index');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('./pages/index');

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

//app.use((req, res) => {
//res.end("Hello world");
//});

app.use("/api", _index2.default);
app.use("/", _index4.default);

app.listen(8080, function () {
  console.log("http://localhost:8080/");
});