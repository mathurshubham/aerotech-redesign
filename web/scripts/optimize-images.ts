/**
 * Pre-generates responsive image variants for everything in
 * `scripts/source-images/` into `public/images/`.
 *
 * Run with: `pnpm tsx scripts/optimize-images.ts` (or `pnpm images`).
 * Add `--force` to ignore mtimes and rebuild everything.
 *
 * Output per raster photo `<name>.<ext>`:
 *   - `<name>.jpg`        canonical `src` — max 1920w, q78, mozjpeg, progressive
 *   - `<name>-<W>.webp`   for every W in IMAGE_WIDTHS <= source width (q78)
 *   - `<name>-<W>.avif`   for every W in IMAGE_WIDTHS <= source width (q55)
 *
 * Output per PNG logo:
 *   - `<name>.png`        optimised (palette quantised where lossless-safe)
 *   - `<name>-<W>.webp`   only for W <= source width (may be none)
 *
 * Also writes `public/images/manifest.json`:
 *   { "<name>": { width, height, formats: [...], widths: [...] } }
 */

import { existsSync, readdirSync, statSync, mkdirSync, writeFileSync } from "node:fs";
import { join, extname, basename } from "node:path";
import sharp from "sharp";

// TODO: import from @/lib/images
const IMAGE_WIDTHS = [480, 768, 1080, 1440, 1920] as const;

const ROOT = join(__dirname, "..");
const SRC_DIR = join(ROOT, "scripts", "source-images");
const OUT_DIR = join(ROOT, "public", "images");

const JPG_MAX_WIDTH = 1920;
const JPG_QUALITY = 78;
const WEBP_QUALITY = 78;
const AVIF_QUALITY = 55;

const FORCE = process.argv.includes("--force");

type ManifestEntry = {
  width: number;
  height: number;
  formats: string[];
  widths: number[];
};

type Manifest = Record<string, ManifestEntry>;

type SummaryRow = {
  name: string;
  sourceKB: number;
  largestOutputKB: number;
  variants: number;
};

function kb(bytes: number): number {
  return Math.round((bytes / 1024) * 10) / 10;
}

/** Skip work if `out` exists, is newer than `src`, and we're not forcing. */
function isUpToDate(out: string, srcMtimeMs: number): boolean {
  if (FORCE) return false;
  if (!existsSync(out)) return false;
  return statSync(out).mtimeMs >= srcMtimeMs;
}

async function processPhoto(
  file: string,
  name: string,
  srcPath: string,
  srcMtimeMs: number,
): Promise<{ formats: string[]; widths: number[]; largestOutputBytes: number; width: number; height: number }> {
  const image = sharp(srcPath);
  const meta = await image.metadata();
  const srcWidth = meta.width ?? 0;
  const srcHeight = meta.height ?? 0;

  const eligibleWidths = IMAGE_WIDTHS.filter((w) => w <= srcWidth);
  // Always include the smallest width, even if the source is narrower than
  // it (never upscale — we just cap the resize at the source width).
  if (eligibleWidths.length === 0) eligibleWidths.push(IMAGE_WIDTHS[0]);

  let largestOutputBytes = 0;

  // Canonical <name>.jpg — capped at JPG_MAX_WIDTH, never upscaled.
  const jpgOut = join(OUT_DIR, `${name}.jpg`);
  const targetJpgWidth = Math.min(srcWidth, JPG_MAX_WIDTH) || srcWidth;
  if (!isUpToDate(jpgOut, srcMtimeMs)) {
    // `.rotate()` bakes in EXIF orientation; not calling `withMetadata()`
    // means sharp strips EXIF/ICC/XMP from the output by default.
    await sharp(srcPath)
      .rotate()
      .resize({ width: targetJpgWidth, withoutEnlargement: true })
      .jpeg({ quality: JPG_QUALITY, mozjpeg: true, progressive: true })
      .toFile(jpgOut);
  }
  if (existsSync(jpgOut)) largestOutputBytes = Math.max(largestOutputBytes, statSync(jpgOut).size);

  const formats = ["jpg", "webp", "avif"];

  for (const w of eligibleWidths) {
    const width = Math.min(w, srcWidth);

    const webpOut = join(OUT_DIR, `${name}-${w}.webp`);
    if (!isUpToDate(webpOut, srcMtimeMs)) {
      await sharp(srcPath)
        .rotate()
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: WEBP_QUALITY })
        .toFile(webpOut);
    }
    if (existsSync(webpOut)) largestOutputBytes = Math.max(largestOutputBytes, statSync(webpOut).size);

    const avifOut = join(OUT_DIR, `${name}-${w}.avif`);
    if (!isUpToDate(avifOut, srcMtimeMs)) {
      await sharp(srcPath)
        .rotate()
        .resize({ width, withoutEnlargement: true })
        .avif({ quality: AVIF_QUALITY })
        .toFile(avifOut);
    }
    if (existsSync(avifOut)) largestOutputBytes = Math.max(largestOutputBytes, statSync(avifOut).size);
  }

  return {
    formats,
    widths: eligibleWidths.map((w) => Math.min(w, srcWidth)),
    largestOutputBytes,
    width: srcWidth,
    height: srcHeight,
  };
}

async function processLogo(
  name: string,
  srcPath: string,
  srcMtimeMs: number,
): Promise<{ formats: string[]; widths: number[]; largestOutputBytes: number; width: number; height: number }> {
  const image = sharp(srcPath);
  const meta = await image.metadata();
  const srcWidth = meta.width ?? 0;
  const srcHeight = meta.height ?? 0;

  let largestOutputBytes = 0;

  const pngOut = join(OUT_DIR, `${name}.png`);
  if (!isUpToDate(pngOut, srcMtimeMs)) {
    await sharp(srcPath)
      .png({ palette: true, quality: 100, compressionLevel: 9 })
      .toFile(pngOut);
  }
  if (existsSync(pngOut)) largestOutputBytes = Math.max(largestOutputBytes, statSync(pngOut).size);

  const eligibleWidths = IMAGE_WIDTHS.filter((w) => w <= srcWidth);
  const formats = ["png"];
  if (eligibleWidths.length > 0) formats.push("webp");

  for (const w of eligibleWidths) {
    const webpOut = join(OUT_DIR, `${name}-${w}.webp`);
    if (!isUpToDate(webpOut, srcMtimeMs)) {
      await sharp(srcPath)
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality: WEBP_QUALITY })
        .toFile(webpOut);
    }
    if (existsSync(webpOut)) largestOutputBytes = Math.max(largestOutputBytes, statSync(webpOut).size);
  }

  return {
    formats,
    widths: eligibleWidths,
    largestOutputBytes,
    width: srcWidth,
    height: srcHeight,
  };
}

async function main() {
  if (!existsSync(SRC_DIR)) {
    console.error(`Source directory not found: ${SRC_DIR}`);
    process.exit(1);
  }
  mkdirSync(OUT_DIR, { recursive: true });

  const files = readdirSync(SRC_DIR).filter((f) => !f.startsWith("."));
  const manifest: Manifest = {};
  const summary: SummaryRow[] = [];

  for (const file of files) {
    const srcPath = join(SRC_DIR, file);
    const stat = statSync(srcPath);
    if (!stat.isFile()) continue;

    const ext = extname(file).toLowerCase();
    const name = basename(file, extname(file));

    if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) {
      console.warn(`Skipping unsupported file: ${file}`);
      continue;
    }

    const isLogo = file.startsWith("logo-") && ext === ".png";

    try {
      const result = isLogo
        ? await processLogo(name, srcPath, stat.mtimeMs)
        : await processPhoto(file, name, srcPath, stat.mtimeMs);

      manifest[name] = {
        width: result.width,
        height: result.height,
        formats: result.formats,
        widths: result.widths,
      };

      summary.push({
        name,
        sourceKB: kb(stat.size),
        largestOutputKB: kb(result.largestOutputBytes),
        variants: result.formats.length * result.widths.length,
      });
    } catch (err) {
      console.error(`Failed to process ${file}:`, err);
    }
  }

  // Sort manifest keys for stable diffs.
  const sortedManifest: Manifest = {};
  for (const key of Object.keys(manifest).sort()) sortedManifest[key] = manifest[key];

  writeFileSync(join(OUT_DIR, "manifest.json"), JSON.stringify(sortedManifest, null, 2) + "\n");

  // Print summary table.
  summary.sort((a, b) => a.name.localeCompare(b.name));
  const nameW = Math.max(4, ...summary.map((r) => r.name.length));
  console.log(
    `${"name".padEnd(nameW)}  ${"src KB".padStart(8)}  ${"max out KB".padStart(10)}  variants`,
  );
  for (const row of summary) {
    console.log(
      `${row.name.padEnd(nameW)}  ${String(row.sourceKB).padStart(8)}  ${String(row.largestOutputKB).padStart(10)}  ${row.variants}`,
    );
  }

  let totalBytes = 0;
  for (const f of readdirSync(OUT_DIR)) {
    const p = join(OUT_DIR, f);
    if (statSync(p).isFile()) totalBytes += statSync(p).size;
  }
  console.log(`\nTotal public/images size: ${(totalBytes / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Processed ${summary.length} source images.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
