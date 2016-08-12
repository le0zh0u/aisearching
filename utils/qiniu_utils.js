/**
 * Created by zhouchunjie on 16/8/12.
 */

var qiniu = require('qiniu');
var config = require('../config');

qiniu.conf.ACCESS_KEY = config.qiniu.access_key;
qiniu.conf.SECRET_KEY = config.qiniu.secret_key;

//构建上传策略函数
function uptoken(bucket, key) {
    var putPolicy = new qiniu.rs.PutPolicy(bucket + ":" + key);
    return putPolicy.token();
};

exports.uploadFile = function (path, fileName, callback) {
    var token = uptoken(config.qiniu.bucket, fileName);
    var filePath = path + fileName;
    var extra = new qiniu.io.PutExtra();

    qiniu.io.putFile(token, fileName, filePath, extra, function (err, ret) {
        if (!err) {
            // 上传成功， 处理返回值   ret.hash, ret.key
            callback(null, ret);
        } else {
            console.log(err);
            // 上传失败， 处理返回代码
            callback(err);
        }
    });
};
