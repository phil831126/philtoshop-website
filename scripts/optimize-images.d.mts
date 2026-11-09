// 型別宣告：讓 vite.config.ts 可以使用 optimize-images.mjs（不需要修改）
export interface OptimizedImage {
  from: string
  to: string
  before: number
  after: number
  reason: string
}

export const MAX_EDGE: number
export const MAX_BYTES: number
export const QUALITY: number
export function optimizeImages(root: string): Promise<{ changed: OptimizedImage[]; failed: { file: string; message: string }[] }>
export function kb(bytes: number): string
export function describe(c: OptimizedImage): string
