const SITE_URL = "https://tyne.rs";

export function buildArticleSchema(post, lang) {
  const path = lang === "en" ? `/en/blog/${post.slug}` : `/blog/${post.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    ...(post.cover ? { image: `${SITE_URL}${post.cover}` } : {}),
    ...(post.author ? { author: { "@type": "Person", name: post.author } } : {}),
    ...(post.keywords ? { keywords: post.keywords } : {}),
    publisher: {
      "@type": "Organization",
      name: "Tyne Agency",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/og-image.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}${path}` },
  };
}
