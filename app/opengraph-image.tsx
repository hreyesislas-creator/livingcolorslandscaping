import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Living Colors Landscape — Premium Los Angeles Landscaping";

export default function OpengraphImage() {
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
            "radial-gradient(circle at 78% 18%, #195f36 0%, #0b1610 42%, #07100b 100%)",
          color: "#f7f4ec",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 66,
              height: 66,
              borderRadius: 18,
              background: "linear-gradient(135deg, #2c9655 0%, #195f36 100%)",
              fontSize: 34,
              fontWeight: 700,
              letterSpacing: -2,
            }}
          >
            LC
          </div>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#7ecf97",
            }}
          >
            Living Colors Landscape
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 48,
            fontSize: 78,
            fontWeight: 300,
            lineHeight: 1.05,
            letterSpacing: -2,
            maxWidth: 900,
          }}
        >
          <span>Premium landscaping for</span>
          <span>Greater Los Angeles.</span>
        </div>

        <div
          style={{
            marginTop: 40,
            fontSize: 27,
            color: "rgba(247,244,236,0.72)",
          }}
        >
          Design · Build · Outdoor Living · Licensed &amp; Insured
        </div>
      </div>
    ),
    { ...size },
  );
}
