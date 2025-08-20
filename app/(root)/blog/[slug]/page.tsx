import fs from "fs";
import path from "path";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx/mdx-components";
import matter from "gray-matter";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Generate the static params so that these pages will be static
// This tells Next.js which dynamic routes (in this case, blog post paths) should be pre-rendered at build time.
// An array of paths is required for this to work.
export async function generateStaticParams() {
  const files = fs.readdirSync(path.join("posts"));
  const paths = files.map((filename) => ({
    slug: filename.replace(/\.(md|mdx)$/, ""), // Handle both .md and .mdx files
  }));
  // console.log(paths);
  return paths;
}

// Page component, which gets the slug from the URL
export default async function PostPage({ params }: any) {
  const { slug } = await params;

  // Try .mdx first, then .md for backward compatibility
  let filePath = path.join("posts", slug + ".mdx");
  if (!fs.existsSync(filePath)) {
    filePath = path.join("posts", slug + ".md");
  }

  const markdownWithMeta = fs.readFileSync(filePath, "utf-8");

  // const markdownWithMeta = fs.readFileSync(
  //   path.join("posts", slug + ".md"),
  //   "utf-8"
  // );
  // console.log(markdownWithMeta);

  const { data: frontmatter, content } = matter(markdownWithMeta);
  const { title, date, cover_image } = frontmatter;
  return (
    <>
      <Button asChild variant="outline">
        <Link href="/">Go Back</Link>
      </Button>
      <div className="rounded-2xl shadow-md p-6 mt-4">
        <h1 className="text-3xl font-bold">{title}</h1>
        <div className="mt-4 text-lg bg-gray-100">Posted on {date}</div>
        <img src={cover_image} alt="" className="mt-4 rounded-2xl" />
        <div className="post-body">
          <MDXRemote source={content} components={mdxComponents} />
          {/* <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div> */}
        </div>
      </div>
    </>
  );
}
