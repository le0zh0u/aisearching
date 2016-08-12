/**
 * Created by zhouchunjie on 16/8/9.
 */

var mysql = require('mysql');
var path = require('path')
exports.db = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    database: 'ai_searching',
    user: 'root',
    password: '123456'
});

exports.sqls = {
    tables:{
        SEARCH_URL_INFO: ' `search_url_info` ',
        TAG_INFO: ' `tag_info` ',
        URL_TAG_RELATION: ' `url_tag_relation` '
    },
    method:{
        UPDATE:'UPDATE ',
        INSERT:'INSERT INTO ',
        DELETE: 'DELETE FROM ',
        SELECT: 'SELECT ',
        SELECT_ALL:'SELECT * FROM ',
    }
}

exports.searching = {
    url: 'http://lackar.com/aa/',
    icon_dir: path.resolve(__dirname, './crawler/icons/')
}

exports.qiniu = {
    access_key: 'YlaNsJnMXjKHS7-vb_-5d9lTUxZ6Vsg_lYwyamXG',
    secret_key: 'Lx3SFALL_1E2TqOiGM7DqTdkwwjWrRvMA03iqUXI',
    bucket: 'ai-search',
    link_prefix: 'http://obogm84eu.bkt.clouddn.com/'
}
