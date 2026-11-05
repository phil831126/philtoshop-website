/**
 * 【控制畫面】/works/emotional（Emotional 分類分頁）的所有作品章節
 * 【負責功能】Emotional 分類的作品與照片資料。每個 { ... } 是一組作品（頁面上的一個章節）。
 * 【資料來源】照片檔案放在 public/images/works/emotional/<作品id>/
 * 【常見修改】
 *   - 改作品名稱／介紹：修改 title、description
 *   - 隱藏作品：published 改成 false
 *   - 調整作品前後順序：修改 order（數字小的在前）
 *   - 新增照片：在 photos 陣列加一筆；照片順序＝陣列順序；照片總數會自動計算
 *   - 修改替代文字：修改 alt
 * 【注意事項】
 *   - id 一旦上線就不要再改（首頁精選與網址錨點 #id 會用到）。
 *   - width／height 請填照片檔案的實際像素，比例錯誤會讓照片變形或留白。
 *   - 檔名大小寫必須和資料完全一致（Vercel 伺服器會區分大小寫）。
 *   - ⚠ 目前內容皆為「示意資料與示意圖」，不代表正式作品，請替換。
 */
import type { Project } from '@/types/portfolio'

export const emotionalProjects: Project[] = [
  {
    // ── 作品 01（示意）────────────────────────────
    id: 'quiet-light', // ⚠ 穩定識別碼，上線後勿改
    categoryId: 'emotional',
    title: "Quiet Light", // ✎ 可修改
    description: "A portrait series in natural window light.", // ✎ 可修改
    year: 2026, // ✎ 選填，可刪除
    coverPhotoId: 'ql-01', // ✎ 封面照片：填下方某張照片的 id
    order: 1, // ✎ 排序
    published: true, // ✎ false＝不顯示
    photos: [
      { id: 'ql-01', src: '/images/works/emotional/quiet-light/01.jpg', alt: 'Placeholder 01 for Quiet Light', width: 900, height: 1600 },
      { id: 'ql-02', src: '/images/works/emotional/quiet-light/02.jpg', alt: 'Placeholder 02 for Quiet Light', width: 900, height: 1600 },
      { id: 'ql-03', src: '/images/works/emotional/quiet-light/03.jpg', alt: 'Placeholder 03 for Quiet Light', width: 900, height: 1600 },
      { id: 'ql-04', src: '/images/works/emotional/quiet-light/04.jpg', alt: 'Placeholder 04 for Quiet Light', width: 900, height: 1600 },
      { id: 'ql-05', src: '/images/works/emotional/quiet-light/05.jpg', alt: 'Placeholder 05 for Quiet Light', width: 900, height: 1600 },
      { id: 'ql-06', src: '/images/works/emotional/quiet-light/06.jpg', alt: 'Placeholder 06 for Quiet Light', width: 900, height: 1600 },
    ],
  },
  {
    // ── 作品 02（示意）────────────────────────────
    id: 'after-the-rain', // ⚠ 穩定識別碼，上線後勿改
    categoryId: 'emotional',
    title: "After the Rain", // ✎ 可修改
    description: "City portraits in the calm after a downpour.", // ✎ 可修改
    year: 2026, // ✎ 選填，可刪除
    coverPhotoId: 'ar-01', // ✎ 封面照片：填下方某張照片的 id
    order: 2, // ✎ 排序
    published: true, // ✎ false＝不顯示
    photos: [
      { id: 'ar-01', src: '/images/works/emotional/after-the-rain/01.jpg', alt: 'Placeholder 01 for After the Rain', width: 900, height: 1600 },
      { id: 'ar-02', src: '/images/works/emotional/after-the-rain/02.jpg', alt: 'Placeholder 02 for After the Rain', width: 900, height: 1600 },
      { id: 'ar-03', src: '/images/works/emotional/after-the-rain/03.jpg', alt: 'Placeholder 03 for After the Rain', width: 900, height: 1600 },
    ],
  },
  {
    // ── 作品 03（示意）────────────────────────────
    id: 'between-us', // ⚠ 穩定識別碼，上線後勿改
    categoryId: 'emotional',
    title: "Between Us", // ✎ 可修改
    description: "Portraits by the coast, where distance feels closer.", // ✎ 可修改
    year: 2026, // ✎ 選填，可刪除
    coverPhotoId: 'bu-01', // ✎ 封面照片：填下方某張照片的 id
    order: 3, // ✎ 排序
    published: true, // ✎ false＝不顯示
    photos: [
      { id: 'bu-01', src: '/images/works/emotional/between-us/01.jpg', alt: 'Placeholder 01 for Between Us', width: 900, height: 1600 },
      { id: 'bu-02', src: '/images/works/emotional/between-us/02.jpg', alt: 'Placeholder 02 for Between Us', width: 900, height: 1600 },
      { id: 'bu-03', src: '/images/works/emotional/between-us/03.jpg', alt: 'Placeholder 03 for Between Us', width: 900, height: 1600 },
      { id: 'bu-04', src: '/images/works/emotional/between-us/04.jpg', alt: 'Placeholder 04 for Between Us', width: 900, height: 1600 },
      { id: 'bu-05', src: '/images/works/emotional/between-us/05.jpg', alt: 'Placeholder 05 for Between Us', width: 1500, height: 1000 },
      { id: 'bu-06', src: '/images/works/emotional/between-us/06.jpg', alt: 'Placeholder 06 for Between Us', width: 900, height: 1600 },
      { id: 'bu-07', src: '/images/works/emotional/between-us/07.jpg', alt: 'Placeholder 07 for Between Us', width: 900, height: 1600 },
      { id: 'bu-08', src: '/images/works/emotional/between-us/08.jpg', alt: 'Placeholder 08 for Between Us', width: 1080, height: 1350 },
      { id: 'bu-09', src: '/images/works/emotional/between-us/09.jpg', alt: 'Placeholder 09 for Between Us', width: 900, height: 1600 },
      { id: 'bu-10', src: '/images/works/emotional/between-us/10.jpg', alt: 'Placeholder 10 for Between Us', width: 900, height: 1600 },
    ],
  },
]
