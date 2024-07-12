import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import yaml from '@rollup/plugin-yaml';
import vueI18n from '@intlify/vite-plugin-vue-i18n';
import { resolve } from 'path';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    yaml(),
    vueI18n({
      runtimeOnly: false,
      compositionOnly: true,
      include: resolve(__dirname, './src/locales/**'),
    }),
  ],
  resolve: {
    alias: [
      { find: '/@', replacement: path.resolve(__dirname, './src') },
    ],
  },
});
