# Multi-Runtime Examples

**Real-world scenarios for cross-runtime execution**

---

## Example 1: Data Analysis with Python pandas from TypeScript

**Scenario:** You have a TypeScript web application that needs to perform complex data analysis using Python's pandas library.

### Setup

**Start Python server:**
```bash
cd forthic-py
python -m forthic.grpc.server
# Server listening on port 50051
```

### TypeScript Client

```typescript
import { Interpreter } from '@forthix/forthic';
import { GrpcClient, RemoteModule } from '@forthix/forthic/grpc';

async function analyzeUserData() {
  const interp = new Interpreter();

  // Connect to Python runtime
  const pythonClient = new GrpcClient('localhost:50051');
  const pandas = new RemoteModule('pandas', pythonClient, 'python');
  await pandas.initialize();

  interp.register_module(pandas);

  // Prepare data
  const userData = [
    { name: 'Alice', age: 30, score: 85 },
    { name: 'Bob', age: 25, score: 92 },
    { name: 'Charlie', age: 35, score: 78 },
    { name: 'Diana', age: 28, score: 95 }
  ];

  interp.stack_push(userData);

  // Use pandas from TypeScript!
  await interp.run(`
    ["pandas"] USE-MODULES

    # Convert to DataFrame
    DF-FROM-RECORDS

    # Calculate statistics
    DUP "score" DF-COLUMN-MEAN
    SWAP "age" DF-COLUMN-MEAN

    # Stack now has: [age_mean, score_mean]
  `);

  const scoreMean = interp.stack_pop();
  const ageMean = interp.stack_pop();

  console.log(`Average age: ${ageMean}`);
  console.log(`Average score: ${scoreMean}`);

  pythonClient.close();
}

analyzeUserData();
```

**Output:**
```
Average age: 29.5
Average score: 87.5
```

---

## Example 2: File System Operations from Ruby via TypeScript

**Scenario:** Ruby application needs to use TypeScript's file system utilities for complex path operations.

### Setup

**Start TypeScript server:**
```bash
cd forthic-ts
npm run grpc-server
# Server listening on port 50052
```

### Ruby Client

```ruby
require 'forthic'
require 'forthic/grpc/client'
require 'forthic/grpc/remote_runtime_module'

def check_project_structure
  interp = Forthic::Interpreter.new

  # Register remote runtime module
  remote_runtime = Forthic::Grpc::RemoteRuntimeModule.new
  interp.register_module(remote_runtime)

  interp.run(%{
    # Connect to TypeScript runtime
    "localhost:50052" CONNECT-RUNTIME

    # Load TypeScript fs module
    ["fs"] USE-TS-MODULES

    # Check if project files exist
    "/app/package.json" FILE-EXISTS?
    "/app/tsconfig.json" FILE-EXISTS?
    "/app/src" DIR-EXISTS?
  })

  src_exists = interp.stack_pop
  tsconfig_exists = interp.stack_pop
  package_exists = interp.stack_pop

  puts "package.json exists: #{package_exists}"
  puts "tsconfig.json exists: #{tsconfig_exists}"
  puts "src/ directory exists: #{src_exists}"

  all_exist = package_exists && tsconfig_exists && src_exists
  puts "\nProject structure valid: #{all_exist}"
end

check_project_structure
```

---

## Example 3: Three-Runtime Pipeline (TypeScript → Python → Ruby)

**Scenario:** A data pipeline that fetches data (TypeScript), processes it (Python), and generates a report (Ruby).

### Setup

**Terminal 1 - Python server:**
```bash
cd forthic-py
python -m forthic.grpc.server
# Port 50051
```

**Terminal 2 - TypeScript server:**
```bash
cd forthic-ts
npm run grpc-server
# Port 50052
```

**Terminal 3 - Ruby server:**
```bash
cd forthic-rb
ruby -I lib lib/forthic/grpc/server.rb
# Port 50053
```

### Orchestration (TypeScript)

```typescript
import { Interpreter } from '@forthix/forthic';
import { GrpcClient, RemoteModule } from '@forthix/forthic/grpc';

async function runPipeline() {
  const interp = new Interpreter();

  // Connect to Python for data processing
  const pythonClient = new GrpcClient('localhost:50051');
  const pandas = new RemoteModule('pandas', pythonClient, 'python');
  await pandas.initialize();
  interp.register_module(pandas);

  // Connect to Ruby for reporting
  const rubyClient = new GrpcClient('localhost:50053');
  const reporting = new RemoteModule('reporting', rubyClient, 'ruby');
  await reporting.initialize();
  interp.register_module(reporting);

  // Step 1: Fetch data (TypeScript)
  const rawData = await fetchFromAPI();
  interp.stack_push(rawData);

  // Step 2: Process with Python pandas
  await interp.run(`
    ["pandas"] USE-MODULES

    # Convert to DataFrame
    DF-FROM-RECORDS

    # Clean and transform
    "age" DF-COLUMN-MEAN
    SWAP
    "score" DF-COLUMN-MEAN
  `);

  const avgScore = interp.stack_pop();
  const avgAge = interp.stack_pop();

  // Step 3: Generate report with Ruby
  interp.stack_push({ avg_age: avgAge, avg_score: avgScore });

  await interp.run(`
    ["reporting"] USE-MODULES

    # Generate formatted report
    GENERATE-REPORT
    EMAIL-STAKEHOLDERS
  `);

  console.log('Pipeline complete!');

  pythonClient.close();
  rubyClient.close();
}

async function fetchFromAPI() {
  return [
    { name: 'Alice', age: 30, score: 85 },
    { name: 'Bob', age: 25, score: 92 }
  ];
}

runPipeline();
```

---

## Example 4: WebSocket Communication (Browser → Rails)

**Scenario:** Browser-based dashboard that calls Ruby backend via WebSocket (ActionCable).

### Rails Server Setup

```ruby
# app/channels/forthic_channel.rb
class ForthicChannel < ApplicationCable::Channel
  def subscribed
    stream_from "forthic_#{current_user.id}"
  end

  def execute(data)
    interp = Forthic::Interpreter.new
    # Register your custom modules
    interp.register_module(AnalyticsModule.new)

    interp.run(data['code'])
    result = interp.stack_pop

    transmit({ result: result })
  end
end
```

### Browser Client

```html
<!DOCTYPE html>
<html>
<head>
  <title>Forthic Dashboard</title>
</head>
<body>
  <h1>Analytics Dashboard</h1>
  <button id="runAnalysis">Run Analysis</button>
  <pre id="results"></pre>

  <script type="module">
    import { Interpreter } from 'https://unpkg.com/@forthix/forthic';
    import { ActionCableClient, WebSocketRemoteModule } from 'https://unpkg.com/@forthix/forthic/websocket';

    // Connect to Rails via ActionCable
    const cable = new ActionCableClient('ws://localhost:3000/cable');
    const analytics = new WebSocketRemoteModule('analytics', cable);
    await analytics.initialize();

    const interp = new Interpreter();
    interp.register_module(analytics);

    document.getElementById('runAnalysis').addEventListener('click', async () => {
      await interp.run(`
        ["analytics"] USE-MODULES

        # Call Ruby analytics module from browser
        "2025-01-01" "2025-01-31" DATE-RANGE
        FETCH-METRICS
        CALCULATE-TRENDS
      `);

      const trends = interp.stack_pop();
      document.getElementById('results').textContent = JSON.stringify(trends, null, 2);
    });
  </script>
</body>
</html>
```

---

## Example 5: Rust Performance Module from Python

**Scenario:** Python data processing pipeline calls Rust for performance-critical operations.

### Rust Server (Coming Soon)

```bash
cd forthic-rs
cargo run --bin forthic-grpc-server
# Port 50054
```

### Python Client

```python
from forthic import Interpreter
from forthic.grpc import GrpcClient, RemoteModule

async def process_large_dataset():
    interp = Interpreter()

    # Connect to Rust runtime for performance
    rust_client = GrpcClient('localhost:50054')
    image_processing = RemoteModule('image_processing', rust_client, 'rust')
    await image_processing.initialize()

    interp.register_module(image_processing)

    # Large image dataset
    images = load_images_from_disk()
    interp.stack_push(images)

    # Use Rust for fast image processing
    await interp.run("""
        ["image_processing"] USE-MODULES

        # Rust processes images 10x faster
        BATCH-RESIZE
        APPLY-FILTERS
        EXTRACT-FEATURES
    """)

    features = interp.stack_pop()
    print(f"Extracted features from {len(features)} images")

    rust_client.close()
```

---

## Example 6: Custom Module Cross-Runtime

**Scenario:** Create a custom analytics module in Python and use it from TypeScript.

### Python Custom Module

```python
# custom_analytics.py
from forthic import DecoratedModule, ForthicWord

class CustomAnalyticsModule(DecoratedModule):
    def __init__(self):
        super().__init__("custom_analytics")

    @ForthicWord("( data -- outliers )", "Detect outliers using IQR method")
    async def DETECT_OUTLIERS(self, data):
        import numpy as np
        q1 = np.percentile(data, 25)
        q3 = np.percentile(data, 75)
        iqr = q3 - q1
        lower_bound = q1 - (1.5 * iqr)
        upper_bound = q3 + (1.5 * iqr)
        outliers = [x for x in data if x < lower_bound or x > upper_bound]
        return outliers

    @ForthicWord("( data -- normalized )", "Normalize data to 0-1 range")
    async def NORMALIZE(self, data):
        min_val = min(data)
        max_val = max(data)
        return [(x - min_val) / (max_val - min_val) for x in data]
```

### Python Server

```python
# server.py
from forthic.grpc import start_server
from custom_analytics import CustomAnalyticsModule

if __name__ == '__main__':
    # Start server with custom module
    start_server(
        port=50051,
        additional_modules=[CustomAnalyticsModule()]
    )
```

### TypeScript Client

```typescript
import { Interpreter } from '@forthix/forthic';
import { GrpcClient, RemoteModule } from '@forthix/forthic/grpc';

async function useCustomModule() {
  const interp = new Interpreter();

  const pythonClient = new GrpcClient('localhost:50051');
  const analytics = new RemoteModule('custom_analytics', pythonClient, 'python');
  await analytics.initialize();

  interp.register_module(analytics);

  const data = [1, 2, 3, 100, 4, 5, 6, 200, 7, 8];
  interp.stack_push(data);

  await interp.run(`
    ["custom_analytics"] USE-MODULES

    # Use custom Python module from TypeScript
    DUP DETECT-OUTLIERS
    SWAP NORMALIZE
  `);

  const normalized = interp.stack_pop();
  const outliers = interp.stack_pop();

  console.log('Outliers:', outliers);    // [100, 200]
  console.log('Normalized:', normalized);

  pythonClient.close();
}

useCustomModule();
```

---

## Example 7: Batched Execution for Performance

**Scenario:** Optimize multi-runtime calls by batching operations.

```typescript
import { Interpreter } from '@forthix/forthic';
import { GrpcClient, RemoteModule } from '@forthix/forthic/grpc';

async function batchProcessing() {
  const interp = new Interpreter();

  const pythonClient = new GrpcClient('localhost:50051');
  const pandas = new RemoteModule('pandas', pythonClient, 'python');
  await pandas.initialize();

  interp.register_module(pandas);

  // Inefficient: Multiple round trips
  for (const record of records) {
    interp.stack_push(record);
    await interp.run(`["pandas"] USE-MODULES PROCESS-RECORD`);
  }

  // Efficient: Single round trip
  interp.stack_push(records);  // Push entire array
  await interp.run(`
    ["pandas"] USE-MODULES
    DF-FROM-RECORDS
    PROCESS-BATCH
  `);

  pythonClient.close();
}
```

---

## Best Practices

### 1. Connection Management

```typescript
// Reuse clients
const pythonClient = new GrpcClient('localhost:50051');

// Multiple modules, same client
const pandas = new RemoteModule('pandas', pythonClient, 'python');
const numpy = new RemoteModule('numpy', pythonClient, 'python');

// Close when done
pythonClient.close();
```

### 2. Error Handling

```typescript
try {
  await interp.run(`["pandas"] USE-MODULES RISKY-OPERATION`);
} catch (error) {
  console.error('Remote execution failed:', error.message);
  // error contains stack trace from Python
}
```

### 3. Timeout Configuration

```typescript
const client = new GrpcClient('localhost:50051', {
  timeout: 30000  // 30 seconds for long-running operations
});
```

### 4. Debug Mode

```typescript
const client = new GrpcClient('localhost:50051', { debug: true });
// Logs all gRPC calls and responses
```

---

## Learn More

- **[Multi-Runtime Overview](README.md)** - Architecture and concepts
- **[gRPC Setup](grpc.md)** - Server and client configuration
- **[WebSocket Setup](websocket.md)** - Browser-compatible communication
- **[Configuration](configuration.md)** - YAML config and connection management

---

**These examples demonstrate the power of multi-runtime execution** - combining the best libraries and tools from each language ecosystem into cohesive applications.
