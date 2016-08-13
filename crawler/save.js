/**
 * Created by zhouchunjie on 16/8/10.
 */

var async = require('async');
var db = require('../config').db;
var debug = require('debug')('as-search:save');

SAVED_BY = 'crawler';

/**
 * 保存标签列表
 * @param list
 * @param callback
 */
exports.saveTagList = function (list, callback) {
    debug('保存标签到数据库中: %d', list.length);

    async.eachSeries(list, function (tag, next) {

        //查询标签是否已经存在
        db.query('SELECT * FROM `tag_info` WHERE `code`=? LIMIT 1', [tag.code], function (err, data) {
            if (err) return next(err);

            if (Array.isArray(data) && data.length >= 1) {
                //标签已存在,更新
                db.query('UPDATE `tag_info` SET `name`=?, `description`=?, `updated_by`=?, `updated_at`=? WHERE `code`=?', [tag.name, tag.description, tag.code, SAVED_BY, new Date()], next);
            } else {
                //标签不存在,添加
                db.query('INSERT INTO `tag_info`(`code`, `name`, `description`, `created_by`, `updated_by`) VALUES (?,?,?,?,?)', [tag.code, tag.name, tag.description, SAVED_BY, SAVED_BY], next);
            }
        });
    }, callback);
};

/**
 * 通过名字获取标签
 * @param tagName
 * @param callback
 */
exports.selectTagByName = function (tagName, callback) {
    debug('通过名字获取标签,tagName: %s', tagName);
    db.query('SELECT * FROM tag_info WHERE name=?', [tagName], function (err, data) {
        if (err) return callback(err);

        return callback(null, data);
    });
}

/**
 * 保存网站地址列表
 * @param list
 * @param callback
 */
exports.saveWebsiteList = function (list, callback) {
    debug('保存网站到数据库中: %d', list.length);

    async.eachSeries(list, function (website, next) {
        //查询网站是否已经存在
        db.query('SELECT * FROM `website_info` WHERE `code`=? LIMIT 1', [website.code], function (err, data) {
            if (err) return next(err);

            if (Array.isArray(data) && data.length >= 1) {
                //网站已存在,更新
                db.query('UPDATE `website_info` SET name=?, name_en=?, icon_url=?, updated_by=?, updated_at=? where code =?', [website.name, website.name_en, website.icon_url, SAVED_BY, new Date()], next);
            } else {
                //不存在,添加
                db.query('INSERT INTO website_info(code, name, name_en, icon_url, created_by, updated_by) VALUES(?,?,?,?,?,?)', [website.code, website.name, website.name_en, website.icon_url, SAVED_BY, SAVED_BY], next);
            }
        });
    }, callback);
};

exports.saveWebsiteItem = function (website, callback) {
    debug('保存单个网站到数据库中: %s', website.code);

    db.query('SELECT * FROM `website_info` WHERE `code`=? LIMIT 1', [website.code], function (err, data) {

        if (Array.isArray(data) && data.length >= 1) {
            //网站已存在,更新
            if (website.name === undefined || website.name === 'undefined' || website.name === '') {
                website.name = data.name;
            }
            if (website.name_en === undefined || website.name_en === 'undefined' || website.name_en === '') {
                website.name_en = data.name_en;
            }
            if (website.icon_url === undefined || website.icon_url === 'undefined' || website.icon_url === '') {
                website.icon_url = data.icon_url;
            }
            if (website.name === undefined || website.name === 'undefined' || website.name === '') {
                website.name = data.name;
            }
            db.query('UPDATE `website_info` SET name=?, name_en=?, icon_url=?, home_url=?, search_url=?, updated_by=?, updated_at=? where code =?', [website.name, website.name_en, website.icon_url, website.home_url, website.search_url, SAVED_BY, new Date(), website.code], callback);
        } else {
            //不存在,添加
            db.query('INSERT INTO website_info(code, name, name_en, icon_url, home_url, search_url, created_by, updated_by) VALUES(?,?,?,?,?,?)', [website.code, website.name, website.name_en, website.icon_url, website.home_url, website.search_url, SAVED_BY, SAVED_BY], callback);
        }
    });
};

/**
 * 保存网站和标签关联关系以及权重
 * @param websiteCode
 * @param tagCode
 * @param rank
 * @param callback
 */
exports.saveWebSiteTagRelationItem = function (websiteCode, tagCode, rank, callback) {
    debug('保存网站标签映射到数据库中, %s & %s & %d', websiteCode, tagCode, rank);

    db.query('SELECT * FROM website_tag_relation WHERE website_code=? AND tag_code=? LIMIT 1', [websiteCode, tagCode], function (err, data) {
        if (err) return next(err);

        if (Array.isArray(data) && data.length >= 1) {
            //关联已存在,更新rank
            db.query('UPDATE website_tag_relation SET rank=? WHERE website_code=? AND tag_code=?', [rank, websiteCode, tagCode], callback);
        } else {
            //关联不存在,添加
            db.query('INSERT INTO website_tag_relation(website_code, tag_code, rank) VALUES(?,?,?)', [websiteCode, tagCode, rank], callback);
        }
    });
};

