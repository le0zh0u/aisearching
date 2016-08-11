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
    url: 'http://lackar.com/aa/',
    icon_dir: '/Users/zhouchunjie/Projects/Le0zh0u/aisearching/crawler/icons/'
}

exports.qiniu = {
    access_key: 'YlaNsJnMXjKHS7-vb_-5d9lTUxZ6Vsg_lYwyamXG',
    secret_key: 'Lx3SFALL_1E2TqOiGM7DqTdkwwjWrRvMA03iqUXI',
    bucket: 'ai-search',
    link_prefix: 'http://obogm84eu.bkt.clouddn.com/'
}