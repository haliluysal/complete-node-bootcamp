console.log(arguments);

const Calc = require("./test-module-1");
// module.exports
const calc1 = new Calc();
console.log(calc1.add(5, 2));

// exports
// const calc2 = require("./test-module-2");
const { add, divide } = require("./test-module-2");

console.log(add(4, 3));
console.log(divide(4, 3));

// caching
require("./test-module-3")();
require("./test-module-3")();
require("./test-module-3")();
