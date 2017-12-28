var roundNumber = require('./roundNumber');
var BigNumber = require('bignumber.js');
var Ether = new BigNumber(10e+17);

function toEther(amount) {
  var ret = new BigNumber(amount.toString());
  return ret.dividedBy(Ether);
}

function roundEther(amount) {
  return roundNumber(toEther(amount).toString()) + ' <small class="fnx">RCX</small>';
}

module.exports = roundEther;
