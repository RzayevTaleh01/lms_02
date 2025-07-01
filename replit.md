# DevCode Academy - Learning Management System

## Overview

DevCode Academy is a comprehensive learning management system (LMS) built for programming education. The platform serves students, teachers, and administrators with role-based access control and comprehensive course management features. It provides a modern web interface for course enrollment, lesson delivery, assignment submission, and certificate verification.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: TailwindCSS with shadcn/ui component library
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state
- **Forms**: React Hook Form with Zod validation
- **Build Tool**: Vite with custom configuration for development and production

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ESM modules
- **Authentication**: Replit Auth with OpenID Connect
- **Session Management**: Express session with PostgreSQL store
- **API Design**: RESTful APIs with role-based access control

### Database Layer
- **Database**: PostgreSQL (configured for Neon Database)
- **ORM**: Drizzle ORM with type-safe queries
- **Schema Management**: Drizzle Kit for migrations
- **Connection**: Neon serverless connection pooling

## Key Components

### Authentication System
- **Provider**: Replit Auth integration with OpenID Connect
- **Session Storage**: PostgreSQL-backed sessions using connect-pg-simple
- **Role-Based Access**: Three user roles (admin, teacher, student) with different permissions
- **Protected Routes**: Role-based route protection on both frontend and backend

### Course Management
- **Course Creation**: Teachers can create and manage courses
- **Lesson Organization**: Hierarchical lesson structure within courses
- **Enrollment System**: Students can enroll in courses
- **Progress Tracking**: Student progress monitoring per course

### Assignment System
- **Assignment Creation**: Teachers can create assignments for courses
- **Submission Handling**: Students can submit assignments with file uploads
- **Grading**: Teachers can grade and provide feedback on submissions

### Certificate System
- **Certificate Generation**: Automatic certificate generation upon course completion
- **Verification Portal**: Public certificate verification using unique IDs
- **Digital Certificates**: Secure certificate storage and validation

### Blog System
- **Content Management**: Blog post creation and management
- **Public Access**: Blog posts accessible without authentication
- **Rich Content**: Support for formatted blog content

## Data Flow

### User Authentication Flow
1. User clicks login → Redirected to Replit Auth
2. Replit Auth validates → Returns user claims
3. Session created in PostgreSQL → User redirected to dashboard
4. Role-based dashboard routing (admin/teacher/student)

### Course Enrollment Flow
1. Student browses courses → Selects course
2. Enrollment request → Database validation
3. Enrollment record created → Student gains course access
4. Progress tracking initiated → Student can access lessons

### Assignment Submission Flow
1. Teacher creates assignment → Assignment stored in database
2. Students access assignment → Submit work through form
3. Submission stored → Teacher notified
4. Teacher grades submission → Feedback provided to student

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection
- **drizzle-orm**: Type-safe database queries and schema management
- **@tanstack/react-query**: Server state management and caching
- **@radix-ui/**: Accessible UI component primitives
- **react-hook-form**: Form handling and validation
- **zod**: Runtime type validation and schema definition

### Authentication Dependencies
- **openid-client**: OpenID Connect client for Replit Auth
- **passport**: Authentication middleware
- **express-session**: Session management
- **connect-pg-simple**: PostgreSQL session store

### Development Dependencies
- **vite**: Build tool and development server
- **tailwindcss**: Utility-first CSS framework
- **tsx**: TypeScript execution for Node.js
- **esbuild**: JavaScript bundler for production builds

## Deployment Strategy

### Development Environment
- **Dev Server**: Vite development server with hot module replacement
- **Backend**: tsx for TypeScript execution with automatic restarts
- **Database**: Neon PostgreSQL with development connection string
- **Environment**: Replit environment with cartographer integration

### Production Build
- **Frontend**: Vite production build with optimizations
- **Backend**: esbuild bundling for Node.js deployment
- **Assets**: Static file serving with Express
- **Database**: Production PostgreSQL with connection pooling

### Environment Configuration
- **Database**: `DATABASE_URL` for PostgreSQL connection
- **Auth**: `REPLIT_DOMAINS`, `ISSUER_URL`, `SESSION_SECRET` for authentication
- **Build**: Separate development and production configurations

## Changelog

- June 29, 2025: Initial setup with PostgreSQL database and Replit Auth
- June 29, 2025: Enhanced teacher course management system with comprehensive features:
  - Added complete course creation and management functionality
  - Implemented video lesson organization (Udemy-style)
  - Created assignment system with deadlines, grading, and feedback
  - Built attendance tracking system for offline classes
  - Added real-time lesson session management
  - Fixed database migration issues and commands (npm run db:push, npm run db:generate)
  - Database structure now includes: lesson_sessions, attendance, lesson_materials, lesson_assignments tables
- June 30, 2025: Completed migration from Replit Agent to standard Replit environment:
  - Fixed lesson creation validation errors (duration type conversion, orderIndex auto-generation)
  - Implemented comprehensive lesson management system with CKEditor integration
  - Added enhanced lesson detail view with video display, rich text content, materials, and assignments
  - Teachers can now create lessons with: title, description, rich HTML content, video URL, duration
  - Added lesson materials system: videos, documents, external links with rich descriptions
  - Added lesson assignments system: title, rich description, deadlines, point values
  - Implemented YouTube video embedding and fallback display for unsupported URLs
  - Enhanced UI with proper tabs for materials and assignments within lesson details
  - Updated teacher panel design with simple color tones matching student panel design:
    * Changed from orange/vibrant colors to subtle gray color scheme
    * Updated teacher dashboard, courses, and students pages with minimal gray-white design
    * Maintained functionality while simplifying visual appearance
- July 1, 2025: Major optimization of student course interface:
  - Created StaticSidebar component to eliminate performance delays during navigation
  - Fixed sidebar height and display issues with proper full-height static positioning
  - Implemented robust YouTube video embedding with better error handling and fallback options
  - Added comprehensive course progress tracking system showing lesson completion percentages
  - Fixed assignment resubmission workflow - students can now properly edit and resubmit returned assignments
  - Enhanced responsive design for mobile and tablet devices
  - Improved assignment status display with clear visual indicators (returned, graded, waiting)
  - Added proper form population for returned assignments with teacher feedback display
  - Optimized lesson navigation with progress indicators and completion tracking
  - Implemented overall course progress calculation and display in header
  - Replaced custom sidebar with original student panel sidebar for consistency
  - Updated all data fetching to use backend APIs instead of static data
  - Added mobile menu toggle functionality for responsive navigation
  - Integrated dynamic user data loading through useAuth hook
- July 1, 2025: Major routing system optimization:
  - Completely refactored App.tsx routing structure for better maintainability
  - Created ProtectedRoute component to handle role-based access control
  - Eliminated complex conditional rendering with cleaner route organization
  - Separated admin routes (/admin, /admin/teachers, /admin/courses, /admin/students)
  - Organized teacher routes (/teacher, /teacher/courses, /teacher/students)
  - Structured student routes (/student, /student/courses, /student/assignments)
  - Added proper authentication and authorization checking for each route
  - Improved error handling for unauthorized access attempts
  - Moved Teachers management to separate page (/admin/teachers) from dashboard tabs
- July 1, 2025: Major public interface redesign:
  - Completely redesigned all public pages (landing, courses, blog) with modern, professional design
  - Landing page now showcases DevCode Academy as educational institution with:
    * Hero section highlighting academy's mission and statistics
    * About section explaining academy's values and standards
    * Learning Management System features showcase for teachers and students
    * Statistics section with real numbers and achievement highlights
    * Featured courses section with improved card design
    * "Why Choose DevCode" section highlighting unique advantages
  - Courses page redesigned with:
    * Professional hero section with academy branding
    * Advanced filtering system with improved UX
    * Modern course cards with better visual hierarchy
    * Placeholder courses when no data available
    * Enhanced enrollment workflow for students
  - Blog page completely redesigned with:
    * Professional blog layout with featured article section
    * Category filtering system
    * Modern article cards with author information
    * Newsletter subscription section
    * Mock blog content in Azerbaijani language showcasing technical topics
  - Consistent design language across all public pages:
    * Blue-indigo gradient hero sections
    * Modern card-based layouts with shadows and hover effects
    * Professional typography and spacing
    * Mobile-responsive design
    * Azerbaijani language content for local market appeal

## User Preferences

Preferred communication style: Simple, everyday language.