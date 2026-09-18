import { useParams, Link } from "react-router-dom";
import "./Blog.css";
import { useLanguage } from "../../i18n/LanguageContext";
import { SEO } from "../../components/SEO/SEO";
import { getPost } from "../../blog/posts";
import { buildArticleSchema } from "../../components/SEO/articleSchema";
import NotFound from "../../components/NotFound/Notfound";

export default function BlogPost() {
  const { slug } = useParams();
  const { t, lp, lang } = useLanguage();
  const post = getPost(lang, slug);

  if (!post) return <NotFound />;

  return (
    <div className="blog-post-page">
      <SEO
        title={`${post.seoTitle || post.title} | Tyne Agency`}
        description={post.excerpt}
        jsonLd={buildArticleSchema(post, lang)}
      />

      <div className="blog-post-inner">
        <Link to={lp("/blog")} className="blog-post-back">
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
            <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {t.blog.backToBlog}
        </Link>

        <h1 className="blog-post-title">{post.title}</h1>

        {post.cover && (
          <img src={post.cover} alt={post.title} className="blog-post-cover" />
        )}

        <div className="blog-post-content" dangerouslySetInnerHTML={{ __html: post.html }} />

        <Link to={lp("/zakazi-call")} className="blog-post-cta">
          {t.footer.ctaBook}
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
