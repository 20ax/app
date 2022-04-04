/// <reference types="vitest" />
import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import uni from '@dcloudio/vite-plugin-uni'
import mkcert from 'vite-plugin-mkcert'
import ViteRestart from 'vite-plugin-restart'
import AutoImport from 'unplugin-auto-import/vite'
import Inspect from 'vite-plugin-inspect'
import Unocss from 'unocss/vite'
import { presetUno, presetAttributify, presetIcons } from 'unocss'
import transformerDirective from '@unocss/transformer-directives'
import UniMeta from './build/vite-plugin-uni-meta'
import UniProvider from './build/vite-plugin-uni-provider'
import MpAttrFix from './build/vite-plugin-mp-attr-fix'
import Espower from './build/vite-plugin-espower'
// https://vitejs.dev/config/
export default ({ mode }) =>
  defineConfig({
    base: './',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@root': path.resolve(__dirname),
        lodash: 'lodash-es',
      },
    },
    server: {
      watch: { ignored: ['**/dist/**'] },
      https: true,
      proxy: {
        '^/api': {
          target: loadEnv(mode, process.cwd()).VITE_PROXY_URL,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },
    plugins: [
      Inspect(), //vite分析工具
      mkcert(), //生成证书
      MpAttrFix(), //修复小程序不能使用attr的问题
      UniMeta(), //自动生成页面meta信息和路由并注册pages.json
      UniProvider(), //自动注册页面全局组件
      Unocss({
        presets: [presetUno(), presetAttributify({ prefix: 'data-' }), presetIcons()],
        transformers: [transformerDirective() as any],
        shortcuts: {
          'flex-center': 'flex flex-row justify-center items-center',
          'flex-center-col': 'flex flex-col justify-center items-center',
        },
      }),
      ViteRestart({
        restart: ['src/pages.js', 'src/app.config.ts'],
      }),
      AutoImport({
        imports: [
          'vue',
          'uni-app',
          { '@/app/index': ['app'] },
          { 'power-assert': [['default', 'assert']] },
        ],
        dts: 'declare/auto-imports.d.ts',
      }),
      isTest() ||
        uni({
          vueOptions: {
            reactivityTransform: true,
          },
        }),
      isTest() && Espower(),
    ],
    test: {
      globals: true,
      environment: 'jsdom',
      deps: {
        inline: ['@vue'],
      },
    },
  })

function isTest() {
  return process.env.NODE_ENV === 'test'
}
