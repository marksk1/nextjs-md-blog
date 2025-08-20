import Image from "next/image";
import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";
import CodeBlock from "./CodeBlock";

export const mdxComponents = {
  // Override default HTML elements with custom styling
  // Text styling
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
  Fire: ({ children }: { children: React.ReactNode }) => (
    <span className="font-bold text-xl bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent animate-pulse">
      {children}
    </span>
  ),
  // Image styling
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
  // Blockquote styling
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
  // Code block styling
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
  // Table styling
  table: ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-x-auto">
      <table className="w-full border-collapse text-sm" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-gray-200 dark:bg-gray-800" {...props}>
      {children}
    </thead>
  ),
  tbody: ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody className="divide-y divide-gray-200 dark:divide-gray-700" {...props}>
      {children}
    </tbody>
  ),
  tr: ({ children, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className="border-b last:border-0 border-gray-200 dark:border-gray-700"
      {...props}
    >
      {children}
    </tr>
  ),
  th: ({
    children,
    ...props
  }: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-200"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({
    children,
    ...props
  }: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td
      className="px-4 py-2 align-top text-gray-800 dark:text-gray-100"
      {...props}
    >
      {children}
    </td>
  ),

  // List styling
  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="my-4 ml-6 list-disc list-outside space-y-2" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: React.OlHTMLAttributes<HTMLOListElement>) => (
    <ol className="my-4 ml-6 list-decimal list-outside space-y-2" {...props}>
      {children}
    </ol>
  ),
  // li: ({ children, ...props }: React.LiHTMLAttributes<HTMLLIElement>) => (
  //   <li
  //     className="leading-7 pl-1 [&>p]:m-0 [&.task-list-item]:list-none [&.task-list-item]:flex [&.task-list-item]:items-start [&.task-list-item]:gap-2 [&>input[type='checkbox']]:mr-2 [&>input[type='checkbox']]:mt-1.5 [&>input[type='checkbox']]:h-4 [&>input[type='checkbox']]:w-4 [&>input[type='checkbox']]:accent-emerald-600 [&:has(>input[type='checkbox']:checked)]:line-through [&:has(>input[type='checkbox']:checked)]:text-blue-500"
  //     {...props}
  //   >
  //     {children}
  //   </li>
  // ),
};
