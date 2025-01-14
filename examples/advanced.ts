import { createHighlighter } from '../src';

const highlight2 = createHighlighter({
  className: 'my-highlight',
  caseSensitive: false,
});
highlight2('Hello World', 'world');
