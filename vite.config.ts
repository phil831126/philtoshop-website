// 【控制畫面】無（建置設定）
// 【負責功能】Vite 開發伺服器與正式建置設定；設定 @ 代表 src 資料夾；
//            自動照片清單：啟動時與 public/images/ 內照片新增／刪除／替換時，自動更新 src/data/generated/images.ts。
// 【注意事項】一般更新照片與文字不需要修改此檔。
import { fileURLToPath, URL } from 'node:url'
import path from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import { writeManifest } from './scripts/image-manifest.mjs'

const root = fileURLToPath(new URL('.', import.meta.url))

/** 照片放進資料夾就自動更新照片清單 */
function imageManifest(): Plugin {
  const imagesDir = path.join(root, 'public', 'images')
  let timer: ReturnType<typeof setTimeout> | undefined
  const regenerate = () => {
    clearTimeout(timer)
    // 複製多張照片時會連續觸發，稍等一下再一次更新
    timer = setTimeout(() => {
      const { changed } = writeManifest(root)
      if (changed) console.log('\n  📷 照片清單已更新（public/images）\n')
    }, 300)
  }
  return {
    name: 'philtoshop-image-manifest',
    buildStart() {
      writeManifest(root)
    },
    configureServer(server) {
      server.watcher.add(imagesDir)
      server.watcher.on('all', (_event, file) => {
        if (path.resolve(file).toLowerCase().startsWith(imagesDir.toLowerCase())) regenerate()
      })
    },
  }
}

export default defineConfig({
  plugins: [imageManifest(), vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: 'dist',
  },
})
