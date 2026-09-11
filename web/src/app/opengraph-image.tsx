import { ImageResponse } from "next/og";

import { site } from "@/content/site";

import { LOGO_MARK_LIGHT_DATA_URI } from "@/lib/logo-data";

export const alt = `${site.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const NAVY = "#16203A";
const ORANGE = "#FB722E";
const DASH_COUNT = 14;

// `logo-mark-light.png` (swoosh + "Aerotech", recoloured for navy — see
// `public/images/manifest.json`) replaces the old drawn "AEROTECH" text.
// Read + inlined as a data URI at build time; satori renders plain <img>.
const LOGO_WIDTH = 697;
const LOGO_HEIGHT = 570;
const LOGO_RENDER_HEIGHT = 200;


/**
 * Static — no request-time data — so this prerenders once at build time and is
 * reused for every route that doesn't set its own `ogImage`.
 */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: NAVY,
          fontFamily: "system-ui, -apple-system, Helvetica, Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
            padding: "0 96px",
          }}
        >
          {/* satori/ImageResponse requires <img>, not next/image */}
          <img
            src={LOGO_MARK_LIGHT_DATA_URI}
            width={Math.round((LOGO_RENDER_HEIGHT * LOGO_WIDTH) / LOGO_HEIGHT)}
            height={LOGO_RENDER_HEIGHT}
            alt=""
            style={{ objectFit: "contain" }}
          />
          <div
            style={{
              display: "flex",
              marginTop: 20,
              fontSize: 34,
              fontWeight: 500,
              color: ORANGE,
            }}
          >
            {site.tagline}
          </div>
        </div>
        <div style={{ display: "flex", width: "100%", height: 6 }}>
          {Array.from({ length: DASH_COUNT }).map((_, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flex: 1,
                marginRight: i === DASH_COUNT - 1 ? 0 : 24,
                background: ORANGE,
                height: "100%",
              }}
            />
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
