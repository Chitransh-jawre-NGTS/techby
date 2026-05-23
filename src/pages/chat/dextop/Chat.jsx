// // ======================================================
// // MODERN CHAT PAGE UI
// // ======================================================

// import React, {
//   useEffect,
//   useState,
//   useRef,
// } from "react";

// import axios from "axios";

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

// const API =
//   import.meta.env.VITE_API_URL ||
//   "http://localhost:5000/api";

// const ChatPage = () => {
//   const [selectedChat, setSelectedChat] =
//     useState(null);

//   const [message, setMessage] =
//     useState("");

//   const [chats, setChats] = useState([]);

//   const [messages, setMessages] =
//     useState([]);

//   const [loading, setLoading] =
//     useState(false);

//   const bottomRef = useRef(null);

//   // ======================================================
//   // TOKEN
//   // ======================================================

//   const token =
//     localStorage.getItem("token");

//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   // ======================================================
//   // GET CHATS
//   // ======================================================

//   const getChats = async () => {
//     try {
//       const res = await axios.get(
//         `${API}/chat/conversation`,
//         config
//       );

//       setChats(res.data || []);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // ======================================================
//   // GET MESSAGES
//   // ======================================================

//   const getMessages = async (
//     conversationId
//   ) => {
//     try {
//       setLoading(true);

//       const res = await axios.get(
//         `${API}/chat/messages/${conversationId}`,
//         config
//       );

//       setMessages(res.data || []);

//       setLoading(false);
//     } catch (err) {
//       console.log(err);
//       setLoading(false);
//     }
//   };

//   // ======================================================
//   // SEND MESSAGE
//   // ======================================================

//   const sendMessage = async () => {
//     try {
//       if (!message.trim()) return;

//       const res = await axios.post(
//         `${API}/chat/message`,
//         {
//           conversationId:
//             selectedChat._id,
//           text: message,
//         },
//         config
//       );

//       setMessages((prev) => [
//         ...prev,
//         res.data,
//       ]);

//       setMessage("");

//       getChats();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // ======================================================
//   // OPEN CHAT
//   // ======================================================

//   const openChat = (chat) => {
//     setSelectedChat(chat);

//     getMessages(chat._id);
//   };

//   // ======================================================
//   // LOAD CHATS
//   // ======================================================

//   useEffect(() => {
//     getChats();
//   }, []);

//   // ======================================================
//   // AUTO SCROLL
//   // ======================================================

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({
//       behavior: "smooth",
//     });
//   }, [messages]);

//   // ======================================================
//   // GET OTHER USER
//   // ======================================================

//   const getOtherUser = (
//     participants
//   ) => {
//     const currentUser = JSON.parse(
//       localStorage.getItem("user")
//     );

//     return participants?.find(
//       (p) =>
//         p._id !== currentUser?.id
//     );
//   };

//   // ======================================================
//   // CHECK OWN MESSAGE
//   // ======================================================

//   const isMyMessage = (msg) => {
//     const currentUser = JSON.parse(
//       localStorage.getItem("user")
//     );

//     const senderId =
//       typeof msg.senderId ===
//       "object"
//         ? msg.senderId._id
//         : msg.senderId;

//     return (
//       senderId === currentUser?.id
//     );
//   };

//   return (
//     <>
//       {/* ====================================================== */}
//       {/* MOBILE */}
//       {/* ====================================================== */}

//       <div className="lg:hidden h-screen bg-[#f4f7f4]">

//         {!selectedChat ? (
//           <div className="flex flex-col h-full">

//             {/* HEADER */}
//             <div className="bg-white px-4 py-4 border-b">

//               <h1 className="text-3xl font-bold text-gray-800">
//                 Messages
//               </h1>

//               <p className="text-gray-500 mt-1">
//                 Chat with buyers &
//                 sellers
//               </p>

//               {/* SEARCH */}
//               <div className="relative mt-4">

//                 <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   className="w-full bg-gray-100 rounded-2xl pl-12 pr-4 py-3 outline-none"
//                 />
//               </div>
//             </div>

//             {/* CHAT LIST */}
//             <div className="flex-1 overflow-y-auto p-3 space-y-3">

//               {chats?.map((chat) => {
//                 const otherUser =
//                   getOtherUser(
//                     chat.participants
//                   );

//                 return (
//                   <div
//                     key={chat._id}
//                     onClick={() =>
//                       openChat(chat)
//                     }
//                     className="bg-white rounded-2xl p-3 shadow-sm flex gap-3 active:scale-[0.98] transition"
//                   >

//                     {/* PRODUCT IMAGE */}
//                     <div className="relative">

//                       <img
//                         src={
//                           chat.productId
//                             ?.imageUrls?.[0]
//                             ?.url ||
//                           "https://via.placeholder.com/100"
//                         }
//                         alt=""
//                         className="w-20 h-20 rounded-2xl object-cover"
//                       />

//                       <img
//                         src={
//                           otherUser?.profileImage ||
//                           "https://randomuser.me/api/portraits/men/32.jpg"
//                         }
//                         alt=""
//                         className="w-7 h-7 rounded-full border-2 border-white absolute -bottom-1 -right-1"
//                       />
//                     </div>

//                     {/* CONTENT */}
//                     <div className="flex-1">

//                       <div className="flex justify-between">

//                         <div>

//                           <h2 className="font-bold text-gray-800">
//                             {
//                               otherUser?.name
//                             }
//                           </h2>

//                           <p className="text-sm text-gray-500 truncate mt-1">
//                             {
//                               chat
//                                 ?.productId
//                                 ?.name
//                             }
//                           </p>
//                         </div>

//                         <span className="text-xs text-green-600">
//                           {new Date(
//                             chat.updatedAt
//                           ).toLocaleTimeString()}
//                         </span>
//                       </div>

//                       <p className="text-sm text-gray-600 truncate mt-3">
//                         {
//                           chat
//                             ?.lastMessage
//                             ?.text
//                         }
//                       </p>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             <MobileBottomNavbar />
//           </div>
//         ) : (
//           <div className="flex flex-col h-full">

//             {/* CHAT HEADER */}
//             <div className="bg-[#f0f2f5] border-b px-4 py-3 flex justify-between items-center sticky top-0 z-20">

//               <div className="flex items-center gap-3">

//                 <button
//                   onClick={() =>
//                     setSelectedChat(null)
//                   }
//                 >
//                   <FaArrowLeft className="text-lg" />
//                 </button>

//                 <img
//                   src={
//                     getOtherUser(
//                       selectedChat.participants
//                     )?.profileImage ||
//                     "https://randomuser.me/api/portraits/men/32.jpg"
//                   }
//                   alt=""
//                   className="w-11 h-11 rounded-full"
//                 />

//                 <div>

//                   <h2 className="font-bold">
//                     {
//                       getOtherUser(
//                         selectedChat.participants
//                       )?.name
//                     }
//                   </h2>

//                   <p className="text-xs text-green-600">
//                     Online
//                   </p>
//                 </div>
//               </div>

//               <div className="flex gap-5 text-gray-700">

//                 <FaPhoneAlt />

//                 <FaVideo />

//                 <FaEllipsisV />
//               </div>
//             </div>

//             {/* MESSAGES */}
//             <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#efeae2]">

//               {loading ? (
//                 <p>Loading...</p>
//               ) : (
//                 messages?.map((msg) => {
//                   const isMine =
//                     isMyMessage(msg);

//                   return (
//                     <div
//                       key={msg._id}
//                       className={`flex ${
//                         isMine
//                           ? "justify-end"
//                           : "justify-start"
//                       }`}
//                     >

//                       <div
//                         className={`max-w-[78%] px-4 py-2.5 shadow-sm ${
//                           isMine
//                             ? "bg-[#d9fdd3] text-black rounded-2xl rounded-br-sm"
//                             : "bg-white rounded-2xl rounded-bl-sm"
//                         }`}
//                       >

//                         <p className="text-[15px] leading-relaxed">
//                           {msg.text}
//                         </p>

//                         <span className="text-[10px] text-gray-500 text-right block mt-1">
//                           {new Date(
//                             msg.createdAt
//                           ).toLocaleTimeString()}
//                         </span>
//                       </div>
//                     </div>
//                   );
//                 })
//               )}

//               <div ref={bottomRef}></div>
//             </div>

//             {/* INPUT */}
//             <div className="bg-[#f0f2f5] px-3 py-2 border-t">

//               <div className="flex gap-3 items-center">

//                 <input
//                   type="text"
//                   value={message}
//                   onChange={(e) =>
//                     setMessage(
//                       e.target.value
//                     )
//                   }
//                   onKeyDown={(e) => {
//                     if (
//                       e.key === "Enter"
//                     ) {
//                       sendMessage();
//                     }
//                   }}
//                   placeholder="Type message..."
//                   className="flex-1 bg-white rounded-full px-5 py-3 outline-none shadow-sm"
//                 />

//                 <button
//                   onClick={sendMessage}
//                   className="w-12 h-12 rounded-full bg-[#00a884] text-white flex items-center justify-center shadow-md active:scale-95 transition"
//                 >
//                   <FaPaperPlane />
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* ====================================================== */}
//       {/* DESKTOP */}
//       {/* ====================================================== */}

//       <div className="hidden lg:flex flex-col h-screen bg-[#f0f2f5]">

//         <Navbar />

//         <div className="flex flex-1 overflow-hidden">

//           {/* SIDEBAR */}
//           <div className="w-[380px] bg-white border-r flex flex-col">

//             {/* SEARCH */}
//             <div className="p-4 border-b bg-white">

//               <div className="relative">

//                 <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   className="w-full bg-gray-100 rounded-2xl pl-12 pr-4 py-3 outline-none"
//                 />
//               </div>
//             </div>

//             {/* CHAT LIST */}
//             <div className="flex-1 overflow-y-auto bg-white">

//               {chats?.map((chat) => {
//                 const otherUser =
//                   getOtherUser(
//                     chat.participants
//                   );

//                 return (
//                   <div
//                     key={chat._id}
//                     onClick={() =>
//                       openChat(chat)
//                     }
//                     className={`flex gap-3 p-4 cursor-pointer border-b transition ${
//                       selectedChat?._id ===
//                       chat._id
//                         ? "bg-green-50"
//                         : "hover:bg-gray-50"
//                     }`}
//                   >

//                     <img
//                       src={
//                         otherUser?.profileImage ||
//                         "https://randomuser.me/api/portraits/men/32.jpg"
//                       }
//                       alt=""
//                       className="w-14 h-14 rounded-full"
//                     />

//                     <div className="flex-1">

//                       <div className="flex justify-between">

//                         <h2 className="font-semibold">
//                           {
//                             otherUser?.name
//                           }
//                         </h2>

//                         <span className="text-xs text-gray-400">
//                           {new Date(
//                             chat.updatedAt
//                           ).toLocaleTimeString()}
//                         </span>
//                       </div>

//                       <p className="text-sm text-gray-500 truncate mt-1">
//                         {
//                           chat
//                             ?.lastMessage
//                             ?.text
//                         }
//                       </p>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>

//           {/* CHAT AREA */}
//           <div className="flex-1 flex flex-col">

//             {!selectedChat ? (
//               <div className="flex-1 flex items-center justify-center bg-[#efeae2]">

//                 <div className="text-center">

//                   <h2 className="text-4xl font-bold text-gray-700">
//                     Select a chat
//                   </h2>

//                   <p className="text-gray-500 mt-3">
//                     Select a conversation
//                     and start chatting
//                   </p>
//                 </div>
//               </div>
//             ) : (
//               <>
//                 {/* HEADER */}
//                 <div className="bg-[#f0f2f5] border-b px-6 py-4 flex justify-between items-center">

//                   <div className="flex items-center gap-4">

//                     <img
//                       src={
//                         getOtherUser(
//                           selectedChat.participants
//                         )?.profileImage ||
//                         "https://randomuser.me/api/portraits/men/32.jpg"
//                       }
//                       alt=""
//                       className="w-14 h-14 rounded-full"
//                     />

//                     <div>

//                       <h2 className="font-bold">
//                         {
//                           getOtherUser(
//                             selectedChat.participants
//                           )?.name
//                         }
//                       </h2>

//                       <p className="text-green-600 text-sm">
//                         Online
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex gap-6 text-gray-700 text-lg">

//                     <FaPhoneAlt />

//                     <FaVideo />

//                     <FaEllipsisV />
//                   </div>
//                 </div>

//                 {/* MESSAGES */}
//                 <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#efeae2]">

//                   {messages?.map((msg) => {
//                     const isMine =
//                       isMyMessage(msg);

//                     return (
//                       <div
//                         key={msg._id}
//                         className={`flex ${
//                           isMine
//                             ? "justify-end"
//                             : "justify-start"
//                         }`}
//                       >

//                         <div
//                           className={`max-w-md px-5 py-3 shadow-sm ${
//                             isMine
//                               ? "bg-[#d9fdd3] rounded-2xl rounded-br-sm"
//                               : "bg-white rounded-2xl rounded-bl-sm"
//                           }`}
//                         >

//                           <p className="text-[15px] leading-relaxed">
//                             {msg.text}
//                           </p>

//                           <span className="text-[10px] text-gray-500 text-right block mt-1">
//                             {new Date(
//                               msg.createdAt
//                             ).toLocaleTimeString()}
//                           </span>
//                         </div>
//                       </div>
//                     );
//                   })}

//                   <div ref={bottomRef}></div>
//                 </div>

//                 {/* INPUT */}
//                 <div className="bg-[#f0f2f5] border-t p-4">

//                   <div className="flex gap-4 items-center">

//                     <input
//                       type="text"
//                       value={message}
//                       onChange={(e) =>
//                         setMessage(
//                           e.target.value
//                         )
//                       }
//                       onKeyDown={(e) => {
//                         if (
//                           e.key === "Enter"
//                         ) {
//                           sendMessage();
//                         }
//                       }}
//                       placeholder="Type message..."
//                       className="flex-1 bg-white rounded-full px-6 py-4 outline-none shadow-sm"
//                     />

//                     <button
//                       onClick={sendMessage}
//                       className="w-14 h-14 rounded-full bg-[#00a884] text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition"
//                     >
//                       <FaPaperPlane />
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















































// ================= IMPORTS =================
import React, { useEffect, useMemo, useState } from "react";

import {
  FaSearch,
  FaEllipsisV,
  FaArrowLeft,
  FaCheckDouble,
  FaComments,
} from "react-icons/fa";

import {
  MdVerified,
} from "react-icons/md";

import { useDispatch, useSelector } from "react-redux";

import {
  fetchChats,
  setSelectedChat,
} from "../../../store/slices/chatSlice";

import { useNavigate } from "react-router-dom";

// ================= COMPONENT =================
const ChatPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    chats,
    loading,
    selectedChat,
  } = useSelector((state) => state.chat);

  // ================= SEARCH =================
  const [search, setSearch] = useState("");

  // ================= LOAD CHATS =================
  useEffect(() => {
    dispatch(fetchChats());
  }, [dispatch]);

  // ================= CURRENT USER =================
  const currentUser =
    JSON.parse(localStorage.getItem("user")) || {};

  // ================= GET OTHER USER =================
  const getOtherUser = (participants) => {
    return participants?.find(
      (p) => p._id !== currentUser?.id
    );
  };

  // ================= FILTER CHATS =================
  const filteredChats = useMemo(() => {
    return chats?.filter((chat) => {
      const otherUser = getOtherUser(
        chat.participants
      );

      return (
        otherUser?.name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        chat?.productId?.name
          ?.toLowerCase()
          .includes(search.toLowerCase())
      );
    });
  }, [chats, search]);

  // ================= TIME FORMAT =================
  const formatTime = (date) => {
    if (!date) return "";

    const now = new Date();
    const msgDate = new Date(date);

    const isToday =
      now.toDateString() ===
      msgDate.toDateString();

    if (isToday) {
      return msgDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    return msgDate.toLocaleDateString();
  };

  return (
    <div className="h-screen bg-[#f4f7fb] overflow-hidden">

      {/* ================= MAIN WRAPPER ================= */}
      <div className="h-full flex">

        {/* ================================================= */}
        {/* SIDEBAR */}
        {/* ================================================= */}

        <div
          className={`
            ${
              selectedChat
                ? "hidden md:flex"
                : "flex"
            }
            w-full md:w-[420px]
            bg-white
            border-r
            border-gray-200
            flex-col
            h-full
          `}
        >

          {/* ================= HEADER ================= */}
          <div className="sticky top-0 z-20 bg-white border-b border-gray-100 px-4 py-4 shadow-sm">

            <div className="flex items-center justify-between">

              {/* LEFT */}
              <div className="flex items-center gap-3">

                <button
                  onClick={() => navigate(-1)}
                  className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
                >
                  <FaArrowLeft className="text-gray-700" />
                </button>

                <div>
                  <h1 className="text-2xl font-bold text-gray-800">
                    Messages
                  </h1>

                  <p className="text-xs text-gray-500">
                    {filteredChats?.length || 0} Conversations
                  </p>
                </div>
              </div>

              {/* RIGHT */}
              <button className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition">
                <FaEllipsisV className="text-gray-500" />
              </button>
            </div>

            {/* ================= SEARCH ================= */}
            <div className="mt-4">

              <div className="bg-gray-100 rounded-2xl px-4 py-3 flex items-center gap-3 border border-transparent focus-within:border-green-500 transition">

                <FaSearch className="text-gray-500 text-sm" />

                <input
                  type="text"
                  placeholder="Search users or products..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  className="bg-transparent flex-1 outline-none text-sm"
                />
              </div>
            </div>
          </div>

          {/* ================= CHAT LIST ================= */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">

            {loading ? (
              <div className="p-5 space-y-4">

                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="animate-pulse flex items-center gap-3"
                  >
                    <div className="w-14 h-14 rounded-full bg-gray-200"></div>

                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-40"></div>

                      <div className="h-3 bg-gray-100 rounded w-28 mt-2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredChats?.length === 0 ? (

              // ================= EMPTY =================
              <div className="flex flex-col items-center justify-center h-full text-center px-6">

                <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
                  <FaComments className="text-4xl text-green-600" />
                </div>

                <h2 className="text-2xl font-bold text-gray-700 mt-5">
                  No Conversations
                </h2>

                <p className="text-gray-500 mt-2 text-sm max-w-xs">
                  Start chatting with sellers and buyers
                  to see conversations here.
                </p>
              </div>
            ) : (
              filteredChats.map((chat) => {
                const otherUser =
                  getOtherUser(
                    chat.participants
                  );

                return (
                  <div
                    key={chat._id}
                    onClick={() =>
                      dispatch(
                        setSelectedChat(chat)
                      )
                    }
                    className={`
                      relative
                      px-4 py-4
                      border-b border-gray-100
                      cursor-pointer
                      transition-all
                      hover:bg-green-50
                      ${
                        selectedChat?._id ===
                        chat._id
                          ? "bg-green-50"
                          : "bg-white"
                      }
                    `}
                  >

                    <div className="flex items-center gap-3">

                      {/* ================= PROFILE ================= */}
                      <div className="relative">

                        <img
                          src={
                            otherUser?.profileImage ||
                            `https://ui-avatars.com/api/?name=${otherUser?.name}&background=16a34a&color=fff`
                          }
                          alt=""
                          className="w-14 h-14 rounded-full object-cover border"
                        />

                        {/* ONLINE DOT */}
                        <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                      </div>

                      {/* ================= INFO ================= */}
                      <div className="flex-1 min-w-0">

                        {/* TOP */}
                        <div className="flex items-center justify-between">

                          <div className="flex items-center gap-1">

                            <h2 className="font-semibold text-gray-800 truncate">
                              {otherUser?.name}
                            </h2>

                            <MdVerified className="text-green-600 text-sm" />
                          </div>

                          <span className="text-xs text-gray-400 whitespace-nowrap">
                            {formatTime(
                              chat.updatedAt
                            )}
                          </span>
                        </div>

                        {/* PRODUCT */}
                        <p className="text-xs text-green-700 mt-1 truncate font-medium">
                          Product:{" "}
                          {chat.productId?.name ||
                            "Product"}
                        </p>

                        {/* LAST MESSAGE */}
                        <div className="flex items-center justify-between mt-1">

                          <p className="text-sm text-gray-500 truncate max-w-[220px]">
                            {chat.lastMessage
                              ?.text ||
                              "Start conversation"}
                          </p>

                          <div className="flex items-center gap-2 ml-2">

                            {/* READ */}
                            <FaCheckDouble className="text-green-500 text-xs" />

                            {/* UNREAD */}
                            {chat.unreadCount >
                              0 && (
                              <div className="min-w-[22px] h-[22px] rounded-full bg-green-600 text-white text-[11px] flex items-center justify-center font-semibold">
                                {
                                  chat.unreadCount
                                }
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* ================================================= */}
        {/* RIGHT SIDE */}
        {/* ================================================= */}

        <div
          className={`
            ${
              selectedChat
                ? "flex"
                : "hidden md:flex"
            }
            flex-1
            flex-col
            bg-gradient-to-br
            from-[#f8fafc]
            to-[#eef4ff]
            h-full
          `}
        >

          {selectedChat ? (
            <>
              {/* ================= CHAT HEADER ================= */}
              <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">

                <div className="flex items-center gap-3">

                  {/* MOBILE BACK */}
                  <button
                    onClick={() =>
                      dispatch(
                        setSelectedChat(null)
                      )
                    }
                    className="md:hidden w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
                  >
                    <FaArrowLeft />
                  </button>

                  <img
                    src={
                      getOtherUser(
                        selectedChat?.participants
                      )?.profileImage ||
                      `https://ui-avatars.com/api/?name=${
                        getOtherUser(
                          selectedChat?.participants
                        )?.name
                      }`
                    }
                    alt=""
                    className="w-12 h-12 rounded-full object-cover border"
                  />

                  <div>
                    <h2 className="font-bold text-gray-800 flex items-center gap-1">
                      {
                        getOtherUser(
                          selectedChat?.participants
                        )?.name
                      }

                      <MdVerified className="text-green-600" />
                    </h2>

                    <p className="text-xs text-green-600">
                      Active now
                    </p>
                  </div>
                </div>

                <button className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center">
                  <FaEllipsisV className="text-gray-500" />
                </button>
              </div>

              {/* ================= EMPTY CHAT SCREEN ================= */}
              <div className="flex-1 flex items-center justify-center px-6">

                <div className="text-center">

                  <div className="w-28 h-28 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                    <FaComments className="text-5xl text-green-600" />
                  </div>

                  <h2 className="text-3xl font-bold text-gray-700 mt-6">
                    Start Messaging
                  </h2>

                  <p className="text-gray-500 mt-2 max-w-md">
                    Your selected conversation is ready.
                    Integrate messages API/socket here
                    for real-time chatting.
                  </p>

                  <button className="mt-6 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg transition">
                    Send First Message
                  </button>
                </div>
              </div>
            </>
          ) : (
            // ================= EMPTY RIGHT SCREEN =================
            <div className="hidden md:flex flex-1 items-center justify-center">

              <div className="text-center">

                <div className="w-32 h-32 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                  <FaComments className="text-6xl text-green-600" />
                </div>

                <h2 className="text-4xl font-bold text-gray-700 mt-6">
                  TechBy Chat
                </h2>

                <p className="text-gray-500 mt-3 text-lg">
                  Select a conversation to start chatting
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;






















// import React, { useEffect, useState } from "react";
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
// import { useLocation } from "react-router-dom";
// import API from "../../../Api/chatApi";
// import socket from "../../../socket";

// const ChatPage = () => {
//   const [selectedChat, setSelectedChat] = useState(null);
//   const [message, setMessage] = useState("");
//   const [chats, setChats] = useState([]);
//   const [messages, setMessages] = useState([]);

//   const location = useLocation();
//   const currentUserId = localStorage.getItem("userId");

//   // LOAD CHAT FROM NAV
//   useEffect(() => {
//     if (location.state?.chat) {
//       setSelectedChat(location.state.chat);
//     }
//   }, [location.state]);

//   // FETCH CHATS
//   useEffect(() => {
//     const fetchChats = async () => {
//       try {
//         const res = await API.get("/chat/conversations");
//         setChats(res.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     fetchChats();
//   }, []);

//   // FETCH MESSAGES
//   useEffect(() => {
//     if (!selectedChat?._id) return;

//     const fetchMessages = async () => {
//       try {
//         const res = await API.get(
//           `/chat/messages/${selectedChat._id}`
//         );
//         setMessages(res.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     fetchMessages();
//     socket.emit("join_chat", selectedChat._id);
//   }, [selectedChat]);

//   // SOCKET LISTENER
//   useEffect(() => {
//     const handleMessage = (msg) => {
//       if (msg.conversationId === selectedChat?._id) {
//         setMessages((prev) => [...prev, msg]);
//       }
//     };

//     socket.on("receive_message", handleMessage);

//     return () => socket.off("receive_message", handleMessage);
//   }, [selectedChat]);

//   // SEND MESSAGE
//   const sendMessage = async () => {
//     if (!message.trim() || !selectedChat) return;

//     const payload = {
//       conversationId: selectedChat._id,
//       senderId: currentUserId,
//       text: message,
//     };

//     try {
//       const res = await API.post("/chat/message", payload);

//       socket.emit("send_message", res.data);
//       setMessages((prev) => [...prev, res.data]);
//       setMessage("");
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <>
//       {/* ================= MOBILE ================= */}
//       <div className="lg:hidden h-screen bg-gradient-to-b from-green-50 to-gray-100">

//         {!selectedChat ? (
//           <div className="flex flex-col h-full">

//             {/* HEADER */}
//             <div className="bg-white px-4 py-5 shadow-sm border-b">
//               <h1 className="text-2xl font-bold text-gray-800">
//                 Messages
//               </h1>

//               <div className="relative mt-4">
//                 <FaSearch className="absolute left-3 top-3 text-gray-400" />

//                 <input
//                   className="w-full bg-gray-100 pl-10 py-2 rounded-xl outline-none focus:ring-2 focus:ring-green-400"
//                   placeholder="Search chats..."
//                 />
//               </div>
//             </div>

//             {/* CHAT LIST */}
//             <div className="flex-1 overflow-y-auto p-3 space-y-3">

//               {chats.map((chat) => (
//                 <div
//                   key={chat._id}
//                   onClick={() => setSelectedChat(chat)}
//                   className="bg-white p-4 rounded-2xl shadow-sm border hover:shadow-md transition cursor-pointer"
//                 >
//                   <div className="flex justify-between items-center">
//                     <p className="font-semibold text-gray-800">
//                       Chat
//                     </p>
//                     <span className="text-xs text-gray-400">
//                       now
//                     </span>
//                   </div>

//                   <p className="text-sm text-gray-500 mt-1 truncate">
//                     {chat?.lastMessage?.text ||
//                       "Start a conversation"}
//                   </p>
//                 </div>
//               ))}
//             </div>

//             <MobileBottomNavbar />
//           </div>
//         ) : (
//           <div className="flex flex-col h-full">

//             {/* CHAT HEADER */}
//             <div className="bg-white flex items-center justify-between p-4 shadow-sm border-b">

//               <div className="flex items-center gap-3">
//                 <button
//                   onClick={() => setSelectedChat(null)}
//                   className="text-gray-600"
//                 >
//                   <FaArrowLeft />
//                 </button>

//                 <div>
//                   <h2 className="font-bold text-gray-800">
//                     Chat
//                   </h2>
//                   <p className="text-green-500 text-xs">
//                     Online
//                   </p>
//                 </div>
//               </div>

//               <div className="flex gap-5 text-gray-600">
//                 <FaPhoneAlt />
//                 <FaVideo />
//                 <FaEllipsisV />
//               </div>
//             </div>

//             {/* MESSAGES */}
//             <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#f5f7f6]">

//               {messages.map((msg) => (
//                 <div
//                   key={msg._id}
//                   className={`flex ${
//                     msg.senderId === currentUserId
//                       ? "justify-end"
//                       : "justify-start"
//                   }`}
//                 >
//                   <div
//                     className={`px-4 py-2 rounded-2xl max-w-[75%] text-sm shadow-sm ${
//                       msg.senderId === currentUserId
//                         ? "bg-green-500 text-white rounded-br-sm"
//                         : "bg-white text-gray-800 rounded-bl-sm border"
//                     }`}
//                   >
//                     {msg.text}
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* INPUT */}
//             <div className="p-3 bg-white flex items-center gap-2 border-t">

//               <input
//                 value={message}
//                 onChange={(e) =>
//                   setMessage(e.target.value)
//                 }
//                 placeholder="Type a message..."
//                 className="flex-1 bg-gray-100 px-4 py-3 rounded-full outline-none focus:ring-2 focus:ring-green-400"
//               />

//               <button
//                 onClick={sendMessage}
//                 className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-md transition"
//               >
//                 <FaPaperPlane />
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* ================= DESKTOP ================= */}
//       <div className="hidden lg:flex h-screen bg-gray-100">

//         <Navbar />

//         <div className="flex flex-1">

//           {/* SIDEBAR */}
//           <div className="w-[380px] bg-white border-r overflow-y-auto">

//             <div className="p-4 border-b">
//               <h2 className="text-xl font-bold text-gray-800">
//                 Messages
//               </h2>
//             </div>

//             {chats.map((chat) => (
//               <div
//                 key={chat._id}
//                 onClick={() => setSelectedChat(chat)}
//                 className="p-4 border-b hover:bg-gray-50 cursor-pointer transition"
//               >
//                 <p className="font-semibold text-gray-800">
//                   Chat
//                 </p>

//                 <p className="text-sm text-gray-500 truncate mt-1">
//                   {chat?.lastMessage?.text ||
//                     "No messages yet"}
//                 </p>
//               </div>
//             ))}
//           </div>

//           {/* CHAT AREA */}
//           <div className="flex-1 flex flex-col">

//             {!selectedChat ? (
//               <div className="flex-1 flex items-center justify-center text-gray-400 text-lg">
//                 Select a chat to start messaging
//               </div>
//             ) : (
//               <>
//                 {/* HEADER */}
//                 <div className="p-4 bg-white border-b font-semibold">
//                   Chat
//                 </div>

//                 {/* MESSAGES */}
//                 <div className="flex-1 p-4 overflow-y-auto space-y-2 bg-gray-50">

//                   {messages.map((msg) => (
//                     <div
//                       key={msg._id}
//                       className={`flex ${
//                         msg.senderId === currentUserId
//                           ? "justify-end"
//                           : "justify-start"
//                       }`}
//                     >
//                       <div
//                         className={`px-4 py-2 rounded-2xl text-sm max-w-[60%] shadow-sm ${
//                           msg.senderId === currentUserId
//                             ? "bg-green-500 text-white"
//                             : "bg-white border text-gray-800"
//                         }`}
//                       >
//                         {msg.text}
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 {/* INPUT */}
//                 <div className="p-4 bg-white border-t flex gap-2">

//                   <input
//                     value={message}
//                     onChange={(e) =>
//                       setMessage(e.target.value)
//                     }
//                     className="flex-1 border rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-green-400"
//                     placeholder="Type message..."
//                   />

//                   <button
//                     onClick={sendMessage}
//                     className="bg-green-500 text-white px-5 rounded-full hover:bg-green-600 transition"
//                   >
//                     <FaPaperPlane />
//                   </button>
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