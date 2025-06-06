// require("./path")
// All the code of module is wrapped inside a function(IIFE)

(function(){
    // All code of module runs inside here
})();

console.log("Sum module executed");

export function calculateSum(a, b) {
    const sum = a + b;
    console.log("sum is: ", sum);
}

export function printModuleName() {
    console.log("[SUM MODULE]");
    return "[SUM MODULE]";
}

// CommonJS Modules (cjs)
// module.exports = { calculateSum, printModuleName };