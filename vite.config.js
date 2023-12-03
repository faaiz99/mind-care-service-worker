import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [react(),
  VitePWA({
    strategies:'injectManifest',
    srcDir: '.',
    filename: 'worker.js',
    registerType: 'autoUpdate',
    workbox: {
      globPatterns: ['**/*.{js,css,html,ico,png,svg}']
    },
    injectRegister: 'auto',
    devOptions: {
      enabled: false,
      type: 'module',
    },
  })],
})
