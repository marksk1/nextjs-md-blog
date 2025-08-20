
// Define post object
interface Post {
  frontmatter: {
    date: string;
    // ...other fields
  };
}

// Sort posts by date
export const sortByDate = (a: Post, b: Post) => {
  return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
}