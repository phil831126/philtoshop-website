/**
 * 【控制畫面】無（建置輔助工具，不會被打包進網站）
 * 【負責功能】讀取 public/images/ 各資料夾裡的 info.txt（網站文字），轉成網站使用的資料。
 *            寫法是一行一個「欄位：內容」，不用引號、逗號，也不用寫程式。
 * 【資料來源】
 *   public/images/info.txt                        全站：網站名稱、副標、Instagram、Email
 *   public/images/home/info.txt                   首頁：標語、毛玻璃小卡、精選
 *   public/images/about/info.txt                  About 頁
 *   public/images/works/<分類>/info.txt           分類：名稱、介紹、總覽封面
 *   public/images/works/<分類>/<系列>/info.txt    每組作品：標題、介紹、封面、順序、照片說明
 * 【常見修改】不需要修改。可用的欄位名稱列在下方 KEYS。
 * 【注意事項】
 *   - 冒號用全形「：」或半形「:」都可以；欄位名稱前後的空白不影響。
 *   - 內容可以寫好幾行；空一行＝新段落。
 *   - 「# 」（井字號＋空白）開頭的行是說明，不會出現在網站上；#hashtag（沒有空白）會當成一般文字。
 *   - 看不懂的欄位名稱會在終端機與瀏覽器主控台提醒，並標出第幾行。
 */
import fs from 'node:fs'
import path from 'node:path'

export const TEXT_FILE = 'info.txt'

/** 每一種 info.txt 可以使用的欄位 */
export const KEYS = {
  site: ['網站名稱', '副標', '分頁標題', '版權', 'Instagram', 'Instagram顯示文字', 'Email'],
  home: ['主照片', '主照片描述', '主照片對焦', '標語', '按鈕文字', '小卡小字', '小卡大字', '小卡連結', '精選標題'],
  featured: ['照片', '照片描述', '對焦', '編號', '標題', '介紹', '連結', '顯示'],
  about: ['照片', '照片描述', '標題', '理念', '自我介紹'],
  category: ['名稱', '介紹', '總覽介紹', '總覽封面', '順序'],
  series: ['標題', '模特', 'IG', '日期', '介紹', '封面', '順序', '顯示'],
}

/** 作品系列欄位的其他常見寫法（寫成這些也看得懂） */
const SERIES_ALIASES = {
  模特兒: '模特',
  模特名字: '模特',
  model: '模特',
  instagram: 'IG',
  模特ig: 'IG',
  時間: '日期',
  date: '日期',
}

/** 每張照片的欄位（只用在系列資料夾），例如「照片說明 03：Taipei, 2026」 */
const PHOTO_KEYS = ['照片說明', '照片描述']

const KIND_NAMES = {
  site: '全站文字',
  home: '首頁文字',
  about: 'About 頁文字',
  category: '分類文字',
  series: '作品系列文字',
}

/** 依資料夾位置判斷是哪一種 info.txt；不支援的位置回傳 null */
export function kindOf(rel) {
  if (rel === '') return 'site'
  if (rel === 'home' || rel === 'about') return rel
  const parts = rel.split('/')
  if (parts[0] === 'works' && parts.length === 2) return 'category'
  if (parts[0] === 'works' && parts.length === 3) return 'series'
  return null
}

export const kindName = (kind) => KIND_NAMES[kind] ?? kind

const squash = (s) => s.replace(/\s+/g, '').toLowerCase()
const hasCjk = (s) => /[㐀-鿿]/.test(s)

/** 把使用者寫的欄位名稱轉成標準名稱；不認得回傳 null */
function canonicalKey(raw, kind, inSection) {
  const list = inSection ? KEYS.featured : (KEYS[kind] ?? [])
  const key = squash(raw)
  const hit = list.find((k) => squash(k) === key)
  if (hit) return hit
  if (kind === 'series') {
    if (SERIES_ALIASES[key]) return SERIES_ALIASES[key]
    for (const p of PHOTO_KEYS) {
      if (key.startsWith(p) && key.length > p.length) return `${p} ${raw.replace(/\s+/g, '').slice(p.length)}`
    }
  }
  return null
}

/**
 * 解析一個 info.txt。
 * 回傳 { fields, sections, problems }：
 *  - fields：{ 欄位: 內容 }
 *  - sections：首頁的【精選 1】【精選 2】…區段，每段 { title, fields }
 *  - problems：[{ line, message }]
 */
export function parseTextFile(text, kind) {
  const lines = text.replace(/^﻿/, '').split(/\r?\n/)
  const file = { fields: {}, sections: [], problems: [] }
  let target = file.fields
  let inSection = false
  let key = null
  let buf = []

  const flush = () => {
    if (key) {
      target[key] = buf
        .join('\n')
        .replace(/\n{3,}/g, '\n\n')
        .trim()
    }
    key = null
    buf = []
  }

  lines.forEach((raw, i) => {
    const line = raw.replace(/\s+$/, '')
    const lineNo = i + 1
    if (/^\s*#(\s|$)/.test(line)) return

    // 首頁的區段標題，例如【精選 1】或 [精選 1]
    const sec = kind === 'home' ? /^\s*[[【]\s*([^\]】]+?)\s*[\]】]\s*$/.exec(line) : null
    if (sec) {
      flush()
      const s = { title: sec[1], fields: {} }
      file.sections.push(s)
      target = s.fields
      inSection = true
      return
    }

    const m = /^\s*([^:：]{1,24}?)\s*[:：]\s*(.*)$/.exec(line)
    if (m) {
      const canon = canonicalKey(m[1], kind, inSection)
      if (canon) {
        flush()
        key = canon
        buf = [m[2].trim()]
        return
      }
      // 看起來像中文欄位名稱、但不認得：提醒（英文開頭的句子例如「Note: …」當成一般文字）
      const name = m[1].trim()
      if (hasCjk(name) && !/\s/.test(name) && name.length <= 10) {
        const allowed = (inSection ? KEYS.featured : KEYS[kind] ?? []).join('、')
        // 打錯字的欄位名稱不放進網站，避免奇怪的文字出現在頁面上
        file.problems.push({
          line: lineNo,
          message: `看不懂的欄位「${name}」，這一行不會顯示在網站上（可以用的欄位：${allowed}）。如果這行是內容文字，把冒號改成「 — 」即可`,
        })
        return
      }
    }

    if (key) buf.push(line.trim())
    else if (line.trim()) file.problems.push({ line: lineNo, message: `這一行沒有對應的欄位，請寫成「欄位：內容」` })
  })
  flush()
  return file
}

/** 掃描 public/images 內所有 info.txt */
export function scanTextFiles(root) {
  const imagesDir = path.join(root, 'public', 'images')
  const files = {}
  const problems = []
  const walk = (dir) => {
    if (!fs.existsSync(dir)) return
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, e.name)
      if (e.isDirectory()) {
        walk(full)
        continue
      }
      if (e.name.toLowerCase() !== TEXT_FILE) continue
      const rel = path.relative(imagesDir, dir).split(path.sep).join('/')
      const where = `public/images/${rel ? rel + '/' : ''}${e.name}`
      const kind = kindOf(rel)
      if (!kind) {
        problems.push({ file: where, line: 0, message: '這個位置的 info.txt 不會被使用' })
        continue
      }
      const parsed = parseTextFile(fs.readFileSync(full, 'utf8'), kind)
      files[rel] = { fields: parsed.fields, sections: parsed.sections }
      for (const p of parsed.problems) problems.push({ file: where, ...p })
    }
  }
  walk(imagesDir)
  return { files, problems }
}

/** 產生 src/data/generated/content.ts 的內容 */
export function renderContent({ files, problems }) {
  const sorted = Object.fromEntries(Object.entries(files).sort(([a], [b]) => a.localeCompare(b, 'en', { numeric: true })))
  return `/**
 * ⚠ 此檔由 scripts/content-files.mjs 自動產生，請勿手動修改。
 * 【負責功能】public/images/ 各資料夾 info.txt 的文字內容。要改網站文字，請改那些 info.txt。
 * 【何時更新】npm run dev 期間存檔 info.txt 時、npm run build、npm run photos 都會自動重新產生。
 */

export interface TextSection {
  title: string
  fields: Record<string, string>
}

export interface TextFile {
  fields: Record<string, string>
  sections: TextSection[]
}

export const textFiles: Record<string, TextFile> = ${JSON.stringify(sorted, null, 2)}

/** info.txt 中看不懂的寫法（開發模式會顯示在瀏覽器主控台） */
export const textProblems: { file: string; line: number; message: string }[] = ${JSON.stringify(problems, null, 2)}
`
}
