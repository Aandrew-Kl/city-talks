/**
 * `/twitter-image.png` — reuse the default OG image.
 *
 * Twitter's summary_large_image card uses the same 1200×630 aspect as OG,
 * so there's no value in maintaining a second asset pipeline. Re-exporting
 * the default export (plus the metadata config) from `opengraph-image.tsx`
 * keeps the two routes in lockstep.
 */
export {
  alt,
  contentType,
  size,
  default,
} from "./opengraph-image";
