# Mission Control 2045 - Replit Configuration

## Overview

Mission Control 2045 is a Space Force-themed educational puzzle game inspired by the ARC-AGI framework. The game challenges players to solve pattern recognition puzzles while advancing through military ranks. It's designed to develop fluid intelligence and abstract reasoning skills - cognitive abilities that humans excel at compared to AI systems.

The application targets young audiences, especially those interested in space exploration and STEM education, with a focus on making complex cognitive tasks accessible and engaging.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom Space Force color palette
- **UI Components**: shadcn/ui component library for consistent design
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **API**: RESTful endpoints for game data and player progress
- **Task Loading**: Modular JSON-based task system with file-based storage
- **Generation System**: Automated task generation using transformation templates

### Data Storage Solutions
- **Primary Database**: PostgreSQL with Drizzle ORM
- **Task Storage**: JSON files in `/server/data/tasks/` directory
- **Session Management**: connect-pg-simple for PostgreSQL session store
- **Development**: In-memory storage with JSON file fallback

## Key Components

### Game Engine
- **Task System**: 7 categories (Communications, Fuel Systems, Navigation, etc.)
- **Transformation Types**: 5 core ARC-AGI transformations (reflections, rotations, pattern completion)
- **Difficulty Scaling**: Progressive rank system from Specialist to Officer levels
- **Scoring System**: Points-based progression with time bonuses

### Task Generation System
- **Templates**: Category-specific templates in `/server/templates/`
- **Generators**: Automated grid generation for each transformation type
- **Validation**: Schema compliance and logical consistency checks
- **CLI Tools**: Command-line interface for task creation and testing

### User Interface
- **Mission Control Theme**: Dark space-themed UI with military aesthetics
- **Responsive Design**: Mobile-first approach with touch-friendly controls
- **Accessibility**: Colorblind-friendly emoji sets and clear visual hierarchy
- **Interactive Elements**: Grid-based puzzle interface with drag-and-drop functionality

## Data Flow

### Task Loading Process
1. JSON task files loaded from `/server/data/tasks/`
2. Tasks validated against schema during server startup
3. Emoji mappings applied from `spaceEmojis.ts`
4. Tasks served to frontend via REST API

### Player Progress Flow
1. Player creates account (optional) or plays as guest
2. Game state tracked in PostgreSQL database
3. Task completion updates player rank and points
4. Progress persisted across sessions

### Task Generation Flow
1. CLI tools generate tasks using transformation templates
2. Generated tasks validated against schema
3. Tasks written to JSON files in data directory
4. Server automatically reloads new tasks

## External Dependencies

### Core Dependencies
- **React Ecosystem**: react, react-dom, @types/react
- **Backend**: express, drizzle-orm, @neondatabase/serverless
- **UI Library**: @radix-ui components, tailwindcss, class-variance-authority
- **Development**: vite, typescript, tsx, cross-env

### Database Integration
- **PostgreSQL**: Production database with Drizzle ORM
- **Neon Database**: Serverless PostgreSQL provider
- **Session Store**: PostgreSQL-based session management

### Build Tools
- **Vite**: Frontend build tool with React plugin
- **ESBuild**: Backend bundling for production
- **TypeScript**: Static type checking across full stack

## Deployment Strategy

### Development Environment
- **Local Server**: Express server on port 5000 (Windows: 127.0.0.1)
- **Hot Reload**: Vite middleware for frontend development
- **File Watching**: Automatic task reloading during development

### Production Deployment
- **Platform**: Vercel with Node.js runtime
- **Build Process**: Vite for frontend, ESBuild for backend
- **Static Assets**: Served from `/dist/public/`
- **API Routes**: Serverless functions handling `/api/*` endpoints

### Configuration Files
- **Vercel**: `vercel.json` for deployment configuration
- **Database**: Drizzle config for PostgreSQL connection
- **TypeScript**: Unified config for client/server/shared code

## Changelog

```
Changelog:
- June 29, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```