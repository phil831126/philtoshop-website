/**
 * 【控制畫面】無（建置輔助工具，不會被打包進網站）
 * 【負責功能】掃描 public/images/ 內所有照片（以及各資料夾的 info.txt 文字，見 content-files.mjs），讀取實際寬高（含手機旋轉標記換算），
 *            寫入 src/data/generated/images.ts，讓網站「放進資料夾就自動顯示」。
 *            npm run dev 期間偵測到照片新增／刪除會自動重新產生；npm run build 也會先執行。
 *            新的作品資料夾放進照片後，會自動建立 info.txt 範本（createMissingSeriesInfo）。
 * 【資料來源】public/images/ 內的 JPG、PNG、WebP。
 * 【常見修改】不需要修改。
 * 【注意事項】
 *   - 檔名以「_」或「.」開頭的照片會被略過（可用來暫時不顯示某張照片）。
 *   - 只讀取照片，不會修改或刪除任何照片；唯一會建立的檔案是「不存在的」info.txt 範本。
 */
import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { renderContent, scanTextFiles } from './content-files.mjs'
import { seriesTemplate } from './info-templates.mjs'

export const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp'])

// ───────────── 讀取圖片尺寸 ─────────────

/** 讀取 JPEG 的 EXIF：旋轉方向、是否含 GPS 位置 */
function readExif(buf, start, length) {
  const out = { orientation: 1, hasGps: false }
  if (buf.toString('ascii', start, start + 4) !== 'Exif') return out
  const tiff = start + 6
  const little = buf.toString('ascii', tiff, tiff + 2) === 'II'
  const u16 = (o) => (little ? buf.readUInt16LE(o) : buf.readUInt16BE(o))
  const u32 = (o) => (little ? buf.readUInt32LE(o) : buf.readUInt32BE(o))
  const end = start + length
  try {
    const ifd0 = tiff + u32(tiff + 4)
    const count = u16(ifd0)
    for (let i = 0; i < count; i++) {
      const entry = ifd0 + 2 + i * 12
      if (entry + 12 > end) break
      const tag = u16(entry)
      if (tag === 0x0112) out.orientation = u16(entry + 8)
      if (tag === 0x8825) {
        const gpsIfd = tiff + u32(entry + 8)
        if (gpsIfd + 2 <= end && u16(gpsIfd) > 0) out.hasGps = true
      }
    }
  } catch {
    // EXIF 格式異常時忽略
  }
  return out
}

function jpegInfo(buf) {
  let offset = 2
  let exif = { orientation: 1, hasGps: false }
  while (offset + 9 < buf.length) {
    if (buf[offset] !== 0xff) {
      offset++
      continue
    }
    const marker = buf[offset + 1]
    if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
      offset += 2
      continue
    }
    const length = buf.readUInt16BE(offset + 2)
    if (marker === 0xe1) exif = readExif(buf, offset + 4, length - 2)
    const isSof = marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)
    if (isSof) return { width: buf.readUInt16BE(offset + 7), height: buf.readUInt16BE(offset + 5), ...exif }
    offset += 2 + length
  }
  return null
}

function pngInfo(buf) {
  if (buf.toString('ascii', 1, 4) !== 'PNG') return null
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20), orientation: 1, hasGps: false }
}

function webpInfo(buf) {
  if (buf.toString('ascii', 0, 4) !== 'RIFF' || buf.toString('ascii', 8, 12) !== 'WEBP') return null
  const chunk = buf.toString('ascii', 12, 16)
  const base = { orientation: 1, hasGps: false }
  if (chunk === 'VP8X') return { width: 1 + buf.readUIntLE(24, 3), height: 1 + buf.readUIntLE(27, 3), ...base }
  if (chunk === 'VP8 ') return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff, ...base }
  if (chunk === 'VP8L') {
    const b = buf.readUInt32LE(21)
    return { width: (b & 0x3fff) + 1, height: ((b >> 14) & 0x3fff) + 1, ...base }
  }
  return null
}

/** 回傳網站實際顯示的寬高（已套用手機旋轉標記）；無法讀取時回傳 null */
export function imageInfo(file) {
  const buf = fs.readFileSync(file)
  let info = null
  if (buf[0] === 0xff && buf[1] === 0xd8) info = jpegInfo(buf)
  else if (buf[0] === 0x89) info = pngInfo(buf)
  else info = webpInfo(buf)
  if (!info) return null
  const rotated = info.orientation >= 5 && info.orientation <= 8
  return {
    width: rotated ? info.height : info.width,
    height: rotated ? info.width : info.height,
    rotated,
    hasGps: info.hasGps,
    bytes: buf.length,
    // 內容指紋：換了同檔名的照片，網址的 ?v= 也會跟著變，瀏覽器就不會繼續用舊圖
    hash: crypto.createHash('md5').update(buf).digest('hex').slice(0, 8),
  }
}

// ───────────── 產生清單 ─────────────

export const naturalSort = (a, b) => a.localeCompare(b, 'en', { numeric: true, sensitivity: 'base' })

const isVisibleImage = (name) => !name.startsWith('.') && !name.startsWith('_') && IMAGE_EXT.has(path.extname(name).toLowerCase())

/**
 * 掃描 public/images，回傳：
 *  - sizes：{ '/images/…/01.jpg': [寬, 高] }
 *  - folders：{ 'works/emotional/quiet-light': ['/images/works/emotional/quiet-light/01.jpg', …] }（依檔名排序）
 *  - details：每張照片的檔案資訊（給檢查工具使用）
 */
export function scanImages(root) {
  const imagesDir = path.join(root, 'public', 'images')
  const sizes = {}
  const versions = {}
  const folders = {}
  const details = []
  const unreadable = []

  const walk = (dir) => {
    if (!fs.existsSync(dir)) return
    const entries = fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => naturalSort(a.name, b.name))
    const rel = path.relative(imagesDir, dir).split(path.sep).join('/')
    const list = []
    for (const e of entries) {
      const full = path.join(dir, e.name)
      if (e.isDirectory()) {
        walk(full)
        continue
      }
      if (!isVisibleImage(e.name)) continue
      const url = `/images/${rel ? rel + '/' : ''}${e.name}`
      const info = imageInfo(full)
      if (!info) {
        unreadable.push(url)
        continue
      }
      sizes[url] = [info.width, info.height]
      versions[url] = info.hash
      details.push({ url, name: e.name, folder: rel, ...info })
      list.push(url)
    }
    if (list.length && rel) folders[rel] = list
  }
  walk(imagesDir)
  return { sizes, versions, folders, details, unreadable }
}

function render({ sizes, versions, folders }) {
  const q = (s) => `'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`
  const versionLines = Object.entries(versions).map(([k, v]) => `  ${q(k)}: '${v}',`)
  const sizeLines = Object.entries(sizes).map(([k, [w, h]]) => `  ${q(k)}: [${w}, ${h}],`)
  const folderLines = Object.entries(folders).map(([k, list]) => `  ${q(k)}: [\n${list.map((u) => `    ${q(u)},`).join('\n')}\n  ],`)
  return `/**
 * ⚠ 此檔由 scripts/image-manifest.mjs 自動產生，請勿手動修改。
 * 【負責功能】public/images/ 內每張照片的實際寬高，以及每個資料夾的照片清單（依檔名排序）。
 * 【何時更新】npm run dev 期間放入或刪除照片時、npm run build、npm run photos 都會自動重新產生。
 */

export const imageSizes: Record<string, readonly [number, number]> = {
${sizeLines.join('\n')}
}

/** 每張照片的內容指紋，網址會加上 ?v=指紋（換同名照片時瀏覽器才會抓新圖） */
export const imageVersions: Record<string, string> = {
${versionLines.join('\n')}
}

export const imageFolders: Record<string, readonly string[]> = {
${folderLines.join('\n')}
}
`
}

/** 內容沒變時不寫入（避免開發伺服器重複重新整理）。回傳是否有更新 */
function writeIfChanged(file, next) {
  const prev = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : ''
  if (prev === next) return false
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, next)
  return true
}

/**
 * 產生 src/data/generated/images.ts（照片清單）與 src/data/generated/content.ts（info.txt 文字）。
 * 回傳 { changed: 是否有任一檔更新, scan: 照片掃描結果, text: 文字掃描結果 }
 */
export function writeManifest(root) {
  const scan = scanImages(root)
  const text = scanTextFiles(root)
  const dir = path.join(root, 'src', 'data', 'generated')
  const a = writeIfChanged(path.join(dir, 'images.ts'), render(scan))
  const b = writeIfChanged(path.join(dir, 'content.ts'), renderContent(text))
  return { changed: a || b, scan, text }
}

const CATEGORIES = ['emotional', 'style', 'monochrome', 'ordinary', 'shore', 'viscera']

/**
 * 新作品資料夾（works/<分類>/<作品>/ 裡有照片、但還沒有 info.txt）→ 自動建立 info.txt 範本。
 * npm run dev 期間放進照片就會執行；npm run photos 也會執行。
 * 只建立「不存在」的檔案，絕不覆蓋已寫好的 info.txt。回傳建立的檔案清單（public/images/ 開頭）。
 */
export function createMissingSeriesInfo(root, scan) {
  const created = []
  for (const folder of Object.keys(scan.folders)) {
    const parts = folder.split('/')
    if (parts.length !== 3 || parts[0] !== 'works' || !CATEGORIES.includes(parts[1])) continue
    const dir = path.join(root, 'public', 'images', ...parts)
    if (!fs.existsSync(dir) || fs.readdirSync(dir).some((n) => n.toLowerCase() === 'info.txt')) continue
    fs.writeFileSync(path.join(dir, 'info.txt'), seriesTemplate({}).replace(/\n/g, '\r\n'))
    created.push(`public/images/${folder}/info.txt`)
  }
  return created
}
