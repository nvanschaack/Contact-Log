import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    //vite by default uses port 5173. stating 'port:' below replaces the default port with a port of my choice (not required)
    port: 3000,
    open: true,
    proxy: {
      '/graphql': {
        //this is stating that i'm using server as my backend
        target: 'http://localhost:3001',
        //this says we won't change our port 3000 origin, it will instead run beside port 3000
        changeOrigin: true,
        //means this is not running on a secure server
        secure: false,
      }
    }
  }
})
