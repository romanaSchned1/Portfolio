# Romana Schned Portfolio - Next.js

A modern portfolio website built with Next.js, React, and TypeScript.

## Getting Started

First, install the dependencies:

```bash
npm install
```

**Important:** Copy your `pics` folder to the `public` directory:

```bash
cp -r pics public/pics
```

You may also need to add your profile image and work images:
- `public/profile.jpg` - Your profile photo
- `public/hero.jpg` - Hero background image (optional)
- `public/work1.jpg`, `public/work2.jpg`, `public/work3.jpg` - Work portfolio images

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/` - Next.js app directory with pages and layout
- `components/` - React components
- `data/` - Data files (projects, etc.)
- `public/` - Static assets (images, videos) - **Copy your pics folder here as public/pics/**
- `pics/` - Original image assets (copy to public/pics)

## Build for Production

```bash
npm run build
npm start
```

## Features

- Responsive design
- Smooth scrolling navigation
- Interactive timeline
- Project showcase
- Contact section
- TypeScript support
- Modern React with Next.js 14

