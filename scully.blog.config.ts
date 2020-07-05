import { ScullyConfig, setPluginConfig, HandledRoute } from '@scullyio/scully';
import './src/image.scully.plugin.js';
const fs = require('fs');
const path = require('path');

setPluginConfig('md', { enableSyntaxHighlighting: true });

export const config: ScullyConfig = {
  projectRoot: './src',
  projectName: 'blog',
  outDir: './dist/static',
  routes: {
    '/blog/:slug': {
      preRenderer: async (handledRoute: HandledRoute) => {
        const fileExtention = path.extname(handledRoute.data.sourceFile);
        if (['jpg', 'png', 'gif'].includes(fileExtention)) {
          // this method is async by we intentionally do not wait for it (so files will be copied async)
          copyFile(handledRoute.route + fileExtention);
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

async function copyFile(route: string) {
  const src = path.resolve('./', route);
  const dest = path.resolve('./dist/static/images/', route);
  fs.copyFile(src, dest, (err) => {
      if (err) {
        console.log(err);
      }
      console.log(`${src} was copied to ${dest}`);
    }
  );
}
