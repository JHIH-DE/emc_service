const bodyparser = require('body-parser'); // 解析 HTTP 請求主體的中介軟體
const express = require('express');
const cors = require('cors');

const conf = require('./conf');
const functions = require('./functions');
const accounts = require('./routes/accounts');
const infected_main = require('./routes/infected_main');
const countries = require('./routes/countries');


const debug = require('debug')('my-application'); // debug模块
var app = express();
app.use(cors());
app.set('port', process.env.PORT || conf.port);

// 使用 bodyparser.json() 將 HTTP 請求方法 POST、DELETE、PUT 和 PATCH，放在 HTTP 主體 (body) 發送的參數存放在 req.body
app.use(bodyparser.urlencoded({
  extended: false
}));
app.use(bodyparser.json());

//app.use(functions.passwdCrypto); //密碼加密
app.use('/rest/v1/accounts', accounts);
app.use('/rest/v1/infected_main', infected_main);
app.use('/rest/v1/countries', countries);

const server = app.listen(conf.port, function() {
  console.log('app listening on port ' + conf.port + '!');
  debug('Express server listening on port ' + server.address().port);
});

module.exports = app;