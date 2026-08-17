import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { FiPhone, FiMail, FiMapPin, FiClock, FiSend, FiInstagram } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import toast from "react-hot-toast";

const CONTACT_INFO = [
  { icon: FiPhone, label: "Phone", value: "+91 91392 36500", href: "tel:+919139236500", color: "text-[#C5A059]" },
  { icon: FaWhatsapp, label: "WhatsApp", value: "+91 91392 36500", href: "https://wa.me/919139236500", color: "text-[#25D366]" },
  { icon: FiMail, label: "Email", value: "hello@mayleki.com", href: "mailto:hello@mayleki.com", color: "text-[#C5A059]" },
  { icon: FiInstagram, label: "Instagram", value: "@mayleki_imitation", href: "https://www.instagram.com/mayleki_imitation/?hl=en", color: "text-[#E5C88A]" },
  {
    icon: FiMapPin,
    label: "Boutique Location",
    value: "Mayleki Studio, Main Market Road, Rahuri, Maharashtra — 413706",
    href: "https://maps.google.com/?q=Rahuri,Maharashtra",
    color: "text-[#C5A059]",
  },
  { icon: FiClock, label: "Store Hours", value: "Mon – Sat: 10:00 AM – 8:00 PM", href: null, color: "text-[#C5A059]" },
];

export default function ContactPage() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 1000));
    toast.success("Message received! Our Rahuri boutique team will respond within 24 hours. 🙏", {
      style: { background: "#1C1917", color: "#FAF7F2", border: "1px solid #C5A059" },
    });
    reset();
  };

  return (
    <>
      <Helmet>
        <title>Contact Boutique | Mayleki Imitation Jewellery Rahuri</title>
        <meta name="description" content="Contact Mayleki Imitation Jewellery in Rahuri, Maharashtra. Call, WhatsApp, or email us for jewellery inquiries, rental bookings, and orders." />
      </Helmet>

      <div className="bg-[#FAF7F2] dark:bg-[#141110] min-h-screen">
        {/* Header */}
        <div className="bg-[#1C1917] text-[#FAF7F2] py-20 text-center relative border-b border-[#C5A059]/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-[#C5A059] mb-2">𑁍 Get in Touch</p>
            <h1 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-normal text-[#FAF7F2] mb-3">
              Contact Our Boutique Showroom
            </h1>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#C5A059] to-transparent mx-auto my-4" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left: Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-cormorant text-3xl sm:text-4xl font-normal text-[#1C1917] dark:text-[#FAF7F2] mb-3">
                We Welcome Your Inquiries
              </h2>
              <p className="font-sans text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-8 leading-relaxed font-light">
                Whether you wish to schedule a bridal trial in Rahuri, check rental availability, or place a custom order — our team is here for you.
              </p>

              <div className="space-y-5 mb-8">
                {CONTACT_INFO.map(({ icon: Icon, label, value, href, color }) => (
                  <div key={label} className="flex items-start gap-4 p-3 bg-white dark:bg-[#1C1917] border border-[#C5A059]/20">
                    <div className={`w-10 h-10 bg-[#4A0E17] flex items-center justify-center flex-shrink-0 text-white border border-[#C5A059]/40`}>
                      <Icon className="w-4 h-4 text-[#E5C88A]" />
                    </div>
                    <div>
                      <p className="font-sans text-[10px] font-semibold text-[#C5A059] tracking-widest uppercase">{label}</p>
                      {href ? (
                        <a
                          href={href}
                          target={href.startsWith("http") ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          className="font-sans text-xs font-medium text-[#1C1917] dark:text-[#FAF7F2] hover:text-[#C5A059] transition-colors"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="font-sans text-xs font-medium text-[#1C1917] dark:text-[#FAF7F2]">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Action buttons */}
              <div className="flex gap-4 flex-wrap mb-8">
                <a
                  href="https://wa.me/919139236500?text=Hi Mayleki! I have an inquiry."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-wine text-xs px-6 py-3.5 border border-[#C5A059]/40 flex items-center gap-2"
                >
                  <FaWhatsapp className="w-4 h-4 text-[#25D366]" /> WhatsApp Consultation
                </a>
                <a
                  href="tel:+919139236500"
                  className="btn-gold text-xs px-6 py-3.5 flex items-center gap-2"
                >
                  <FiPhone className="w-4 h-4" /> Call Showroom
                </a>
              </div>

              {/* Map embed */}
              <div className="border border-[#C5A059]/30 overflow-hidden shadow-sm">
                <iframe
                  title="Mayleki Boutique Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15115.56388427!2d74.6497!3d19.3926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdc7e0b2f6b3a0f%3A0x5a4a3b2a1c8d9e7f!2sRahuri%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1234567890123"
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white dark:bg-[#1C1917] p-8 border border-[#C5A059]/30 shadow-none">
                <h3 className="font-cormorant text-3xl font-semibold text-[#1C1917] dark:text-[#FAF7F2] mb-6">
                  Send a Direct Message
                </h3>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-sans text-xs font-semibold uppercase tracking-widest text-[#1C1917] dark:text-[#FAF7F2] mb-1.5 block">Full Name *</label>
                      <input
                        placeholder="Your name"
                        className={`input-luxury ${errors.name ? "border-red-400" : ""}`}
                        {...register("name", { required: "Name is required" })}
                      />
                      {errors.name && <p className="font-sans text-xs text-red-500 mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="font-sans text-xs font-semibold uppercase tracking-widest text-[#1C1917] dark:text-[#FAF7F2] mb-1.5 block">Phone *</label>
                      <input
                        type="tel"
                        placeholder="+91 91392 36500"
                        className={`input-luxury ${errors.phone ? "border-red-400" : ""}`}
                        {...register("phone", { required: "Phone is required" })}
                      />
                      {errors.phone && <p className="font-sans text-xs text-red-500 mt-1">{errors.phone.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="font-sans text-xs font-semibold uppercase tracking-widest text-[#1C1917] dark:text-[#FAF7F2] mb-1.5 block">Email Address</label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      className="input-luxury"
                      {...register("email")}
                    />
                  </div>

                  <div>
                    <label className="font-sans text-xs font-semibold uppercase tracking-widest text-[#1C1917] dark:text-[#FAF7F2] mb-1.5 block">Inquiry Type</label>
                    <select className="input-luxury" {...register("type")}>
                      <option>General Inquiry</option>
                      <option>Jewellery Rental Booking</option>
                      <option>Bridal Set Consultation</option>
                      <option>Order Status Check</option>
                      <option>Custom Fitting / Modification</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-sans text-xs font-semibold uppercase tracking-widest text-[#1C1917] dark:text-[#FAF7F2] mb-1.5 block">Message *</label>
                    <textarea
                      rows={5}
                      placeholder="Specify your wedding date, set preferences, or questions..."
                      className={`input-luxury h-auto py-3 resize-none ${errors.message ? "border-red-400" : ""}`}
                      {...register("message", { required: "Message is required", minLength: { value: 10, message: "Min 10 characters" } })}
                    />
                    {errors.message && <p className="font-sans text-xs text-red-500 mt-1">{errors.message.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-gold w-full h-12 text-xs"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2 justify-center">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Transmitting...
                      </span>
                    ) : (
                      <>
                        <FiSend className="w-4 h-4" /> Send Inquiry
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
