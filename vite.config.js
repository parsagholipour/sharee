import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react(), vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/build.ts'),
      name: 'Sharee Js',
      // the proper extensions will be added
      fileName: 'sharee-js',
      formats: ['es']
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue', 'react', 'react-dom', 'ripple-effects', '@types/react', '@types/react-dom'],
      output: {
        preserveModules: true,
        entryFileNames: ({ name: fileName }) => {
          return `${fileName}.js`
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
