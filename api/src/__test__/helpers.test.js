const Helpers = require('../utils/helpers');

/**
 * Unitesting
 * uses the imported functions from src/utils/helpers.js
 * Test that emotion entry:
 *      cannot beging with a capital letter,
 *      is not longer than 50 chars,
 *      must be a string
 */

describe('testing the emotion entries', () => {
  test('emotion entry cannot  begin with capilal letter', () => {
    expect(Helpers.checkingEmoEntry('exited')).not.toMatch(/[A-Z]\w+/);
  });
  test('emotion entry is not longer than 50 characters', () => {
    expect(Helpers.checkingEmoEntry('mega mega mega mega happy')).toBeDefined();
  });
  test('emotion entry must be a string ', () => {
    expect(Helpers.checkingEmoEntry(33)).toBeFalsy();
  });
});
