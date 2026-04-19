export function getBookmarkedIds(): string[] {
  try {
    const v = localStorage.getItem('bookmarks')
    return v ? JSON.parse(v) : []
  } catch (e) {
    return []
  }
}

export function isBookmarked(id: string): boolean {
  return getBookmarkedIds().includes(id)
}

export function toggleBookmark(id: string) {
  try {
    const cur = getBookmarkedIds()
    const idx = cur.indexOf(id)
    if (idx >= 0) cur.splice(idx, 1)
    else cur.push(id)
    localStorage.setItem('bookmarks', JSON.stringify(cur))
  } catch (e) {
    // ignore
  }
}
