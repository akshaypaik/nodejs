// Asyncronous code - V8 engine takes help of libuv to handle api calls, settimeout and reading files
// V8 engine offloads async non blocking I/O operations to libuv

import fs from "fs";
import https from "https";

console.log("Hello World");

const a = 1078698;
const b = 20986;

https.get('https://dummyjson.com/products', (response) => {
    console.log("fetched data successfully");
});

setTimeout(() => {
    console.log("setTimeout called after 3 seconds");
}, 3000);

// fs.readFileSync("./file.txt", "utf8");

fs.readFile("./file.txt", "utf8", (err, data) => {
    console.log("file data: ", data);
});

const multiplyFn = (x, y) => {
    const result = a * b;
    return result;
}

const c = multiplyFn(a, b);
console.log("Multiplication result: ", c);
