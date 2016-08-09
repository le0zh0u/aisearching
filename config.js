/**
 * Created by zhouchunjie on 16/8/9.
 */

var mysql = require('mysql');
exports.db = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    database: 'ai_searching',
    user: 'root',
    password: '123456'
});

exports.searching = {
    url:'http://lackar.com/aa/'
}