# 檔案對照表：想改什麼 → 開哪個檔案 → 改哪個欄位

> **日常更新只需要動 `public/images/`：照片放進資料夾，文字改資料夾裡的 `info.txt`。不需要打開程式檔。**
> 寫法與每個欄位的說明見 [EDIT_TEXT.md](EDIT_TEXT.md)。

## 內容（最常修改）

| 想修改什麼 | 打開哪個檔案 | 改哪個欄位 |
| --- | --- | --- |
| 左上角網站名稱（兩行） | `public/images/info.txt` | 網站名稱、副標 |
| 瀏覽器分頁標題、頁尾版權 | `public/images/info.txt` | 分頁標題、版權 |
| Instagram、Email | `public/images/info.txt` | Instagram、Email（留空＝不顯示） |
| 首頁主照片 | `public/images/home/`（同檔名覆蓋 hero.jpg）或 `home/info.txt` | 主照片、主照片對焦 |
| 首頁標語、EXPLORE WORKS 按鈕 | `public/images/home/info.txt` | 標語、按鈕文字 |
| 首頁精選區標題 | `public/images/home/info.txt` | 精選標題（留空＝不顯示） |
| 首頁精選作品 | `public/images/home/info.txt` | 【精選 N】的照片、標題、介紹、連結、顯示 |
| Works 總覽頁的大標與副標 | `public/images/works/info.txt` | 大標、副標 |
| 分類名稱、大標下的一句話 | `public/images/works/<分類>/info.txt` | 名稱、介紹 |
| Works 總覽卡片介紹與代表圖 | `public/images/works/<分類>/info.txt`（代表圖也可以直接把照片放進這個資料夾） | 總覽介紹、總覽封面、作品順序（分類頁裡各組作品的上下順序） |
| 新增一組作品 | `public/images/works/<分類>/` | 新增資料夾放照片（見 CONTENT_EDITING.md） |
| 作品名稱、模特、模特 IG、日期 | `public/images/works/<分類>/<作品>/info.txt` | 標題、模特、IG（填 @帳號 自動變連結）、日期、選填介紹 |
| 作品隱藏 | 同上 | 顯示（前後順序建議改分類 info.txt 的「作品順序」） |
| 作品封面（Works 總覽用） | 同上 | 封面（照片檔名，不用寫 .jpg） |
| 大圖下方的照片說明 | 同上 | 照片說明 03 |
| 照片順序 | 照片資料夾 | 改檔名（`01.jpg` 排第一）；檔名前加 `_` 可暫時不顯示 |
| About 照片與文字 | `public/images/about/info.txt` | 照片、標題、副標、自我介紹 |
| 文字中加超連結 | 任何「介紹」類欄位 | 寫成 `[顯示文字](網址)` |
| 檢查照片與 info.txt 寫法 | 終端機 | `npm.cmd run photos` |
| 導覽文字（Home／Works／About） | `src/data/site.ts` | `nav[].label`（較少需要改） |

## 外觀（較少修改）

| 想修改什麼 | 應開啟哪個檔案 | 應修改哪個欄位 |
| --- | --- | --- |
| 全站顏色 | `src/styles/tokens.css` | `--color-*` |
| 毛玻璃深淺與模糊度 | `src/styles/tokens.css` | `--glass-*` |
| 字型 | `src/styles/tokens.css`（＋ `src/main.ts` 的字型載入） | `--font-serif`、`--font-sans` |
| 字級 | `src/styles/tokens.css` | `--fs-*`（桌面）；檔案下方「手機」區段為手機值 |
| 全站最大寬度、左右留白 | `src/styles/tokens.css` | `--container-max`、`--gutter` |
| 導覽列高度 | `src/styles/tokens.css` | `--header-h` |
| 相簿一次顯示幾張 | `src/styles/tokens.css` | `--carousel-visible`（桌面 3；「平板」區段 2；「手機」區段 1，改成 1.2 會露出下一張一小段）。格子比例依照片自動調整 |
| 手機相簿照片最高高度 | `src/styles/tokens.css` 的「手機」區段 | `--carousel-max-h` |
| 相簿照片間距 | `src/styles/tokens.css` | `--carousel-gap` |
| 分類頁左右欄比例 | `src/components/works/ProjectChapter.vue` | `.chapter` 的 `grid-template-columns` |
| 首頁首屏照片與文字比例 | `src/components/home/HomeHero.vue` | `.hero` 的 `grid-template-columns`、`.hero__media` 的 `aspect-ratio` |
| 首頁精選的桌面位置 | `src/components/home/FeaturedWorkItem.vue` | 「桌面」區段的 `grid-column`、`grid-row`、`margin-top` |
| 首頁精選的手機錯位 | `src/components/home/FeaturedWorkItem.vue` | 「手機」區段的 `width`、`margin-left` |

## 程式結構（一般不需修改）

| 檔案 | 用途 |
| --- | --- |
| `src/types/portfolio.ts` | 網站內部資料的格式定義 |
| `src/data/projects/index.ts` | 依照片資料夾自動建立作品、查詢工具、照片數計算 |
| `src/data/site.ts`、`home.ts`、`about.ts`、`categories.ts` | 讀取各 info.txt（沒寫的欄位用這裡的預設值），一般不用打開 |
| `src/data/text.ts` | info.txt 讀取小工具（段落、是／否、對焦、照片路徑） |
| `src/data/validate.ts` | 開發模式內容檢查（主控台顯示「[內容檢查]」警告，含 info.txt 打錯的欄位） |
| `src/router/index.ts` | 網址與頁面對應、捲動位置、分頁標題 |
| `src/composables/usePhotoCarousel.ts` | 相簿捲動、計數、頭尾停用邏輯 |
| `src/components/layout/` | 導覽列、手機選單、頁尾 |
| `src/components/home/` | 首頁首屏、精選區 |
| `src/components/works/` | 分類頁首、章節、相簿、大圖檢視 |
| `src/components/common/` | 照片顯示（含載入失敗替代）、箭頭圖示 |
| `src/pages/` | 各頁面的組合 |
| `scripts/photos.mjs` | 照片檢查與新作品內容產生（npm run photos／photos:check） |
| `scripts/image-manifest.mjs` | 掃描照片寬高，產生 `src/data/generated/images.ts`（dev／build 自動執行） |
| `scripts/content-files.mjs` | 讀取 info.txt，產生 `src/data/generated/content.ts`；可用的欄位名稱列在這裡 |
| `scripts/info-templates.mjs` | 新作品資料夾的 info.txt 範本 |
| `src/data/generated/` | ⚠ 自動產生的照片清單與文字，請勿手動修改 |
| `src/data/images.ts` | `imageFile()`：首頁／About 照片寬高自動帶入 |
| `vercel.json` | Vercel 建置設定與深層網址支援 |
