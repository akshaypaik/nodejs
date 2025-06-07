import crypto from "crypto";

console.log("Hello World");

const a = 1078698;
const b = 20986;

// blocking (never use sync methods as it blocks the main thread)
crypto.pbkdf2Sync("akshay", "salt", 5000000, 50, "sha512");
console.log("first key sync is generated");

// async by default
crypto.pbkdf2("akshay", "salt", 500000, 50, "sha512", (err, key) => {
    console.log("second key is generated");
});

setTimeout(() => {
    console.log("call me right now");
}, 0);

setTimeout(() => {
    console.log("call me after 1 second");
}, 1000);


const multiplyFn = (x, y) => {
    const result = a * b;
    return result;
}

const c = multiplyFn(a, b);
console.log("Multiplication result: ", c);
