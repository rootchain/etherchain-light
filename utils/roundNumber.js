var numeral = require('numeral');

function roundNumber(number) {
  const num = numeral(number.toString()).format('0,0.00000');
  const [a, b] = num.split('.');
  if (!b || /^0+$/.test(b)) {
    return a;
  }
  return `${a}.<small class="chng">${b}</small>`;
}

module.exports = roundNumber;
