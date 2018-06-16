var express = require('express');
var BigNumber = require('bignumber.js');
var router = express.Router();

var async = require('async');
var Web3 = require('web3');


router.get('/', function (req, res, next) {

  var config = req.app.get('config');
  var web3 = new Web3();
  web3.setProvider(config.provider);

  async.waterfall([
    function (callback) {
      web3.eth.getBlock("latest", false, function (err, result) {
        callback(err, result);
      });
    }, function (lastBlock, callback) {
      var blocks = [];

      var blockCount = 10;

      if (lastBlock.number - blockCount < 0) {
        blockCount = lastBlock.number + 1;
      }

      async.times(blockCount, function (n, next) {
        web3.eth.getBlock(lastBlock.number - n, true, function (err, block) {
          next(err, block);
        });
      }, function (err, blocks) {
        callback(err, blocks);
      });
    }, function (blocks, callback) {
      var mongodb = req.app.get('mongodb');

      mongodb.Transaction
        .find({})
        .lean(true)
        .sort('-blockNumber')
        .limit(5)
        .exec(function (err, txs) {
          txs.forEach(tx => {
            tx.value = new BigNumber(10e+17).times(tx.value);
          })
          callback(err, { blocks: blocks, txs: txs });
        });
    }
  ], function (err, ctx) {
    if (err) {
      return next(err);
    }

    res.render('index', ctx);
  });

});

module.exports = router;
