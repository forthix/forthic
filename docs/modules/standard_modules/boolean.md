# boolean Module

[← Back to Index](../index.md)

Comparison, logic, and membership operations for boolean values and conditions.

**14 words**

## Categories

- **Comparison**: ==, !=, <, <=, >, >=
- **Logic**: OR, AND, NOT, XOR, NAND
- **Membership**: IN, ANY, ALL
- **Conversion**: >BOOL

## Examples

```forthic
5 3 >
"hello" "hello" ==
[1 2 3] [4 5 6] OR
2 [1 2 3] IN
```

## Words

### !=

**Stack Effect:** `( a:any b:any -- not_equal:boolean )`

Test inequality

---

### <

**Stack Effect:** `( a:any b:any -- less_than:boolean )`

Less than

---

### <=

**Stack Effect:** `( a:any b:any -- less_equal:boolean )`

Less than or equal

---

### ==

**Stack Effect:** `( a:any b:any -- equal:boolean )`

Test equality

---

### >

**Stack Effect:** `( a:any b:any -- greater_than:boolean )`

Greater than

---

### >=

**Stack Effect:** `( a:any b:any -- greater_equal:boolean )`

Greater than or equal

---

### ALL

**Stack Effect:** `( items1:any[] items2:any[] -- all:boolean )`

Check if all items from items2 are in items1

---

### AND

**Stack Effect:** `( a:boolean b:boolean -- result:boolean ) OR ( bools:boolean[] -- result:boolean )`

Logical AND of two values or array

---

### ANY

**Stack Effect:** `( items1:any[] items2:any[] -- any:boolean )`

Check if any item from items1 is in items2

---

### IN

**Stack Effect:** `( item:any array:any[] -- in:boolean )`

Check if item is in array

---

### NAND

**Stack Effect:** `( a:boolean b:boolean -- result:boolean )`

Logical NAND (not and)

---

### NOT

**Stack Effect:** `( bool:boolean -- result:boolean )`

Logical NOT

---

### OR

**Stack Effect:** `( a:boolean b:boolean -- result:boolean ) OR ( bools:boolean[] -- result:boolean )`

Logical OR of two values or array

---

### XOR

**Stack Effect:** `( a:boolean b:boolean -- result:boolean )`

Logical XOR (exclusive or)

---


[← Back to Index](../index.md)
