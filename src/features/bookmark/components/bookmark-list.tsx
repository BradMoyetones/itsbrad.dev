import type { BookmarkListEntry } from "../types"

const AD_POSITION = 2

export function BookmarkList({ entries }: { entries: BookmarkListEntry[] }) {
  return (
    <ul>
      {entries.slice(0, AD_POSITION).map(renderEntry)}

      {entries.slice(AD_POSITION).map(renderEntry)}
    </ul>
  )
}

const renderEntry = (entry: BookmarkListEntry) => (
  <li key={entry.url} className="border-b border-line">
    {entry.card}
  </li>
)
