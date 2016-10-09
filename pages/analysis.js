import express from 'express';
import tagRepository from '../repositories/tagRepository';
const router = new express.Router();
const collectionName = "tagsCollection";

router.get('/:id', (req, res) => {
  tagRepository.init('./tags');
  const collection = tagRepository.selectAll(collectionName);
  const categories =collection.map(item => item.date);
  const temp = collection.map(item => item.tags.temp);
  const humidity = collection.map(item => item.tags.humidity);
  res.end(templ
    .replace('["Jan"]',  JSON.stringify(categories))
    .replace('[7.0]',  JSON.stringify(temp))
    .replace('[-0.2]',  JSON.stringify(humidity))
  );
});

router.get('/', (req, res) => {
  res.end(templ);
});

const templ = '<script src="http://code.jquery.com/jquery-3.1.1.min.js"></script>\
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

export default router;