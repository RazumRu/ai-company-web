import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  preview: {
    //allowedHosts: [],
    host: '0.0.0.0',
  },
  server: {
   // allowedHosts: [],
    host: '0.0.0.0',
  },
});
