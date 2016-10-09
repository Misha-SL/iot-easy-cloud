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

router.get('/:id', function (req, res) {
    _tagRepository2.default.init('./tags');
    var collection = _tagRepository2.default.selectAll(collectionName);
    var categories = collection.map(function (item) {
        return item.date;
    });
    var temp = collection.map(function (item) {
        return item.tags.temp;
    });
    var humidity = collection.map(function (item) {
        return item.tags.humidity;
    });
    res.end(templ.replace('["Jan"]', JSON.stringify(categories)).replace('[7.0]', JSON.stringify(temp)).replace('[-0.2]', JSON.stringify(humidity)));
});

router.get('/', function (req, res) {
    res.end(templ);
});

var templ = '<script src="http://code.jquery.com/jquery-3.1.1.min.js"></script>\
<script src="https://code.highcharts.com/highcharts.js"></script>\
<script src="https://code.highcharts.com/modules/exporting.js"></script>\
<div id="container" style="min-width: 310px; height: 400px; margin: 0 auto"></div>\
<script>\
$(function () {\
    $("#container").highcharts({\
        title: {\
            text: "Monthly Average Temperature", x: -20\
        },\
        subtitle: {\
            text: "Source: WorldClimate.com", x: -20\
        },\
        xAxis: {\
            categories: ["Jan"]\
        },\
        yAxis: {\
            title: {\
                text: "Temperature (°C)"\
            },\
            plotLines: [{\
                value: 0,\
                width: 1,\
                color: "#808080"\
            }]\
        },\
        tooltip: { valueSuffix: "°C" },\
        legend: {\
            layout: "vertical",\
            align: "right",\
            verticalAlign: "middle",\
            borderWidth: 0\
        },\
        series: [{\
            name: "Temp",\
            data: [7.0]\
        }, {\
            name: "Humidity",\
            data: [-0.2]\
        }]\
    });\
});\
</script>';

exports.default = router;