/**
 * Created by zhouchunjie on 16/8/10.
 */
var qiniu = require('qiniu');
var config = require('../config');
var uploadUtils = require('../utils/qiniu_utils');

key = '36kr.png';
/*
qiniu.conf.ACCESS_KEY = config.qiniu.access_key;
qiniu.conf.SECRET_KEY = config.qiniu.secret_key;
//构建上传策略函数
function uptoken(bucket, key) {
    var putPolicy = new qiniu.rs.PutPolicy(bucket+":"+key);
    return putPolicy.token();
};

//上传到七牛后保存的文件名


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
*/


uploadUtils.uploadFile(config.searching.icon_dir , key, function (err, ret) {
    if (!err){
        console.log(ret);
    }else{
        console.log(err)
    }
})


/*//download
//构建私有空间的链接
url = config.qiniu.link_prefix +'36kr.png';
var policy = new qiniu.rs.GetPolicy();

//生成下载链接url
var downloadUrl = policy.makeRequest(url);

//打印下载的url
console.log(downloadUrl);*/

