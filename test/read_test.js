/**
 * Created by zhouchunjie on 16/8/10.
 */

var read = require('../crawler/read');

// read.tagList('http://lackar.com/aa/',function (err, tagList) {
//     console.log(tagList);
// });

// read.entranceList('http://lackar.com/aa/', function (err, websiteList) {
//     console.log(websiteList);
// });


// read.popularList('http://lackar.com/aa/', function (err, popList) {
//     if (err) console.log(err);
//     console.log(popList);
// });

var cheerio = require('cheerio')
var  $ = cheerio.load('<h2 class="title">Hello world</h2>')

$('h2.title').text('Hello there!')
var unkonwn = $('h2.title').

console.log(unkonwn.dir);
