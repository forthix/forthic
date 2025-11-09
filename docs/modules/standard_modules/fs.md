# fs Module

[← Back to Index](../index.md)

TypeScript-specific file system operations for Node.js runtime.

**9 words**

## Categories

- **Read**: READ-FILE, READ-FILE-LINES
- **Write**: WRITE-FILE, APPEND-FILE
- **Check**: FILE-EXISTS?, DIR-EXISTS?
- **Path**: JOIN-PATH, BASENAME, DIRNAME

## Examples

```forthic
"/tmp/test.txt" "Hello World" WRITE-FILE
"/tmp/test.txt" READ-FILE
"/tmp" "/test.txt" JOIN-PATH
```

## Words

### APPEND-FILE

**Stack Effect:** `( path:string content:string -- )`

Append content to file

---

### BASENAME

**Stack Effect:** `( path:string -- basename:string )`

Get basename of path

---

### DIR-EXISTS?

**Stack Effect:** `( path:string -- exists:boolean )`

Check if directory exists

---

### DIRNAME

**Stack Effect:** `( path:string -- dirname:string )`

Get directory name of path

---

### FILE-EXISTS?

**Stack Effect:** `( path:string -- exists:boolean )`

Check if file exists

---

### JOIN-PATH

**Stack Effect:** `( parts:string[] -- path:string )`

Join path components

---

### READ-FILE

**Stack Effect:** `( path:string -- content:string )`

Read file contents as string

---

### READ-FILE-LINES

**Stack Effect:** `( path:string -- lines:string[] )`

Read file as array of lines

---

### WRITE-FILE

**Stack Effect:** `( path:string content:string -- )`

Write content to file

---


[← Back to Index](../index.md)
