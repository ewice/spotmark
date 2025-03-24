/**
 * Options for configuring text highlighting behavior
 */
export interface HighlightOptions {
  /** Whether the search should be case sensitive */
  readonly caseSensitive: boolean;
  /** CSS class name to apply to highlighted text */
  readonly className: string;
  /** Whether to match diacritics (accented characters) */
  readonly diacritics: boolean;
  /** Whether to ignore punctuation when matching */
  readonly ignorePunctuation: boolean;
  /** Whether to match all occurrences or just the first one */
  readonly matchAll: boolean;
  /** Whether to match separate words of the query */
  readonly separateWordSearch: boolean;
  /** HTML tag to wrap highlighted text (e.g., 'span', 'mark') */
  readonly tag: string;
}

/**
 * The highlighter function
 */
export type Highlighter = (text: string, query: string) => string;
