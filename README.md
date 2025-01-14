# Spotmark

[![npm version](https://img.shields.io/npm/v/spotmark.svg)](https://www.npmjs.com/package/spotmark)
[![License](https://img.shields.io/npm/l/spotmark.svg)](https://github.com/ewice/spotmark/blob/main/LICENSE)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/spotmark)](https://bundlephobia.com/package/spotmark)

A tiny but powerful text highlighting library that handles diacritics, punctations, multiple word patterns, and smart text matching. Perfect for search interfaces and text analysis.

## Features

- 🎯 Smart text matching with case-sensitive options and punctuation handling
- 🌍 Full Unicode support with diacritics (é, à, ñ, etc.)
- ✨ Flexible search with single or multiple word patterns
- 🎨 Customizable styling and HTML markup
- 🪶 Lightweight and framework agnostic

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [Configuration](#configuration)
- [Styling](#styling)
- [Contributing](#contributing)
- [License](#license)

## Installation

To install Spotmark, use npm:

```sh
npm install spotmark

or

yarn add spotmark
```

## Usage

### Import

```javascript
// ES6 import
import { createHighlighter } from 'spotmark';

// or CommonJS require
const { createHighlighter } = require('spotmark');
```

### Basic Usage

```javascript
const text = 'This is a simple but an amazing tool for text highlight 😎.';
const pattern = 'amazing';

const highlight = createHighlighter();
highlight(text, pattern);
→ 'This is a simple but an <span class="text-highlight">amazing</span> tool for text highlight 😎.'
```

### Multiple Matches

```javascript
const text = 'This is a simple but an amazing tool for text highlight 😎.';
const pattern = 'e';

const highlight = createHighlighter();
highlight(text, pattern);
→ 'This is a simpl<span class="text-highlight">e</span> but an amazing tool for t<span class="text-highlight">e</span>xt highlight 😎.'
```

### Custom HTML Tag

```javascript
const text = 'This is a simple but an amazing tool for text highlight 😎.';
const pattern = 'amazing';
const config = { tag: 'mark' };

const highlight = createHighlighter(config);
highlight(text, pattern);
→ 'This is a simple but an <mark class="text-highlight">amazing</mark> tool for text highlight 😎.'
```

### Custom Class Name

```javascript
const text = 'This is a simple but an amazing tool for text highlight 😎.';
const pattern = 'amazing';
const config = { className: 'custom-highlight' };

const highlight = createHighlighter(config);
highlight(text, pattern);
→ 'This is a simple but an <span class="custom-highlight">amazing</span> tool for text highlight 😎.'
```

### First Match Only

```javascript
const text = 'This is a simple but an amazing tool for text highlight 😎.';
const pattern = 'a';
const config = { matchAll: false };

const highlight = createHighlighter(config);
highlight(text, pattern);
→ 'This is <span class="text-highlight">a</span> simple but an amazing tool for text highlight 😎.'
```

### Case Sensitive Search

```javascript
const text = 'This is a simple but an amazing tool for text highlight 😎.';
const pattern = 'AMAZING';
const config = { caseSensitive: true };

const highlight = createHighlighter(config);
highlight(text, pattern);
→ 'This is a simple but an amazing tool for text highlight 😎.'
```

### Multiple Words Search

```javascript
const text = 'This is a simple but an amazing tool for text highlight 😎.';
const pattern = 'simple amazing';
const config = { separateWordSearch: true };

const highlight = createHighlighter(config);
highlight(text, pattern);
→ 'This is a <span class="text-highlight">simple</span> but an <span class="text-highlight">amazing</span> tool for text highlight 😎.'
```

### Diacritics Support

```javascript
const text = 'Je suis allé à la café.';
const pattern = 'alle';

const highlight = createHighlighter({ diacritics: true });
highlight(text, pattern);
→ 'Je suis <span class="text-highlight">allé</span> à la café.'
```

### Ignore Punctuation

```javascript
const text = "Let's go!";
const pattern = 'Lets';

const highlight = createHighlighter({ ignorePunctuation: true });
highlight(text, pattern);
→ "<span class="text-highlight">Let's</span> go!"
```

## API

### Functions

#### `createHighlighter(config?: HighlightOptions)`

Creates a configured highlighter function. This is the main entry point of the library.

**Parameters:**

- `config`: Optional configuration object (see [HighlightOptions](#highlightoptions))

**Returns:**

- A highlight function with the following signature:
  ```typescript
  (text: string, query: string) => string;
  ```

**Example:**

```javascript
const highlight = createHighlighter({ caseSensitive: true });
```

#### `highlight(text: string, query: string)`

The function returned by `createHighlighter`. It performs the actual text highlighting.

**Parameters:**

- `text`: The source text where highlighting will be performed
- `query`: The search pattern(s) to highlight

**Returns:**

- HTML string with highlighted matches wrapped in configured tags

**Example:**

```javascript
const highlighted = highlight('Hello world', 'world'); // Returns: "Hello <span class="text-highlight">world</span>"
```

### Types

#### `HighlightOptions`

Configuration options for the highlighter.

| Property             | Type    | Default          | Description                                               |
| -------------------- | ------- | ---------------- | --------------------------------------------------------- |
| `caseSensitive`      | boolean | false            | Enables case-sensitive matching                           |
| `className`          | string  | 'text-highlight' | CSS class applied to highlight wrapper elements           |
| `diacritics`         | boolean | true             | Enables matching of text with diacritical marks           |
| `ignorePunctuation`  | boolean | false            | Removes punctuation from search consideration             |
| `matchAll`           | boolean | true             | Highlights all matches instead of just the first          |
| `separateWordSearch` | boolean | true             | Treats space-separated query words as individual patterns |
| `tag`                | string  | 'span'           | HTML tag used for wrapping highlighted matches            |

**Example:**

```typescript
const options: HighlightOptions = {
  caseSensitive: true,
  className: 'custom-highlight',
  tag: 'mark',
};
```

## Styling

To style the wrapped text, you need to add CSS for the default class name `text-highlight` (or your custom class name if configured).

### Example

```css
.text-highlight {
  background-color: yellow;
  color: black;
}
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
