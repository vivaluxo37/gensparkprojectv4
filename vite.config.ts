import build from '@hono/vite-build/cloudflare-pages'
import devServer from '@hono/vite-dev-server'
import adapter from '@hono/vite-dev-server/cloudflare'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    build({
      entry: 'src/app.tsx'
    }),
    devServer({
      adapter,
      entry: 'src/app.tsx'
    })
  ],
  css: {
    postcss: './postcss.config.js'
  },
  build: {
    cssCodeSplit: true,
    // Enable tree shaking and optimization
    minify: 'esbuild',
    target: 'esnext',
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'static/css/[name]-[hash][extname]'
          }
          return 'static/[name]-[hash][extname]'
        }
      },
      // Optimize external dependencies
      external: [],
      // Tree shaking configuration
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        unknownGlobalSideEffects: false
      }
    }
  }
})
