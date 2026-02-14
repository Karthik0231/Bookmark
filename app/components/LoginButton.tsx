'use client'

import { supabase } from '@/lib/supabase'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-slate-200 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-b-indigo-400 rounded-full animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
          <p className="text-slate-600 font-medium">Checking session...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 px-4 overflow-hidden relative">
      
      {/* Animated background gradient that follows mouse */}
      <div 
        className="pointer-events-none fixed inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.06), transparent 40%)`
        }}
      />

      {/* Floating shapes in background */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-200/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-purple-200/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      
      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200/50 p-10 rounded-3xl shadow-2xl shadow-slate-900/5 space-y-8 hover:shadow-slate-900/10 transition-all duration-500">
          
          {/* Logo/Icon */}
          <div className="flex justify-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
              <div className="relative bg-gradient-to-br from-blue-500 to-indigo-600 p-4 rounded-2xl transform group-hover:scale-110 transition-transform duration-500">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Project Title */}
          <div className="text-center space-y-3">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
              Smart Bookmarks
            </h1>
            <p className="text-slate-600 text-sm leading-relaxed">
              Organize your digital world with elegance and speed
            </p>
          </div>

          {/* Login Button */}
          <div className="space-y-4">
            <button
              onClick={login}
              className="group relative w-full flex items-center justify-center gap-3 bg-white text-slate-900 py-4 px-6 rounded-xl font-semibold border-2 border-slate-200 hover:border-blue-300 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md active:scale-[0.98]"
            >
              {/* Hover effect background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Google Icon */}
              <svg
                className="relative z-10 transition-transform duration-300 group-hover:scale-110"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="24px"
                height="24px"
              >
                <path fill="#EA4335" d="M24 9.5c3.6 0 6.9 1.3 9.5 3.4l7.1-7.1C36.2 2.4 30.4 0 24 0 14.6 0 6.4 5.5 2.6 13.5l8.3 6.4C13 13.3 18.1 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.1 24.5c0-1.7-.2-3.3-.6-4.8H24v9.1h12.4c-.5 2.7-2 5-4.3 6.6l6.7 5.2c3.9-3.6 7.3-9 7.3-16.1z"/>
                <path fill="#FBBC05" d="M10.9 28.9c-.5-1.4-.8-2.9-.8-4.4s.3-3 .8-4.4l-8.3-6.4C.9 16.6 0 20.2 0 24s.9 7.4 2.6 10.3l8.3-5.4z"/>
                <path fill="#34A853" d="M24 48c6.4 0 11.8-2.1 15.7-5.7l-6.7-5.2c-2 1.4-4.6 2.2-9 2.2-5.9 0-10.9-3.8-12.7-9.4l-8.3 5.4C6.4 42.5 14.6 48 24 48z"/>
              </svg>

              <span className="relative z-10 group-hover:text-blue-700 transition-colors duration-300">
                Continue with Google
              </span>
            </button>

            {/* Security badge */}
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Secure authentication powered by Google</span>
            </div>
          </div>

          {/* Features */}
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}