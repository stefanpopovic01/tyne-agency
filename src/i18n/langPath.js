// Serbian is unprefixed ("/", "/kontakt", ...); English lives under "/en" ("/en", "/en/kontakt", ...).

export function localize(lang, path) {
  if (lang !== "en") return path;
  return path === "/" ? "/en" : `/en${path}`;
}

export function stripLangPrefix(pathname) {
  if (pathname === "/en") return "/";
  if (pathname.startsWith("/en/")) return pathname.slice(3);
  return pathname;
}
