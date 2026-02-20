import { NextResponse } from 'next/server'

const testimonials = [
    {
        id: '1',
        client_name: 'Rajesh Kumar',
        client_photo_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop',
        rating: 5,
        testimonial_text: 'Prestige Realty helped me find my dream home in Chandigarh. The process was seamless and professional.',
        project_id: '1'
    },
    {
        id: '2',
        client_name: 'Sarah Jenkins',
        client_photo_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2070&auto=format&fit=crop',
        rating: 5,
        testimonial_text: 'Investing in Cyber City Business Park was the best decision for my company. Excellent amenities and location.',
        project_id: '2'
    },
    {
        id: '3',
        client_name: 'Amit Singh',
        client_photo_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2070&auto=format&fit=crop',
        rating: 4,
        testimonial_text: 'Great leasing options available. Found the perfect retail space for my new showroom.',
        project_id: '3'
    }
]

export async function GET() {
    return NextResponse.json({ testimonials })
}
