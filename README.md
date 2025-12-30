# Aqarna - Real Estate Platform for Kuwait

A professional, production-ready Next.js application for real estate listings in Kuwait. Built with modern technologies and best practices.

## Features

- 🏠 Property listings for sale and rent
- 🔍 Advanced search functionality
- 📱 Fully responsive design
- 🎨 Modern UI with blue and white color scheme
- ⚡ Built with Next.js 14 App Router
- 🔒 TypeScript for type safety
- 🎯 shadcn/ui components
- ✨ Tailwind CSS for styling

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Linting**: ESLint

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── layout.tsx      # Root layout with header and footer
│   ├── page.tsx        # Homepage
│   └── globals.css     # Global styles
├── components/
│   ├── ui/             # shadcn/ui components
│   ├── Header.tsx      # Navigation header
│   ├── Footer.tsx      # Footer component
│   └── PropertyCard.tsx # Property listing card
├── lib/
│   └── utils.ts        # Utility functions
└── public/             # Static assets
```

## Color Scheme

The application uses a blue and white color scheme:
- Primary Blue: `hsl(217, 91%, 60%)`
- White background
- Gray accents for text and borders

## License

MIT


