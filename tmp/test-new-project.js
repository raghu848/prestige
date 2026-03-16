require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

async function testNewConnection() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    console.log('Testing connection to new project:', supabaseUrl);

    if (!supabaseUrl || !supabaseAnonKey) {
        console.error('Missing environment variables in .env.local!');
        process.exit(1);
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    try {
        const { data, error, status } = await supabase.from('properties').select('*').limit(1);

        if (error) {
            if (error.code === 'PGRST116' || error.message.includes('relation "public.properties" does not exist')) {
                console.log('Connection successful, but table "properties" does not exist yet.');
            } else {
                console.log('API Error:', error.message);
            }
        } else {
            console.log('Successfully connected and table exists!');
        }
    } catch (err) {
        console.error('Network error:', err.message);
    }
}

testNewConnection();
