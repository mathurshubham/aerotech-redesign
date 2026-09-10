import { ImageResponse } from "next/og";

import { site } from "@/content/site";

export const alt = `${site.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const NAVY = "#16203A";
const ORANGE = "#FB722E";
const DASH_COUNT = 14;

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
          <div
            style={{
              display: "flex",
              fontSize: 108,
              fontWeight: 700,
              letterSpacing: -2,
              color: "#FFFFFF",
            }}
          >
            AEROTECH
          </div>
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
