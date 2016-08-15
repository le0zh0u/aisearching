/**
 * Created by zhouchunjie on 16/8/15.
 */

var async = require('async');
var db = require('../config').db;
var debug = require('debug')('as-search:tag:dao');


/**
 * 保存标签列表
 * @param list
 * @param callback
 */
exports.saveTagList = function (list, operator, callback) {
    debug('保存标签到数据库中: %d', list.length);

    async.eachSeries(list, function (tag, next) {

        //查询标签是否已经存在
        db.query('SELECT * FROM `tag_info` WHERE `code`=? LIMIT 1', [tag.code], function (err, data) {
            if (err) return next(err);

            if (Array.isArray(data) && data.length >= 1) {
                //标签已存在,更新
                db.query('UPDATE `tag_info` SET `name`=?, `description`=?, `updated_by`=?, `updated_at`=? WHERE `code`=?', [tag.name, tag.description, tag.code, operator, new Date()], next);
            } else {
                //标签不存在,添加
                db.query('INSERT INTO `tag_info`(`code`, `name`, `description`, `created_by`, `updated_by`) VALUES (?,?,?,?,?)', [tag.code, tag.name, tag.description, operator, operator], next);
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
};

/**
 * 获取所有标签列表
 * @param callback
 */
exports.findAllTagList = function (callback) {
    debug('获取所有标签列表');

    db.query('SELECT * FROM tag_info ORDER BY id', callback);
};

/**
 * 通过标签code获取标签
 * @param code
 * @param callback
 */
exports.selectTagByCode = function (code, callback) {
    debug('通过标签code获取标签,code: %s', code);
    db.query('SELECT * FROM tag_info WHERE code=?', [code], function (err, data) {
        if (err) return callback(err);

        return callback(null, data);
    })
}