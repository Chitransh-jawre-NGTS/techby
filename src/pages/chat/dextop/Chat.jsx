// import React, { useState } from "react";

// import {
//   FaArrowLeft,
//   FaPhoneAlt,
//   FaEllipsisV,
//   FaPaperPlane,
//   FaSearch,
//   FaVideo,
// } from "react-icons/fa";

// import Navbar from "../../../components/Navbar";
// import MobileBottomNavbar from "../../../components/MobileBottomNavbar";

// const ChatPage = () => {
//   const [selectedChat, setSelectedChat] = useState(null);
//   const [message, setMessage] = useState("");

//   // ================= CHAT LIST =================
//   const chats = [
//     {
//       id: 1,
//       name: "Rahul Sharma",
//       product: "Samsung Galaxy S22 available in good condition",
//       lastMessage: "Bhai final price kya h ?",
//       time: "2m",
//       unread: 2,

//       image:
//         "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=1000",

//       avatar:
//         "https://randomuser.me/api/portraits/men/32.jpg",

//       price: "₹17,999",
//     },

//     {
//       id: 2,
//       name: "Aman Verma",
//       product: "iPhone 13 Pro Max 128GB",
//       lastMessage: "Available h kya ?",
//       time: "10m",
//       unread: 1,

//       image:
//         "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1000",

//       avatar:
//         "https://randomuser.me/api/portraits/men/45.jpg",

//       price: "₹52,000",
//     },

//     {
//       id: 3,
//       name: "Priya Jain",
//       product: "MacBook Air M1 Chip",
//       lastMessage: "Can you share more images?",
//       time: "1h",
//       unread: 3,

//       image:
//         "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?q=80&w=1000",

//       avatar:
//         "https://randomuser.me/api/portraits/women/65.jpg",

//       price: "₹45,000",
//     },
//   ];

//   // ================= DUMMY MESSAGES =================
//   const messages = [
//     {
//       id: 1,
//       type: "received",
//       text: "Hello bro, is this still available?",
//       time: "10:22 AM",
//     },

//     {
//       id: 2,
//       type: "sent",
//       text: "Yes available 👍",
//       time: "10:24 AM",
//     },

//     {
//       id: 3,
//       type: "received",
//       text: "Can you share final price?",
//       time: "10:25 AM",
//     },

//     {
//       id: 4,
//       type: "sent",
//       text: "₹17,500 final",
//       time: "10:27 AM",
//     },
//   ];

//   return (
//     <>
//       {/* ================= MOBILE VIEW ================= */}
//       <div className="lg:hidden h-screen bg-[#f4f7f4]">

//         {/* ================= CHAT LIST PAGE ================= */}
//         {!selectedChat ? (
//           <div className="flex flex-col h-full">

//             {/* HEADER */}
//             <div className="bg-white px-4 py-4 border-b border-gray-200 sticky top-0 z-10">

//               <h1 className="text-3xl font-bold text-gray-800">
//                 Messages
//               </h1>

//               <p className="text-gray-500 mt-1">
//                 Chat with buyers & sellers
//               </p>

//               {/* SEARCH */}
//               <div className="relative mt-4">

//                 <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

//                 <input
//                   type="text"
//                   placeholder="Search chats..."
//                   className="w-full bg-gray-100 rounded-2xl pl-12 pr-4 py-3 outline-none"
//                 />
//               </div>
//             </div>

//             {/* CHAT LIST */}
//             <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">

//               {chats.map((chat) => (
//                 <div
//                   key={chat.id}
//                   onClick={() => setSelectedChat(chat)}
//                   className="bg-white rounded-3xl p-3 shadow-sm border border-gray-200 flex gap-3 active:scale-[0.98] transition"
//                 >

//                   {/* PRODUCT IMAGE */}
//                   <div className="relative">

//                     <img
//                       src={chat.image}
//                       alt=""
//                       className="w-20 h-20 rounded-2xl object-cover"
//                     />

//                     {/* USER AVATAR */}
//                     <img
//                       src={chat.avatar}
//                       alt=""
//                       className="w-7 h-7 rounded-full border-2 border-white absolute -bottom-1 -right-1"
//                     />
//                   </div>

//                   {/* CONTENT */}
//                   <div className="flex-1 min-w-0">

//                     <div className="flex items-start justify-between gap-2">

//                       <div className="min-w-0">

//                         <h2 className="font-bold text-gray-800 truncate">
//                           {chat.name}
//                         </h2>

//                         <p className="text-sm text-gray-500 truncate mt-1">
//                           {chat.product}
//                         </p>
//                       </div>

//                       <span className="text-xs text-green-600 whitespace-nowrap font-medium">
//                         {chat.time}
//                       </span>
//                     </div>

//                     {/* LAST MESSAGE */}
//                     <div className="flex items-center justify-between mt-3">

//                       <p className="text-sm text-gray-600 truncate">
//                         {chat.lastMessage}
//                       </p>

//                       <span className="w-6 h-6 rounded-full bg-green-600 text-white text-xs flex items-center justify-center font-semibold ml-3">
//                         {chat.unread}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* BOTTOM NAVBAR */}
//             <MobileBottomNavbar />
//           </div>
//         ) : (

//           /* ================= SINGLE CHAT PAGE ================= */
//           <div className="flex flex-col h-full">

//             {/* HEADER */}
//             <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">

//               <div className="flex items-center gap-3">

//                 {/* BACK BUTTON */}
//                 <button onClick={() => setSelectedChat(null)}>
//                   <FaArrowLeft className="text-gray-700 text-lg" />
//                 </button>

//                 {/* USER IMAGE */}
//                 <img
//                   src={selectedChat.avatar}
//                   alt=""
//                   className="w-11 h-11 rounded-full object-cover"
//                 />

//                 {/* USER INFO */}
//                 <div>

//                   <h2 className="font-bold text-gray-800">
//                     {selectedChat.name}
//                   </h2>

//                   <p className="text-xs text-green-600">
//                     Online
//                   </p>
//                 </div>
//               </div>

//               {/* ACTIONS */}
//               <div className="flex items-center gap-5 text-gray-700">

//                 <button>
//                   <FaPhoneAlt />
//                 </button>

//                 <button>
//                   <FaVideo />
//                 </button>

//                 <button>
//                   <FaEllipsisV />
//                 </button>
//               </div>
//             </div>

//             {/* PRODUCT CARD */}
//             <div className="bg-white mx-3 mt-3 rounded-2xl p-3 shadow-sm border border-gray-200">

//               <div className="flex gap-3">

//                 <img
//                   src={selectedChat.image}
//                   alt=""
//                   className="w-20 h-20 rounded-xl object-cover"
//                 />

//                 <div className="flex-1">

//                   <h2 className="font-semibold text-gray-800 line-clamp-2">
//                     {selectedChat.product}
//                   </h2>

//                   <p className="text-green-700 font-bold text-lg mt-1">
//                     {selectedChat.price}
//                   </p>

//                   <button className="mt-2 bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-medium">
//                     View Listing
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* CHAT AREA */}
//             <div className="flex-1 overflow-y-auto px-3 py-4 space-y-4">

//               {messages.map((msg) => (
//                 <div
//                   key={msg.id}
//                   className={`flex ${
//                     msg.type === "sent"
//                       ? "justify-end"
//                       : "justify-start"
//                   }`}
//                 >

//                   <div
//                     className={`max-w-[80%] px-4 py-3 rounded-3xl shadow-sm ${
//                       msg.type === "sent"
//                         ? "bg-green-600 text-white rounded-br-md"
//                         : "bg-white text-gray-800 rounded-bl-md border border-gray-200"
//                     }`}
//                   >

//                     <p className="text-sm leading-6">
//                       {msg.text}
//                     </p>

//                     <span
//                       className={`text-[11px] mt-1 block ${
//                         msg.type === "sent"
//                           ? "text-green-100"
//                           : "text-gray-400"
//                       }`}
//                     >
//                       {msg.time}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* INPUT */}
//             <div className="bg-white border-t border-gray-200 p-3">

//               <div className="flex items-center gap-3">

//                 <input
//                   type="text"
//                   placeholder="Type a message..."
//                   value={message}
//                   onChange={(e) => setMessage(e.target.value)}
//                   className="flex-1 bg-gray-100 rounded-full px-5 py-3 outline-none"
//                 />

//                 <button className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center shadow-lg">
//                   <FaPaperPlane />
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* ================= DESKTOP / LAPTOP ================= */}
//       <div className="hidden lg:flex flex-col h-screen bg-[#f4f7f4]">

//         <Navbar />

//         <div className="flex flex-1 overflow-hidden">

//           {/* SIDEBAR */}
//           <div className="w-[380px] bg-white border-r border-gray-200 flex flex-col">

//             {/* SEARCH */}
//             <div className="p-4 border-b border-gray-200">

//               <div className="relative">

//                 <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

//                 <input
//                   type="text"
//                   placeholder="Search chats..."
//                   className="w-full bg-gray-100 rounded-2xl pl-12 pr-4 py-3 outline-none"
//                 />
//               </div>
//             </div>

//             {/* CHAT USERS */}
//             <div className="flex-1 overflow-y-auto">

//               {chats.map((chat) => (
//                 <div
//                   key={chat.id}
//                   onClick={() => setSelectedChat(chat)}
//                   className={`flex items-center gap-3 px-4 py-4 cursor-pointer border-b border-gray-100 hover:bg-green-50 ${
//                     selectedChat?.id === chat.id
//                       ? "bg-green-50"
//                       : ""
//                   }`}
//                 >

//                   <div className="relative">

//                     <img
//                       src={chat.avatar}
//                       alt=""
//                       className="w-14 h-14 rounded-full object-cover"
//                     />

//                     <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
//                   </div>

//                   <div className="flex-1 min-w-0">

//                     <div className="flex items-center justify-between">

//                       <h2 className="font-semibold text-gray-800">
//                         {chat.name}
//                       </h2>

//                       <span className="text-xs text-gray-400">
//                         {chat.time}
//                       </span>
//                     </div>

//                     <p className="text-sm text-gray-500 truncate mt-1">
//                       {chat.lastMessage}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* RIGHT CHAT AREA */}
//           <div className="flex-1 flex flex-col">

//             {!selectedChat ? (

//               /* EMPTY SCREEN */
//               <div className="flex-1 flex items-center justify-center">

//                 <div className="text-center">

//                   <div className="w-28 h-28 bg-green-100 rounded-full flex items-center justify-center mx-auto">

//                     <div className="w-14 h-14 bg-green-600 rounded-2xl"></div>
//                   </div>

//                   <h2 className="text-2xl font-bold text-gray-800 mt-6">
//                     Select a chat
//                   </h2>

//                   <p className="text-gray-500 mt-2">
//                     Your conversation will appear here
//                   </p>
//                 </div>
//               </div>
//             ) : (

//               <>
//                 {/* CHAT HEADER */}
//                 <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">

//                   <div className="flex items-center gap-4">

//                     <img
//                       src={selectedChat.avatar}
//                       alt=""
//                       className="w-14 h-14 rounded-full object-cover"
//                     />

//                     <div>

//                       <h2 className="text-lg font-bold text-gray-800">
//                         {selectedChat.name}
//                       </h2>

//                       <p className="text-sm text-green-600">
//                         Online
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-5 text-gray-700">

//                     <button>
//                       <FaPhoneAlt />
//                     </button>

//                     <button>
//                       <FaVideo />
//                     </button>

//                     <button>
//                       <FaEllipsisV />
//                     </button>
//                   </div>
//                 </div>

//                 {/* PRODUCT */}
//                 <div className="bg-white border-b border-gray-200 px-6 py-4">

//                   <div className="flex items-center gap-4">

//                     <img
//                       src={selectedChat.image}
//                       alt=""
//                       className="w-24 h-24 rounded-2xl object-cover"
//                     />

//                     <div>

//                       <h2 className="font-bold text-xl text-gray-800">
//                         {selectedChat.product}
//                       </h2>

//                       <p className="text-green-700 font-bold text-2xl mt-1">
//                         {selectedChat.price}
//                       </p>

//                       <button className="mt-3 bg-green-600 text-white px-5 py-2 rounded-xl font-medium hover:bg-green-700">
//                         View Listing
//                       </button>
//                     </div>
//                   </div>
//                 </div>

//                 {/* MESSAGES */}
//                 <div className="flex-1 overflow-y-auto p-6 space-y-5">

//                   {messages.map((msg) => (
//                     <div
//                       key={msg.id}
//                       className={`flex ${
//                         msg.type === "sent"
//                           ? "justify-end"
//                           : "justify-start"
//                       }`}
//                     >

//                       <div
//                         className={`max-w-md px-5 py-4 rounded-3xl shadow-sm ${
//                           msg.type === "sent"
//                             ? "bg-green-600 text-white rounded-br-md"
//                             : "bg-white border border-gray-200 text-gray-800 rounded-bl-md"
//                         }`}
//                       >

//                         <p className="leading-7">
//                           {msg.text}
//                         </p>

//                         <span
//                           className={`text-xs mt-2 block ${
//                             msg.type === "sent"
//                               ? "text-green-100"
//                               : "text-gray-400"
//                           }`}
//                         >
//                           {msg.time}
//                         </span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 {/* INPUT */}
//                 <div className="bg-white border-t border-gray-200 p-5">

//                   <div className="flex items-center gap-4">

//                     <input
//                       type="text"
//                       placeholder="Type your message..."
//                       className="flex-1 bg-gray-100 rounded-2xl px-5 py-4 outline-none"
//                     />

//                     <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl font-semibold">
//                       Send
//                     </button>
//                   </div>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ChatPage; 


























import React, { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaPhoneAlt,
  FaEllipsisV,
  FaPaperPlane,
  FaSearch,
  FaVideo,
} from "react-icons/fa";

import Navbar from "../../../components/Navbar";
import MobileBottomNavbar from "../../../components/MobileBottomNavbar";
import { useLocation } from "react-router-dom";
import API from "../../../Api/chatApi";
import socket from "../../../socket";

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);

  const location = useLocation();
  const currentUserId = localStorage.getItem("userId");

  // LOAD CHAT FROM NAV
  useEffect(() => {
    if (location.state?.chat) {
      setSelectedChat(location.state.chat);
    }
  }, [location.state]);

  // FETCH CHATS
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await API.get("/chat/conversations");
        setChats(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchChats();
  }, []);

  // FETCH MESSAGES
  useEffect(() => {
    if (!selectedChat?._id) return;

    const fetchMessages = async () => {
      try {
        const res = await API.get(
          `/chat/messages/${selectedChat._id}`
        );
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchMessages();
    socket.emit("join_chat", selectedChat._id);
  }, [selectedChat]);

  // SOCKET LISTENER
  useEffect(() => {
    const handleMessage = (msg) => {
      if (msg.conversationId === selectedChat?._id) {
        setMessages((prev) => [...prev, msg]);
      }
    };

    socket.on("receive_message", handleMessage);

    return () => socket.off("receive_message", handleMessage);
  }, [selectedChat]);

  // SEND MESSAGE
  const sendMessage = async () => {
    if (!message.trim() || !selectedChat) return;

    const payload = {
      conversationId: selectedChat._id,
      senderId: currentUserId,
      text: message,
    };

    try {
      const res = await API.post("/chat/message", payload);

      socket.emit("send_message", res.data);
      setMessages((prev) => [...prev, res.data]);
      setMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {/* ================= MOBILE ================= */}
      <div className="lg:hidden h-screen bg-gradient-to-b from-green-50 to-gray-100">

        {!selectedChat ? (
          <div className="flex flex-col h-full">

            {/* HEADER */}
            <div className="bg-white px-4 py-5 shadow-sm border-b">
              <h1 className="text-2xl font-bold text-gray-800">
                Messages
              </h1>

              <div className="relative mt-4">
                <FaSearch className="absolute left-3 top-3 text-gray-400" />

                <input
                  className="w-full bg-gray-100 pl-10 py-2 rounded-xl outline-none focus:ring-2 focus:ring-green-400"
                  placeholder="Search chats..."
                />
              </div>
            </div>

            {/* CHAT LIST */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3">

              {chats.map((chat) => (
                <div
                  key={chat._id}
                  onClick={() => setSelectedChat(chat)}
                  className="bg-white p-4 rounded-2xl shadow-sm border hover:shadow-md transition cursor-pointer"
                >
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-gray-800">
                      Chat
                    </p>
                    <span className="text-xs text-gray-400">
                      now
                    </span>
                  </div>

                  <p className="text-sm text-gray-500 mt-1 truncate">
                    {chat?.lastMessage?.text ||
                      "Start a conversation"}
                  </p>
                </div>
              ))}
            </div>

            <MobileBottomNavbar />
          </div>
        ) : (
          <div className="flex flex-col h-full">

            {/* CHAT HEADER */}
            <div className="bg-white flex items-center justify-between p-4 shadow-sm border-b">

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedChat(null)}
                  className="text-gray-600"
                >
                  <FaArrowLeft />
                </button>

                <div>
                  <h2 className="font-bold text-gray-800">
                    Chat
                  </h2>
                  <p className="text-green-500 text-xs">
                    Online
                  </p>
                </div>
              </div>

              <div className="flex gap-5 text-gray-600">
                <FaPhoneAlt />
                <FaVideo />
                <FaEllipsisV />
              </div>
            </div>

            {/* MESSAGES */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#f5f7f6]">

              {messages.map((msg) => (
                <div
                  key={msg._id}
                  className={`flex ${
                    msg.senderId === currentUserId
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`px-4 py-2 rounded-2xl max-w-[75%] text-sm shadow-sm ${
                      msg.senderId === currentUserId
                        ? "bg-green-500 text-white rounded-br-sm"
                        : "bg-white text-gray-800 rounded-bl-sm border"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* INPUT */}
            <div className="p-3 bg-white flex items-center gap-2 border-t">

              <input
                value={message}
                onChange={(e) =>
                  setMessage(e.target.value)
                }
                placeholder="Type a message..."
                className="flex-1 bg-gray-100 px-4 py-3 rounded-full outline-none focus:ring-2 focus:ring-green-400"
              />

              <button
                onClick={sendMessage}
                className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-md transition"
              >
                <FaPaperPlane />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ================= DESKTOP ================= */}
      <div className="hidden lg:flex h-screen bg-gray-100">

        <Navbar />

        <div className="flex flex-1">

          {/* SIDEBAR */}
          <div className="w-[380px] bg-white border-r overflow-y-auto">

            <div className="p-4 border-b">
              <h2 className="text-xl font-bold text-gray-800">
                Messages
              </h2>
            </div>

            {chats.map((chat) => (
              <div
                key={chat._id}
                onClick={() => setSelectedChat(chat)}
                className="p-4 border-b hover:bg-gray-50 cursor-pointer transition"
              >
                <p className="font-semibold text-gray-800">
                  Chat
                </p>

                <p className="text-sm text-gray-500 truncate mt-1">
                  {chat?.lastMessage?.text ||
                    "No messages yet"}
                </p>
              </div>
            ))}
          </div>

          {/* CHAT AREA */}
          <div className="flex-1 flex flex-col">

            {!selectedChat ? (
              <div className="flex-1 flex items-center justify-center text-gray-400 text-lg">
                Select a chat to start messaging
              </div>
            ) : (
              <>
                {/* HEADER */}
                <div className="p-4 bg-white border-b font-semibold">
                  Chat
                </div>

                {/* MESSAGES */}
                <div className="flex-1 p-4 overflow-y-auto space-y-2 bg-gray-50">

                  {messages.map((msg) => (
                    <div
                      key={msg._id}
                      className={`flex ${
                        msg.senderId === currentUserId
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`px-4 py-2 rounded-2xl text-sm max-w-[60%] shadow-sm ${
                          msg.senderId === currentUserId
                            ? "bg-green-500 text-white"
                            : "bg-white border text-gray-800"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                {/* INPUT */}
                <div className="p-4 bg-white border-t flex gap-2">

                  <input
                    value={message}
                    onChange={(e) =>
                      setMessage(e.target.value)
                    }
                    className="flex-1 border rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-green-400"
                    placeholder="Type message..."
                  />

                  <button
                    onClick={sendMessage}
                    className="bg-green-500 text-white px-5 rounded-full hover:bg-green-600 transition"
                  >
                    <FaPaperPlane />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatPage;