"use client"

import { getBookmarkExternalHref } from "../lib/bookmark-link"

export function BookmarkExternalLink({
  url,
  onClick,
  ...props
}: Omit<React.ComponentProps<"a">, "href" | "target" | "rel"> & {
  url: string
}) {
  return (
    <a
      href={getBookmarkExternalHref(url)}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
      onClick={(event) => {
        onClick?.(event)
      }}
    />
  )
}
