import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
            react(),
            tailwindcss(),

            //PWA Configuration
            VitePWA({
                registerType: 'autoUpdate',

                manifest: {
                  name: 'Vtrack',
                  short_name: 'Vtrack',
                  description: 'Personal Expense Assistant',
                  theme_color: '#0d1524',
                  background_color: '#0d1524',
                  display: 'standalone',
                  start_url: '/vtrack/',
                  scope: '/vtrack/',
                  icons: [
                    {
                      src: '/vtrack/assets/images/pwa/pwa-192x192.png',
                      sizes: '192x192',
                      type: 'image/png',
                    },
                    {
                      src: '/vtrack/assets/images/pwa/pwa-512x512.png',
                      sizes: '512x512',
                      type: 'image/png',
                    },
                    {
                      src: '/vtrack/assets/images/pwa/pwa-512x512.png',
                      sizes: '512x512',
                      type: 'image/png',
                      purpose: 'any',
                    },
                    {
                      src: '/vtrack/assets/images/pwa/pwa-512x512.png',
                      sizes: '512x512',
                      type: 'image/png',
                      purpose: 'maskable',
                    }
                  ],
                },
              }),
            //End PWA Configuration
          ],
  base:"/vtrack/"
})
