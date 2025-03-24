import type { HighlightOptions, Highlighter } from './types';
import { DEFAULT_OPTIONS } from './constants';
import { processQuery } from './utils/query';
import { getRegexFlags } from './utils/regex';

export const createHighlighter = (config?: Partial<HighlightOptions>): Highlighter => {
  const options: HighlightOptions = {
    ...DEFAULT_OPTIONS,
    ...config,
  };

  return (text: string, query: string): string => {
    if (!text || typeof text !== 'string') {
      return '';
    }

    if (!query || typeof query !== 'string') {
      return text;
    }

    try {
      const queryRegex = processQuery(query, options);
      const flags = getRegexFlags(options);
      const regex = new RegExp(queryRegex, flags);

      return text.replace(regex, (match) => `<${options.tag} class="${options.className}">${match}</${options.tag}>`);
    } catch (error) {
      console.error('Failed to perform text replacement:', error);
      return text;
    }
  };
};
