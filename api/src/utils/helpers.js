const { v1: uuidv1 } = require('uuid');

const Helpers = {
  generateUUID: () => {
    const uuid = uuidv1();
    return uuid;
  },

  /**
   * checks if an emotion entry is not longer than 50 chars,
   * cannot beging with a capital letter,
   * must be a string
   * @params checkingEmoEntry: String
   * @returns a String
   */

  checkingEmoEntry: (a) => {
    if (a.length < 50 && typeof a === 'string') {
      return a;
    } else {
      false;
    }
  },
};
module.exports = Helpers;
