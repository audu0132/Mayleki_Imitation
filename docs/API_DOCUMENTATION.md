# Mayleki Imitation Jewellery - REST API Reference

Comprehensive specification of all endpoints powering the Mayleki Luxury Imitation Jewellery platform.

## Base URLs
- **Development:** `http://localhost:5000/api`
- **Production:** `https://mayleki-imitation.onrender.com/api`

## Authentication
JWT Bearer token required for customer account endpoints:
```http
Authorization: Bearer <JWT_TOKEN>
```

## Key Endpoints

### 1. Categories & Catalog
- `GET /categories` - List all categories with counts and banner images.
- `GET /products` - Filterable product list with pagination.
- `GET /products/:id` - Single product details including high-res gallery.

### 2. Rental Calculator
- `POST /rentals/calculate-quote` - Computes base rental, deposit, GST, and delivery.

### 3. Orders & Tracking
- `POST /orders` - Create new jewellery reservation.
- `GET /tracking/:trackingNumber` - Live dispatch and delivery timeline.

### 4. Promotional & Loyalty
- `POST /coupons/validate` - Validate festive coupon codes.
- `POST /newsletter/subscribe` - VIP bridal club signups.
