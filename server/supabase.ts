import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

let supabase: any = null;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing required Supabase environment variables');
  console.error('SUPABASE_URL:', supabaseUrl ? 'SET' : 'NOT SET');
  console.error('SUPABASE_ANON_KEY:', supabaseAnonKey ? 'SET' : 'NOT SET');
  console.log('⚠️  Supabase client will be disabled - authentication will fall back to local storage');
  supabase = null;
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
  console.log('✅ Supabase client initialized');
}

export { supabase };