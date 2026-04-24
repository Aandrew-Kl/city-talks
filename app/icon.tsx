import { ImageResponse } from "next/og";

export const dynamic = "force-static";

/**
 * 32×32 browser-tab icon.
 *
 * Produced as a PNG by Next.js at build time. Purple brand square with a
 * rounded corner and a white "CT" monogram. No custom font is loaded to
 * keep the bundle small — "CT" is plain Latin and renders fine with
 * Satori's built-in Noto fallback.
 */
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

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
          fontSize: 18,
          fontWeight: 900,
          color: "#FFFFFF",
          background: "#6D0F78",
          borderRadius: 6,
          letterSpacing: -0.5,
        }}
      >
        CT
      </div>
    ),
    {
      ...size,
    },
  );
}
