/**
 * 【控制畫面】無（全站共用的資料型別）
 * 【負責功能】定義照片、作品、分類、首頁精選、About 等資料的欄位格式。
 *            TypeScript 會依此檢查 src/data 內的資料，欄位打錯或漏填時 npm run typecheck 會提示。
 * 【資料來源】無。此檔只描述格式，實際內容在 src/data/。
 * 【常見修改】一般更新照片、文字「不需要」改這裡。
 * 【注意事項】若要新增欄位，需同步修改使用該欄位的元件；不熟悉時建議先不要動。
 */

/** 六個作品分類的固定 ID（網址與資料關聯都用這個，拼字不可變更） */
export type CategoryId =
  | 'emotional'
  | 'style'
  | 'monochrome'
  | 'ordinary'
  | 'shore'
  | 'viscera'

/** 一張照片（網站內部使用的完整資料；作品照片由資料夾自動產生，不需要手寫） */
export interface Photo {
  /** 照片識別碼：自動照片＝檔名去掉副檔名，例如 01.jpg → '01' */
  id: string
  /** 圖片路徑：放在 public 之下，以 / 開頭，例如 /images/works/emotional/quiet-light/01.jpg */
  src: string
  /** 替代文字：描述照片內容，給螢幕閱讀器與圖片載入失敗時使用 */
  alt: string
  /** 寬度（像素）：自動讀取 */
  width: number
  /** 高度（像素）：自動讀取 */
  height: number
  /** 選填：照片說明，會顯示在大圖檢視下方 */
  caption?: string
  /**
   * 選填：當照片被「裁切顯示」時（首頁主圖、首頁精選）的對焦位置。
   * 寫法同 CSS object-position，例如 'center 30%'（水平置中、垂直偏上）。
   * 分類分頁相簿、大圖、Works 總覽一律完整顯示照片，不使用這個欄位。
   */
  objectPosition?: string
}

/** 個別照片的補充說明（選填），來自 info.txt 的「照片說明 03」「照片描述 03」，以檔名（不含副檔名）對應 */
export interface PhotoNote {
  /** 照片描述（替代文字）；未填時自動使用「作品名稱 — photo 3 of 10」 */
  alt?: string
  /** 大圖檢視下方的說明文字 */
  caption?: string
}

/**
 * 一組作品（分類分頁中的一個章節），由資料夾自動建立：
 * public/images/works/<分類>/<作品資料夾>/ 裡的照片＋同資料夾的 info.txt。
 */
export interface Project {
  /** 網址錨點：由資料夾名稱產生（空白換成 -），例如 Dark Game → #Dark-Game */
  id: string
  /** 所屬分類（上一層資料夾名稱） */
  categoryId: CategoryId
  /** 照片資料夾（public/images/ 之後的路徑），例如 works/emotional/quiet-light */
  folder: string
  /** 作品資料夾名稱，例如 被遺忘之人、Dark Game */
  folderName: string
  /** 作品名稱（預設＝資料夾名稱；info.txt 的「標題」有填才改用它） */
  title: string
  /** 模特名字（info.txt 的「模特」；可寫好幾行） */
  model: string
  /** 模特 Instagram（info.txt 的「IG」；自動變成連結） */
  instagram: { label: string; url: string }[]
  /** 日期，照寫的顯示，例如 2026/05（info.txt 的「日期」） */
  date: string
  /** 選填：作品介紹（info.txt 的「介紹」） */
  description: string
  /** 排序：數字小的在前（info.txt 的「順序」） */
  order: number
  /** 是否顯示（info.txt 的「顯示」；注意這不是隱私保護，照片檔案仍是公開的） */
  published: boolean
  /** 實際使用的封面照片 id（檔名去掉副檔名） */
  coverPhotoId: string
  /** info.txt「封面」寫的值（檢查用；找不到時退回第一張） */
  requestedCover: string
  /** 個別照片的描述與說明 */
  photoNotes: Record<string, PhotoNote>
  /** 照片清單：依檔名排序；照片總數會自動計算 */
  photos: Photo[]
}

/** 作品分類 */
export interface Category {
  id: CategoryId
  /** 分類名稱（顯示用） */
  name: string
  /** 分類分頁標題下方的一句介紹 */
  intro: string
  /** Works 總覽頁的短介紹 */
  summary: string
  /** 排序：數字小的在前 */
  order: number
  /**
   * 選填：Works 總覽代表圖。指定某組作品的某張照片（photoId＝檔名去掉副檔名，例如 '01'；留空＝該作品封面）。
   * 未填時自動使用此分類第一組作品的封面。
   */
  cover?: PhotoRef
  /** 分類 info.txt 的「作品順序」：依序列出的作品資料夾名稱（或標題）；沒列到的排在後面 */
  seriesOrder: string[]
}

/** 指向某組作品中的某張照片 */
export interface PhotoRef {
  projectId: string
  photoId: string
}

/**
 * 首頁精選的版面位置代號。
 * 首頁精選每 5 個為一組，左右不對稱、上下交錯排列：
 *  - 'wide-left'     ：左側大圖，文字在圖片右側（01 / Emotional）
 *  - 'offset-right'  ：右側較低的圖，文字在圖片上方（02 / Ordinary）
 *  - 'inset-left'    ：文字在左、內縮的直式圖片（03 / Monochrome）
 *  - 'tall-right'    ：右側直式高圖，文字在圖片左下方（04 / Shore）
 *  - 'low-left'      ：下方偏左的圖，文字在右側靠下（05 / Style）
 * 同一組 5 個各用一次；第 6 個起會自動開始新的一組。
 */
export type FeaturedLayout = 'wide-left' | 'offset-right' | 'inset-left' | 'tall-right' | 'low-left'

/** 首頁精選作品（與一般作品分開設定，新增作品不會打亂首頁） */
export interface FeaturedWork {
  /** 精選項目識別碼（自訂、唯一即可） */
  id: string
  /** info.txt 的區段名稱，例如「精選 1」（檢查訊息用） */
  label?: string
  /** 連結到哪個分類 */
  categoryId: CategoryId
  /** 選填：連結到該分類中的哪組作品（會跳到該章節）；未填則只到分類頁頂端 */
  projectId?: string
  /**
   * 首頁顯示用的照片（會依版面裁切）。
   * 可以是專門為首頁準備的橫式檔案，也可以直接填某組作品中的照片路徑與尺寸。
   */
  image: Photo
  /** 顯示的編號，例如 '01'；不想顯示可留空字串 */
  number: string
  /** 顯示的標題，例如 'Emotional' */
  heading: string
  /** 短介紹；可用 \n 指定換行 */
  text: string
  /** 版面位置代號（見 FeaturedLayout 說明） */
  layout: FeaturedLayout
  /** 排序：數字小的在前 */
  order: number
  /** 是否顯示 */
  published: boolean
}

/** 首頁首屏 */
export interface HomeHero {
  /** 主照片（桌面版約 4:3 橫式裁切；裁切位置用 image.objectPosition 調整，例如 'center 35%'） */
  image: Photo
  /** 品牌標語；用 \n 控制桌面版換行位置 */
  tagline: string
  /** 「EXPLORE WORKS」連結文字與目的地 */
  ctaLabel: string
  ctaTo: string
  /** 疊在主照片左下的毛玻璃資訊卡 */
  card: {
    /** 小字，例如 '01 / EMOTIONAL' */
    label: string
    /** 大字，例如 'Ordinary moments.' */
    title: string
    /** 點擊資訊卡前往的網址 */
    to: string
  }
}

/** 導覽項目 */
export interface NavItem {
  label: string
  to: string
}

/** 聯絡方式（留空字串＝不顯示，不會產生假的連結） */
export interface ContactLinks {
  /** Instagram 個人頁完整網址，例如 https://www.instagram.com/your_account/ */
  instagramUrl: string
  /** Instagram 顯示文字，例如 @your_account */
  instagramLabel: string
  /** Email 地址 */
  email: string
}

/** About 頁內容 */
export interface AboutContent {
  /** 攝影師照片 */
  image: Photo
  /** 大標題 */
  heading: string
  /** 品牌與攝影理念（每個字串一段） */
  philosophy: string[]
  /** 簡短自我介紹（每個字串一段） */
  bio: string[]
}
