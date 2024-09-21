import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Allows access from your local network
    port: 5173, // The port Vite will run on (you can change this if needed)
    open: true, // Automatically opens the app in the browser on your PC
  },
})
