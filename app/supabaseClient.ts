// app/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

// Ensure this code runs only in a server-side environment
if (typeof window !== 'undefined') {
    throw new Error('supabaseClient must not be used on the client side.');
}

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error("Supabase URL and Anon Key must be defined in environment variables.");
    throw new Error("Supabase environment variables are not set.");
}

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabaseClient;
