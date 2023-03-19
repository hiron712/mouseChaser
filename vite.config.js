import { defineConfig } from 'vite';
import autoprefixer from 'autoprefixer';
import postcssSortMediaQueries from 'postcss-sort-media-queries';
import cssDeclarationSorter from 'css-declaration-sorter';
import postcssNormalizeCharset from 'postcss-normalize-charset';

export default defineConfig({
  root: 'src',
  publicDir: '../public',
  build: {
    outDir: '../dist',
    rollupOptions: {
      output: {
        entryFileNames: `assets/js/index.js`,
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.')[1];
          //ビルド時のCSS名を明記してコントロールする
          if(extType === 'css') {
            // return `assets/css/style.[hash].css`;
            return `assets/css/style.css`;
          }
          return `assets/[name][extname]`;
        },
      }
    }
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer,
        postcssSortMediaQueries,
        cssDeclarationSorter({order:'smacss'}),
        postcssNormalizeCharset
      ]
    },
  }
});