// require("./path")
// All the code of module is wrapped inside a function(IIFE)

// Steps that happens when you do require("./path");
// Step 1. Resolving the module -> ./localpath or .json or node module (third party package)
// Step 2. Loading the module -> file is loaded according to file type
// Step 3. Compile - Wraps inside IIFE
// Step 4. Evaluation
// Step 4. Caching

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