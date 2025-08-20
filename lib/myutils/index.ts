
// Define post object
interface Post {
  frontmatter: {
    date: string;
    // ...other fields
  };
}

// Sort posts by date
export const sortByDate = (a: any, b: any) => {
  return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
}