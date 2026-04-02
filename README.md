# BookReview — Frontend

A modern book review platform where users can discover books, write reviews, and track their reading journey.

**Live Demo:** [https://bookish-bliss-nine.vercel.app](https://bookish-bliss-nine.vercel.app)

---

## Tech Stack

- **React 18** — UI framework
- **TypeScript** — type safety
- **Vite** — build tool and dev server
- **Tailwind CSS** — styling
- **TanStack Query v5** — server state management, caching, infinite scroll
- **Zustand** — client state management (auth)
- **Axios** — HTTP client
- **React Router v6** — client-side routing
- **Sentry** — error monitoring and tracking
- **Vitest + Testing Library** — unit testing

---

## Features

- Browse books with infinite scroll pagination
- Search books by title or author with debounced live dropdown
- Sort books by most recent, highest rated, or title A-Z
- View detailed book pages with reviews and ratings
- Write, edit reviews with star ratings
- User authentication (register, login, email verification)
- Protected routes for authenticated users
- Skeleton loading states throughout
- Responsive design

---

## Getting Started

### Prerequisites
- Node.js 18+
- Backend server running (see [BookReview Backend](https://bookish-server-s0os.onrender.com))

### Installation

```bash
git clone https://github.com/Harlloh/bookish-blis
cd bookish-bliss-frontend
npm install
```

### Running Locally

```bash
npm run dev
```

### Building for Production

```bash
npm run build
```
## Error Monitoring
 
This project uses [Sentry](https://sentry.io) for error tracking in production. Sentry is initialized in `main.tsx` and automatically captures unhandled exceptions and component errors.
 
```ts
Sentry.init({
  dsn: import.meta.env.SENTRY_DSN,
});
```
 
---
## Environment Variables
 
Create a `.env.sentry-build-plugin` file in the root:
```env
SENTRY_DSN=https://your-sentry-dsn
SENTRY_AUTH_TOKEN=https://your-sentry-auth-token
```
---

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── BookCard.tsx
│   ├── BookDetailSkeleton.tsx
│   ├── EmptyBookShelf.tsx
│   ├── Header.tsx
│   ├── Layout.tsx
│   ├── ProtectedRoute.tsx
│   ├── ReviewCard.tsx
│   ├── StarRating.tsx
│   ├── Toast.tsx
│   └── skeletonCard.tsx
├── lib/
│   └── axios.ts      # Axios instance with base URL
├── pages/
│   ├── Home.tsx
│   ├── Books.tsx
│   ├── BookDetail.tsx
│   ├── Profile.tsx
│   ├── Login.tsx
│   └── Register.tsx
├── stores/
│   └── authStore.ts  # Zustand auth store
└── main.tsx
```

---

## Deployment

Deployed on **Vercel**. Every push to `main` triggers an automatic deployment.

---

## Author

**Allo Olorunfemi**
