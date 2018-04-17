const marked = require('marked');
const renderer = new marked.Renderer();
const highlight = require('highlight.js');

renderer.code = (code, lang) => {
  const result = [
    '<pre class="hljs">',
    highlight.highlightAuto(code, [lang]).value,
    '</pre>',
  ].join('');

  return result;
};

module.exports = renderer;
