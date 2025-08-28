# Student Timetable Management System

## Overview

This is a full-stack web application for managing student timetables and assignments. The system allows students to browse class schedules, manage their personal class selections, and track assignments. It features a modern React frontend with shadcn/ui components and an Express.js backend with PostgreSQL database integration via Drizzle ORM.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

The frontend is built as a **Single Page Application (SPA)** using React with TypeScript:

- **Component Library**: Uses shadcn/ui components built on Radix UI primitives for consistent, accessible UI elements
- **Styling**: Tailwind CSS with a comprehensive design system including CSS custom properties for theming
- **State Management**: React Query (@tanstack/react-query) for server state management and caching
- **Routing**: wouter for lightweight client-side routing
- **Build System**: Vite for fast development and optimized production builds
- **Data Fetching**: Custom API request wrapper with React Query integration

**Key Design Patterns**:
- Component composition with reusable UI components
- Custom hooks for shared logic (theme management, mobile detection, toast notifications)
- Centralized API request handling with error boundaries
- Local storage integration for persisting user preferences

### Backend Architecture

The backend follows a **REST API** pattern with Express.js:

- **Framework**: Express.js with TypeScript for type safety
- **Architecture Pattern**: Layered architecture separating routes, business logic, and data access
- **Storage Interface**: Abstract storage interface (`IStorage`) with in-memory implementation for development
- **API Design**: RESTful endpoints for classes and assignments with proper HTTP status codes
- **Middleware**: Request logging, JSON parsing, and error handling

**Key Design Decisions**:
- Storage abstraction allows easy switching between database implementations
- Bulk operations support for efficient data loading
- Comprehensive error handling with consistent JSON responses
- Development-focused logging for API requests

### Data Storage Solutions

**Database**: PostgreSQL with Drizzle ORM
- **Schema Management**: Type-safe schema definitions with automatic TypeScript types
- **Migration System**: Drizzle Kit for database schema migrations
- **Connection**: Neon Database serverless PostgreSQL for cloud deployment
- **Validation**: Zod schemas integrated with Drizzle for runtime type checking

**Data Models**:
- Users: Authentication and user management
- Classes: Course schedules with timing and room information  
- Assignments: Task management with due dates and completion tracking
- UserClasses: Many-to-many relationship for personal class selections

**Local Storage**: Browser localStorage for persisting user preferences and class selections without requiring authentication

### Authentication and Authorization

Currently implements a **development-friendly approach**:
- No authentication required for basic functionality
- User management schema prepared for future implementation
- Session-based architecture ready with connect-pg-simple
- Local storage used for personal data persistence

## External Dependencies

### Database and ORM
- **Neon Database**: Serverless PostgreSQL database hosting
- **Drizzle ORM**: Type-safe database toolkit with PostgreSQL dialect
- **connect-pg-simple**: PostgreSQL session store for future authentication

### UI and Styling
- **Radix UI**: Comprehensive collection of accessible React components
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **Lucide React**: Icon library for consistent iconography
- **shadcn/ui**: Pre-built component system combining Radix UI with Tailwind

### Data and API Management
- **React Query**: Server state management with caching and synchronization
- **Zod**: Runtime type validation and schema definition
- **React Hook Form**: Form state management with validation

### Development and Build Tools
- **Vite**: Fast build tool with HMR and optimized production builds
- **TypeScript**: Static type checking across frontend and backend
- **ESBuild**: Fast JavaScript bundler for server-side code
- **Replit**: Development environment integration with error overlay and cartographer

### External Data Sources
- **Google Sheets API**: CSV export integration for importing class schedule data from external spreadsheets
- **Custom parsing logic**: Transforms spreadsheet data into database-compatible format

The system is designed for easy deployment on cloud platforms with environment-based configuration and supports both development and production environments.