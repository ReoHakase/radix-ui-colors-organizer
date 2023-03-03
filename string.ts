// Converts a camel case string to an array of lowered words
export const camelCaseToWords = (str: string): string[] => {
  return str
    .split(/(?=[A-Z])/)
    .map((word) => word.toLowerCase())
    .filter((word) => word !== "");
};

// Converts an array of words to a camel case string
export const wordsToCamelCase = (words: string[]): string => {
  return words
    .filter((word) => word.length > 0)
    .map((word, index) => {
      if (index === 0) {
        return word;
      }
      return word[0].toUpperCase() + word.slice(1);
    })
    .join("");
};

// Extract the numbers in string and return them as an array of numbers
// The numbers may include decimals
export const extractNumbers = (str: string): number[] => {
  const numbers = str.match(/-?\d*\.?\d+/g);
  return numbers ? numbers.map((n) => Number(n)) : [];
};
