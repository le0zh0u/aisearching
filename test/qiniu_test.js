/**
 * Created by zhouchunjie on 16/8/10.
 */
var qiniu = require('qiniu');
var config = require('../config');

//构建上传策略函数
function uptoken(bucket, key) {
    var putPolicy = new qiniu.rs.PutPolicy(bucket+":"+key);
    return putPolicy.token();
}