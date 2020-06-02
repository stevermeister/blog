const { registerPlugin } = require("@scullyio/scully");
const fs = require("fs");

function imageFilePlugin(raw, route) {
  return new Promise((resolve) => {
    const src = route.templateFile;
    // const dest = "./dist/static" + route.route + '.' + route.templateFile.split(".").pop();
    const dest = "./dist/static/images/" + route.data.sourceFile;
    fs.copyFile(src, dest, (err) => {
        if (err) console.log(err);
        console.log(`${route.templateFile} was copied to ${dest}`);
        resolve('');
      }
    );
  });
}
// DO NOT FORGET TO REGISTER THE PLUGIN
registerPlugin("fileHandler", "png", imageFilePlugin);
registerPlugin("fileHandler", "jpg", imageFilePlugin);
registerPlugin("fileHandler", "gif", imageFilePlugin);
module.exports.imageFilePlugin = imageFilePlugin;
