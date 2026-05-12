import React, { useEffect, useState } from "react";
import {
  Package,
  Plus,
  Star,
  Clock,
  BadgeCheck,
  TrendingUp,
  ShoppingBag,
  Leaf,
} from "lucide-react";
import { FaCheckCircle, FaStore, FaExclamationTriangle } from "react-icons/fa";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { getSellerProfile } from "../../Api/authApi";
import {
  getSellerProducts,
  getSellerLimit,
} from "../../Api/ProductApi";

import { getSellerStats } from "../../Api/statsApi"; // ✅ NEW API
import BetaBanner from "../../components/BetaBanner";

const SellerDashboard = () => {
  const [seller, setSeller] = useState({});
  const [products, setProducts] = useState([]);
  const [limitData, setLimitData] = useState({
    limit: 0,
    used: 0,
    remaining: 0,
  });

  const [chartData, setChartData] = useState([]);
  const [totalViews, setTotalViews] = useState(0);
  const [loading, setLoading] = useState(true);

  // ================= FETCH =================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, productRes, limitRes] = await Promise.all([
          getSellerProfile(),
          getSellerProducts(),
          getSellerLimit(),
        ]);

        const sellerData = profileRes?.data;

        setSeller({
          _id: sellerData?._id,
          name: sellerData?.name,
          shopName: sellerData?.shopName,
          plan: "Free Plan",
        });

        setProducts(productRes?.data || []);

        const credits = limitRes?.data?.listingCredits;

      setLimitData({
  freeLimit: limitRes?.data?.freeLimit || 20,
  used: limitRes?.data?.used || 0,
  remaining: limitRes?.data?.remainingFree || 0,
});

        // ================= ANALYTICS API =================
        if (sellerData?._id) {
          const res = await getSellerStats(sellerData._id);

          const data = res?.data;

          setTotalViews(data?.totalViews || 0);

          // SORT BY DATE
          const sorted = [...(data?.products || [])].sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
          );

          // CUMULATIVE GROWTH FIX
          let cumulative = 0;

          const formatted = sorted.map((item) => {
            cumulative += item.views || 0;

            return {
              name: new Date(item.createdAt).toLocaleDateString("en-GB"),
              clicks: cumulative,
            };
          });

          setChartData(formatted);
        }
      } catch (err) {
        console.log("Dashboard Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ================= CALCULATIONS =================
  const featuredCount = products.filter((p) => p.featured).length;

 const progress =
  limitData.freeLimit > 0
    ? (limitData.used / limitData.freeLimit) * 100
    : 0;
  if (loading) {
    return <p className="text-center mt-10">Loading dashboard...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-100 p-6">

      <BetaBanner />

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">

        <div className="flex items-center gap-3">
          <div className="p-3 bg-green-100 rounded-2xl shadow">
            <Leaf className="text-green-700" />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-green-800">
              Welcome, {seller.shopName}
            </h1>
            <p className="text-gray-500">
              {seller.plan} • Grow your business 🌱
            </p>
          </div>
        </div>

        {/* <button className="flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-xl">
          <Plus size={18} />
          Add Product
        </button> */}
      </div>
      

<div className="text-sm text-gray-700 mb-6 p-2 leading-relaxed">
  <h1 className="text-2xl font-bold mb-4 text-green-800">
  🚚 Ship to Customers at Zero Delivery Cost — Offer Ending Soon
</h1>
  <div className="flex items-center gap-2 mb-2">
    <FaStore className="text-green-600" />
    <span>
      You may offer customers the option to visit your store if they prefer.
    </span>
  </div>

  <div className="flex items-start gap-2">
    <FaExclamationTriangle className="text-yellow-500 mt-1" />
    <span>
      However, you must <span className="font-semibold">not force or pressure</span> customers to visit your store 
      or make any advance payments outside the platform. All deliveries should be handled properly to maintain trust.
    </span>
  </div>

  <p className="mt-3">
    Any complaint regarding such behavior may result in 
    <span className="font-semibold text-red-600"> account suspension or permanent termination</span>, 
    and the seller may be added to a blacklist.
  </p>

</div>
      {/* STATS */}
      <div className="grid md:grid-cols-5 gap-5 mb-8">

        <div className="bg-white p-5 rounded-2xl shadow border-l-4 border-green-500">
          <Package className="text-green-600" />
          <p className="text-gray-500 mt-2">Total Products</p>
          <h2 className="text-2xl font-bold">{products.length}</h2>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow border-l-4 border-yellow-400">
          <Clock className="text-yellow-500" />
          <p className="text-gray-500 mt-2">Used</p>
          <h2 className="text-2xl font-bold">{limitData.used}</h2>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow border-l-4 border-emerald-500">
          <BadgeCheck className="text-emerald-600" />
          <p className="text-gray-500 mt-2">Remaining</p>
          <h2 className="text-2xl font-bold">{limitData.remaining}</h2>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow border-l-4 border-green-700">
          <Star className="text-green-700" />
          <p className="text-gray-500 mt-2">Featured</p>
          <h2 className="text-2xl font-bold">{featuredCount}</h2>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow border-l-4 border-blue-500">
          <TrendingUp className="text-blue-600" />
          <p className="text-gray-500 mt-2">Total Views</p>
          <h2 className="text-2xl font-bold">{totalViews}</h2>
        </div>
      </div>

      {/* GRAPH */}
      <div className="bg-white p-6 rounded-2xl shadow-md mb-8">

        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="text-green-600" />
          <h2 className="text-lg font-semibold text-green-700">
            Product Click Analytics
          </h2>
        </div>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="clicks"
                stroke="#16a34a"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* LIMIT BAR */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white p-6 rounded-2xl shadow-lg mb-8">

        <h2 className="text-xl font-semibold">
          🌱 Monthly Free Listing Plan
        </h2>

        <p className="text-sm opacity-90 mt-1">
          You get {limitData.freeLimit} free product uploads every month.
        </p>

        <div className="mt-4 bg-white/30 h-2 rounded-full">
          <div
            className="bg-white h-2 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-sm mt-2">
         {limitData.used} / {limitData.freeLimit} used ({limitData.remaining} remaining)
        </p>
      </div>

      {/* PRODUCTS */}
      <div className="grid md:grid-cols-3 gap-6">

        <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-md">

          <h2 className="text-lg font-semibold flex items-center gap-2 text-green-700 mb-4">
            <ShoppingBag />
            Your Products
          </h2>

        <div className="space-y-3">
  {products.slice(0, 5).map((p) => (
    <div
      key={p._id}
      className="flex justify-between items-center border p-4 rounded-xl hover:bg-green-50"
    >
      <div>
        <p className="font-semibold">{p.name}</p>
        <p className="text-sm text-gray-500">₹{p.totalPrice}</p>
      </div>

      {p.featured && (
        <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
          ⭐ Featured
        </span>
      )}
    </div>
  ))}
</div>
        </div>

        {/* RIGHT PANEL */}
        <div className="space-y-5">

          <div className="bg-white p-5 rounded-2xl shadow-md border border-green-100">
            <h3 className="font-semibold text-green-700 mb-3">
              ⚡ Quick Actions
            </h3>

            <button className="w-full bg-green-600 text-white py-2.5 rounded-xl mb-2">
              + Add Product
            </button>

            <button className="w-full border border-green-200 text-green-700 py-2.5 rounded-xl">
              Buy Listings
            </button>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-5 rounded-2xl shadow">
            <h3 className="font-semibold text-green-700">
              💡 Insights
            </h3>

            <p className="text-sm text-gray-600 mt-2">
              More clicks = more WhatsApp leads = more sales 🚀
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;