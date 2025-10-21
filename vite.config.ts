import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: ['.lusora.store'],
    host: '0.0.0.0',
  },
  server: {
    allowedHosts: ['.lusora.store'],
    host: '0.0.0.0',
  },
});
