import { nearestImageWidth } from "./images";

type ImageLoaderProps = {
  src: string;
  width: number;
  quality?: number;
};

/**
 * Custom `next/image` loader.
 *
 * MVP pipeline: `scripts/optimize-images.ts` pre-generates
 * `<name>-<width>.{avif,webp,jpg}` variants under `public/images` for every
 * width in `IMAGE_WIDTHS`. There is no runtime resizer (no sharp on Workers,
 * and Cloudflare Images transformations are metered), so the loader simply
 * rewrites the requested source to the nearest pre-generated variant.
 *
 * `/images/hero-runway.jpg` + width 900 -> `/images/hero-runway-1080.webp`
 *
 * WebP is emitted because it is the format every target browser supports;
 * AVIF variants exist on disk and can be picked up later by an explicit
 * `<picture>`/`<source>` wrapper. External (http/https/protocol-relative)
 * and data URLs are returned untouched.
 */
export default function imageLoader({ src, width }: ImageLoaderProps): string {
  if (/^(https?:)?\/\//i.test(src) || src.startsWith("data:")) return src;

  const path = src.startsWith("/") ? src : `/${src}`;

  // Strip any query string, then split off the extension.
  const [pathname, query = ""] = path.split("?", 2);
  const lastDot = pathname.lastIndexOf(".");
  const lastSlash = pathname.lastIndexOf("/");
  const base = lastDot > lastSlash ? pathname.slice(0, lastDot) : pathname;

  // Already a generated variant? Don't append a second width suffix.
  const stem = base.replace(/-(?:480|768|1080|1440|1920)$/, "");

  const suffix = query ? `?${query}` : "";
  return `${stem}-${nearestImageWidth(width)}.webp${suffix}`;
}
