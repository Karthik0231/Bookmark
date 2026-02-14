# Smart Bookmark App

What I Used
- Next.js 16 (App Router)
- React 19
- Supabase (Auth, Postgres, Realtime)
- Tailwind CSS v4

Problems I Ran Into & How I Solved Them
- Realtime update in one tab didn’t update other tabs
  - Enabled Realtime updates for public.bookmarks and set REPLICA IDENTITY FULL
  - Subscribed to INSERT/UPDATE/DELETE and refetched when payload user_id matched current session
- Privacy per user (RLS)
  - Enabled Row Level Security and added policies using auth.uid() = user_id for SELECT/INSERT/UPDATE/DELETE
- TypeScript payload typing
  - Used RealtimePostgresChangesPayload<Bookmark> with safe narrowing to read user_id
- Redirect issue after hosting
  - solved in redirecting url of supabase site URL
- Leveraged AI tools (ChatGPT, Perplexity, Claude) to accelerate learning and problem-solving throughout development.
  
