import { useState } from "react";
import { Link } from "react-router-dom";
import "./Blog.css";
import { useLanguage } from "../../i18n/LanguageContext";
import { SEO } from "../../components/SEO/SEO";
import { getPosts } from "../../blog/posts";

export default function BlogIndex() {
  const { t, lp, lang } = useLanguage();
  const posts = getPosts(lang);
  const [query, setQuery] = useState("");

  const filtered = query.trim()
    ? posts.filter((p) => p.title.toLowerCase().includes(query.trim().toLowerCase()))
    : posts;

  return (
    <div className="blog-page">
      <SEO {...t.seo.blog} />

      <div className="blog-inner">
        <div className="blog-header">
          <span className="blog-eyebrow">{t.blog.eyebrow}</span>
          <h1 className="blog-title">
            {t.blog.titleLine1}<br />
            <span className="blog-title-em">{t.blog.titleEm}</span>
          </h1>
          <p className="blog-lead">{t.blog.lead}</p>
        </div>

        <div className="blog-search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="blog-search-icon">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="blog-search-input"
            placeholder={t.blog.searchPlaceholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {filtered.length === 0 ? (
          <p className="blog-empty">{posts.length === 0 ? t.blog.emptyState : t.blog.noResults}</p>
        ) : (
          <div className="blog-grid">
            {filtered.map((post) => (
              <Link key={post.slug} to={lp(`/blog/${post.slug}`)} className="blog-card">
                {post.cover && (
                  <div className="blog-card-img-wrap">
                    <img src={post.cover} alt={post.title} className="blog-card-img" loading="lazy" />
                  </div>
                )}
                <div className="blog-card-body">
                  <h2 className="blog-card-title">{post.title}</h2>
                  {post.excerpt && <p className="blog-card-excerpt">{post.excerpt}</p>}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
