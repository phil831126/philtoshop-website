/**
 * 【控制畫面】全站所有照片
 * 【負責功能】降低訪客「另存照片」的機會：
 *   - 在照片上按滑鼠右鍵：不出現選單（沒有「另存圖片」）
 *   - 拖曳照片到桌面或其他視窗：不允許
 *   手機長按照片的「儲存圖片」選單由 base.css 的 img 樣式關閉。
 * 【資料來源】無。
 * 【常見修改】想讓整個網站（包含文字）都不能按右鍵：把下方 PROTECTED 改成 '*'（不建議，會影響複製文字、開新分頁）。
 * 【注意事項】這只能擋住一般操作，無法真正防止下載：截圖、開發者工具、瀏覽器快取都還是拿得到照片。
 *            真正要保護作品，請在照片上加浮水印，並只上傳網頁用的縮小版（網站已自動縮到長邊 2000px）。
 */
const PROTECTED = 'img, .app-image'

function isPhoto(target: EventTarget | null): boolean {
  return target instanceof Element && Boolean(target.closest(PROTECTED))
}

export function protectPhotos(): void {
  document.addEventListener('contextmenu', (e) => {
    if (isPhoto(e.target)) e.preventDefault()
  })
  document.addEventListener('dragstart', (e) => {
    if (isPhoto(e.target)) e.preventDefault()
  })
}
