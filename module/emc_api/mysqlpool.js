var mysql = require("mysql");
var conf = require('./conf');

var pool = mysql.createPool(conf.db);

var query = function(sql, options, callback) {

  pool.getConnection(function(err, conn) {
    if (err) {
      callback(err, null, null);
    } else {
      conn.query(sql, options, function(err, results, fields) {
        //事件驱动回调
        callback(err, results, fields);
      });
      //释放连接，需要注意的是连接释放需要在此处释放，而不是在查询回调里面释放
      conn.release();
    }
  });
};

module.exports = query;