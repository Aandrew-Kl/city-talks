import { ImageResponse } from "next/og";

export const dynamic = "force-static";

/**
 * 180×180 Apple touch icon — the image iOS uses when the site is added to
 * the home screen. Same mark as `icon.tsx` but scaled up with more
 * breathing room and a proportionally larger corner radius so it reads
 * cleanly at iOS's default masking size.
 */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#FFFFFF",
          background:
            "linear-gradient(135deg, #6D0F78 0%, #8A3E93 60%, #6D0F78 100%)",
          borderRadius: 34,
          letterSpacing: -2,
        }}
      >
        <div
          style={{
            fontSize: 90,
            fontWeight: 900,
            lineHeight: 1,
          }}
        >
          CT
        </div>
        <div
          style={{
            marginTop: 10,
            width: 12,
            height: 12,
            borderRadius: 9999,
            background: "#0FBBB4",
          }}
        />
      </div>
    ),
    {
      ...size,
    },
  );
}
