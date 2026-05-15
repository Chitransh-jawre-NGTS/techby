import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Search } from "lucide-react";
import { FaSearch } from "react-icons/fa";

const MobileNavbar = () => {
  const navigate = useNavigate();

  const [location, setLocation] = useState(
    localStorage.getItem("selectedCity") || "Indore"
  );

  const [showLocationList, setShowLocationList] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const placeholders = [
    "Search mobiles",
    "Search laptops",
    "Search gaming consoles",
    "Search accessories",
  ];

  const [placeholderIndex] = useState(0);

  const products = [
    "Mobile",
    "Laptop",
    "PS",
    "Gaming Console",
    "CD",
    "Headphones",
    "Watch",
  ];

  const cities = ["Indore"];

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchTerm.trim()) {
      navigate(`/search?q=${searchTerm}`);
      setSearchTerm("");
      setShowSuggestions(false);
    }
  };

  const handleLocationChange = (city) => {
    setLocation(city);
    localStorage.setItem("selectedCity", city);
    setShowLocationList(false);
    window.location.reload();
  };

  const filteredSuggestions = products.filter((p) =>
    p.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="lg:hidden sticky top-0 z-50 bg-white border-b border-gray-200 px-3 py-2 flex items-center gap-2">

      {/* BACK BUTTON */}
      <button
        onClick={() => window.history.back()}
        className="p-2 rounded-full hover:bg-gray-100 transition"
      >
        <ArrowLeft size={20} />
      </button>

      {/* SEARCH */}
      <div className="flex-1 relative">

        <form onSubmit={handleSearch} autoComplete="off">

          <div className="flex items-center border border-green-400 rounded-full px-2">

            <FaSearch className="text-gray-400" size={14} />

            <input
              type="text"
              placeholder={placeholders[placeholderIndex]}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowSuggestions(true);
              }}
              className="flex-1 px-2 py-2 text-sm focus:outline-none"
            />

          </div>

          {/* Suggestions */}
          {showSuggestions &&
            searchTerm &&
            filteredSuggestions.length > 0 && (
              <div className="absolute top-12 left-0 right-0 bg-white border rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">

                {filteredSuggestions.map((item) => (
                  <div
                    key={item}
                    className="px-4 py-2 hover:bg-green-50 cursor-pointer text-sm"
                    onClick={() => {
                      setSearchTerm(item);
                      navigate(`/search?q=${item}`);
                      setShowSuggestions(false);
                    }}
                  >
                    {item}
                  </div>
                ))}

              </div>
            )}

        </form>

      </div>

      {/* LOCATION */}
      <div className="relative">

        <button
          onClick={() => setShowLocationList(!showLocationList)}
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <MapPin className="text-green-600" size={20} />
        </button>

        {/* DROPDOWN */}
        {showLocationList && (
          <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-lg z-50 w-40">

            {cities.map((city) => (
              <div
                key={city}
                onClick={() => handleLocationChange(city)}
                className={`px-4 py-2 cursor-pointer hover:bg-green-50 text-sm ${
                  location === city
                    ? "bg-green-100 font-semibold"
                    : ""
                }`}
              >
                {city}
              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
};

export default MobileNavbar;