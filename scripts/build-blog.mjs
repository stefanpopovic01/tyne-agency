// Build-time only (plain Node + fs, no Vite APIs — runs standalone before the app builds).
// Reads src/content/blog/{sr,en}/*.md and produces:
//   - src/content/blog/generated/{sr,en}.json   (parsed + markdown-rendered posts, imported
//     by src/blog/posts.js as plain static data — keeps gray-matter/markdown-it, and the
//     raw markdown source, out of the browser bundle entirely)
//   - public/sitemap.xml, public/rss.xml, public/en/rss.xml
// Runs before the SSG build (see package.json) so these are the files vite-react-ssg copies
// into dist/ / bundles into the app.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";

const ROOT = process.cwd();
const SITE_URL = "https://tyne.rs";
const md = new MarkdownIt({ html: false, linkify: true });

function readPosts(lang) {
  const dir = path.join(ROOT, "src/content/blog", lang);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(dir, f), "utf8");
      const { data, content } = matter(raw);
      return {
        slug: f.replace(/\.md$/, ""),
        title: data.title,
        seoTitle: data.seoTitle ?? data.title,
        date: data.date,
        excerpt: data.excerpt,
        cover: data.cover ?? null,
        author: data.author ?? null,
        authorRole: data.authorRole ?? null,
        keywords: data.keywords ?? null,
        html: md.render(content),
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

const srPosts = readPosts("sr");
const enPosts = readPosts("en");

const srSlugs = new Set(srPosts.map((p) => p.slug));
const enSlugs = new Set(enPosts.map((p) => p.slug));
for (const slug of srSlugs) {
  if (!enSlugs.has(slug)) console.warn(`[build-blog] "${slug}" has a sr post but no en post`);
}
for (const slug of enSlugs) {
  if (!srSlugs.has(slug)) console.warn(`[build-blog] "${slug}" has an en post but no sr post`);
}

// ---------- Generated JSON (what the app actually imports at runtime) ----------
const generatedDir = path.join(ROOT, "src/content/blog/generated");
fs.mkdirSync(generatedDir, { recursive: true });
fs.writeFileSync(path.join(generatedDir, "sr.json"), JSON.stringify(srPosts, null, 2));
fs.writeFileSync(path.join(generatedDir, "en.json"), JSON.stringify(enPosts, null, 2));

// ---------- RSS ----------
function escapeXml(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildRss({ posts, lang, title, description, pagePrefix }) {
  const items = posts
    .map(
      (p) => `
    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${SITE_URL}${pagePrefix}/blog/${p.slug}</link>
      <guid>${SITE_URL}${pagePrefix}/blog/${p.slug}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <description>${escapeXml(p.excerpt)}</description>
    </item>`
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(title)}</title>
    <link>${SITE_URL}${pagePrefix}/blog</link>
    <description>${escapeXml(description)}</description>
    <language>${lang}</language>${items}
  </channel>
</rss>
`;
}

fs.writeFileSync(
  path.join(ROOT, "public/rss.xml"),
  buildRss({
    posts: srPosts,
    lang: "sr",
    title: "Tyne Agency Blog",
    description: "Performance marketing blog — Google Ads, Meta Ads i digitalni rast.",
    pagePrefix: "",
  })
);

fs.mkdirSync(path.join(ROOT, "public/en"), { recursive: true });
fs.writeFileSync(
  path.join(ROOT, "public/en/rss.xml"),
  buildRss({
    posts: enPosts,
    lang: "en",
    title: "Tyne Agency Blog",
    description: "Performance marketing blog — Google Ads, Meta Ads, and digital growth.",
    pagePrefix: "/en",
  })
);

// ---------- Sitemap ----------
const staticPages = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/portfolio", priority: "0.8", changefreq: "weekly" },
  { path: "/blog", priority: "0.8", changefreq: "weekly" },
  { path: "/kontakt", priority: "0.6", changefreq: "monthly" },
  { path: "/zakazi-call", priority: "0.6", changefreq: "monthly" },
  { path: "/politika-privatnosti", priority: "0.2", changefreq: "yearly" },
];

function urlEntry(srPath, enPath, priority, changefreq) {
  const enPriority = Math.max(0, parseFloat(priority) - 0.1).toFixed(1);
  return `  <url>
    <loc>${SITE_URL}${srPath}</loc>
    <xhtml:link rel="alternate" hreflang="sr" href="${SITE_URL}${srPath}" />
    <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}${enPath}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}${srPath}" />
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>
  <url>
    <loc>${SITE_URL}${enPath}</loc>
    <xhtml:link rel="alternate" hreflang="sr" href="${SITE_URL}${srPath}" />
    <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}${enPath}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}${srPath}" />
    <changefreq>${changefreq}</changefreq>
    <priority>${enPriority}</priority>
  </url>`;
}

const staticEntries = staticPages
  .map((p) => urlEntry(p.path, p.path === "/" ? "/en" : `/en${p.path}`, p.priority, p.changefreq))
  .join("\n");

const blogEntries = srPosts
  .filter((p) => enSlugs.has(p.slug))
  .map((p) => urlEntry(`/blog/${p.slug}`, `/en/blog/${p.slug}`, "0.6", "monthly"))
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${staticEntries}${blogEntries ? "\n" + blogEntries : ""}
</urlset>
`;

fs.writeFileSync(path.join(ROOT, "public/sitemap.xml"), sitemap);

console.log(
  `[build-blog] ${srPosts.length} sr posts, ${enPosts.length} en posts | sitemap.xml: ${staticPages.length * 2 + srPosts.filter((p) => enSlugs.has(p.slug)).length * 2} urls`
);
