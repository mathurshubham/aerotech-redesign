import type { MDXComponents } from "mdx/types";
import Image, { type ImageProps } from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * MDX element mapping.
 *
 * Typography comes from `.prose-site` in `src/app/globals.css`, which the page
 * wrapper applies — so this file stays deliberately thin. Only add a class
 * here when the element needs something `.prose-site` cannot express.
 */
export function useMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    h2: ({ className, ...props }) => (
      <h2
        className={cn(
          "mt-14 scroll-mt-28 text-[clamp(1.5rem,2vw,1.875rem)] font-semibold [overflow-wrap:anywhere]",
          className,
        )}
        {...props}
      />
    ),
    h3: ({ className, ...props }) => (
      <h3
        className={cn(
          "mt-10 scroll-mt-28 text-[1.375rem] font-semibold [overflow-wrap:anywhere]",
          className,
        )}
        {...props}
      />
    ),
    p: ({ className, ...props }) => (
      <p className={cn("measure", className)} {...props} />
    ),
    a: ({ className, href = "", ...props }) => {
      const external = /^(https?:)?\/\//i.test(href) || href.startsWith("mailto:");
      const classes = cn(
        "font-medium text-orange-600 underline-offset-4 hover:text-orange-500 hover:underline [overflow-wrap:anywhere]",
        className,
      );
      return external ? (
        <a
          className={classes}
          href={href}
          rel="noopener noreferrer"
          target={href.startsWith("mailto:") ? undefined : "_blank"}
          {...props}
        />
      ) : (
        <Link className={classes} href={href} {...props} />
      );
    },
    ul: ({ className, ...props }) => (
      <ul className={cn("measure list-disc pl-5", className)} {...props} />
    ),
    ol: ({ className, ...props }) => (
      <ol className={cn("measure list-decimal pl-5", className)} {...props} />
    ),
    blockquote: ({ className, ...props }) => (
      <blockquote
        className={cn(
          "measure my-8 border-l-[3px] border-orange-500 pl-5 font-display text-xl font-medium not-italic text-ink",
          className,
        )}
        {...props}
      />
    ),
    img: ({ className, alt = "", ...props }) => (
      <Image
        alt={alt}
        className={cn("my-8 h-auto w-full rounded-lg", className)}
        sizes="(min-width: 1024px) 800px, 100vw"
        {...(props as Omit<ImageProps, "alt">)}
      />
    ),
    ...components,
  };
}
