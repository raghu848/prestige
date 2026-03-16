import PropertyForm from '@/components/admin/PropertyForm'
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'

export default async function EditPropertyPage(props: {
  params: Promise<{ id: string }>
}) {
  const params = await props.params
  const supabase = await createClient()

  if (!supabase) {
    return (
      <div className="p-8 text-center bg-white rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-prestige-navy mb-2">Configuration Required</h2>
        <p className="text-gray-500">Supabase is not configured. Please add your credentials to .env.local to edit properties.</p>
      </div>
    )
  }

  const { data: property, error } = await supabase
    .from('properties')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error || !property) {
    notFound()
  }

  return (
    <div className="max-w-5xl mx-auto">
      <PropertyForm initialData={property} id={params.id} />
    </div>
  )
}
