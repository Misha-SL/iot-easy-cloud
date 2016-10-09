'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _tagRepository = require('../repositories/tagRepository');

var _tagRepository2 = _interopRequireDefault(_tagRepository);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _express2.default.Router();
var collectionName = "tagsCollection";

///tag/123/filter/{"date":{"value1":1475976410411, "value2":1475976531093}}
router.get('/tag/:id/filter/:filters', function (req, res) {
  var filters = JSON.parse(req.params.filters);
  var id = req.params.id;
  console.log("filters:", filters);
  _tagRepository2.default.init("./tags");
  var collection = _tagRepository2.default.selectAll(collectionName);
  collection = collection.filter(function (item) {
    return item.id == id;
  });
  var func = void 0;
  var getter = function getter(item, field) {
    return item[field];
  };

  var _loop = function _loop() {
    var filter = filters[filterName];

    //EQUIL
    if (filter.value) {
      func = function func(item) {
        return getter(item, filterName) == filter.value;
      };
      collection = collection.filter(func);
    }

    // LESS THEN
    if (filter.value1) {
      func = function func(item) {
        return filter.value1 <= getter(item, filterName);
      };
      collection = collection.filter(func);
    }

    // GRATHER THEN
    if (filter.value2) {
      func = function func(item) {
        return getter(item, filterName) <= filter.value2;
      };
      collection = collection.filter(func);
    }
  };

  for (var filterName in filters) {
    _loop();
  }
  console.log("collection:", collection);
  res.json(collection);
});

router.get('/tag/:id/:data', function (req, res) {
  var tags = JSON.parse(req.params.data);
  var data = {
    id: req.params.id,
    date: new Date().getTime(),
    tags: tags
  };
  console.log(data);
  _tagRepository2.default.init("./tags");
  _tagRepository2.default.insert(collectionName, data);
  _tagRepository2.default.save();
  var collection = _tagRepository2.default.selectAll(collectionName);
  console.log(collection.length);
  res.json(collection);
});

exports.default = router;