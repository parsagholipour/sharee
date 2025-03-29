import { resolve } from 'path'
import { defineConfig } from 'vite'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import {viteStaticCopy} from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [cssInjectedByJsPlugin(),
    viteStaticCopy({
      targets: [
        {
          src: 'src/assets/styles/style.css',
          dest: 'style'
        },
        {
          src: 'src/assets/styles/style-dropdown.css',
          dest: 'style'
        },
        {
          src: 'src/assets/styles/style-fixed.css',
          dest: 'style'
        },
        {
          src: 'src/assets/styles/style-hover.css',
          dest: 'style'
        },
        {
          src: 'src/assets/styles/style-text.css',
          dest: 'style'
        },
        {
          src: 'src/assets/styles/style-normal.css',
          dest: 'style'
        },
        {
          src: 'src/assets/styles/style-modal.css',
          dest: 'style'
        },
      ]
    })
  ],
  build: {
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, 'src/build.ts'),
      name: 'Sharee',
      // the proper extensions will be added
      fileName: 'sharee',
      formats: ['umd']
    },
    rollupOptions: {
      input: {
        'sharee': resolve(__dirname, 'src/build.ts'),
      },
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [],
      output: {
        manualChunks: false,
        inlineDynamicImports: true,
        entryFileNames: ({ name: fileName }) => {
          return `${fileName}.min.js`
        },
        // Provide global variables to use in the UMD build
        // for externalized deps
        // globals: {
        //   vue: 'Vue'
        // }
      }
    }
  }
})
