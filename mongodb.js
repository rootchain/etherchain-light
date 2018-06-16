/**
 * MongoDB connection
 */

var mongoose = require('mongoose');
var config = new (require('./config.js'))();

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Block = new Schema(
  {
    "number": { type: Number, index: { unique: true } },
    "hash": String,
    "parentHash": String,
    "nonce": String,
    "sha3Uncles": String,
    "logsBloom": String,
    "transactionsRoot": String,
    "stateRoot": String,
    "receiptRoot": String,
    "miner": String,
    "difficulty": String,
    "totalDifficulty": String,
    "size": Number,
    "extraData": String,
    "gasLimit": Number,
    "gasUsed": Number,
    "timestamp": Number,
    "blockTime": Number,
    "uncles": [String]
  });

var Transaction = new mongoose.Schema(
  {
    "hash": { type: String, index: { unique: true } },
    "nonce": Number,
    "blockHash": String,
    "blockNumber": Number,
    "transactionIndex": Number,
    "from": String,
    "to": String,
    "value": String,
    "gas": Number,
    "gasPrice": String,
    "timestamp": Number,
    "input": String
  }, { collection: "Transaction" });

// create indices
Transaction.index({ blockNumber: -1 });
Transaction.index({ from: 1, blockNumber: -1 });
Transaction.index({ to: 1, blockNumber: -1 });
Block.index({ miner: 1 });

mongoose.model('Block', Block);
mongoose.model('Transaction', Transaction);

module.exports.Block = mongoose.model('Block');
module.exports.Transaction = mongoose.model('Transaction');

mongoose.connect(process.env.MONGO_URI || config.mongodbUrl);
