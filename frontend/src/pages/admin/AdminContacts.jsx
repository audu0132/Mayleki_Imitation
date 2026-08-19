import { Helmet } from "react-helmet-async";
import { FiMessageSquare } from "react-icons/fi";

const MOCK_CONTACTS = [
  { id: 1, name: "Radhika Kulkarni", phone: "9822012345", message: "Inquiry about bridal set rental availability for Oct 12.", date: "Today" },
  { id: 2, name: "Mahesh Landge", phone: "9850198765", message: "Do you offer custom Kolhapuri Saaj crafting?", date: "Yesterday" }
];

export default function AdminContacts() {
  return (
    <>
      <Helmet><title>Contact Requests | Mayleki Admin</title></Helmet>
      <div className="p-6 sm:p-8 space-y-6">
        <div>
          <h1 className="font-playfair text-3xl font-bold text-dark-brown dark:text-cream">Contact Requests</h1>
          <p className="font-poppins text-sm text-gray-400 mt-1">Manage customer inquiries and messages</p>
        </div>

        <div className="space-y-4 font-poppins">
          {MOCK_CONTACTS.map((c) => (
            <div key={c.id} className="bg-white dark:bg-dark-brown-light p-5 rounded-2xl border border-gold/10 space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-dark-brown dark:text-cream">{c.name} ({c.phone})</h3>
                <span className="text-xs text-gray-400">{c.date}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">{c.message}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
