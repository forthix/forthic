# Multi-Runtime Execution

**Call code seamlessly across TypeScript, Python, Ruby, Rust, and more**

---

## Overview

One of Forthic's most powerful capabilities is **multi-runtime execution** - the ability to call code implemented in one language from another language, transparently.

Want to use Python's pandas from TypeScript? Call Ruby gems from Python? Access Node.js file system operations from Ruby? **Multi-runtime makes it possible.**

---

## Why Multi-Runtime?

### 1. **Use the Best Tool for Each Job**

Different languages excel at different tasks:
- **Python** - Data science, ML, scientific computing (numpy, pandas, scikit-learn)
- **TypeScript** - Web applications, modern JS ecosystem, async operations
- **Ruby** - Rails applications, DSLs, elegant APIs
- **Rust** - Performance-critical operations, systems programming

Multi-runtime lets you combine these strengths in a single application.

### 2. **Leverage Existing Ecosystems**

Don't rewrite functionality that exists in another language - just call it:
- Use Python's rich data science libraries from any runtime
- Access Node.js's vast npm ecosystem from Ruby or Python
- Call Rust's high-performance code from TypeScript

### 3. **Incremental Migration**

Migrate systems gradually:
- Keep critical components in their original language
- Add new features in a different runtime
- Refactor incrementally without a "big bang" rewrite

### 4. **Polyglot Teams**

Teams can work in their preferred languages while building cohesive systems.

---

## How It Works

### Architecture

Forthic multi-runtime uses **gRPC** and **WebSocket** protocols to enable cross-runtime communication:

```
┌─────────────┐                    ┌─────────────┐
│ TypeScript  │ ◄─── gRPC/WS ───► │   Python    │
│  Runtime    │                    │   Runtime   │
└─────────────┘                    └─────────────┘
       │                                  │
       │                                  │
       ▼                                  ▼
┌─────────────┐                    ┌─────────────┐
│    Ruby     │ ◄─── gRPC/WS ───► │    Rust     │
│  Runtime    │                    │   Runtime   │
└─────────────┘                    └─────────────┘
```

### Communication Protocols

**gRPC** (Server-to-Server)
- Fast, efficient binary protocol
- Ideal for backend services
- TypeScript ↔ Python ↔ Ruby ↔ Rust
- Full async/await support

**WebSocket** (Client-to-Server)
- Browser-compatible
- Real-time communication
- Browser ↔ Rails (ActionCable)
- Event-driven architecture

---

## Quick Start

### Example: TypeScript → Python

**1. Start Python gRPC server:**

```bash
cd forthic-py
python -m forthic.grpc.server
```

**2. Connect from TypeScript:**

```typescript
import { Interpreter } from '@forthix/forthic';
import { GrpcClient, RemoteModule } from '@forthix/forthic/grpc';

const interp = new Interpreter();

// Connect to Python runtime
const client = new GrpcClient('localhost:50051');
const pandas = new RemoteModule('pandas', client, 'python');
await pandas.initialize();

interp.register_module(pandas);

// Use Python pandas from TypeScript!
await interp.run(`
  ["pandas"] USE-MODULES

  [
    [[.name "Alice"] [.age 30]] REC
    [[.name "Bob"]   [.age 25]] REC
  ] DF-FROM-RECORDS

  DF-TO-RECORDS
`);

const result = interp.stack_pop();
console.log(result);
```

### Example: Ruby → TypeScript

**1. Start TypeScript gRPC server:**

```bash
cd forthic-ts
npm run grpc-server
```

**2. Connect from Ruby:**

```ruby
require 'forthic'
require 'forthic/grpc/client'
require 'forthic/grpc/remote_runtime_module'

interp = Forthic::Interpreter.new

# Register remote runtime module
remote_runtime = Forthic::Grpc::RemoteRuntimeModule.new
interp.register_module(remote_runtime)

interp.run(%{
  # Connect to TypeScript runtime
  "localhost:50052" CONNECT-RUNTIME

  # Load TypeScript fs module
  ["fs"] USE-TS-MODULES

  # Use TypeScript file operations from Ruby!
  "/tmp/test.txt" FILE-EXISTS?
})

result = interp.stack_pop
puts "File exists: #{result}"
```

---

## Communication Approaches

### gRPC (Recommended for Server-to-Server)

**Advantages:**
- High performance (binary protocol)
- Strong typing (Protocol Buffers)
- Bidirectional streaming
- Multi-language support

**Use Cases:**
- Microservices architecture
- Backend data processing
- Server-to-server communication
- Performance-critical operations

**Setup:**
- [gRPC Server Setup](grpc.md#server-setup)
- [gRPC Client Setup](grpc.md#client-setup)
- [Configuration](configuration.md)

### WebSocket (Browser-Compatible)

**Advantages:**
- Works in browsers
- Real-time updates
- Event-driven
- Rails ActionCable integration

**Use Cases:**
- Browser applications
- Real-time dashboards
- Interactive web apps
- Rails ↔ Browser communication

**Setup:**
- [WebSocket Server Setup](websocket.md#server-setup)
- [WebSocket Client Setup](websocket.md#client-setup)
- [ActionCable Integration](websocket.md#actioncable)

---

## Runtime Status

| Runtime | gRPC Server | gRPC Client | WebSocket | Status |
|---------|-------------|-------------|-----------|--------|
| **TypeScript** | ✅ | ✅ | ✅ | Production |
| **Python** | ✅ | ✅ | ✅ | Production |
| **Ruby** | ✅ | ✅ | ✅ | Production |
| **Rust** | 🚧 | 🚧 | ❌ | In Progress |
| **Swift** | 📋 | 📋 | ❌ | Planned |
| **Java** | 📋 | 📋 | 📋 | Planned |

---

## Common Patterns

### Pattern 1: Data Processing Pipeline

**Use Python for data processing, TypeScript for API:**

```typescript
// TypeScript API server
app.post('/analyze', async (req, res) => {
  const interp = new Interpreter();
  const pythonClient = new GrpcClient('localhost:50051');
  const pandas = new RemoteModule('pandas', pythonClient, 'python');

  await interp.run(`
    request-data
    ["pandas"] USE-MODULES
    DF-FROM-RECORDS
    "age" COLUMN-MEAN
  `);

  res.json({ mean_age: interp.stack_pop() });
});
```

### Pattern 2: Polyglot Microservices

**Each service in its optimal language:**

```
┌──────────────────┐
│   Rails App      │  ← User requests
│   (Ruby)         │
└────────┬─────────┘
         │
         ├─► ┌──────────────────┐
         │   │  Analytics       │
         │   │  (Python)        │
         │   └──────────────────┘
         │
         ├─► ┌──────────────────┐
         │   │  Real-time API   │
         │   │  (TypeScript)    │
         │   └──────────────────┘
         │
         └─► ┌──────────────────┐
             │  Image Processing│
             │  (Rust)          │
             └──────────────────┘
```

### Pattern 3: Gradual Migration

**Keep existing code, add new features in another runtime:**

```ruby
# Existing Ruby code
class LegacyReport
  def generate
    # Complex legacy logic
  end
end

# New Python analytics
interp.run(%{
  "localhost:50051" CONNECT-RUNTIME
  ["pandas"] USE-PY-MODULES

  legacy-data
  DF-FROM-RECORDS
  NEW-ML-MODEL-PREDICT
})
```

---

## Performance Considerations

### When to Use Multi-Runtime

**Good Use Cases:**
- ✅ Long-running operations (data processing, ML inference)
- ✅ Batch processing
- ✅ Leveraging specialized libraries
- ✅ Microservices architecture

**Less Suitable:**
- ❌ Hot loops (use native code)
- ❌ Microsecond-latency requirements
- ❌ Simple operations available in all runtimes

### Optimization Tips

1. **Batch operations** - Send multiple items at once
2. **Cache connections** - Reuse gRPC clients
3. **Use async** - Don't block waiting for responses
4. **Profile** - Measure before optimizing

---

## Security

### Authentication

Each runtime can implement authentication:

```typescript
// TypeScript server with auth
const server = new GrpcServer({
  port: 50052,
  authToken: process.env.GRPC_AUTH_TOKEN
});
```

```ruby
# Ruby client with auth
client = Forthic::Grpc::Client.new('localhost:50052', {
  auth_token: ENV['GRPC_AUTH_TOKEN']
})
```

### Network Security

- **Use TLS** for production
- **Firewall rules** to restrict access
- **VPC/private networks** for cloud deployments

---

## Debugging

### Enable Debug Logging

**TypeScript:**
```typescript
const client = new GrpcClient('localhost:50051', { debug: true });
```

**Python:**
```python
logging.basicConfig(level=logging.DEBUG)
```

**Ruby:**
```ruby
Forthic.logger.level = Logger::DEBUG
```

### Common Issues

**Connection Refused:**
- Check server is running
- Verify port number
- Check firewall rules

**Module Not Found:**
- Ensure module is registered on server
- Check module name spelling
- Verify runtime has the module installed

**Serialization Errors:**
- Check data types are supported
- Review protocol buffer definitions
- Test with simple data first

---

## Examples

See detailed examples in:
- [Multi-Runtime Examples](examples.md)
- [TypeScript Examples](https://github.com/forthix/forthic-ts/tree/main/examples)
- [Python Examples](https://github.com/forthix/forthic-py/tree/main/examples)
- [Ruby Examples](https://github.com/forthix/forthic-rb/tree/main/examples)

---

## Learn More

- **[gRPC Setup Guide](grpc.md)** - Detailed server and client configuration
- **[WebSocket Setup Guide](websocket.md)** - Browser-compatible communication
- **[Configuration Guide](configuration.md)** - YAML config and connection management
- **[Examples](examples.md)** - Real-world multi-runtime scenarios
- **[Integration Tests](https://github.com/forthix/forthic-integration-tests)** - Cross-runtime test suite

---

**Multi-runtime execution is what makes Forthic unique** - combining the best of each language ecosystem in a composable, elegant way.
