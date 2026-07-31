import { Helmet } from "react-helmet-async";

export default function RentalBookingPage() {
  return (
    <>
      <Helmet><title>Book Rental Jewellery | Mayleki</title></Helmet>
      <div className="page-wrapper">
        <div className="page-header">
          <div className="container-luxury">
            <h1 className="font-playfair text-4xl font-bold text-cream">Rental Booking</h1>
          </div>
        </div>
        <div className="container-luxury py-16 lg:py-24">
          <div className="max-w-2xl mx-auto card-luxury text-center">
            <span className="text-6xl mb-4 block">🎁</span>
            <h2 className="font-playfair text-2xl font-bold text-dark-brown dark:text-cream mb-3">
              Bridal Rental Booking
            </h2>
            <p className="font-poppins text-sm text-gray-500 mb-6 leading-relaxed">
              Explore our exclusive bridal rental collections! Select dates and inquire via WhatsApp or phone for immediate confirmation.
            </p>
            <a
              href="https://wa.me/919876543210?text=Hi! I want to book rental jewellery. Please help me."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold inline-flex justify-center items-center gap-2 px-8 h-12 text-base"
            >
              Book via WhatsApp
            </a>
          </div>
        </div>

      </div>
    </>
  );
}
