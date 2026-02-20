-- Seed data for Prestige Realty
-- Run this after schema.sql

-- Insert sample agents
INSERT INTO agents (email, password_hash, first_name, last_name, phone, role) VALUES
('admin@prestigerealty.com', '$2a$10$rOzJ8K8K8K8K8K8K8K8K8O8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K', 'Admin', 'User', '+91-9876543210', 'admin'),
('rajesh.kumar@prestigerealty.com', '$2a$10$rOzJ8K8K8K8K8K8K8K8K8O8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K', 'Rajesh', 'Kumar', '+91-9876543211', 'agent'),
('priya.sharma@prestigerealty.com', '$2a$10$rOzJ8K8K8K8K8K8K8K8K8O8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K', 'Priya', 'Sharma', '+91-9876543212', 'agent');

-- Insert sample projects
INSERT INTO projects (
    name, slug, category, status, address, city, state, pincode,
    location_coords, price_min, price_max, bhk, built_up_area_min, built_up_area_max,
    description, overview, amenities, hero_image_url, image_urls,
    meta_title, meta_description, agent_id, published_at
) VALUES
(
    'Luxury Skyline Towers',
    'luxury-skyline-towers',
    'residential',
    'ongoing',
    'Sector 5, Chandigarh',
    'Chandigarh',
    'Punjab',
    '160005',
    POINT(30.7333, 76.7794),
    25000000,
    85000000,
    '3BHK, 4BHK',
    1800,
    3500,
    'Experience luxury living at its finest in the heart of Chandigarh. Skyline Towers offers premium 3BHK and 4BHK apartments with world-class amenities.',
    'Located in the prime Sector 5, Luxury Skyline Towers is a modern residential complex featuring spacious apartments, premium finishes, and state-of-the-art amenities. Perfect for families seeking luxury and comfort.',
    '["Swimming Pool", "Gymnasium", "Clubhouse", "Landscaped Gardens", "24/7 Security", "Power Backup", "Parking", "Elevators", "Children Play Area", "Jogging Track"]'::jsonb,
    '/images/projects/skyline-towers-hero.jpg',
    '["/images/projects/skyline-towers-1.jpg", "/images/projects/skyline-towers-2.jpg", "/images/projects/skyline-towers-3.jpg"]'::jsonb,
    'Luxury Skyline Towers - Premium 3BHK & 4BHK Apartments in Chandigarh',
    'Discover luxury living at Skyline Towers, Sector 5, Chandigarh. Premium 3BHK and 4BHK apartments starting from ₹2.5 Cr. World-class amenities included.',
    (SELECT id FROM agents WHERE email = 'rajesh.kumar@prestigerealty.com'),
    CURRENT_TIMESTAMP
),
(
    'Prestige Business Hub',
    'prestige-business-hub',
    'commercial',
    'ongoing',
    'Sector 17, Chandigarh',
    'Chandigarh',
    'Punjab',
    '160017',
    POINT(30.7415, 76.7847),
    50000000,
    200000000,
    NULL,
    2000,
    10000,
    'Premium Grade-A commercial spaces in the heart of Chandigarh business district. Ideal for corporates and retail businesses.',
    'Prestige Business Hub offers premium office and retail spaces with modern infrastructure, ample parking, and strategic location advantages.',
    '["24/7 Security", "Elevators", "Parking", "Power Backup", "High-Speed Internet", "Conference Rooms", "Cafeteria", "ATM"]'::jsonb,
    '/images/projects/business-hub-hero.jpg',
    '["/images/projects/business-hub-1.jpg", "/images/projects/business-hub-2.jpg"]'::jsonb,
    'Prestige Business Hub - Premium Commercial Spaces in Sector 17, Chandigarh',
    'Premium Grade-A commercial spaces in Sector 17, Chandigarh. Office and retail spaces from ₹5 Cr. Strategic location with modern amenities.',
    (SELECT id FROM agents WHERE email = 'priya.sharma@prestigerealty.com'),
    CURRENT_TIMESTAMP
),
(
    'Elite Residency',
    'elite-residency',
    'residential',
    'upcoming',
    'Sector 8, Chandigarh',
    'Chandigarh',
    'Punjab',
    '160008',
    POINT(30.7289, 76.7894),
    15000000,
    45000000,
    '2BHK, 3BHK',
    1200,
    2200,
    'Modern 2BHK and 3BHK apartments in a prime location. Pre-launch offers available.',
    'Elite Residency brings you thoughtfully designed apartments with modern amenities and excellent connectivity.',
    '["Swimming Pool", "Gymnasium", "Clubhouse", "Security", "Parking", "Power Backup"]'::jsonb,
    '/images/projects/elite-residency-hero.jpg',
    '["/images/projects/elite-residency-1.jpg"]'::jsonb,
    'Elite Residency - Modern 2BHK & 3BHK Apartments in Sector 8, Chandigarh',
    'Pre-launch: Modern 2BHK and 3BHK apartments in Sector 8, Chandigarh. Starting from ₹1.5 Cr. Book now for exclusive offers.',
    (SELECT id FROM agents WHERE email = 'rajesh.kumar@prestigerealty.com'),
    NULL
),
(
    'Corporate Suites - Leasing',
    'corporate-suites-leasing',
    'leasing',
    'ongoing',
    'Sector 22, Chandigarh',
    'Chandigarh',
    'Punjab',
    '160022',
    POINT(30.7500, 76.8000),
    50000,
    200000,
    NULL,
    1000,
    5000,
    'Fully furnished corporate suites available for lease. Flexible terms, short and long-term options.',
    'Premium furnished office spaces available for lease. Perfect for startups, corporates, and businesses looking for flexible workspace solutions.',
    '["Fully Furnished", "High-Speed Internet", "24/7 Security", "Parking", "Power Backup", "Housekeeping", "Reception Services"]'::jsonb,
    '/images/projects/corporate-suites-hero.jpg',
    '["/images/projects/corporate-suites-1.jpg"]'::jsonb,
    'Corporate Suites - Premium Furnished Office Spaces for Lease in Chandigarh',
    'Fully furnished corporate suites for lease in Sector 22, Chandigarh. Flexible terms from ₹50K/month. Perfect for businesses.',
    (SELECT id FROM agents WHERE email = 'priya.sharma@prestigerealty.com'),
    CURRENT_TIMESTAMP
),
(
    'Grand Villas',
    'grand-villas',
    'residential',
    'completed',
    'Sector 12, Chandigarh',
    'Chandigarh',
    'Punjab',
    '160012',
    POINT(30.7200, 76.7700),
    80000000,
    150000000,
    '4BHK, 5BHK',
    4000,
    6000,
    'Luxury independent villas with private gardens and premium amenities. Limited units available.',
    'Grand Villas offers the ultimate in luxury living with spacious independent villas, private gardens, and world-class facilities.',
    '["Private Garden", "Swimming Pool", "Gymnasium", "Clubhouse", "24/7 Security", "Power Backup", "Parking", "Home Automation"]'::jsonb,
    '/images/projects/grand-villas-hero.jpg',
    '["/images/projects/grand-villas-1.jpg", "/images/projects/grand-villas-2.jpg"]'::jsonb,
    'Grand Villas - Luxury Independent Villas in Sector 12, Chandigarh',
    'Luxury independent 4BHK and 5BHK villas in Sector 12, Chandigarh. Starting from ₹8 Cr. Limited units available.',
    (SELECT id FROM agents WHERE email = 'rajesh.kumar@prestigerealty.com'),
    CURRENT_TIMESTAMP
);

-- Insert sample testimonials
INSERT INTO testimonials (project_id, client_name, rating, testimonial_text, is_featured) VALUES
(
    (SELECT id FROM projects WHERE slug = 'luxury-skyline-towers'),
    'Amit Singh',
    5,
    'Excellent service and beautiful property. The team at Prestige Realty made our home buying experience smooth and hassle-free.',
    true
),
(
    (SELECT id FROM projects WHERE slug = 'luxury-skyline-towers'),
    'Sunita Mehta',
    5,
    'We are extremely happy with our new home. The quality of construction and amenities exceeded our expectations.',
    true
),
(
    (SELECT id FROM projects WHERE slug = 'prestige-business-hub'),
    'Rahul Verma',
    5,
    'Perfect location for our office. The commercial space is well-designed and the facilities are top-notch.',
    true
);

-- Insert sample inquiries
INSERT INTO inquiries (project_id, name, email, phone, message, inquiry_type, status) VALUES
(
    (SELECT id FROM projects WHERE slug = 'luxury-skyline-towers'),
    'Vikram Sharma',
    'vikram.sharma@email.com',
    '+91-9876543213',
    'Interested in 3BHK apartment. Please share more details.',
    'general',
    'new'
),
(
    (SELECT id FROM projects WHERE slug = 'prestige-business-hub'),
    'Anita Desai',
    'anita.desai@email.com',
    '+91-9876543214',
    'Looking for office space around 3000 sqft.',
    'consultation',
    'contacted'
);





