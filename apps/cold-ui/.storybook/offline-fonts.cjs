const postcss = require('postcss');

// Only enabled by the isolated Storybook CI build. A failed remote font @import
// makes Chromium reject the parent stylesheet and prevents Vite preview startup.
// Keep app/Tailwind styles intact and use the existing system-font fallback.
module.exports = () => ({
  name: 'storybook-offline-fonts',
  enforce: 'pre',
  transform(source, id) {
    if (!id.endsWith('/apps/cold-ui/src/styles.css')) return;
    const css = postcss.parse(source);
    css.walkAtRules('import', rule => {
      if (/^(?:url\(\s*)?['"]?https:\/\/fonts\.googleapis\.com\//.test(rule.params)) rule.remove();
    });
    return { code: css.toString(), map: null };
  },
});
