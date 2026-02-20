import { NextResponse } from 'next/server'

const projects = [
    {
        id: '1',
        name: 'Prestige Heights',
        slug: 'prestige-heights',
        category: 'residential',
        city: 'Chandigarh',
        hero_image_url: 'https://images.unsplash.com/photo-1600596542815-e32870110237?q=80&w=2072&auto=format&fit=crop', // Luxury Villa Exterior
        gallery_images: [
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop', // Interior
            'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=2070&auto=format&fit=crop', // Living Room
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop'  // Pool
        ],
        price_min: 25000000,
        price_max: 50000000,
        status: 'ongoing',
        location_coords: { lat: 30.7333, lng: 76.7794 }
    },
    {
        id: '2',
        name: 'Cyber City Business Park',
        slug: 'cyber-city',
        category: 'commercial',
        city: 'Mohali',
        hero_image_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop', // Glass Building
        gallery_images: [
            'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop', // Office Interior
            'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop', // Meeting Room
            'https://images.unsplash.com/photo-1577412647305-991150c7d163?q=80&w=2070&auto=format&fit=crop'  // Lobby
        ],
        price_min: 150000000,
        price_max: 500000000,
        status: 'upcoming',
        location_coords: { lat: 30.7046, lng: 76.7179 }
    },
    {
        id: '3',
        name: 'The Grand Leasing',
        slug: 'grand-leasing',
        category: 'leasing',
        city: 'Panchkula',
        hero_image_url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop', // Modern Apartment
        gallery_images: [
            'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2080&auto=format&fit=crop', // Apartment Interior
            'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop', // Kitchen
            'https://images.unsplash.com/photo-1484154218962-a1c002085d2f?q=80&w=2070&auto=format&fit=crop'  // Bedroom
        ],
        price_min: 500000,
        price_max: 1500000,
        status: 'available',
        location_coords: { lat: 30.6942, lng: 76.8606 }
    },
    {
        id: '4',
        name: 'Skyline Residencies',
        slug: 'skyline-residencies',
        category: 'residential',
        city: 'Zirakpur',
        hero_image_url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop', // Luxury Home
        gallery_images: [
            'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?q=80&w=2070&auto=format&fit=crop', // Living Room
            'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop', // Pool
            'https://images.unsplash.com/photo-1580587771525-78b9dba3b91d?q=80&w=1974&auto=format&fit=crop'  // Garden
        ],
        price_min: 8500000,
        price_max: 15000000,
        status: 'completed',
        location_coords: { lat: 30.6425, lng: 76.8173 }
    },
    {
        id: '5',
        name: 'Tech Plaza',
        slug: 'tech-plaza',
        category: 'commercial',
        city: 'Chandigarh',
        hero_image_url: 'https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?q=80&w=2074&auto=format&fit=crop', // Tech Building
        gallery_images: [
            'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069&auto=format&fit=crop', // Office
            'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?q=80&w=2070&auto=format&fit=crop', // Workspace
            'https://images.unsplash.com/photo-1568992687947-868a62a9f521?q=80&w=2032&auto=format&fit=crop'  // Meeting
        ],
        price_min: 45000000,
        price_max: 80000000,
        status: 'ongoing',
        location_coords: { lat: 30.7100, lng: 76.8000 }
    }
]

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const limit = searchParams.get('limit')

    let filteredProjects = projects

    if (category && category !== '') {
        filteredProjects = filteredProjects.filter(p => p.category === category)
    }

    if (limit) {
        filteredProjects = filteredProjects.slice(0, parseInt(limit))
    }

    return NextResponse.json({
        projects: filteredProjects,
        pagination: {
            page: 1,
            limit: limit ? parseInt(limit) : 12,
            total: filteredProjects.length,
            pages: 1
        }
    })
}
