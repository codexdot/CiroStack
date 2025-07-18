# CiroStack Portfolio Application

## Overview

This is a modern portfolio application built with React and Express.js, showcasing AI/ML mobile development expertise. The application features a dark-themed design with a focus on artificial intelligence, machine learning, and mobile development projects.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

### Migration to Replit Environment (January 18, 2025)
- Successfully migrated project from Replit Agent to standard Replit environment
- All dependencies properly installed and configured
- Application server running successfully on port 5000
- Frontend and backend integration verified
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