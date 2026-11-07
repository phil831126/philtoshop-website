/**
 * 【控制畫面】無（只在 npm run dev 開發模式執行）
 * 【負責功能】檢查內容常見錯誤並在瀏覽器主控台（F12 → Console）顯示「[內容檢查]」警告：
 *            info.txt 看不懂的欄位、封面照片不存在、首頁精選連結指到不存在的分類或作品、
 *            同名作品資料夾、只有 info.txt 但還沒有照片的資料夾等。
 * 【資料來源】src/data 全部資料。
 * 【常見修改】不需要修改。
 * 【注意事項】正式網站（npm run build）不會執行此檢查；終端機執行 npm.cmd run photos 也會列出同樣的提醒。
 */
import { textFiles, textProblems } from './generated/content'
import { imageFolders } from './generated/images'
import { allProjects, getPhoto, getProject } from './projects'
import { categories, isCategoryId } from './categories'
import { featured } from './home'

export function validateContent(): void {
  const warn = (msg: string) => console.warn(`[內容檢查] ${msg}`)

  for (const p of textProblems) warn(`${p.file}${p.line ? ` 第 ${p.line} 行` : ''}：${p.message}`)

  const seen = new Map<string, string>()
  for (const p of allProjects) {
    const other = seen.get(p.id)
    if (other) warn(`作品資料夾名稱「${p.id}」在 ${other} 和 ${p.categoryId} 都有，建議改成不同名稱（網址錨點會衝突）`)
    seen.set(p.id, p.categoryId)
    if (p.requestedCover && p.coverPhotoId !== p.requestedCover) {
      warn(`public/images/${p.folder}/info.txt 的封面「${p.requestedCover}」找不到，已改用第一張`)
    }
    for (const id of Object.keys(p.photoNotes)) {
      if (!p.photos.some((ph) => ph.id === id)) warn(`public/images/${p.folder}/info.txt 寫了照片「${id}」的說明，但資料夾裡沒有這張照片`)
    }
  }

  // 有 info.txt 但沒有照片的作品資料夾
  for (const folder of Object.keys(textFiles)) {
    if (folder.startsWith('works/') && folder.split('/').length === 3 && !imageFolders[folder]) {
      warn(`public/images/${folder}/ 還沒有照片，這組作品暫時不會顯示`)
    }
  }

  for (const c of categories) {
    if (c.cover && !getPhoto(c.cover, c.id)) {
      warn(`public/images/works/${c.id}/info.txt 的總覽封面「${c.cover.projectId}/${c.cover.photoId}」找不到（格式：作品資料夾/照片檔名）`)
    }
  }

  for (const f of featured) {
    const where = `public/images/home/info.txt【${f.label ?? f.id}】`
    if (!isCategoryId(f.categoryId)) {
      warn(`${where} 的連結「${f.categoryId}」不是分類名稱（可用：${categories.map((c) => c.id).join('、')}）`)
      continue
    }
    if (f.projectId) {
      const proj = getProject(f.projectId, f.categoryId)
      if (!proj) warn(`${where} 的連結找不到作品「${f.categoryId}/${f.projectId}」`)
      else if (!proj.published) warn(`${where} 連到的作品目前設定為不顯示`)
    }
  }
}
