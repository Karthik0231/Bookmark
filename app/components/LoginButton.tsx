'use client'

import { supabase } from '@/lib/supabase'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        router.push('/dashboard')
      } else {
        setLoading(false)
      }
    }

    checkSession()
  }, [router])

  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-4 border-slate-300 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-slate-600">Checking session...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      
      <div className="w-full max-w-md bg-white border border-slate-200 p-8 rounded-2xl shadow-xl space-y-6">
        
        {/* Project Title */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Smart Bookmarks
          </h1>
          <p className="text-slate-600 text-sm">
            Sign in to continue to your dashboard
          </p>
        </div>

        {/* Login Button */}
        <button
          onClick={login}
          className="w-full flex items-center justify-center gap-3 bg-white text-black py-3 rounded-xl font-medium border border-slate-300 hover:bg-slate-50 transition active:scale-95"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="20px"
            height="20px"
          >
            <path fill="#EA4335" d="M24 9.5c3.6 0 6.9 1.3 9.5 3.4l7.1-7.1C36.2 2.4 30.4 0 24 0 14.6 0 6.4 5.5 2.6 13.5l8.3 6.4C13 13.3 18.1 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.1 24.5c0-1.7-.2-3.3-.6-4.8H24v9.1h12.4c-.5 2.7-2 5-4.3 6.6l6.7 5.2c3.9-3.6 7.3-9 7.3-16.1z"/>
            <path fill="#FBBC05" d="M10.9 28.9c-.5-1.4-.8-2.9-.8-4.4s.3-3 .8-4.4l-8.3-6.4C.9 16.6 0 20.2 0 24s.9 7.4 2.6 10.3l8.3-5.4z"/>
            <path fill="#34A853" d="M24 48c6.4 0 11.8-2.1 15.7-5.7l-6.7-5.2c-2 1.4-4.6 2.2-9 2.2-5.9 0-10.9-3.8-12.7-9.4l-8.3 5.4C6.4 42.5 14.6 48 24 48z"/>
          </svg>

          Sign in with Google
        </button>

        {/* Footer */}
        <p className="text-xs text-center text-slate-500">
          Secure authentication powered by Google
        </p>
      </div>

    </div>
  )
}
