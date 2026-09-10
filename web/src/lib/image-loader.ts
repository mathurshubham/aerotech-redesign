import manifest from "../../public/images/manifest.json";

type ManifestEntry = {
  width: number;
  height: number;
  formats?: string[];
  widths?: number[];
};

const entries = manifest as Record<string, ManifestEntry>;

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
 * width in `IMAGE_WIDTHS` that is smaller than the source image, and records
 * exactly what it wrote in `public/images/manifest.json`.
 *
 * `/images/hero-runway.jpg` + width 900 -> `/images/hero-runway-1080.webp`
 *
 * The loader only ever points at a variant the manifest says exists: it picks
 * the smallest generated width at or above the requested one, and falls back
 * to the largest generated width. An image with no generated variants (small
 * logos, for instance) is served from its original file, using the extension
 * the manifest recorded — so a `.png` referenced as `.jpg` still resolves.
 * Without that clamp the loader emits 404s for every source narrower than the
 * largest configured width.
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

  const entry = entries[stem.slice(stem.lastIndexOf("/") + 1)];
  const widths = entry?.widths ?? [];

  if (widths.length === 0) {
    // No variants on disk — serve the original file.
    const ext = entry?.formats?.[0] ?? (lastDot > lastSlash ? pathname.slice(lastDot + 1) : "jpg");
    return `${stem}.${ext}${suffix}`;
  }

  const target =
    widths.find((candidate) => candidate >= width) ?? widths[widths.length - 1];

  return `${stem}-${target}.webp${suffix}`;
}
