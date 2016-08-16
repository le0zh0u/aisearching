var express = require('express');
var webiste_dao = require('../models/website_info_dao');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    webiste_dao.findWebsiteFullInfo(function (err, data) {
        if (err) return next(err);

        res.locals.websiteList = data;
        res.locals.title = '网站列表';
        res.render('index');
    });
    // res.render('index', { title: 'Express' });
});

module.exports = router;
