# DreamPath Creative Website Design Agency

## Overview

This is a cutting-edge Three.js-powered parallax scroll website for DreamPath creative website design agency. The website features immersive 3D animations, dynamic particle systems, morphing text effects, interactive elements, and seamless video integration in the hero section. Complete with advanced lighting systems and real-time visual effects.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with custom components
- **3D Graphics**: React Three Fiber with Three.js for immersive animations
- **Animation**: GSAP with ScrollTrigger for smooth page transitions and parallax effects
- **State Management**: Zustand for lightweight state management
- **Data Fetching**: TanStack Query for server state management
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Authentication**: Session-based authentication with cookies
- **Database**: PostgreSQL with Neon serverless
- **ORM**: Drizzle ORM for type-safe database operations
- **Storage**: In-memory storage interface with future database integration
- **API Design**: RESTful API with JSON responses

### Key Technologies
- **Runtime**: Node.js with ES modules
- **Development**: Hot module replacement (HMR) with Vite
- **TypeScript**: Strict type checking across the entire stack
- **Package Manager**: npm with lockfile version 3

## Key Components

### Database Schema
- **Users Table**: Basic user authentication with username/password
- **Extensible Design**: Schema designed to accommodate loan applications, user profiles, and financial data

### Frontend Components
- **Navigation**: Responsive navigation with smooth scroll anchoring
- **Hero Section**: 3D animated landing area with morphing text and video background
- **Services**: Creative services showcase with letter reveal animations
- **About/Portfolio**: Company information with typewriter effects and animated reveals
- **Contact**: Contact form with enhanced user experience
- **Advanced 3D Effects**: 
  - Floating geometric elements with physics-based movement
  - Interactive morphing geometry responding to mouse movement
  - Dynamic particle fields with scroll-based animations
  - Realistic cloud systems with weather-like motion
  - Scroll-responsive particle systems
  - Dynamic lighting that changes with user interaction

### UI System
- **Design System**: Complete component library with Radix UI primitives
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Accessibility**: ARIA-compliant components and keyboard navigation
- **Theme Support**: CSS custom properties for consistent styling

## Data Flow

### Authentication Flow
1. User registration/login through REST API endpoints
2. Session creation with secure cookies
3. Protected routes with session validation
4. User context management on frontend

### Application Flow
1. Landing page with 3D animations and loan product showcase
2. User registration/authentication
3. Loan application form (to be implemented)
4. Application processing and status tracking
5. Dashboard for loan management

### API Communication
- Frontend uses TanStack Query for data fetching
- RESTful endpoints with JSON payloads
- Error handling with proper HTTP status codes
- Session-based authentication with cookies

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL serverless connection
- **drizzle-orm**: Type-safe ORM with PostgreSQL dialect
- **@tanstack/react-query**: Server state management
- **gsap**: Professional-grade animations
- **@react-three/fiber**: React renderer for Three.js

### UI Dependencies
- **@radix-ui/***: Accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **@fontsource/inter**: Modern typography

### Development Dependencies
- **tsx**: TypeScript execution for server
- **esbuild**: Fast JavaScript bundler for production
- **vite**: Frontend build tool with HMR

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React app to `dist/public`
2. **Backend Build**: esbuild bundles server code to `dist/index.js`
3. **Database**: Drizzle Kit handles migrations and schema updates

### Production Setup
- **Server**: Node.js with Express serving both API and static files
- **Database**: PostgreSQL (Neon serverless) with connection pooling
- **Environment**: Environment variables for database URL and secrets
- **Static Assets**: Frontend served from `dist/public` directory

### Development Workflow
- **Hot Reload**: Vite dev server with API proxy
- **Type Safety**: Shared types between frontend and backend
- **Database Migrations**: `npm run db:push` for schema updates
- **Development Server**: `npm run dev` starts both frontend and backend

### Security Considerations
- Session-based authentication with secure cookies
- Environment variable protection for database credentials
- CORS configuration for cross-origin requests
- Input validation and sanitization (to be implemented)

### Scalability Features
- Serverless-ready database connection
- Modular component architecture
- Efficient bundle splitting with Vite
- Optimized 3D rendering with Three.js
- Performance-optimized particle systems
- GPU-accelerated visual effects

## Recent Changes (January 16, 2025)

### Advanced 3D Animation System
- **FloatingElements**: Physics-based floating geometric shapes with varied materials
- **MorphingGeometry**: Interactive wireframe geometry that responds to mouse movement
- **ScrollParticles**: 1000+ particle system that reacts to scroll position
- **ParticleField**: Customizable particle systems with wave motion
- **AnimatedBackground**: Dynamic wireframe plane with wave animations
- **InteractiveOrb**: Mouse-following 3D element with hover effects
- **DynamicLighting**: Scroll-responsive lighting system with animated point lights

### Enhanced Text Animation System
- **MorphingText**: Smooth word transitions for dynamic headlines
- **TypewriterText**: Scroll-triggered typewriter effect with customizable speed
- **LetterReveal**: Individual letter animations with 3D transforms
- **Text3D**: Three.js-based 3D text with multiple animation modes
- **Enhanced ParallaxText**: Improved parallax scrolling for text elements

### Performance Optimizations
- Efficient particle management with buffer geometries
- Optimized render loops with useFrame hooks
- Memory-conscious animation systems
- GPU-accelerated material rendering