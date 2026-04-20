import React, { useState, useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { getAllSellers, deleteSeller } from "../../Api/authApi";

const AllSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 NEW STATE FOR MODAL
  const [showModal, setShowModal] = useState(false);
  const [selectedSellerId, setSelectedSellerId] = useState(null);

  // FETCH SELLERS
  const fetchSellers = async () => {
    try {
      const res = await getAllSellers();
      setSellers(res.data);
    } catch (error) {
      console.error("Error fetching sellers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSellers();
  }, []);

  // OPEN MODAL
  const openDeleteModal = (id) => {
    setSelectedSellerId(id);
    setShowModal(true);
  };

  // CONFIRM DELETE
  const confirmDelete = async () => {
    try {
      setDeletingId(selectedSellerId);

      await deleteSeller(selectedSellerId);

      setSellers((prev) =>
        prev.filter((s) => s._id !== selectedSellerId)
      );
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setDeletingId(null);
      setShowModal(false);
      setSelectedSellerId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-2">All Sellers</h1>
      <p className="mb-6 text-gray-700">
        Total Sellers: <span className="font-semibold">{sellers.length}</span>
      </p>

      {loading ? (
        <p className="text-gray-500">Loading sellers...</p>
      ) : sellers.length === 0 ? (
        <p className="text-gray-500">No sellers found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow rounded-lg">
            <thead>
              <tr className="bg-green-100 text-left">
                <th className="px-6 py-3">#</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Phone</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sellers.map((seller, index) => (
                <tr
                  key={seller._id}
                  className={`border-b hover:bg-green-50 ${
                    deletingId === seller._id ? "opacity-50" : ""
                  }`}
                >
                  <td className="px-6 py-3">{index + 1}</td>
                  <td className="px-6 py-3">{seller.name}</td>
                  <td className="px-6 py-3">{seller.email}</td>
                  <td className="px-6 py-3">{seller.phone}</td>
                  <td className="px-6 py-3">
                    <button
                      onClick={() => openDeleteModal(seller._id)}
                      disabled={deletingId === seller._id}
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

      {/* 🔥 DELETE CONFIRM MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm text-center">
            
            <h2 className="text-xl font-bold mb-3 text-gray-800">
              Confirm Delete
            </h2>

            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this seller?
            </p>

            <div className="flex justify-center gap-4">
              
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
              >
                Delete
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllSellers;