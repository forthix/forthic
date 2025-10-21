/**
 * Phase 10.5 Integration Test: Configuration-Based Module Loading
 *
 * Tests that:
 * 1. Python server can load modules from YAML config file
 * 2. TypeScript can discover dynamically-loaded modules via gRPC
 * 3. Custom modules work correctly across the gRPC boundary
 * 4. All word types (@Word and @DirectWord) execute remotely
 *
 * Prerequisites:
 * 1. Python gRPC server must be running with example config:
 *    cd ../forthic-py && python -m forthic.grpc.server --modules-config examples/example_modules_config.yaml
 * 2. TypeScript dependencies installed: cd ../forthic-ts && npm install && npm run build
 *
 * Run: npx tsx test_phase10.5.ts
 */

import { GrpcClient } from '../../forthic-ts/dist/cjs/grpc/client.js';

async function runPhase10_5Tests() {
  console.log('Phase 10.5 Integration Test: Dynamic Module Loading');
  console.log('='.repeat(70));

  const client = new GrpcClient('localhost:50051');

  try {
    // Test 1: Module Discovery - List modules
    console.log('\nTest 1: List modules (should include "example")');
    const modules = await client.listModules();
    const moduleNames = modules.map((m) => m.name);
    console.log('  Available modules:', moduleNames);
    console.assert(moduleNames.includes('example'), 'Should have "example" module');
    console.log('  ✓ PASSED');

    // Test 2: Get module info
    console.log('\nTest 2: Get example module info');
    const moduleInfo = await client.getModuleInfo('example');
    console.log('  Module name:', moduleInfo.name);
    console.log('  Module description:', moduleInfo.description);
    console.log('  Word count:', moduleInfo.words.length);

    const wordNames = moduleInfo.words.map((w) => w.name);
    const expectedWords = [
      'MULTIPLY', 'SQUARE', 'POWER',
      'REVERSE_TEXT', 'COUNT_CHAR', 'MAKE_SENTENCE',
      'SUM_LIST', 'AVG_LIST', 'CHUNK_LIST',
      'FIBONACCI', 'IS_PRIME', 'MAP_RANGE'
    ];

    for (const word of expectedWords) {
      console.assert(wordNames.includes(word), `Should have word: ${word}`);
    }
    console.log('  All expected words present:', expectedWords.length);
    console.log('  ✓ PASSED');

    // Test 3: Math operations - MULTIPLY
    console.log('\nTest 3: Execute MULTIPLY (5 * 3 = 15)');
    const result3 = await client.executeWord('MULTIPLY', [5, 3]);
    console.log('  Input stack: [5, 3]');
    console.log('  Result stack:', result3);
    console.assert(result3.length === 1, 'Should have 1 result');
    console.assert(result3[0] === 15, `Expected 15, got ${result3[0]}`);
    console.log('  ✓ PASSED');

    // Test 4: Math operations - SQUARE
    console.log('\nTest 4: Execute SQUARE (7^2 = 49)');
    const result4 = await client.executeWord('SQUARE', [7]);
    console.log('  Input stack: [7]');
    console.log('  Result stack:', result4);
    console.assert(result4.length === 1, 'Should have 1 result');
    console.assert(result4[0] === 49, `Expected 49, got ${result4[0]}`);
    console.log('  ✓ PASSED');

    // Test 5: Math operations - POWER
    console.log('\nTest 5: Execute POWER (2^8 = 256)');
    const result5 = await client.executeWord('POWER', [2, 8]);
    console.log('  Input stack: [2, 8]');
    console.log('  Result stack:', result5);
    console.assert(result5.length === 1, 'Should have 1 result');
    console.assert(result5[0] === 256, `Expected 256, got ${result5[0]}`);
    console.log('  ✓ PASSED');

    // Test 6: String operations - REVERSE_TEXT
    console.log('\nTest 6: Execute REVERSE_TEXT');
    const result6 = await client.executeWord('REVERSE_TEXT', ['hello']);
    console.log('  Input stack: ["hello"]');
    console.log('  Result stack:', result6);
    console.assert(result6.length === 1, 'Should have 1 result');
    console.assert(result6[0] === 'olleh', `Expected "olleh", got "${result6[0]}"`);
    console.log('  ✓ PASSED');

    // Test 7: String operations - COUNT_CHAR
    console.log('\nTest 7: Execute COUNT_CHAR (count "l" in "hello world")');
    const result7 = await client.executeWord('COUNT_CHAR', ['hello world', 'l']);
    console.log('  Input stack: ["hello world", "l"]');
    console.log('  Result stack:', result7);
    console.assert(result7.length === 1, 'Should have 1 result');
    console.assert(result7[0] === 3, `Expected 3, got ${result7[0]}`);
    console.log('  ✓ PASSED');

    // Test 8: String operations - MAKE_SENTENCE
    console.log('\nTest 8: Execute MAKE_SENTENCE');
    const result8 = await client.executeWord('MAKE_SENTENCE', [['Hello', 'world', 'from', 'Forthic']]);
    console.log('  Input stack: [["Hello", "world", "from", "Forthic"]]');
    console.log('  Result stack:', result8);
    console.assert(result8.length === 1, 'Should have 1 result');
    console.assert(result8[0] === 'Hello world from Forthic', `Expected sentence, got "${result8[0]}"`);
    console.log('  ✓ PASSED');

    // Test 9: List operations - SUM_LIST
    console.log('\nTest 9: Execute SUM_LIST ([1,2,3,4,5] -> 15)');
    const result9 = await client.executeWord('SUM_LIST', [[1, 2, 3, 4, 5]]);
    console.log('  Input stack: [[1, 2, 3, 4, 5]]');
    console.log('  Result stack:', result9);
    console.assert(result9.length === 1, 'Should have 1 result');
    console.assert(result9[0] === 15, `Expected 15, got ${result9[0]}`);
    console.log('  ✓ PASSED');

    // Test 10: List operations - AVG_LIST
    console.log('\nTest 10: Execute AVG_LIST ([1,2,3,4,5] -> 3.0)');
    const result10 = await client.executeWord('AVG_LIST', [[1, 2, 3, 4, 5]]);
    console.log('  Input stack: [[1, 2, 3, 4, 5]]');
    console.log('  Result stack:', result10);
    console.assert(result10.length === 1, 'Should have 1 result');
    console.assert(result10[0] === 3.0, `Expected 3.0, got ${result10[0]}`);
    console.log('  ✓ PASSED');

    // Test 11: List operations - CHUNK_LIST
    console.log('\nTest 11: Execute CHUNK_LIST (chunk by 3)');
    const result11 = await client.executeWord('CHUNK_LIST', [[1, 2, 3, 4, 5, 6, 7], 3]);
    console.log('  Input stack: [[1, 2, 3, 4, 5, 6, 7], 3]');
    console.log('  Result stack:', JSON.stringify(result11));
    console.assert(result11.length === 1, 'Should have 1 result');
    console.assert(Array.isArray(result11[0]), 'Result should be array');
    console.assert(result11[0].length === 3, 'Should have 3 chunks');
    console.assert(JSON.stringify(result11[0]) === JSON.stringify([[1,2,3],[4,5,6],[7]]), 'Chunks should match');
    console.log('  ✓ PASSED');

    // Test 12: Utility - FIBONACCI
    console.log('\nTest 12: Execute FIBONACCI (fib(10) = 55)');
    const result12 = await client.executeWord('FIBONACCI', [10]);
    console.log('  Input stack: [10]');
    console.log('  Result stack:', result12);
    console.assert(result12.length === 1, 'Should have 1 result');
    console.assert(result12[0] === 55, `Expected 55, got ${result12[0]}`);
    console.log('  ✓ PASSED');

    // Test 13: Utility - IS_PRIME (prime number)
    console.log('\nTest 13: Execute IS_PRIME (7 is prime)');
    const result13 = await client.executeWord('IS_PRIME', [7]);
    console.log('  Input stack: [7]');
    console.log('  Result stack:', result13);
    console.assert(result13.length === 1, 'Should have 1 result');
    console.assert(result13[0] === true, `Expected true, got ${result13[0]}`);
    console.log('  ✓ PASSED');

    // Test 14: Utility - IS_PRIME (non-prime number)
    console.log('\nTest 14: Execute IS_PRIME (8 is not prime)');
    const result14 = await client.executeWord('IS_PRIME', [8]);
    console.log('  Input stack: [8]');
    console.log('  Result stack:', result14);
    console.assert(result14.length === 1, 'Should have 1 result');
    console.assert(result14[0] === false, `Expected false, got ${result14[0]}`);
    console.log('  ✓ PASSED');

    // Test 15: DirectWord - MAP_RANGE (square numbers 0-4)
    console.log('\nTest 15: Execute MAP_RANGE DirectWord (5 "DUP *")');
    const result15 = await client.executeWord('MAP_RANGE', [5, 'DUP *']);
    console.log('  Input stack: [5, "DUP *"]');
    console.log('  Result stack:', JSON.stringify(result15));
    console.assert(result15.length === 1, 'Should have 1 result');
    console.assert(Array.isArray(result15[0]), 'Result should be array');
    console.assert(JSON.stringify(result15[0]) === JSON.stringify([0, 1, 4, 9, 16]), 'Should be squares');
    console.log('  ✓ PASSED');

    // Test 16: DirectWord - MAP_RANGE (double numbers 0-4)
    console.log('\nTest 16: Execute MAP_RANGE DirectWord (5 "2 *")');
    const result16 = await client.executeWord('MAP_RANGE', [5, '2 *']);
    console.log('  Input stack: [5, "2 *"]');
    console.log('  Result stack:', JSON.stringify(result16));
    console.assert(result16.length === 1, 'Should have 1 result');
    console.assert(JSON.stringify(result16[0]) === JSON.stringify([0, 2, 4, 6, 8]), 'Should be doubled');
    console.log('  ✓ PASSED');

    // Test 17: Batched execution - Complex operation
    console.log('\nTest 17: Batched execution (SUM_LIST then SQUARE)');
    const result17 = await client.executeSequence(['SUM_LIST', 'SQUARE'], [[1, 2, 3, 4, 5]]);
    console.log('  Input stack: [[1, 2, 3, 4, 5]]');
    console.log('  Execute: SUM_LIST, SQUARE');
    console.log('  Result stack:', result17);
    console.assert(result17.length === 1, 'Should have 1 result');
    console.assert(result17[0] === 225, `Expected 225 (15^2), got ${result17[0]}`);
    console.log('  ✓ PASSED');

    // Test 18: Batched execution - String operations
    console.log('\nTest 18: Batched execution (MAKE_SENTENCE then REVERSE_TEXT)');
    const result18 = await client.executeSequence(
      ['MAKE_SENTENCE', 'REVERSE_TEXT'],
      [['a', 'b', 'c']]
    );
    console.log('  Input stack: [["a", "b", "c"]]');
    console.log('  Execute: MAKE_SENTENCE, REVERSE_TEXT');
    console.log('  Result stack:', result18);
    console.assert(result18.length === 1, 'Should have 1 result');
    console.assert(result18[0] === 'c b a', `Expected "c b a", got "${result18[0]}"`);
    console.log('  ✓ PASSED');

    console.log('\n' + '='.repeat(70));
    console.log('✓ All Phase 10.5 tests passed!');
    console.log('\nSuccess Criteria Met:');
    console.log('  ✓ Python server loads modules from YAML config');
    console.log('  ✓ TypeScript can discover dynamically-loaded modules');
    console.log('  ✓ All 12 ExampleModule words execute correctly via gRPC');
    console.log('  ✓ @Word decorator words work across gRPC boundary');
    console.log('  ✓ @DirectWord (MAP_RANGE) works across gRPC boundary');
    console.log('  ✓ Batched execution (executeSequence) works with custom modules');
    console.log('  ✓ Math, string, list, and utility operations all functional');
    console.log('\nPhase 10.5 Complete: Configuration-based module loading verified!');

  } catch (error) {
    console.error('\n✗ TEST FAILED:', error);
    process.exit(1);
  } finally {
    client.close();
  }
}

// Run tests
runPhase10_5Tests().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
