const Helpers = require('../utils/helpers');

describe('testing the titles', () => {
  test('title must start with capilal letter', () => {
    expect(Helpers.checkingTitle('Title')).toMatch(/[A-Z]\w+/);
  });
  test('not longer than 50 letter ', () => {
    expect(Helpers.checkingTitle('Title name')).toBeDefined();
  });
  test('must be astring ', () => {
    expect(Helpers.checkingTitle(33)).toBeFalsy();
  });
});
