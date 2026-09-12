# Mayleki Imitation Jewellery - Production Deployment Guide

## Architecture Overview
- **Frontend:** React 18 + Vite, deployed on Vercel
- **Backend:** Node.js + Express, deployed on Render
- **Database:** MongoDB Atlas (M0/M10 cluster with replica sets)
- **CDN / Media:** Cloudinary & Unsplash CDN

## Deployment Checklist
1. **Environment Variables:** Verify `MONGO_URI`, `JWT_SECRET`, and payment gateway credentials on Render.
2. **CORS:** Ensure production frontend URL (`https://mayleki-studio.vercel.app`) is permitted.
3. **Database Indexes:** Ensure indexes on `products.slug`, `users.email`, and `orders.userId`.
4. **Vite Build:** Run `npm run build` inside `frontend/` to verify zero bundle errors.
5. **SSL / HTTPS:** Enforce HTTPS redirects across all endpoints.
