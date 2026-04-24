import Image from "next/image";

import { withBasePath } from "@/lib/basePath";

/**
 * Pre-footer brick banner — repeats the hero mic-logo on the brick wall
 * as a visual bookend before the purple footer. A lighter dusting of
 * accent blobs keeps it visually linked to the hero cluster without
 * repeating the full speech-bubble swarm.
 */
export default function BrickLogoBanner() {
  return (
    <section aria-hidden="true" className="relative w-full">
      <div
        className="ct-brick-bg relative flex items-center justify-center overflow-hidden"
        style={{ minHeight: "clamp(360px, 54vh, 560px)" }}
      >
        {/* Soft accent blobs — echo of the hero cluster */}
        <span
          aria-hidden="true"
          className="ct-bubble"
          style={{
            top: "18%",
            left: "8%",
            width: "clamp(140px, 18vw, 240px)",
            height: "clamp(130px, 16vw, 220px)",
            background: "#FDC14C",
            ["--ct-bubble-dur" as string]: "16s",
            ["--ct-bubble-delay" as string]: "0s",
            ["--ct-bubble-tail" as string]: "-28deg",
          }}
        />
        <span
          aria-hidden="true"
          className="ct-bubble"
          style={{
            top: "42%",
            right: "10%",
            width: "clamp(160px, 20vw, 280px)",
            height: "clamp(140px, 17vw, 240px)",
            background: "#0F786D",
            ["--ct-bubble-dur" as string]: "18s",
            ["--ct-bubble-delay" as string]: "2s",
            ["--ct-bubble-tail" as string]: "-18deg",
          }}
        />

        {/* Soft vignette — sends the texture to the background */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              "radial-gradient(ellipse at 50% 55%, transparent 35%, rgba(246,241,233,0.6) 85%)",
          }}
        />

        <div className="relative z-10 flex items-center justify-center">
          <Image
            src={withBasePath("/logo/city-talks-mark.png")}
            alt="City Talks"
            width={300}
            height={281}
            priority
            className="w-auto"
            style={{ height: "clamp(220px, 30vw, 340px)" }}
          />
        </div>
      </div>
    </section>
  );
}
