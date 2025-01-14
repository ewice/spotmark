import { createHighlighter } from '../src';

describe('createHighlighter', () => {
  test('creates highlighter with default options', () => {
    const highlight = createHighlighter();
    const result = highlight('Hello World', 'World');
    expect(result).toBe('Hello <span class="text-highlight">World</span>');
  });

  test('respects custom options', () => {
    const highlight = createHighlighter({
      className: 'custom-highlight',
      tag: 'mark',
    });
    const result = highlight('Hello World', 'World');
    expect(result).toBe('Hello <mark class="custom-highlight">World</mark>');
  });

  test('handles case sensitivity', () => {
    const highlight = createHighlighter({
      caseSensitive: false,
    });
    const result = highlight('Hello World', 'world');
    expect(result).toBe('Hello <span class="text-highlight">World</span>');
  });

  test('handles multiple matches', () => {
    const highlight = createHighlighter({
      matchAll: true,
    });
    const result = highlight('Hello hello', 'hello');
    expect(result).toBe('<span class="text-highlight">Hello</span> <span class="text-highlight">hello</span>');
  });

  test('handles diacritics', () => {
    const highlight = createHighlighter({
      diacritics: true,
    });
    const result = highlight('résumé', 'resume');
    expect(result).toBe('<span class="text-highlight">résumé</span>');
  });

  test('handles punctuation', () => {
    const highlight = createHighlighter({
      ignorePunctuation: true,
    });
    const result = highlight('he.l.lo', 'hello');
    expect(result).toBe('<span class="text-highlight">he.l.lo</span>');
  });

  test('handles separate word search', () => {
    const highlight = createHighlighter({
      separateWordSearch: true,
    });
    const result = highlight('hello beautiful world', 'hello world');
    expect(result).toBe(
      '<span class="text-highlight">hello</span> beautiful <span class="text-highlight">world</span>',
    );
  });
});
