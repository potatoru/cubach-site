import { resolve } from 'path'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }
  return defineConfig({
    plugins: [
      vue(),
      getLegacyPlugin(process.env),
    ],

    root: 'src/',
    base: '/',
    publicDir: 'public',
    envDir: resolve(__dirname),
    build: {
      outDir: resolve(__dirname, process.env.VITE_BUILD_PATH),
      emptyOutDir: true,
      manifest: false,
      cssCodeSplit: false,

      rollupOptions: {
        input: '/index.html',
        // output: {
        //   // manualChunks (id) {
        //   //   if (id.includes('node_modules')) {
        //   //     return id.toString().split('node_modules/')[1].split(
        //   //       '/')[0].toString();
        //   //   }
        //   // }
        // }
      },
      //target: 'es2015',
      assetsInlineLimit: 4096,
      minify: true,
    },

    resolve: {
      alias: {
        '@app': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  })
}

function getLegacyPlugin (env) {
  if (env.VITE_LEGACY_BUILD === true) {
    return legacy({
      targets: 'defaults, android >= 5.0, ios >= 8',
    })
  }
}

// function getSplitVendorChunkPlugin (env) {
//   if (env.VITE_APP === 'mobile') {
//     return null
//   } else {
//     return splitVendorChunkPlugin()
//   }
// }
