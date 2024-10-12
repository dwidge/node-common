// Function to convert a string to kebab-case
export const kebabCase = (str: string): string => {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2") // Insert hyphens between lowercase-uppercase boundaries
    .replace(/[\s_]+/g, "-") // Replace spaces or underscores with hyphens
    .toLowerCase();
};

// Function to convert a string to camelCase
export const camelCase = (str: string): string => {
  return str
    .replace(/[-_\s]+(.)?/g, (_, char) => (char ? char.toUpperCase() : "")) // Remove separators and capitalize the following letter
    .replace(/^[A-Z]/, (match) => match.toLowerCase()); // Ensure the first character is lowercase
};
