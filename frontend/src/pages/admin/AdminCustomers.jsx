import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { FiUsers, FiSearch, FiMail, FiPhone } from "react-icons/fi";

const MOCK_CUSTOMERS = [
  { id: 1, name: "Priya Sharma", email: "priya@gmail.com", phone: "+91 98234 56789", orders: 4, totalSpent: 18500, city: "Rahuri" },
  { id: 2, name: "Ananya Deshmukh", email: "ananya@yahoo.com", phone: "+91 97123 45678", orders: 2, totalSpent: 8200, city: "Ahmednagar" },
  { id: 3, name: "Snehal Kadam", email: "snehal@gmail.com", phone: "+91 95432 10987", orders: 7, totalSpent: 34000, city: "Pune" },
  { id: 4, name: "Pooja Patil", email: "pooja.patil@hotmail.com", phone: "+91 98987 65432", orders: 1, totalSpent: 4500, city: "Nashik" },
  { id: 5, name: "Rutuja Pawar", email: "rutuja@gmail.com", phone: "+91 91234 56780", orders: 3, totalSpent: 12900, city: "Rahuri" },
];

export default function AdminCustomers() {
  const [search, setSearch] = useState("");
  const filtered = MOCK_CUSTOMERS.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Helmet><title>Customers | Mayleki Admin</title></Helmet>
      <div className="p-6 sm:p-8 space-y-6">
        <div>
          <h1 className="font-playfair text-3xl font-bold text-dark-brown dark:text-cream">Customers</h1>
          <p className="font-poppins text-sm text-gray-400 mt-1">Manage registered buyers & rental clients</p>
        </div>

        <div className="relative max-w-sm">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customers..."
            className="input-luxury pl-10 py-2.5 text-sm w-full rounded-xl"
          />
        </div>

        <div className="bg-white dark:bg-dark-brown-light rounded-2xl border border-gold/10 overflow-hidden shadow-sm">
          <table className="w-full font-poppins text-sm">
            <thead className="bg-gray-50 dark:bg-white/5 border-b border-gold/10 text-xs text-gray-400 uppercase">
              <tr>
                <th className="px-5 py-3.5 text-left">Customer</th>
                <th className="px-5 py-3.5 text-left">Contact</th>
                <th className="px-5 py-3.5 text-left">City</th>
                <th className="px-5 py-3.5 text-left">Total Orders</th>
                <th className="px-5 py-3.5 text-left">Total Spent</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold/5">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-gold/5 transition-colors">
                  <td className="px-5 py-3.5 font-semibold text-dark-brown dark:text-cream">{c.name}</td>
                  <td className="px-5 py-3.5 text-xs text-gray-400">
                    <p className="flex items-center gap-1"><FiMail className="w-3 h-3 text-gold" /> {c.email}</p>
                    <p className="flex items-center gap-1 mt-0.5"><FiPhone className="w-3 h-3 text-gold" /> {c.phone}</p>
                  </td>
                  <td className="px-5 py-3.5 text-gray-500">{c.city}</td>
                  <td className="px-5 py-3.5 font-semibold">{c.orders}</td>
                  <td className="px-5 py-3.5 font-semibold text-gold">₹{c.totalSpent.toLocaleString("en-IN")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
