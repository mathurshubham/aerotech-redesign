# scripts/

## Adding a photo

1. Drop the original into `scripts/source-images/` (any reasonable size —
   the script never upscales, and downsizes to at most 1920px wide).
2. Run `pnpm images` (wraps `tsx scripts/optimize-images.ts`).
3. Reference it in components as `/images/<name>.jpg` — `next/image` (via
   the custom loader) rewrites requested widths to the nearest pre-generated
   `<name>-<W>.webp`/`.avif` variant automatically.

## Naming rule

Use a descriptive, kebab-case `<name>` with no width suffix — the script
derives `<name>` from the filename (extension stripped). PNGs named
`logo-*.png` are treated as logos (optimised PNG + webp only, no forced
1920 downscale, no avif). Everything else is treated as a photo.

## What the loader expects

`src/lib/image-loader.ts` maps `/images/<name>.<ext>` + a requested width to
`/images/<name>-<W>.webp`, where `W` is the smallest value in
`IMAGE_WIDTHS` (`src/lib/images.ts`) that is `>= width`, capped at 1920.
That means every `<name>` must have at least one generated `-<W>.webp`
variant, and the canonical `<name>.jpg`/`.png` must exist for direct/`src`
use and as the largest fallback.

Rerunning `pnpm images` is a no-op for anything already up to date (mtime
check); pass `--force` to rebuild everything.
