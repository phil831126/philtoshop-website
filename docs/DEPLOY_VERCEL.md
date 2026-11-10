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
  - `rewrites`：除了 `/static/`（JS、CSS、字型）、`/images/`（照片）、`favicon.svg` 以外的網址都交給 `index.html`，讓 Vue Router 處理。因此直接打開或重新整理 `/works/emotional`、`/about` 等深層網址不會出現 404；而找不到的程式或照片會正常回「404 找不到」，不會拿網頁頂替（避免部署切換時瀏覽器把網頁當成程式記住，造成空白頁）。
  - `headers`：`/images/` 快取 1 小時（之後在背景確認新版），替換同名照片後最晚下一次瀏覽就會看到。`/static/` 的程式檔不設長期快取，每次都向伺服器確認（沒變時只回「沒變」，幾乎不影響速度），部署新版時不會卡在舊檔案。
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
