import { processQuery } from '../../src/lib/utils/query';
import { HighlightOptions } from '../../src';
import { DEFAULT_OPTIONS } from '../../src/lib/constants';

describe('Query Utility Functions', () => {
  describe('processQuery Function', () => {
    const createOptions = (overrides: Partial<HighlightOptions>) => ({
      ...DEFAULT_OPTIONS,
      ...overrides,
    });

    test('generates regex for default options', () => {
      const result = processQuery('Hello', DEFAULT_OPTIONS);
      expect(result).toBe('H[eèéẻẽẹêềếểễệëěēę][lł][lł][oòóỏõọôồốổỗộơởỡớờợöøōœ]');
    });

    test('generates plain regex with no diacritics when diacritics option is disabled', () => {
      const options = createOptions({ diacritics: false });
      const result = processQuery('Hello', options);
      expect(result).toBe('Hello');
    });

    test('handles separate words when separateWordSearch is enabled', () => {
      const options = createOptions({
        separateWordSearch: true,
        diacritics: false,
      });
      const result = processQuery('Hello World', options);
      expect(result).toBe('Hello|World');
    });

    test('handles punctuation when ignorePunctuation is enabled', () => {
      const options = createOptions({
        diacritics: false,
        ignorePunctuation: true,
      });
      const result = processQuery('Hello', options);
      expect(result).toBe('H[\\p{P}]*e[\\p{P}]*l[\\p{P}]*l[\\p{P}]*o');
    });

    test('combines diacritics and punctuation handling when both options are enabled', () => {
      const options = createOptions({ ignorePunctuation: true });
      const result = processQuery('ae', options);
      expect(result).toBe('[aàáảãạăằắẳẵặâầấẩẫậäåāąæ][\\p{P}]*[eèéẻẽẹêềếểễệëěēę]');
    });
  });
});
