# VerveScale Digital — Web App

React + TypeScript + Vite + Tailwind CSS web app for VerveScale Digital, ready to deploy directly to Vercel.

## Project Structure

```
vervscaleryy/
├── public/
│   └── favicon.png
├── src/
│   ├── assets/              # All original images, screenshots, logos
│   ├── App.tsx              # Original React app component
│   ├── index.css            # Original Tailwind and custom styling
│   ├── main.tsx             # React entry point
│   └── vite-env.d.ts        # Vite TypeScript definitions
├── index.html               # Main HTML entry
├── package.json             # Dependencies and build scripts
├── postcss.config.js        # PostCSS configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
├── vercel.json              # Vercel deployment configuration
├── vite.config.ts           # Vite build configuration
└── .gitignore
```

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
```

The output will be generated in `dist/`.

## Deploying to Vercel

### Option 1: Vercel CLI
```bash
npm i -g vercel
vercel
```

### Option 2: GitHub + Vercel Dashboard
1. Push this folder to a GitHub repository.
2. In [Vercel](https://vercel.com), click **Add New Project** and import the repository.
3. Vercel will automatically detect **Vite** and deploy!
