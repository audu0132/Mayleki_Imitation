# Mayleki Imitation Jewellery — Antigravity (AGY) CLI Project Rules
#
# This file configures the AGY CLI for this workspace.
# When you run `agy` from d:\React\Mayleki_Imitation, these rules
# are automatically loaded so AGY always understands your project context.

## Project Identity
- **Name**: Mayleki Imitation Jewellery
- **Tagline**: Luxury handcrafted bridal jewellery — rentals & 1GM gold masterpieces
- **Domain**: mayleki.com

## Google Cloud Platform
- **GCP Project ID**: `gen-lang-client-0321817472`
- **GCP Project Number**: `3853536489`
- **Display Name**: Maylekiimitation
- **Gemini Model in use**: `gemini-2.5-flash` (via `@google/genai` SDK)
- **AI Feature**: `/api/ai/stylist` — jewellery recommendation engine

## Tech Stack
### Frontend (`/frontend`)
- React 18 + Vite + TailwindCSS v4 (`@tailwindcss/vite`)
- Framer Motion for animations
- React Router v6 for routing
- Deployed on **Vercel** (`vercel.json` present)
- Build: `npm run build` → `dist/`

### Backend (`/backend`)
- Node.js (ES Modules — `"type": "module"`)
- Express 4 + Mongoose 8 (MongoDB Atlas)
- JWT authentication (`jsonwebtoken` + `bcryptjs`)
- Razorpay payment gateway
- Cloudinary image CDN
- Deployed on **Render** (`render.yaml` present)

## Project Conventions
- **Always use ES module syntax** (`import`/`export`, never `require`)
- **Backend routes** live in `backend/routes/`, models in `backend/models/`
- **Frontend utils** live in `frontend/src/utils/`
- **API base URL** is configured in `frontend/src/config/api.js`
- **Auth middleware** is `backend/middleware/auth.js` (JWT Bearer)
- **Never commit `.env`** — it is gitignored; use `.env.example` as template
- **MongoDB models** use Mongoose schemas with `timestamps: true`
- **Price fields**: `sellingPrice` (buy) and `rentalPrice` (rent) — always in INR (₹)

## Key Files
- `backend/server.js` — Express app entrypoint
- `backend/routes/ai.js` — Gemini AI Stylist endpoint
- `frontend/src/App.jsx` — Root React component + routing
- `frontend/src/utils/openGraphBuilder.js` — OG / Twitter Card / JSON-LD meta builder
- `frontend/src/config/api.js` — Centralized API fetch helper
- `render.yaml` — Render.com deployment config
- `frontend/vercel.json` — Vercel SPA routing config

## Deployment
- **Frontend**: `cd frontend && npm run build` → deploy to Vercel
- **Backend**: auto-deployed on Render from `main` branch via `render.yaml`
- **Backend live URL**: `https://mayleki-imitation.onrender.com`
