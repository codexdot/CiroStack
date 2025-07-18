import { createClient } from '@supabase/supabase-js';

// Initialize with placeholder values - will be loaded from server
let supabaseClient: any = null;

// Function to initialize Supabase client
export const initSupabaseClient = async () => {
  if (supabaseClient) return supabaseClient;
  
  try {
    const response = await fetch('/api/config/supabase');
    const config = await response.json();
    
    if (config.url && config.anonKey) {
      supabaseClient = createClient(config.url, config.anonKey);
      console.log('✅ Supabase client initialized');
    } else {
      console.error('❌ Invalid Supabase configuration received');
    }
  } catch (error) {
    console.error('❌ Failed to fetch Supabase config:', error);
  }
  
  return supabaseClient;
};

// Create a lazy-loading supabase export
export const getSupabase = async () => {
  if (!supabaseClient) {
    await initSupabaseClient();
  }
  return supabaseClient;
};

// For backward compatibility, create a simple client with fallback
// Only create if environment variables are available
export const supabase = import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY 
  ? createClient(
      import.meta.env.VITE_SUPABASE_URL, 
      import.meta.env.VITE_SUPABASE_ANON_KEY
    )
  : null;