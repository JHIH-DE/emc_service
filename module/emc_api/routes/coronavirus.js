var express = require('express');
var coronavirus = require('../models/coronavirus');
var coronaService = require('../services/coronaService');

var router = express.Router();

// 獲取 /coronavirus 請求
router.route('/')
  // 取得所有資源
  .get(function(req, res) {
    coronavirus.items(req, function(err, results, fields) {
      const startDate = "2020-01-31";
      const endDate = "2020-04-18";
      let startTime = new Date(startDate);
      let endTime = new Date(endDate);
      let processedData = {};

      while (startTime < endTime) {
        let date = coronaService.formatDate(startTime);
        let string = JSON.stringify(results);
        let data = JSON.parse(string);
        let returned = data.filter(el => coronaService.formatDate(el.create_time) === date);
        processedData[date] = returned;
        startTime.setDate(startTime.getDate() + 7);
      }

      if (err) {
        res.sendStatus(500);
        return console.error(err);
      }

      // 沒有找到指定的資源
      if (!results.length) {
        res.sendStatus(404);
        return;
      }
      res.json(processedData);
    });
  })


  // 新增一筆資源
  .post(function(req, res) {
    coronavirus.add(req, function(err, results, fields) {
      if (err) {
        res.sendStatus(500);
        return console.error(err);
      }

      // 新的資源已建立 (回應新增資源的 id)
      res.status(201).json(results.insertId);
    });
  });

// 獲取如 /coronavirus/1 請求
router.route('/:id')
  // 取得指定的一筆資源
  .get(function(req, res) {
    coronavirus.item(req, function(err, results, fields) {
      if (err) {
        res.sendStatus(500);
        return console.error(err);
      }

      if (!results.length) {
        res.sendStatus(404);
        return;
      }

      res.json(results);
    });
  })
  // 刪除指定的一筆資源
  .delete(function(req, res) {
    coronavirus.delete(req, function(err, results, fields) {
      if (err) {
        res.sendStatus(500);
        return console.error(err);
      }

      // 指定的資源已不存在
      // SQL DELETE 成功 results.affectedRows 會返回 1，反之 0
      if (!results.affectedRows) {
        res.sendStatus(410);
        return;
      }

      // 沒有內容 (成功)
      res.sendStatus(204);
    });
  })
  // 覆蓋指定的一筆資源
  .put(function(req, res) {
    coronavirus.put(req, function(err, results) {
      if (err) {
        res.sendStatus(500);
        return console.error(err);
      }

      if (results === 410) {
        res.sendStatus(410);
        return;
      }

      coronavirus.item(req, function(err, results, fields) {
        res.json(results);
      });
    });
  })
  // 更新指定的一筆資源 (部份更新)
  .patch(function(req, res) {
    coronavirus.patch(req, function(err, results, fields) {
      if (err) {
        res.sendStatus(500);
        return console.error(err);
      }

      if (!results.affectedRows) {
        res.sendStatus(410);
        return;
      }

      // response 被更新的資源欄位，但因 request 主體的欄位不包含 id，因此需自行加入
      req.body.id = req.params.id;
      res.json([req.body]);
    });
  });

router.route('/create')
  // 取得所有資源
  .get(function(req, res) {
    coronaService.create();


    res.send('All coronavirus data has been imported into the database.')
  });
module.exports = router;