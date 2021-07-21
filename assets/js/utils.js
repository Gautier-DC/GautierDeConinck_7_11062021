/**
 * Clean all specials characters and capslock from strings
 * @param {string} str 
 * @returns the cleaned string
 */
export const cleanUpString = (str) => {
    let handledStr = str.toLowerCase();
    handledStr = handledStr.normalize('NFD').replace(/\p{Diacritic}/gu, "");
    return handledStr;
  };