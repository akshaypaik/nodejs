// In libuv there are 4 threads by default. - UV Thread Pool
// Thread Pool is only used for 
// 1. fs operations
// 2. dns.lookup
// 3. crypto
// 4. user specified input

// import fs from "fs";
import crypto from "crypto";

// const crypto = require("crypto");   // commonjs 

// [IMPORTANT]
// process.env.UV_THREADPOOL_SIZE = 8; // we can alter the UV Thread Pool size like this which overrides the defualt number of 4.

// one thread pool is assigned to this
crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", (err, key) => {
    console.log("1 - cryptoPBKDF2 done");
});

// one thread pool is assigned to this
crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", (err, key) => {
    console.log("2 - cryptoPBKDF2 done");
});

// one thread pool is assigned to this
crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", (err, key) => {
    console.log("3 - cryptoPBKDF2 done");
});

// one thread pool is assigned to this
crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", (err, key) => {
    console.log("4 - cryptoPBKDF2 done");
});

// this exceeds the maximum thread pool of 4. so this will be picked up when one of the above four is done.
crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", (err, key) => {
    console.log("5 - cryptoPBKDF2 done");
});

