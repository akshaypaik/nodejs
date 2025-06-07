// Syncronous code - V8 engine handles this very quickly and smoothly
console.log("Hello World");

const a = 1078698;
const b = 20986;

const multiplyFn = (x, y) => {
    const result = a * b;
    return result;
}

const c = multiplyFn(a, b);
console.log("Multiplication result: ", c);
