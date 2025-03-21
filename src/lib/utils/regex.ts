import type { HighlightOptions } from '../types';
import { DIACRITICS_MAP } from '../constants';

/** Regular expression pattern for matching special characters that need escaping in regex */
const SPECIAL_CHARS_REGEX = /[-[\]{}()*+?.,\\^$|#]/g;

/** Array of flag options and their corresponding characters */
const FLAG_OPTIONS: [keyof HighlightOptions, string][] = [
  ['matchAll', 'g'],
  ['ignorePunctuation', 'u'],
  ['caseSensitive', 'i'],
] as const;

/**
 * Escapes special regex characters in the query string to prevent regex syntax errors
 * @param query - The query string to escape
 * @returns The escaped query string with special characters properly escaped
 * @example
 * escapeCharacters('hello.world') // returns 'hello\.world'
 */
export const escapeCharacters = (query: string): string => query?.replace(SPECIAL_CHARS_REGEX, '\\$&') ?? '';

/**
 * Replaces each character with a pattern that matches the character and any punctuation
 * @param query - The query string to process
 * @returns The processed query string where each character is followed by optional punctuation
 * @example
 * replacePunctuationWithRegex('hello') // returns 'h[\p{P}]*e[\p{P}]*l[\p{P}]*l[\p{P}]*o[\p{P}]*'
 */
export const replacePunctuationWithRegex = (query: string): string => query?.split('').join('[\\p{P}]*') ?? '';

/**
 * Replaces characters with patterns that match their diacritic variations
 * @param query - The query string to process
 * @returns The processed query string where each character matches its diacritic variations
 * @example
 * replaceDiacriticsWithRegex('cafe') // returns '[cçćč][aàáảãạăằắẳẵặâầấẩẫậäåāąæ][f][eèéẻẽẹêềếểễệëěēę]'
 */
export const replaceDiacriticsWithRegex = (query: string): string => {
  if (!query) return '';

  return DIACRITICS_MAP.reduce((result, diacritic) => {
    const regex = new RegExp(`([${diacritic}])|([${diacritic.toUpperCase()}])`, 'g');
    return result.replace(regex, (_, lowerCase) => `[${lowerCase ? diacritic : diacritic.toUpperCase()}]`);
  }, query);
};

/**
 * Generates regex flags based on the provided options
 * @param options - The highlighting options that determine which flags to include
 * @returns A string of regex flags based on the enabled options
 * @example
 * getRegexFlags({ matchAll: true, caseSensitive: false }) // returns 'gi'
 */
export const getRegexFlags = (options: HighlightOptions): string =>
  FLAG_OPTIONS.filter(([key]) => options[key])
    .map(([, flag]) => flag)
    .join('');
