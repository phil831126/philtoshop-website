// 【控制畫面】無（建置設定）
// 【負責功能】Vite 開發伺服器與正式建置設定；設定 @ 代表 src 資料夾。
// 【注意事項】一般更新照片與文字不需要修改此檔。
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: 'dist',
  },
})
