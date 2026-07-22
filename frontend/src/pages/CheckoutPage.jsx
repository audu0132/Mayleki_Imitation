import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function CheckoutPage() {
  return (
    <>
      <Helmet><title>Checkout | Mayleki Jewellery</title></Helmet>
      <div className="page-wrapper">
        <div className="bg-dark-brown py-12">
          <div className="container-luxury">
            <h1 className="font-playfair text-4xl font-bold text-cream">Checkout</h1>
          </div>
        </div>
        <div className="container-luxury py-10 text-center">
          <p className="font-poppins text-gray-500 mb-4">Complete checkout coming soon. Backend payment integration required.</p>
          <Link to="/cart" className="btn-gold-outline">Back to Cart</Link>
        </div>
      </div>
    </>
  );
}
