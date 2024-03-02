# Thriller - A Twitter Clone

This project is a simple and basic clone of Twitter, designed to help me learn NextJS, TailwindCSS, and Drizzle ORM. It's a simple project that allows users to create, read, update, and delete tweets. It also has user authentication using GitHub OAuth. I also gave the whole UI a new look using my skills in design and TailwindCSS.

## Features

- Create, Read, Update, and Delete Tweets
- User Authentication using GitHub OAuth
- Responsive design using TailwindCSS
- Deployed on Vercel for high availability

## Built With

[![NextJS](https://img.shields.io/badge/next.js-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Drizzle](https://img.shields.io/badge/drizzle-black?style=for-the-badge&logo=drizzle)](https://drizzle.dev/)
[![next-auth](https://img.shields.io/badge/nextauth-black?style=for-the-badge)](https://next-auth.js.org/)
[![ShadcnUI](https://img.shields.io/badge/shadcnui-black?style=for-the-badge&logo=shadcnui)](https://shadcnui.com/)
[![Tailwindcss](https://img.shields.io/badge/tailwindcss-black?style=for-the-badge&logo=tailwindcss)](https://www.tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/)

## Getting Started

To get a local copy up and running follow these simple steps.

### Configuration

1. Add a new OAuth App on GitHub.
2. Create a neon postgreSQL database.
3. You'll need to create a `.env.local` file in the root of the project and add the following environment variables:
   ```env
   AUTH_GITHUB_ID="your_id_here"
   AUTH_GITHUB_SECRET="your_secret"
   AUTH_SECRET="your_secret_here"
   DATABASE_URL="postgresql://postgres:password@localhost:5432/triller"
   ```
4. create a `.env` file and just add the DATABASE_URL variable again. Drizzle ORM uses this file to connect to the database during migrations.
   ```env
    DATABASE_URL="postgresql://postgres:password@localhost:5432/triller"
   ```

### Installation and Running

1. Clone the repo

   ```sh
   git clone https://github.com/bnmwag/triller.git
   ```

2. Install NPM packages
   ```sh
   pnpm install
   ```
3. Start the development server
   ```sh
   pnpm dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Final Thoughts

This project taught me a lot and got me excited to tackle more challenges. I learned a lot about workflows, project structure, and the importance of good documentation.
