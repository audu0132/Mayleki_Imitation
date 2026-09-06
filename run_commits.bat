
@echo off
setlocal enabledelayedexpansion

echo === Commit 6 ===
git add frontend/src/components/home/FAQ.jsx
git commit -m "feat(home): polish faq interactive accordion and responsive padding"
git push origin main
timeout /t 1 /nobreak >nul

echo === Commit 7 ===
git add frontend/src/components/layout/Footer.jsx
git commit -m "feat(layout): update luxury brand footer links and social elements"
git push origin main
timeout /t 1 /nobreak >nul

echo === Commit 8 ===
git add frontend/src/pages/AboutPage.jsx
git commit -m "feat(about): enhance brand heritage story and artisan craftsmanship section"
git push origin main
timeout /t 1 /nobreak >nul

echo === Commit 9 ===
git add frontend/src/pages/AiStylistPage.jsx
git commit -m "feat(stylist): optimize ai stylist page layout and recommendation cards"
git push origin main
timeout /t 1 /nobreak >nul

echo === Commit 10 ===
git add frontend/src/pages/BlogPage.jsx
git commit -m "feat(blog): improve editorial journal layout and typography"
git push origin main
timeout /t 1 /nobreak >nul

echo === Commit 11 ===
git add frontend/src/pages/GalleryPage.jsx
git commit -m "feat(gallery): enhance luxury lookbook gallery grid and image display"
git push origin main
timeout /t 1 /nobreak >nul

echo === Commit 12 ===
git add frontend/src/pages/CartPage.jsx frontend/src/pages/CheckoutPage.jsx
git commit -m "feat(checkout): polish cart summary and checkout order progression"
git push origin main
timeout /t 1 /nobreak >nul

echo === Commit 13 ===
git add frontend/src/pages/ContactPage.jsx frontend/src/pages/NotFoundPage.jsx frontend/src/pages/OffersPage.jsx
git commit -m "feat(pages): streamline contact form, 404 screen, and promotional offers"
git push origin main
timeout /t 1 /nobreak >nul

echo === Commit 14 ===
git add frontend/src/pages/OrderSuccessPage.jsx frontend/src/pages/RentalBookingPage.jsx frontend/src/pages/WishlistPage.jsx
git commit -m "feat(pages): enhance order confirmation, rental booking, and wishlist state"
git push origin main
timeout /t 1 /nobreak >nul

echo === Commit 15 ===
git add frontend/src/pages/ProductDetailPage.jsx frontend/src/pages/ProductListingPage.jsx frontend/src/pages/ProfilePage.jsx
git commit -m "feat(catalog): polish product listing, detail view, and user profile management"
git push origin main

echo Done!
