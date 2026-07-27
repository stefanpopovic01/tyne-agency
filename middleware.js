import { geolocation, next } from "@vercel/functions";

const COOKIE_NAME = "tyne-lang";
const SR_COUNTRIES = new Set(["RS", "BA", "ME", "HR", "MK", "SI"]);

export const config = {
  // Skip built assets and any path with a file extension (favicon, robots.txt, etc.)
  matcher: ["/((?!assets/|.*\\..*).*)"],
};

function getCookie(request, name) {
  const header = request.headers.get("cookie");
  if (!header) return null;
  const match = header.match(new RegExp(`(?:^|;\\s*)${name}=(sr|en)`));
  return match ? match[1] : null;
}

export default function middleware(request) {
  // Respect a language already chosen (by this middleware before, or by the user's toggle)
  if (getCookie(request, COOKIE_NAME)) {
    return next();
  }

  const { country } = geolocation(request);
  // Unknown country (e.g. local/preview requests without geo data) keeps the Serbian default
  const lang = country && !SR_COUNTRIES.has(country) ? "en" : "sr";

  return next({
    headers: {
      "Set-Cookie": `${COOKIE_NAME}=${lang}; Path=/; Max-Age=31536000; SameSite=Lax`,
    },
  });
}
