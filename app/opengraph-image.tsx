import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "City Talks — Ας μιλήσουμε για τους Δήμους";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "linear-gradient(135deg, #6a1b9a 0%, #e91e63 50%, #ff9800 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: 6,
            textTransform: "uppercase",
            opacity: 0.8,
          }}
        >
          city-talks.gr
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 110,
            fontWeight: 900,
            letterSpacing: -3,
            lineHeight: 1,
          }}
        >
          City Talks.
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 36,
            fontWeight: 500,
            opacity: 0.95,
            maxWidth: 900,
          }}
        >
          Ας μιλήσουμε για τους Δήμους — Your Opinion Matters!
        </div>
        <div
          style={{
            marginTop: 40,
            display: "flex",
            gap: 24,
            fontSize: 22,
            fontWeight: 700,
          }}
        >
          {["Opinions", "Let's Talk", "Podcasts", "Smart Cities"].map((t) => (
            <div
              key={t}
              style={{
                padding: "10px 20px",
                border: "2px solid rgba(255,255,255,0.7)",
                borderRadius: 999,
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
