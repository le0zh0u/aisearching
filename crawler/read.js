/**
 * Created by zhouchunjie on 16/8/9.
 */

var request = require('request');
var cheerio = require('cheerio');
var debug = require('debug')('ai-searching:read');

exports.tagList = function (url, callback) {
    debug('读取搜索路径标枪');

    request(url, function (err, res) {
        if (err) return callback(err);

        var $ = cheerio.load(res.body.toString());

        var tagList = [];
        $('p.catalogname').each(function () {
            var $me = $(this);
            var value = $me.text().trim();
            var code;
            var name = value;
            var description = name;
            switch (value) {
                case '常用':
                    code = 'popular';
                    break;
                case '知识':
                    code = 'knowledge';
                    break;
                case '设计艺术':
                    code = 'design';
                    break;
                case 'APP':
                    code = 'application';
                    break;
                case '编程':
                    code = 'program';
                    break;
                case '购物':
                    code = 'shopping';
                    break;
                case '图片':
                    code = 'picture';
                    break;
                case '社交网络':
                    code = 'sns';
                    break;
                case '书籍':
                    code = 'book';
                    break;
                case '音乐':
                    code = 'music';
                    break;
                case '视频':
                    code = 'video';
                    break;
                case '电影':
                    code = 'movie';
                    break;
                case '新闻':
                    code = 'news';
                    break;
                case '旅行':
                    code = 'travel';
                    break;
                case '传统搜索':
                    code = 'tradition-search';
                    break;
                case '科技数码':
                    code = 'tech';
                    break;
                case '游戏':
                    code = 'game';
                    break;
                case '杂':
                    code = 'others';
                    break;
                case '推荐网站':
                    code = 'website';
                    break;
                default:
                    debug('检测到未定义的标签:%s', value);
                    code = 'unknown';
                    break;
            }

            var tag_item = {
                code: code,
                name: name,
                description: description
            };

            tagList.push(tag_item);
        });

        callback(null, tagList);
    });
};


//判断当前字符串是否以str结束
if (typeof String.prototype.endsWith != 'function') {
    String.prototype.endsWith = function (str) {
        return this.slice(-str.length) == str;
    };
}

exports.entranceList = function (url, callback) {
    debug('读取网站入口模块');

    request(url, function (err, res) {
        if (err) return callback(err);

        //根据网页内容创建DOM操作对象
        var $ = cheerio.load(res.body.toString());

        //读取入口列表部分
        var websiteList = [];
        $('.entrances .catalog').each(function () {
            var $catalog = $(this);
            var $catalog_name = $catalog.find('p.catalogname');
            var tag_name = $catalog_name.text().trim();

            //top
            var $top = $catalog.find('div.top');
            var $top_img = $top.find('img.topicon');
            var $top_name = $top.find('p.topname');
            var top_item = {
                code: $top_img.attr('id'),
                icon_url: $top_img.attr('src'),
                name: $top_name.text().trim(),
                name_en: $top_img.attr('id'),
                rank: 100,
                tag_name: tag_name
            };

            websiteList.push(top_item);

            //sub
            var default_rank = 50;
            var count = 0;
            $catalog.find('div.sub').each(function () {
                var $sub = $(this);
                var $sub_img = $sub.find('img.subicon');
                var $sub_name = $sub.find('p.subname');
                var subName = $sub_name.text().trim();

                if (subName ==='') {
                    $sub_name = $sub.find('p.subname2');
                    subName = $sub_name.text().trim();
                }
                var src = $sub_img.attr('data-original');
                if (src === undefined) {
                    src = $sub_img.attr('src');
                }
                src = String(src);
                if (!src.endsWith('png') && !src.endsWith('jpg')) {
                    console.log($sub_name.text().trim() + '图片不是以png结尾.' + $sub_img.attr('id') + '-' + src);
                    return;
                }
                var rank = (default_rank - count);
                if (rank < 0 ){
                    rank = 0;
                }
                var sub_item = {
                    code: $sub_img.attr('id'),
                    icon_url: src,
                    name: subName,
                    name_en: $sub_img.attr('id'),
                    rank: rank,
                    tag_name: tag_name
                };
                websiteList.push(sub_item);
                count++;
            });

        });

        callback(null, websiteList);
    })
};

//获取常见部分网站列表
exports.popularList = function (url, callback) {
    debug('开始获取常用网站');

    request(url, function (err, res) {
        if (err) callback(err);

        var $ = cheerio.load(res.body.toString());
        var topItemList = [];
        var $popular = $('div.popular');

        var $popular_name = $popular.find('p.catalogname');

        var default_rank = 50;
        var count = 0;

        $popular.find('div.top').each(function () {
            var $me = $(this);
            var $img = $me.find('img.pop');
            var src = $img.attr('src');
            src = String(src);
            if (!src.endsWith('png') && !src.endsWith('jpg')) {
                console.log($img.attr('id') + '图片不是以png结尾.' + $img.attr('id') + '-' + src);
                return;
            }
            var rank = (default_rank - count);
            if (rank < 0 ){
                rank = 0;
            }
            var item = {
                code: $img.attr('id'),
                name_en: $img.attr('id'),
                icon_url: src,
                rank: rank,
                tag_name: $popular_name.text().trim()
            };
            topItemList.push(item);
            count++;
        });
        return callback(null, topItemList);
    });
};