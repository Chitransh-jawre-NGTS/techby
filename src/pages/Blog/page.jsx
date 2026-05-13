import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";

const blogs = [
  {
    id: 1,
    title: "How to Safely Buy Used Phones Online",
    category: "Buying Guide",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop",
    shortDesc:
      "Learn how to verify used smartphones before buying from online marketplaces.",
    content:
      "Buying a used smartphone can save a lot of money, but you should always check the IMEI number, battery health, physical condition, and seller reviews before purchasing. On TechBy, users can compare devices, connect with trusted sellers, and find the best gadget deals in India.",
    author: "TechBy Team",
    date: "May 13, 2026",
  },
  {
    id: 2,
    title: "Top Gaming Laptops Under ₹50,000",
    category: "Laptops",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1200&auto=format&fit=crop",
    shortDesc:
      "Best budget gaming laptops for students and gamers.",
    content:
      "Gaming laptops under ₹50,000 now offer better graphics, SSD storage, and modern processors. Before purchasing, check cooling performance, upgrade options, and battery life.",
    author: "Admin",
    date: "May 11, 2026",
  },
  {
    id: 3,
    title: "Best Smartwatches for Daily Use",
    category: "Wearables",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop",
    shortDesc:
      "Explore affordable smartwatches with calling and fitness tracking.",
    content:
      "Modern smartwatches now include Bluetooth calling, heart rate monitoring, and long battery life. TechBy helps users discover affordable smartwatch deals from verified sellers.",
    author: "TechBy Team",
    date: "May 09, 2026",
  },
];

function BlogsPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900">
            TechBy Blogs
          </h1>
          <p className="mt-4 text-gray-600 text-lg">
            Latest tech news, gadget buying guides, and marketplace tips.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300"
            >
              <div className="h-60 overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover hover:scale-110 transition-all duration-500"
                />
              </div>

              <div className="p-6">
                <span className="text-green-600 font-semibold text-sm">
                  {blog.category}
                </span>

                <h2 className="text-2xl font-bold mt-3 leading-snug">
                  {blog.title}
                </h2>

                <p className="text-gray-600 mt-3 leading-relaxed text-sm">
                  {blog.shortDesc}
                </p>

                <div className="flex justify-between items-center mt-6 text-sm text-gray-500">
                  <span>{blog.author}</span>
                  <span>{blog.date}</span>
                </div>

                <Link
                  to={`/blogs/${blog.id}`}
                  className="mt-6 inline-block w-full text-center bg-black text-white py-3 rounded-xl hover:bg-green-500 transition-all duration-300"
                >
                  Read Full Blog
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BlogDetailsPage() {
  const { id } = useParams();

  const blog = blogs.find((item) => item.id === Number(id));

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-bold">
        Blog Not Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full h-[400px] overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-semibold">
          {blog.category}
        </span>

        <h1 className="text-5xl font-bold text-gray-900 mt-6 leading-tight">
          {blog.title}
        </h1>

        <div className="flex gap-4 mt-6 text-gray-500 text-sm">
          <span>{blog.author}</span>
          <span>•</span>
          <span>{blog.date}</span>
        </div>

        <div className="mt-10 text-lg text-gray-700 leading-relaxed space-y-6">
          <p>{blog.content}</p>

          <p>
            TechBy helps users discover verified used gadgets including
            smartphones, laptops, gaming accessories, and smart devices.
            Buyers can compare prices, connect with sellers, and find the best
            deals near them.
          </p>

          <p>
            Before buying any gadget, always verify the product condition,
            warranty status, accessories, and seller profile. This helps ensure
            safe and reliable purchases.
          </p>
        </div>

        <Link
          to="/blogs"
          className="inline-block mt-10 bg-black text-white px-6 py-3 rounded-xl hover:bg-green-500 transition-all duration-300"
        >
          Back to Blogs
        </Link>
      </div>
    </div>
  );
}


