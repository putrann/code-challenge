/**
 * sumToN
 *
 * Calculates the sum of all integers from 1 to n (inclusive).
 *
 * Contract:
 * - n must be a non-negative integer
 * - Throws a TypeError if the input is invalid
 *
 * Rationale:
 * - Uses the Gauss formula for O(1) time and O(1) space complexity
 * - This is the most efficient and production-ready approach
 *
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 *
 * Note:
 * - For extremely large values of n, the result may exceed
 *   Number.MAX_SAFE_INTEGER and lose precision due to JavaScript
 *   number limitations.
 *
 * @param {number} n - A non-negative integer
 * @returns {number} The sum from 1 to n
 */
const sumToN = (n) => {
    if (!Number.isInteger(n) || n < 0) {
        throw new TypeError('n must be a non-negative integer');
    }

    return (n * (n + 1)) / 2;
};

/**
 * Alternative implementations below are provided for demonstration
 * and comparison purposes only. They are not recommended for production use.
 */

/**
 * Implementation A: Iterative approach
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
const sum_to_n_iterative = (n) => {
    if (!Number.isInteger(n) || n < 0) {
        throw new TypeError('n must be a non-negative integer');
    }

    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
};

/**
 * Implementation B: Recursive approach
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n) due to call stack
 *
 * Note:
 * - Not recommended in JavaScript for large n
 *   due to lack of guaranteed tail-call optimization
 */
const sum_to_n_recursive = (n) => {
    if (!Number.isInteger(n) || n < 0) {
        throw new TypeError('n must be a non-negative integer');
    }

    if (n === 0) {
        return 0;
    }

    return n + sum_to_n_recursive(n - 1);
};

/* --------------------------------------------------
 * Basic test cases
 * -------------------------------------------------- */

console.log('Testing sumToN implementations');
console.log('==============================');

const testCases = [0, 1, 5, 10, 100];

testCases.forEach((n) => {
    console.log(`\nInput: ${n}`);
    console.log(`sumToN (formula):    ${sumToN(n)}`);
    console.log(`Iterative version:   ${sum_to_n_iterative(n)}`);
    console.log(`Recursive version:   ${sum_to_n_recursive(n)}`);
});

/* --------------------------------------------------
 * Module exports
 * -------------------------------------------------- */

// CommonJS (Node.js compatibility)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        sumToN,
        sum_to_n_iterative,
        sum_to_n_recursive,
    };
}

// ES Module (Frontend / modern tooling)
// export { sumToN, sum_to_n_iterative, sum_to_n_recursive };
