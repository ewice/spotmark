import {
  escapeCharacter,
  isSpecialCharacter,
  replaceCharacterWithDiacritics,
  getRegexFlags,
} from '../../src/lib/utils/regex';
import { HighlightOptions } from '../../src';
import { DEFAULT_OPTIONS, SPECIAL_CHARS } from '../../src/lib/constants';

describe('Regex Utils', () => {
  describe('escapeCharacter', () => {
    it('escapes special regex characters', () => {
      SPECIAL_CHARS.forEach((char) => {
        expect(escapeCharacter(char)).toBe(`\\${char}`);
      });
    });

    it('escapes normal characters as well', () => {
      expect(escapeCharacter('h')).toBe('\\h');
      expect(escapeCharacter('1')).toBe('\\1');
    });
  });

  describe('isSpecialCharacter', () => {
    it('identifies special regex characters', () => {
      SPECIAL_CHARS.forEach((char) => {
        expect(isSpecialCharacter(char)).toBe(true);
      });
    });

    it('identifies normal characters', () => {
      expect(isSpecialCharacter('a')).toBe(false);
      expect(isSpecialCharacter('1')).toBe(false);
    });
  });

  describe('replaceCharacterWithDiacritics', () => {
    it('creates pattern matching diacritics for basic characters', () => {
      const result = replaceCharacterWithDiacritics('a');
      expect(result).toContain('[aàáảãạăằắẳẵặâầấẩẫậäåāąæ]');
    });

    it('handles uppercase characters', () => {
      const result = replaceCharacterWithDiacritics('A');
      expect(result).toContain('[AÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄÆ]');
    });

    it('preserves non-diacritic characters', () => {
      expect(replaceCharacterWithDiacritics('x')).toBe('x');
    });
  });

  describe('getRegexFlags', () => {
    it('returns correct flags for default options', () => {
      expect(getRegexFlags(DEFAULT_OPTIONS)).toBe('gi');
    });

    it('excludes "g" flag when matchAll is false', () => {
      const options: HighlightOptions = {
        ...DEFAULT_OPTIONS,
        matchAll: false,
      };
      expect(getRegexFlags(options)).toBe('i');
    });

    it('excludes "i" flag when case-insensitive', () => {
      const options: HighlightOptions = {
        ...DEFAULT_OPTIONS,
        caseSensitive: true,
      };
      expect(getRegexFlags(options)).toBe('g');
    });

    it('include "u" flag when ignorePunctuation is true', () => {
      const options: HighlightOptions = {
        ...DEFAULT_OPTIONS,
        ignorePunctuation: true,
      };
      expect(getRegexFlags(options)).toBe('gui');
    });
  });
});
