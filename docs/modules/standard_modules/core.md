# core Module

[← Back to Index](../index.md)

Essential interpreter operations for stack manipulation, variables, control flow, and module system.

**27 words**

## Categories

- **Stack**: POP, DUP, SWAP
- **Variables**: VARIABLES, !, @, !@
- **Module**: EXPORT, USE-MODULES
- **Execution**: INTERPRET
- **Control**: IDENTITY, NOP, DEFAULT, *DEFAULT, NULL, ARRAY?
- **Options**: ~> (converts array to WordOptions)
- **Profiling**: PROFILE-START, PROFILE-TIMESTAMP, PROFILE-END, PROFILE-DATA
- **Logging**: START-LOG, END-LOG
- **String**: INTERPOLATE, PRINT
- **Debug**: PEEK!, STACK!

## Options

INTERPOLATE and PRINT support options via the ~> operator using syntax: [.option_name value ...] ~> WORD
- separator: String to use when joining array values (default: ", ")
- null_text: Text to display for null/undefined values (default: "null")
- json: Use JSON.stringify for all values (default: false)

## Examples

```forthic
5 .count ! "Count: .count" PRINT
"Items: .items" [.separator " | "] ~> PRINT
[1 2 3] PRINT                           # Direct printing: 1, 2, 3
[1 2 3] [.separator " | "] ~> PRINT    # With options: 1 | 2 | 3
[ [.name "Alice"] ] REC [.json TRUE] ~> PRINT  # JSON format: {"name":"Alice"}
"Hello .name" INTERPOLATE .greeting !
[1 2 3] DUP SWAP
```

## Words

### DEFAULT

**Stack Effect:** `( value:any -- boolean:boolean )`

Returns true if value is an array

---

### DEFAULT

**Stack Effect:** `( value:any default_value:any -- result:any )`

Returns value or default if value is null/undefined/empty string

---

### DUP

**Stack Effect:** `( a:any -- a:any a:any )`

Duplicates top stack item

---

### END-LOG

**Stack Effect:** `( -- )`

Ends logging interpreter stream

---

### EXPORT

**Stack Effect:** `( names:string[] -- )`

Exports words from current module

---

### IDENTITY

**Stack Effect:** `( -- )`

Does nothing (identity operation)

---

### INTERPOLATE

**Stack Effect:** `( string:string [options:WordOptions] -- result:string )`

Interpolate variables (.name) and return result string. Use \\. to escape literal dots.

---

### INTERPRET

**Stack Effect:** `( value:any variable:any -- )`

Sets variable value (auto-creates if string name)

---

### INTERPRET

**Stack Effect:** `( variable:any -- value:any )`

Gets variable value (auto-creates if string name)

---

### INTERPRET

**Stack Effect:** `( value:any variable:any -- value:any )`

Sets variable and returns value

---

### INTERPRET

**Stack Effect:** `( string:string -- )`

Interprets Forthic string in current context

---

### NOP

**Stack Effect:** `( -- )`

Does nothing (no operation)

---

### NULL

**Stack Effect:** `( -- null:null )`

Pushes null onto stack

---

### POP

**Stack Effect:** `( a:any -- )`

Removes top item from stack

---

### PRINT

**Stack Effect:** `( value:any [options:WordOptions] -- )`

Print value to stdout. Strings interpolate variables (.name). Non-strings formatted with options. Use \\. to escape literal dots in strings.

---

### START_LOG

**Stack Effect:** `( value:any default_forthic:string -- result:any )`

Returns value or executes Forthic if value is null/undefined/empty string

---

### START_LOG

**Stack Effect:** `( array:any[] -- options:WordOptions )`

Convert options array to WordOptions. Format: [.key1 val1 .key2 val2]

---

### START_LOG

**Stack Effect:** `( -- )`

Starts profiling word execution

---

### START_LOG

**Stack Effect:** `( -- )`

Stops profiling word execution

---

### START_LOG

**Stack Effect:** `( label:string -- )`

Records profiling timestamp with label

---

### START_LOG

**Stack Effect:** `( -- profile_data:object )`

Returns profiling data (word counts and timestamps)

---

### START-LOG

**Stack Effect:** `( -- )`

Starts logging interpreter stream

---

### SWAP

**Stack Effect:** `( a:any b:any -- b:any a:any )`

Swaps top two stack items

---

### USE-MODULES

**Stack Effect:** `( names:string[] -- )`

Imports modules by name

---

### VARIABLES

**Stack Effect:** `( -- )`

Prints top of stack and stops execution

---

### VARIABLES

**Stack Effect:** `( -- )`

Prints entire stack (reversed) and stops execution

---

### VARIABLES

**Stack Effect:** `( varnames:string[] -- )`

Creates variables in current module

---


[← Back to Index](../index.md)
