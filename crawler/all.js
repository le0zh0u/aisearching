/**
 * Created by zhouchunjie on 16/8/10.
 */

var config = require('../config');
var db = require('../config').db;
var async = require('async');
var debug = require('debug')('ai-search:all');
var read = require('./read');
var website_info_dao = require('../models/website_info_dao');
var tag_info_dao = require('../models/tag_info_dao');
var website_tag_relation_dao = require('../models/website_tag_relation_dao');
var uploadUtils = require('../utils/qiniu_utils');
var path = require('path');
var openLink = require('./open_link');

SAVED_BY_CRAWLER = 'crawler';

var tagList = [];
var websiteList = [];
var siteListObj;

async.series([
    //获取标签列表
    function (done) {
        read.tagList(config.searching.url, function (err, list) {
            tagList = tagList.concat(list);
            done();
        });
    },

    // //保存标签列表
    function (done) {
        tag_info_dao.saveTagList(tagList, SAVED_BY_CRAWLER, done);
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
    /*function (done) {
     async.each(websiteList, function (item, done) {
     var fileName = path.basename(item.icon_url);
     if (fileName === 'tthemeforestut.png' || fileName === 'googletrends.png' || fileName === 'aol.png') {
     return;
     }
     uploadUtils.uploadFile(config.searching.icon_dir + '/', fileName, function (err, ret) {
     if (err) console.log(err);
     item.icon_url = config.qiniu.link_prefix + ret.key;
     done();
     });
     });

     done();
     },*/

    //修改home_url和search_url
    /*function (done) {
        async.each(websiteList, function (item, done) {
            var websiteUrl = openLink.getWebsiteUrl(item.code);
            if (websiteUrl === undefined) {
                console.log(item.code + " can't find open link.");
                return;
            }
            item.home_url = websiteUrl["home"];
            item.search_url = websiteUrl["search"];
        });

        done();
    },*/

    //重新构建website
    function (done) {
        siteListObj = new Object();
        websiteList.forEach(function (website) {
            var site = siteListObj[website.code];
            if (site === undefined) {
                site = website;
                site.tags = [website.tag_name]
            } else {
                site.tags.push(website.tag_name);
            }
            siteListObj[website.code] = site;
        });

        done();
    },

    //保存网站
    function (done) {
        async.eachSeries(websiteList, function (website, next) {
            //修改图片地址
            var fileName = path.basename(website.icon_url);
            website.icon_url = config.qiniu.link_prefix + fileName;
            //添加homeUrl 和 searchUrl
            var link = openLink.getWebsiteUrl(website.code);
            if (link === undefined) {
                console.log('openLink不存在,Code为%s', website.code);
            } else {
                website.search_url = link["search"];
                website.home_url = link["home"];
            }
            website_info_dao.saveWebsiteItem(website, SAVED_BY_CRAWLER, next);
        }, done);
    },

    //关联网站标签映射
    function (done) {
        async.eachSeries(websiteList, function (website, next) {
            var tagName = website.tag_name;
            tag_info_dao.selectTagByName(tagName, function (err, data) {
                if (err) return next(err);

                if (data) {
                    website_tag_relation_dao.saveWebSiteTagRelationItem(website.code, data[0].code, website.rank, next);
                } else {
                    console.log('未找到tag,tagName:%s', website.tag_name);
                }
            });
        }, done);

    }

], function (err) {
    if (err) console.log(err);

    console.log('finish ');
});
