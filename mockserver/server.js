var path = require('path');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var url = require('url');
var fs = require('fs');
var servicesUrl = require('./servicesUrl');


app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(cookieParser());

// 解决跨域问题，*代表所有的都不限制
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    // res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

// 静态资源文件直接输出
app.use('/', express.static(path.join(__dirname, '../build')));
app.use('/', express.static(path.join(__dirname, '../UIComponents')));
app.use('/', express.static(path.join(__dirname, '../')));


/********session 控制*********/
var session = require('express-session');
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))
/********session 控制*********/

/********登录 控制*********/
//var loginFilter = require('./login');
// 登录控制
//app.use('*', loginFilter);
//app.use('/login', function (req, res) {
//    console.log('==================', req.url);
//    var redirectUrl = url.format({
//        protocol: req.protocol,
//        host: req.host,
//        port: req.port,
//        //pathname: '/login',
//        query: req.query
//    });
//    res.redirect('http://127.0.0.1:8888/' + (req.query.hash || ''));
//});
/********登录 控制*********/

// 退出
//var logout = require('./logout.js');
//app.use('/logout', function (req, res, next) {
//    console.log(`sessionID:${req.sessionID}`);
//    req.session.destroy(function () {
//        next();
//    });
//});
//app.use('/logout', logout);

app.get('/user', function (req, res) {
   //console.log(req, res);
    //res.send(req.url);
    //res.send(req.url);
    console.log('/user:)');
    res.send(req.session);
});


// 简单测试接口helloworld
app.get('/helloworld', function(req, res){
    res.send(req.url);
});

// 动态打包接口
app.get('/webpack', function (req, res) {
    "use strict";

    let webpack = require('webpack');
    let config = require('./webpack.config');
    let components = (req.query.components || '').split(',');
    console.log('components:', components);
    config.entry.components = components.map(item => {
        return path.join(__dirname, '../UIComponents/src/directives/' + item);
    });
    console.log(config.entry.components);
    console.log('compress', req.query.compress, req.query.compress === 'true');
    if (req.query.compress === 'true') {
        config.plugins = [new webpack.optimize.UglifyJsPlugin()];
    }
    console.log(config.plugins.length);
    webpack(config, (...args) => {
        if (!args[0]) {
            let chunk = args[1].compilation.chunks[0];
            let file = config.output.path + '/' + chunk.files[0];

            res.setHeader('Content-disposition', 'attachment; filename=' + chunk.files[0]);
            res.setHeader('Content-type', 'application/javascript; charset=UTF-8');
            res.download(file); // Set disposition and send it.
            //res.send({
            //    components: req.query.components,
            //    files: chunk.files.map(file => {
            //        return '/mockserver/temp/' + file;
            //    })
            //});
        }
        else {
            res.send(args[0]);
        }

    });
});

var sendResponse = function (req, res, data) {
    var query = req.query;
    console.log('query', query);
    if (query && query.callback) {
        res.setHeader('Content-Type', 'text/javascript');
        res.send(query.callback + '(' + JSON.stringify(data) + ')');
    }
    else {
        res.send(JSON.stringify(data));
    }
};

var getReponseFun = function (req, res) {
    console.log('getReponseFun', req.query);
    path = __dirname + '/mockdata' + req.path.replace(/\//g, '.').replace('.', '/') + '.json';
    console.log(path);
    fs.readFile(path, function (error, data) {
        if (!error) {
            // res.send(JSON.parse(data));
            sendResponse(req, res, JSON.parse(data));
        } else {
            if (error.errno === -2) {
                console.log('can not find file');
                if (Object.keys(req.params).length) {
                    console.log(req.params);
                    for (var key in req.params) {
                        path = path.replace(new RegExp('.' + req.params[key]), '.1');
                    }
                }

                readFile(path, function (data) {
                    // res.send(JSON.parse(data));
                    sendResponse(req, res, JSON.parse(data));
                }, function (error) {
                    // res.send(JSON.stringify(error));
                    sendResponse(req, res, error);
                });
            }
            else {
                console.log(error);
                // res.send(JSON.stringify(error));
                sendResponse(req, res, error);
            }
        }
    });
};



var readFile = function (path, callback, errorCallback) {
    // console.log(path);
    fs.readFile(
        path,
        function (error, data) {
            if (!error) {
                callback && callback(data);
            }
            else {
                errorCallback && errorCallback(error);
            }
        }
    );
};

var formatUrl = function (url) {
    return url.replace(/{[^}]*}/gi, function (a) {
        return ':' + a.replace(/{(.*)}/i, '$1');
    });
};

// console.log(servicesUrl);
var traveralObj = function (obj, callback) {
    for (var key in obj) {
        if (typeof obj[key] === 'string') {
            app.get(obj[key], getReponseFun);
            callback && callback(obj[key]);
        }
        else {
            if (obj[key].url && obj[key].method) {
                // console.log(obj[key].method + ':' + obj[key].url);
                app[obj[key].method.toLowerCase()](formatUrl(obj[key].url), getReponseFun);
                callback && callback(obj[key]);
            }
            else {
                traveralObj(obj[key], callback);
            }
        }
    }
};

traveralObj(servicesUrl);
console.log(process.argv);
console.log(process.execArgv);
console.log(process.env);
var port = 3013;
// var port = process.env.PORT || 8888;
var server = app.listen(port, function() {
    console.log('Listening on port %d', server.address().port);
});
