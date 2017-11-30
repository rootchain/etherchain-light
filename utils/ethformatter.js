var roundNumber = require('./roundNumber');
var BigNumber = require('bignumber.js');
var Ether = new BigNumber(10e+17);

function roundEther(amount) {
  var ret = new BigNumber(amount.toString());
  return roundNumber(ret.dividedBy(Ether)) + ' <small class="fnx">FNX</small>';
}

module.exports = roundEther;
