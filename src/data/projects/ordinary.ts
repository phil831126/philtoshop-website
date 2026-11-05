/**
 * 【控制畫面】/works/ordinary（Ordinary 分類分頁）的所有作品章節
 * 【負責功能】Ordinary 分類的作品與照片資料。每個 { ... } 是一組作品（頁面上的一個章節）。
 * 【資料來源】照片檔案放在 public/images/works/ordinary/<作品id>/
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

export const ordinaryProjects: Project[] = [
  {
    // ── 作品 01（示意）────────────────────────────
    id: 'morning-errands', // ⚠ 穩定識別碼，上線後勿改
    categoryId: 'ordinary',
    title: "Morning Errands", // ✎ 可修改
    description: "Small walks, small rituals.", // ✎ 可修改
    year: 2026, // ✎ 選填，可刪除
    coverPhotoId: 'me-01', // ✎ 封面照片：填下方某張照片的 id
    order: 1, // ✎ 排序
    published: true, // ✎ false＝不顯示
    photos: [
      { id: 'me-01', src: '/images/works/ordinary/morning-errands/01.jpg', alt: 'Placeholder 01 for Morning Errands', width: 900, height: 1600 },
      { id: 'me-02', src: '/images/works/ordinary/morning-errands/02.jpg', alt: 'Placeholder 02 for Morning Errands', width: 900, height: 1600 },
      { id: 'me-03', src: '/images/works/ordinary/morning-errands/03.jpg', alt: 'Placeholder 03 for Morning Errands', width: 900, height: 1600 },
      { id: 'me-04', src: '/images/works/ordinary/morning-errands/04.jpg', alt: 'Placeholder 04 for Morning Errands', width: 900, height: 1600 },
      { id: 'me-05', src: '/images/works/ordinary/morning-errands/05.jpg', alt: 'Placeholder 05 for Morning Errands', width: 900, height: 1600 },
      { id: 'me-06', src: '/images/works/ordinary/morning-errands/06.jpg', alt: 'Placeholder 06 for Morning Errands', width: 900, height: 1600 },
    ],
  },
  {
    // ── 作品 02（示意）────────────────────────────
    id: 'kitchen-window', // ⚠ 穩定識別碼，上線後勿改
    categoryId: 'ordinary',
    title: "Kitchen Window", // ✎ 可修改
    description: "The light that arrives before anyone is awake.", // ✎ 可修改
    year: 2026, // ✎ 選填，可刪除
    coverPhotoId: 'kw-01', // ✎ 封面照片：填下方某張照片的 id
    order: 2, // ✎ 排序
    published: true, // ✎ false＝不顯示
    photos: [
      { id: 'kw-01', src: '/images/works/ordinary/kitchen-window/01.jpg', alt: 'Placeholder 01 for Kitchen Window', width: 900, height: 1600 },
      { id: 'kw-02', src: '/images/works/ordinary/kitchen-window/02.jpg', alt: 'Placeholder 02 for Kitchen Window', width: 900, height: 1600 },
      { id: 'kw-03', src: '/images/works/ordinary/kitchen-window/03.jpg', alt: 'Placeholder 03 for Kitchen Window', width: 900, height: 1600 },
    ],
  },
  {
    // ── 作品 03（示意）────────────────────────────
    id: 'small-rooms', // ⚠ 穩定識別碼，上線後勿改
    categoryId: 'ordinary',
    title: "Small Rooms", // ✎ 可修改
    description: "Everyday corners, honestly seen.", // ✎ 可修改
    year: 2026, // ✎ 選填，可刪除
    coverPhotoId: 'sr-01', // ✎ 封面照片：填下方某張照片的 id
    order: 3, // ✎ 排序
    published: true, // ✎ false＝不顯示
    photos: [
      { id: 'sr-01', src: '/images/works/ordinary/small-rooms/01.jpg', alt: 'Placeholder 01 for Small Rooms', width: 900, height: 1600 },
      { id: 'sr-02', src: '/images/works/ordinary/small-rooms/02.jpg', alt: 'Placeholder 02 for Small Rooms', width: 900, height: 1600 },
      { id: 'sr-03', src: '/images/works/ordinary/small-rooms/03.jpg', alt: 'Placeholder 03 for Small Rooms', width: 900, height: 1600 },
      { id: 'sr-04', src: '/images/works/ordinary/small-rooms/04.jpg', alt: 'Placeholder 04 for Small Rooms', width: 900, height: 1600 },
      { id: 'sr-05', src: '/images/works/ordinary/small-rooms/05.jpg', alt: 'Placeholder 05 for Small Rooms', width: 900, height: 1600 },
      { id: 'sr-06', src: '/images/works/ordinary/small-rooms/06.jpg', alt: 'Placeholder 06 for Small Rooms', width: 900, height: 1600 },
      { id: 'sr-07', src: '/images/works/ordinary/small-rooms/07.jpg', alt: 'Placeholder 07 for Small Rooms', width: 900, height: 1600 },
      { id: 'sr-08', src: '/images/works/ordinary/small-rooms/08.jpg', alt: 'Placeholder 08 for Small Rooms', width: 900, height: 1600 },
      { id: 'sr-09', src: '/images/works/ordinary/small-rooms/09.jpg', alt: 'Placeholder 09 for Small Rooms', width: 900, height: 1600 },
      { id: 'sr-10', src: '/images/works/ordinary/small-rooms/10.jpg', alt: 'Placeholder 10 for Small Rooms', width: 900, height: 1600 },
    ],
  },
]
