var numeral = require('numeral');

function roundNumber(number) {
  return numeral(number).format('0,0.00').replace('.00', '');
}

module.exports = roundNumber;
