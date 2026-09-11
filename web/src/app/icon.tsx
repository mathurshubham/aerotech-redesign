import { ImageResponse } from "next/og";

import { LOGO_GLYPH_DATA_URI } from "@/lib/logo-data";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

const NAVY = "#16203A";

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
          background: NAVY,
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
