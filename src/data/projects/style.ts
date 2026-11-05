/**
 * 【控制畫面】/works/style（Style 分類分頁）的所有作品章節
 * 【負責功能】Style 分類的作品與照片資料。每個 { ... } 是一組作品（頁面上的一個章節）。
 * 【資料來源】照片檔案放在 public/images/works/style/<作品id>/
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

export const styleProjects: Project[] = [
  {
    // ── 作品 01（示意）────────────────────────────
    id: 'linen-and-shadow', // ⚠ 穩定識別碼，上線後勿改
    categoryId: 'style',
    title: "Linen & Shadow", // ✎ 可修改
    description: "Soft fabric, hard light, and the space between.", // ✎ 可修改
    year: 2026, // ✎ 選填，可刪除
    coverPhotoId: 'ls-01', // ✎ 封面照片：填下方某張照片的 id
    order: 1, // ✎ 排序
    published: true, // ✎ false＝不顯示
    photos: [
      { id: 'ls-01', src: '/images/works/style/linen-and-shadow/01.jpg', alt: 'Placeholder 01 for Linen & Shadow', width: 900, height: 1600 },
      { id: 'ls-02', src: '/images/works/style/linen-and-shadow/02.jpg', alt: 'Placeholder 02 for Linen & Shadow', width: 900, height: 1600 },
      { id: 'ls-03', src: '/images/works/style/linen-and-shadow/03.jpg', alt: 'Placeholder 03 for Linen & Shadow', width: 900, height: 1600 },
      { id: 'ls-04', src: '/images/works/style/linen-and-shadow/04.jpg', alt: 'Placeholder 04 for Linen & Shadow', width: 900, height: 1600 },
      { id: 'ls-05', src: '/images/works/style/linen-and-shadow/05.jpg', alt: 'Placeholder 05 for Linen & Shadow', width: 900, height: 1600 },
      { id: 'ls-06', src: '/images/works/style/linen-and-shadow/06.jpg', alt: 'Placeholder 06 for Linen & Shadow', width: 900, height: 1600 },
    ],
  },
  {
    // ── 作品 02（示意）────────────────────────────
    id: 'studio-hours', // ⚠ 穩定識別碼，上線後勿改
    categoryId: 'style',
    title: "Studio Hours", // ✎ 可修改
    description: "A short series made in a single afternoon.", // ✎ 可修改
    year: 2026, // ✎ 選填，可刪除
    coverPhotoId: 'sh-01', // ✎ 封面照片：填下方某張照片的 id
    order: 2, // ✎ 排序
    published: true, // ✎ false＝不顯示
    photos: [
      { id: 'sh-01', src: '/images/works/style/studio-hours/01.jpg', alt: 'Placeholder 01 for Studio Hours', width: 900, height: 1600 },
      { id: 'sh-02', src: '/images/works/style/studio-hours/02.jpg', alt: 'Placeholder 02 for Studio Hours', width: 900, height: 1600 },
      { id: 'sh-03', src: '/images/works/style/studio-hours/03.jpg', alt: 'Placeholder 03 for Studio Hours', width: 900, height: 1600 },
    ],
  },
  {
    // ── 作品 03（示意）────────────────────────────
    id: 'wardrobe-notes', // ⚠ 穩定識別碼，上線後勿改
    categoryId: 'style',
    title: "Wardrobe Notes", // ✎ 可修改
    description: "Sample long description for layout testing: a longer paragraph that checks how the narrow text column wraps when an introduction runs to several lines, so the chapter still reads calmly.", // ✎ 可修改
    year: 2026, // ✎ 選填，可刪除
    coverPhotoId: 'wn-01', // ✎ 封面照片：填下方某張照片的 id
    order: 3, // ✎ 排序
    published: true, // ✎ false＝不顯示
    photos: [
      { id: 'wn-01', src: '/images/works/style/wardrobe-notes/01.jpg', alt: 'Placeholder 01 for Wardrobe Notes', width: 900, height: 1600 },
      { id: 'wn-02', src: '/images/works/style/wardrobe-notes/02.jpg', alt: 'Placeholder 02 for Wardrobe Notes', width: 900, height: 1600 },
      { id: 'wn-03', src: '/images/works/style/wardrobe-notes/03.jpg', alt: 'Placeholder 03 for Wardrobe Notes', width: 900, height: 1600 },
      { id: 'wn-04', src: '/images/works/style/wardrobe-notes/04.jpg', alt: 'Placeholder 04 for Wardrobe Notes', width: 900, height: 1600 },
      { id: 'wn-05', src: '/images/works/style/wardrobe-notes/05.jpg', alt: 'Placeholder 05 for Wardrobe Notes', width: 900, height: 1600 },
      { id: 'wn-06', src: '/images/works/style/wardrobe-notes/06.jpg', alt: 'Placeholder 06 for Wardrobe Notes', width: 900, height: 1600 },
      { id: 'wn-07', src: '/images/works/style/wardrobe-notes/07.jpg', alt: 'Placeholder 07 for Wardrobe Notes', width: 1080, height: 1350 },
      { id: 'wn-08', src: '/images/works/style/wardrobe-notes/08.jpg', alt: 'Placeholder 08 for Wardrobe Notes', width: 900, height: 1600 },
      { id: 'wn-09', src: '/images/works/style/wardrobe-notes/09.jpg', alt: 'Placeholder 09 for Wardrobe Notes', width: 900, height: 1600 },
      { id: 'wn-10', src: '/images/works/style/wardrobe-notes/10.jpg', alt: 'Placeholder 10 for Wardrobe Notes', width: 900, height: 1600 },
    ],
  },
]
