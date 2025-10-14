# record Module

[← Back to Index](../index.md)

Record (object/dictionary) manipulation operations for working with key-value data structures.

**10 words**

## Categories

- **Core**: REC, REC@, |REC@, <REC!
- **Transform**: RELABEL, INVERT-KEYS, REC-DEFAULTS, <DEL
- **Access**: KEYS, VALUES

## Examples

```forthic
[["name" "Alice"] ["age" 30]] REC
{name: "Alice", age: 30} "name" REC@
[{x: 1} {x: 2}] "x" |REC@
{a: 1, b: 2} KEYS
```

## Words

### <DEL

**Stack Effect:** `( container:any key:any -- container:any )`

Delete key from record or index from array

---

### <REC!

**Stack Effect:** `( rec:any value:any field:any -- rec:any )`

Set value in record at field path

---

### |REC@

**Stack Effect:** `( records:any field:any -- values:any )`

Map REC@ over array of records

---

### INVERT_KEYS

**Stack Effect:** `( record:any -- inverted:any )`

Invert two-level nested record structure

---

### KEYS

**Stack Effect:** `( container:any -- keys:any[] )`

Get keys from record or indices from array

---

### REC

**Stack Effect:** `( key_vals:any[] -- rec:any )`

Create record from [[key, val], ...] pairs

---

### REC_DEFAULTS

**Stack Effect:** `( record:any key_vals:any[] -- record:any )`

Set default values for missing/empty fields

---

### REC@

**Stack Effect:** `( rec:any field:any -- value:any )`

Get value from record by field or array of fields

---

### RELABEL

**Stack Effect:** `( container:any old_keys:any[] new_keys:any[] -- container:any )`

Rename record keys

---

### VALUES

**Stack Effect:** `( container:any -- values:any[] )`

Get values from record or elements from array

---


[← Back to Index](../index.md)
