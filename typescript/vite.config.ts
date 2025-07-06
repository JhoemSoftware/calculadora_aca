import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        host: true,
        port: 3000,
        strictPort: true,
        proxy: {
            '/api': {
                target: 'http://backend:8080', // Solo usado en desarrollo local con Docker
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
                secure: false
            }
        }
    },
    build: {
        outDir: 'dist'
    }
});