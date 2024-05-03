import { resolve } from 'path'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, splitVendorChunkPlugin, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return defineConfig({
    plugins: [
      vue(),
      // getSplitVendorChunkPlugin(process.env),
      //getLegacyPlugin(process.env)
    ],

    root: 'src/',
    base: '/',
    publicDir: 'public',
    envDir: resolve(__dirname),
    build: {
      outDir: resolve(__dirname, process.env.VITE_BUILD_PATH),
      emptyOutDir: true,
      manifest: false,
      rollupOptions: {
        input: '/index.html'
      },
      target: 'es2015',
      assetsInlineLimit: 4096,
      minify: true,
    },

    resolve: {
      alias: {
        '@app': fileURLToPath(new URL('./src', import.meta.url))
      },
    }
  })
}

function getLegacyPlugin (env) {
    return legacy({
      targets: 'defaults, android >= 4.4.4, ios >= 7',
      externalSystemJS: true
    })
}

// function getSplitVendorChunkPlugin (env) {
//   if (env.VITE_APP === 'mobile') {
//     return null
//   } else {
//     return splitVendorChunkPlugin()
//   }
// }
