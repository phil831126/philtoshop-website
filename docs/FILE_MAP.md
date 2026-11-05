# 檔案對照表：想改什麼 → 開哪個檔案 → 改哪個欄位

> 日常更新照片與文字只需要改 `src/data/` 與 `public/images/`，**不需要修改 Vue 元件**。
> 資料檔中標有 `✎` 的欄位可以放心修改；標有 `⚠` 的請先閱讀說明。

## 內容（最常修改）

| 想修改什麼 | 應開啟哪個檔案 | 應修改哪個欄位 |
| --- | --- | --- |
| 品牌名稱、副標 | `src/data/site.ts` | `site.brandName`、`site.brandSubtitle` |
| 導覽文字（Home／Works／About） | `src/data/site.ts` | `nav[].label`（`to` 是網址，不建議改） |
| 瀏覽器分頁標題後綴 | `src/data/site.ts` | `site.titleSuffix` |
| 首頁主照片 | `src/data/home.ts` | `hero.image.src`、`width`、`height`、`alt` |
| 首頁主照片裁切位置（避免切到臉） | `src/data/home.ts` | `hero.image.objectPosition`，例如 `'center 30%'` |
| 首頁標語與換行位置 | `src/data/home.ts` | `hero.tagline`（`\n` 是桌面版換行處） |
| EXPLORE WORKS 文字／連結 | `src/data/home.ts` | `hero.ctaLabel`、`hero.ctaTo` |
| 首屏毛玻璃資訊卡 | `src/data/home.ts` | `hero.card.label`、`title`、`to` |
| 「Selected works.」標題 | `src/data/home.ts` | `featuredHeading.regular`、`featuredHeading.italic` |
| 首頁精選：照片 | `src/data/home.ts` | `featured[].image`（可填作品資料夾內的照片路徑） |
| 首頁精選：位置 | `src/data/home.ts` | `featured[].layout`：`wide-left`／`offset-right`／`inset-left`／`tall-right` |
| 首頁精選：編號、標題、短介紹 | `src/data/home.ts` | `featured[].number`、`heading`、`text` |
| 首頁精選：點擊後前往哪裡 | `src/data/home.ts` | `featured[].categoryId`、`projectId`（跳到該章節） |
| 首頁精選：順序、隱藏 | `src/data/home.ts` | `featured[].order`、`published` |
| 分類名稱 | `src/data/categories.ts` | `name`（`id` 是網址，不可改） |
| 分類頁大標下的一句介紹 | `src/data/categories.ts` | `intro` |
| Works 總覽的介紹與代表圖 | `src/data/categories.ts` | `summary`、`cover` |
| 新增作品（一組照片） | `src/data/projects/<分類>.ts` | 在陣列加一個 `{ ... }`，見 CONTENT_EDITING.md |
| 刪除作品 | `src/data/projects/<分類>.ts` | 刪除整個 `{ ... }`（若首頁精選有引用，也要一併修改 home.ts） |
| 暫時隱藏作品 | `src/data/projects/<分類>.ts` | `published: false` |
| 作品前後順序 | `src/data/projects/<分類>.ts` | `order`（數字小的在前） |
| 作品名稱、介紹 | `src/data/projects/<分類>.ts` | `title`、`description` |
| 作品封面（Works 總覽用） | `src/data/projects/<分類>.ts` | `coverPhotoId` |
| 新增照片 | `public/images/works/<分類>/<作品id>/` ＋ 對應資料檔 | `photos` 陣列加一筆 |
| 照片順序 | `src/data/projects/<分類>.ts` | 調整 `photos` 陣列中的先後順序 |
| 照片替代文字 | `src/data/projects/<分類>.ts` | `photos[].alt` |
| 照片說明（大圖下方） | `src/data/projects/<分類>.ts` | `photos[].caption`（選填） |
| About 照片與文字 | `src/data/about.ts` | `image`、`heading`、`philosophy`、`bio` |
| Instagram、Email | `src/data/site.ts` | `contact.instagramUrl`、`instagramLabel`、`email`（留空＝不顯示） |
| 頁尾版權名稱 | `src/data/site.ts` | `site.copyrightName` |

## 外觀（較少修改）

| 想修改什麼 | 應開啟哪個檔案 | 應修改哪個欄位 |
| --- | --- | --- |
| 全站顏色 | `src/styles/tokens.css` | `--color-*` |
| 毛玻璃深淺與模糊度 | `src/styles/tokens.css` | `--glass-*` |
| 字型 | `src/styles/tokens.css`（＋ `src/main.ts` 的字型載入） | `--font-serif`、`--font-sans` |
| 字級 | `src/styles/tokens.css` | `--fs-*`（桌面）；檔案下方「手機」區段為手機值 |
| 全站最大寬度、左右留白 | `src/styles/tokens.css` | `--container-max`、`--gutter` |
| 導覽列高度 | `src/styles/tokens.css` | `--header-h` |
| 相簿一次顯示幾張 | `src/styles/tokens.css` | `--carousel-visible`（桌面 3；「平板」區段 2；「手機」區段 1.22） |
| 手機相簿照片最高高度 | `src/styles/tokens.css` 的「手機」區段 | `--carousel-max-h` |
| 相簿照片間距 | `src/styles/tokens.css` | `--carousel-gap` |
| 分類頁左右欄比例 | `src/components/works/ProjectChapter.vue` | `.chapter` 的 `grid-template-columns` |
| 首頁首屏照片與文字比例 | `src/components/home/HomeHero.vue` | `.hero` 的 `grid-template-columns`、`.hero__media` 的 `aspect-ratio` |
| 首頁精選的桌面位置 | `src/components/home/FeaturedWorkItem.vue` | 「桌面」區段的 `grid-column`、`grid-row`、`margin-top` |
| 首頁精選的手機錯位 | `src/components/home/FeaturedWorkItem.vue` | 「手機」區段的 `width`、`margin-left` |

## 程式結構（一般不需修改）

| 檔案 | 用途 |
| --- | --- |
| `src/types/portfolio.ts` | 所有資料欄位的格式定義 |
| `src/data/projects/index.ts` | 合併六個分類資料、查詢工具、照片數計算 |
| `src/data/validate.ts` | 開發模式資料檢查（主控台顯示「[內容檢查]」警告） |
| `src/router/index.ts` | 網址與頁面對應、捲動位置、分頁標題 |
| `src/composables/usePhotoCarousel.ts` | 相簿捲動、計數、頭尾停用邏輯 |
| `src/components/layout/` | 導覽列、手機選單、頁尾 |
| `src/components/home/` | 首頁首屏、精選區 |
| `src/components/works/` | 分類頁首、章節、相簿、大圖檢視 |
| `src/components/common/` | 照片顯示（含載入失敗替代）、箭頭圖示 |
| `src/pages/` | 各頁面的組合 |
| `vercel.json` | Vercel 建置設定與深層網址支援 |
