/**
 * Used to be the basePath prefixer when the site was served from
 * `aandrew-kl.github.io/city-talks/`. Now that we're on the apex
 * `city-talks.gr`, all `/public` assets are served at `/`, so this is a
 * pass-through. The function is kept (and exported) so existing call
 * sites (`<Image src={withBasePath("/foo.jpg")} />`) keep compiling
 * without a sweep across the codebase.
 */
export const BASE_PATH = "";

export function withBasePath(path: string): string {
  return path;
}
