/**
 * Created by zhouchunjie on 16/8/10.
 */

var config = require('../config');
var db = require('../config').db;
var async =require('async');
var debug = require('debug')('ai-search:all');
var read = require('./read');


var tagList = [];
var websiteList = [];

async.series([
    //获取标签列表
    function (done) {
        read.tagList(config.searching.url, function (err, list) {
            tagList = list;
            done();
        });
    },

    //保存标签列白
    function (done) {

    }
])