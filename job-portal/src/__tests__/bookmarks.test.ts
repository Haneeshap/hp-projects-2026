import { getBookmarkedIds, toggleBookmark, isBookmarked } from '../utils/bookmarks'

beforeEach(() => {
  localStorage.clear()
})

test('toggleBookmark adds and removes id', () => {
  expect(getBookmarkedIds()).toEqual([])
  toggleBookmark('job-1')
  expect(isBookmarked('job-1')).toBe(true)
  expect(getBookmarkedIds()).toEqual(['job-1'])
  toggleBookmark('job-1')
  expect(isBookmarked('job-1')).toBe(false)
  expect(getBookmarkedIds()).toEqual([])
})
