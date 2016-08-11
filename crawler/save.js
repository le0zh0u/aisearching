/**
 * Created by zhouchunjie on 16/8/10.
 */

var async = require('async');
var db = require('../config').db;
var debug = require('debug')('as-search:save');

SAVED_BY = 'crawler';

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
