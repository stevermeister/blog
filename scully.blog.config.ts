import { ScullyConfig, setPluginConfig, HandledRoute, registerPlugin } from '@scullyio/scully';
// import './src/image.scully.plugin.js';
import { promises as fs, mkdirSync, existsSync } from 'fs';
const path = require('path');


registerPlugin('fileHandler', 'png', async () => '');
registerPlugin('fileHandler', 'jpg', async () => '');
registerPlugin('fileHandler', 'gif', async () => '');
// static directory is not there yet
if (!existsSync('./dist/static')) {
  mkdirSync('./dist/static');
}
if (!existsSync('./dist/static/images')) {
  mkdirSync('./dist/static/images');
}


setPluginConfig('md', { enableSyntaxHighlighting: true });

export const config: ScullyConfig = {
  projectRoot: './src',
  projectName: 'blog',
  outDir: './dist/static',
  routes: {
    '/blog/:slug': {
      preRenderer: async (handledRoute: HandledRoute) => {
        const fileExtention = path.extname(handledRoute.data.sourceFile);
        if (['.jpg', '.png', '.gif'].includes(fileExtention)) {
          // this method is async by we intentionally do not wait for it (so files will be copied async)
          const src = path.resolve('./' + handledRoute.route + fileExtention);
          const dest = path.resolve('./dist/static/images/' + handledRoute.data.sourceFile);
          try {
            fs.copyFile(src, dest);
            console.log(`${src} was copied to ${dest}`);
          } catch (err) {
            console.log(err);
          }
          return false;
        }
        return true;
      },
      type: 'contentFolder',
      slug: {
        folder: './blog'
      }
    },
  }
};
