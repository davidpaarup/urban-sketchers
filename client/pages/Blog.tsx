import { useEffect, useState } from "react";
import { client, blogPostsQuery, BlogPost, urlFor } from "@/lib/sanity";
import { Layout } from "@/components/Layout";
import { Link } from "react-router-dom";

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!client) return;
    client.fetch(blogPostsQuery)
      .then((data: BlogPost[]) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err: any) => {
        setError("Failed to load blog posts.");
        setLoading(false);
      });
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl font-bold mb-8">Blog</h1>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && posts.length === 0 && <p>No blog posts found.</p>}
        <div className="space-y-8">
          {posts.map((post) => (
            <div key={post._id} className="border-b pb-6">
              <Link to={`/blog/${post.slug.current}`} className="text-2xl font-semibold text-sketch-blue hover:underline">
                {post.title}
              </Link>
              <div className="text-sm text-gray-500 mb-2">
                {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : ""}
              </div>
              {post.mainImage && (
                <img
                  src={urlFor(post.mainImage)?.width(600).url() || ""}
                  alt={post.title}
                  className="rounded-lg mb-3 max-h-64 object-cover"
                />
              )}
              <div className="text-base text-gray-700 line-clamp-3">
                {/* Show the excerpt if available */}
                {post.excerpt || null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
} 