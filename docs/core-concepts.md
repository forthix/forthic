# Forthic Core Concepts

**Understanding Categorical Coding Through Forthic**

Forthic makes your existing code **composable** by providing three core elements:

1. **A simple module system** to wrap your code as Forthic words
2. **Standard operations** for clean data transformations
3. **Stack-based composition** that makes building higher-level abstractions trivial

---

## The Core Insight

Solving software problems is fundamentally about **understanding relationships and applying transformations**. This is the essence of Category Theory, and something that Forthic was designed around.

When you wrap your code in Forthic modules and compose transformations, you unlock systematic approaches to solving complex problems.

---

## Creating Forthic Modules

### Easy Module Creation

Use decorators to expose your functions as Forthic words. Here's how it works across different runtimes:

**TypeScript:**
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

  @Word("( numbers:number[] stdDevs:number -- filtered:number[] )", "Filter outliers", "FILTER-OUTLIERS")
  async FILTER_OUTLIERS(numbers: number[], stdDevs: number) {
    return this.filterOutliers(numbers, stdDevs);
  }
}
```

**Python:**
```python
from forthic import DecoratedModule, ForthicWord

class AnalyticsModule(DecoratedModule):
    def __init__(self):
        super().__init__("analytics")

    @ForthicWord("( numbers -- avg )", "Calculate average of numbers")
    async def AVERAGE(self, numbers):
        return sum(numbers) / len(numbers)

    @ForthicWord("( numbers stdDevs -- filtered )", "Filter outliers")
    async def FILTER_OUTLIERS(self, numbers, std_devs):
        # Your implementation
        return filtered_numbers
```

**Ruby:**
```ruby
class AnalyticsModule < Forthic::Decorators::DecoratedModule
  def initialize
    super("analytics")
  end

  word :AVERAGE, "( numbers -- avg )", "Calculate average of numbers"
  def AVERAGE(numbers)
    numbers.sum.to_f / numbers.length
  end

  word :FILTER_OUTLIERS, "( numbers stdDevs -- filtered )", "Filter outliers"
  def FILTER_OUTLIERS(numbers, std_devs)
    # Your implementation
    filtered_numbers
  end
end
```

**That's it!** Your code is now composable in Forthic.

---

## Composing Transformations

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

---

## Using Standard Operations

Forthic provides rich standard operations for clean data transformation:

### Array Operations

```forthic
# Array operations
[1 2 3 4 5]  '2 *' MAP                    # [2 4 6 8 10]
[10 20 30]  2 TAKE                        # [10 20]
["a" "b" "c"]  ["x" "y" "z"] ZIP          # [["a" "x"] ["b" "y"] ["c" "z"]]
```

### Record Operations

```forthic
# Record operations
[[.name "Alice"] [.age 30]] REC  "name" REC@    # "Alice"
[[.x 1] [.y 2]] REC  [[.y 20] [.z 30]] REC DEFAULTS   # {"x": 1, "y": 2, "z": 30}
```

### String Operations

```forthic
# String operations
"hello world" UPPERCASE " " SPLIT          # ["HELLO" "WORLD"]
"2025-01-15" "-" SPLIT                     # ["2025" "01" "15"]
```

---

## Building Higher-Level Concepts Through Composition

The real power of Forthic emerges when you compose transformations into increasingly abstract concepts:

```forthic
["analytics" "reporting"] USE-MODULES

# Low-level transformations (your wrapped code)
: RAW-METRICS   data-source FETCH-METRICS ;
: CLEAN-METRICS   2 FILTER-OUTLIERS ;
: SUMMARIZE   CALCULATE-STATS ;

# Mid-level concepts (composing transformations)
: PROCESSED-METRICS   RAW-METRICS CLEAN-METRICS SUMMARIZE ;

# High-level concepts (representing business logic)
: MONTHLY-REPORT   PROCESSED-METRICS FORMAT-FOR-EXECUTIVES ADD-VISUALIZATIONS EMAIL-TO-STAKEHOLDERS;

# Now you can say what you mean
Q1-DATA MONTHLY-REPORT
Q2-DATA MONTHLY-REPORT
```

**This is the essence of Forthic:** Start with simple transformations, compose them into mid-level concepts, then compose those into high-level abstractions that directly express intent.

The goal is to raise the level of abstraction to your problem so the problem and solution are ideally "the same".

---

## Standard Library Modules

Forthic provides proven operations across all runtimes:

- **array** - MAP, SELECT, SORT, GROUP-BY, ZIP, REDUCE, FLATTEN (30+ operations)
- **record** - REC@, <REC, MERGE, KEYS, VALUES, INVERT-KEYS
- **string** - SPLIT, JOIN, UPPERCASE, LOWERCASE, TRIM, REPLACE
- **math** - +, -, *, /, ROUND, ABS, MIN, MAX, AVERAGE
- **datetime** - >DATE, >DATETIME, ADD-DAYS, FORMAT, DIFF-DAYS
- **json** - >JSON, JSON>, JSON-PRETTIFY
- **boolean** - ==, <, >, AND, OR, NOT, IN

These operations form the vocabulary for clean data transformation.

See the [Module Documentation](modules/) for complete reference.

---

## Design Principles

### 1. Transformation-Focused

Forthic emphasizes **what transforms** rather than **how to control**. By focusing on transformations, composition and abstraction become a natural way to solve problems.

### 2. Intentionally Incomplete = Infinitely Extensible

Forthic is incomplete by design. It doesn't have branching or loops. It relies on its host runtime to provide these capabilities. Rather, it's entirely focused on solving problems through transformations.

This allows Forthic to operate at a high level and focus on abstraction rather than details. The higher the abstraction, the closer to the problem, and the easier it is to tweak and modify your code as things change.

### 3. Category Theory Foundations

Forthic's design embraces Category Theory concepts:
- **Morphisms** - Words are transformations between stack states
- **Composition** - Concatenation is function composition
- **Inverses/Adjoints** - Construct inverse operations to solve problems

This mathematical foundation provides systematic thinking about code organization.

---

## Next Steps

- **Learn the philosophy**: Read [Why Forthic?](why-forthic.md) and [Categorical Coding](philosophy/categorical-coding.md)
- **Choose your runtime**: Start with [TypeScript](https://github.com/forthix/forthic-ts), [Python](https://github.com/forthix/forthic-py), or [Ruby](https://github.com/forthix/forthic-rb)
- **Explore multi-runtime**: Learn how to [call code across runtimes](multi-runtime/)
- **Study examples**: See real-world applications in each runtime's examples directory
