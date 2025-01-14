import {
  escapeCharacters,
  replacePunctuationWithRegex,
  replaceDiacriticsWithRegex,
  getRegexFlags,
} from '../../src/lib/utils/regex';
import { HighlightOptions } from '../../src';
import { DEFAULT_OPTIONS } from '../../src/lib/constants';

describe('Regex Utils', () => {
  describe('escapeCharacters', () => {
    test('escapes special regex characters', () => {
      expect(escapeCharacters('.*+')).toBe('\\.\\*\\+');
      expect(escapeCharacters('[test]')).toBe('\\[test\\]');
      expect(escapeCharacters('(hello)')).toBe('\\(hello\\)');
    });

    test('leaves normal characters unchanged', () => {
      expect(escapeCharacters('hello')).toBe('hello');
      expect(escapeCharacters('world123')).toBe('world123');
    });
  });

  describe('replacePunctuationWithRegex', () => {
    test('adds regex pattern for possible punctuation between characters', () => {
      expect(replacePunctuationWithRegex('hello')).toBe('h[\\p{P}]*e[\\p{P}]*l[\\p{P}]*l[\\p{P}]*o');
    });
  });

  describe('replaceDiacriticsWithRegex', () => {
    test('creates pattern matching diacritics for basic characters', () => {
      const result = replaceDiacriticsWithRegex('a');
      expect(result).toContain('[aàáảãạăằắẳẵặâầấẩẫậäåāąæ]');
    });

    test('handles multiple characters', () => {
      const result = replaceDiacriticsWithRegex('ae');
      expect(result).toContain('[aàáảãạăằắẳẵặâầấẩẫậäåāąæ]');
      expect(result).toContain('[eèéẻẽẹêềếểễệëěēę]');
    });

    test('preserves non-diacritic characters', () => {
      const result = replaceDiacriticsWithRegex('xyz');
      expect(result).toContain('x');
      expect(result).toContain('[yýỳỷỹỵÿ]');
      expect(result).toContain('[zžżź]');
    });
  });

  describe('getRegexFlags', () => {
    test('returns correct flags for default options', () => {
      expect(getRegexFlags(DEFAULT_OPTIONS)).toBe('gi');
    });

    test('excludes "g" flag when matchAll is false', () => {
      const options: HighlightOptions = {
        ...DEFAULT_OPTIONS,
        matchAll: false,
      };
      expect(getRegexFlags(options)).toBe('i');
    });

    test('excludes "i" flag when case-insensitive', () => {
      const options: HighlightOptions = {
        ...DEFAULT_OPTIONS,
        caseSensitive: true,
      };
      expect(getRegexFlags(options)).toBe('g');
    });

    test('include "u" flag when ignorePunctuation is true', () => {
      const options: HighlightOptions = {
        ...DEFAULT_OPTIONS,
        ignorePunctuation: true,
      };
      expect(getRegexFlags(options)).toBe('gui');
    });
  });
});
