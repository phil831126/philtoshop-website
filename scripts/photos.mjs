/**
 * 【控制畫面】無（在終端機執行的輔助工具，不會被打包進網站）
 * 【負責功能】
 *   npm.cmd run photos        更新照片清單與文字，列出每組作品有幾張照片、需要注意的檔案與 info.txt 寫法；
 *                             新的作品資料夾若還沒有 info.txt，會自動建立一份範本（不會覆蓋已存在的檔案）。
 *   npm.cmd run photos:check  只檢查、不建立檔案；有錯誤（照片找不到、檔名大小寫不符）會以錯誤結束。
 *                             npm run build 會自動先執行這個檢查。
 * 【資料來源】public/images/（照片與 info.txt）
 * 【常見修改】不需要修改。
 * 【注意事項】會寫入的只有：自動產生的 src/data/generated/ 兩個檔案，以及「不存在的」info.txt 範本。
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { writeManifest } from './image-manifest.mjs'
import { seriesTemplate, titleFromFolder } from './info-templates.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const strict = process.argv[2] === 'check'
const kb = (bytes) => `${Math.round(bytes / 1024)} KB`
const imagesDir = path.join(root, 'public', 'images')
const CATEGORIES = ['emotional', 'style', 'monochrome', 'ordinary', 'shore', 'viscera']

let { scan, text } = writeManifest(root)
const errors = []
const warnings = []
const created = []

// ── 新作品資料夾：自動建立 info.txt 範本 ──
const seriesFolders = Object.keys(scan.folders).filter((f) => f.startsWith('works/') && f.split('/').length === 3)
if (!strict) {
  for (const folder of seriesFolders) {
    const file = path.join(imagesDir, ...folder.split('/'), 'info.txt')
    const hasAny = fs.readdirSync(path.dirname(file)).some((n) => n.toLowerCase() === 'info.txt')
    if (hasAny) continue
    const id = folder.split('/')[2]
    fs.writeFileSync(file, seriesTemplate({ title: titleFromFolder(id) }).replace(/\n/g, '\r\n'))
    created.push(`public/images/${folder}/info.txt`)
  }
  if (created.length) ({ scan, text } = writeManifest(root))
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

// ── info.txt 寫法 ──
for (const p of text.problems) warnings.push(`${p.file}${p.line ? ` 第 ${p.line} 行` : ''}：${p.message}`)

for (const folder of Object.keys(scan.folders)) {
  const [top, cat, , extra] = folder.split('/')
  if (top === 'works' && cat && !CATEGORIES.includes(cat)) {
    warnings.push(`public/images/works/${cat}/：不是六個分類之一（${CATEGORIES.join('、')}），網站不會顯示`)
  }
  if (top === 'works' && extra !== undefined) warnings.push(`public/images/${folder}/：資料夾放太深了，作品照片請直接放在 works/<分類>/<作品>/ 裡`)
}
for (const folder of Object.keys(text.files)) {
  if (folder.split('/').length === 3 && folder.startsWith('works/') && !scan.folders[folder]) {
    warnings.push(`public/images/${folder}/：有 info.txt 但還沒有照片，這組作品暫時不會顯示`)
  }
}

// ── 首頁、About 指定的照片是否存在（大小寫也要一致，Vercel 會區分） ──
const imagePath = (folder, value, fallback) => {
  const v = (value?.trim() || fallback).replace(/\\/g, '/')
  const clean = v.replace(/^\/+/, '').replace(/^public\//, '').replace(/^images\//, '')
  return clean.includes('/') ? `/images/${clean}` : `/images/${folder}/${clean}`
}
const checkImage = (where, url) => {
  if (scan.sizes[url]) return
  const near = Object.keys(scan.sizes).find((k) => k.toLowerCase() === url.toLowerCase())
  errors.push(`${where}：找不到照片 ${url}${near ? `（大小寫不符，實際檔名是 ${near}）` : ''}`)
}
const home = text.files['home'] ?? { fields: {}, sections: [] }
checkImage('public/images/home/info.txt「主照片」', imagePath('home', home.fields['主照片'], 'hero.jpg'))
home.sections.forEach((s, i) => checkImage(`public/images/home/info.txt【${s.title}】「照片」`, imagePath('home', s.fields['照片'], `featured-${i + 1}.jpg`)))
const about = text.files['about'] ?? { fields: {} }
checkImage('public/images/about/info.txt「照片」', imagePath('about', about.fields['照片'], 'portrait.jpg'))

// ── 封面 ──
const stem = (n) => n.replace(/\.[^.]+$/, '')
const photoIds = (folder) => (scan.folders[folder] ?? []).map((u) => stem(u.slice(u.lastIndexOf('/') + 1)))
for (const folder of seriesFolders) {
  const cover = text.files[folder]?.fields['封面']?.trim()
  if (cover && !photoIds(folder).includes(stem(cover))) warnings.push(`public/images/${folder}/info.txt「封面」：找不到照片「${cover}」，會改用第一張`)
}
for (const cat of CATEGORIES) {
  const cover = text.files[`works/${cat}`]?.fields['總覽封面']?.trim()
  if (!cover) continue
  const [proj, photo] = cover.split('/').map((s) => s.trim())
  const folder = `works/${cat}/${proj}`
  if (!scan.folders[folder]) warnings.push(`public/images/works/${cat}/info.txt「總覽封面」：找不到作品資料夾「${proj}」`)
  else if (photo && !photoIds(folder).includes(stem(photo))) warnings.push(`public/images/works/${cat}/info.txt「總覽封面」：${proj} 裡沒有照片「${photo}」`)
}

// ── 輸出 ──
console.log('\n照片與文字已更新。各組作品目前的照片數：')
for (const cat of CATEGORIES) {
  const order = (f) => Number(text.files[f]?.fields['順序']?.trim() || NaN)
  const list = seriesFolders
    .filter((f) => f.split('/')[1] === cat)
    .sort((a, b) => (order(a) || 1000) - (order(b) || 1000) || a.localeCompare(b, 'en', { numeric: true }))
  if (!list.length) continue
  const parts = list.map((f) => {
    const t = text.files[f]?.fields ?? {}
    const hidden = /^(否|不|不要|不顯示|隱藏|no|n|false|0|off)$/i.test(t['顯示']?.trim() ?? '')
    return `${t['標題']?.trim() || titleFromFolder(f.split('/')[2])} ${String(scan.folders[f].length).padStart(2, '0')} 張${hidden ? '（不顯示）' : ''}`
  })
  console.log(`  ${cat.padEnd(11)} ${parts.join('、')}`)
}

if (created.length) {
  console.log(`\n📝 新作品資料夾已自動建立文字檔（打開改「標題」「介紹」即可）：`)
  for (const c of created) console.log(`  - ${c}`)
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
