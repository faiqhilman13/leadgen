import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  // SECURITY: Add security configurations
  server: {
    // Development server security
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    }
  },
  build: {
    // SECURITY: Production build security
    rollupOptions: {
      output: {
        // Prevent leaking internal paths in source maps
        sourcemapPathTransform: (relativeSourcePath: string) => {
          return relativeSourcePath.replace(/^.*\/node_modules\//, 'node_modules/')
        }
      }
    },
    // Enable source maps only in development
    sourcemap: process.env.NODE_ENV === 'development'
  },
  // SECURITY: Environment variable validation
  define: {
    // Ensure sensitive env vars are not accidentally exposed
    __DEV__: JSON.stringify(process.env.NODE_ENV === 'development')
  }
});
