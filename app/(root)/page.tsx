import fs from 'fs';
import Image from 'next/image';
import path from 'path';
import matter from 'gray-matter';
import Post from '@/components/shared/post';
// note - all files in the /app directory are 'use server' by default, i.e. they run server-side.
// We only need to add 'use client' if we need client-side interactivity (e.g. hooks like useState, useEffect)

// function to get posts from the .md files
async function getPosts() {
  // Get files from the posts dir
  const files = fs.readdirSync(path.join('posts'));

  // Get slug and frontmatter from posts
  const posts = files.map((filename) => {
    // Create slug
    const slug = filename.replace('.md', '');
    // Get frontmatter
    const markdownWithMeta = fs.readFileSync(
      path.join('posts', filename),
      'utf-8'
    );
    // renames data as frontmatter
    const { data: frontmatter } = matter(markdownWithMeta);

    console.log(frontmatter);
    return {
      slug,
      frontmatter,
    };
  });
  return {
    posts,
  };
}

export default async function Home() {
  const { posts } = await getPosts();
  console.log(posts);
  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {posts.map((post, index) => (
          <Post post={post} key={index} />
        ))}
      </div>
    </>
  );
}
