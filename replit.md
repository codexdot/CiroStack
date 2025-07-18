# CiroStack Portfolio Application

## Overview

This is a modern portfolio application built with React and Express.js, showcasing AI/ML mobile development expertise. The application features a dark-themed design with a focus on artificial intelligence, machine learning, and mobile development projects.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

### Final Migration Completion (January 18, 2025)
- ✅ All migration checklist items completed successfully
- ✅ Supabase environment variables configured and client initialized  
- ✅ Navigation updated: Sign In button now directs to signup page
- ✅ Application fully functional with proper client/server separation
- ✅ Security practices implemented with graceful fallbacks for missing services
- ✅ Project ready for continued development and deployment

### Supabase Authentication Integration (January 18, 2025)
- Successfully implemented Supabase authentication system with signup and login functionality
- Created Auth.tsx page with tabbed interface for signup/signin forms and Google OAuth integration
- Added AuthCallback.tsx for handling OAuth redirects and session management
- Created useSupabaseAuth hook for authentication state management throughout the application
- Added Supabase client configuration with dynamic loading from server endpoint
- Integrated authentication routes in backend (signup, signin, signout) with Supabase API
- Updated navigation with login button linking to new authentication page (/login)
- Modified authentication flow to work independently of local database, using Supabase user metadata
- Fixed database connection issues by bypassing local storage for Supabase auth users

### Migration to Replit Environment (January 18, 2025)
- Successfully migrated project from Replit Agent to standard Replit environment
- All dependencies properly installed and configured
- Application server running successfully on port 5000
- Frontend and backend integration verified
- Made Supabase dependencies optional for development - application runs with memory storage fallback when Supabase environment variables aren't set
- Fixed authentication system to gracefully handle missing Supabase configuration
- Updated "Sign In" navigation button to redirect to signup page (/signup) instead of login page
- Database storage successfully connected, replacing memory storage for production use
- Custom authentication system fully functional with JWT tokens and password hashing
- Added Admin navigation link to both desktop and mobile menus
- Fixed admin page width constraints to never exceed 100vw with proper responsive design
- Fixed blog page navigation: moved "Back to Blog" button below header for better UX
- Improved footer alignment and responsive design with proper spacing and layout structure
- Implemented comprehensive theme toggle system with moon/sun icons positioned between logo and hamburger menu
- Enhanced light mode with sophisticated blue-toned color palette and clean white container backgrounds
- Updated all components to use theme-aware CSS variables for consistent styling across themes
- Set dark mode as default theme with localStorage persistence and automatic theme detection
- Enhanced contact form with React Hook Form and Zod validation (name, email, subject, message validation)
- Created comprehensive Projects page with category filtering and detailed project information
- Implemented cross-page navigation: clicking homepage sections from other pages navigates home and scrolls to section
- Added hash-based navigation support for deep linking to specific homepage sections
- Removed yellow focus outline from theme toggle button for better user experience
- Added scroll-to-top functionality for direct page navigation (home, projects, blog pages automatically scroll to top)
- Enhanced home page navigation with smooth scroll animation from previous position to top
- Updated URL hash fragments for homepage sections (AI/ML, Skills, Contact) to enable direct linking and proper browser history

### Custom Authentication System Implementation (January 18, 2025)
- Removed Replit Auth dependency and implemented custom JWT-based authentication system
- Added bcryptjs and jsonwebtoken packages for secure password hashing and token management
- Created comprehensive authentication infrastructure with user registration, login, and logout endpoints
- Updated database schema to include users table with encrypted passwords and admin privileges
- Implemented protected API routes with JWT middleware for admin functionality
- Updated frontend with new authentication hooks and login/logout UI components
- Created custom login form with username/password authentication
- Added localStorage JWT token storage and Authorization headers for API calls
- Implemented default admin user (username: admin, password: admin123) for development
- Enhanced navigation with proper logout functionality using custom auth system
- Configured for Supabase database backend with memory storage fallback for development

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for client-side routing
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Session Storage**: PostgreSQL-based session storage using connect-pg-simple
- **Development**: TSX for TypeScript execution

### Key Design Decisions
1. **Monorepo Structure**: Organized into `client/`, `server/`, and `shared/` directories for clear separation of concerns
2. **Type Safety**: Full TypeScript implementation across frontend and backend
3. **Modern Tooling**: Vite for frontend bundling, ESBuild for backend bundling
4. **Component-Based Architecture**: Reusable UI components with consistent design system

## Key Components

### Frontend Components
- **Navigation**: Fixed header with smooth scrolling navigation and routing to blog page
- **Hero Section**: Landing area with gradient design and call-to-action buttons
- **Projects**: Portfolio showcase with filtering and categorization
- **AI/ML Section**: Specialized section highlighting AI and machine learning work
- **Skills**: Technical skills display with experience timeline
- **Blog**: Separate blog page with full markdown support, syntax highlighting, and content management
- **Contact**: Contact form with validation and toast notifications

### Backend Components
- **Storage Interface**: Abstracted storage layer with in-memory implementation
- **Route Registration**: Centralized route management system
- **Development Server**: Vite integration for development with HMR support

### Shared Components
- **Database Schema**: Drizzle schema definitions for users table
- **Type Definitions**: Shared TypeScript types between frontend and backend

## Data Flow

### Frontend Data Flow
1. React components use TanStack Query for server state management
2. Form submissions handled through React Hook Form with Zod validation
3. Toast notifications for user feedback
4. Smooth scrolling navigation between sections

### Backend Data Flow
1. Express middleware for JSON parsing and request logging
2. Storage abstraction layer for database operations
3. Error handling middleware for consistent error responses
4. Session management with PostgreSQL storage

## External Dependencies

### Frontend Dependencies
- **React Ecosystem**: React, React DOM, React Hook Form
- **UI Framework**: Radix UI primitives, Tailwind CSS
- **State Management**: TanStack Query
- **Validation**: Zod with Hookform resolvers
- **Routing**: Wouter
- **Icons**: Font Awesome, Lucide React
- **Markdown Processing**: React Markdown, Remark GFM, Rehype Highlight, Rehype Raw

### Backend Dependencies
- **Server Framework**: Express.js
- **Database**: Drizzle ORM, @neondatabase/serverless
- **Session Management**: connect-pg-simple
- **Development**: TSX, Vite

### Development Dependencies
- **Build Tools**: Vite, ESBuild
- **TypeScript**: Full TypeScript support
- **Database Tools**: Drizzle Kit for migrations

## Deployment Strategy

### Production Build
1. **Frontend**: Vite builds optimized static assets to `dist/public`
2. **Backend**: ESBuild bundles server code to `dist/index.js`
3. **Database**: Drizzle migrations managed through `drizzle-kit`

### Development Workflow
1. Development server runs with `npm run dev`
2. Vite provides HMR for frontend development
3. TSX enables direct TypeScript execution for backend
4. Database schema changes pushed with `npm run db:push`

### Environment Configuration
- **Database**: PostgreSQL connection via `DATABASE_URL` environment variable
- **Development**: Replit-specific configurations and banners
- **Production**: Node.js production server with static file serving

The application is designed as a professional portfolio website with a focus on showcasing AI/ML and mobile development expertise, featuring a modern dark theme with cyan and magenta accent colors, smooth animations, and responsive design.