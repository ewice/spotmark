import type { HighlightOptions } from '../types';
import { isSpecialCharacter, escapeCharacter, replaceCharacterWithDiacritics } from './regex';

const processWordSearch = (processed: string): string => {
  const words = processed.split(/\s+/).filter(Boolean);

  if (!words.length) {
    throw new Error('Invalid query: No valid words found after processing');
  }

  return words.join('|');
};

const processCharacter = (character: string, options: HighlightOptions): string => {
  if (isSpecialCharacter(character)) {
    return escapeCharacter(character);
  }
  
  let result = options.diacritics ? replaceCharacterWithDiacritics(character) : character;

  if (options.ignorePunctuation) {
    result += '[\\p{P}]*';
  }

  return result;
};

export const processQuery = (query: string, options: HighlightOptions): string => {
  if (!query) {
    throw new Error('Invalid query: Query must be a non-empty string');
  }

  try {
    const characters = Array.from(query);
    const processed = characters.map(character => processCharacter(character, options)).join('');

    return options.separateWordSearch ? processWordSearch(processed) : processed;
  } catch (error) {
    throw new Error(`Failed to process query: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}; 