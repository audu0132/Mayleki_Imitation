import { Helmet } from "react-helmet-async";

export default function RentalBookingPage() {
  return (
    <>
      <Helmet><title>Book Rental Jewellery | Mayleki</title></Helmet>
      <div className="page-wrapper">
        <div className="bg-dark-brown py-12">
          <div className="container-luxury">
            <h1 className="font-playfair text-4xl font-bold text-cream">Rental Booking</h1>
          </div>
        </div>
        <div className="container-luxury py-10">
          <div className="max-w-2xl mx-auto bg-white dark:bg-dark-brown-light rounded-3xl p-8 border border-gold/10 shadow-luxury text-center">
            <span className="text-6xl mb-4 block">🎁</span>
            <h2 className="font-playfair text-2xl font-bold text-dark-brown dark:text-cream mb-3">
              Rental Booking System
            </h2>
            <p className="font-poppins text-sm text-gray-500 mb-6">
              Our full rental booking system is connected to the backend. Please WhatsApp us to book rental jewellery right now!
            </p>
            <a
              href="https://wa.me/919876543210?text=Hi! I want to book rental jewellery. Please help me."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold inline-flex items-center gap-2 px-8 py-4 text-base"
            >
              Book via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
