/**
 * 【控制畫面】全站入口
 * 【負責功能】載入字型與全站樣式、建立 Vue 應用程式與路由；開發模式下檢查內容資料。
 * 【資料來源】src/styles/、src/router/、src/data/validate.ts
 * 【常見修改】一般不需要修改。更換字型時，請同步修改 tokens.css 的 --font-serif／--font-sans。
 * 【注意事項】樣式載入順序：字型 → tokens.css（變數）→ base.css（基礎）。
 */
import { createApp } from 'vue'

// 字型（自架，不依賴外部字型服務；只下載實際用到的語系子集）
import '@fontsource-variable/source-serif-4/opsz.css'
import '@fontsource-variable/source-serif-4/opsz-italic.css'
import '@fontsource-variable/inter/index.css'
// 中文標題：思源宋體（Noto Serif TC，與英文的 Source Serif 4 同系列）；只會下載頁面上實際出現的字
import '@fontsource-variable/noto-serif-tc/index.css'

import './styles/tokens.css'
import './styles/base.css'

import App from './App.vue'
import { router } from './router'

if (import.meta.env.DEV) {
  import('./data/validate').then(({ validateContent }) => validateContent())
}

createApp(App).use(router).mount('#app')
