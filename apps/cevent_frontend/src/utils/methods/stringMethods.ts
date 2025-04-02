/**
 * Capitalize the first letter of a word
 * @param word string to capitalize
 * @returns string with the first letter capitalized
 */
export function capitalizeFirstLetter(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

/**
 * Format a date to a string
 *
 * @param date Date to format
 * @returns  A string with the date formatted as "Month Day, Year"
 */
export const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
  });
};

export const fullFormatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
};
/**
 * Cut the last words of a string by commas
 * @param text sentence with commas to cut
 * @param numberCommas number sentences to conserve in the string starting from the end
 */
export const cutByComma = (text: string, numberCommas: number): string => {
  const words = text.split(',');
  if (words.length > numberCommas) {
    return words.slice(words.length - numberCommas).join(',');
  }
  return 'no';
};

/**
 * Extract a word from a string by commas
 * @param text sentence with commas to extract
 * @param numberWord number of the word to extract starting from the end
 * @returns
 */
export const extractWordByComma = (
  text: string,
  numberWord: number,
): string => {
  const words = text.split(',');
  if (words.length >= numberWord - 1) {
    const word = words[words.length - numberWord];

    return words.length > 1 ? word : extractWordBySpace(text, numberWord);
  }
  return text;
};

/**
 * Extract a word from a string by space
 * @param text sentence with spaces to extract
 * @param numberWord number of the word to extract starting from the end
 *
 * @returns
 *
 */
export const extractWordBySpace = (
  text: string,
  numberWord: number,
): string => {
  const words = text.split(' ');
  if (words.length >= numberWord - 1) {
    const word = words[words.length - numberWord];

    return word !== '' && word !== null! ? word : 'no';
  }
  return text;
};

/**
 * Truncate a text to a maximum length
 *
 * @param text text to truncate
 * @param maxLength max number of characters to keep
 * @returns text cut to the max length
 */
export const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + '...';
};
