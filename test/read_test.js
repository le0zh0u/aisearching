/**
 * Created by zhouchunjie on 16/8/10.
 */

var read = require('../crawler/read');

read.tagList('http://lackar.com/aa/',function (err, tagList) {
    console.log(tagList);
});