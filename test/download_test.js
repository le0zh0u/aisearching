/**
 * Created by zhouchunjie on 16/8/10.
 */

var fs = require('fs');
var readline = require('readline');
var config = require('../config');

var fReadName = '/Users/zhouchunjie/Projects/Le0zh0u/aisearching/crawler/existed.txt';
var fRead = fs.createReadStream(fReadName);

fRead.on('end', function () {
    console.log('end');
});

var objReadline = readline.createInterface({
    input: fRead,
    terminal: true
});


var index = 1;
var map = {};
objReadline.on('line', function (line) {
    // console.log(index, line);
    map[line] = line;
    index++;
    var flag = fs.existsSync(config.searching.icon_dir + line);
    if (flag) {
        // console.log(line + 'is existed');
    } else {
        console.log(line + 'is not existed');
    }
});


objReadline.on('close', function () {
    console.log(
        Object.getOwnPropertyNames(map).length);
    console.log('readline close...');
})
;

/*function readLines(input, func) {
 var remaining = '';
 input.on('data', function(data) {
 remaining += data;
 var index = remaining.indexOf('\n');
 while (index > -1) {
 var line = remaining.substring(0, index);
 remaining = remaining.substring(index + 1);
 func(line);
 index = remaining.indexOf('\n');
 }

 });

 input.on('end', function() {
 if (remaining.length > 0) {
 func(remaining);
 }
 });
 }

 function func(data) {
 container.push(data);
 }

 var input = fs.createReadStream('/Users/zhouchunjie/Projects/Le0zh0u/aisearching/crawler/ip_arr.txt');
 readLines(input, func);*/


