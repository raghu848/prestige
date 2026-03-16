import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    console.log('--- Supabase Browser Client Init ---');
    console.log('URL:', supabaseUrl);
    console.log('Key (first 10 chars):', supabaseAnonKey?.substring(0, 10) + '...');
    console.log('------------------------------------');

    if (!supabaseUrl || supabaseUrl === 'your-project-url' || !supabaseAnonKey || supabaseAnonKey === 'your-anon-key') {
        console.error('Supabase Browser configuration missing or using placeholders!');
        return null;
    }

    return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
