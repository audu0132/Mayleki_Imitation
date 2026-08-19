import { Helmet } from "react-helmet-async";
import { FiTrendingUp, FiDownload } from "react-icons/fi";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ADMIN_STATS } from "../../data/mockData";

export default function AdminReports() {
  return (
    <>
      <Helmet><title>Reports & Analytics | Mayleki Admin</title></Helmet>
      <div className="p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-playfair text-3xl font-bold text-dark-brown dark:text-cream">Sales & Rental Reports</h1>
            <p className="font-poppins text-sm text-gray-400 mt-1">Export store metrics and revenue breakdown</p>
          </div>
          <button className="btn-gold text-sm px-5 py-2.5 flex items-center gap-2 rounded-xl">
            <FiDownload className="w-4 h-4" /> Download PDF Report
          </button>
        </div>

        <div className="bg-white dark:bg-dark-brown-light p-6 rounded-2xl border border-gold/10 space-y-4">
          <h2 className="font-playfair font-bold text-xl text-dark-brown dark:text-cream">Monthly Revenue (2026)</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ADMIN_STATS?.monthlyRevenue || []}>
                <XAxis dataKey="month" stroke="#A9A9A9" />
                <YAxis stroke="#A9A9A9" />
                <Tooltip />
                <Bar dataKey="revenue" fill="#D4AF37" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}
