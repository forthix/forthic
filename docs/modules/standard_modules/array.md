# array Module

[← Back to Index](../index.md)

Array and collection operations for manipulating arrays and records.

**29 words**

## Categories

- **Access**: NTH, LAST, SLICE, TAKE, DROP, LENGTH, INDEX, KEY-OF
- **Transform**: MAP, REVERSE
- **Combine**: APPEND, ZIP, ZIP_WITH, CONCAT
- **Filter**: SELECT, UNIQUE, DIFFERENCE, INTERSECTION, UNION
- **Sort**: SORT, SHUFFLE, ROTATE
- **Group**: BY_FIELD, GROUP-BY-FIELD, GROUP_BY, GROUPS_OF
- **Utility**: <REPEAT, FOREACH, REDUCE, UNPACK, FLATTEN

## Options

Several words support options via the ~> operator using syntax: [.option_name value ...] ~> WORD
- with_key: Push index/key before value (MAP, FOREACH, GROUP-BY, SELECT)
- push_error: Push error array after execution (MAP, FOREACH)
- depth: Recursion depth for nested operations (MAP, FLATTEN)
- push_rest: Push remaining items after operation (MAP, TAKE)
- comparator: Custom comparison function as Forthic string (SORT)

## Examples

```forthic
[10 20 30] '2 *' MAP
[10 20 30] '+ 2 *' [.with_key TRUE] ~> MAP
[[[1 2]] [[3 4]]] [.depth 1] ~> FLATTEN
[3 1 4 1 5] [.comparator "SWAP -"] ~> SORT
[.with_key TRUE .push_error TRUE] ~> MAP
```

## Words

### <REPEAT

**Stack Effect:** `( item:any forthic:string num_times:number -- )`

Repeat execution of forthic num_times

---

### APPEND

**Stack Effect:** `( container:any item:any -- container:any )`

Append item to array or add key-value to record

---

### BY-FIELD

**Stack Effect:** `( container:any[] field:string -- indexed:any )`

Index records by field value

---

### DIFFERENCE

**Stack Effect:** `( lcontainer:any rcontainer:any -- result:any )`

Set difference between two containers

---

### DROP

**Stack Effect:** `( container:any n:number -- result:any )`

Drop first n elements from array or record

---

### FLATTEN

**Stack Effect:** `( container:any [options:WordOptions] -- flat:any )`

Flatten nested arrays or records. Options: depth (number). Example: [[[1 2]]] [.depth 1] ~> FLATTEN

---

### FOREACH

**Stack Effect:** `( items:any forthic:string [options:WordOptions] -- ? )`

Execute forthic for each item. Options: with_key (bool), push_error (bool). Example: ['a' 'b'] 'PROCESS' [.with_key TRUE] ~> FOREACH

---

### GROUP-BY

**Stack Effect:** `( items:any forthic:string [options:WordOptions] -- grouped:any )`

Group items by function result. Options: with_key (bool). Example: [5 15 25] '10 /' [.with_key TRUE] ~> GROUP-BY

---

### GROUP-BY-FIELD

**Stack Effect:** `( container:any[] field:string -- grouped:any )`

Group records by field value

---

### GROUPS-OF

**Stack Effect:** `( container:any[] n:number -- groups:any[] )`

Split array into groups of size n

---

### INDEX

**Stack Effect:** `( items:any[] forthic:string -- indexed:any )`

Create index mapping from array indices to values

---

### INTERSECTION

**Stack Effect:** `( lcontainer:any rcontainer:any -- result:any )`

Set intersection between two containers

---

### KEY-OF

**Stack Effect:** `( container:any value:any -- key:any )`

Find key of value in container

---

### LAST

**Stack Effect:** `( container:any -- item:any )`

Get last element from array or record

---

### LENGTH

**Stack Effect:** `( container:any -- length:number )`

Get length of array or record

---

### MAP

**Stack Effect:** `( items:any forthic:string [options:WordOptions] -- mapped:any )`

Map function over items. Options: with_key (bool), push_error (bool), depth (num), push_rest (bool). Example: [1 2 3] '2 *' [.with_key TRUE] ~> MAP

---

### NTH

**Stack Effect:** `( container:any n:number -- item:any )`

Get nth element from array or record

---

### REDUCE

**Stack Effect:** `( container:any initial:any forthic:string -- result:any )`

Reduce array or record with accumulator

---

### REVERSE

**Stack Effect:** `( container:any -- container:any )`

Reverse array

---

### ROTATE

**Stack Effect:** `( container:any -- container:any )`

Rotate container by moving last element to front

---

### SELECT

**Stack Effect:** `( container:any forthic:string [options:WordOptions] -- filtered:any )`

Filter items with predicate. Options: with_key (bool)

---

### SHUFFLE

**Stack Effect:** `( array:any[] -- array:any[] )`

Shuffle array randomly

---

### SLICE

**Stack Effect:** `( container:any start:number end:number -- result:any )`

Extract slice from array or record

---

### TAKE

**Stack Effect:** `( container:any[] n:number [options:WordOptions] -- result:any[] )`

Take first n elements

---

### UNION

**Stack Effect:** `( lcontainer:any rcontainer:any -- result:any )`

Set union between two containers

---

### UNIQUE

**Stack Effect:** `( array:any[] -- array:any[] )`

Remove duplicates from array

---

### UNPACK

**Stack Effect:** `( container:any -- elements:any )`

Unpack array or record elements onto stack

---

### ZIP

**Stack Effect:** `( container1:any[] container2:any[] -- result:any[] )`

Zip two arrays into array of pairs

---

### ZIP-WITH

**Stack Effect:** `( container1:any[] container2:any[] forthic:string -- result:any[] )`

Zip two arrays with combining function

---


[← Back to Index](../index.md)
