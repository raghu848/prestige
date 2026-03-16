-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT,
    featured_image_url TEXT,
    published_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Create public read policy
CREATE POLICY "Allow public read-only access to blog_posts"
    ON blog_posts FOR SELECT
    USING (published_at IS NOT NULL AND published_at <= now());

-- Insert sample blog data
INSERT INTO blog_posts (title, slug, excerpt, content, featured_image_url, published_at) VALUES
(
    'Top 5 Neighborhoods to Watch in Chandigarh for 2026',
    'top-5-neighborhoods-chandigarh-2026',
    'Explore the most promising real estate hotspots in Chandigarh that offer exceptional growth potential and lifestyle benefits.',
    'Chandigarh is evolving, and with its expansion comes several new hotspots. In this article, we analyze real estate trends, infrastructure developments, and upcoming projects in Sectors 5, 8, 17, and beyond...',
    'https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=2070&auto=format&fit=crop',
    CURRENT_TIMESTAMP
),
(
    'The Rise of Sustainable Luxury Living',
    'sustainable-luxury-living',
    'How eco-friendly architectural design and smart home technologies are revolutionizing the high-end property market.',
    'Modern luxury isn''t just about opulence; it''s about responsibility. From rainwater harvesting to solar-powered common areas, sustainable housing is now the preferred choice for discerning buyers...',
    'https://images.unsplash.com/photo-1628592102751-ba83b03a442a?q=80&w=1974&auto=format&fit=crop',
    CURRENT_TIMESTAMP
),
(
    'A Guide to Modern Interior Trends in Chandigarh Homes',
    'modern-interior-trends-chandigarh',
    'From minimalism to biophilic design, discover the interior styles that are transforming modern apartments in the city.',
    'Interior design in Chandigarh is seeing a major shift towards natural materials and open spaces. We explore how local architects are blending traditional Punjabi warmth with global modernism...',
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop',
    CURRENT_TIMESTAMP
);
