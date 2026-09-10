import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

const NAVY = "#16203A";
const ORANGE = "#FB722E";

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
          fontFamily: "system-ui, -apple-system, Helvetica, Arial, sans-serif",
          fontSize: 22,
          fontWeight: 700,
          color: ORANGE,
        }}
      >
        A
      </div>
    ),
    { ...size },
  );
}
