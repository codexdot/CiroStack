import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

// Allow database to be optional for development with memory storage fallback
let pool: Pool | null = null;
let db: any = null;

// Temporarily disable database connection due to Supabase authentication issues
// Will use memory storage until DATABASE_URL is corrected
console.log('⚠️  Using memory storage - DATABASE_URL has authentication issues');
console.log('💡 Please check your Supabase DATABASE_URL and password');

// if (process.env.DATABASE_URL) {
//   try {
//     // Fix URL encoding issues with Supabase URLs that contain special characters
//     let connectionString = process.env.DATABASE_URL;
    
//     // URL encode the password portion if it contains special characters
//     const urlMatch = connectionString.match(/^postgresql:\/\/([^:]+):([^@]+)@(.+)$/);
//     if (urlMatch) {
//       const [, user, password, hostAndDb] = urlMatch;
//       const encodedPassword = encodeURIComponent(password);
//       connectionString = `postgresql://${user}:${encodedPassword}@${hostAndDb}`;
//     }
    
//     pool = new Pool({ connectionString });
//     db = drizzle({ client: pool, schema });
//     console.log('✅ Connected to PostgreSQL database');
//   } catch (error) {
//     console.error('❌ Database connection failed:', error.message);
//     console.log('⚠️  Falling back to memory storage for now');
//     console.log('💡 Please check your DATABASE_URL in Supabase settings');
//     db = null;
//     pool = null;
//   }
// } else {
//   console.log('⚠️  No DATABASE_URL found, using memory storage for development');
// }

export { pool, db };