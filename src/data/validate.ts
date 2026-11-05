/**
 * 【控制畫面】無（只在 npm run dev 開發模式執行）
 * 【負責功能】檢查資料常見錯誤並在瀏覽器主控台（F12 → Console）顯示警告：
 *            重複的 id、封面照片 id 不存在、首頁精選指到不存在的作品、尺寸未填等。
 * 【資料來源】src/data 全部資料。
 * 【常見修改】不需要修改。
 * 【注意事項】正式網站（npm run build）不會執行此檢查。
 */
import { allProjects, getProject } from './projects'
import { categories, isCategoryId } from './categories'
import { publishedFeatured } from './home'

export function validateContent(): void {
  const warn = (msg: string) => console.warn(`[內容檢查] ${msg}`)
  const projectIds = new Set<string>()

  for (const p of allProjects) {
    if (projectIds.has(p.id)) warn(`作品 id 重複：${p.id}`)
    projectIds.add(p.id)
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(p.id)) warn(`作品 id 建議只用英文小寫、數字與連字號：${p.id}`)
    if (!isCategoryId(p.categoryId)) warn(`作品 ${p.id} 的 categoryId 無效：${p.categoryId}`)

    const photoIds = new Set<string>()
    for (const ph of p.photos) {
      if (photoIds.has(ph.id)) warn(`作品 ${p.id} 內照片 id 重複：${ph.id}`)
      photoIds.add(ph.id)
      if (!(ph.width > 0 && ph.height > 0)) warn(`照片 ${p.id}/${ph.id} 的 width／height 必須是正數`)
      if (!ph.src.startsWith('/')) warn(`照片 ${p.id}/${ph.id} 的 src 應以 / 開頭：${ph.src}`)
      if (/[A-Z\s]/.test(ph.src)) warn(`照片路徑建議只用小寫且不含空白：${ph.src}`)
      if (!ph.alt.trim()) warn(`照片 ${p.id}/${ph.id} 缺少 alt 替代文字`)
    }
    if (p.photos.length > 0 && !photoIds.has(p.coverPhotoId)) {
      warn(`作品 ${p.id} 的 coverPhotoId「${p.coverPhotoId}」不存在，將改用第一張`)
    }
  }

  for (const c of categories) {
    if (c.cover) {
      const proj = getProject(c.cover.projectId)
      if (!proj?.photos.some((ph) => ph.id === c.cover?.photoId)) {
        warn(`分類 ${c.id} 的代表圖 cover 指到不存在的照片`)
      }
    }
  }

  for (const f of publishedFeatured) {
    if (!isCategoryId(f.categoryId)) warn(`首頁精選 ${f.id} 的 categoryId 無效`)
    if (f.projectId) {
      const proj = getProject(f.projectId)
      if (!proj) warn(`首頁精選 ${f.id} 的 projectId「${f.projectId}」不存在`)
      else if (proj.categoryId !== f.categoryId) warn(`首頁精選 ${f.id} 的作品不屬於分類 ${f.categoryId}`)
      else if (!proj.published) warn(`首頁精選 ${f.id} 指到的作品目前 published: false`)
    }
  }
}
