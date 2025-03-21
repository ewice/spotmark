import { HighlightOptions } from './types';

export const DEFAULT_OPTIONS: HighlightOptions = {
  caseSensitive: false,
  className: 'text-highlight',
  diacritics: true,
  ignorePunctuation: false,
  matchAll: true,
  separateWordSearch: true,
  tag: 'span',
};

/** Array of base characters and their diacritic variations */
export const DIACRITICS_MAP = [
  'aàáảãạăằắẳẵặâầấẩẫậäåāąæ',
  'cçćč',
  'dđď',
  'eèéẻẽẹêềếểễệëěēę',
  'iìíỉĩịîïī',
  'lł',
  'nñňń',
  'oòóỏõọôồốổỗộơởỡớờợöøōœ',
  'rř',
  'sšśșş',
  'tťțţ',
  'uùúủũụưừứửữựûüůū',
  'yýỳỷỹỵÿ',
  'zžżź',
] as const;
