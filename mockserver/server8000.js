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
app.use('/', express.static(path.join(__dirname, '../static8000')));


/********session 控制*********/
var session = require('express-session');
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))
/********session 控制*********/

/********登录 控制*********/
var loginFilter = require('./login');
// 登录控制
//app.use('*', loginFilter);
app.use('/login', function (req, res) {
    console.log('==================', req.url);
    var redirectUrl = url.format({
        protocol: req.protocol,
        host: req.host,
        port: req.port,
        //pathname: '/login',
        query: req.query
    });
    res.redirect(redirectUrl + (req.query.hash || ''));
});
/********登录 控制*********/

// 退出
var logout = require('./logout.js');
app.use('/logout', function (req, res, next) {
    console.log(`sessionID:${req.sessionID}`);
    req.session.destroy(function () {
        next();
    });
});
app.use('/logout', logout);

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
    config.entry.components = config.entry.components.concat(components).map(item => {
        console.log('path.join', path.join);
        return path.join(__dirname, '../test/src/directives/' + item);
    });
    console.log(config.entry.components);
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

// markdown 保存文件
app.use('/markdown/save', function (req, res) {
    var filename = path.join(__dirname, '../static8000/EP-FE-2017H1.md');
    fs.open(filename, 'r+', function(err, fd) {
        if (err) {
            return console.error(err);
        }
        fs.writeFile(filename, req.body.html, function (err, fd) {
            "use strict";
            if (err) {
                return console.error(err);
            }
            res.send({
                status: 1,
                message: 'save successed!',
                filename: 'EP-FE-2017H1.md'
            });
        });
    });
});

var getReponseFun = function (req, res) {
    console.log(req.path, req.params);
    path = __dirname + '/mockdata' + req.path.replace(/\//g, '.').replace('.', '/') + '.json';
    fs.readFile(path, function (error, data) {
        if (!error) {
            res.send(JSON.parse(data));
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
                    res.send(JSON.parse(data));
                }, function (error) {
                    res.send(JSON.stringify(error));
                });
            }
            else {
                console.log(error);
                res.send(JSON.stringify(error));
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

var server = app.listen(8000, function() {
    console.log('Listening on port %d', server.address().port);
});
