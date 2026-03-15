import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

const initialSellers = [
  { id: 1, name: "Rahul Sharma", email: "rahul@example.com", phone: "9876543210" },
  { id: 2, name: "Sneha Meena", email: "sneha@example.com", phone: "9123456780" },
  { id: 3, name: "Amit Singh", email: "amit@example.com", phone: "9988776655" },
  { id: 4, name: "Pooja Patel", email: "pooja@example.com", phone: "9876123456" },
  { id: 5, name: "Vikram Joshi", email: "vikram@example.com", phone: "9012345678" },
];

const AllSellers = () => {
  const [sellers, setSellers] = useState(initialSellers);
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this seller?")) return;
    setDeletingId(id);
    setTimeout(() => {
      setSellers(sellers.filter((s) => s.id !== id));
      setDeletingId(null);
    }, 500); // simulate deletion delay
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-2">All Sellers</h1>
      <p className="mb-6 text-gray-700">
        Total Sellers: <span className="font-semibold">{sellers.length}</span>
      </p>

      {sellers.length === 0 ? (
        <p className="text-gray-500">No sellers found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow rounded-lg">
            <thead>
              <tr className="bg-green-100 text-left">
                <th className="px-6 py-3 text-gray-700">#</th>
                <th className="px-6 py-3 text-gray-700">Name</th>
                <th className="px-6 py-3 text-gray-700">Email</th>
                <th className="px-6 py-3 text-gray-700">Phone</th>
                <th className="px-6 py-3 text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sellers.map((seller, index) => (
                <tr
                  key={seller.id}
                  className={`border-b hover:bg-green-50 ${
                    deletingId === seller.id ? "opacity-50" : ""
                  }`}
                >
                  <td className="px-6 py-3">{index + 1}</td>
                  <td className="px-6 py-3">{seller.name}</td>
                  <td className="px-6 py-3">{seller.email}</td>
                  <td className="px-6 py-3">{seller.phone}</td>
                  <td className="px-6 py-3">
                    <button
                      onClick={() => handleDelete(seller.id)}
                      disabled={deletingId === seller.id}
                      className="text-red-600 hover:text-red-800 flex items-center gap-1"
                    >
                      <FaTrashAlt /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllSellers;