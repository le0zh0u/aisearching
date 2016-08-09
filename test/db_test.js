/**
 * Test DB
 *
 * Created by zhouchunjie on 16/8/9.
 */

var db = require('../config').db;

//显示所有数据表
db.query('show tables', function (err, tables) {
    if (err) {
        console.error(err.stack);
    } else {
        console.log(tables);
    }

    db.end();
});