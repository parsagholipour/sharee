import { resolve } from 'path'
import { defineConfig } from 'vite'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

export default defineConfig({
  plugins: [cssInjectedByJsPlugin()],
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
