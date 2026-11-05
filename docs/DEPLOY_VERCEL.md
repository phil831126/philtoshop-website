# Vercel 部署與驗收

> 以下帳號登入、授權與部署步驟都需要 **由你本人操作**，目前尚未替你完成任何部署。

## 第一次匯入

1. 到 <https://vercel.com/> 以 GitHub 帳號登入，授權 Vercel 讀取你的儲存庫（可只授權 `philtoshop-website`）。
2. **Add New… → Project** → 選擇 `philtoshop-website` → **Import**。
3. 設定確認（專案內的 `vercel.json` 已寫好，畫面上通常會自動帶入）：

   | 項目 | 值 |
   | --- | --- |
   | Framework Preset | Vite |
   | Root Directory | `./`（若你把整個上層資料夾推上 GitHub，這裡要選 `philtoshop-website`） |
   | Build Command | `npm run build` |
   | Output Directory | `dist` |
   | Install Command | `npm install`（預設） |
   | Environment Variables | 不需要 |

4. 按 **Deploy**，完成後會得到 `https://<專案名稱>.vercel.app` 網址。

## 專案中與部署相關的設定

- `vercel.json`
  - `rewrites`：所有網址都交給 `index.html`，讓 Vue Router 處理。因此直接打開或重新整理 `/works/emotional`、`/about` 等深層網址不會出現 404。Vercel 會**先**提供實際存在的檔案（圖片、`/assets/` 的 JS／CSS），找不到檔案才改用 `index.html`，所以圖片與靜態資源正常載入。
  - `headers`：`/assets/` 內含雜湊檔名的 JS、CSS、字型長期快取。`/images/` 不設長期快取，所以替換同名照片後能較快更新。
- 不存在的網址會顯示網站自己的 404 頁（Single Page App 的限制：此時 HTTP 狀態碼仍是 200）。

## 之後的更新

推送到 GitHub `main` 分支 → Vercel 自動重新建置與部署。可在 Vercel 專案的 **Deployments** 查看進度與錯誤記錄。建置失敗時舊版網站會維持運作。

## 部署後驗收清單

- [ ] 首頁、Works、About 都能開啟。
- [ ] 六個分類 `/works/emotional`、`/style`、`/monochrome`、`/ordinary`、`/shore`、`/viscera` 都能開啟。
- [ ] 在分類頁**按 F5 重新整理**不會出現 404。
- [ ] 首頁精選點擊後會跳到正確分類與章節。
- [ ] 所有照片都有顯示（若出現「Image unavailable」，檢查路徑與檔名大小寫）。
- [ ] 手機實機：選單可展開、Works 子選單可展開、相簿可左右滑、點照片可開大圖。
- [ ] 整頁沒有左右晃動（水平溢出）。

## 自訂網域（選用）

Vercel 專案 → **Settings → Domains** 新增網域，依畫面指示到網域商設定 DNS。此步驟需由你操作。
