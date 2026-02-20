'use client'

import { GoogleMap as GoogleMapComponent, Marker, LoadScript } from '@react-google-maps/api'

interface GoogleMapProps {
  center: { lat: number; lng: number }
  zoom?: number
}

export default function GoogleMap({ center, zoom = 15 }: GoogleMapProps) {
  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
    return (
      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
        <p className="text-gray-600">Google Maps API key not configured</p>
      </div>
    )
  }

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <GoogleMapComponent
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={center}
        zoom={zoom}
      >
        <Marker position={center} />
      </GoogleMapComponent>
    </LoadScript>
  )
}





