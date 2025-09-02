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
  server: {
    // Allow external hosts for sandbox development
    host: '0.0.0.0',
    allowedHosts: 'all'
  },
  build: {
    cssCodeSplit: false,  // Don't split CSS, keep it in one file
    // Enable tree shaking and optimization
    minify: 'esbuild',
    target: 'esnext',
    rollupOptions: {
      input: {
        app: 'src/app.tsx',
        styles: 'src/styles.css'  // Explicitly include CSS as entry point
      },
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'static/styles.css'  // Force consistent CSS filename
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
