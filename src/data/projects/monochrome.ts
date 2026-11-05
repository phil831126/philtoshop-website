/**
 * 【控制畫面】/works/monochrome（Monochrome 分類分頁）的所有作品章節
 * 【負責功能】Monochrome 分類的作品與照片資料。每個 { ... } 是一組作品（頁面上的一個章節）。
 * 【資料來源】照片檔案放在 public/images/works/monochrome/<作品id>/
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

export const monochromeProjects: Project[] = [
  {
    // ── 作品 01（示意）────────────────────────────
    id: 'grey-hours', // ⚠ 穩定識別碼，上線後勿改
    categoryId: 'monochrome',
    title: "Grey Hours", // ✎ 可修改
    description: "A study in light and silence.", // ✎ 可修改
    year: 2026, // ✎ 選填，可刪除
    coverPhotoId: 'gh-01', // ✎ 封面照片：填下方某張照片的 id
    order: 1, // ✎ 排序
    published: true, // ✎ false＝不顯示
    photos: [
      { id: 'gh-01', src: '/images/works/monochrome/grey-hours/01.jpg', alt: 'Placeholder 01 for Grey Hours', width: 900, height: 1600 },
      { id: 'gh-02', src: '/images/works/monochrome/grey-hours/02.jpg', alt: 'Placeholder 02 for Grey Hours', width: 900, height: 1600 },
      { id: 'gh-03', src: '/images/works/monochrome/grey-hours/03.jpg', alt: 'Placeholder 03 for Grey Hours', width: 900, height: 1600 },
      { id: 'gh-04', src: '/images/works/monochrome/grey-hours/04.jpg', alt: 'Placeholder 04 for Grey Hours', width: 900, height: 1600 },
      { id: 'gh-05', src: '/images/works/monochrome/grey-hours/05.jpg', alt: 'Placeholder 05 for Grey Hours', width: 900, height: 1600 },
      { id: 'gh-06', src: '/images/works/monochrome/grey-hours/06.jpg', alt: 'Placeholder 06 for Grey Hours', width: 900, height: 1600 },
    ],
  },
  {
    // ── 作品 02（示意）────────────────────────────
    id: 'silent-branches', // ⚠ 穩定識別碼，上線後勿改
    categoryId: 'monochrome',
    title: "Silent Branches", // ✎ 可修改
    description: "Winter branches against a pale sky.", // ✎ 可修改
    year: 2026, // ✎ 選填，可刪除
    coverPhotoId: 'sb-01', // ✎ 封面照片：填下方某張照片的 id
    order: 2, // ✎ 排序
    published: true, // ✎ false＝不顯示
    photos: [
      { id: 'sb-01', src: '/images/works/monochrome/silent-branches/01.jpg', alt: 'Placeholder 01 for Silent Branches', width: 900, height: 1600 },
      { id: 'sb-02', src: '/images/works/monochrome/silent-branches/02.jpg', alt: 'Placeholder 02 for Silent Branches', width: 900, height: 1600 },
      { id: 'sb-03', src: '/images/works/monochrome/silent-branches/03.jpg', alt: 'Placeholder 03 for Silent Branches', width: 900, height: 1600 },
    ],
  },
  {
    // ── 作品 03（示意）────────────────────────────
    id: 'paper-light', // ⚠ 穩定識別碼，上線後勿改
    categoryId: 'monochrome',
    title: "Paper Light", // ✎ 可修改
    description: "Black and white portraits, printed in memory.", // ✎ 可修改
    year: 2026, // ✎ 選填，可刪除
    coverPhotoId: 'pl-01', // ✎ 封面照片：填下方某張照片的 id
    order: 3, // ✎ 排序
    published: true, // ✎ false＝不顯示
    photos: [
      { id: 'pl-01', src: '/images/works/monochrome/paper-light/01.jpg', alt: 'Placeholder 01 for Paper Light', width: 900, height: 1600 },
      { id: 'pl-02', src: '/images/works/monochrome/paper-light/02.jpg', alt: 'Placeholder 02 for Paper Light', width: 900, height: 1600 },
      { id: 'pl-03', src: '/images/works/monochrome/paper-light/03.jpg', alt: 'Placeholder 03 for Paper Light', width: 1500, height: 1000 },
      { id: 'pl-04', src: '/images/works/monochrome/paper-light/04.jpg', alt: 'Placeholder 04 for Paper Light', width: 900, height: 1600 },
      { id: 'pl-05', src: '/images/works/monochrome/paper-light/05.jpg', alt: 'Placeholder 05 for Paper Light', width: 900, height: 1600 },
      { id: 'pl-06', src: '/images/works/monochrome/paper-light/06.jpg', alt: 'Placeholder 06 for Paper Light', width: 900, height: 1600 },
      { id: 'pl-07', src: '/images/works/monochrome/paper-light/07.jpg', alt: 'Placeholder 07 for Paper Light', width: 900, height: 1600 },
      { id: 'pl-08', src: '/images/works/monochrome/paper-light/08.jpg', alt: 'Placeholder 08 for Paper Light', width: 900, height: 1600 },
      { id: 'pl-09', src: '/images/works/monochrome/paper-light/09.jpg', alt: 'Placeholder 09 for Paper Light', width: 900, height: 1600 },
      { id: 'pl-10', src: '/images/works/monochrome/paper-light/10.jpg', alt: 'Placeholder 10 for Paper Light', width: 900, height: 1600 },
    ],
  },
]
