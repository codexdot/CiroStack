#!/usr/bin/env node

// Supabase Connection Diagnostics Script
// This script helps diagnose and fix Supabase connection issues

const { createClient } = require('@supabase/supabase-js');
const { Pool } = require('@neondatabase/serverless');

console.log('🔍 Supabase Connection Diagnostics\n');

// Check environment variables
console.log('📋 Environment Variables:');
console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? '✅ SET' : '❌ NOT SET');
console.log('SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY ? '✅ SET' : '❌ NOT SET');
console.log('DATABASE_URL:', process.env.DATABASE_URL ? '✅ SET' : '❌ NOT SET');

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
  console.log('\n❌ Missing Supabase credentials. Please check your environment variables.');
  process.exit(1);
}

if (!process.env.DATABASE_URL) {
  console.log('\n❌ Missing DATABASE_URL. Please check your environment variables.');
  process.exit(1);
}

// Test Supabase Auth Client
console.log('\n🔐 Testing Supabase Auth Client...');
try {
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
  console.log('✅ Supabase client created successfully');
  
  // Test a simple operation
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.log('⚠️  Auth test warning:', error.message);
  } else {
    console.log('✅ Supabase auth client operational');
  }
} catch (error) {
  console.log('❌ Supabase client error:', error.message);
}

// Test Database Connection
console.log('\n🗄️  Testing Database Connection...');
let connectionString = process.env.DATABASE_URL;

// Show current connection string format (masked)
const maskedUrl = connectionString.replace(/:([^@]+)@/, ':****@');
console.log('Connection string format:', maskedUrl);

// Check for common issues
if (connectionString.includes(':6543/')) {
  console.log('⚠️  Using transaction pooler (6543) - switching to session pooler (5432)');
  connectionString = connectionString.replace(':6543/', ':5432/');
}

// URL encode password if needed
const urlMatch = connectionString.match(/^postgresql:\/\/([^:]+):([^@]+)@(.+)$/);
if (urlMatch) {
  const [, user, password, hostAndDb] = urlMatch;
  if (/[?@#&%]/.test(password)) {
    console.log('🔧 Password contains special characters - encoding...');
    const encodedPassword = encodeURIComponent(password);
    connectionString = `postgresql://${user}:${encodedPassword}@${hostAndDb}`;
  }
}

try {
  const pool = new Pool({ connectionString });
  console.log('✅ Pool created successfully');
  
  // Test simple query
  const result = await pool.query('SELECT 1 as test');
  console.log('✅ Database connection successful');
  console.log('Test query result:', result.rows[0]);
  
  // Test if we can create a simple table
  console.log('\n🛠️  Testing table creation permissions...');
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS connection_test (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log('✅ Table creation successful');
    
    // Clean up test table
    await pool.query('DROP TABLE IF EXISTS connection_test');
    console.log('✅ Table cleanup successful');
    
  } catch (tableError) {
    console.log('❌ Table creation failed:', tableError.message);
  }
  
  await pool.end();
  
} catch (error) {
  console.log('❌ Database connection failed:', error.message);
  console.log('\n💡 Possible solutions:');
  console.log('1. Check if your Supabase project is active');
  console.log('2. Verify the database password is correct');
  console.log('3. Ensure you\'re using the Session pooler URL (port 5432)');
  console.log('4. Check if your DATABASE_URL has special characters that need encoding');
}

console.log('\n✅ Diagnostics completed');