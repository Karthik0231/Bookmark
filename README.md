# Smart Bookmark App

What I Used
- Next.js 16 (App Router)
- React 19
- Supabase (Auth, Postgres, Realtime)
- Tailwind CSS v4

Problems I Ran Into & How I Solved Them
- Realtime delete didn’t update other tab
  - Enabled Realtime deletes for public.bookmarks and set REPLICA IDENTITY FULL
  - Subscribed to INSERT/UPDATE/DELETE and refetched when payload user_id matched current session
- Privacy per user (RLS)
  - Enabled Row Level Security and added policies using auth.uid() = user_id for SELECT/INSERT/UPDATE/DELETE
- Dev server lock (port in use)
  - Stopped the extra dev instance or used the alternative port suggested by Next.js
- TypeScript payload typing
  - Used RealtimePostgresChangesPayload<Bookmark> with safe narrowing to read user_id
