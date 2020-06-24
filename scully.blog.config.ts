import './src/image.scully.plugin';
// import './src/md.scully.plugin';

exports.config = {
  projectRoot: './src',
  projectName: 'blog',
  outDir: './dist/static',
  routes: {
    '/blog/:slug': {
      type: 'contentFolder',
      slug: {
        folder: './blog'
      }
    },
  }
};
