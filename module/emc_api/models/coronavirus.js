var mysql = require('mysql');
var conf = require('../conf');
var query = require('../mysqlpool');

var pool = mysql.createPool(conf.db);
var sql = '';

module.exports = {
  items: function(req, callback) {
    sql = 'SELECT * FROM coronavirus';
    return query(sql, callback);
  },
  item: function(req, callback) {
    sql = mysql.format('SELECT * FROM coronavirus WHERE id = ?', [req.params.id]);
    return query(sql, callback);
  },
  add: function(req, callback) {
    sql = mysql.format('INSERT INTO coronavirus SET ?', req.body);
    return query(sql, callback);
  },
  delete: function(req, callback) {
    sql = mysql.format('DELETE FROM coronavirus WHERE id = ?', [req.params.id]);
    return query(sql, callback);
  },
  put: function(req, callback) {
    // 使用 SQL 交易功能實現資料回滾，因為是先刪除資料在新增，且 Key 值須相同，如刪除後發現要新增的資料有誤，則使用 rollback() 回滾
    pool.getConnection(function(err, connection) {
      connection.beginTransaction(function(err) {
        if (err) throw err;

        sql = mysql.format('DELETE FROM coronavirus WHERE id = ?', [req.params.id]);

        connection.query(sql, function(err, results, fields) {
          // SQL DELETE 成功 results.affectedRows 會返回 1，反之 0
          if (results.affectedRows) {
            req.body.id = req.params.id;
            console.log(req.body);
            sql = mysql.format('INSERT INTO coronavirus SET ?', req.body);

            connection.query(sql, function(err, results, fields) {
              // 請求不正確
              if (err) {
                connection.rollback(function() {
                  callback(err, 400);
                });
              } else {
                connection.commit(function(err) {
                  if (err) callback(err, 400);

                  callback(err, 200);
                });
              }
            });
          } else {
            // 指定的資源已不存在
            callback(err, 410);
          }
        });
      });
      connection.release();
    });
  },
  patch: function(req, callback) {
    sql = mysql.format('UPDATE coronavirus SET ? WHERE id = ?', [req.body, req.params.id]);
    return query(sql, callback);
  },
  update: function(req, callback) {
    sql = mysql.format('UPDATE coronavirus SET ? WHERE id = ?', [req.body, req.params.id]);
    return query(sql, callback);
  }
};