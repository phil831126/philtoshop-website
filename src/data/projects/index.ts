/**
 * 【控制畫面】無（彙整所有作品系列）
 * 【負責功能】依資料夾「自動」建立每組作品：
 *   - public/images/works/<分類>/<作品資料夾>/ 裡有照片＝一組作品（一個章節）
 *   - 照片依檔名排序，寬高自動讀取，照片數自動計算
 *   - 標題、模特、IG、日期、介紹、順序、封面、照片說明 → 讀取同資料夾的 info.txt（沒有 info.txt 時，標題自動用資料夾名稱）
 *   也提供查詢工具給頁面使用：依分類取得作品、找照片、取得封面。
 * 【資料來源】src/data/generated/images.ts（照片）、src/data/generated/content.ts（info.txt 文字），兩者皆自動產生。
 * 【常見修改】不需要修改。新增作品＝新增資料夾放照片；改文字＝改該資料夾的 info.txt。
 * 【注意事項】作品資料夾名稱同時是網址錨點（例如 /works/emotional#quiet-light）與首頁精選「連結」的寫法。
 */
import type { CategoryId, Photo, PhotoNote, PhotoRef, Project } from '@/types/portfolio'
import { imageFolders, imageSizes } from '../generated/images'
import { isCategoryId } from '../categories'
import { instagramLinks, num, pick, textFile, yes } from '../text'

const fileName = (src: string) => src.slice(src.lastIndexOf('/') + 1)
const stem = (name: string) => name.replace(/\.[^.]+$/, '')

/** 資料夾名稱 → 預設標題，例如 morning-window → Morning Window */
const titleFromFolder = (name: string) =>
  name
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')

/** info.txt 的「照片說明 03」「照片描述 03」→ { '03': { caption, alt } } */
function photoNotesFrom(fields: Record<string, string>): Record<string, PhotoNote> {
  const notes: Record<string, PhotoNote> = {}
  for (const [key, value] of Object.entries(fields)) {
    const m = /^(照片說明|照片描述) (.+)$/.exec(key)
    if (!m || !value.trim()) continue
    const id = stem(m[2]!)
    const note = (notes[id] ??= {})
    if (m[1] === '照片說明') note.caption = value.trim()
    else note.alt = value.trim()
  }
  return notes
}

function buildProject(folder: string, index: number): Project | undefined {
  const [, categoryId, id] = folder.split('/')
  if (!categoryId || !id || !isCategoryId(categoryId)) return undefined
  const t = textFile(folder).fields
  const title = pick(t, '標題', titleFromFolder(id))
  const photoNotes = photoNotesFrom(t)
  const files = imageFolders[folder] ?? []
  const used = new Set<string>()
  const photos: Photo[] = files.map((src, i) => {
    const name = fileName(src)
    let pid = stem(name)
    if (used.has(pid)) pid = name
    used.add(pid)
    const note = photoNotes[pid]
    const [width, height] = imageSizes[src] ?? [1080, 1620]
    return {
      id: pid,
      src: encodeURI(src),
      width,
      height,
      alt: note?.alt ?? `${title} — photo ${i + 1} of ${files.length}`,
      caption: note?.caption,
    }
  })
  const wantedCover = stem(pick(t, '封面'))
  const cover = photos.find((p) => p.id === wantedCover) ?? photos[0]
  return {
    id,
    categoryId,
    folder,
    title,
    model: pick(t, '模特'),
    instagram: instagramLinks(t['IG']),
    date: pick(t, '日期'),
    description: pick(t, '介紹'),
    // 沒寫順序的作品排在有寫的後面，依資料夾名稱
    order: num(t['順序'], 1000 + index),
    published: yes(t['顯示']),
    coverPhotoId: cover?.id ?? '',
    requestedCover: wantedCover,
    photoNotes,
    photos,
  }
}

/** 全部作品（含不顯示的），依資料夾自動建立 */
export const allProjects: Project[] = Object.keys(imageFolders)
  .filter((f) => f.startsWith('works/') && f.split('/').length === 3)
  .map((f, i) => buildProject(f, i))
  .filter((p): p is Project => Boolean(p))

/** 取得某分類「要顯示」的作品，依順序排列 */
export function getPublishedProjects(categoryId: CategoryId): Project[] {
  return allProjects
    .filter((p) => p.categoryId === categoryId && p.published)
    .sort((a, b) => a.order - b.order || a.id.localeCompare(b.id, 'en', { numeric: true }))
}

/** 依作品資料夾名稱取得作品（可指定分類，避免不同分類用了同一個資料夾名稱） */
export function getProject(projectId: string, categoryId?: string): Project | undefined {
  return allProjects.find((p) => p.id === projectId && (!categoryId || p.categoryId === categoryId))
}

/** 依 { projectId, photoId } 取得照片；photoId 留空＝該作品的封面 */
export function getPhoto(ref: PhotoRef, categoryId?: string): Photo | undefined {
  const project = getProject(ref.projectId, categoryId)
  if (!project) return undefined
  if (!ref.photoId) return getCoverPhoto(project)
  return project.photos.find((ph) => ph.id === ref.photoId)
}

/** 作品封面：找不到時退回第一張 */
export function getCoverPhoto(project: Project): Photo | undefined {
  return project.photos.find((ph) => ph.id === project.coverPhotoId) ?? project.photos[0]
}

/** 照片總數格式化，例如 6 → "06 PHOTOS"、1 → "01 PHOTO" */
export function formatPhotoCount(count: number): string {
  return `${String(count).padStart(2, '0')} ${count === 1 ? 'PHOTO' : 'PHOTOS'}`
}
