import type { HighlightOptions } from '../types';
import { DIACRITICS_MAP } from '../constants';

export const escapeCharacters = (query: string): string => query.replace(/[-[\]{}()*+?.,\\^$|#]/g, '\\$&');

export const replacePunctuationWithRegex = (query: string): string => Array.from(query).join('[\\p{P}]*');

export const replaceDiacriticsWithRegex = (query: string): string =>
  DIACRITICS_MAP.reduce((result, diacritic) => {
    const regex = new RegExp(`([${diacritic}])|([${diacritic.toUpperCase()}])`, 'g');
    return result.replace(regex, (_, lowerCase) => `[${lowerCase ? diacritic : diacritic.toUpperCase()}]`);
  }, query);

export const getRegexFlags = (options: HighlightOptions): string =>
  [options.matchAll && 'g', options.ignorePunctuation && 'u', !options.caseSensitive && 'i'].filter(Boolean).join('');
