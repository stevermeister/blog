import { registerPlugin, HandledRoute } from '@scullyio/scully';
import * as fs from 'fs';

// static directory is not there yet
if (!fs.existsSync('./dist/static')) {
  fs.mkdirSync('./dist/static');
}
if (!fs.existsSync('./dist/static/images')) {
  fs.mkdirSync('./dist/static/images');
}

export function imageFilePlugin(raw: string, route: HandledRoute) {
  return new Promise((resolve) => {
    const src = route.templateFile;
    const dest = './dist/static/images/' + route.data.sourceFile;
    fs.copyFile(src, dest, (err) => {
        if (err) {
          console.log(err);
        }
        console.log(`${route.templateFile} was copied to ${dest}`);
        resolve('');
      }
    );
  });
}


// DO NOT FORGET TO REGISTER THE PLUGIN
registerPlugin('fileHandler', 'png', imageFilePlugin);
registerPlugin('fileHandler', 'jpg', imageFilePlugin);
registerPlugin('fileHandler', 'gif', imageFilePlugin);
