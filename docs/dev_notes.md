# Dev Notes

## Course overview:
- Static Blog With Next.js and Markdown - Traversy Media
- https://www.youtube.com/watch?v=MrjeefD8sac
- Code: https://github.com/bradtraversy/next-markdown-blog/tree/main
- Note: had to adapt as this is an older video and the code was using Next 11 / React 17 (now we're using Next 15 / React 19).

## Notes
- Created a new nextjs app in a blank directory:
  `npx create-next-app .`
  - Options:
  
    ```bash
    ✔ Would you like to use TypeScript? … **Yes**
    ✔ Would you like to use ESLint? … **Yes**
    ✔ Would you like to use Tailwind CSS? … **Yes**
    ✔ Would you like your code inside a `src/` directory? … **No**
    ✔ Would you like to use App Router? (recommended) … **Yes**
    ✔ Would you like to use Turbopack for `next dev`? … **No**
    ✔ Would you like to customize the import alias (`@/*` by default)? … **No**
    ```

- installed 2 extra dependencies needed to interpret markdown files:
  - **marked**: interprets markdown into html
  - **gray-matter**: deals with frontmatter (data info at start of a markdown)
  `npm install marked gray-matter`

- install next-themes which we use for light / dark mode
  - `npm install next-themes`

- initialize shadcn for pre-styled components like buttons
  - `npx shadcn@latest init`
  - and add the components we want to use:
    - `npx shadcn@latest add button`
    - `npx shadcn@latest add sheet`
    - `npx shadcn@latest add dropdown-menu`

## importing posts from .md files
- getStaticProps doesn't work with Next 15 / React 19, so we defined an async server component function to get the posts instead
- how does this work in terms of server-side vs client-side?
  - at build time the data will be fetched from the .md files server-side using the async server component
- note - all files in the /app directory are 'use server' by default, i.e. they run server-side.
  - We only need to add 'use client' if we need client-side interactivity (e.g. hooks like useState, useEffect)

## dynamic routing
- For dynamic routing, React 11 accepted this structure in the app (was pages) folder `/blog/[slug].tsx`
- React 15 no longer accepts this and now expects:
`/blog/[slug]/page.tsx`

## Using Marked
- Change: import statement had to be changed to `import { marked } from 'marked';` instead of `import marked from 'marked';` as the marked package no longer has a default export.

## Deployment
- export the built static website to an `out` folder by adding `&& next export` to the build script in `package.json`, like this:
```
"build": "next build && next export",
```
  - UPDATE: next export within the build script has been replaced by the following within the `next.config.ts` file:
```
- const nextConfig: NextConfig = {
  /* config options here */
  output: 'export' // export static site to `out` folder
};
```
- then run `npm run build`

- we then had some issues with eslint rules, for example using <img> instead of the optimised <Image> tag. This rule is `@typescript-eslint/no-unused-vars`
  - We can disable eslint rules by adding them within the `eslint.config.mjs` file, like this:
```
const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
];
```
- once built successfully, an `out` folder will appear
- now we can serve using a tool like `serve`
  - first install it: `npm install -g serve` (globally)
  - then we can use it to serve on a particular port: `serve -s ./out -p 8000`
  - congrats, your site is served!

## Allowing support .mdx whilst keeping .md support
- 1. install these packages: 
  - `next-mdx-remote` - allows use to conver mdx from anywhere into html 
  - `@mdx-js/mdx` - handles the conversion of mdx into html
  - `@mdx-js/react` - allows us to add custom html components within `mdx-components.tsx`
  - using command: `npm install next-mdx-remote @mdx/mdx @mdx/react`

- 2. create `/components/mdx/mdx-components.tsx` and define styling for the html components that will be converted to from mdx, e.g.:
  ```
  export const mdxComponents = {
    // Override default HTML elements with custom styling
    h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h1 className="text-3xl font-bold mt-8 mb-4" {...props}>
        {children}
      </h1>
    ),
    ...and other components like h2, h3, p, a, img, etc.
  }
  ```

- update your blog singular post page `app/(root)/blog/[slug]/page.tsx` to use the `mdx` packages instead of `marked`
  - also include `.mdx` files in the `generateStaticParams()` function so they are included during build
- update your archive posts list page `app/(root)/blog/[slug]/page.tsx` to include both `.mdx` and `.md` files
