# 內容更新教學：上傳照片、新增作品、首頁精選

## 最短流程（替換或增加照片）

1. 把照片放進對應資料夾：`public/images/works/<分類>/<作品id>/`
2. 執行 `npm.cmd run dev` 預覽（已經開著的話會**自動更新**，不用重開）
3. 推送上線：`git add .` → `git commit -m "Update photos"` → `git push`

**不需要修改任何程式或資料檔。** 照片會自動依**檔名順序**排列，寬高自動讀取，照片數（例如 10 PHOTOS）自動計算。

---

## 重要提醒

- **`published: false` 只是讓網站不顯示，不是隱私保護。** 放在 `public/` 的照片推送後，任何知道網址的人都能開啟；儲存庫若為 Public，所有檔案也都看得到。**私密原始照片不要放進專案。**
- 手機照片常含 **GPS 拍攝地點**：選取照片 → 右鍵 → 內容 → 詳細資料 → **移除內容和個人資訊**。
- 建議先縮圖：長邊 1600～2000 px、單張約 500 KB 以內（Windows「相片」App 的「調整影像大小」，或 PowerToys 的「調整圖片大小」可一次處理多張）。
- 檔名建議用 **小寫英文、數字、連字號**，例如 `01.jpg`。大寫或空白也能顯示，但工具會提醒你。

---

## 照片的排列與顯示

| 想做什麼 | 怎麼做 |
| --- | --- |
| 調整照片順序 | **改檔名**：`01.jpg` 會排在 `02.jpg` 前面（`10.jpg` 也會正確排在 `09.jpg` 後面） |
| 暫時不顯示某張照片 | 在檔名前面加底線，例如 `_05.jpg`（檔案仍在公開資料夾中） |
| 刪除照片 | 直接刪除檔案 |
| 換照片 | 用同檔名覆蓋 |

顯示方式：

- 分類頁相簿會依這組照片的**實際比例**（例如 2:3 直式）排列：桌面一次剛好 3 張、平板 2 張、手機 1 張，**邊緣不會出現被切到一半的照片**，每張都完整顯示、不裁切。
- 同一組裡有少數比例不同的照片（例如一張橫式），會**完整縮小置中**放進同樣大小的格子。
- 大圖檢視、Works 總覽代表圖、About 照片也都完整顯示。
- 只有**首頁**的主照片與精選照片會依設計稿裁切，可用 `objectPosition` 調整對焦位置（見下方）。

---

## 新增一組作品

以在 Emotional 新增 **Morning Window** 為例：

### ① 建立資料夾並放照片

```
public/images/works/emotional/morning-window/01.jpg
public/images/works/emotional/morning-window/02.jpg
…
```

資料夾名稱（`morning-window`）就是作品識別碼：用小寫英文與連字號，**上線後不要再改**。

### ② 取得要貼上的內容

```bash
npm.cmd run photos
```

工具會列出「有照片但還沒有作品資料」的資料夾，並印出可以直接貼上的內容：

```ts
  {
    id: 'morning-window',
    categoryId: 'emotional',
    title: 'Morning Window',
    description: 'Write one sentence about this series.',
    order: 4,
    published: true,
  },
```

### ③ 貼進分類資料檔

開啟 `src/data/projects/emotional.ts`，貼在最後一個 `},` 的下一行、`]` 的上一行，再把 `title`、`description` 改成你的文字（只改引號內），按 `Ctrl + S` 存檔。

完成後的檔案結尾看起來像這樣：

```ts
  {
    id: 'between-us',
    …
    published: true,
  },
  {
    id: 'morning-window',
    categoryId: 'emotional',
    title: 'Morning Window',
    description: 'Soft light before the city wakes.',
    order: 4,
    published: true,
  },
]
```

### ④ 選填欄位（需要時再加）

```ts
  {
    id: 'morning-window',
    categoryId: 'emotional',
    title: 'Morning Window',
    description: 'Soft light before the city wakes.',
    year: 2026,                 // 年份
    coverPhotoId: '03',         // Works 總覽封面：檔名去掉副檔名；不填＝第一張
    order: 4,
    published: true,
    photoNotes: {               // 個別照片的描述（給螢幕閱讀器）與大圖下方說明
      '01.jpg': { alt: 'Portrait by a bright window' },
      '04.jpg': { alt: 'Curtains and soft shadow', caption: 'Taipei, 2026' },
    },
  },
```

沒寫 `photoNotes` 的照片，描述會自動使用「作品名稱 — photo 3 of 10」。

---

## 放到首頁精選

開啟 `src/data/home.ts`。首頁照片只要寫路徑，寬高會自動帶入：

```ts
    projectId: 'morning-window', // 點擊後跳到這組作品
    image: imageFile('/images/works/emotional/morning-window/01.jpg', {
      alt: 'Portrait by a bright window',
      objectPosition: 'center 25%', // 首頁會裁切；用這個調整對焦位置，避免切到臉
    }),
    heading: 'Emotional',
    text: 'Soft light,\nbefore the city wakes.', // \n＝換行
```

**做法 A：替換現有位置**（推薦）— 修改現有某一筆的 `projectId`、`image`、`heading`、`text`。

**做法 B：新增第 5 筆** — 首頁每 4 筆為一組，第 5 筆起自動開新的一組，依序使用以下四種位置：

| layout | 桌面位置 | 文字位置 |
| --- | --- | --- |
| `wide-left` | 左側大圖 | 圖片右側，上方一條短線 |
| `offset-right` | 右側、起點較低 | 照片上的小型毛玻璃標籤（手機版改到照片下方） |
| `inset-left` | 第二排、內縮 | 圖片左側，標題後接細線 |
| `tall-right` | 右側直式高圖 | 圖片左下方，標題後接細線 |

替換首頁主照片最簡單：用同檔名覆蓋 `public/images/home/hero.jpg`。

---

## 上線前檢查

```bash
npm.cmd run photos
```
會列出每組作品的照片數，以及需要注意的檔案（太大、含 GPS、檔名大寫或空白、找不到的檔案）。

```bash
npm.cmd run build
```
建置前會自動檢查照片；有照片找不到時會停止，Vercel 也不會把壞掉的版本上線（舊版網站繼續運作）。

開發中也可以按 `F12 → Console`，查看「[內容檢查]」開頭的提醒。

---

## 推送上線

```bash
git add .
```
```bash
git commit -m "Update photos"
```
```bash
git push
```

等 1～2 分鐘，Vercel 自動部署完成。
