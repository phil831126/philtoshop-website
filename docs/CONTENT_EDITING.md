# 內容更新教學：新增作品、照片與首頁精選

日常更新只需要：**① 放照片 → ② 改資料檔 → ③ 本機檢查 → ④ 提交推送 → ⑤ 等 Vercel 更新**。不需要修改任何 `.vue` 元件。

## 重要提醒

- **`published: false` 只是讓網站不顯示，不是隱私保護。** 放在 `public/` 的照片一旦推送到 GitHub 並部署，任何知道網址的人都可能直接開啟；GitHub 儲存庫若為公開，所有檔案也都看得到。**私密或未授權公開的原始照片不要放進這個專案。**
- 路徑與檔名只用 **英文小寫、數字、連字號**，不要有空白或中文，例如 `/images/works/emotional/quiet-light/01.jpg`。
- **大小寫必須完全一致**：Windows 不分大小寫，本機看起來正常；Vercel 伺服器會區分，`01.JPG` 和 `01.jpg` 是不同檔案。
- `width`／`height` 請填照片檔案的**實際像素**（檔案總管 → 右鍵 → 內容 → 詳細資料，或用看圖軟體查看）。比例錯誤會造成留白或比例異常。
- 建議上傳前先縮圖：長邊約 1600～2000px、JPG 品質約 80%，單張最好在 500 KB 以內，網站會快很多。

---

## 範例：在 Emotional 新增一組 5 張照片的作品

假設作品叫 **Morning Window**，識別碼（id）取 `morning-window`。

### ① 放入照片

建立資料夾並放入 5 張照片，依顯示順序命名：

```
public/images/works/emotional/morning-window/01.jpg
public/images/works/emotional/morning-window/02.jpg
public/images/works/emotional/morning-window/03.jpg
public/images/works/emotional/morning-window/04.jpg
public/images/works/emotional/morning-window/05.jpg
```

### ② 在資料檔新增作品

開啟 `src/data/projects/emotional.ts`，在最後一個 `},` 之後、`]` 之前加入：

```ts
  {
    id: 'morning-window', // 作品識別碼，上線後勿改（網址錨點 #morning-window）
    categoryId: 'emotional', // 必須和所在檔案的分類一致
    title: 'Morning Window',
    description: 'Soft light before the city wakes.',
    year: 2026, // 選填，可刪除整行
    coverPhotoId: 'mw-01', // 封面：填下面某張照片的 id
    order: 4, // 排在第 4 組
    published: true,
    photos: [
      { id: 'mw-01', src: '/images/works/emotional/morning-window/01.jpg', alt: 'Portrait by a bright window', width: 1080, height: 1920 },
      { id: 'mw-02', src: '/images/works/emotional/morning-window/02.jpg', alt: 'Hands resting on the windowsill', width: 1080, height: 1920 },
      { id: 'mw-03', src: '/images/works/emotional/morning-window/03.jpg', alt: 'Profile in morning light', width: 1080, height: 1920 },
      { id: 'mw-04', src: '/images/works/emotional/morning-window/04.jpg', alt: 'Curtains and soft shadow', width: 1600, height: 1067, caption: 'Landscape frames keep their ratio.' },
      { id: 'mw-05', src: '/images/works/emotional/morning-window/05.jpg', alt: 'Looking back toward the room', width: 1080, height: 1920 },
    ],
  },
```

說明：

- 照片總數「05 PHOTOS」會**自動計算**，不用另外填。
- 相簿順序＝ `photos` 陣列順序；要調整順序，直接上下移動整行。
- 第 4 張是橫式，網站會用相同高度、依比例加寬完整顯示，不會裁切或拉伸。
- 章節編號（01 /、02 /…）依 `order` 排序後自動產生。

### ③ 放到首頁精選

首頁精選與一般作品分開設定。開啟 `src/data/home.ts`，有兩種做法：

**做法 A：替換現有位置**（推薦，保持設計稿的 4 格版面）
找到想替換的那一筆（例如 `featured-emotional`），修改：

```ts
    projectId: 'morning-window', // 點擊後跳到這組作品
    image: {
      id: 'featured-morning-window',
      src: '/images/works/emotional/morning-window/01.jpg', // 也可以另外準備一張橫式首頁專用圖
      alt: 'Portrait by a bright window',
      width: 1080,
      height: 1920,
      objectPosition: 'center 25%', // 首頁會裁切，用這個調整對焦位置，避免切到臉
    },
    heading: 'Emotional',
    text: 'Soft light,\nbefore the city wakes.', // \n＝換行
```

**做法 B：新增第 5 筆**
在 `featured` 陣列最後加入一筆，`order: 5`、`layout: 'wide-left'`。首頁每 4 筆為一組，第 5 筆起會自動開新的一組，依序使用 `wide-left`、`offset-right`、`inset-left`、`tall-right` 四種位置。

```ts
  {
    id: 'featured-morning-window',
    categoryId: 'emotional',
    projectId: 'morning-window',
    image: {
      id: 'featured-morning-window',
      src: '/images/works/emotional/morning-window/01.jpg',
      alt: 'Portrait by a bright window',
      width: 1080,
      height: 1920,
      objectPosition: 'center 25%',
    },
    number: '04',
    heading: 'Emotional',
    text: 'Soft light,\nbefore the city wakes.',
    layout: 'wide-left',
    order: 5,
    published: true,
  },
```

四種位置（同一組內各用一次）：

| layout | 桌面位置 | 文字位置 |
| --- | --- | --- |
| `wide-left` | 左側大圖 | 圖片右側，上方一條短線 |
| `offset-right` | 右側、起點較低 | 只在照片上顯示小型毛玻璃標籤（手機版改到照片下方） |
| `inset-left` | 第二排、內縮 | 圖片左側，標題後接細線 |
| `tall-right` | 右側直式高圖 | 圖片左下方，標題後接細線 |

### ④ 本機檢查

```bash
npm run dev
```
開啟 <http://localhost:5173/works/emotional>，確認新章節、5 張照片、計數與大圖都正常。按 `F12 → Console`，若有「[內容檢查]」開頭的黃色警告（例如 id 重複、封面 id 不存在），依提示修正。

接著確認正式建置會通過：
```bash
npm run build
```

### ⑤ 提交並推送

```bash
git add .
```
```bash
git commit -m "Add Morning Window to Emotional"
```
```bash
git push
```

等待 Vercel 自動部署完成（約 1～2 分鐘），再到正式網址確認。

---

## 其他常見操作

- **隱藏作品**：`published: false`。若首頁精選指向它，開發模式會提示，記得一併調整 `home.ts`。
- **刪除作品**：刪除資料檔中的整個 `{ ... }`，再刪除對應照片資料夾。
- **換照片但檔名不變**：直接覆蓋檔案；若尺寸改變，記得同步更新 `width`／`height`。
- **修改替代文字**：改 `alt`，用一句話描述畫面內容（給視障使用者與照片載入失敗時使用）。
- **聯絡方式**：`src/data/site.ts` 的 `contact`，留空字串就不會顯示連結。
