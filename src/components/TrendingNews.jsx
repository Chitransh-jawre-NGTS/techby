import React, { useEffect, useState } from "react";
import axios from "axios";

export default function IndianNews() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const res = await axios.get(
        "https://api.gdeltproject.org/api/v2/doc/doc",
        {
          params: {
            query: "sourcecountry:IN sourcelang:eng",
            mode: "ArtList",
            format: "json",
            maxrecords: 9,
          },
        }
      );

      setNews(res.data.articles || []);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto bg-gray-100 p-5">
      <h1 className="text-3xl font-bold mb-6">
        🇮🇳 Trending Indian News
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {news.map((item, index) => (
          <a
            key={index}
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition"
          >
            {/* IMAGE */}
            <img
              src={
                item.socialimage ||
                "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1200"
              }
              alt={item.title}
              className="w-full h-52 object-cover"
            />

            <div className="p-4">
              <h2 className="font-bold text-gray-800 line-clamp-2">
                {item.title}
              </h2>

              <p className="text-sm text-gray-500 mt-2">
                {item.domain}
              </p>

              <p className="text-xs text-gray-400 mt-1">
                {item.seendate}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}