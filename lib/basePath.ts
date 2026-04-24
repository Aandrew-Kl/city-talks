/**
 * Prefix the Next.js `basePath` (e.g. `/city-talks` when deployed to GitHub
 * Pages) onto an absolute-root path. Assets inside `/public` are served at
 * `<basePath>/<path>`, but Next doesn't auto-prefix them for us; we have
 * to be explicit when passing the URL as an `src`.
 *
 * Locally and on Vercel `NEXT_PUBLIC_BASE_PATH` is empty, so this is a
 * no-op. On GitHub Pages the workflow sets it to `/city-talks`.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(path: string): string {
  if (!path.startsWith("/")) return path; // already absolute or external
  if (!BASE_PATH) return path;
  // Avoid double-prefix if the caller already did it.
  if (path.startsWith(`${BASE_PATH}/`)) return path;
  return `${BASE_PATH}${path}`;
}
