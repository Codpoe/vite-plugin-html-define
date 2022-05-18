import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import htmlDefine from '..';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    htmlDefine({
      __PLAYGROUND__: 'html_define_playground',
    }),
  ],
});
