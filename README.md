# Forthic

**Wrap. Compose. Abstract**

A stack-based, concatenative language for wrapping existing code in composable transformations. Forthic provides both the module system to wrap your code *and* the standard operations to manipulate it cleanly.

Built with Category Theory in mind, proven through hundreds of engineering tools at LinkedIn, and powering new kinds of Agentic architectures.

**[Why Forthic?](docs/why-forthic.md)** | **[Core Concepts](docs/core-concepts.md)** | **[Get Started](#getting-started)**

---

## What is Forthic?

Forthic makes your existing code **composable** by providing:

1. **A simple module system** to wrap your code as Forthic words
2. **Standard operations** for clean data transformations
3. **Stack-based composition** that makes building higher-level abstractions trivial

**The Core Insight:** Solving software problems is fundamentally about **understanding relationships and applying transformations**.
This is the essence of Category Theory--the concepts that that Forthic was designed around.

Wrap code in Forthic words, compose them as transformations, and unlock systematic approaches to solving complex problems.

**[Deep dive: Core Concepts →](docs/core-concepts.md)**

---

## Quick Example

### Creating a Forthic Module

**TypeScript:**
```typescript
import { DecoratedModule, Word } from '@forthix/forthic';

export class AnalyticsModule extends DecoratedModule {
  constructor() {
    super("analytics");
  }

  @Word("( numbers:number[] -- avg:number )", "Calculate average")
  async AVERAGE(numbers: number[]) {
    return numbers.reduce((a, b) => a + b, 0) / numbers.length;
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
    @ForthicWord("( numbers -- avg )", "Calculate average")
    async def AVERAGE(self, numbers):
        return sum(numbers) / len(numbers)
```

**Ruby:**
```ruby
class AnalyticsModule < Forthic::Decorators::DecoratedModule
  word :AVERAGE, "( numbers -- avg )", "Calculate average"
  def AVERAGE(numbers)
    numbers.sum.to_f / numbers.length
  end
end
```

### Using Your Module

```forthic
["analytics"] USE-MODULES

# Simple composition
raw-data 2 FILTER-OUTLIERS AVERAGE

# Define reusable transformations
: CLEAN-AVERAGE   2 FILTER-OUTLIERS AVERAGE ;

# Use it anywhere
dataset-1 CLEAN-AVERAGE
dataset-2 CLEAN-AVERAGE
```

---

## Runtimes

Choose your language - all runtimes share the same Forthic semantics and can communicate via a gRPC-based multi-runtime architecture:

| Runtime | Status | Repository | Best For | Multi-Runtime |
|---------|--------|------------|----------|---------------|
| **TypeScript** | ✅ Production | [forthic-ts](https://github.com/forthix/forthic-ts) | Node.js, browsers, web apps | gRPC, WebSocket |
| **Python** | ✅ Production | [forthic-py](https://github.com/forthix/forthic-py) | Data science, ML, analytics | gRPC, WebSocket |
| **Ruby** | ✅ Production | [forthic-rb](https://github.com/forthix/forthic-rb) | Rails apps, web services | gRPC, WebSocket |
| **Rust** | 🚧 In Progress | [forthic-rs](https://github.com/forthix/forthic-rs) | Performance, systems programming | gRPC (planned) |
| **Java** | 📋 Planned | [forthic-java](https://github.com/forthix/forthic-java) | Enterprise applications | TBD |


## 🌐 Multi-Runtime Capabilities

Call code seamlessly across TypeScript, Python, Ruby, Rust, and more.

```typescript
// TypeScript calling Python's pandas
import { GrpcClient, RemoteModule } from '@forthix/forthic/grpc';

const pythonClient = new GrpcClient('localhost:50051');
const pandas = new RemoteModule('pandas', pythonClient, 'python');

await interp.run(`
  ["pandas"] USE-MODULES
  [records] DF-FROM-RECORDS DF-ANALYZE
`);
```

```ruby
# Ruby calling TypeScript's fs module
interp.run(%{
  "localhost:50052" CONNECT-RUNTIME
  ["fs"] USE-TS-MODULES
  "/app/data" DIR-EXISTS?
})
```

**Why multi-runtime?**
- ✨ Use Python's data science libraries from TypeScript
- ✨ Access Node.js's npm ecosystem from Ruby or Python
- ✨ Call Rust's high-performance code from any runtime
- ✨ Build polyglot systems without rewriting existing code using common, high-level Forthic

**[Learn more about multi-runtime →](docs/multi-runtime/)**

---
---

## Key Features

### 1. **Category Theory Foundations**

Mathematical foundations provide systematic thinking:
- **Morphisms** - Words are transformations
- **Composition** - Concatenation is function composition
- **Inverses/Adjoints** - Systematic problem-solving patterns

**[Deep dive: Categorical Coding →](docs/philosophy/categorical-coding.md)**


### 2. **Easy Module Creation**

Wrap your existing code with simple decorators:
```typescript
@Word("( input -- output )", "Description")
async MY_WORD(input: any) { return yourCode(input); }
```

### 3. **Rich Standard Library**

Proven operations for clean data manipulation:
- **array** - MAP, SELECT, SORT, GROUP-BY, ZIP, REDUCE (30+ operations)
- **record** - REC@, <REC, MERGE, KEYS, VALUES
- **string** - SPLIT, JOIN, UPPERCASE, LOWERCASE, TRIM
- **math** - +, -, *, /, ROUND, ABS, MIN, MAX, AVERAGE
- **datetime** - >DATE, >DATETIME, ADD-DAYS, FORMAT
- **json** - >JSON, JSON>, JSON-PRETTIFY
- **boolean** - ==, <, >, AND, OR, NOT, IN

**[Module Reference →](docs/modules/)**

### 4. **Multi-Runtime Execution** 🌐

Call code across language boundaries seamlessly:
- TypeScript ↔ Python ↔ Ruby ↔ Rust
- Use the best library for each task
- Build polyglot microservices
- Migrate incrementally

**[Multi-Runtime Documentation →](docs/multi-runtime/)**

---

## Getting Started

### Choose Your Runtime

Start with the runtime that matches your project:

- **[TypeScript/JavaScript →](https://github.com/forthix/forthic-ts)** - `npm install @forthix/forthic`
- **[Python →](https://github.com/forthix/forthic-py)** - `pip install forthic-py`
- **[Ruby →](https://github.com/forthix/forthic-rb)** - `gem install forthic`

Each runtime repository includes:
- Installation instructions
- Getting started guide
- Runtime-specific examples
- API documentation

### Learn Core Concepts

- **[Core Concepts](docs/core-concepts.md)** - Module creation, composition, standard operations
- **[Why Forthic?](docs/why-forthic.md)** - Philosophy and motivation
- **[Getting Started Guide](docs/getting-started.md)** - Step-by-step tutorial

### Explore Multi-Runtime

- **[Multi-Runtime Overview](docs/multi-runtime/)** - Architecture and use cases
- **[Multi-Runtime Examples](docs/multi-runtime/examples.md)** - Real-world scenarios
- **[Integration Tests](https://github.com/forthix/forthic-integration-tests)** - Cross-runtime test suite

---

## Documentation

### Language & Concepts
- **[Why Forthic?](docs/why-forthic.md)** - Philosophy and motivation
- **[Core Concepts](docs/core-concepts.md)** - Module system, composition, standard operations
- **[Getting Started](docs/getting-started.md)** - Tutorial and first steps
- **[Language Guide](docs/language/)** - Syntax, stack operations, semantics

### Philosophy
- **[Categorical Coding](docs/philosophy/categorical-coding.md)** - Category Theory foundations
- **[History](HISTORY.md)** - From LinkedIn (1000+ apps) to open source

### Standard Library
- **[Module Documentation](docs/modules/)** - Complete reference for all standard operations
  - [array](docs/modules/standard_modules/array.md) - Collection operations
  - [record](docs/modules/standard_modules/record.md) - Object/dictionary manipulation
  - [string](docs/modules/standard_modules/string.md) - String transformation
  - [math](docs/modules/standard_modules/math.md) - Mathematical operations
  - [datetime](docs/modules/standard_modules/datetime.md) - Date/time handling
  - [json](docs/modules/standard_modules/json.md) - JSON serialization
  - [boolean](docs/modules/standard_modules/boolean.md) - Comparisons and logic
  - [core](docs/modules/standard_modules/core.md) - Stack and interpreter operations
  - [fs](docs/modules/standard_modules/fs.md) - File system operations (TypeScript)

### Multi-Runtime
- **[Multi-Runtime Overview](docs/multi-runtime/)** - Architecture, protocols, use cases
- **[Multi-Runtime Examples](docs/multi-runtime/examples.md)** - Cross-runtime scenarios
- **[gRPC Setup](docs/multi-runtime/grpc.md)** - Server-to-server communication
- **[WebSocket Setup](docs/multi-runtime/websocket.md)** - Browser-compatible communication
- **[Configuration](docs/multi-runtime/configuration.md)** - Connection management

---

## Philosophy

**Core beliefs:**
- Software is fundamentally about transformations and relationships
- Category Theory provides a systematic framework for viewing code
- Existing code should be composable, not rewritten
- Multi-runtime execution unlocks the best of each language ecosystem

**Categorical thinking encourages you to ask:**
- How do transformations compose?
- Can I think of what I want to do as a sequence of transformations?
- If I can't construct a sequence that solves my problem, are there systematic ways to extend/modify the problem so it can be solved?

**[Read the full philosophy →](docs/why-forthic.md)**

---

## Use Cases

Forthic excels at:
- **Data transformation pipelines** - Clean, composable ETL
- **Analytics and reporting** - High-level abstractions over data
- **Polyglot microservices** - Each service in its optimal language
- **Agentic architectures** - Composable agent behaviors
- **Domain-specific languages** - Wrapping business logic
- **Gradual migration** - Incrementally modernize systems

**[See multi-runtime examples →](docs/multi-runtime/examples.md)**

---

## Community & Support

- **Main Repository:** [github.com/forthix/forthic](https://github.com/forthix/forthic)
- **Discussions:** [GitHub Discussions](https://github.com/forthix/forthic/discussions)
- **Issues:** Report bugs or request features in runtime-specific repos

### Related Projects
- **[forthic-integration-tests](https://github.com/forthix/forthic-integration-tests)** - Cross-runtime test suite
- **[Forthix CLI](https://github.com/forthix/forthix-cli)** - Interactive REPL with live stack visualization

---

## Contributing

We welcome contributions! Each runtime has its own contributing guide:

- **[TypeScript Contributing](https://github.com/forthix/forthic-ts/blob/main/CONTRIBUTING.md)**
- **[Python Contributing](https://github.com/forthix/forthic-py/blob/main/CONTRIBUTING.md)**
- **[Ruby Contributing](https://github.com/forthix/forthic-rb/blob/main/CONTRIBUTING.md)**

For general philosophy and community guidelines, see [CONTRIBUTING.md](CONTRIBUTING.md).

---

## License

[BSD-2-Clause License](LICENSE) - Copyright 2024 LinkedIn Corporation. Copyright 2025 Forthix LLC.

---

**Forthic: Wrap. Compose. Abstract. Across Any Runtime.**
