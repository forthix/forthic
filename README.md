# Forthic

**Bring your code to life through categorical composition.**

A stack-based, concatenative language for wrapping existing code in composable transformations. Forthic provides both the module system to wrap your code *and* the standard operations to manipulate it cleanly.

Built with Category Theory in mind, proven through hundreds of engineering tools at LinkedIn, and powering new kinds of Agentic architectures.

**[Why Forthic?](docs/why-forthic.md)** | **[Get Started](docs/getting-started.md)** 

---

## What is Forthic?

Forthic makes your existing code **composable** by providing:

1. **A simple module system** to wrap your code as Forthic words
2. **Standard operations** for clean data transformations 
3. **Stack-based composition** that makes building higher-level abstractions trivial

**The Core Insight:**
Solving software problems is fundamentally about **understanding relationships
and applying transformations**. This is the essence of Category Theory, and
something that Forthic was designed around. When you wrap your code in Forthic
modules and compose transformations, you unlock systematic approaches to
solving complex problems.

---

## Quick Example: Wrapping Your Code

### Creating a Forthic Module is Easy

Use decorators to expose your functions as Forthic words:

```typescript
import { DecoratedModule, Word } from 'forthic-ts';

export class AnalyticsModule extends DecoratedModule {
  constructor() {
    super("analytics");
  }

  // Your existing business logic
  calculateAverage(numbers: number[]): number {
    return numbers.reduce((a, b) => a + b, 0) / numbers.length;
  }

  filterOutliers(numbers: number[], stdDevs: number = 2): number[] {
    // ... your implementation
    return filteredNumbers;
  }

  // Wrap them as Forthic words with the @Word decorator
  @Word("( numbers:number[] -- avg:number )", "Calculate average of numbers")
  async AVERAGE(numbers: number[]) {
    return this.calculateAverage(numbers);
  }

  @Word("( numbers:number[] stdDevs:number -- filtered:number[] )", "Filter outliers")
  async FILTER_OUTLIERS(numbers: number[], stdDevs: number) {
    return this.filterOutliers(numbers, stdDevs);
  }
}
```

**That's it!** Your code is now composable in Forthic.

### Composing Transformations

Now build higher-level concepts through composition:

```forthic
["analytics"] USE-MODULES

# Simple composition - data flows left to right
raw-data 2 FILTER-OUTLIERS AVERAGE

# Define a higher-level word that represents a concept
: CLEAN-AVERAGE   2 FILTER-OUTLIERS AVERAGE ;

# Now CLEAN-AVERAGE is a reusable transformation
dataset-1 CLEAN-AVERAGE
dataset-2 CLEAN-AVERAGE
dataset-3 CLEAN-AVERAGE
```

### Using Standard Operations

Forthic provides rich standard operations for clean data transformation:

```forthic
# Array operations
[1 2 3 4 5]  '2 *' MAP                    # [2 4 6 8 10]
[10 20 30]  2 TAKE                        # [10 20]
["a" "b" "c"]  ["x" "y" "z"] ZIP          # [["a" "x"] ["b" "y"] ["c" "z"]]

# Record operations
[[.name "Alice"] [.age 30]] REC  "name" REC@    # "Alice"
[[.x 1] [.y 2]] REC  [[.y 20] [.z 30]] REC_DEFAULTS   # {"x" 1 "y" 2 "z" 30}

# String operations
"hello world" UPPERCASE " " SPLIT          # ["HELLO" "WORLD"]
"2025-01-15" "-" SPLIT                     # ["2025" "01" "15"]

# Compose them together
data-records
  'DUP "score" REC@ 80 >' SELECT           # Filter records with score > 80
  '"name" REC@' MAP                        # Extract names
  ', ' JOIN                                # Join into comma-separated string
```

---

## Composition + Standard Operations + Your Code

### Building Higher-Level Concepts Through Composition

```forthic
["analytics" "reporting"] USE-MODULES

# Low-level transformations (your wrapped code)
: RAW-METRICS   data-source FETCH-METRICS ;
: CLEAN-METRICS   2 FILTER-OUTLIERS ;
: SUMMARIZE   CALCULATE-STATS ;

# Mid-level concepts (composing transformations)
: PROCESSED-METRICS   RAW-METRICS CLEAN-METRICS SUMMARIZE ;

# High-level concepts (representing business logic)
: MONTHLY-REPORT
    PROCESSED-METRICS
    reporting.FORMAT-FOR-EXECUTIVES
    reporting.ADD-VISUALIZATIONS
    reporting.EMAIL-TO-STAKEHOLDERS
;

# Now you can say what you mean
Q1-DATA MONTHLY-REPORT
Q2-DATA MONTHLY-REPORT
```

**This is the essence of Forthic:** Start with simple transformations, compose
them into mid-level concepts, then compose those into high-level abstractions
that directly express intent. The goal is to raise the level of abstraction to your
problem so the problem and solution are ideally "the same".

### Categorical Thinking: Inverses and Adjoints

Category Theory teaches us to think about solving problems by constructing **inverses** or **adjoints**.
When we can find "inverses" to problems, we can apply them to yield solutions that are "correct"; when we
can't find inverses, we try to find adjoints and either extend them to solve our problems or add information
to our problem to "lift" it so we can find solutions.

**Categorical thinking encourages you to ask:**
- How do transformations compose?
- Can I think of what I want to do as a sequence of transformations?
- If I can't construct a sequence that solves my problem, are there systematic ways to extend/modify the problem so it can be sovled?

---

## Key Features

### 1. Easy Module Creation

The `@Word` decorator makes wrapping your code trivial:

```typescript
export class MyModule extends DecoratedModule {
  constructor() {
    super("mymodule");
  }

  @Word("( input:any -- output:any )", "Description of what this does")
  async MY_WORD(input: any) {
    // Your logic here - can call existing code
    return yourExistingFunction(input);
  }

  @Word("( a:number b:number -- result:number )", "Add two numbers")
  async ADD(a: number, b: number) {
    return a + b;  // Trivial example, but you get the idea
  }
}
```

### 2. Standard Operations Included

Forthic provides proven operations for clean data manipulation:

- **array**: MAP, SELECT, SORT, GROUP_BY, ZIP, REDUCE, FLATTEN, etc.
- **record**: REC@, <REC, MERGE, KEYS, VALUES, INVERT_KEYS, etc.
- **string**: SPLIT, JOIN, UPPERCASE, LOWERCASE, TRIM, REPLACE, etc.
- **math**: +, -, *, /, ROUND, ABS, MIN, MAX, AVERAGE, etc.
- **datetime**: >DATE, >DATETIME, ADD_DAYS, FORMAT, SUBTRACT_DAYS, etc.
- **json**: >JSON, JSON>, JSON-PRETTIFY
- **boolean**: ==, <, >, AND, OR, NOT, IN, etc.

These operations form the vocabulary for clean data transformation.

### 3. Transformation-Focused Design

Forthic emphasizes **what transforms** rather than **how to control**. By
focusing on transformations, composition and abstraction become a natural way
to solve problems.

### 4. Intentionally Incomplete = Infinitely Extensible
Forthic is incomplete by design. It doesn't have branching or loops. It relies
on its host runtime to provide these capabilities. Rather, it's entirely
focused on solving problems through transformations.

This allows Forthic to operate at a high level and focus on abstraction rather than details. The higher
the abstraction, the closer to the problem, and the easier it is to tweak and modify your code as 
things change.

### 5. Category Theory Foundations

Forthic's design embraces Category Theory concepts:
- **Morphisms** - Words are transformations between stack states
- **Composition** - Concatenation is function composition
- **Inverses/Adjoints** - Construct inverse operations to solve problems

This mathematical foundation provides systematic thinking about code organization.

---

## Documentation

### Core Concepts
- **[Why Forthic?](docs/why-forthic.md)** - Philosophy and motivation
- **[Language Guide](docs/language/)** - Syntax, stack operations, composition
- **[History](HISTORY.md)** - From LinkedIn (1000+ apps) to open source

### Standard Library Reference
- **[Module Documentation](docs/modules/)** - Complete reference for all standard operations
  - [array](docs/modules/standard_modules/array.md) - 30+ collection operations
  - [record](docs/modules/standard_modules/record.md) - Object/dictionary manipulation
  - [string](docs/modules/standard_modules/string.md) - String transformation
  - [math](docs/modules/standard_modules/math.md) - Mathematical operations
  - [datetime](docs/modules/standard_modules/datetime.md) - Date/time handling
  - [json](docs/modules/standard_modules/json.md) - JSON serialization
  - [boolean](docs/modules/standard_modules/boolean.md) - Comparisons and logic


---

## Runtimes

Forthic implementations across multiple environments:

| Runtime | Status | Repository | Use Case |
|---------|--------|------------|----------|
| **TypeScript** | ✅ Active | [forthic-ts](https://github.com/forthix/forthic-ts) | Node.js, web apps, modern JS ecosystems |

---

## Philosophy: Categorical Coding is a good way to solve software problems

**Core beliefs:**
- Software is fundamentally about transformations
- Category Theory provides a framework to view code and systems in terms of relationships and transformations
- Existing code should be composable, not rewritten

See [Why Forthic?](docs/why-forthic.md) for complete philosophy and [History](HISTORY.md) for the origin story.

---

**Forthic: Modules + Standard Operations + Composition = Powerful Abstractions**

