import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://tyne.rs";

function upsertMeta(name, content) {
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonical(href) {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

// Sets per-route title/description/canonical for real browsers and JS-rendering
// crawlers (Googlebot). Raw HTML fetched without JS execution always gets the
// static defaults from index.html, since this app has no SSR/prerendering.
export function useSEO({ title, description }) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (title) document.title = title;
    if (description) upsertMeta("description", description);
    upsertCanonical(`${SITE_URL}${pathname}`);
  }, [title, description, pathname]);
}
