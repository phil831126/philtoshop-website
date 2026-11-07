/**
 * 【控制畫面】無（資料工具）
 * 【負責功能】讀取 info.txt 的文字（已由 scripts/content-files.mjs 轉成 src/data/generated/content.ts），
 *            並提供小工具：取欄位、轉段落、是／否、數字、對焦位置、照片路徑。
 * 【資料來源】public/images/ 各資料夾的 info.txt。
 * 【常見修改】不需要修改。要改網站文字請直接改 info.txt。
 * 【注意事項】info.txt 沒寫或留空的欄位會使用各資料檔裡的預設值。
 */
import { textFiles, type TextFile } from './generated/content'

const EMPTY: TextFile = { fields: {}, sections: [] }

/** 取得某資料夾（public/images/ 之後的路徑）的 info.txt；沒有則回傳空白內容。全站文字的資料夾是 '' */
export function textFile(folder: string): TextFile {
  return textFiles[folder] ?? EMPTY
}

/** 取欄位文字；沒寫或留空時用預設值 */
export function pick(fields: Record<string, string>, key: string, fallback = ''): string {
  const v = fields[key]?.trim()
  return v ? v : fallback
}

/** 空一行＝新段落；段落內的換行視為空白 */
export function paragraphs(text: string): string[] {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\s*\n\s*/g, ' ').trim())
    .filter(Boolean)
}

/** 「否／no／false／隱藏」＝false，其餘（含沒寫）＝預設值 */
export function yes(value: string | undefined, fallback = true): boolean {
  const v = value?.trim()
  if (!v) return fallback
  return !/^(否|不|不要|不顯示|隱藏|no|n|false|0|off)$/i.test(v)
}

/** 數字欄位；沒寫或不是數字時用預設值 */
export function num(value: string | undefined, fallback: number): number {
  const v = value?.trim()
  if (!v) return fallback
  const n = Number(v)
  return Number.isFinite(n) ? n : fallback
}

const FOCUS: Record<string, string> = {
  上: 'center 20%',
  偏上: 'center 35%',
  中: 'center',
  中間: 'center',
  置中: 'center',
  偏下: 'center 65%',
  下: 'center 80%',
  左: 'left center',
  右: 'right center',
}

/** 對焦位置：上／中／下、百分比（40%＝垂直 40%），或 CSS 寫法（center 30%） */
export function focus(value: string | undefined): string | undefined {
  const v = value?.trim()
  if (!v) return undefined
  if (FOCUS[v]) return FOCUS[v]
  if (/^\d{1,3}%$/.test(v)) return `center ${v}`
  return v
}

/**
 * 照片欄位轉成網址：
 *  - 只寫檔名（hero.jpg）＝同一個資料夾
 *  - 有斜線（works/emotional/quiet-light/03.jpg）＝從 images/ 開始的路徑
 */
export function imagePath(folder: string, value: string | undefined, fallback: string): string {
  const v = (value?.trim() || fallback).replace(/\\/g, '/')
  const clean = v.replace(/^\/+/, '').replace(/^public\//, '').replace(/^images\//, '')
  return clean.includes('/') ? `/images/${clean}` : `/images/${folder ? folder + '/' : ''}${clean}`
}

/** 一個 Instagram 連結 */
export interface InstagramLink {
  /** 顯示文字，例如 @your_account */
  label: string
  /** 個人頁網址 */
  url: string
}

/**
 * Instagram 欄位 → 連結。可填 @帳號、帳號，或個人頁網址；
 * 有好幾個帳號時用空白、逗號或「、」分開，例如「@model_a、@model_b」。
 */
export function instagramLinks(value: string | undefined): InstagramLink[] {
  return (value ?? '')
    .split(/[\s,，、]+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((v) => {
      if (/^https?:\/\//i.test(v)) {
        const handle = /instagram\.com\/([^/?#]+)/i.exec(v)?.[1]
        return { url: v, label: handle ? `@${handle}` : 'Instagram' }
      }
      const handle = v.replace(/^@/, '').replace(/^(www\.)?instagram\.com\//i, '').replace(/\/+$/, '')
      return { url: `https://www.instagram.com/${encodeURIComponent(handle)}/`, label: `@${handle}` }
    })
}
