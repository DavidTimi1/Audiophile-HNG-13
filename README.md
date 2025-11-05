# Audiophile

Audiophile is a frontend project for the **HNG 13 Stage 3A task**. It is a modern e-commerce platform for audio products, built with **Next.js** and integrated with **Convex** for backend functionality.

## Table of Contents

* [Features](#features)
* [Technologies Used](#technologies-used)
* [Project Structure](#project-structure)
* [Getting Started](#getting-started)

  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
  * [Environment Variables](#environment-variables)
  * [Running the Project](#running-the-project)
* [Build and Deployment](#build-and-deployment)
* [License](#license)


## Features

* Dynamic routing for product categories and pages.
* API integration using Convex for managing cart, orders, and other backend actions.
* Responsive design with reusable components.
* State management using React Context Providers.
* Optimized for performance with Next.js features such as **Server-Side Rendering (SSR)** and **Static Site Generation (SSG)**.


## Technologies Used

* **Next.js**: React framework for building server-rendered and static web applications.
* **Convex**: Backend-as-a-service for managing database actions and real-time updates.
* **TypeScript**: Strongly typed programming language for better code quality.
* **Tailwind CSS & PostCSS**: Styling and CSS processing.
* **ESLint**: Linting tool to maintain code quality.
* **React**: Component-based UI library.


## Project Structure

The project is organized as follows:

```
Audiophile/
├─ components/       # Reusable UI components (NavBar, CartButton, etc.)
├─ lib/              # Utility functions and data fetching helpers
├─ pages/            # Next.js pages (Home, Categories, Product Pages)
├─ public/           # Static assets (images, icons)
├─ styles/           # Global CSS and Tailwind config
├─ convex/           # Convex backend functions
├─ .env.local        # Environment variables (not committed)
├─ next.config.js    # Next.js configuration
├─ package.json      # Project dependencies and scripts
```


## Getting Started

### Prerequisites

Make sure you have the following installed:

* **Node.js** v16 or higher
* **npm** or **yarn**
* **Convex CLI**: Install via

  ```bash
  npm install -g convex
  ```


### Installation

1. Clone the repository:

```bash
git clone https://github.com/DavidTimi1/Audiophile-HNG-13.git
cd Audiophile-HNG-13
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```


### Environment Variables

This project uses environment variables for configuration. Create a `.env.local` file in the root directory and populate it based on `.env.example`:

```
NEXT_PUBLIC_CONVEX_URL=your-convex-url
NEXT_PUBLIC_API_KEY=your-api-key
```

Replace `your-convex-url` and `your-api-key` with your actual Convex project URL and API key.


### Running the Project

Start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).


## Build and Deployment

To build the project for production:

```bash
npm run build
# or
yarn build
```

The build output will be located in the `.next` directory.

To start the production server:

```bash
npm start
# or
yarn start
```

You can deploy this project using platforms like **Vercel**, **Netlify**, or any Node.js-compatible hosting service.


## License

This project is licensed under the **MIT License**. See the `LICENSE` file for details.