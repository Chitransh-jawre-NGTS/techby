import React from "react";

const articles = [
  {
    id: 1,
    title: "AI is Changing E-Commerce Forever",
    category: "Technology",
    date: "May 2026",
    desc: "Artificial Intelligence is transforming online marketplaces by improving search, recommendations, and customer experience in real time."
  },
  {
    id: 2,
    title: "Rise of Digital Wallets in India",
    category: "Finance",
    date: "May 2026",
    desc: "Digital payments are rapidly replacing cash transactions, making online shopping faster and more secure across India."
  },
  {
    id: 3,
    title: "How Marketplace Apps Are Growing",
    category: "Business",
    date: "May 2026",
    desc: "Apps like OLX-style platforms are expanding due to peer-to-peer selling and hyperlocal delivery systems."
  },
  {
    id: 4,
    title: "The Future of Online Reselling",
    category: "Startup",
    date: "May 2026",
    desc: "Reselling platforms are becoming a strong income source for users, especially in mobile and electronics segments."
  },
  {
    id: 5,
    title: "Importance of Trust in Online Marketplaces",
    category: "Safety",
    date: "May 2026",
    desc: "User verification, ratings, and secure chats are key factors building trust in modern C2C platforms."
  },
  {
    id: 6,
    title: "Why Hyperlocal Apps Are Winning",
    category: "Trends",
    date: "May 2026",
    desc: "Hyperlocal buying and selling apps are gaining popularity due to faster delivery and local connections."
  }
];

export default function TrendingArticles() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-black text-gray-900">
            Trending Articles
          </h1>
          <p className="text-gray-500 mt-2">
            Stay updated with what’s happening in the marketplace world
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border shadow-sm p-6 hover:shadow-md transition"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-green-600 uppercase">
                  {item.category}
                </span>
                <span className="text-xs text-gray-400">
                  {item.date}
                </span>
              </div>

              <h2 className="text-xl font-black text-gray-900 mt-3">
                {item.title}
              </h2>

              <p className="text-gray-600 mt-3 leading-7">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}