# Smart Food Choice Coach

Production-ready hackathon MVP foundation for an AI health-tech coaching app.

## Tech Stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS + shadcn/ui
- Firebase (Auth, Firestore, Analytics)
- Framer Motion
- Recharts

## Getting Started

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

## Firebase Environment Variables

Create a `.env.local` file with:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

Replace the placeholder values with your Firebase project settings.

## Useful Scripts

- `npm run dev` - start development server
- `npm run build` - production build
- `npm run start` - run production server
- `npm run lint` - run lint checks
