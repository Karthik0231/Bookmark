'use client'

import { supabase } from '@/lib/supabase'
import { Bookmark } from '@/app/types/bookmark'

type Props = {
  bookmark: Bookmark
  onDelete: () => void
}

export default function BookmarkItem({ bookmark, onDelete }: Props) {

  const deleteBookmark = async () => {
    await supabase
      .from('bookmarks')
      .delete()
      .eq('id', bookmark.id)

    onDelete()
  }

  return (
    <div className="group relative bg-card-bg border border-card-border rounded-xl p-5 hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] transition-all duration-300 flex flex-col justify-between h-full">
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-cyan-500/0 via-cyan-500/50 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="space-y-2 mb-4">
        <h3 className="font-bold text-lg text-gray-100 line-clamp-1 group-hover:text-cyan-400 transition-colors">
          <a href={bookmark.url} target="_blank" rel="noopener noreferrer" className="before:absolute before:inset-0">
            {bookmark.title}
          </a>
        </h3>
        <p className="text-sm text-gray-500 font-mono truncate opacity-60 group-hover:opacity-100 transition-opacity">
          {bookmark.url}
        </p>
      </div>

      <div className="flex justify-between items-end pt-4 border-t border-gray-800 mt-auto relative z-10">
        <span className="text-xs text-gray-600">
          {new Date(bookmark.created_at).toLocaleDateString()}
        </span>

        <button
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
            deleteBookmark()
          }}
          className="text-gray-500 hover:text-red-500 p-2 -mr-2 -mb-2 rounded-lg hover:bg-red-500/10 transition-colors"
          title="Delete"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  )
}
