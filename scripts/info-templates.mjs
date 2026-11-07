/**
 * 【控制畫面】無（輔助工具，不會被打包進網站）
 * 【負責功能】info.txt 範本：npm run photos 發現「有照片、但還沒有 info.txt」的作品資料夾時，
 *            會用這裡的範本自動建立一份，你只要打開改文字即可。
 * 【常見修改】想調整範本的說明文字時改這裡。
 * 【注意事項】只會建立「不存在」的 info.txt，絕不覆蓋你已經寫好的檔案。
 */

/** 資料夾名稱 → 預設標題，例如 morning-window → Morning Window */
export const titleFromFolder = (name) =>
  name
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')

export function seriesTemplate({ title, description = '', order = '', cover = '' }) {
  return `# ════════════════════════════════════════════
#  這組作品的文字（存檔後網站自動更新）
#  寫法：欄位：內容（冒號全形、半形都可以）
#  「# 」開頭的行是說明，不會出現在網站上
#  照片：這個資料夾裡的照片會依檔名（01、02…）自動排列
# ════════════════════════════════════════════

標題：${title}

介紹：${description}

# ── 以下選填 ──

# 排在這個分類的第幾組（數字小的在前）
順序：${order}

# Works 總覽的封面：填照片檔名（不用寫 .jpg）；不填＝第一張
封面：${cover}

# 改成「否」＝暫時不顯示在網站上（不是隱私保護，照片檔案仍是公開的）
顯示：是

# 大圖下方的說明：「照片說明 檔名：文字」，需要幾張就寫幾行
# 照片說明 03：Taipei, 2026
`
}
