import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    https: {
      key: './src/ssl/localhost+2-key.pem',
      cert: './src/ssl/localhost+2.pem'
    },
    host: 'localhost',
    port: 5173,
    }
  }
)
