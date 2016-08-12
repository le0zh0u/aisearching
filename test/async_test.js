/**
 * Created by zhouchunjie on 16/8/12.
 */
var async = require('async');

console.time('waterfall');
async.waterfall([
    function (done) {

        done(null, 'one');
    },
    function (onearg, done) {

        done(null, onearg + '| two');
    },
    function (twoarg, done) {

        done(null, twoarg + '| three');
    },
    function (threearg, done) {

        done(null, threearg + '| four');
    }
], function (error, result) {
    console.log(result);
    console.timeEnd('waterfall');
})
