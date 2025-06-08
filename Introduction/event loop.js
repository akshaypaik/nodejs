import fs from "fs";
// const fs = require("fs");

console.log("start");

setImmediate(() => console.log("setImmediate"));

process.nextTick(() => {
    process.nextTick(() => console.log("nextTick two"));
    console.log("nexTick one");
});

// [IMPORTANT]
// In esm module promise is priority over nextTick.
// In commonjs module nextTick is priority over promise
const promise = new Promise(resolve => resolve("promise"));

setTimeout(() => console.log("timer one"), 0);

fs.readFile("./file.txt", "utf8", () => {
    console.log("file read");
});

promise.then(res => console.log(res));

console.log("end");
