import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Return the directory name under node_modules as the chunk name
            // for all modules in node_modules
            return id.toString().split('node_modules/')[1].split('/')[0];
          }
        },
      },
    },
    // Increase the chunk size limit to 600kb
    chunkSizeWarningLimit: 600,
  },
  plugins: [react()],
})
