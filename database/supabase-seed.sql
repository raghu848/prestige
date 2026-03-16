-- Supabase-compatible Seed Data
-- Run this AFTER database/schema.sql in the Supabase SQL Editor

-- 1. Insert sample properties
-- Note: UUIDs are generated, but if you need specific ones, you can provide them.
-- Here we'll let gen_random_uuid() do its work.

INSERT INTO public.properties (title, slug, description, price, property_type, bedrooms, bathrooms, area_sqft, address, city, featured_image, is_featured, status)
VALUES 
('Modern Sky Penthouse', 'modern-sky-penthouse', 'Experience luxury living at its finest with panoramic city views and premium finishes.', 2500000, 'Penthouse', 4, 3, 3500, '123 Sky Garden Way', 'Dubai', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop', true, 'available'),
('Azure Marina Villa', 'azure-marina-villa', 'A stunning waterfront villa featuring a private infinity pool and direct beach access.', 4800000, 'Villa', 6, 5, 7200, '45 Marina Shore', 'Palm Jumeirah', 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop', true, 'available'),
('The Golden Residence', 'the-golden-residence', 'Refined elegance in the heart of the city. Spacious floor plans and exclusive amenities.', 1200000, 'Apartment', 3, 2, 2100, '88 Elite Avenue', 'Chandigarh', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop', true, 'available'),
('Emerald Garden Estate', 'emerald-garden-estate', 'Secluded sanctuary surrounded by lush greenery and tranquil water features.', 3200000, 'Estate', 5, 4, 5500, '12 Orchard Lane', 'New Delhi', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop', false, 'available');

-- 2. Insert sample inquiries
-- We'll link these to the properties we just created.
-- Since the IDs are random, we'll use a subquery.

INSERT INTO public.inquiries (property_id, name, email, phone, message)
VALUES 
((SELECT id FROM public.properties WHERE slug = 'modern-sky-penthouse' LIMIT 1), 'Vikram Sharma', 'vikram.sharma@email.com', '+91-9876543213', 'I am interested in the penthouse. Can we schedule a viewing?'),
((SELECT id FROM public.properties WHERE slug = 'the-golden-residence' LIMIT 1), 'Anita Desai', 'anita.desai@email.com', '+91-9876543214', 'Looking for a 3BHK for my family. Please share more details.');

-- IMPORTANT: YOU MUST ADD YOURSELF TO THE ADMINS TABLE
-- After you log in via the agent portal, copy your User ID from the Supabase Auth tab
-- and run the following command (replacing YOUR_USER_ID, YOUR_NAME, and YOUR_EMAIL):

-- INSERT INTO public.admins (id, name, email, role)
-- VALUES ('YOUR_USER_ID', 'Admin User', 'your-email@example.com', 'admin');
