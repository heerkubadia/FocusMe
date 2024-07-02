import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import reactRefresh from '@vitejs/plugin-react-refresh';
import vue from '@vitejs/plugin-vue';

export default {
  plugins: [react(),
    reactRefresh(),
    vue(),
  ],
  resolve: {
    alias: {
      // Add alias for Material-UI to resolve imports correctly
      '@material-ui/core': '@material-ui/core/esm',
    },
  },
};
