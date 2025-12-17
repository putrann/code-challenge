/**
 * Comprehensive test suite for sumToN implementations
 */

const { sumToN, sum_to_n_iterative, sum_to_n_recursive } = require('./sum_to_n.js');

console.log('🧪 Running comprehensive tests...\n');

// Test cases with expected results
const testCases = [
    { input: 0, expected: 0, description: 'Edge case: zero' },
    { input: 1, expected: 1, description: 'Edge case: one' },
    { input: 5, expected: 15, description: 'Small number' },
    { input: 10, expected: 55, description: 'Medium number' },
    { input: 100, expected: 5050, description: 'Large number' },
    { input: 1000, expected: 500500, description: 'Very large number' },
];

let passedTests = 0;
let totalTests = 0;

console.log('📊 Testing correct results:\n');
console.log('═'.repeat(80));

testCases.forEach(({ input, expected, description }) => {
    totalTests += 3; // 3 implementations per test case
    
    const resultFormula = sumToN(input);
    const resultIterative = sum_to_n_iterative(input);
    const resultRecursive = sum_to_n_recursive(input);
    
    const allMatch = resultFormula === resultIterative && 
                     resultIterative === resultRecursive &&
                     resultRecursive === expected;
    
    const status = allMatch ? '✅ PASS' : '❌ FAIL';
    
    console.log(`\nTest: ${description} (n = ${input})`);
    console.log(`  Expected:         ${expected}`);
    console.log(`  Formula:          ${resultFormula} ${resultFormula === expected ? '✓' : '✗'}`);
    console.log(`  Iterative:        ${resultIterative} ${resultIterative === expected ? '✓' : '✗'}`);
    console.log(`  Recursive:        ${resultRecursive} ${resultRecursive === expected ? '✓' : '✗'}`);
    console.log(`  All match:        ${allMatch ? 'YES ✓' : 'NO ✗'}`);
    console.log(`  Status:           ${status}`);
    
    if (allMatch) passedTests += 3;
});

console.log('\n' + '═'.repeat(80));

// Test error handling
console.log('\n\n🛡️ Testing error handling:\n');
console.log('═'.repeat(80));

const errorCases = [
    { input: -5, description: 'Negative number' },
    { input: 3.14, description: 'Float number' },
    { input: 'abc', description: 'String input' },
    { input: null, description: 'Null input' },
    { input: undefined, description: 'Undefined input' },
];

errorCases.forEach(({ input, description }) => {
    console.log(`\nTest: ${description} (input = ${input})`);
    
    // Test each implementation
    ['sumToN', 'sum_to_n_iterative', 'sum_to_n_recursive'].forEach((funcName) => {
        const func = funcName === 'sumToN' ? sumToN : 
                     funcName === 'sum_to_n_iterative' ? sum_to_n_iterative : 
                     sum_to_n_recursive;
        
        try {
            const result = func(input);
            console.log(`  ${funcName}: ❌ Should have thrown error, got ${result}`);
        } catch (error) {
            console.log(`  ${funcName}: ✅ Correctly threw ${error.name}: ${error.message}`);
        }
    });
});

console.log('\n' + '═'.repeat(80));

// Performance comparison
console.log('\n\n⚡ Performance comparison (n = 1000):\n');
console.log('═'.repeat(80));

const perfN = 1000;
const iterations = 10000;

// Warm up
for (let i = 0; i < 100; i++) {
    sumToN(perfN);
    sum_to_n_iterative(perfN);
    sum_to_n_recursive(perfN);
}

// Test Formula
let startTime = performance.now();
for (let i = 0; i < iterations; i++) {
    sumToN(perfN);
}
let formulaTime = performance.now() - startTime;

// Test Iterative
startTime = performance.now();
for (let i = 0; i < iterations; i++) {
    sum_to_n_iterative(perfN);
}
let iterativeTime = performance.now() - startTime;

// Test Recursive
startTime = performance.now();
for (let i = 0; i < iterations; i++) {
    sum_to_n_recursive(perfN);
}
let recursiveTime = performance.now() - startTime;

console.log(`\nAverage execution time over ${iterations} iterations:`);
console.log(`  Formula (O(1)):      ${(formulaTime / iterations).toFixed(6)} ms ⚡ FASTEST`);
console.log(`  Iterative (O(n)):    ${(iterativeTime / iterations).toFixed(6)} ms`);
console.log(`  Recursive (O(n)):    ${(recursiveTime / iterations).toFixed(6)} ms`);

const speedup = recursiveTime / formulaTime;
console.log(`\n  Formula is ${speedup.toFixed(1)}x faster than recursive!`);

// Summary
console.log('\n' + '═'.repeat(80));
console.log('\n📈 Test Summary:\n');
console.log(`  Total tests:       ${totalTests}`);
console.log(`  Passed:            ${passedTests} ✅`);
console.log(`  Failed:            ${totalTests - passedTests} ${totalTests === passedTests ? '✅' : '❌'}`);
console.log(`  Success rate:      ${((passedTests / totalTests) * 100).toFixed(1)}%`);
console.log(`\n  Result: ${totalTests === passedTests ? '✅ ALL IMPLEMENTATIONS MATCH!' : '❌ SOME TESTS FAILED'}\n`);
console.log('═'.repeat(80));

