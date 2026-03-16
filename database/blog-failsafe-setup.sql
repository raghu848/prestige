-- FAILSAFE BLOG SETUP & POLICIES
-- This script ensures the UUID extension is active and uses 'gen_random_uuid()' for better compatibility.

-- 1. Enable required extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Ensure table exists with better defaults
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- Changed from uuid_generate_v4()
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT,
    featured_image_url TEXT,
    published_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. Enable RLS
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- 4. Clean up old policies (if any) to prevent conflicts
DROP POLICY IF EXISTS "Allow public read-only access to blog_posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admins can insert blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admins can update blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admins can delete blog posts" ON public.blog_posts;

-- 5. Public Read Policy
CREATE POLICY "Allow public read-only access to blog_posts"
    ON public.blog_posts FOR SELECT
    USING (published_at IS NOT NULL AND published_at <= now());

-- 6. Administrative Management Policies
CREATE POLICY "Admins can manage blog posts" ON public.blog_posts
    FOR ALL TO authenticated
    USING (
        EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid())
    )
    WITH CHECK (
        EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid())
    );

-- 7. Grant sequence permissions just in case
GRANT ALL ON TABLE public.blog_posts TO authenticated;
GRANT ALL ON TABLE public.blog_posts TO service_role;
