import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
// https://vitejs.dev/config/


// 自动导入vue中hook reactive ref等
import AutoImport from "unplugin-auto-import/vite"
//自动导入ui-组件 比如说ant-design-vue  element-plus等
import Components from 'unplugin-vue-components/vite';
//ant-design-vue
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
})
