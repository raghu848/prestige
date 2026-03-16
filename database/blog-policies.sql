-- Add administrative policies for blog_posts table

-- 1. Allow authenticated admins to INSERT
CREATE POLICY "Admins can insert blog posts" ON public.blog_posts
    FOR INSERT TO authenticated
    WITH CHECK (
        EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid())
    );

-- 2. Allow authenticated admins to UPDATE
CREATE POLICY "Admins can update blog posts" ON public.blog_posts
    FOR UPDATE TO authenticated
    USING (
        EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid())
    )
    WITH CHECK (
        EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid())
    );

-- 3. Allow authenticated admins to DELETE
CREATE POLICY "Admins can delete blog posts" ON public.blog_posts
    FOR DELETE TO authenticated
    USING (
        EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid())
    );
