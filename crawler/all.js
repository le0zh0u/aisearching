/**
 * Created by zhouchunjie on 16/8/10.
 */

var config = require('../config');
var db = require('../config').db;
var async = require('async');
var debug = require('debug')('ai-search:all');
var read = require('./read');
var save = require('./save');
var uploadUtils = require('../utils/qiniu_utils');
var path = require('path');
var openLink = require('./open_link');


var tagList = [];
var websiteList = [];

async.series([
    //获取标签列表
    function (done) {
        read.tagList(config.searching.url, function (err, list) {
            tagList = tagList.concat(list);
            done();
        });
    },

    //保存标签列表
    function (done) {
        save.saveTagList(tagList, done);
    },

    //获取常用网站列表
    function (done) {
        read.popularList(config.searching.url, function (err, list) {
            websiteList = websiteList.concat(list);
            done();
        });

    },

    //获取普通网站列表
    function (done) {
        read.entranceList(config.searching.url, function (err, list) {
            websiteList = websiteList.concat(list);
            done();
        });
    },

    //上传图片
    function (done) {
        async.each(websiteList, function (item, done) {
            var fileName = path.basename(item.icon_url);
            if (fileName === 'tthemeforestut.png' || fileName === 'googletrends.png' || fileName === 'aol.png') {
                return;
            }
            uploadUtils.uploadFile(config.searching.icon_dir, fileName, function (err, ret) {
                if (err) console.log(err);
                item.icon_url = config.qiniu.link_prefix + ret.key;
                done();
            });
        });

        done();
    },

    //修改home_url和search_url
    function (done) {
        async.each(websiteList, function (item, done) {
            var websiteUrl = openLink.getWebsiteUrl(item.code);
            if (websiteUrl === undefined) {
                console.log(item.code + " can't find open link.");
                return;
            }
            item.home_url = websiteUrl.home;
            item.search_url = websiteUrl.search;
        });

        done();
    },

    //保存网站
    function (done) {
        //TODO
        console.log(websiteList);
        console.log('tags-------');
        console.log(tagList);
        done();
    }

], function (err) {
    if (err) console.log(err);

    console.log('finish ');
});