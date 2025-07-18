import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

// Allow database to be optional for development with memory storage fallback
let pool: Pool | null = null;
let db: any = null;

if (process.env.DATABASE_URL) {
  try {
    console.log('🔄 Attempting Supabase connection...');
    
    // Handle Supabase connection string with potential special characters
    let connectionString = process.env.DATABASE_URL;
    
    // For Supabase, ensure we're using the session pooler (port 5432) not transaction pooler (port 6543)
    if (connectionString.includes(':6543/')) {
      console.log('⚠️  Detected transaction pooler URL, switching to session pooler...');
      connectionString = connectionString.replace(':6543/', ':5432/');
    }
    
    // URL encode the password portion if it contains special characters
    const urlMatch = connectionString.match(/^postgresql:\/\/([^:]+):([^@]+)@(.+)$/);
    if (urlMatch) {
      const [, user, password, hostAndDb] = urlMatch;
      // Only encode if password contains special characters
      if (/[?@#&%]/.test(password)) {
        const encodedPassword = encodeURIComponent(password);
        connectionString = `postgresql://${user}:${encodedPassword}@${hostAndDb}`;
        console.log('🔧 URL-encoded password with special characters');
      }
    }
    
    pool = new Pool({ connectionString });
    db = drizzle({ client: pool, schema });
    
    // Test connection with a simple query - but don't fail if tables don't exist
    console.log('🧪 Testing database connection...');
    await pool.query('SELECT 1 as test');
    
    console.log('✅ Connected to Supabase database');
  } catch (error) {
    console.error('❌ Supabase connection failed:', error.message);
    console.log('⚠️  Falling back to memory storage');
    console.log('💡 Check SUPABASE_TROUBLESHOOTING.md for help');
    db = null;
    pool = null;
  }
} else {
  console.log('⚠️  No DATABASE_URL found, using memory storage for development');
}

export { pool, db };