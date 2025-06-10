import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
     host: '0.0.0.0',      // <- ¡Importante!
    port: 5000,           // <- Puerto igual al que expones en Dockerfile
    //proxy: {
      //'/api': {
        //target: 'https://localhost:5000',
        //changeOrigin: true,
        //secure: false,
      //},
    //},
  },
});
