// Modules are protected by default. Modules protects their variables and functions from leaking.
// const importantCode = require("./imp"); // one module into another
// const { calculateSum } = require("./sum");
// const sumModule = require("./sum"); 

import { calculateSum, printModuleName } from "./sum.js";

let name = "Namaste Akshay Pai";

let a = 10;
let b = 20;
console.log(name);
console.log(a);
console.log(b);
console.log(a+b);


// console.log(global);

console.log(this);  // {}

// globalThis is a global object everywhere JS runs like browsers, servers and all.
// console.log(globalThis);

// sumModule.calculateSum(a,b);

// sumModule.printModuleName();

calculateSum(a,b);
printModuleName();


