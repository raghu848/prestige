'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const supabase = await createClient()

    if (!supabase) {
        return { error: 'Supabase is not configured. Please check your .env.local file.' }
    }

    try {
        console.log('Attempting Supabase login for:', email);
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            console.error('Supabase Auth Error:', error.message, error.status);
            if (error.message?.includes('Unexpected token') || error.message?.includes('is not valid JSON')) {
                return { error: 'Supabase service is returning an error (e.g. 525/504). Please ensure your project is restored and active in the Supabase Dashboard.' }
            }
            return { error: error.message }
        }

        console.log('Login successful for:', email);
    } catch (err: any) {
        console.error('CRITICAL LOGIN ERROR:', err);
        if (err.message?.includes('fetch failed')) {
            return { error: 'Network Connection Timeout. Please check if your Supabase project is active/restored and your internet allows connections to *.supabase.co' }
        }
        return { error: 'Internal Server Error during authentication.' }
    }

    // After successful login, redirect to dashboard
    redirect('/agent/dashboard')
}

export async function signOut() {
    const supabase = await createClient()
    await supabase?.auth.signOut()
    redirect('/agent/login')
}
