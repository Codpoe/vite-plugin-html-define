# vite-plugin-html-define

Define global constant replacements for html. Entries will be statically replaced.

## Usage

```ts
// vite.config.ts

import htmlDefine from 'vite-plugin-html-define';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __A__: 1,
  },
  plugins: [
    htmlDefine({
      __B__: 2
    }),
  ],
});
```

```html
<div>__A__</div>
<div>__B__</div>
```

will be transform to:
```html
<div>1</div>
<div>2</div>
```

## License
MIT License © 2022 [codpoe](https://github.com/codpoe)
