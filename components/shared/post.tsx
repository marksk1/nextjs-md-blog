import Link from "next/link";
import { Button } from "../ui/button";

export default function Post({ post }: any) {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg shadow-md p-4 flex flex-col">
      <img src={post.frontmatter.cover_image} alt="" className="rounded-lg" />
      <div className="text-sm mt-2 py-1 px-0 rounded-md">
        Posted on {post.frontmatter.date}
      </div>
      <h3 className="mt-3 text-xl font-bold">{post.frontmatter.title}</h3>
      <p className="mt-3 leading-relaxed">{post.frontmatter.excerpt}</p>

      <Button asChild variant="outline">
        <Link href={`/blog/${post.slug}`} className="mt-4 w-full">
          Read More
        </Link>
      </Button>
    </div>
  );
}
