-- 1. Create the 'media' bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
SELECT 'media', 'media', true
WHERE NOT EXISTS (
    SELECT 1 FROM storage.buckets WHERE id = 'media'
);

-- 2. Allow Public Access to view files
-- (Needed so property images show up on the website)
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'media' );

-- 3. Allow Authenticated Users to upload files
-- (Needed for the agent dashboard)
CREATE POLICY "Authenticated Users Upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'media' );

-- 4. Allow Authenticated Users to update/delete their own files
-- (Optional but recommended for management)
CREATE POLICY "Authenticated Users Manage"
ON storage.objects FOR ALL
TO authenticated
USING ( bucket_id = 'media' );
