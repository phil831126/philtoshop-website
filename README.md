# PHILTOSHOP — Personal Photography

攝影作品展示網站（Vite＋Vue 3＋TypeScript＋Vue Router），部署於 Vercel。沒有後台、資料庫或 API：照片放進 `public/images/works/<分類>/<作品id>/` 就會自動顯示（依檔名排序、寬高自動讀取），文字在 `src/data/` 修改，推送到 GitHub 後由 Vercel 自動建置。

## 快速開始

```bash
npm install
```
```bash
npm run dev
```

| 指令 | 用途 |
| --- | --- |
| `npm run dev` | 本機開發預覽 <http://localhost:5173> |
| `npm run typecheck` | 型別與資料欄位檢查 |
| `npm run build` | 正式建置到 `dist/`（會先檢查照片與型別） |
| `npm run photos` | 檢查照片，並印出新作品資料夾可貼上的內容 |
| `npm run photos:check` | 同上；有找不到的照片時以錯誤結束（build 會自動執行） |
| `npm run preview` | 預覽正式建置 |

PowerShell 出現 `npm.ps1` 被封鎖時，改用「命令提示字元」或輸入 `npm.cmd run dev`，不需要調整系統安全設定。

## 網址

`/`、`/works`、`/works/emotional`、`/works/style`、`/works/monochrome`、`/works/ordinary`、`/works/shore`、`/works/viscera`、`/about`，其他網址顯示 404。

## 文件

| 文件 | 內容 |
| --- | --- |
| [docs/SETUP_WINDOWS.md](docs/SETUP_WINDOWS.md) | Windows 環境安裝、Git 設定、第一次推送（依速查表 10 步） |
| [docs/EDIT_TEXT.md](docs/EDIT_TEXT.md) | **自己修改網站文字、加入超連結（IG 等）**，含 GitHub 網頁直接修改 |
| [docs/CONTENT_EDITING.md](docs/CONTENT_EDITING.md) | 新增作品與照片、放到首頁精選的完整範例 |
| [docs/FILE_MAP.md](docs/FILE_MAP.md) | 想改什麼 → 開哪個檔案 → 改哪個欄位 |
| [docs/DEPLOY_VERCEL.md](docs/DEPLOY_VERCEL.md) | Vercel 匯入、設定與部署驗收 |
| [docs/VISUAL_CHECK.md](docs/VISUAL_CHECK.md) | 驗收紀錄、與設計稿差異、示意素材與待替換清單 |

## 結構

```
src/
  data/          ← 內容（日常只改這裡）
    site.ts  home.ts  categories.ts  about.ts
    projects/    emotional.ts … viscera.ts、index.ts
  types/         資料格式定義
  components/    layout/ home/ works/ common/
  pages/         HomePage、WorksPage、CategoryPage、AboutPage、NotFoundPage
  composables/   usePhotoCarousel.ts
  styles/        tokens.css（設計變數）、base.css
  router/
public/images/   home/ about/ works/<分類>/<作品>/
```

> ⚠ 部分照片與文案仍為示意內容，請依 docs/VISUAL_CHECK.md 的清單替換。
> `published: false` 只控制是否顯示，不是隱私保護；私密原始照片請勿放進專案。
