import { ScullyConfig, setPluginConfig } from '@scullyio/scully';
import './src/image.scully.plugin.js';

setPluginConfig('md', { enableSyntaxHighlighting: true });

export const config: ScullyConfig = {
  projectRoot: './src',
  projectName: 'blog',
  outDir: './dist/static',
  routes: {
    '/blog/:slug': {
      preRenderer: async (route) => {
        if (route.includes('/images/')){
          copyFile(`.${route}.${guessFileExtention(route)}`);
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

const fs = require('fs');
const path = require('path');
function guessFileExtention(routeWithoutExtention) {
  return ['jpg', 'png', 'gif'].find(ext => fs.existsSync(`.${routeWithoutExtention}.${ext}`));
}

function copyFile(sourceFile) {
  return new Promise((resolve) => {
    const dest = path.resolve('./dist/static/images/', sourceFile.split('/images/')[1]);
    fs.copyFile(sourceFile, dest, (err) => {
        if (err) {
          console.log(err);
        }
        console.log(`${sourceFile} was copied to ${dest}`);
        resolve('');
      }
    );
  });
}
