const Helpers = require('../utils/helpers');

// users kunnen een title sturen, maar die moet beginnen met een hoofdletter,
// niet langer zijn dan 50 tekens, en effectief een string zijn
//in: parameter "title"
// out is string (alles goed), of false (fouten)

describe('testing the titles', () => {
  test('title must start with capilal letter', () => {
    expect(Helpers.checkingTitle('Title')).toMatch(/[A-Z]\w+/);
  });
  test('not longer than 50 letter & must be a string', () => {
    expect(Helpers.checkingTitle('title string')).toBeDefined();
  });
  test('return is string ', () => {
    expect(Helpers.checkingTitle(33)).toBeFalsy();
  });
});
