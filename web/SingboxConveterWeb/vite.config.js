import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'



import AutoImport from "unplugin-auto-import/vite"

import Components from 'unplugin-vue-components/vite';

import {PrimeVueResolver} from '@primevue/auto-import-resolver';
export default defineConfig({
  plugins: [vue(),
    UnoCSS(),
    AutoImport({
      imports: [
        'vue'
      ],
    }),
    Components({
      resolvers: [
        PrimeVueResolver()
      ]
    }),

  ],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  server:{
    host: '0.0.0.0',
    port: 4012
  }
})
