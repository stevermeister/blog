import {
  findPlugin,
  HandledRoute,
  log,
  registerPlugin,
  ScullyConfig,
  setPluginConfig,
  yellow,
} from '@scullyio/scully';
import { scullySystem } from '@scullyio/scully/src/lib/pluginManagement/pluginRepository';
import { puppeteerRender } from '@scullyio/scully/src/lib/renderPlugins/puppeteerRenderPlugin';
// import './src/image.scully.plugin.js';
import { existsSync, mkdirSync, promises as fs } from 'fs';
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
export const renderOnce = Symbol('renderOnce');
setPluginConfig('md', { enableSyntaxHighlighting: true });
export const config: ScullyConfig = {
  projectRoot: './src',
  projectName: 'blog',
  outDir: './dist/static',
  handle404: 'index',
  routes: {
    '/blog/:slug': {
      preRenderer: async (handledRoute: HandledRoute) => {
        const fileExtention = path.extname(handledRoute.data.sourceFile);
        if (['.jpg', '.png', '.gif'].includes(fileExtention)) {
          const src = path.resolve('./' + handledRoute.route + fileExtention);
          const dest = path.resolve(
            './dist/static/images/' + handledRoute.data.sourceFile
          );
          try {
            // this method is async by we intentionally do not wait for it (so files will be copied async)
            // await
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
        folder: './blog',
      },
      // renderPlugin: renderOnce,
    },
  },
};
const render = findPlugin(puppeteerRender);
const cache = new Map<any, Promise<string>>();
registerPlugin(scullySystem, renderOnce, (route: HandledRoute, config) => {
  if (!cache.has(config)) {
    cache.set(config, render(route, config));
  }
  log(`Cache used for "${yellow(route.route)}"`);
  return cache.get(config);
});