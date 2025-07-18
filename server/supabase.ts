import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

// Make Supabase optional for development
let supabase: any = null;

if (supabaseUrl && supabaseAnonKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
    console.log('✅ Supabase client initialized');
  } catch (error) {
    console.error('❌ Failed to initialize Supabase client:', error);
    supabase = null;
  }
} else {
  console.log('⚠️  Supabase environment variables not set, Supabase features disabled');
  console.log('SUPABASE_URL:', supabaseUrl ? 'SET' : 'NOT SET');
  console.log('SUPABASE_ANON_KEY:', supabaseAnonKey ? 'SET' : 'NOT SET');
}

export { supabase };