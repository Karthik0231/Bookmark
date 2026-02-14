'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Bookmark } from '@/app/types/bookmark'
import BookmarkForm from '../components/BookmarkForm'
import BookmarkList from '../components/BookmarkList'

import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [status, setStatus] = useState<string>('Connecting...')
  const router = useRouter()

  const fetchBookmarks = async () => {
    const { data } = await supabase
      .from('bookmarks')
      .select('*')
      .order('created_at', { ascending: false })

    if (data) setBookmarks(data)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  useEffect(() => {
    fetchBookmarks()

    const subscribeToRealtime = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) return

      const channel = supabase
        .channel('bookmarks-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'bookmarks',
            filter: `user_id=eq.${user.id}`,
          },
          () => {
            console.log('Realtime change received! Refetching...')
            fetchBookmarks()
          }
        )
        .subscribe((status) => {
          setStatus(status)
        })

      return () => {
        supabase.removeChannel(channel)
      }
    }

    const unsubscribe = subscribeToRealtime()

    return () => {
      unsubscribe.then((cleanup) => cleanup && cleanup())
    }
  }, [])

  return (
    <div className="min-h-screen text-gray-200">
      <div className="max-w-4xl mx-auto p-6 pt-10">
        <nav className="flex justify-end mb-8">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200 bg-white/5 hover:bg-white/10 rounded-full backdrop-blur-sm border border-white/5"
          >
            <span>Sign Out</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </nav>

        <header className="mb-12 text-center">
          <h1 className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-green-500 tracking-tight">
            Smart Bookmarks
          </h1>
          <p className="text-gray-400 text-lg">
            Organize your digital life with style.
          </p>
        </header>

        <div className="grid gap-8">
          <section className="bg-card-bg border border-card-border p-8 rounded-2xl shadow-2xl backdrop-blur-sm relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <BookmarkForm onAdd={fetchBookmarks} />
          </section>

          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-300">Your Collection</h2>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${status === 'SUBSCRIBED' ? 'bg-green-500 shadow-[0_0_10px_#22c55e]' : 'bg-yellow-500'}`} />
                <span className="text-xs text-gray-500 font-mono uppercase tracking-wider">{status}</span>
              </div>
            </div>
            <BookmarkList bookmarks={bookmarks} onDelete={fetchBookmarks} />
          </section>
        </div>
      </div>
    </div>
  )
}
