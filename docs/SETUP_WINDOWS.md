# Windows 開發環境與第一次上線（依速查表 10 步）

> 標示 **【需由你操作】** 的步驟需要你本人登入帳號或在自己的電腦執行。這些帳號設定、推送與部署都還沒有替你完成。

## 四個工具怎麼串接

VS Code（寫程式、預覽）→ Git（記錄版本）→ GitHub（線上存放）→ Vercel（自動建置與部署，產生公開網址）

---

## 階段 A　準備開發環境

### 1. 安裝 VS Code　【需由你操作】
- 到 <https://code.visualstudio.com/> 下載安裝。
- 建議安裝擴充套件 **Vue - Official**（專案已在 `.vscode/extensions.json` 推薦，開啟專案時 VS Code 會提示）。

### 2. 安裝 Git，並設定提交身分　【需由你操作】
1. 到 <https://git-scm.com/download/win> 安裝（選項維持預設即可）。
2. 重新開啟 VS Code，開啟終端機（選單「終端機 → 新增終端機」）確認：
   ```bash
   git --version
   ```
3. 設定提交身分（每台電腦通常只要一次）：
   ```bash
   git config --global user.name "你的名稱"
   ```
   ```bash
   git config --global user.email "你的已驗證信箱或 GitHub noreply 信箱"
   ```
   - **user.name 只是提交紀錄上顯示的名稱，不是登入帳號，也不是密碼。** 建議與 GitHub 顯示名稱一致。
   - user.email 請用 GitHub 上已驗證的信箱；不想公開信箱可使用 GitHub 的 noreply 信箱（GitHub → Settings → Emails 可查看，格式類似 `12345678+帳號@users.noreply.github.com`）。
   - 確認目前設定：`git config --global --list`

### 3. 確認 GitHub 帳號　【需由你操作】
- 到 <https://github.com/> 註冊或登入，確認顯示名稱與已驗證 Email。

### 4. 安裝 Node.js（LTS）　【需由你操作】
1. 到 <https://nodejs.org/> 下載 **LTS** 版本安裝。
2. 重開 VS Code，確認：
   ```bash
   node -v
   ```
   ```bash
   npm -v
   ```
   本專案需要 Node.js 20.19 以上或 22.12 以上（`package.json` 的 `engines` 已註明）。

---

## 階段 B　啟動專案並上傳程式碼

### 5. 建立空白 GitHub Repository　【需由你操作】
- GitHub 右上角「+」→ **New repository**。
- 名稱建議 `philtoshop-website`；**不要**勾選 Add README、.gitignore 或 license（專案已經有了，勾選會讓第一次推送產生衝突）。
- 建立後複製儲存庫網址，例如 `https://github.com/你的帳號/philtoshop-website.git`。

### 6. 在 VS Code 開啟專案、安裝與預覽
1. VS Code →「檔案 → 開啟資料夾」→ 選擇 `philtoshop-website` 資料夾（有 `package.json` 的那一層）。
2. 終端機執行：
   ```bash
   npm install
   ```
   ```bash
   npm run dev
   ```
3. 瀏覽器開啟終端機顯示的網址（通常是 <http://localhost:5173>）。按 `Ctrl + C` 停止。

其他指令：

| 指令 | 用途 |
| --- | --- |
| `npm run dev` | 本機開發預覽（修改後自動更新） |
| `npm run typecheck` | 檢查資料欄位與程式型別 |
| `npm run build` | 正式建置（會先檢查照片與型別），輸出到 `dist/` |
| `npm run photos` | 檢查照片，並印出新作品資料夾可貼上的內容 |
| `npm run photos:check` | 同上；有找不到的照片時以錯誤結束（build 會自動執行） |
| `npm run preview` | 預覽 `dist/` 的正式建置結果 |

### 7. 建立第一筆 Git 版本（先確認 .gitignore）
專案已附 `.gitignore`，會排除 `node_modules/`、`dist/`、`.env`、`.env.*`（保留 `.env.example`）、`.vercel/`、記錄檔與系統檔。**提交前請先確認狀態，不要盲目重複執行。**

1. 先檢查這個資料夾是否已經是 Git 專案：
   ```bash
   git status
   ```
   - 出現 `fatal: not a git repository` → 這是第一次，繼續下一步。
   - 已顯示分支資訊 → **不要再執行 `git init`**，直接跳到 `git add .`。
2. 第一次初始化與提交：
   ```bash
   git init
   ```
   ```bash
   git add .
   ```
   ```bash
   git status
   ```
   （確認清單裡**沒有** `node_modules`、`dist`、`.env` 之類的檔案）
   ```bash
   git commit -m "Initial commit"
   ```
   ```bash
   git branch -M main
   ```

### 8. 連接並推送 GitHub　【需由你操作：第一次推送會要求登入 GitHub】
1. 先檢查是否已設定遠端：
   ```bash
   git remote -v
   ```
   - 沒有任何輸出 → 新增遠端：
     ```bash
     git remote add origin <GitHub儲存庫網址>
     ```
   - 已有 `origin` 但網址不對 → 改用：`git remote set-url origin <GitHub儲存庫網址>`（不要再 add，會出現 `remote origin already exists`）
2. 推送：
   ```bash
   git push -u origin main
   ```
   第一次會跳出 GitHub 登入視窗（Git Credential Manager），請在瀏覽器完成授權。

---

## 階段 C　部署與驗收

### 9. Vercel 匯入 GitHub 專案　【需由你操作】
詳見 [DEPLOY_VERCEL.md](DEPLOY_VERCEL.md)。重點：Build Command `npm run build`、Output Directory `dist`。

### 10. 部署並檢查網站　【需由你操作】
依 [DEPLOY_VERCEL.md](DEPLOY_VERCEL.md) 的驗收清單檢查網址、圖片、手機版與子頁面重新整理。

---

## 往後每次修改網站

```bash
git add .
```
```bash
git commit -m "Update portfolio"
```
```bash
git push
```

推送到 GitHub 的 `main` 分支後，Vercel 會自動重新建置與部署（通常 1～2 分鐘）。建議推送前先在本機執行 `npm run build`，確認沒有錯誤。

---

## Windows 常見問題

| 狀況 | 處理方式 |
| --- | --- |
| `git` 或 `node` 無法辨識 | 確認已安裝完成，**完全關閉再重開 VS Code**；仍不行時檢查系統 PATH。 |
| `npm.ps1 無法載入，因為這個系統上已停用指令碼執行` | **不需要降低整台電腦的安全設定。** 擇一：① VS Code 終端機右上「＋」旁的下拉選單 → 選 **Command Prompt（命令提示字元）** 再執行；② 在 PowerShell 改打 `npm.cmd install`、`npm.cmd run dev`。 |
| `src refspec main does not match any` | 還沒有任何 commit，或分支不是 main。先 `git commit`，再 `git branch -M main`。 |
| `remote origin already exists` | 用 `git remote -v` 檢查；網址需更換時用 `git remote set-url origin <網址>`。 |
| 推送被拒（`rejected … fetch first`） | 通常是 GitHub 上建立儲存庫時勾了 README。可 `git pull origin main --allow-unrelated-histories` 合併後再推送；不確定時先詢問再操作。 |
| 本機正常、上線後圖片不見 | 檢查檔名**大小寫**是否與資料完全一致（Windows 不分大小寫，Vercel 會區分）。 |
