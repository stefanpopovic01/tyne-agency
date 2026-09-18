// The actual markdown parsing/rendering happens once at build time (scripts/build-blog.mjs),
// which writes these two JSON files. Importing plain JSON here — instead of parsing markdown
// in app code — keeps gray-matter/markdown-it and the raw .md source out of the browser bundle.
import srPosts from "../content/blog/generated/sr.json";
import enPosts from "../content/blog/generated/en.json";

const postsByLang = { sr: srPosts, en: enPosts };

export function getPosts(lang) {
  return postsByLang[lang] ?? [];
}

export function getPost(lang, slug) {
  return getPosts(lang).find((p) => p.slug === slug) ?? null;
}

// Slugs are shared across sr/en (each post has both language versions, paired 1:1
// for hreflang), so the sr file list is the canonical route list for static generation.
export const blogSlugs = srPosts.map((p) => p.slug);
