const assert = require('assert');
const { deepMerge } = require('./deepMerge');

// Test Suite: deepMerge

// Scenario 1: Merging simple (non-nested) properties
function testSimpleMerge() {
  const target = { a: 1, b: 2 };
  const source = { b: 20, c: 30 };
  const result = deepMerge(target, source);

  assert.deepStrictEqual(result, { a: 1, b: 20, c: 30 });
  console.log('✓ Test 1 Passed: Simple non-nested properties merged correctly');
}

// Scenario 2: Merging deeply nested objects
function testDeepNestedMerge() {
  const target = {
    user: {
      name: 'Alice',
      settings: { theme: 'dark', notifications: true }
    },
    version: 1
  };

  const source = {
    user: {
      settings: { theme: 'light', sound: false },
      role: 'admin'
    }
  };

  const result = deepMerge(target, source);

  assert.deepStrictEqual(result, {
    user: {
      name: 'Alice',
      settings: { theme: 'light', notifications: true, sound: false },
      role: 'admin'
    },
    version: 1
  });
  console.log('✓ Test 2 Passed: Deeply nested objects recursively merged without overwriting sibling keys');
}

// Run tests
try {
  testSimpleMerge();
  testDeepNestedMerge();
  console.log('\nAll unit tests passed successfully!');
} catch (err) {
  console.error('Test failed:', err);
  process.exit(1);
}
