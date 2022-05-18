import { Plugin } from 'vite';

export function htmlDefine(userDefine?: Record<string, any>): Plugin {
  let replacements: Record<string, string | undefined>;
  let pattern: RegExp | null = null;

  return {
    name: 'vite-plugin-define-extra',
    configResolved(config) {
      replacements = { ...config.define, ...userDefine };

      for (const key in replacements) {
        const val = replacements[key];
        replacements[key] = typeof val === 'string' ? val : JSON.stringify(val);
      }

      const replacementsKeys = Object.keys(replacements);

      pattern = replacementsKeys.length
        ? new RegExp(
            // Mustn't be preceded by a char that can be part of an identifier
            // or a '.' that isn't part of a spread operator
            '(?<![\\p{L}\\p{N}_$]|(?<!\\.\\.)\\.)(' +
              replacementsKeys
                .map(str => {
                  return str.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');
                })
                .join('|') +
              // Mustn't be followed by a char that can be part of an identifier
              // or an assignment (but allow equality operators)
              ')(?![\\p{L}\\p{N}_$]|\\s*?=[^=])',
            'gu'
          )
        : null;
    },
    transformIndexHtml: {
      enforce: 'post',
      transform(html) {
        if (!pattern) {
          return;
        }
        return html.replace(pattern, (_, m) => '' + replacements[m]);
      },
    },
  };
}

export default htmlDefine;
