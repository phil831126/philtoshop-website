/**
 * 【控制畫面】無（彙整六個分類的作品資料）
 * 【負責功能】把 emotional.ts ～ viscera.ts 合併，並依照片資料夾「自動」帶入每組作品的照片：
 *            public/images/works/<分類>/<作品id>/ 內的照片依檔名排序，寬高自動讀取，照片數自動計算。
 *            也提供查詢工具給頁面使用：依分類取得作品、找照片、取得封面。
 * 【資料來源】同資料夾的六個分類檔、src/data/generated/images.ts（自動產生）。
 * 【常見修改】一般「不需要」修改此檔；新增作品請到對應分類檔（例如 emotional.ts）。
 * 【注意事項】只有新增「第七個分類」時才需要在這裡登記。
 */
import type { CategoryId, Photo, PhotoRef, Project, ProjectEntry } from '@/types/portfolio'
import { imageFolders, imageSizes } from '../generated/images'
import { emotionalProjects } from './emotional'
import { styleProjects } from './style'
import { monochromeProjects } from './monochrome'
import { ordinaryProjects } from './ordinary'
import { shoreProjects } from './shore'
import { visceraProjects } from './viscera'

const entries: ProjectEntry[] = [
  ...emotionalProjects,
  ...styleProjects,
  ...monochromeProjects,
  ...ordinaryProjects,
  ...shoreProjects,
  ...visceraProjects,
]

const fileName = (src: string) => src.slice(src.lastIndexOf('/') + 1)

/** 依資料夾產生照片清單 */
function photosFor(entry: ProjectEntry): Photo[] {
  const folder = entry.folder ?? `works/${entry.categoryId}/${entry.id}`
  const files = imageFolders[folder] ?? []
  const used = new Set<string>()
  return files.map((src, i) => {
    const name = fileName(src)
    let id = name.replace(/\.[^.]+$/, '')
    if (used.has(id)) id = name
    used.add(id)
    const note = entry.photoNotes?.[name]
    const [width, height] = imageSizes[src] ?? [1080, 1620]
    return {
      id,
      src: encodeURI(src),
      width,
      height,
      alt: note?.alt ?? `${entry.title} — photo ${i + 1} of ${files.length}`,
      caption: note?.caption,
    }
  })
}

/** 全部作品（含未公開），已帶入照片 */
export const allProjects: Project[] = entries.map((entry) => {
  const photos = photosFor(entry)
  const cover = photos.find((p) => p.id === entry.coverPhotoId) ?? photos[0]
  return { ...entry, photos, coverPhotoId: cover?.id ?? '' }
})

/** 取得某分類「已公開」的作品，依 order 排序 */
export function getPublishedProjects(categoryId: CategoryId): Project[] {
  return allProjects
    .filter((p) => p.categoryId === categoryId && p.published)
    .sort((a, b) => a.order - b.order)
}

/** 依作品 id 取得作品 */
export function getProject(projectId: string): Project | undefined {
  return allProjects.find((p) => p.id === projectId)
}

/** 依 { projectId, photoId } 取得照片 */
export function getPhoto(ref: PhotoRef): Photo | undefined {
  return getProject(ref.projectId)?.photos.find((ph) => ph.id === ref.photoId)
}

/** 作品封面：找不到 coverPhotoId 時退回第一張 */
export function getCoverPhoto(project: Project): Photo | undefined {
  return project.photos.find((ph) => ph.id === project.coverPhotoId) ?? project.photos[0]
}

/** 照片總數格式化，例如 6 → "06 PHOTOS"、1 → "01 PHOTO" */
export function formatPhotoCount(count: number): string {
  return `${String(count).padStart(2, '0')} ${count === 1 ? 'PHOTO' : 'PHOTOS'}`
}

/** 開發模式檢查用：有照片但沒有作品資料的資料夾 */
export function unusedWorkFolders(): string[] {
  const used = new Set(entries.map((e) => e.folder ?? `works/${e.categoryId}/${e.id}`))
  return Object.keys(imageFolders).filter((f) => f.startsWith('works/') && f.split('/').length === 3 && !used.has(f))
}
