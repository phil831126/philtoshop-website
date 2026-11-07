// 型別宣告：讓 vite.config.ts 可以使用 image-manifest.mjs（不需要修改）
export interface ImageDetail {
  url: string
  name: string
  folder: string
  width: number
  height: number
  rotated: boolean
  hasGps: boolean
  bytes: number
}

export interface ImageScan {
  sizes: Record<string, [number, number]>
  folders: Record<string, string[]>
  details: ImageDetail[]
  unreadable: string[]
}

export function scanImages(root: string): ImageScan
export interface TextScan {
  files: Record<string, { fields: Record<string, string>; sections: { title: string; fields: Record<string, string> }[] }>
  problems: { file: string; line: number; message: string }[]
}

export function writeManifest(root: string): { changed: boolean; scan: ImageScan; text: TextScan }
