/**
 * Created by zhouchunjie on 16/8/10.
 */

var path = require('path');
var request = require('request');
var read = require('./read');
var config = require('../config');
var fs = require('fs');
var async = require('async');

var iconUrlList = [];

function sleep(n) {
    var start = new Date().getTime();
    while (true)  if (new Date().getTime() - start > n) break;
}

var downloadImg = function (uri, filename, callback) {
    if (uri === undefined || uri === 'undefined' || filename === 'undefined' || filename === undefined) {
        return;
    }
    // uri = uri.substring(7);
    request.head(uri, function (err, res, body) {
        // console.log('content-type:', res.headers['content-type']);  //这里返回图片的类型
        // console.log('content-length:', res.headers['content-length']);  //图片大小
        if (err) {
            console.log('err: ' + err);
            console.log("有一张图片请求失败啦..." + filename + '---' + uri);
            return;
        }
        // console.log('res: ' + res);
        request(uri).pipe(fs.createWriteStream(config.searching.icon_dir + filename)).on('error', function (e) {
            console.log(filename + ',problem with request: ' + e.message);
            return callback(err);
        }).on('close', function () {
            return callback(null, filename)
        });  //调用request的管道来下载到 文件夹下
        console.log('logic finish download ' + filename);
    });
};

async.series([
    function (done) {
        read.popularList(config.searching.url, function (err, topList) {
            if (err) {
                console.error(err);
                // console.log("有一张图片请求失败啦...");
                return;
            }

            topList.forEach(function (site) {
                if (site == undefined || site.icon_url === 'undefined' || site.icon_url === undefined) {
                    console.log(site.name + '的图片路径为空.' + site.icon_url + '-' + site.code);
                    return;
                }
                var siteIconUrl = site.icon_url;
                var isExisted = false;
                iconUrlList.forEach(function (iconUrl) {
                    if (siteIconUrl === iconUrl) {
                        isExisted = true;
                    }
                });

                if (isExisted) {
                    console.log(site.name + '的路径已存在');
                    return;
                } else {
                    var fileName = path.basename(siteIconUrl);
                    var item = {
                        url: siteIconUrl,
                        file_name: fileName
                    };
                    iconUrlList.push(item);
                }

            });

            done();

        });
    },
    function (done) {
        read.entranceList(config.searching.url, function (err, siteList) {
            if (err) return console.log(err);

            siteList.forEach(function (site) {
                if (site == undefined || site.icon_url === 'undefined' || site.icon_url === undefined) {
                    console.log(site.name + '的图片路径为空.' + site.icon_url + '-' + site.code);
                    return;
                }
                var siteIconUrl = site.icon_url;
                var isExisted = false;
                iconUrlList.forEach(function (iconUrl) {
                    if (siteIconUrl === iconUrl) {
                        isExisted = true;
                    }
                });

                if (isExisted) {
                    console.log(site.name + '的路径已存在');
                    return;
                } else {
                    var fileName = path.basename(siteIconUrl);
                    var item = {
                        url: siteIconUrl,
                        file_name: fileName
                    };
                    iconUrlList.push(item);
                }
            });

            done();

        });
    },
    function (done) {

        //去重
        iconUrlList.sort();
        var re=[iconUrlList[0]];
        for(var i = 1; i < iconUrlList.length; i++)
        {
            if( iconUrlList[i].url !== re[re.length-1].url)
            {
                re.push(iconUrlList[i]);
            }
        }
        iconUrlList = re;

        console.log(iconUrlList.length);
        // console.log(iconUrlList);

        console.log('start download.');

        async.each(iconUrlList, function (icon, callback) {
            if (icon == undefined || icon.url === 'undefined' || icon.url === undefined || icon.file_name === undefined || icon.file_name === 'undefined') {
                console.log('错误数据,下载图片存在undefined');
                return callback();
            }
            //check file existed
            var flag = fs.existsSync(config.searching.icon_dir + icon.file_name);
            if (flag) {
                console.log(icon.file_name + 'is existed');
                return callback();
            }
            // console.log(icon.file_name + ' is not existed');
            console.log('downloading ' + icon.file_name);
            if (icon === undefined || icon.file_name === undefined || icon.file_name === 'undefined') {
                return callback();
            }
            // sleep(1000);
            downloadImg(icon.url, icon.file_name, function (err, fileName) {
                if (err) {
                    console.log(fileName + ".ERROR:" + err.message);
                    callback(err)
                }
                console.log(fileName + ' done');

            });
        }, function (err) {
            if (err) console.log(err);

            console.log("finish");
        });

        done();
    }
], function (err) {
    if (err) throw  err;

    console.log('完成')
});


/*var item = {
 url: 'http://77g2kh.com1.z0.glb.clouddn.com/ign.png',
 file_name: path.basename('http://77g2kh.com1.z0.glb.clouddn.com')
 };
 iconUrlList.push(item);

 console.log(iconUrlList);
 */
function parseUrlForFileName(address) {
    var filename = path.basename(address);
    return filename;
}

function writeFile(file) {
    // 测试用的中文
    var str = "\r\n我是一个人Hello myself!";
    // 把中文转换成字节数组
    console.log(arr);

    // appendFile，如果文件不存在，会自动创建新文件
    // 如果用writeFile，那么会删除旧文件，直接写新文件
    fs.appendFile(file, arr, function (err) {
        if (err)
            console.log("fail " + err);
        else
            console.log("写入文件ok");
    });
}



