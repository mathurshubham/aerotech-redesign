import { ImageResponse } from "next/og";

import { LOGO_GLYPH_DATA_URI } from "@/lib/logo-data";
import { OG_INK } from "@/lib/og-colors";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// `--ink`. The page chrome is pastel now, but a favicon has to hold its own
// against an arbitrary browser-tab background at 32px, and the source glyph
// is a mid-blue swoosh — on a pastel ground it disappears. So the icon keeps
// a deep ground, taken from the palette's dark end rather than the retired
// navy. Satori runs on the Edge with no CSSOM, so the value has to be a
// literal; `og-colors.ts` holds it and a test keeps it equal to the token.
const INK = OG_INK;

// `logo-glyph.png` is the swoosh arrowhead only (no wordmark) — the only
// crop of the real logo that still reads at 32px. Read + inlined as a data
// URI at build time; `ImageResponse`/satori renders plain <img> fine.


/** Static — prerenders once at build time. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: INK,
        }}
      >
        {/* satori/ImageResponse requires <img>, not next/image */}
        <img
          src={LOGO_GLYPH_DATA_URI}
          width={22}
          height={30}
          alt=""
          style={{ objectFit: "contain" }}
        />
      </div>
    ),
    { ...size },
  );
}
