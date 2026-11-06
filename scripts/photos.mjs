/**
 * 【控制畫面】無（在終端機執行的輔助工具，不會被打包進網站）
 * 【負責功能】
 *   npm.cmd run photos        更新照片清單，並列出每組作品有幾張照片、需要注意的檔案、
 *                             以及「有照片資料夾但還沒建立作品資料」的地方（附可直接貼上的內容）。
 *   npm.cmd run photos:check  同上，若有錯誤（照片找不到、檔名大小寫不符）會以錯誤結束。
 *                             npm run build 會自動先執行這個檢查。
 * 【資料來源】public/images/、src/data/
 * 【常見修改】不需要修改。
 * 【注意事項】只讀取照片與資料檔，唯一會寫入的是自動產生的 src/data/generated/images.ts。
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { writeManifest } from './image-manifest.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const strict = process.argv[2] === 'check'
const kb = (bytes) => `${Math.round(bytes / 1024)} KB`

const { scan } = writeManifest(root)
const errors = []
const warnings = []

// ── 讀取作品資料（src/data/projects/*.ts）中的 id、categoryId、folder ──
const projectsDir = path.join(root, 'src', 'data', 'projects')
const entries = []
for (const file of fs.readdirSync(projectsDir).filter((f) => f.endsWith('.ts') && f !== 'index.ts')) {
  const text = fs.readFileSync(path.join(projectsDir, file), 'utf8')
  const re = /\bid:\s*'([^']+)'[^\n]*\n\s*categoryId:\s*'([^']+)'/g
  let m
  while ((m = re.exec(text))) {
    const block = text.slice(m.index, text.indexOf('\n  },', m.index))
    const folder = /folder:\s*'([^']+)'/.exec(block)?.[1] ?? `works/${m[2]}/${m[1]}`
    const line = text.slice(0, m.index).split('\n').length
    entries.push({ id: m[1], categoryId: m[2], folder, where: `src/data/projects/${file}:${line}` })
  }
}

// ── 每張照片的檔案提醒 ──
for (const d of scan.details) {
  if (/[A-Z]/.test(d.name)) warnings.push(`${d.url}：檔名有大寫字母，建議改成小寫`)
  if (/\s/.test(d.name)) warnings.push(`${d.url}：檔名有空白，建議改用連字號 -`)
  if (/[^\x00-\x7f]/.test(d.name)) warnings.push(`${d.url}：檔名有中文或特殊字元，建議改用英文與數字`)
  if (d.bytes > 800 * 1024) warnings.push(`${d.url}：檔案 ${kb(d.bytes)}，建議縮小到 500 KB 左右`)
  if (Math.max(d.width, d.height) > 2600) warnings.push(`${d.url}：尺寸 ${d.width}×${d.height}，建議長邊縮到 1600～2000 px`)
  if (d.hasGps) warnings.push(`${d.url}：含 GPS 拍攝地點，公開前建議移除（右鍵 → 內容 → 詳細資料 → 移除內容和個人資訊）`)
}
for (const u of scan.unreadable) errors.push(`${u}：無法讀取（檔案可能損壞，或不是真正的 JPG／PNG／WebP）`)

// ── 作品資料 ↔ 照片資料夾 ──
const usedFolders = new Set(entries.map((e) => e.folder))
for (const e of entries) {
  if (!scan.folders[e.folder]) warnings.push(`${e.where}  作品「${e.id}」的資料夾 public/images/${e.folder}/ 還沒有照片`)
}

const orphanFolders = Object.keys(scan.folders).filter((f) => f.startsWith('works/') && f.split('/').length === 3 && !usedFolders.has(f))

// ── 首頁、About 等直接指定路徑的照片 ──
const dataDir = path.join(root, 'src', 'data')
const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => (d.isDirectory() ? (d.name === 'generated' ? [] : walk(path.join(dir, d.name))) : [path.join(dir, d.name)]))
for (const file of walk(dataDir).filter((f) => f.endsWith('.ts'))) {
  const text = fs.readFileSync(file, 'utf8')
  const rel = path.relative(root, file).split(path.sep).join('/')
  const re = /['"`](\/images\/[^'"`]+\.(?:jpe?g|png|webp))['"`]/gi
  let m
  while ((m = re.exec(text))) {
    if (scan.sizes[m[1]]) continue
    const line = text.slice(0, m.index).split('\n').length
    const near = Object.keys(scan.sizes).find((k) => k.toLowerCase() === m[1].toLowerCase())
    errors.push(`${rel}:${line}  找不到 ${m[1]}${near ? `（大小寫不符，實際檔名是 ${near}）` : ''}`)
  }
}

// ── 輸出 ──
const byCategory = {}
for (const e of entries) (byCategory[e.categoryId] ??= []).push(e)
console.log('\n照片清單已更新。各組作品目前的照片數：')
for (const [cat, list] of Object.entries(byCategory)) {
  const parts = list.map((e) => `${e.id} ${String(scan.folders[e.folder]?.length ?? 0).padStart(2, '0')} 張`)
  console.log(`  ${cat.padEnd(11)} ${parts.join('、')}`)
}

if (orphanFolders.length) {
  console.log('\n📁 以下資料夾有照片，但還沒有作品資料（網站不會顯示）：')
  for (const f of orphanFolders) {
    const [, cat, id] = f.split('/')
    const title = id.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    console.log(`\n  ${f}（${scan.folders[f].length} 張）→ 貼到 src/data/projects/${cat}.ts 的 [ ] 裡：`)
    console.log(`  {
    id: '${id}',
    categoryId: '${cat}',
    title: '${title}',
    description: 'Write one sentence about this series.',
    order: ${(byCategory[cat]?.length ?? 0) + 1},
    published: true,
  },`)
  }
}

if (warnings.length) {
  console.log(`\n⚠ 建議處理（${warnings.length}）：`)
  for (const w of warnings) console.log(`  - ${w}`)
}
if (errors.length) {
  console.log(`\n✖ 必須修正（${errors.length}）：`)
  for (const e of errors) console.log(`  - ${e}`)
  if (strict) process.exitCode = 1
}
if (!errors.length) console.log(`\n✔ 共 ${scan.details.length} 張照片，沒有找不到的檔案。`)
console.log('')
