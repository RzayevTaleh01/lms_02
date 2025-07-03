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
- July 3, 2025: Complete DEVCODE LMS redesign with orange-yellow branding:
  - Full redesign of public interface pages (landing, courses, blog) with DEVCODE LMS branding
  - Updated color scheme to orange-yellow gradient theme reflecting brand identity
  - Landing page redesigned as comprehensive course management system showcase:
    * Hero section with DEVCODE LMS branding and orange-yellow gradients
    * Platform features highlighting interactive learning, progress tracking, and certification
    * Course showcase with modern card layouts and hover effects
    * LMS platform preview with actual interface mockups
    * Success stories section with student testimonials
    * Professional call-to-action sections
  - Courses page redesigned with:
    * Orange-yellow hero section with DEVCODE LMS branding
    * Enhanced course filtering and search functionality
    * Modern course cards with category-specific color coding
  - Blog page redesigned with:
    * Consistent orange-yellow hero section
    * Professional layout maintaining DEVCODE branding
  - Navigation and branding updates:
    * Updated navbar logo to "DEVCODE - Learning Management System"
    * Orange-yellow gradient logo icon with modern design
    * Consistent color scheme across all navigation elements
  - Footer redesigned with:
    * DEVCODE LMS branding and description
    * Updated social media and link hover colors
    * Professional dark theme with orange accents
  - CSS color system enhanced:
    * Added devcode-yellow and devcode-yellow-light color variables
    * Updated utility classes for new color scheme
    * Consistent branding across all interface elements
- July 3, 2025: Major hero section and navigation redesign with animations:
  - Completely redesigned hero section with modern white background layout
  - Added comprehensive animation system with custom CSS animations:
    * Floating elements, slow bounce, horizontal bounce effects
    * Fade-in, slide-up, scale hover animations with delay classes
    * Interactive hover effects and smooth transitions
  - Fully redesigned navbar with modern glass-effect design:
    * Backdrop blur and transparency effects
    * Animated logo with rotation and scale on hover
    * Modern pill-style navigation with gradient highlights
    * Enhanced auth buttons with improved styling
    * Animated dropdown menus with rounded corners
  - Greatly expanded DEVCODE LMS platform section:
    * Added detailed teacher panel features showcase
    * Comprehensive course management, assignment system descriptions
    * Real-time analytics, live class system, and certificate features
    * Enhanced platform preview with animated dashboard mockup
    * Multiple floating notification elements and interactive stats
    * Detailed feature cards with hover effects and check marks
  - Hero section improvements:
    * Two-column layout with content on left, dashboard preview on right
    * Interactive dashboard mockup showing actual LMS interface
    * Animated background elements with orange-yellow gradients
    * Professional typography with gradient text effects
    * Call-to-action buttons with hover animations
- July 3, 2025: Complete interface redesign from scratch based on user reference images:
  - Completely rebuilt landing page with clean, minimal Code Academy-style design:
    * Simple hero section with 3D-style illustration matching reference
    * Course categories with 3D gradient icons and hover effects
    * Blog section with colorful gradient cards exactly like reference images
    * Clean typography and minimal color scheme
  - Completely redesigned navbar with minimal, clean design:
    * Simple two-tier navigation structure (top links + main nav)
    * Clean "/code academy" logo design matching reference
    * Removed all complex animations and glass effects
    * Simple hover states and clean button styling
  - Rebuilt courses page with consistent design:
    * Same 3D-style course category cards as landing page
    * Clean search and filtering interface
    * Professional course cards with hover effects
    * Course count badges and category filtering
  - Rebuilt blog page with gradient cards design:
    * Colorful gradient blog cards exactly matching reference
    * Category filtering with rounded pill buttons
    * Newsletter subscription section
    * Clean search functionality and empty states
  - Design principles followed from reference images:
    * Minimal, clean interface without excessive animations
    * 3D-style icons with gradient backgrounds
    * Colorful gradient cards for content
    * Simple hover effects and clean typography
    * Gray background with white content sections
    * Professional, educational institution appearance
- July 3, 2025: Major programming-focused redesign and interactive platform showcase:
  - Hero banner slider with programming-themed visuals:
    * 3 animated slides with auto-advance every 5 seconds
    * Navigation dots in top right corner
    * Programming-themed illustrations with laptop, code, JS/CSS symbols
    * Real code syntax highlighting and animated elements
  - Complete course programs overhaul for programming focus:
    * 8 programming courses: JavaScript, React, Node.js, Full-Stack, Python, Database/SQL, Mobile App, DevOps
    * Custom 3D programming-themed icons for each course
    * Technology-specific color schemes and gradient backgrounds
  - Interactive platform preview section replacing generic LMS info:
    * Live code editor mockup with syntax highlighting
    * Real-time console output simulation
    * Browser-style interface showing actual DevCode LMS platform
    * Live mentor feedback and progress tracking visualization
    * Clear demonstration of interactive learning environment
  - Enhanced login modal with modern design:
    * DevCode LMS branding with gradient logo
    * Improved input styling and focus states
    * Better organized demo account information
    * Professional layout with proper spacing and typography
  - Removed all blog content as requested
  - Emphasis on interactive learning system with visual proof of platform capabilities
- July 3, 2025: Applied deployment fixes for production environment:
  - Enhanced environment variable validation with descriptive error messages
  - Added comprehensive environment configuration loader (server/env.ts)
  - Improved database connection error handling with deployment troubleshooting guides
  - Updated server startup with better error handling and status logging
  - Created detailed deployment documentation (DEPLOYMENT.md) with step-by-step instructions
  - Fixed production environment variable loading and validation
  - Added support for PORT environment variable in production
  - Implemented graceful startup failure handling with actionable error messages
- July 3, 2025: Complete redesign of LMS platform section with detailed system architecture:
  - Completely replaced "İnteraktiv Təhsil Sistemi" section with comprehensive system architecture visualization
  - Created detailed "DevCode LMS Sistem Arxitekturası" section with visual flow diagrams
  - Added comprehensive architecture layers visualization:
    * User Layer: Admin, Teacher, Student roles with distinct visual icons
    * Frontend Layer: React 18, UI/UX components, Routing, State management
    * Backend Layer: Express.js server, Authentication, Business logic
    * Database Layer: PostgreSQL, Drizzle ORM, Data models, Session store
  - Enhanced with visual system components diagram showing data flow
  - Added system features grid showcasing technical capabilities:
    * Video streaming with YouTube integration
    * Real-time progress tracking and analytics
    * Assignment engine with automatic grading
    * Digital certificate system with verification
  - Created architecture benefits section highlighting scalability, type safety, and modern stack
  - Used professional gradient color schemes and technical iconography
  - Focused on technical audience with detailed component descriptions
  - Removed generic LMS marketing content in favor of technical architecture documentation
- July 3, 2025: Simplified LMS section for student audience:
  - Completely removed technical system architecture details (PostgreSQL, TypeScript, etc.)
  - Redesigned to focus on student benefits and platform usability
  - Changed from "Sistem Arxitekturası" to "Nə üçün DevCode LMS?"
  - Added student-focused features: video lessons, assignments, progress tracking, certificates
  - Used simple, everyday language instead of technical terms
  - Replaced complex diagrams with student dashboard mockup
  - Emphasized ease of use, mobile compatibility, and teacher support
  - Made content accessible and encouraging for non-technical users
- July 3, 2025: Complete redesign of Tədris proqramları (Training Programs) section:
  - Completely replaced old simple course cards with modern, professional course cards
  - Changed from 4-column grid to 3-column grid for better space utilization
  - Added detailed course information including: badges, pricing, duration, features
  - Implemented hover effects and animations (scale, shadow, translate)
  - Added course pricing in Azerbaijani Manat (₼) with monthly billing
  - Created distinct course categories: JavaScript (Popular), React (Advanced), Node.js (Backend), Full-Stack (Premium), Python (Beginner Friendly), Mobile (React Native & Flutter)
  - Enhanced with professional course features lists and call-to-action buttons
  - Added comprehensive CTA section with career consultation offer
  - Maintained student-focused language while adding professional appeal
- July 3, 2025: Major LMS showcase redesign with authentic system data:
  - Updated DevCode LMS showcase to reflect actual system capabilities based on database schema analysis
  - Replaced generic features with real implemented functionality:
    * 25+ database tables with PostgreSQL relations and constraints
    * 3-level role system (Admin/Teacher/Student) with Replit Auth integration
    * Course engine with lessons, materials, and assignments hierarchy
    * Assignment engine with rich text, file upload, and GitHub integration
    * Video streaming with YouTube integration and progress tracking
    * Real-time analytics and attendance tracking system
    * Certificate generation with unique ID verification system
    * Blog system with content management capabilities
  - Created authentic dashboard mockup showing real interface elements
  - Updated technical descriptions to match actual TypeScript/React/PostgreSQL stack
  - Enhanced with enterprise-level terminology and accurate system specifications
  - Focused on impressing users with real technical capabilities rather than marketing promises
- July 3, 2025: Fixed color contrast issue in training programs section:
  - Fixed "Pulsuz məsləhət al" button text visibility issue
  - Changed from orange text to black text with inline styling
  - Added shadow and border for better contrast against gradient background
  - Ensured proper readability and accessibility
- July 3, 2025: Redesigned admin panel sidebar to match teacher panel design:
  - Created AdminSidebar component following TeacherSidebar design patterns
  - Updated admin dashboard, admin-courses, admin-teachers, and admin-students pages
  - Replaced old complex Sidebar component with new clean AdminSidebar
  - Admin sidebar features: Azerbaijani navigation (Ana Panel, Kurslar, Müəllimlər, Tələbələr, Parametrlər)
  - Consistent white background design matching teacher and student panels
  - Blue accent colors for admin panel (bg-blue-500, bg-blue-50, text-blue-700) vs orange for teacher
  - Mobile responsive design with backdrop overlay and transform animations
  - Fixed responsive layout issues across all admin pages (lg:ml-64 for desktop)
- July 3, 2025: Redesigned teacher panel sidebar to match student panel format:
  - Updated teacher sidebar with Azerbaijani language navigation
  - Changed from complex gradient design to clean white background matching student sidebar
  - Updated navigation: Ana Panel, Kurslarım, Tələbələrim, Dərs Tarixçəsi, Çıxış
  - Created TeacherSidebar component with same format as StudentSidebar
  - Updated all teacher pages to use new sidebar component
  - Added /session-history route for teacher lesson history page
  - Fixed session history functionality - teachers can now view past lesson sessions
  - Fixed responsive design issues in teacher panel:
    * Removed problematic CSS variables (marginLeft: var(--sidebar-width))
    * Updated all teacher pages to use responsive classes (lg:ml-64)
    * Fixed mobile layout gaps and spacing issues
    * Ensured proper responsiveness across all teacher interface pages
- July 3, 2025: Fixed admin panel layout spacing issues:
  - Removed unnecessary mobile menu buttons from admin page headers
  - Added proper mobile menu buttons to admin panel (fixed top-right position)
  - Fixed layout spacing issues that caused gaps in admin dashboard
  - Ensured consistent mobile navigation across all admin pages (dashboard, courses, students)
  - Mobile menu button only shows on mobile devices (lg:hidden) with proper z-index positioning
  - Removed lg:ml-64 margin classes from all admin pages to eliminate sidebar-content spacing gap
  - AdminSidebar now uses lg:relative positioning for proper flex layout without margin conflicts
- July 3, 2025: Made all sidebars fixed position with full height:
  - Updated AdminSidebar to use fixed positioning (lg:fixed) instead of relative
  - Updated TeacherSidebar to use fixed positioning for consistent behavior
  - Updated StaticSidebar (student) to use h-full instead of h-screen
  - All sidebars now maintain fixed position and do not move during scroll
  - Restored lg:ml-64 margin to admin pages to accommodate fixed sidebar positioning
  - Ensured consistent 100% height across all sidebar components
  - Fixed teacher dashboard pending assignments display:
    * Created new API endpoint /api/teacher/pending-submissions for real data
    * Replaced static "12" with dynamic count of ungraded submissions
    * Teacher panel now shows actual pending assignment count from database
    * API fetches all assignments from teacher's courses and filters ungraded submissions
  - Fixed attendance system duplicate records issue:
    * Modified markAttendance function to use upsert logic instead of always inserting new records
    * Now checks if attendance record already exists for student/session combination
    * Updates existing record or creates new one to prevent duplicate entries
    * Eliminates issue where new attendance overwrites previous attendance calculations
  - Fixed global active session bar overlapping sidebar:
    * Added lg:left-64 class to position bar beside sidebar on desktop screens
    * Reduced z-index from 60 to 45 to prevent overlapping issues
    * Bar now properly respects sidebar width (256px) and displays correctly

## User Preferences

Preferred communication style: Simple, everyday language.