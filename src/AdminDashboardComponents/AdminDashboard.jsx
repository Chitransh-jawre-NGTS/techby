import React from "react";

const AdminStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-gray-500">Total Sellers</h3>
        <p className="text-2xl font-bold">25</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-gray-500">Total Products</h3>
        <p className="text-2xl font-bold">140</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-gray-500">Total Users</h3>
        <p className="text-2xl font-bold">500</p>
      </div>

    </div>
  );
};

export default AdminStats;