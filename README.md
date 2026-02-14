**Smart Bookmark App**
- A private realtime bookmark manager built with Next.js (App Router) and Supabase.
- Users authenticate using Google OAuth, create bookmarks, and see updates instantly across multiple tabs. Data privacy is enforced using Supabase Row Level Security (RLS).

**Tech Stack**
Next.js (App Router)
Supabase (Auth, Postgres, Realtime, RLS)
Tailwind CSS
Vercel

**Live URL**
https://bookmark-swart-zeta.vercel.app/

**Key Implementation Details**
- Bookmarks table includes a user_id column.

**Row Level Security enabled with:**
- USING (auth.uid() = user_id)
- WITH CHECK (auth.uid() = user_id)

- Realtime enabled on public.bookmarks.
- Client subscribes to changes and refetches current user's data.

**Environment Variables**
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

**Challenges**
- Realtime syncing across tabs
- Implementing correct RLS policies
- Fixing deployment issues due to missing environment variables
