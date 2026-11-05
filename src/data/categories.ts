/**
 * 【控制畫面】Works 總覽頁、六個分類分頁的頁首、導覽列的分類選單
 * 【負責功能】六個作品分類的名稱、介紹、排序與代表圖。
 * 【資料來源】代表圖從 src/data/projects/ 的作品照片中指定。
 * 【常見修改】
 *   - 分類分頁大標下方那句話：intro
 *   - Works 總覽頁的短介紹：summary
 *   - Works 總覽代表圖：cover（填作品 id 與照片 id；刪掉 cover 則自動用第一組作品封面）
 *   - 分類顯示順序：order
 * 【注意事項】id 對應網址 /works/<id>，拼字固定，請勿修改。
 *            ⚠ 除 Emotional 的 intro 取自設計稿外，其餘介紹文字皆為示意，請替換。
 */
import type { Category, CategoryId } from '@/types/portfolio'

export const categories: Category[] = [
  {
    id: 'emotional',
    name: 'Emotional',
    intro: 'Three stories, quietly told.', // ✎
    summary: 'Quiet moments, honestly seen.', // ✎
    order: 1,
    cover: { projectId: 'quiet-light', photoId: 'ql-01' }, // ✎ 代表圖
  },
  {
    id: 'style',
    name: 'Style',
    intro: 'Form, fabric and the quiet of a pose.', // ✎ 示意
    summary: 'Wardrobe, texture and composed light.', // ✎ 示意
    order: 2,
  },
  {
    id: 'monochrome',
    name: 'Monochrome',
    intro: 'A study in light and silence.', // ✎
    summary: 'A study in light and silence.', // ✎
    order: 3,
  },
  {
    id: 'ordinary',
    name: 'Ordinary',
    intro: 'Everyday light, kept close.', // ✎ 示意
    summary: 'Small rituals and familiar rooms.', // ✎ 示意
    order: 4,
  },
  {
    id: 'shore',
    name: 'Shore',
    intro: 'Where the sea meets memory.', // ✎
    summary: 'Where the sea meets memory.', // ✎
    order: 5,
  },
  {
    id: 'viscera',
    name: 'Viscera',
    intro: 'Close, unguarded, unfiltered.', // ✎ 示意
    summary: 'Texture, tension and what is left unsaid.', // ✎ 示意
    order: 6,
  },
]

/** 依 order 排序後的分類（導覽與總覽頁使用） */
export const sortedCategories: Category[] = [...categories].sort((a, b) => a.order - b.order)

/** 依 id 取得分類 */
export function getCategory(id: string): Category | undefined {
  return categories.find((c) => c.id === id)
}

/** 檢查字串是否為有效的分類 id */
export function isCategoryId(id: string): id is CategoryId {
  return categories.some((c) => c.id === id)
}
