# Problem 1: Sum to N - Three Implementations

## Task
Provide 3 unique implementations of a function that calculates the summation from 1 to n.

**Example:** `sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15`

## Solutions

### Implementation A: Iterative Approach
```javascript
var sum_to_n_a = function(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
};
```

**Characteristics:**
- **Time Complexity:** O(n)
- **Space Complexity:** O(1)
- **Approach:** Uses a simple for loop to iterate from 1 to n, accumulating the sum
- **Pros:** Easy to understand, memory efficient
- **Cons:** Linear time complexity

---

### Implementation B: Mathematical Formula (Gauss Formula)
```javascript
var sum_to_n_b = function(n) {
    return (n * (n + 1)) / 2;
};
```

**Characteristics:**
- **Time Complexity:** O(1)
- **Space Complexity:** O(1)
- **Approach:** Uses the mathematical formula discovered by Carl Friedrich Gauss: `sum = n × (n + 1) / 2`
- **Pros:** Most efficient - constant time calculation, no loops needed
- **Cons:** Requires knowledge of the mathematical formula

---

### Implementation C: Recursive Approach
```javascript
var sum_to_n_c = function(n) {
    if (n <= 0) {
        return 0;
    }
    return n + sum_to_n_c(n - 1);
};
```

**Characteristics:**
- **Time Complexity:** O(n)
- **Space Complexity:** O(n) - due to call stack
- **Approach:** Recursively calls itself with the pattern: `sum(n) = n + sum(n-1)`, with base case `sum(0) = 0`
- **Pros:** Elegant, demonstrates functional programming concepts
- **Cons:** Less efficient due to function call overhead and stack space usage, risk of stack overflow for large n

---

## How to Test

### Option 1: In Browser
Open `index.html` in your browser to see an interactive demo with all three implementations.

### Option 2: In Node.js
```bash
node sum_to_n.js
```

### Option 3: Import in Your Code
```javascript
const { sum_to_n_a, sum_to_n_b, sum_to_n_c } = require('./sum_to_n.js');

console.log(sum_to_n_a(100));  // 5050
console.log(sum_to_n_b(100));  // 5050
console.log(sum_to_n_c(100));  // 5050
```

## Performance Comparison

For `n = 10,000`:
- **Method A (Iterative):** ~0.1-0.5 ms
- **Method B (Formula):** ~0.001 ms ⭐ (fastest)
- **Method C (Recursive):** ~1-2 ms (slowest due to call stack)

**Winner:** Method B (Mathematical Formula) is the most efficient for all values of n.

## Edge Cases Handled
- `n = 0`: Returns 0
- `n = 1`: Returns 1
- Negative numbers: Method C returns 0, Methods A and B will need additional validation if needed

## Notes
All implementations assume the input will produce a result less than `Number.MAX_SAFE_INTEGER` (9,007,199,254,740,991) as specified in the requirements.

