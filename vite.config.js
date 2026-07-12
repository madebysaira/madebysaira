import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    target: 'esnext',
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'react-vendor',
              test: /node_modules[\\/](?:react|react-dom|scheduler)/,
              priority: 30,
            },
            {
              name: 'animation-vendor',
              test: /node_modules[\\/](?:gsap|framer-motion|motion|ogl)/,
              priority: 20,
            },
            {
              name: 'lib-vendor',
              test: /node_modules[\\/]/,
              priority: 10,
            }
          ]
        }
      }
    }
  },
  server: {
    allowedHosts: ['.ngrok-free.app'],
  },
})

