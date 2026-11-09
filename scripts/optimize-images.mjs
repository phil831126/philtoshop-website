/**
 * 【控制畫面】無（輔助工具，不會被打包進網站）
 * 【負責功能】自動縮小 public/images/ 裡「太大」的照片，讓網站（尤其手機）載入變快：
 *   - PNG、WebP → 轉成 JPG（照片用 JPG 檔案小很多；檔名不變，只有副檔名變 .jpg）
 *   - 長邊超過 2000 px → 縮到 2000 px（網站最大顯示也用不到更大）
 *   - 檔案超過 500 KB → 重新壓縮（品質 80，肉眼幾乎看不出差別）
 *   - 同時移除 GPS 拍攝地點等照片資訊、套用手機的旋轉方向
 * 【什麼時候會執行】
 *   - npm.cmd run dev 開著時：照片放進資料夾就自動處理
 *   - npm.cmd run photos：手動執行一次
 *   - npm run build（含 Vercel）不會修改照片，只會提醒
 * 【常見修改】想調整尺寸或品質：改下方 MAX_EDGE、MAX_BYTES、QUALITY。
 * 【注意事項】會「直接取代」原檔。原始大圖請另外保存在自己電腦或雲端（不要放在專案裡）。
 *            已經夠小的 JPG 不會被動到；檔名以「_」或「.」開頭的照片會略過。
 */
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

export const MAX_EDGE = 2000
export const MAX_BYTES = 500 * 1024
export const QUALITY = 80

const EXT = new Set(['.jpg', '.jpeg', '.png', '.webp'])

/** 這張照片需要處理嗎？回傳原因（不需要回傳 null） */
async function reasonFor(file, bytes) {
  const ext = path.extname(file).toLowerCase()
  if (ext === '.png' || ext === '.webp') return `${ext.slice(1).toUpperCase()} 轉 JPG`
  const meta = await sharp(file).metadata()
  const long = Math.max(meta.width ?? 0, meta.height ?? 0)
  if (long > MAX_EDGE) return `長邊 ${long}px → ${MAX_EDGE}px`
  if (bytes > MAX_BYTES) return '重新壓縮'
  return null
}

/**
 * 處理 public/images/ 裡太大的照片。
 * 回傳 { changed: [{ from, to, before, after, reason }], failed: [{ file, message }] }（路徑從 public/images/ 之後開始）
 */
export async function optimizeImages(root) {
  const imagesDir = path.join(root, 'public', 'images')
  const changed = []
  const failed = []
  const rel = (f) => path.relative(imagesDir, f).split(path.sep).join('/')

  const files = []
  const walk = (dir) => {
    if (!fs.existsSync(dir)) return
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      if (e.name.startsWith('.') || e.name.startsWith('_')) continue
      const full = path.join(dir, e.name)
      if (e.isDirectory()) walk(full)
      else if (EXT.has(path.extname(e.name).toLowerCase())) files.push(full)
    }
  }
  walk(imagesDir)

  for (const file of files) {
    try {
      const before = fs.statSync(file).size
      const reason = await reasonFor(file, before)
      if (!reason) continue
      const target = file.replace(/\.[^.]+$/, '.jpg')
      if (target.toLowerCase() !== file.toLowerCase() && fs.existsSync(target)) {
        failed.push({ file: rel(file), message: `同一個資料夾已經有 ${path.basename(target)}，請先改名其中一張` })
        continue
      }
      // 先讀進記憶體再寫回，避免 Windows 鎖住原檔
      const input = fs.readFileSync(file)
      const output = await sharp(input)
        .rotate()
        .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true })
        .flatten({ background: '#ffffff' })
        .jpeg({ quality: QUALITY, mozjpeg: true })
        .toBuffer()
      // 只是重新壓縮、結果卻沒有變小：保留原檔
      if (reason === '重新壓縮' && output.length >= before) continue
      const tmp = `${target}.tmp`
      fs.writeFileSync(tmp, output)
      if (target !== file) fs.rmSync(file)
      fs.renameSync(tmp, target)
      changed.push({ from: rel(file), to: rel(target), before, after: output.length, reason })
    } catch (err) {
      // 照片還在複製中、或檔案損壞：略過，下次再試
      failed.push({ file: rel(file), message: err instanceof Error ? err.message : String(err) })
    }
  }
  return { changed, failed }
}

export const kb = (bytes) => (bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`)

/** 給終端機看的一行說明 */
export const describe = (c) => `${c.from}${c.to !== c.from ? ` → ${path.basename(c.to)}` : ''}：${kb(c.before)} → ${kb(c.after)}（${c.reason}）`
