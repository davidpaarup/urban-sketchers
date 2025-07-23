import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { client, BlogPost, urlFor } from "@/lib/sanity";
import { Layout } from "@/components/Layout";
import { PortableText } from "@portabletext/react";

export default function BlogPostDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!client || !slug) return;
    const query = `*[_type == 'blogPost' && slug.current == $slug && defined(publishedAt) && !(_id in path('drafts.**'))][0]{
      _id,
      title,
      slug,
      publishedAt,
      mainImage,
      body
    }`;
    client.fetch(query, { slug })
      .then((data: BlogPost) => {
        setPost(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load blog post.");
        setLoading(false);
      });
  }, [slug]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <Link to="/blog" className="text-sketch-blue hover:underline mb-6 inline-block">← Back to Blog</Link>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && !post && <p>Blog post not found.</p>}
        {post && (
          <article>
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <div className="text-sm text-gray-500 mb-4">
              {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : ""}
            </div>
            {post.mainImage && (
              <img
                src={urlFor(post.mainImage)?.width(800).url() || ""}
                alt={post.title}
                className="rounded-lg mb-6 max-h-96 object-cover"
              />
            )}
            <div className="prose max-w-none">
              {/* Render the body using PortableText for rich text support */}
              {post.body && (
                <PortableText value={post.body} />
              )}
            </div>
          </article>
        )}
      </div>
    </Layout>
  );
} 