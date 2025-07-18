# Supabase Database Setup Instructions

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click "New Project"
4. Choose your organization
5. Fill in your project details:
   - **Project Name**: `cirostack-portfolio` (or any name you prefer)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose the region closest to you
6. Click "Create new project"

## Step 2: Get Your Database Connection URL

1. Once your project is created, go to **Settings** → **Database**
2. Scroll down to the **Connection string** section
3. Select **Connection pooling** → **Transaction pooler**
4. Copy the URI that looks like:
   ```
   postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-us-west-1.pooler.supabase.com:6543/postgres
   ```
5. Replace `[YOUR-PASSWORD]` with the database password you created in Step 1

## Step 3: Add Database URL to Replit

1. In Replit, go to the **Secrets** tab (lock icon in the left sidebar)
2. Click "New Secret"
3. Name: `DATABASE_URL`
4. Value: Paste your complete connection string from Step 2
5. Click "Add Secret"

## Step 4: Initialize the Database

Once you've added the DATABASE_URL secret, I'll automatically:
- Create all necessary tables (users, projects, blog_posts, sessions)
- Set up the default admin user
- Switch from memory storage to database storage

## What This Enables

✅ **Persistent Data**: Your projects, blog posts, and users will be saved permanently
✅ **Real Authentication**: User sessions and login data stored securely
✅ **Admin Features**: Full admin dashboard with database-backed content management
✅ **Scalability**: Ready for production deployment with reliable cloud database

## Security Notes

- Your database password is encrypted in Replit Secrets
- All API routes use JWT authentication
- Passwords are hashed with bcrypt before storage
- Admin privileges are properly enforced

---

**Ready to proceed?** Just add the DATABASE_URL secret and let me know when it's done!