/**
 * @file 基于express的UUAP sso 登录
 * @author zhaojun04
 */

var http = require('http');
var https = require('https');
var url = require('url');
var express = require('express');
var xml2js = require('xml2js');
var router = express.Router();
var uuapConfig = require('./uuap.config.js');
var querystring = require('querystring');


// 第一次用户请求url
var service;

/**
 * HTTP验证
 * @param req   当前请求request
 * @param res   当前请求response
 * @param ops   http.request参数
 * @param postData UUAP请求数据
 * @param callback  uuap验证请求回调
 */
function validateByHttp(req, res, next, ops, postData, callback) {
    // var vUrl = url.format(ops);
    var uurapReq = http.request(ops, function (uuapRes) {
        callback(req, res, next, uuapRes);
    });
    uurapReq.write(postData);
    uurapReq.end();
}

/**
 * HTTPS验证
 * @param req   当前请求request
 * @param res   当前请求response
 * @param ops   https.request参数
 * @param postData UUAP请求数据
 * @param callback  uuap验证请求回调
 */
function validateByHttps(req, res, next, ops, postData, callback) {
    // var vUrl = url.format(ops);
    var uurapReq = https.request(ops, function (uuapRes) {
        callback(req, res, next, uuapRes);
    });
    uurapReq.write(postData);
    uurapReq.end();
}

/**
 * 验证ticket回调
 * @param req   当前请求request
 * @param res   当前请求response
 * @param uuapRes   uuap验证请求response
 */
function validateTicket(req, res, next, uuapRes) {
    var responseText = '';
    uuapRes.on('error', function (e) {
        res.send(e.message);
    });
    uuapRes.on('data', function (chunk) {
        responseText += chunk;
    });
    uuapRes.on('end', function () {
        var parser = new xml2js.Parser();
        var statusCode = res.statusCode;
        var userName;
        if (statusCode === 200) {
            parser.parseString(responseText, function (error, data) {
                if (error) {
                    res.send(error.message);
                }
                else {
                    console.log('--------login info-------------');
                    console.log(data);
                    // 解析UUAP用户名
                    userName = data['cas:serviceResponse']['cas:authenticationSuccess'][0]['cas:user'][0];
                    var userInfo = data['cas:serviceResponse']['cas:authenticationSuccess'];
                    // 放入session
                    req.session.views.userName = userName;
                    // 重定向
                    var params = url.parse(req.originalUrl, true);
                    var query = params.query;
                    delete query.ticket;
                    var redirecturl = url.format({
                        pathname: params.pathname,
                        query: query
                    });
                    console.log('redirect: ' + redirecturl);
                    res.redirect(redirecturl || '/');
                }

            });
        }
        else {
            res.send('UUAP validate fail：' + statusCode);
        }

    });
}
// UUAP登录认证 三步骤
// 1. URL访问如果未登录       跳转到UUAP登录界面   eg: http://127.0.0.1/test ->  http://uuad.baidu.com/login
// 2. UUAP登录成功           跳转到带ticket的URL访问页  eg: http://uuad.baidu.com/login ->  http://127.0.0.1/test?ticket=xxxxxx
// 3. 去UUAP验证ticket成功   跳转到URL  http://127.0.0.1/test?ticket=xxxxxx -> http://127.0.0.1/test
router.all('*', function (req, res, next) {
    var query = req.query;
    var views = req.session && req.session.views;
    var ticket = query.ticket;
    var urlOps;
    console.log('req.session', req.session);

    console.log('service: ' + decodeURIComponent(service));
    console.log('ticket:', query.ticket);
    // session 验证
    if (views && views.userName) {
        console.log('----------session longin--------------');
        next();
    }
    else if (ticket) {
        // ticket 验证
        !views && (req.session.views = {});
        var postData = querystring.stringify({
            ticket: ticket,
            service: service,
            appKey: uuapConfig.appKey
        });
        urlOps = {
            protocol: uuapConfig.protocol,
            hostname: uuapConfig.hostname,
            port: uuapConfig.port,
            path: uuapConfig.validateMethod,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(postData)
            }
        };
        console.log('----------ticket validate--------------');
        if (uuapConfig.protocol === 'http:') {
            validateByHttp(req, res, next, urlOps, postData, validateTicket);
        }
        else {
            validateByHttps(req, res, next, urlOps, postData, validateTicket);
        }
    }
    else {

        var pathname = url.parse(req.originalUrl).pathname;
        var host = req.headers.host;
        console.log('====', host, pathname, req.query);
        service = url.format({
            protocol: req.protocol,
            host: host,
            pathname: '/login',
            query: req.query
        });
        console.log('service', service);
        var redirecturl = url.format({
            protocol: uuapConfig.protocol,
            hostname: uuapConfig.hostname,
            port: uuapConfig.port,
            query: {
                service: service,
                appKey: uuapConfig.appKey
            }
        });

        console.log('-----------redirect uuap-------------------', redirecturl);
        //res.redirect(redirecturl);
        res.send({
            status: 2,
            msg: 'session 过期',
            result: {
                uuap: {
                    url: url.format({
                        protocol: uuapConfig.protocol,
                        hostname: uuapConfig.hostname,
                        port: uuapConfig.port,
                        //query: {
                        //    service: service,
                        //    appKey: uuapConfig.appKey
                        //}
                    }),
                    appKey: uuapConfig.appKey
                }
            }
        });
    }

});
module.exports = router;
