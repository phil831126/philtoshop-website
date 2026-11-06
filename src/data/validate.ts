/**
 * 【控制畫面】無（只在 npm run dev 開發模式執行）
 * 【負責功能】檢查資料常見錯誤並在瀏覽器主控台（F12 → Console）顯示警告：
 *            重複的 id、作品資料夾還沒有照片、有照片但沒有作品資料、封面不存在、首頁精選指到不存在的作品等。
 * 【資料來源】src/data 全部資料。
 * 【常見修改】不需要修改。
 * 【注意事項】正式網站（npm run build）不會執行此檢查；build 另有 npm run photos:check 檢查照片檔案。
 */
import { allProjects, getProject, unusedWorkFolders } from './projects'
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
    const folder = p.folder ?? `works/${p.categoryId}/${p.id}`
    if (!p.photos.length) warn(`作品 ${p.id} 的資料夾 public/images/${folder}/ 還沒有照片`)
    if (p.coverPhotoId && !p.photos.some((ph) => ph.id === p.coverPhotoId)) {
      warn(`作品 ${p.id} 的 coverPhotoId「${p.coverPhotoId}」不存在，將改用第一張`)
    }
    for (const name of Object.keys(p.photoNotes ?? {})) {
      if (!p.photos.some((ph) => ph.src.endsWith(`/${encodeURI(name)}`))) {
        warn(`作品 ${p.id} 的 photoNotes 寫了「${name}」，但資料夾裡沒有這個檔名`)
      }
    }
  }

  for (const folder of unusedWorkFolders()) {
    warn(`public/images/${folder}/ 有照片，但還沒有對應的作品資料（執行 npm.cmd run photos 可取得可貼上的內容）`)
  }

  for (const c of categories) {
    if (c.cover) {
      const proj = getProject(c.cover.projectId)
      if (!proj?.photos.some((ph) => ph.id === c.cover?.photoId)) {
        warn(`分類 ${c.id} 的代表圖 cover 指到不存在的照片（photoId 請填檔名去掉副檔名，例如 '01'）`)
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
