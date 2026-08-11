# THEDA Aluminium Ltd - Corporate Website

Welcome to the source code for the official corporate website of **THEDA Aluminium Ltd**, one of Nigeria's premier roofing and construction companies.

## Overview

This project is a modern, responsive, multi-page corporate web application built to showcase the services, projects, and history of THEDA Aluminium Ltd. It replaced an older, generic application architecture to deliver a highly optimized, brand-specific digital presence.

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (React)
- **Styling:** Vanilla CSS (App-wide styling in `globals.css`)
- **Hosting/Deployment:** [Vercel](https://vercel.com/)
- **Icons:** Inline SVG graphics

## Project Structure

- `/src/app/page.jsx`: The main landing page with dynamic sections.
- `/src/app/about/page.jsx`: Company history, mission, and vision.
- `/src/app/services/page.jsx`: Detailed breakdown of core roofing and structural services.
- `/src/app/projects/page.jsx`: Gallery of completed residential and commercial projects.
- `/src/app/contact/page.jsx`: Contact information and inquiry form.
- `/src/components/Header.jsx`: Global navigation menu.
- `/src/components/Footer.jsx`: Global footer with quick links and contact info.
- `/src/app/globals.css`: Core design system, variables, and utility classes.

## Getting Started

To run this project locally:

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run the development server:**
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

This project is configured for seamless deployment on Vercel.

1. Push the code to a GitHub repository.
2. Log into Vercel and click **Add New Project**.
3. Select your GitHub repository.
4. Vercel will automatically detect the Next.js framework and build the project with zero configuration required.

## Roadmap

Check the [ROADMAP.md](./ROADMAP.md) file for future development phases and planned features.
