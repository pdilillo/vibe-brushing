import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/vibe-brushing/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Sparkle Brush - Kids Tooth Brushing App',
        short_name: 'Sparkle Brush',
        description: 'Make tooth brushing fun with games and collectible creatures!',
        theme_color: '#8B5CF6',
        background_color: '#1E1B4B',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,svg,mp3,ogg}'],
        globIgnores: ['**/creatures/**'],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024
      }
    })
  ],
})
