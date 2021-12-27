/*
    Require modules
*/
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const exphbs = require('express-handlebars');
const expressValidator = require('express-validator');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongo = require('mongodb');
var {mongoose} = require('./server/db/mongoose.js');  //连接数据库

/*
    视图引擎
*/
var app = express();
// app.use([path,] callback [, callback...]) -> 将中间件用于应用程序
app.use(express.static(__dirname + '/views'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(favicon(__dirname + '/public/favicon.ico'));
// app.engine('.extenionName', renderingEngine) -> 渲染文件
app.engine('handlebars', exphbs({defaultLayout: 'userlayout'}));
// app.set('view engine', 'engineToUse') -> 设置默认的视图引擎
app.set('view engine', 'handlebars');

app.get('/app/admin/adminindex', function(req, res) {
    res.render('admin/adminindex', {
        layout: "adminlayout",
    });
});
app.get('/app/admin/admindisease', function(req, res) {
    res.render('admin/admindisease', {
        layout: "adminlayout",
    });
});
app.get('/app/admin/adminrooms', function(req, res) {
    res.render('admin/adminrooms', {
        layout: "adminlayout",
    });
});
app.get('/app/admin/adminuser', function(req, res) {

    res.render('admin/adminuser', {
        layout: "adminlayout",
    });
});
/*
    Bodyparser Middleware + Express session
*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
// session -> 在用户登录网站后保持登录 
//         -> 创建一个对象。会话，您可以在其中添加属性 
//         -> (ex: req.session.page_views, to count how many times he entered on the page)
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

/*
    初始化Passport（身份验证）以保留持久登录数据（即在cookie中）
*/
app.use(passport.initialize());
app.use(passport.session());

/*
     验证程序，用于验证随re对象传入服务器的数据
*/
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));


/*
    闪存以在浏览器中弹出台面
*/
app.use(flash());
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

/*
    确保身份认证
*/


app.use('/app', (req, res, next) => {
    // check to be authentificated
    if (req.isAuthenticated()) { // if yes, continue

        return next();

    } else {                     // if no, login
        // req.flash('error_msg', 'You are not logged in');
        res.redirect('/');
    }
});

/*
    Website routes
*/

var login = require('./routes/login');
var users = require('./routes/users');
var appRoute = require('./routes/app');
var patients = require('./routes/patients');
var settings = require('./routes/settings');
var diseases = require('./routes/diseases');
var rooms = require('./routes/rooms');


app.use('/', login);
app.use('/', appRoute);
app.use('/', users);
app.use('/', patients);
app.use('/', settings);
app.use('/', diseases);
app.use('/', rooms);

var timestamp = new Date().getTime();

/*
    Fire the server online
*/
app.set('port', (process.env.PORT || 1337));
app.listen(app.get('port'), function() {
	console.log('Server started on port '+ app.get('port'));
});
