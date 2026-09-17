import { ImageResponse } from "next/og";

import { site } from "@/content/site";

import { LOGO_MARK_LIGHT_DATA_URI } from "@/lib/logo-data";

export const alt = `${site.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The social card stays a dark ground even though the site went pastel: it is
// composited against whatever chrome Slack/WhatsApp/X puts around it, and the
// only logo raster that reads at card size is `logo-mark-light`, which was
// recoloured for a dark ground. `INK` is the palette's dark end (`--ink`);
// `AQUA` is `--aqua-400`, the one accent stop with enough lift to clear 3:1
// against it (4.5:1) — the darker -600/-700 button stops would sink into it.
const INK = "#232E49";
const AQUA = "#17A79B";
const DASH_COUNT = 14;

// `logo-mark-light.png` (swoosh + "Aerotech", recoloured for a dark ground —
// see `public/images/manifest.json`) replaces the old drawn "AEROTECH" text.
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
          background: INK,
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
              color: AQUA,
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
                background: AQUA,
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
