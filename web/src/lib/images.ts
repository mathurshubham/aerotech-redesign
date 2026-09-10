/**
 * The only widths we pre-generate. Shared by `src/lib/image-loader.ts`
 * (the custom next/image loader) and `scripts/optimize-images.ts`
 * (which writes `<name>-<width>.{avif,webp,jpg}` into `public/images`).
 *
 * Keep sorted ascending — the loader relies on it.
 */
export const IMAGE_WIDTHS = [480, 768, 1080, 1440, 1920] as const;

export type ImageWidth = (typeof IMAGE_WIDTHS)[number];

/** Pre-generated output formats, in preference order. */
export const IMAGE_FORMATS = ["avif", "webp", "jpg"] as const;

export type ImageFormat = (typeof IMAGE_FORMATS)[number];

/** Smallest pre-generated width at or above `width`, capped at the largest. */
export function nearestImageWidth(width: number): ImageWidth {
  const widths = IMAGE_WIDTHS;
  for (const candidate of widths) {
    if (candidate >= width) return candidate;
  }
  return widths[widths.length - 1];
}
