# math Module

[← Back to Index](../index.md)

Mathematical operations and utilities including arithmetic, aggregation, and conversions.

**24 words**

## Categories

- **Arithmetic**: +, -, *, /, ADD, SUBTRACT, MULTIPLY, DIVIDE, MOD
- **Aggregates**: MEAN, MAX, MIN, SUM
- **Type conversion**: >INT, >FLOAT, >FIXED, ROUND
- **Special values**: INFINITY, UNIFORM-RANDOM
- **Math functions**: ABS, SQRT, FLOOR, CEIL, CLAMP

## Examples

```forthic
5 3 +
[1 2 3 4] SUM
[10 20 30] MEAN
3.7 ROUND
0 100 UNIFORM-RANDOM
```

## Words

### -

**Stack Effect:** `( a:number b:number -- difference:number )`

Subtract b from a

---

### *

**Stack Effect:** `( a:number b:number -- product:number ) OR ( numbers:number[] -- product:number )`

Multiply two numbers or product of array

---

### /

**Stack Effect:** `( a:number b:number -- quotient:number )`

Divide a by b

---

### +

**Stack Effect:** `( a:number b:number -- sum:number ) OR ( numbers:number[] -- sum:number )`

Add two numbers or sum array

---

### ABS

**Stack Effect:** `( low:number high:number -- random:number )`

Generate random number in range [low, high)

---

### ABS

**Stack Effect:** `( n:number -- abs:number )`

Absolute value

---

### ADD

**Stack Effect:** `( a:number b:number -- sum:number ) OR ( numbers:number[] -- sum:number )`

Add two numbers or sum array

---

### CEIL

**Stack Effect:** `( n:number -- ceil:number )`

Round up to integer

---

### CLAMP

**Stack Effect:** `( value:number min:number max:number -- clamped:number )`

Constrain value to range [min, max]

---

### DIVIDE

**Stack Effect:** `( a:number b:number -- quotient:number )`

Divide a by b

---

### FLOOR

**Stack Effect:** `( n:number -- floor:number )`

Round down to integer

---

### INFINITY

**Stack Effect:** `( -- infinity:number )`

Push Infinity value

---

### MAX

**Stack Effect:** `( a:number b:number -- max:number ) OR ( items:number[] -- max:number )`

Maximum of two numbers or array

---

### MEAN

**Stack Effect:** `( items:any[] -- mean:any )`

Calculate mean of array (handles numbers, strings, objects)

---

### MIN

**Stack Effect:** `( a:number b:number -- min:number ) OR ( items:number[] -- min:number )`

Minimum of two numbers or array

---

### MOD

**Stack Effect:** `( m:number n:number -- remainder:number )`

Modulo operation (m % n)

---

### MULTIPLY

**Stack Effect:** `( a:number b:number -- product:number ) OR ( numbers:number[] -- product:number )`

Multiply two numbers or product of array

---

### ROUND

**Stack Effect:** `( a:any -- int:number )`

Convert to integer (returns length for arrays/objects, 0 for null)

---

### ROUND

**Stack Effect:** `( a:any -- float:number )`

Convert to float

---

### ROUND

**Stack Effect:** `( num:number digits:number -- result:string )`

Format number with fixed decimal places

---

### ROUND

**Stack Effect:** `( num:number -- int:number )`

Round to nearest integer

---

### SQRT

**Stack Effect:** `( n:number -- sqrt:number )`

Square root

---

### SUBTRACT

**Stack Effect:** `( a:number b:number -- difference:number )`

Subtract b from a

---

### SUM

**Stack Effect:** `( numbers:number[] -- sum:number )`

Sum of array (explicit)

---


[← Back to Index](../index.md)
