/**
 * 【控制畫面】/works/shore（Shore 分類分頁）的所有作品章節
 * 【負責功能】Shore 分類的作品與照片資料。每個 { ... } 是一組作品（頁面上的一個章節）。
 * 【資料來源】照片檔案放在 public/images/works/shore/<作品id>/
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

export const shoreProjects: Project[] = [
  {
    // ── 作品 01（示意）────────────────────────────
    id: 'low-tide', // ⚠ 穩定識別碼，上線後勿改
    categoryId: 'shore',
    title: "Low Tide", // ✎ 可修改
    description: "Where the sea meets memory.", // ✎ 可修改
    year: 2026, // ✎ 選填，可刪除
    coverPhotoId: 'lt-01', // ✎ 封面照片：填下方某張照片的 id
    order: 1, // ✎ 排序
    published: true, // ✎ false＝不顯示
    photos: [
      { id: 'lt-01', src: '/images/works/shore/low-tide/01.jpg', alt: 'Placeholder 01 for Low Tide', width: 900, height: 1600 },
      { id: 'lt-02', src: '/images/works/shore/low-tide/02.jpg', alt: 'Placeholder 02 for Low Tide', width: 900, height: 1600 },
      { id: 'lt-03', src: '/images/works/shore/low-tide/03.jpg', alt: 'Placeholder 03 for Low Tide', width: 900, height: 1600 },
      { id: 'lt-04', src: '/images/works/shore/low-tide/04.jpg', alt: 'Placeholder 04 for Low Tide', width: 900, height: 1600 },
      { id: 'lt-05', src: '/images/works/shore/low-tide/05.jpg', alt: 'Placeholder 05 for Low Tide', width: 900, height: 1600 },
      { id: 'lt-06', src: '/images/works/shore/low-tide/06.jpg', alt: 'Placeholder 06 for Low Tide', width: 900, height: 1600 },
    ],
  },
  {
    // ── 作品 02（示意）────────────────────────────
    id: 'salt-wind', // ⚠ 穩定識別碼，上線後勿改
    categoryId: 'shore',
    title: "Salt Wind", // ✎ 可修改
    description: "Hair, coats and the wind off the water.", // ✎ 可修改
    year: 2026, // ✎ 選填，可刪除
    coverPhotoId: 'sw-01', // ✎ 封面照片：填下方某張照片的 id
    order: 2, // ✎ 排序
    published: true, // ✎ false＝不顯示
    photos: [
      { id: 'sw-01', src: '/images/works/shore/salt-wind/01.jpg', alt: 'Placeholder 01 for Salt Wind', width: 900, height: 1600 },
      { id: 'sw-02', src: '/images/works/shore/salt-wind/02.jpg', alt: 'Placeholder 02 for Salt Wind', width: 900, height: 1600 },
      { id: 'sw-03', src: '/images/works/shore/salt-wind/03.jpg', alt: 'Placeholder 03 for Salt Wind', width: 900, height: 1600 },
    ],
  },
  {
    // ── 作品 03（示意）────────────────────────────
    id: 'last-light-on-the-coast', // ⚠ 穩定識別碼，上線後勿改
    categoryId: 'shore',
    title: "Last Light on the Coast", // ✎ 可修改
    description: "The final hour of a long day by the sea.", // ✎ 可修改
    year: 2026, // ✎ 選填，可刪除
    coverPhotoId: 'llc-01', // ✎ 封面照片：填下方某張照片的 id
    order: 3, // ✎ 排序
    published: true, // ✎ false＝不顯示
    photos: [
      { id: 'llc-01', src: '/images/works/shore/last-light-on-the-coast/01.jpg', alt: 'Placeholder 01 for Last Light on the Coast', width: 900, height: 1600 },
      { id: 'llc-02', src: '/images/works/shore/last-light-on-the-coast/02.jpg', alt: 'Placeholder 02 for Last Light on the Coast', width: 900, height: 1600 },
      { id: 'llc-03', src: '/images/works/shore/last-light-on-the-coast/03.jpg', alt: 'Placeholder 03 for Last Light on the Coast', width: 900, height: 1600 },
      { id: 'llc-04', src: '/images/works/shore/last-light-on-the-coast/04.jpg', alt: 'Placeholder 04 for Last Light on the Coast', width: 900, height: 1600 },
      { id: 'llc-05', src: '/images/works/shore/last-light-on-the-coast/05.jpg', alt: 'Placeholder 05 for Last Light on the Coast', width: 900, height: 1600 },
      { id: 'llc-06', src: '/images/works/shore/last-light-on-the-coast/06.jpg', alt: 'Placeholder 06 for Last Light on the Coast', width: 1500, height: 1000 },
      { id: 'llc-07', src: '/images/works/shore/last-light-on-the-coast/07.jpg', alt: 'Placeholder 07 for Last Light on the Coast', width: 900, height: 1600 },
      { id: 'llc-08', src: '/images/works/shore/last-light-on-the-coast/08.jpg', alt: 'Placeholder 08 for Last Light on the Coast', width: 900, height: 1600 },
      { id: 'llc-09', src: '/images/works/shore/last-light-on-the-coast/09.jpg', alt: 'Placeholder 09 for Last Light on the Coast', width: 900, height: 1600 },
      { id: 'llc-10', src: '/images/works/shore/last-light-on-the-coast/10.jpg', alt: 'Placeholder 10 for Last Light on the Coast', width: 900, height: 1600 },
    ],
  },
]
