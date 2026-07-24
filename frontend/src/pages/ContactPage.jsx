import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { FiPhone, FiMail, FiMapPin, FiClock, FiSend, FiInstagram } from "react-icons/fi";
import { FaWhatsapp, FaFacebook } from "react-icons/fa";
import toast from "react-hot-toast";

const CONTACT_INFO = [
  { icon: FiPhone, label: "Phone", value: "+91 98765 43210", href: "tel:+919876543210", color: "text-gold" },
  { icon: FaWhatsapp, label: "WhatsApp", value: "+91 98765 43210", href: "https://wa.me/919876543210", color: "text-green-500" },
  { icon: FiMail, label: "Email", value: "hello@mayleki.com", href: "mailto:hello@mayleki.com", color: "text-rose-gold" },
  { icon: FiInstagram, label: "Instagram", value: "@mayleki.jewellery", href: "#", color: "text-purple-500" },
  {
    icon: FiMapPin,
    label: "Address",
    value: "Rahuri, Ahmednagar District, Maharashtra — 413706",
    href: "https://maps.google.com/?q=Rahuri,Maharashtra",
    color: "text-gold",
  },
  { icon: FiClock, label: "Business Hours", value: "Mon – Sat: 10:00 AM – 8:00 PM", href: null, color: "text-gold" },
];

export default function ContactPage() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 1000));
    toast.success("Message sent! We'll get back to you within 24 hours. 🙏", {
      style: { background: "#3B2F2F", color: "#FFFDF8", border: "1px solid rgba(212,175,55,0.3)" },
    });
    reset();
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Mayleki Jewellery — Rahuri, Maharashtra</title>
        <meta name="description" content="Contact Mayleki Imitation Jewellery in Rahuri, Maharashtra. Call, WhatsApp, or email us for jewellery inquiries, rental bookings, and orders." />
      </Helmet>

      <div className="page-wrapper">
        {/* Hero */}
        <div className="bg-dark-brown py-16 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, #D4AF37 1px, transparent 0)`, backgroundSize: "30px 30px" }} />
          <div className="container-luxury relative text-center">
            <p className="section-subtitle mb-3">Get in Touch</p>
            <h1 className="font-playfair text-5xl font-bold text-cream mb-3">
              Contact <span className="text-gold-gradient">Us</span>
            </h1>
            <div className="gold-divider" />
          </div>
        </div>

        <div className="container-luxury py-16 md:py-20">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12">
            {/* Left: Info */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-playfair text-3xl font-bold text-dark-brown dark:text-cream mb-2">
                  We'd love to hear from you
                </h2>
                <p className="font-poppins text-sm text-gray-500 mb-8 leading-relaxed">
                  Whether you have a question about our collection, want to book rental jewellery,
                  or need help with an order — we're here to help!
                </p>

                <div className="space-y-4 mb-8">
                  {CONTACT_INFO.map(({ icon: Icon, label, value, href, color }) => (
                    <div key={label} className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center flex-shrink-0 ${color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-poppins text-xs font-semibold text-gray-400 tracking-wider uppercase">{label}</p>
                        {href ? (
                          <a
                            href={href}
                            target={href.startsWith("http") ? "_blank" : undefined}
                            rel="noopener noreferrer"
                            className="font-poppins text-sm font-medium text-dark-brown dark:text-cream hover:text-gold transition-colors"
                          >
                            {value}
                          </a>
                        ) : (
                          <p className="font-poppins text-sm font-medium text-dark-brown dark:text-cream">{value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick action buttons */}
                <div className="flex gap-3 flex-wrap">
                  <a
                    href="https://wa.me/919876543210?text=Hi! I have an inquiry about Mayleki Jewellery."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-poppins font-semibold text-sm transition-colors shadow-sm"
                  >
                    <FaWhatsapp className="w-4 h-4" /> WhatsApp Us
                  </a>
                  <a
                    href="tel:+919876543210"
                    className="flex items-center gap-2 px-5 py-3 bg-gold text-dark-brown hover:bg-gold-dark rounded-xl font-poppins font-semibold text-sm transition-colors shadow-gold"
                  >
                    <FiPhone className="w-4 h-4" /> Call Now
                  </a>
                </div>

                {/* Google Maps embed */}
                <div className="mt-8 rounded-2xl overflow-hidden shadow-luxury border border-gold/10">
                  <iframe
                    title="Mayleki Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15115.56388427!2d74.6497!3d19.3926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdc7e0b2f6b3a0f%3A0x5a4a3b2a1c8d9e7f!2sRahuri%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1234567890123"
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </motion.div>
            </div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white dark:bg-dark-brown-light rounded-2xl p-6 sm:p-8 shadow-card border border-gold/10">
                <h3 className="font-playfair text-2xl font-bold text-dark-brown dark:text-cream mb-6">
                  Send us a Message
                </h3>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-poppins text-sm font-semibold text-dark-brown dark:text-cream mb-1.5 block">Name *</label>
                      <input
                        placeholder="Your name"
                        className={`input-luxury ${errors.name ? "border-red-400" : ""}`}
                        {...register("name", { required: "Name is required" })}
                      />
                      {errors.name && <p className="font-poppins text-xs text-red-500 mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="font-poppins text-sm font-semibold text-dark-brown dark:text-cream mb-1.5 block">Phone *</label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        className={`input-luxury ${errors.phone ? "border-red-400" : ""}`}
                        {...register("phone", { required: "Phone is required" })}
                      />
                      {errors.phone && <p className="font-poppins text-xs text-red-500 mt-1">{errors.phone.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="font-poppins text-sm font-semibold text-dark-brown dark:text-cream mb-1.5 block">Email</label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      className="input-luxury"
                      {...register("email")}
                    />
                  </div>

                  <div>
                    <label className="font-poppins text-sm font-semibold text-dark-brown dark:text-cream mb-1.5 block">Inquiry Type</label>
                    <select className="input-luxury" {...register("type")}>
                      <option>General Inquiry</option>
                      <option>Rental Booking</option>
                      <option>Purchase Order</option>
                      <option>Custom Order</option>
                      <option>Complaint / Feedback</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-poppins text-sm font-semibold text-dark-brown dark:text-cream mb-1.5 block">Message *</label>
                    <textarea
                      rows={5}
                      placeholder="Tell us about your requirements..."
                      className={`input-luxury resize-none ${errors.message ? "border-red-400" : ""}`}
                      {...register("message", { required: "Message is required", minLength: { value: 10, message: "Min 10 characters" } })}
                    />
                    {errors.message && <p className="font-poppins text-xs text-red-500 mt-1">{errors.message.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-gold w-full py-4 text-base"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2 justify-center">
                        <span className="w-4 h-4 border-2 border-dark-brown border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <>
                        <FiSend className="w-5 h-5" /> Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
