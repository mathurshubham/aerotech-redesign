import manifest from "../../../public/images/manifest.json";

type ManifestEntry = {
  width: number;
  height: number;
  formats?: string[];
  widths?: number[];
};

const entries = manifest as Record<string, ManifestEntry>;

/** `/images/hero-runway.jpg` -> `hero-runway` */
function stemOf(src: string): string {
  const file = src.split("/").pop() ?? src;
  return file
    .replace(/\.[a-z0-9]+$/i, "")
    .replace(/-(?:480|768|1080|1440|1920)$/, "");
}

/**
 * Intrinsic dimensions for a `/images/...` source, read from
 * `public/images/manifest.json` so every `next/image` gets a real aspect
 * ratio and never shifts layout. Falls back to the supplied hint.
 */
export function imageSize(
  src: string,
  fallback?: { width: number; height: number },
): { width: number; height: number } {
  const entry = entries[stemOf(src)];
  if (entry) return { width: entry.width, height: entry.height };
  return fallback ?? { width: 1600, height: 1000 };
}

/**
 * Everything `next/image` needs for one manifest-backed asset.
 *
 * Some sources (most client logos) have no pre-generated width variants on
 * disk, and the custom loader would rewrite them to a 404. Those are served
 * `unoptimized` from the original file, with the extension the manifest
 * actually recorded — so a `.png` referenced as `.jpg` (or the reverse)
 * still resolves.
 */
export function resolveImage(
  src: string,
  fallback?: { width: number; height: number },
): { src: string; width: number; height: number; unoptimized: boolean } {
  const stem = stemOf(src);
  const entry = entries[stem];
  const size = imageSize(src, fallback);

  if (!entry) return { src, ...size, unoptimized: false };

  const hasVariants = (entry.widths?.length ?? 0) > 0;
  const dir = src.slice(0, src.lastIndexOf("/") + 1) || "/images/";
  const ext = entry.formats?.includes("jpg")
    ? "jpg"
    : (entry.formats?.[0] ?? "jpg");

  return {
    src: `${dir}${stem}.${ext}`,
    ...size,
    unoptimized: !hasVariants,
  };
}
