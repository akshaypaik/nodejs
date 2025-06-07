console.log("Hello World");

const a = 1078698;
const b = 20986;

// This will be executed after 0 ms only when call stack of main thread is empty
setTimeout(() => {
    console.log("call me right now");
}, 0);

setTimeout(() => {
    console.log("call me after 3 seconds");
}, 3000);

const multiplyFn = (x, y) => {
    const result = a * b;
    return result;
}

const c = multiplyFn(a, b);
console.log("Multiplication result: ", c);
