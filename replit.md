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

## User Preferences

Preferred communication style: Simple, everyday language.