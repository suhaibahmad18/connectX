import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // DEV_PROXY_TARGET has no VITE_ prefix, so it is only read here and never bundled into the client.
  const env = loadEnv(mode, process.cwd(), '')
  const target = env.DEV_PROXY_TARGET || 'http://localhost:5002'

  return {
    plugins: [react()],
    server: {
      port: 4001,
      proxy: {
        '/api': { target, changeOrigin: true },
        '/socket.io': { target, changeOrigin: true, ws: true },
      },
    },
  }
})
