import Image from "next/image";
import Link from "next/link";
import React from "react";
import CodeBlock from "./CodeBlock";

export const mdxComponents = {
  // Override default HTML elements with custom styling
  h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-3xl font-bold mt-8 mb-4" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-2xl font-semibold mt-6 mb-3" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-xl font-medium mt-4 mb-2" {...props}>
      {children}
    </h3>
  ),
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mb-4 leading-7" {...props}>
      {children}
    </p>
  ),
  a: ({
    href,
    children,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <Link
      href={href || "#"}
      className="text-blue-600 hover:text-blue-900 underline"
      {...props}
    >
      {children}
    </Link>
  ),
  img: ({
    src,
    alt,
    width,
    height,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <Image
      src={(src as string) || ""}
      alt={alt || ""}
      width={Number(width) || 800}
      height={Number(height) || 400}
      className="rounded-lg my-4"
      {...props}
    />
  ),
  blockquote: ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 my-4 italic text-gray-700"
      {...props}
    >
      {children}
    </blockquote>
  ),
  code: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono"
      {...props}
    >
      {children}
    </code>
  ),
  pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => {
    // Check if the child is a code element with a className (language)
    const childProps = React.isValidElement(children)
      ? (children.props as any)
      : {};
    const className = childProps.className || "";
    const code = childProps.children || "";

    // If it's a code block with language, use our CodeBlock component
    if (className && typeof code === "string") {
      return <CodeBlock className={className}>{code}</CodeBlock>;
    }

    // Otherwise, use default pre styling
    return (
      <pre
        className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto my-4"
        {...props}
      >
        {children}
      </pre>
    );
  },
  Fire: ({ children }: { children: React.ReactNode }) => (
    <span className="font-bold text-xl bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent animate-pulse">
      {children}
    </span>
  ),
};
