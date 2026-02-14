'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

type Props = {
  onAdd: () => void
}

export default function BookmarkForm({ onAdd }: Props) {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)

  function normalizeUrl(input: string): string {
    let url = input.trim()

    // Add https if missing
    if (!/^https?:\/\//i.test(url)) {
      url = `https://${url}`
    }

    try {
      const parsed = new URL(url)
      return parsed.toString()
    } catch {
      throw new Error('Invalid URL')
    }
  }

  const addBookmark = async () => {
    if (!title || !url) return

    setLoading(true)
    const cleanUrl = normalizeUrl(url)

    const { data } = await supabase.auth.getUser()
    if (!data.user) return

    await supabase.from('bookmarks').insert([
      {
        title,
        url:cleanUrl,
        user_id: data.user.id,
      },
    ])

    onAdd()

    setTitle('')
    setUrl('')
    setLoading(false)
  }

  return (
    <div className="flex gap-4 items-center">
      <div className="flex-1 space-y-4 md:space-y-0 md:flex md:gap-4">
        <div className="relative flex-1 group">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Url Title "
            className="block w-full px-4 py-3 bg-[#1a1a1a] border border-[#333] rounded-xl text-gray-200 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all peer"
          />
        </div>

        <div className="relative flex-1 group">
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter Url "
            className="block w-full px-4 py-3 bg-[#1a1a1a] border border-[#333] rounded-xl text-gray-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all peer"
          />

        </div>
      </div>

      <button
        onClick={addBookmark}
        disabled={loading}
        className="h-[50px] px-8 rounded-xl bg-green-500 text-white font-bold tracking-wide transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center min-w-[120px]"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          'Add'
        )}
      </button>
    </div>
  )
}
