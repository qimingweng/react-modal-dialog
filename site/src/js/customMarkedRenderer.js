var marked = require('marked');
var renderer = new marked.Renderer();
var highlight = require('highlight.js')

renderer.code = function(code, lang) {

  var result = [
    '<pre class="hljs">',
    highlight.highlightAuto(code, [lang]).value,
    '</pre>'
  ].join('');

  return result;
}

module.exports = renderer;