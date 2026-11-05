/**
 * 【控制畫面】無（彙整六個分類的作品資料）
 * 【負責功能】把 emotional.ts ～ viscera.ts 合併成一份清單，並提供查詢工具給頁面使用：
 *            依分類取得作品、找照片、計算照片數量、取得封面。
 * 【資料來源】同資料夾的六個分類檔。
 * 【常見修改】一般「不需要」修改此檔；新增作品請到對應分類檔（例如 emotional.ts）。
 * 【注意事項】只有新增「第七個分類」時才需要在這裡登記；請先閱讀 docs/CONTENT_EDITING.md。
 */
import type { CategoryId, Photo, PhotoRef, Project } from '@/types/portfolio'
import { emotionalProjects } from './emotional'
import { styleProjects } from './style'
import { monochromeProjects } from './monochrome'
import { ordinaryProjects } from './ordinary'
import { shoreProjects } from './shore'
import { visceraProjects } from './viscera'

/** 全部作品（含未公開），僅供內部查詢與檢查 */
export const allProjects: Project[] = [
  ...emotionalProjects,
  ...styleProjects,
  ...monochromeProjects,
  ...ordinaryProjects,
  ...shoreProjects,
  ...visceraProjects,
]

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
