const { registerPlugin } = require("@scullyio/scully");

async function imagePathPlugin(html, route) {
  return html.replace(/images\//gm, './images/');
}

module.exports.imagePathPlugin = imagePathPlugin;

registerPlugin('render', 'imagePathPlugin', imagePathPlugin);