/**
 * Created by zhouchunjie on 16/8/15.
 */

var async = require('async');
var db = require('../config').db;
var debug = require('debug')('as-search:website:dao');

SAVED_BY_CRAWLER = 'crawler';

/**
 * 保存网站地址列表
 * @param list
 * @param callback
 */
exports.saveWebsiteList = function (list, operator, callback) {
    debug('保存网站到数据库中: %d', list.length);

    async.eachSeries(list, function (website, next) {
        //查询网站是否已经存在
        db.query('SELECT * FROM `website_info` WHERE `code`=? LIMIT 1', [website.code], function (err, data) {
            if (err) return next(err);

            if (Array.isArray(data) && data.length >= 1) {
                //网站已存在,更新
                db.query('UPDATE `website_info` SET name=?, name_en=?, icon_url=?, updated_by=?, updated_at=? where code =?', [website.name, website.name_en, website.icon_url, operator, new Date()], next);
            } else {
                //不存在,添加
                db.query('INSERT INTO website_info(code, name, name_en, icon_url, created_by, updated_by) VALUES(?,?,?,?,?,?)', [website.code, website.name, website.name_en, website.icon_url, operator, operator], next);
            }
        });
    }, callback);
};

exports.saveWebsiteItem = function (website, operator, callback) {
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
            db.query('UPDATE `website_info` SET name=?, name_en=?, icon_url=?, home_url=?, search_url=?, updated_by=?, updated_at=? where code =?', [website.name, website.name_en, website.icon_url, website.home_url, website.search_url, operator, new Date(), website.code], callback);
        } else {
            //不存在,添加
            db.query('INSERT INTO website_info(code, name, name_en, icon_url, home_url, search_url, created_by, updated_by) VALUES(?,?,?,?,?,?)', [website.code, website.name, website.name_en, website.icon_url, website.home_url, website.search_url, operator, operator], callback);
        }
    });
};

/**
 * 获取网站全部信息,关联tag
 * @param callback
 */
exports.findWebsiteFullInfo = function (callback) {
    var sql = 'SELECT wi.name as name, wi.icon_url as icon_url, wi.home_url as home_url, wi.search_url as search_url, wi.code as website_code, wi.name_en as name_en, ti.name as tag_name, ti.code as tag_code, wtr.rank as rank FROM website_info wi LEFT JOIN website_tag_relation wtr ON wi.code = wtr.website_code LEFT JOIN tag_info ti ON wtr.tag_code = ti.code ORDER BY ti.id ASC, wtr.rank DESC';

    db.query(sql, callback);
};

