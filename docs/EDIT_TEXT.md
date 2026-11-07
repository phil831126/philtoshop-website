# 自己修改網站文字與加入超連結

網站上所有文字都放在 `src/data/` 資料夾裡的幾個檔案，**不用碰程式、不用依靠 Claude**。改完存檔、推送到 GitHub，Vercel 就會自動更新網站。

---

## 一、文字在哪個檔案

| 網站上的位置 | 檔案 | 欄位 |
| --- | --- | --- |
| 左上角網站名稱（兩行） | `src/data/site.ts` | `brandName`（第一行）、`brandSubtitle`（第二行） |
| 瀏覽器分頁標題後綴、頁尾版權 | `src/data/site.ts` | `titleSuffix`、`copyrightName` |
| 首頁大標語 | `src/data/home.ts` | `hero.tagline`（`\n` 是換行處） |
| 首頁毛玻璃小卡 | `src/data/home.ts` | `hero.card.label`、`hero.card.title` |
| 首頁精選的名稱與短介紹 | `src/data/home.ts` | `featured` 裡每一項的 `heading`、`text` |
| 首頁精選區標題（目前不顯示） | `src/data/home.ts` | `featuredHeading`（留空＝不顯示） |
| 分類名稱、分類頁大標下的一句話 | `src/data/categories.ts` | `name`、`intro` |
| Works 總覽卡片下的介紹 | `src/data/categories.ts` | `summary` |
| 每組作品的名稱、介紹 | `src/data/projects/<分類>.ts` | `title`、`description` |
| 大圖下方的照片說明 | `src/data/projects/<分類>.ts` | `photoNotes` 的 `caption` |
| About 頁 | `src/data/about.ts` | `heading`、`philosophy`、`bio` |

更完整的對照表見 [FILE_MAP.md](FILE_MAP.md)。

---

## 二、改文字的兩種方法

### 方法 A：在 VS Code 修改（可先預覽）

1. VS Code 左側檔案總管打開要改的檔案，例如 `src/data/projects/emotional.ts`。
2. **只改單引號 `' '` 裡面的文字**，例如：
   ```ts
   description: 'A portrait series in natural window light.', // ✎
   ```
   改成：
   ```ts
   description: 'Soft afternoon light, quiet hands.', // ✎
   ```
3. `Ctrl + S` 存檔。若 `npm.cmd run dev` 開著，瀏覽器的 <http://localhost:5173> 會立刻更新。
4. 確認沒問題後推送：
   ```bash
   git add .
   ```
   ```bash
   git commit -m "Update text"
   ```
   ```bash
   git push
   ```

### 方法 B：直接在 GitHub 網頁修改（不用開電腦裡的專案）

適合臨時改一兩個字，手機瀏覽器也可以操作。

1. 打開 <https://github.com/phil831126/philtoshop-website>，點進 `src` → `data` → 要改的檔案。
2. 點右上角的**鉛筆圖示（Edit this file）**。
3. 修改單引號裡的文字。
4. 點右上角綠色的 **Commit changes…**，再按一次 **Commit changes**。
5. 1～2 分鐘後 Vercel 會自動更新網站。

> ⚠ 用方法 B 改過之後，回到 VS Code 繼續工作前，**先在終端機執行 `git pull`**，把網頁上的修改拿回電腦，否則下次 `git push` 會被拒絕。

---

## 三、寫文字時要注意的 4 件事

1. **文字前後的單引號不能刪**，結尾的逗號 `,` 也要保留。
2. **文字裡要用英文撇號（'）時**，前面加反斜線 `\`，或把外面的引號改成雙引號：
   ```ts
   title: 'Philtoshop\'s Diary',
   title: "Philtoshop's Diary",
   ```
   中文的「」、，。不受影響，可以直接寫。
3. `\n` 代表換行（只有首頁標語與首頁精選短介紹會換行）。
4. 檔案裡 `//` 後面是給你看的說明，不會出現在網站上；標 `✎` 的欄位可以放心改，標 `⚠` 的請先看說明（例如作品的 `id` 不要改）。

**改壞了怎麼辦？** 如果格式寫錯（例如少一個引號），Vercel 建置會失敗，**正式網站會維持上一個正常版本，不會壞掉**。到 Vercel 的 Deployments 頁面會看到紅色的 Error，修正後再推送一次即可。推送前在本機執行 `npm.cmd run build` 可以先抓出錯誤。

---

## 四、加入超連結

在文字中用這個格式：

```
[要顯示的文字](網址)
```

中括號 `[ ]` 裡是網站上看到的文字，小括號 `( )` 裡是網址，**兩者中間不能有空格**。

### 範例：連到 Instagram 帳號

`src/data/about.ts`：
```ts
bio: [
  'Based in Taipei. See more on [Instagram](https://www.instagram.com/你的帳號/).',
],
```
網站上會顯示「Based in Taipei. See more on Instagram.」，其中 **Instagram** 是可點擊的連結（有細底線），點了會在新分頁打開你的 IG 頁面。

把 `你的帳號` 換成你真正的 IG 帳號。最保險的做法是：用瀏覽器打開你的 IG 個人頁面，**直接複製網址列的網址**貼進小括號。

### 其他範例

| 想連到 | 寫法 | 開啟方式 |
| --- | --- | --- |
| IG 帳號 | `[@your_account](https://www.instagram.com/your_account/)` | 新分頁 |
| 某一則 IG 貼文 | `[this post](https://www.instagram.com/p/貼文代碼/)` | 新分頁 |
| 寄 Email | `[email me](mailto:you@example.com)` | 開啟郵件程式 |
| 網站內的分類頁 | `[Shore](/works/shore)` | 原分頁 |
| 網站內的某組作品 | `[Quiet Light](/works/emotional#quiet-light)` | 原分頁 |

同一段文字可以放好幾個連結：
```ts
description: 'Shot with [@model_a](https://www.instagram.com/model_a/) and [@model_b](https://www.instagram.com/model_b/).',
```

### 可以放連結的地方

- ✅ 作品介紹 `description`、分類頁介紹 `intro`、首頁精選短介紹 `text`、About 的 `philosophy` 與 `bio`、大圖說明 `caption`
- ❌ 標題類（作品名稱 `title`、分類名稱、首頁標語、網站名稱）與 Works 總覽卡片的 `summary`：這些本身已經是連結或大標題，寫了 `[ ](...)` 會原樣顯示括號

### 為了安全

只接受 `https://`、`http://`、`mailto:` 與 `/` 開頭的站內網址，其他寫法會被當成一般文字。文字裡的 HTML 標籤（例如 `<a href>`）也不會被執行，所以請一律使用上面的 `[文字](網址)` 格式。

---

## 五、頁尾／About 的 Instagram 與 Email 按鈕

除了在文字中放連結，`src/data/site.ts` 的 `contact` 也可以填 IG 與 Email，網站會在 About 頁與頁尾自動顯示：

```ts
export const contact: ContactLinks = {
  instagramUrl: 'https://www.instagram.com/your_account/',
  instagramLabel: '@your_account',
  email: '',          // 留空＝不顯示
}
```
