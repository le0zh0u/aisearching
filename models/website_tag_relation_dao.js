/**
 * Created by zhouchunjie on 16/8/15.
 */

var async = require('async');
var db = require('../config').db;
var debug = require('debug')('as-search:relation:dao');

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