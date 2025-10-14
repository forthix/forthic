# string Module

[← Back to Index](../index.md)

String manipulation and processing operations with regex and URL encoding support.

**17 words**

## Categories

- **Conversion**: >STR, URL_ENCODE, URL_DECODE
- **Transform**: LOWERCASE, UPPERCASE, STRIP, ASCII
- **Split/Join**: SPLIT, JOIN, CONCAT
- **Pattern**: REPLACE, RE_MATCH, RE_MATCH_ALL, RE_MATCH_GROUP
- **Constants**: /N, /R, /T

## Examples

```forthic
"hello" "world" CONCAT
["a" "b" "c"] CONCAT
"hello world" " " SPLIT
["hello" "world"] " " JOIN
"Hello" LOWERCASE
"test@example.com" "(@.+)" RE-MATCH 1 RE-MATCH-GROUP
```

## Words

### /N

**Stack Effect:** `( -- char:string )`

Newline character

---

### /R

**Stack Effect:** `( -- char:string )`

Carriage return character

---

### /T

**Stack Effect:** `( -- char:string )`

Tab character

---

### >STR

**Stack Effect:** `( item:any -- string:string )`

Convert item to string

---

### ASCII

**Stack Effect:** `( string:string -- result:string )`

Keep only ASCII characters (< 256)

---

### CONCAT

**Stack Effect:** `( str1:string str2:string -- result:string ) OR ( strings:string[] -- result:string )`

Concatenate two strings or array of strings

---

### JOIN

**Stack Effect:** `( strings:string[] sep:string -- result:string )`

Join strings with separator

---

### LOWERCASE

**Stack Effect:** `( string:string -- result:string )`

Convert string to lowercase

---

### RE_MATCH

**Stack Effect:** `( string:string pattern:string -- match:any )`

Match string against regex pattern

---

### RE_MATCH_ALL

**Stack Effect:** `( string:string pattern:string -- matches:any[] )`

Find all regex matches in string

---

### RE_MATCH_GROUP

**Stack Effect:** `( match:any num:number -- result:any )`

Get capture group from regex match

---

### REPLACE

**Stack Effect:** `( string:string text:string replace:string -- result:string )`

Replace all occurrences of text with replace

---

### SPLIT

**Stack Effect:** `( string:string sep:string -- items:any[] )`

Split string by separator

---

### STRIP

**Stack Effect:** `( string:string -- result:string )`

Trim whitespace from string

---

### UPPERCASE

**Stack Effect:** `( string:string -- result:string )`

Convert string to uppercase

---

### URL_DECODE

**Stack Effect:** `( urlencoded:string -- decoded:string )`

URL decode string

---

### URL_ENCODE

**Stack Effect:** `( str:string -- encoded:string )`

URL encode string

---


[← Back to Index](../index.md)
