const { v1: uuidv1 } = require('uuid');

const Helpers = {
  generateUUID: () => {
    const uuid = uuidv1();
    return uuid;
  },

  /**
   * checks if a title is not longer than 100 chars,
   * must begining with capital letter
   * must be a string
   * @params: titleInput: String
   * returns a String
   */

  checkingTitle: (a) => {
    if (a.length < 100 && typeof a === 'string') {
      return a;
    } else {
      false;
    }
  },
};
// a.length < 4 &&
module.exports = Helpers;
