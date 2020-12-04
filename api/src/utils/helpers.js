const { v1: uuidv1 } = require('uuid');

const Helpers = {
  generateUUID: () => {
    const uuid = uuidv1();
    return uuid;
  },
  // users kunnen een title sturen, maar die moet beginnen met een hoofdletter,
  // niet langer zijn dan 50 tekens, en effectief een string zijn
  //in: parameter "title"
  // out is string (alles goed), of false (fouten)
  checkingTitle: (a) => {
    if (a.length < 50 && typeof a === 'string') {
      return a;
    } else {
      false;
    }
  },
};
// a.length < 4 &&
module.exports = Helpers;
