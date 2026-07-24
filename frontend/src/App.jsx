import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import { Suspense, lazy, useEffect } from "react";

import {
  CartProvider,
  WishlistProvider,
  AuthProvider,
  DarkModeProvider,
  RecentlyViewedProvider,
} from "./context/AppContext";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import WhatsAppButton from "./components/common/WhatsAppButton";
import PageTransition from "./components/common/PageTransition";

// Lazy-loaded pages for performance
const HomePage = lazy(() => import("./pages/HomePage"));
const ProductListingPage = lazy(() => import("./pages/ProductListingPage"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const WishlistPage = lazy(() => import("./pages/WishlistPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const GalleryPage = lazy(() => import("./pages/GalleryPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const FAQPage = lazy(() => import("./pages/FAQPage"));
const OffersPage = lazy(() => import("./pages/OffersPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const RentalBookingPage = lazy(() => import("./pages/RentalBookingPage"));
const OrderSuccessPage = lazy(() => import("./pages/OrderSuccessPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

// Admin
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminProducts = lazy(() => import("./pages/admin/AdminProducts"));
const AdminOrders = lazy(() => import("./pages/admin/AdminOrders"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: 1,
    },
  },
});

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[40vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-gold/20 border-t-gold animate-spin" />
        <p className="font-poppins text-sm text-gray-400">Loading...</p>
      </div>
    </div>
  );
}

function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <DarkModeProvider>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <RecentlyViewedProvider>
                  <BrowserRouter>
                    <Toaster
                      position="top-right"
                      toastOptions={{
                        duration: 3000,
                        style: {
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "14px",
                          borderRadius: "12px",
                        },
                      }}
                    />
                    <Suspense fallback={<LoadingSpinner />}>
                      <ScrollToTop />
                      <Routes>
                        {/* Admin Routes (no Navbar/Footer) */}
                        <Route path="/admin" element={<AdminLayout />}>
                          <Route index element={<AdminDashboard />} />
                          <Route path="products" element={<AdminProducts />} />
                          <Route path="orders" element={<AdminOrders />} />
                          {/* Add more admin routes */}
                        </Route>

                        {/* Public Routes (with Navbar/Footer) */}
                        <Route path="/" element={
                          <MainLayout>
                            <HomePage />
                          </MainLayout>
                        } />
                        <Route path="/products" element={
                          <MainLayout>
                            <ProductListingPage />
                          </MainLayout>
                        } />
                        <Route path="/category/:slug" element={
                          <MainLayout>
                            <ProductListingPage />
                          </MainLayout>
                        } />
                        <Route path="/search" element={
                          <MainLayout>
                            <ProductListingPage />
                          </MainLayout>
                        } />
                        <Route path="/products/:slug" element={
                          <MainLayout>
                            <ProductDetailPage />
                          </MainLayout>
                        } />
                        <Route path="/cart" element={
                          <MainLayout>
                            <CartPage />
                          </MainLayout>
                        } />
                        <Route path="/wishlist" element={
                          <MainLayout>
                            <WishlistPage />
                          </MainLayout>
                        } />
                        <Route path="/checkout" element={
                          <MainLayout>
                            <CheckoutPage />
                          </MainLayout>
                        } />
                        <Route path="/rental-booking" element={
                          <MainLayout>
                            <RentalBookingPage />
                          </MainLayout>
                        } />
                        <Route path="/order-success" element={
                          <MainLayout>
                            <OrderSuccessPage />
                          </MainLayout>
                        } />
                        <Route path="/contact" element={
                          <MainLayout>
                            <ContactPage />
                          </MainLayout>
                        } />
                        <Route path="/about" element={
                          <MainLayout>
                            <AboutPage />
                          </MainLayout>
                        } />
                        <Route path="/gallery" element={
                          <MainLayout>
                            <GalleryPage />
                          </MainLayout>
                        } />
                        <Route path="/blog" element={
                          <MainLayout>
                            <BlogPage />
                          </MainLayout>
                        } />
                        <Route path="/faq" element={
                          <MainLayout>
                            <FAQPage />
                          </MainLayout>
                        } />
                        <Route path="/offers" element={
                          <MainLayout>
                            <OffersPage />
                          </MainLayout>
                        } />
                        <Route path="/profile" element={
                          <MainLayout>
                            <ProfilePage />
                          </MainLayout>
                        } />

                        {/* Auth Routes (no Navbar/Footer) */}
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />

                        {/* 404 Catch-all */}
                        <Route path="*" element={
                          <MainLayout>
                            <NotFoundPage />
                          </MainLayout>
                        } />
                      </Routes>
                    </Suspense>
                  </BrowserRouter>
                </RecentlyViewedProvider>
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </DarkModeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}
