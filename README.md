# Training Calendar

## Technologies Used

### Frontend

- **Next.js 15.2.0** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **TailwindCSS** - Utility-first CSS framework
- **clsx & tailwind-merge** - For conditional class name management
- **@hello-pangea/dnd** - Drag and drop functionality
- **date-fns** - Date manipulation library

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky & lint-staged** - Git hooks for code quality
- **TurboRepo** - Build system optimization
- **TypeScript** - Static type checking

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher recommended)
- npm, yarn, or pnpm package manager

## Installation

1. Install dependencies:

   ```bash
   # Using npm
   npm install

   # Using yarn
   yarn install

   # Using pnpm
   pnpm install
   ```

2. Run the development server:

   ```bash
   # Using npm
   npm run dev

   # Using yarn
   yarn dev

   # Using pnpm
   pnpm dev

   ```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

```
training-calendar/
├── app/                # Next.js App Router
├── components/         # Reusable UI components
│   ├── Icons/          # SVG icons
│   └── ui/             # UI components
├── mock/               # Mock data
├── public/             # Static assets
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```
