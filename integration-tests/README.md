# Forthic Multi-Runtime Integration Tests

Cross-runtime integration tests for the gRPC-based multi-runtime implementation.

## Phase 1: "Hello World" Across Runtimes

Tests basic TypeScript → Python communication via gRPC.

## Phase 2: "Full Stack Exchange"

Tests complete stack transfer with all basic Forthic types and real interpreter execution.

### Prerequisites

1. **Install Python dependencies:**
   ```bash
   cd ../forthic-py
   make install-venv  # or make install-dev for system-wide
   make generate-grpc
   ```

2. **Install TypeScript dependencies:**
   ```bash
   cd ../forthic-ts
   npm install
   ```

### Running Phase 1 Tests

1. **Start the Python gRPC server** (in one terminal):
   ```bash
   cd ../forthic-py
   make grpc-server
   ```

2. **Run the test** (in another terminal):
   ```bash
   cd ../forthic-ts
   npx tsx ../forthic/integration-tests/test_phase1.ts
   ```

### Running Phase 2 Tests

1. **Start the Python gRPC server** (in one terminal):
   ```bash
   cd ../forthic-py
   make grpc-server
   ```

2. **Run the test** (in another terminal):
   ```bash
   cd ../forthic-ts
   npx tsx ../forthic/integration-tests/test_phase2.ts
   ```

### Running Phase 3 Tests

1. **Start the Python gRPC server** (in one terminal):
   ```bash
   cd ../forthic-py
   make grpc-server
   ```

   You should see:
   ```
   Forthic Python gRPC server listening on port 50051
   Phase 3: Stack-based execution + module discovery
   Features:
     - Full StandardInterpreter with all stdlib words
     - Runtime-specific module discovery (ListModules, GetModuleInfo)
     - Available runtime modules: pandas (if installed)
   ```

2. **Run the test** (in another terminal):
   ```bash
   cd ../forthic-ts
   npx tsx ../forthic/integration-tests/test_phase3.ts
   ```

### Expected Output

```
Phase 1 Integration Test: TypeScript → Python gRPC
============================================================

Test 1: DOUBLE word with value 21
  Input stack: [21]
  Result stack: [ 42 ]
  ✓ PASSED

Test 2: DOUBLE word with value 100
  Input stack: [100]
  Result stack: [ 200 ]
  ✓ PASSED

... (more tests)

============================================================
✓ All Phase 1 tests passed!

Success Criteria Met:
  ✓ Python server listening and responding
  ✓ TypeScript client connects successfully
  ✓ Can execute DOUBLE word and get correct results
  ✓ Basic int/string/bool serialization works
```

## Phase 1 Success Criteria

- ✅ Python server starts and listens
- ✅ TypeScript client connects
- ✅ Can execute DOUBLE word and get correct result
- ✅ Basic int/string/bool serialization works

## Phase 2 Success Criteria

- ✅ Can serialize/deserialize all basic Forthic types (int, float, string, bool, null, array, record)
- ✅ Python server executes real interpreter words (+, *, REVERSE, DUP, etc.)
- ✅ Full stack transfers correctly both directions
- ✅ Complex nested structures (arrays, records) work

## Phase 3 Success Criteria

- ✅ Can list runtime-specific modules (excludes standard library)
- ✅ Can get detailed module information with word list
- ✅ Word counts match between summary and detailed views
- ✅ Standard library modules are NOT discoverable
- ✅ Non-existent modules return appropriate errors
- ✅ Module discovery distinguishes between stdlib and runtime-specific modules

## Troubleshooting

### "Connection refused" error
- Make sure the Python server is running first
- Check that port 50051 is not in use by another process

### "Cannot find module" errors
- Make sure you've run `npm install` in `forthic-ts/`
- Make sure you've run `make install-venv` in `forthic-py/`

### "gRPC proto files not generated" error
- Run `make generate-grpc` in `forthic-py/`
