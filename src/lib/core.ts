import type { HighlightOptions } from './types';
import { DEFAULT_OPTIONS } from './constants';
import { processQuery } from './utils/query';
import { getRegexFlags } from './utils/regex';

export const createHighlighter = (config?: Partial<HighlightOptions>) => {
  const options: HighlightOptions = {
    ...DEFAULT_OPTIONS,
    ...config,
  };

  return function highlight(text: string, query: string): string {
    const queryRegex = processQuery(query, options);
    const flags = getRegexFlags(options);

    return text.replace(
      new RegExp(queryRegex, flags),
      (match) => `<${options.tag} class="${options.className}">${match}</${options.tag}>`,
    );
  };
};
