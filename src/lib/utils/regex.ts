import type { HighlightOptions } from '../types';
import { DIACRITICS_MAP, SPECIAL_CHARS } from '../constants';

export const isSpecialCharacter = (character: string): boolean => SPECIAL_CHARS.includes(character);

export const escapeCharacter = (character: string): string => `\\${character}`;

export const replaceCharacterWithDiacritics = (character: string): string => {
  if (!character) return '';

  const lowerCase = character.toLowerCase();
  const diacriticSet = DIACRITICS_MAP.find((set) => set.includes(lowerCase));

  if (!diacriticSet) {
    return character;
  }

  return character === lowerCase ? `[${diacriticSet}]` : `[${diacriticSet.toUpperCase()}]`;
};

export const getRegexFlags = (options: HighlightOptions): string =>
  [options.matchAll && 'g', options.ignorePunctuation && 'u', !options.caseSensitive && 'i'].filter(Boolean).join('');
