import { Head } from "vite-react-ssg";
import { useLocation } from "react-router-dom";
import { useLanguage } from "../../i18n/LanguageContext";
import { localize, stripLangPrefix } from "../../i18n/langPath";

const SITE_URL = "https://tyne.rs";

// Rendered during the SSG build (not a useEffect) so the title/description/canonical/
// html-lang land in the actual prerendered HTML per route, not just after client hydration.
// `jsonLd` (optional): one extra schema.org object for this page (e.g. FAQPage), rendered
// in this same Head instance. Keep it a single object, not an array — a second, separately
// mounted <Head> elsewhere in the tree gets silently dropped by the SSG pass, and an array
// value here (even inside this same Head) was observed to do the same.
export function SEO({ title, description, jsonLd }) {
  const { pathname } = useLocation();
  const { lang } = useLanguage();
  const srPath = stripLangPrefix(pathname);
  const enPath = localize("en", srPath);

  return (
    <Head>
      <html lang={lang} />
      {/* react-helmet-async treats charSet as a priority tag and hoists it to the very
          front of <head>, ahead of title/description — keeps it inside the HTML5 spec's
          first-1024-byte requirement regardless of how much else Head renders. */}
      <meta charSet="UTF-8" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={`${SITE_URL}${pathname}`} />
      <link rel="alternate" hrefLang="sr" href={`${SITE_URL}${srPath}`} />
      <link rel="alternate" hrefLang="en" href={`${SITE_URL}${enPath}`} />
      <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}${srPath}`} />
      <link
        rel="alternate"
        type="application/rss+xml"
        title="Tyne Agency Blog"
        href={`${SITE_URL}${lang === "en" ? "/en/rss.xml" : "/rss.xml"}`}
      />
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Head>
  );
}
