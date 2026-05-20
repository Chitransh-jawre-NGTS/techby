import React, { useState } from "react";
import {
  FaSearch,
  FaEllipsisV,
  FaShieldAlt,
  FaCheckCircle,
} from "react-icons/fa";

import Navbar from "../../../components/Navbar";

const InboxPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  const chats = [
    {
      id: 1,
      name: "Rahul Sharma",
      product: "Samsung Galaxy S22 available in good condition",
      message: "Bhai final price kya h ?",
      time: "YESTERDAY",
      unread: 2,
      image:
        "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=1000",
      avatar:
        "https://randomuser.me/api/portraits/men/32.jpg",
    },

    {
      id: 2,
      name: "Aman Verma",
      product: "iPhone 13 Pro Max 128GB",
      message: "Available h kya ?",
      time: "2 DAYS AGO",
      unread: 1,
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1000",
      avatar:
        "https://randomuser.me/api/portraits/men/45.jpg",
    },

    {
      id: 3,
      name: "Priya Jain",
      product: "MacBook Air M1 Chip",
      message: "Can you share more images?",
      time: "3 DAYS AGO",
      unread: 3,
      image:
        "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?q=80&w=1000",
      avatar:
        "https://randomuser.me/api/portraits/women/65.jpg",
    },
  ];

  return (
    <>
      <Navbar />

      {/* ONLY BIG DEVICES */}
      <div className="hidden max-w-7xl mx-auto border border-gray-200 lg:flex h-[calc(100vh-72px)] bg-[#f2f4f5]">

        {/* LEFT SIDEBAR */}
        <div className="w-[420px] bg-white border-r border-gray-300 flex flex-col">

          {/* HEADER */}
          <div className="p-5 border-b border-gray-200">

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-gray-900">
                  INBOX
                </h1>

                <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
                  21
                </span>
              </div>

              <button className="text-xl">
                <FaSearch />
              </button>
            </div>

            {/* FILTERS */}
            <div className="mt-5">
              <p className="text-sm text-gray-500 mb-3">
                Quick Filters
              </p>

              <div className="flex gap-3 flex-wrap">

                <button className="bg-green-100 text-green-700 px-5 py-2 rounded-full text-sm font-medium">
                  All
                </button>

                <button className="border border-gray-400 px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-100">
                  Unread
                </button>

                <button className="border border-gray-400 px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-100">
                  Important
                </button>

                <button className="border border-gray-400 px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-100">
                  Buyers
                </button>

                <button className="border border-gray-400 px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-100">
                  Sellers
                </button>
              </div>
            </div>

         
          </div>

          {/* CHAT LIST */}
          <div className="flex-1 overflow-y-auto">

            {chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={`cursor-pointer border-b border-gray-200 px-5 py-4 hover:bg-green-50 transition ${
                  selectedChat?.id === chat.id
                    ? "bg-green-50"
                    : "bg-white"
                }`}
              >

                <div className="flex gap-4">

                  {/* PRODUCT IMAGE */}
                  <div className="relative">

                    <img
                      src={chat.image}
                      alt=""
                      className="w-16 h-16 rounded-xl object-cover"
                    />

                    <img
                      src={chat.avatar}
                      alt=""
                      className="w-6 h-6 rounded-full border-2 border-white absolute -bottom-1 -right-1"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="flex-1 min-w-0">

                    <div className="flex justify-between items-start">

                      <div>
                        <h2 className="font-bold text-gray-900 text-lg">
                          {chat.name}
                        </h2>

                        <p className="text-sm text-gray-700 truncate mt-1">
                          {chat.product}
                        </p>
                      </div>

                      <span className="text-xs text-green-600 font-medium whitespace-nowrap">
                        {chat.time}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-3">

                      <p className="text-gray-500 text-sm truncate">
                        {chat.message}
                      </p>

                      <div className="flex items-center gap-3">

                        <span className="bg-green-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                          {chat.unread}
                        </span>

                        <button>
                          <FaEllipsisV className="text-gray-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* PAGINATION */}
          <div className="p-4 border-t border-gray-200 flex items-center justify-center gap-3">

            <button className="w-10 h-10 border rounded-xl hover:bg-gray-100">
              ‹
            </button>

            <button className="w-10 h-10 bg-green-600 text-white rounded-xl font-bold">
              1
            </button>

            <button className="w-10 h-10 border rounded-xl hover:bg-gray-100">
              2
            </button>

            <button className="w-10 h-10 border rounded-xl hover:bg-gray-100">
              ›
            </button>
          </div>
        </div>

        {/* RIGHT CHAT AREA */}
        <div className="flex-1 bg-[#f7f8f9] flex items-center justify-center">

          {!selectedChat ? (
            <div className="text-center">

              <div className="w-28 h-28 bg-green-100 rounded-full flex items-center justify-center mx-auto">

                <div className="relative">
                  <div className="w-14 h-14 bg-green-600 rounded-2xl"></div>

                  <div className="w-14 h-14 bg-green-200 rounded-2xl absolute -top-5 -left-5"></div>
                </div>
              </div>

              <h2 className="text-2xl font-semibold text-gray-800 mt-8">
                Select a chat to view conversation
              </h2>

              <p className="text-gray-500 mt-2">
                Your messages will appear here
              </p>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col">

              {/* CHAT HEADER */}
              <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">

                <div className="flex items-center gap-4">

                  <img
                    src={selectedChat.avatar}
                    alt=""
                    className="w-14 h-14 rounded-full object-cover"
                  />

                  <div>
                    <div className="flex items-center gap-2">

                      <h2 className="text-xl font-bold">
                        {selectedChat.name}
                      </h2>

                      <FaCheckCircle className="text-green-600" />
                    </div>

                    <p className="text-gray-500">
                      Active now
                    </p>
                  </div>
                </div>

                <button>
                  <FaEllipsisV className="text-gray-600 text-lg" />
                </button>
              </div>

              {/* CHAT BODY */}
              <div className="flex-1 p-6 overflow-y-auto">

                <div className="max-w-md bg-white rounded-3xl p-4 shadow-sm border border-gray-200">

                  <p className="text-gray-800">
                    Hello, is this product still available?
                  </p>

                  <span className="text-xs text-gray-400 mt-2 block">
                    10:42 AM
                  </span>
                </div>

                <div className="max-w-md bg-green-600 text-white rounded-3xl p-4 shadow-sm ml-auto mt-5">

                  <p>
                    Yes available 👍
                  </p>

                  <span className="text-xs text-green-100 mt-2 block">
                    10:45 AM
                  </span>
                </div>
              </div>

              {/* INPUT */}
              <div className="bg-white border-t border-gray-200 p-5">

                <div className="flex items-center gap-4">

                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:border-green-600"
                  />

                  <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl font-semibold">
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default InboxPage;