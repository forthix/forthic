# json Module

[← Back to Index](../index.md)

JSON serialization, parsing, and formatting operations.

**3 words**

## Categories

- **Conversion**: >JSON, JSON>
- **Formatting**: JSON-PRETTIFY

## Examples

```forthic
{name: "Alice", age: 30} >JSON
'{"name":"Alice"}' JSON>
'{"a":1}' JSON-PRETTIFY
```

## Words

### >JSON

**Stack Effect:** `( object:any -- json:string )`

Convert object to JSON string

---

### JSON-PRETTIFY

**Stack Effect:** `( json:string -- pretty:string )`

Format JSON with 2-space indentation

---

### JSON>

**Stack Effect:** `( json:string -- object:any )`

Parse JSON string to object

---


[← Back to Index](../index.md)
