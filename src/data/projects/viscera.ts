/**
 * 【控制畫面】/works/viscera（Viscera 分類分頁）的所有作品章節
 * 【負責功能】Viscera 分類的作品與照片資料。每個 { ... } 是一組作品（頁面上的一個章節）。
 * 【資料來源】照片檔案放在 public/images/works/viscera/<作品id>/
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

export const visceraProjects: Project[] = [
  {
    // ── 作品 01（示意）────────────────────────────
    id: 'under-the-skin', // ⚠ 穩定識別碼，上線後勿改
    categoryId: 'viscera',
    title: "Under the Skin", // ✎ 可修改
    description: "Close, unguarded, and a little uncomfortable.", // ✎ 可修改
    year: 2026, // ✎ 選填，可刪除
    coverPhotoId: 'us-01', // ✎ 封面照片：填下方某張照片的 id
    order: 1, // ✎ 排序
    published: true, // ✎ false＝不顯示
    photos: [
      { id: 'us-01', src: '/images/works/viscera/under-the-skin/01.jpg', alt: 'Placeholder 01 for Under the Skin', width: 900, height: 1600 },
      { id: 'us-02', src: '/images/works/viscera/under-the-skin/02.jpg', alt: 'Placeholder 02 for Under the Skin', width: 900, height: 1600 },
      { id: 'us-03', src: '/images/works/viscera/under-the-skin/03.jpg', alt: 'Placeholder 03 for Under the Skin', width: 900, height: 1600 },
      { id: 'us-04', src: '/images/works/viscera/under-the-skin/04.jpg', alt: 'Placeholder 04 for Under the Skin', width: 900, height: 1600 },
      { id: 'us-05', src: '/images/works/viscera/under-the-skin/05.jpg', alt: 'Placeholder 05 for Under the Skin', width: 900, height: 1600 },
      { id: 'us-06', src: '/images/works/viscera/under-the-skin/06.jpg', alt: 'Placeholder 06 for Under the Skin', width: 900, height: 1600 },
    ],
  },
  {
    // ── 作品 02（示意）────────────────────────────
    id: 'pulse', // ⚠ 穩定識別碼，上線後勿改
    categoryId: 'viscera',
    title: "Pulse", // ✎ 可修改
    description: "Three frames, one heartbeat.", // ✎ 可修改
    year: 2026, // ✎ 選填，可刪除
    coverPhotoId: 'p-01', // ✎ 封面照片：填下方某張照片的 id
    order: 2, // ✎ 排序
    published: true, // ✎ false＝不顯示
    photos: [
      { id: 'p-01', src: '/images/works/viscera/pulse/01.jpg', alt: 'Placeholder 01 for Pulse', width: 900, height: 1600 },
      { id: 'p-02', src: '/images/works/viscera/pulse/02.jpg', alt: 'Placeholder 02 for Pulse', width: 900, height: 1600 },
      { id: 'p-03', src: '/images/works/viscera/pulse/03.jpg', alt: 'Placeholder 03 for Pulse', width: 900, height: 1600 },
    ],
  },
  {
    // ── 作品 03（示意）────────────────────────────
    id: 'raw-edges', // ⚠ 穩定識別碼，上線後勿改
    categoryId: 'viscera',
    title: "Raw Edges", // ✎ 可修改
    description: "Texture, tension and what is left unsaid.", // ✎ 可修改
    year: 2026, // ✎ 選填，可刪除
    coverPhotoId: 're-01', // ✎ 封面照片：填下方某張照片的 id
    order: 3, // ✎ 排序
    published: true, // ✎ false＝不顯示
    photos: [
      { id: 're-01', src: '/images/works/viscera/raw-edges/01.jpg', alt: 'Placeholder 01 for Raw Edges', width: 900, height: 1600 },
      { id: 're-02', src: '/images/works/viscera/raw-edges/02.jpg', alt: 'Placeholder 02 for Raw Edges', width: 900, height: 1600 },
      { id: 're-03', src: '/images/works/viscera/raw-edges/03.jpg', alt: 'Placeholder 03 for Raw Edges', width: 900, height: 1600 },
      { id: 're-04', src: '/images/works/viscera/raw-edges/04.jpg', alt: 'Placeholder 04 for Raw Edges', width: 900, height: 1600 },
      { id: 're-05', src: '/images/works/viscera/raw-edges/05.jpg', alt: 'Placeholder 05 for Raw Edges', width: 900, height: 1600 },
      { id: 're-06', src: '/images/works/viscera/raw-edges/06.jpg', alt: 'Placeholder 06 for Raw Edges', width: 900, height: 1600 },
      { id: 're-07', src: '/images/works/viscera/raw-edges/07.jpg', alt: 'Placeholder 07 for Raw Edges', width: 900, height: 1600 },
      { id: 're-08', src: '/images/works/viscera/raw-edges/08.jpg', alt: 'Placeholder 08 for Raw Edges', width: 900, height: 1600 },
      { id: 're-09', src: '/images/works/viscera/raw-edges/09.jpg', alt: 'Placeholder 09 for Raw Edges', width: 1080, height: 1350 },
      { id: 're-10', src: '/images/works/viscera/raw-edges/10.jpg', alt: 'Placeholder 10 for Raw Edges', width: 900, height: 1600 },
    ],
  },
]
