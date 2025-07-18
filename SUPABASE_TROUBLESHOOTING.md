# Supabase Connection Troubleshooting

## Current Issue
Your DATABASE_URL is causing authentication errors. This usually happens when:
1. The password contains special characters that aren't properly URL-encoded
2. The connection string format is incorrect
3. The password has been changed or reset

## How to Fix

### Step 1: Get the Correct Connection String
1. Go to your [Supabase Dashboard](https://supabase.com/dashboard/projects)
2. Select your project
3. Go to **Settings** → **Database**
4. Scroll to **Connection string** section
5. Select **Session pooler** (not Transaction pooler)
6. Copy the connection string that looks like:
   ```
   postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:5432/postgres
   ```

### Step 2: Important Notes
- Use **Session pooler** (port 5432) instead of Transaction pooler (port 6543)
- Make sure the password is exactly as you set it
- If your password contains special characters like `?`, `@`, `#`, etc., they need to be URL-encoded:
  - `?` becomes `%3F`
  - `@` becomes `%40`
  - `#` becomes `%23`
  - `&` becomes `%26`

### Step 3: Update Your Secret
1. In Replit, go to Secrets (lock icon)
2. Find the `DATABASE_URL` secret
3. Replace it with the corrected connection string
4. Click Update

### Step 4: Test Connection
Once you update the DATABASE_URL, I'll automatically:
- Reconnect to your database
- Create the necessary tables
- Set up authentication
- Initialize sample data