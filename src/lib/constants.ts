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

export const DIACRITICS_MAP: string[] = [
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
];

export const SPECIAL_CHARS: string[] = [
  '-',
  '[',
  ']',
  '{',
  '}',
  '(',
  ')',
  '*',
  '+',
  '?',
  '.',
  ',',
  '\\',
  '^',
  '$',
  '|',
  '#',
];
