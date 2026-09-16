# Mayleki Imitation Jewellery Architecture

```mermaid
graph TD
  A[Vite React Frontend] -->|REST / JSON| B[Express API Server]
  B -->|Mongoose ODM| C[MongoDB Atlas Database]
  B -->|Vision AI| D[Google Gemini 2.0 API]
  B -->|Payments & Deposits| E[Razorpay Payment Gateway]
  B -->|Cloud Storage| F[Cloudinary Media CDN]
```
