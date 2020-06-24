const { registerPlugin } = require("@scullyio/scully");
const fs = require("fs");
const { rawListeners } = require("process");


function mdFilePlugin(raw, route) {
  return new Promise((resolve) => {
    const src = route.templateFile;
    return raw; 
  });
}
// DO NOT FORGET TO REGISTER THE PLUGIN
registerPlugin("fileHandler", "md", mdFilePlugin);
module.exports.mdFilePlugin = mdFilePlugin;
