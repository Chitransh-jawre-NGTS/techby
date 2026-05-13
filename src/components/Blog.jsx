import React from "react";

export default function BlogPage() {

  const featuredBlog = {
    title: "Buy & Sell Used Gadgets Safely With TechBy",
    desc: "Explore verified used mobiles, laptops, bikes, tablets, gaming consoles, PS CDs and more at affordable prices on TechBy.",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop",
    author: "TechBy Team",
    date: "May 13, 2026",
    category: "Used Gadgets",
  };

  const blogs = [
    {
      title: "How to Safely Buy Used Mobile Phones Online",
      category: "Used Mobile",
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop",
      desc: "Learn how to verify battery health, IMEI numbers, display quality and avoid scams while purchasing used smartphones.",
      author: "TechBy Team",
      date: "May 12, 2026",
    },

    {
      title: "Best Used Laptops for Students & Developers",
      category: "Used Laptop",
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1200&auto=format&fit=crop",
      desc: "Discover affordable second-hand laptops perfect for coding, editing, classes and office work.",
      author: "Admin",
      date: "May 10, 2026",
    },

    {
      title: "Things to Check Before Buying a Used Bike",
      category: "Used Bike",
      image:
        "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1200&auto=format&fit=crop",
      desc: "Check RC, insurance, engine condition, tyre quality and more before purchasing a used bike.",
      author: "TechBy Team",
      date: "May 09, 2026",
    },

    {
      title: "Best Tablets & iPads for Entertainment",
      category: "Tablets",
      image:
        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1200&auto=format&fit=crop",
      desc: "Explore affordable used tablets and iPads perfect for movies, gaming, studying and daily productivity.",
      author: "Admin",
      date: "May 07, 2026",
    },

    {
      title: "Top Gaming Consoles You Can Buy Used",
      category: "Gaming Console",
      image:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop",
      desc: "Find PlayStation, Xbox and Nintendo gaming consoles at affordable prices with trusted sellers.",
      author: "TechBy Team",
      date: "May 05, 2026",
    },

    {
      title: "Best PS CDs & Games to Buy in 2026",
      category: "Gaming CDs",
      image:
        "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=1200&auto=format&fit=crop",
      desc: "Explore trending PlayStation CDs and popular games available at great prices on TechBy.",
      author: "Admin",
      date: "May 03, 2026",
    },

    {
      title: "Tips to Increase Laptop Battery Life",
      category: "Laptop Tips",
      image:
        "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?q=80&w=1200&auto=format&fit=crop",
      desc: "Improve your laptop performance and battery backup using these easy optimization techniques.",
      author: "TechBy Team",
      date: "April 30, 2026",
    },

    {
      title: "Why Refurbished Gadgets Are Becoming Popular",
      category: "Refurbished Tech",
      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop",
      desc: "Refurbished products help users save money while getting premium gadgets at affordable prices.",
      author: "TechBy Team",
      date: "April 28, 2026",
    },
    {
  title: "How to Check Used Gaming Consoles Before Buying",
  category: "Gaming Console",
  image:
    "https://images.unsplash.com/photo-1605901309584-818e25960a8f?q=80&w=1200&auto=format&fit=crop",
  desc: "Learn how to test controllers, check storage health, verify performance, and avoid faulty used gaming consoles before buying.",
  author: "TechBy Team",
  date: "May 13, 2026",
},
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">

      {/* HERO SECTION */}
      <div className="relative h-[520px] w-full overflow-hidden">

        <img
          src={featuredBlog.image}
          alt={featuredBlog.title}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60 flex items-center">

          <div className="max-w-6xl mx-auto px-6 text-white">

            <span className="bg-green-500 px-4 py-1 rounded-full text-sm font-medium">
              TechBy Featured
            </span>

            <h1 className="text-4xl md:text-6xl font-bold mt-5 leading-tight max-w-3xl">
              {featuredBlog.title}
            </h1>

            <p className="mt-5 text-lg text-gray-200 max-w-2xl leading-relaxed">
              {featuredBlog.desc}
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-6 text-sm text-gray-300">

              <span>{featuredBlog.author}</span>

              <span>•</span>

              <span>{featuredBlog.date}</span>

              <span>•</span>

              <span>{featuredBlog.category}</span>

            </div>

            <button className="mt-8 bg-green-500 hover:bg-green-600 transition-all duration-300 px-6 py-3 rounded-xl font-semibold shadow-lg">
              Read Article
            </button>

          </div>

        </div>

      </div>

      {/* SEARCH + CATEGORIES */}
      <div className="max-w-6xl mx-auto px-6 py-10">

        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">

          <div className="w-full md:w-[400px]">

            <input
              type="text"
              placeholder="Search blogs..."
              className="w-full border border-gray-300 bg-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />

          </div>

          <div className="flex flex-wrap gap-3">

            {[
              "All",
              "Used Mobile",
              "Laptop",
              "Bike",
              "Tablet",
              "Gaming",
              "PS CD",
            ].map((item) => (
              <button
                key={item}
                className="px-4 py-2 rounded-full bg-white border border-gray-300 hover:bg-green-500 hover:text-white hover:border-green-500 transition-all duration-300 text-sm"
              >
                {item}
              </button>
            ))}

          </div>

        </div>

      </div>

      {/* BLOG GRID */}
      <div className="max-w-6xl mx-auto px-6 pb-20">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {blogs.map((blog, index) => (

            <div
              key={index}
              className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group"
            >

              <div className="overflow-hidden h-56">

                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                />

              </div>

              <div className="p-6">

                <span className="text-green-600 text-sm font-semibold">
                  {blog.category}
                </span>

                <h2 className="text-2xl font-bold mt-3 leading-snug line-clamp-2">
                  {blog.title}
                </h2>

                <p className="text-gray-600 mt-3 text-sm leading-relaxed line-clamp-3">
                  {blog.desc}
                </p>

                <div className="flex items-center justify-between mt-6 text-sm text-gray-500">

                  <span>{blog.author}</span>

                  <span>{blog.date}</span>

                </div>

                <button className="mt-6 w-full bg-black text-white py-3 rounded-xl hover:bg-green-500 transition-all duration-300 font-medium">
                  Read More
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* NEWSLETTER */}
      <div className="bg-black text-white py-20 px-6">

        <div className="max-w-4xl mx-auto text-center">

          <h2 className="text-4xl font-bold">
            Stay Updated With TechBy
          </h2>

          <p className="mt-4 text-gray-300 text-lg leading-relaxed">
            Get updates about used mobiles, laptops, bikes, gaming consoles, tablets, iPads and latest gadget deals directly from TechBy.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8 max-w-2xl mx-auto">

            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-5 py-4 rounded-xl bg-white text-black outline-none"
            />

            <button className="bg-green-500 hover:bg-green-600 px-8 py-4 rounded-xl font-semibold transition-all duration-300">
              Subscribe
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}