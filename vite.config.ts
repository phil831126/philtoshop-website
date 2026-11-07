// 【控制畫面】無（建置設定）
// 【負責功能】Vite 開發伺服器與正式建置設定；設定 @ 代表 src 資料夾；
//            自動照片清單與文字：啟動時、public/images/ 內照片或 info.txt 有變動時，
//            自動更新 src/data/generated/images.ts 與 content.ts；正式建置時 info.txt 不會放上網站。
// 【注意事項】一般更新照片與文字不需要修改此檔。
import { fileURLToPath, URL } from 'node:url'
import path from 'node:path'
import fs from 'node:fs'
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
      const { changed, text } = writeManifest(root)
      if (changed) console.log('\n  📷 照片與文字已更新（public/images）\n')
      for (const p of text.problems) console.log(`  ⚠ ${p.file}${p.line ? ` 第 ${p.line} 行` : ''}：${p.message}`)
    }, 300)
  }
  return {
    name: 'philtoshop-image-manifest',
    buildStart() {
      writeManifest(root)
    },
    // info.txt 只是給網站讀的原稿，不需要放上正式網站
    closeBundle() {
      const distImages = path.join(root, 'dist', 'images')
      const walk = (dir: string) => {
        if (!fs.existsSync(dir)) return
        for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
          const full = path.join(dir, e.name)
          if (e.isDirectory()) walk(full)
          else if (e.name.toLowerCase() === 'info.txt') fs.rmSync(full)
        }
      }
      walk(distImages)
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
