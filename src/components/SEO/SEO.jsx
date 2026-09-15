import { Head } from "vite-react-ssg";
import { useLocation } from "react-router-dom";
import { useLanguage } from "../../i18n/LanguageContext";
import { localize, stripLangPrefix } from "../../i18n/langPath";

const SITE_URL = "https://tyne.rs";

// Rendered during the SSG build (not a useEffect) so the title/description/canonical/
// html-lang land in the actual prerendered HTML per route, not just after client hydration.
export function SEO({ title, description }) {
  const { pathname } = useLocation();
  const { lang } = useLanguage();
  const srPath = stripLangPrefix(pathname);
  const enPath = localize("en", srPath);

  return (
    <Head>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={`${SITE_URL}${pathname}`} />
      <link rel="alternate" hrefLang="sr" href={`${SITE_URL}${srPath}`} />
      <link rel="alternate" hrefLang="en" href={`${SITE_URL}${enPath}`} />
      <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}${srPath}`} />
    </Head>
  );
}
