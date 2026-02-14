'use client'

import { Bookmark } from '@/app/types/bookmark'
import BookmarkItem from './BookmarkItem'

type Props = {
  bookmarks: Bookmark[]
  onDelete: () => void
}

export default function BookmarkList({ bookmarks, onDelete }: Props) {
  if (bookmarks.length === 0) {
    return (
      <div className="bg-card-bg border border-card-border p-12 rounded-2xl text-center space-y-4 shadow-xl">
        <div className="inline-block p-4 rounded-full bg-gray-800/50 mb-2">
          <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </div>
        <p className="text-xl text-gray-300 font-medium">No bookmarks yet</p>
        <p className="text-gray-500">Add your first bookmark to get started.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
      {bookmarks.map((bookmark) => (
        <BookmarkItem key={bookmark.id} bookmark={bookmark} onDelete={onDelete} />
      ))}
    </div>
  )
}
