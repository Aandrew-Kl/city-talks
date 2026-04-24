/**
 * Per-author circular portrait, rendered on-hover in the alternating article
 * block. Files under `/public/guests/` are downloaded verbatim from the live
 * WP site's media library so they're pixel-identical.
 */
export const AUTHOR_PORTRAITS: Record<string, string> = {
  "Πάττη Πασχαλίδου": "/guests/patty-0001.png",
  "Θεοδόσης Χατζηιωαννίδης": "/guests/theodosis-ch-001.png",
  "Ιωάννης Καραγιάννης": "/guests/Ioannis-Karagiannis-0.png",
  "Εύη Λάππα": "/guests/evi-lapa.png",
  "Δημήτρης Πατσιαρίκας": "/guests/DimitrisPiatsarikas-002.png",
  "Μπέττυ Μπουρουτζή": "/guests/Evlampia-Mpouroutzi-00.png",
};

/**
 * Authoritative featured-image path for each article slug, pointing at the
 * original WP upload under `/public/featured/`. Used as the rectangular
 * photo that fades in on hover inside `<ArticleHoverRow>`. If a slug isn't
 * in the map we fall back to the `image` field from the markdown frontmatter.
 */
export const FEATURED_IMAGES: Record<string, string> = {
  "diaxeirisi-nerou": "/featured/DiaxeirisiNerou.jpg",
  "poleodomia-kai-dimoi": "/featured/poleodomia.jpg",
  "eksypnoi-dimoi-psifiaki-dimosia-ygeia": "/featured/HealthData.jpg",
  "to-leksilogio-enos-aftodioikitikoy": "/featured/to-lexilogio.jpg",
  "telos-stin-tafi-aporrimmatwn": "/featured/Sustainable-Waste-Management.jpg",
  "proslipseis-mono-sta-xartia": "/featured/prosleipseis.jpg",
};
