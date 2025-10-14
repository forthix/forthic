# datetime Module

[← Back to Index](../index.md)

Date and time operations using the Temporal API for timezone-aware datetime manipulation.

**15 words**

## Categories

- **Current**: TODAY, NOW
- **Time adjustment**: AM, PM
- **Conversion to**: >TIME, >DATE, >DATETIME, AT
- **Conversion from**: TIME>STR, DATE>STR, DATE>INT
- **Timestamps**: >TIMESTAMP, TIMESTAMP>DATETIME
- **Date math**: ADD-DAYS, SUBTRACT-DATES

## Examples

```forthic
TODAY
NOW
"14:30" >TIME
"2024-01-15" >DATE
TODAY "14:30" >TIME AT
TODAY 7 ADD-DAYS
```

## Words

### >DATE

**Stack Effect:** `( item:any -- date:Temporal.PlainDate )`

Convert string or datetime to PlainDate

---

### >DATETIME

**Stack Effect:** `( str_or_timestamp:any -- datetime:Temporal.ZonedDateTime )`

Convert string or timestamp to ZonedDateTime

---

### >TIME

**Stack Effect:** `( item:any -- time:Temporal.PlainTime )`

Convert string or datetime to PlainTime

---

### >TIMESTAMP

**Stack Effect:** `( datetime:Temporal.ZonedDateTime -- timestamp:number )`

Convert datetime to Unix timestamp (seconds)

---

### ADD-DAYS

**Stack Effect:** `( date:Temporal.PlainDate num_days:number -- date:Temporal.PlainDate )`

Add days to a date

---

### AM

**Stack Effect:** `( time:Temporal.PlainTime -- time:Temporal.PlainTime )`

Convert time to AM (subtract 12 from hour if >= 12)

---

### AT

**Stack Effect:** `( date:Temporal.PlainDate time:Temporal.PlainTime -- datetime:Temporal.ZonedDateTime )`

Combine date and time into datetime

---

### DATE>INT

**Stack Effect:** `( date:Temporal.PlainDate -- int:number )`

Convert date to integer (YYYYMMDD)

---

### DATE>STR

**Stack Effect:** `( date:Temporal.PlainDate -- str:string )`

Convert date to YYYY-MM-DD string

---

### NOW

**Stack Effect:** `( -- datetime:Temporal.ZonedDateTime )`

Get current datetime

---

### PM

**Stack Effect:** `( time:Temporal.PlainTime -- time:Temporal.PlainTime )`

Convert time to PM (add 12 to hour if < 12)

---

### SUBTRACT-DATES

**Stack Effect:** `( date1:Temporal.PlainDate date2:Temporal.PlainDate -- num_days:number )`

Get difference in days between dates (date1 - date2)

---

### TIME>STR

**Stack Effect:** `( time:Temporal.PlainTime -- str:string )`

Convert time to HH:MM string

---

### TIMESTAMP>DATETIME

**Stack Effect:** `( timestamp:number -- datetime:Temporal.ZonedDateTime )`

Convert Unix timestamp (seconds) to datetime

---

### TODAY

**Stack Effect:** `( -- date:Temporal.PlainDate )`

Get current date

---


[← Back to Index](../index.md)
