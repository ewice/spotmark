import type { HighlightOptions } from '../types';
import { escapeCharacters, replaceDiacriticsWithRegex, replacePunctuationWithRegex } from './regex';

export const processQuery = (query: string, options: HighlightOptions): RegExp => {
  let processed = escapeCharacters(query);

  if (options.ignorePunctuation) {
    processed = replacePunctuationWithRegex(processed);
  }
  if (options.diacritics) {
    processed = replaceDiacriticsWithRegex(processed);
  }
  if (options.separateWordSearch) {
    return new RegExp(processed.split(' ').join('|'));
  }

  return new RegExp(processed);
};
