// IMPLEMENTATION



// TEST
const assert = require('assert');

let fiveUSD = new Dollar(5);
let tenUSD = fiveUSD.times(2);
assert.strictEqual(tenUSD.amount, 10);



