/**
 * Test DB
 *
 * Created by zhouchunjie on 16/8/9.
 */

var db = require('../config').db;
var tag_info_dao = require('../models/tag_info_dao');

//显示所有数据表
/*db.query('show tables', function (err, tables) {
 if (err) {
 console.error(err.stack);
 } else {
 console.log(tables);
 }

 db.end();
 });*/

/*
 db.query('SELECT * FROM `tag_info` WHERE `code`=? LIMIT 1', ['popular'], function (err, data) {
 if (err) return next(err);

 if (Array.isArray(data) && data.length >= 1) {
 //标签已存在,更新
 console.log(data);
 } else {
 //标签不存在,添加
 console.log('no record');
 }
 });

 */
tag_info_dao.selectTagByName('常用', function (err, data) {
    if (err) {
        console.log(err);
        return;
    }

    console.log(data);

});