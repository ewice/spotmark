import type { HighlightOptions } from '../types';
import { escapeCharacters, replaceDiacriticsWithRegex, replacePunctuationWithRegex } from './regex';

/**
 * Processes a string into a word search pattern by splitting on whitespace
 * @param processed - The string to process into a word search pattern
 * @returns A regex pattern that matches any of the words in the input
 * @throws {Error} If no valid words are found after processing
 * @private
 * @example
 * processWordSearch('hello world') // returns 'hello|world'
 */
const processWordSearch = (processed: string): string => {
  const words = processed.split(/\s+/).filter(Boolean);
  if (!words.length) {
    throw new Error('Invalid query: No valid words found after processing');
  }
  return words.join('|');
};

/**
 * Processes a query string into a regular expression pattern based on the provided options
 * @param query - The query string to process
 * @param options - The highlighting options that determine how to process the query
 * @returns A regex pattern string that can be used for highlighting
 * @throws {Error} If the query is invalid or processing fails
 * @example
 * processQuery('hello world', {
 *   caseSensitive: false,
 *   diacritics: true,
 *   separateWordSearch: true
 * }) // returns a pattern matching 'hello' or 'world' with diacritics
 */
export const processQuery = (query: string, options: HighlightOptions): string => {
  if (!query) {
    throw new Error('Invalid query: Query must be a non-empty string');
  }

  try {
    const processed = [
      escapeCharacters,
      options.ignorePunctuation && replacePunctuationWithRegex,
      options.diacritics && replaceDiacriticsWithRegex,
      options.separateWordSearch && processWordSearch,
    ].reduce((result, processor) => (processor ? processor(result) : result), query);

    return processed;
  } catch (error) {
    throw new Error(`Failed to process query: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};
