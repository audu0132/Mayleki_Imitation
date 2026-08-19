import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { FiTag, FiPlus, FiCopy } from "react-icons/fi";
import { toast } from "react-hot-toast";

const MOCK_COUPONS = [
  { id: 1, code: "MAYLEKI10", discount: "10% OFF", minSpend: 2000, validTill: "2026-12-31", active: true },
  { id: 2, code: "BRIDAL20", discount: "20% OFF", minSpend: 10000, validTill: "2026-11-30", active: true },
  { id: 3, code: "RENTAL15", discount: "15% OFF", minSpend: 1500, validTill: "2026-10-15", active: true },
];

export default function AdminCoupons() {
  const [coupons] = useState(MOCK_COUPONS);

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    toast.success(`Coupon code ${code} copied!`);
  };

  return (
    <>
      <Helmet><title>Coupons | Mayleki Admin</title></Helmet>
      <div className="p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-playfair text-3xl font-bold text-dark-brown dark:text-cream">Discount Coupons</h1>
            <p className="font-poppins text-sm text-gray-400 mt-1">Manage promotional voucher codes</p>
          </div>
          <button className="btn-gold text-sm px-5 py-2.5 flex items-center gap-2 rounded-xl">
            <FiPlus className="w-4 h-4" /> Create Coupon
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 font-poppins">
          {coupons.map((c) => (
            <div key={c.id} className="bg-white dark:bg-dark-brown-light p-6 rounded-2xl border border-gold/10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-lg text-gold bg-gold/10 px-3 py-1 rounded-xl flex items-center gap-2">
                  {c.code}
                  <button onClick={() => copyCode(c.code)} className="hover:text-dark-brown"><FiCopy className="w-3.5 h-3.5" /></button>
                </span>
                <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-full">Active</span>
              </div>
              <div>
                <p className="font-playfair font-bold text-2xl text-dark-brown dark:text-cream">{c.discount}</p>
                <p className="text-xs text-gray-400 mt-1">Min purchase: ₹{c.minSpend}</p>
                <p className="text-xs text-gray-400">Expires: {c.validTill}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
