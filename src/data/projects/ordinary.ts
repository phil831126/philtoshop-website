/**
 * 【控制畫面】/works/ordinary（Ordinary 分類分頁）的所有作品章節
 * 【負責功能】Ordinary 分類的作品資料。每個 { ... } 是一組作品（頁面上的一個章節）。
 * 【資料來源】照片「不用寫在這裡」：放進 public/images/works/ordinary/<作品id>/ 就會自動顯示，
 *            依檔名排序（01.jpg、02.jpg…），寬高自動讀取，照片數自動計算。
 * 【常見修改】
 *   - 改作品名稱／介紹：title、description
 *   - 隱藏作品：published 改成 false
 *   - 調整作品前後順序：order（數字小的在前）
 *   - 換封面（Works 總覽用）：coverPhotoId 填檔名去掉副檔名，例如 '03'
 *   - 個別照片的描述：photoNotes，例如 { '01.jpg': { alt: 'Portrait by the window' } }
 * 【注意事項】
 *   - id 同時是照片資料夾名稱，上線後不要再改（首頁精選與網址 #id 會用到）。
 *   - 調整照片順序＝修改檔名，例如把 05.jpg 改成 01.jpg。
 *   - ⚠ 目前內容皆為「示意資料與示意圖」，請替換。
 */
import type { ProjectEntry } from '@/types/portfolio'

export const ordinaryProjects: ProjectEntry[] = [
  {
    id: 'morning-errands', // ⚠ 穩定識別碼＝照片資料夾名稱，上線後勿改
    categoryId: 'ordinary',
    title: 'Morning Errands', // ✎
    description: 'Small walks, small rituals.', // ✎
    order: 1, // ✎ 排序
    published: true, // ✎ false＝不顯示
  },
  {
    id: 'kitchen-window', // ⚠ 穩定識別碼＝照片資料夾名稱，上線後勿改
    categoryId: 'ordinary',
    title: 'Kitchen Window', // ✎
    description: 'The light that arrives before anyone is awake.', // ✎
    order: 2, // ✎ 排序
    published: true, // ✎ false＝不顯示
  },
  {
    id: 'small-rooms', // ⚠ 穩定識別碼＝照片資料夾名稱，上線後勿改
    categoryId: 'ordinary',
    title: 'Small Rooms', // ✎
    description: 'Everyday corners, honestly seen.', // ✎
    order: 3, // ✎ 排序
    published: true, // ✎ false＝不顯示
  },
]
