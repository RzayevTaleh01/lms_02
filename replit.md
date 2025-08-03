# DevCode Academy - Learning Management System

## Overview
DevCode Academy is a comprehensive Learning Management System (LMS) designed for programming education. It provides a modern web interface with role-based access for students, teachers, and administrators. Key capabilities include course enrollment, interactive lesson delivery, assignment submission, grading, and digital certificate verification. The platform aims to provide an intuitive and efficient learning environment, leveraging modern web technologies to support a robust educational experience.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: React 18 with TypeScript
- **Styling**: TailwindCSS with shadcn/ui
- **Routing**: Wouter
- **State Management**: TanStack Query
- **Forms**: React Hook Form with Zod validation
- **Build Tool**: Vite

### Backend
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ESM modules
- **Authentication**: Replit Auth with OpenID Connect
- **Session Management**: Express session with PostgreSQL store
- **API Design**: RESTful APIs with role-based access control

### Database
- **Database**: PostgreSQL (configured for Neon Database)
- **ORM**: Drizzle ORM
- **Schema Management**: Drizzle Kit

### Key Features
- **Authentication System**: Replit Auth integration, role-based access (admin, teacher, student), protected routes.
- **Course Management**: Course creation, hierarchical lesson organization, student enrollment, progress tracking.
- **Assignment System**: Assignment creation, submission handling (with file uploads), grading, and feedback.
- **Certificate System**: Automatic generation and public verification of digital certificates upon course completion.
- **Blog System**: Content management for blog posts with public access.
- **UI/UX Decisions**: Modern, clean design with consistent branding and a focus on intuitive user experience. Responsive design for various devices.

## External Dependencies
- **Database**: `@neondatabase/serverless`, `drizzle-orm`
- **Frontend Utilities**: `@tanstack/react-query`, `@radix-ui/`, `react-hook-form`, `zod`
- **Authentication**: `openid-client`, `passport`, `express-session`, `connect-pg-simple`
- **Development/Build Tools**: `vite`, `tailwindcss`, `tsx`, `esbuild`