/**
 * Palette literals for the generated images (`app/icon.tsx`,
 * `app/opengraph-image.tsx`).
 *
 * These have to be literals: `ImageResponse`/satori renders on the Edge with
 * no CSSOM, so it cannot resolve the `--ink`/`--aqua-400` custom properties
 * these duplicate. Keeping the duplication in one file — checked against
 * `globals.css` by `og-colors.test.ts` — means a palette change fails a test
 * instead of silently leaving the favicon and the social card on the old
 * colours.
 */

/** `--ink` (= `--mist-900`). The dark ground both generated images sit on. */
export const OG_INK = "#232E49";

/** `--aqua-400`. The one accent stop with enough lift to clear 3:1 on `OG_INK`. */
export const OG_AQUA = "#17A79B";
