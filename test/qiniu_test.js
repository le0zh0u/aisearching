/**
 * Created by zhouchunjie on 16/8/10.
 */
var qiniu = require('qiniu');
var config = require('../config');
qiniu.conf.ACCESS_KEY = config.qiniu.access_key;
qiniu.conf.SECRET_KEY = config.qiniu.secret_key;
//构建上传策略函数
function uptoken(bucket, key) {
    var putPolicy = new qiniu.rs.PutPolicy(bucket+":"+key);
    return putPolicy.token();
};

//上传到七牛后保存的文件名
key = '36kr.png';

//生成上传 Token
token = uptoken(config.qiniu.bucket, key);

//要上传文件的本地路径
filePath = config.searching.icon_dir + key;

//构造上传函数
function uploadFile(uptoken, key, localFile) {
    var extra = new qiniu.io.PutExtra();
    qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
        if(!err) {
            // 上传成功， 处理返回值
            console.log(ret);
            console.log(ret.hash, ret.key, ret.persistentId);
        } else {
            // 上传失败， 处理返回代码
            console.log(err);
        }
    });
}

//调用uploadFile上传
uploadFile(token, key, filePath);
