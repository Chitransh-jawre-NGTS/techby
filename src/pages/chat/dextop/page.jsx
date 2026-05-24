// import React, {
//   useEffect,
//   useState,
//   useRef,
// } from "react";

// import {
//   FaSearch,
//   FaEllipsisV,
//   FaCheckCircle,
//   FaPaperPlane,
//   FaArrowLeft,
// } from "react-icons/fa";

// import { useDispatch, useSelector } from "react-redux";

// import Navbar from "../../../components/Navbar";

// import {
//   fetchChats,
//   fetchMessages,
//   sendMessage,
//   setSelectedChat,
// } from "../../../store/slices/chatSlice";
// import MobileBottomNavbar from "../../../components/MobileBottomNavbar";

// const InboxPage = () => {
//   const dispatch = useDispatch();

//   const {
//     chats,
//     messages,
//     selectedChat,
//     loading,
//   } = useSelector(
//     (state) => state.chat
//   );

//   const [text, setText] =
//     useState("");

//   const [mobileView, setMobileView] =
//     useState(false);

//   const bottomRef = useRef(null);

//   const currentUser = JSON.parse(
//     localStorage.getItem("user")
//   );

//   // =====================================
//   // LOAD CHATS
//   // =====================================

//   useEffect(() => {
//     dispatch(fetchChats());
//   }, [dispatch]);

//   // =====================================
//   // AUTO SCROLL
//   // =====================================

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({
//       behavior: "smooth",
//     });
//   }, [messages]);

//   // =====================================
//   // GET OTHER USER
//   // =====================================

//   const getOtherUser = (
//     participants
//   ) => {
//     return participants?.find(
//       (p) =>
//         p._id !==
//         (currentUser?.id ||
//           currentUser?._id)
//     );
//   };

//   // =====================================
//   // OPEN CHAT
//   // =====================================

//   const openChat = (chat) => {
//     dispatch(setSelectedChat(chat));

//     dispatch(fetchMessages(chat._id));

//     setMobileView(true);
//   };

//   // =====================================
//   // SEND MESSAGE
//   // =====================================

//   const handleSendMessage = async () => {
//     if (!text.trim()) return;

//     await dispatch(
//       sendMessage({
//         conversationId:
//           selectedChat._id,
//         text,
//       })
//     );

//     setText("");
//   };

//   // =====================================
//   // CHECK MY MESSAGE
//   // =====================================

//   const isMyMessage = (msg) => {
//     const senderId =
//       typeof msg.senderId ===
//       "object"
//         ? msg.senderId?._id
//         : msg.senderId;

//     return (
//       senderId ===
//       (currentUser?.id ||
//         currentUser?._id)
//     );
//   };

//   return (
//     <>
//       <div className="hidden md:block">
//         <Navbar />
//       </div>

//       <div className="h-screen md:h-[calc(100vh-72px)] bg-[#f3f4f6] flex overflow-hidden">

//         {/* ================================= */}
//         {/* SIDEBAR */}
//         {/* ================================= */}

//         <div
//           className={`${
//             mobileView
//               ? "hidden md:flex"
//               : "flex"
//           } w-full md:w-[400px] bg-white border-r border-gray-200 flex-col`}
//         >

//           {/* HEADER */}

//           <div className="p-5 border-b border-gray-200 bg-white sticky top-0 z-10">

//             <div className="flex items-center justify-between">

//               <div className="flex items-center gap-3">

//                 <h1 className="text-3xl font-black text-gray-800">
//                   Inbox
//                 </h1>

//                 <span className="bg-green-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
//                   {chats?.length || 0}
//                 </span>
//               </div>

//               <button className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center">
//                 <FaEllipsisV />
//               </button>
//             </div>

//             {/* SEARCH */}

//             <div className="mt-5">

//               <div className="bg-gray-100 rounded-2xl px-4 py-3 flex items-center gap-3 border border-transparent focus-within:border-green-500">

//                 <FaSearch className="text-gray-500" />

//                 <input
//                   type="text"
//                   placeholder="Search conversation..."
//                   className="bg-transparent outline-none flex-1 text-sm"
//                 />
//               </div>
//             </div>
//           </div>
//           <MobileBottomNavbar/>

//           {/* CHAT LIST */}

//           <div className="flex-1 overflow-y-auto">

//             {loading ? (
//               <div className="h-full flex items-center justify-center">
//                 <p>Loading...</p>
//               </div>
//             ) : chats?.length === 0 ? (
//               <div className="h-full flex items-center justify-center text-gray-500">
//                 No Conversations
//               </div>
//             ) : (
//               chats.map((chat) => {
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
//                     className={`p-4 border-b border-gray-100 cursor-pointer transition-all duration-200 ${
//                       selectedChat?._id ===
//                       chat._id
//                         ? "bg-gradient-to-r from-green-50 to-green-100"
//                         : "hover:bg-gray-50"
//                     }`}
//                   >

//                     <div className="flex gap-4">

//                       {/* IMAGE */}

//                       <div className="relative">

//                         <img
//                           src={
//                             chat.productId
//                               ?.imageUrls?.[0]
//                               ?.url
//                           }
//                           alt=""
//                           className="w-16 h-16 rounded-2xl object-cover shadow-md"
//                         />

//                         <img
//                           src={`https://ui-avatars.com/api/?name=${otherUser?.name}&background=16a34a&color=fff`}
//                           alt=""
//                           className="w-7 h-7 rounded-full absolute -bottom-1 -right-1 border-2 border-white"
//                         />
//                       </div>

//                       {/* INFO */}

//                       <div className="flex-1 min-w-0">

//                         <div className="flex justify-between">

//                           <div>

//                             <h2 className="font-bold text-gray-800 truncate">
//                               {otherUser?.name}
//                             </h2>

//                             <p className="text-sm text-green-600 truncate mt-1">
//                               {
//                                 chat
//                                   ?.productId
//                                   ?.name
//                               }
//                             </p>
//                           </div>

//                           <span className="text-xs text-gray-400 whitespace-nowrap">
//                             {new Date(
//                               chat.updatedAt
//                             ).toLocaleDateString()}
//                           </span>
//                         </div>

//                         <div className="flex items-center justify-between mt-3">

//                           <p className="text-sm text-gray-500 truncate">
//                             {
//                               chat
//                                 ?.lastMessage
//                                 ?.text
//                             }
//                           </p>

//                           {chat.unreadCount >
//                             0 && (
//                             <span className="bg-green-600 text-white min-w-[22px] h-[22px] rounded-full flex items-center justify-center text-xs font-bold px-1">
//                               {
//                                 chat.unreadCount
//                               }
//                             </span>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })
//             )}
//           </div>
//         </div>

//         {/* ================================= */}
//         {/* CHAT AREA */}
//         {/* ================================= */}

//         <div
//           className={`${
//             mobileView
//               ? "flex"
//               : "hidden md:flex"
//           } flex-1 flex-col bg-[#efeae2]`}
//         >

//           {!selectedChat ? (
//             <div className="flex-1 flex items-center justify-center">

//               <div className="text-center">

//                 <div className="w-24 h-24 rounded-full bg-green-100 mx-auto flex items-center justify-center">

//                   <div className="w-12 h-12 rounded-2xl bg-green-600"></div>
//                 </div>

//                 <h2 className="text-3xl font-black text-gray-700 mt-6">
//                   TechBy Chat
//                 </h2>

//                 <p className="text-gray-500 mt-2">
//                   Select a conversation
//                 </p>
//               </div>
//             </div>
//           ) : (
//             <>
//               {/* HEADER */}

//               <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">

//                 <div className="flex items-center gap-3">

//                   <button
//                     onClick={() =>
//                       setMobileView(
//                         false
//                       )
//                     }
//                     className="md:hidden w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center"
//                   >
//                     <FaArrowLeft />
//                   </button>

//                   <img
//                     src={`https://ui-avatars.com/api/?name=${
//                       getOtherUser(
//                         selectedChat.participants
//                       )?.name
//                     }&background=16a34a&color=fff`}
//                     alt=""
//                     className="w-12 h-12 rounded-full"
//                   />

//                   <div>

//                     <div className="flex items-center gap-2">

//                       <h2 className="font-bold text-lg">
//                         {
//                           getOtherUser(
//                             selectedChat.participants
//                           )?.name
//                         }
//                       </h2>

//                       <FaCheckCircle className="text-green-600 text-sm" />
//                     </div>

//                     <p className="text-sm text-gray-500 truncate max-w-[180px]">
//                       {
//                         selectedChat
//                           ?.productId
//                           ?.name
//                       }
//                     </p>
//                   </div>
//                 </div>

//                 <button className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center">
//                   <FaEllipsisV />
//                 </button>
//               </div>

//               {/* MESSAGES */}

//               <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">

//                 {messages?.map((msg) => (
//                   <div
//                     key={msg._id}
//                     className={`flex ${
//                       isMyMessage(msg)
//                         ? "justify-end"
//                         : "justify-start"
//                     }`}
//                   >

//                     <div
//                       className={`max-w-[85%] md:max-w-md px-4 py-3 rounded-3xl shadow-sm relative ${
//                         isMyMessage(msg)
//                           ? "bg-green-600 text-white rounded-br-md"
//                           : "bg-white text-gray-800 rounded-bl-md"
//                       }`}
//                     >

//                       <p className="text-sm leading-relaxed break-words">
//                         {msg.text}
//                       </p>

//                       <span
//                         className={`text-[11px] mt-2 block text-right ${
//                           isMyMessage(msg)
//                             ? "text-green-100"
//                             : "text-gray-400"
//                         }`}
//                       >
//                         {new Date(
//                           msg.createdAt
//                         ).toLocaleTimeString(
//                           [],
//                           {
//                             hour:
//                               "2-digit",
//                             minute:
//                               "2-digit",
//                           }
//                         )}
//                       </span>
//                     </div>
//                   </div>
//                 ))}

//                 <div ref={bottomRef}></div>
//               </div>

//               {/* INPUT */}

//               <div className="bg-white border-t border-gray-200 p-3 md:p-4">

//                 <div className="flex items-center gap-3 bg-gray-100 rounded-full px-3 py-2">

//                   <input
//                     type="text"
//                     value={text}
//                     onChange={(e) =>
//                       setText(
//                         e.target.value
//                       )
//                     }
//                     onKeyDown={(e) => {
//                       if (
//                         e.key ===
//                         "Enter"
//                       ) {
//                         handleSendMessage();
//                       }
//                     }}
//                     placeholder="Type your message..."
//                     className="flex-1 bg-transparent outline-none px-3 py-2"
//                   />

//                   <button
//                     onClick={
//                       handleSendMessage
//                     }
//                     className="w-12 h-12 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center text-white transition-all duration-200 active:scale-95"
//                   >
//                     <FaPaperPlane />
//                   </button>
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
      
//     </>
//   );
// };

// export default InboxPage; 




























// ================= IMPORTS =================
import React, {
  useEffect,
  useState,
  useRef,
} from "react";

import {
  FaSearch,
  FaEllipsisV,
  FaCheckCircle,
  FaPaperPlane,
  FaArrowLeft,
  FaCircle,
} from "react-icons/fa";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import Navbar from "../../../components/Navbar";

import {
  fetchChats,
  fetchMessages,
  sendMessage,
  setSelectedChat,
} from "../../../store/slices/chatSlice";

import MobileBottomNavbar from "../../../components/MobileBottomNavbar";

// ================= COMPONENT =================
const InboxPage = () => {
  const dispatch = useDispatch();

  const {
    chats,
    messages,
    selectedChat,
    loading,
  } = useSelector(
    (state) => state.chat
  );

  const [text, setText] =
    useState("");

  const [mobileView, setMobileView] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const bottomRef = useRef(null);

  const currentUser = JSON.parse(
    localStorage.getItem("user")
  );

  // ================= LOAD CHATS =================
  useEffect(() => {
    dispatch(fetchChats());
  }, [dispatch]);

  // ================= AUTO FETCH =================
  useEffect(() => {
    if (!selectedChat?._id)
      return;

    let interval;

    const startPolling = () => {
      interval = setInterval(() => {
        if (
          document.visibilityState ===
          "visible"
        ) {
          dispatch(
            fetchMessages(
              selectedChat._id
            )
          );

          dispatch(fetchChats());
        }
      }, 5000);
    };

    dispatch(
      fetchMessages(
        selectedChat._id
      )
    );

    startPolling();

    return () => {
      clearInterval(interval);
    };
  }, [
    selectedChat?._id,
    dispatch,
  ]);

  // ================= AUTO SCROLL =================
  useEffect(() => {
    bottomRef.current?.scrollIntoView(
      {
        behavior:
          messages?.length > 1
            ? "smooth"
            : "auto",
      }
    );
  }, [messages]);

  // ================= GET OTHER USER =================
  const getOtherUser = (
    participants
  ) => {
    return participants?.find(
      (p) =>
        p._id !==
        (currentUser?.id ||
          currentUser?._id)
    );
  };

  // ================= OPEN CHAT =================
  const openChat = (chat) => {
    dispatch(
      setSelectedChat(chat)
    );

    setMobileView(true);
  };

  // ================= SEND MESSAGE =================
  const handleSendMessage =
    async () => {
      if (!text.trim())
        return;

      const messageText = text;

      setText("");

      await dispatch(
        sendMessage({
          conversationId:
            selectedChat._id,
          text: messageText,
        })
      );

      dispatch(
        fetchMessages(
          selectedChat._id
        )
      );

      dispatch(fetchChats());
    };

  // ================= CHECK MY MESSAGE =================
  const isMyMessage = (
    msg
  ) => {
    const currentUserId =
      currentUser?.id ||
      currentUser?._id;

    let senderId = null;

    if (
      typeof msg.senderId ===
      "object"
    ) {
      senderId =
        msg.senderId?._id;
    } else {
      senderId = msg.senderId;
    }

    return (
      String(senderId) ===
      String(currentUserId)
    );
  };

  // ================= FILTER CHATS =================
  const filteredChats =
    chats?.filter((chat) => {
      const otherUser =
        getOtherUser(
          chat.participants
        );

      return (
        otherUser?.name
          ?.toLowerCase()
          ?.includes(
            search.toLowerCase()
          ) ||
        chat?.productId?.name
          ?.toLowerCase()
          ?.includes(
            search.toLowerCase()
          )
      );
    });

  return (
    <>
      {/* ================= NAVBAR ================= */}

      <div className="hidden md:block">
        <Navbar />
      </div>

      {/* ================= MAIN ================= */}

      <div className="h-[100dvh] md:h-[calc(100vh-72px)] bg-[#eef1f5] flex overflow-hidden">

        {/* ================================================= */}
        {/* SIDEBAR */}
        {/* ================================================= */}

        <div
          className={`${
            mobileView
              ? "hidden md:flex"
              : "flex"
          } w-full md:w-[390px] bg-white border-r border-gray-200 flex-col`}
        >

          {/* ================= HEADER ================= */}

          <div className="p-5 bg-white border-b border-gray-100 sticky top-0 z-20">

            <div className="flex items-center justify-between">

              <div>

                <h1 className="text-3xl font-black text-gray-800 tracking-tight">
                  Inbox
                </h1>

                <p className="text-sm text-gray-500 mt-1">
                  {
                    chats?.length
                  }{" "}
                  Conversations
                </p>
              </div>

              <button className="w-11 h-11 rounded-2xl bg-gray-100 hover:bg-gray-200 transition flex items-center justify-center">

                <FaEllipsisV className="text-gray-600" />

              </button>
            </div>

            {/* ================= SEARCH ================= */}

            <div className="mt-5 relative">

              <FaSearch className="absolute left-4 top-4 text-gray-400 text-sm" />

              <input
                type="text"
                placeholder="Search chats..."
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                className="w-full bg-gray-100 rounded-2xl py-3.5 pl-11 pr-4 outline-none border-2 border-transparent focus:border-green-500 transition"
              />
            </div>
          </div>

          {/* ================= CHAT LIST ================= */}

          <div className="flex-1 overflow-y-auto pb-24 md:pb-0">

            {loading ? (
              <div className="h-full flex items-center justify-center">

                <div className="text-center">

                  <div className="w-14 h-14 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto"></div>

                  <p className="mt-4 text-gray-500">
                    Loading chats...
                  </p>
                </div>
              </div>
            ) : filteredChats?.length ===
              0 ? (
              <div className="h-full flex items-center justify-center text-center px-6">

                <div>

                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto">

                    💬

                  </div>

                  <h2 className="mt-5 font-bold text-xl text-gray-700">
                    No Conversations
                  </h2>

                  <p className="text-gray-500 text-sm mt-2">
                    Start chatting with
                    buyers and sellers
                  </p>
                </div>
              </div>
            ) : (
              filteredChats?.map(
                (chat) => {
                  const otherUser =
                    getOtherUser(
                      chat.participants
                    );

                  return (
                    <div
                      key={chat._id}
                      onClick={() =>
                        openChat(
                          chat
                        )
                      }
                      className={`mx-3 mt-3 p-4 rounded-3xl cursor-pointer transition-all duration-300 border ${
                        selectedChat?._id ===
                        chat._id
                          ? "bg-gradient-to-r from-green-50 to-green-100 border-green-200 shadow-md"
                          : "bg-white hover:bg-gray-50 border-gray-100"
                      }`}
                    >

                      <div className="flex gap-4">

                        {/* PRODUCT */}

                        <div className="relative">

                          <img
                            src={
                              chat
                                ?.productId
                                ?.imageUrls?.[0]
                                ?.url
                            }
                            alt=""
                            className="w-16 h-16 rounded-2xl object-cover shadow-md"
                          />

                          {/* USER */}

                          <img
                            src={
                              otherUser?.profileImage ||
                              `https://ui-avatars.com/api/?name=${otherUser?.name}&background=16a34a&color=fff`
                            }
                            alt=""
                            className="w-7 h-7 rounded-full absolute -bottom-1 -right-1 border-2 border-white object-cover"
                          />
                        </div>

                        {/* INFO */}

                        <div className="flex-1 min-w-0">

                          <div className="flex justify-between items-start">

                            <div className="min-w-0">

                              <h2 className="font-bold text-gray-800 truncate">

                                {
                                  otherUser?.name
                                }

                              </h2>

                              <p className="text-sm text-green-600 truncate mt-1 font-medium">

                                {
                                  chat
                                    ?.productId
                                    ?.name
                                }

                              </p>
                            </div>

                            <span className="text-[11px] text-gray-400 whitespace-nowrap ml-2">

                              {new Date(
                                chat.updatedAt
                              ).toLocaleDateString()}

                            </span>
                          </div>

                          <div className="flex items-center justify-between mt-3">

                            <p className="text-sm text-gray-500 truncate max-w-[180px]">

                              {
                                chat
                                  ?.lastMessage
                                  ?.text
                              }

                            </p>

                            {chat.unreadCount >
                              0 && (
                              <div className="min-w-[24px] h-[24px] bg-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold px-1 shadow-lg">

                                {
                                  chat.unreadCount
                                }

                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              )
            )}
          </div>

          {/* MOBILE NAV */}

          <MobileBottomNavbar />
        </div>

        {/* ================================================= */}
        {/* CHAT AREA */}
        {/* ================================================= */}

        <div
          className={`${
            mobileView
              ? "flex"
              : "hidden md:flex"
          } flex-1 flex-col bg-[#e5ddd5]`}
        >

          {!selectedChat ? (
            <div className="flex-1 flex items-center justify-center">

              <div className="text-center px-6">

                <div className="w-28 h-28 rounded-full bg-green-100 flex items-center justify-center mx-auto shadow-lg">

                  <div className="w-14 h-14 rounded-3xl bg-green-600"></div>

                </div>

                <h2 className="text-4xl font-black text-gray-700 mt-8">
                  TechBy Chat
                </h2>

                <p className="text-gray-500 mt-3 text-lg">
                  Select a conversation
                  to start messaging
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* ================= HEADER ================= */}

              <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm backdrop-blur-xl">

                <div className="flex items-center gap-3 min-w-0">

                  <button
                    onClick={() =>
                      setMobileView(
                        false
                      )
                    }
                    className="md:hidden w-11 h-11 rounded-2xl hover:bg-gray-100 flex items-center justify-center transition"
                  >

                    <FaArrowLeft />

                  </button>

                  <div className="relative">

                    <img
                      src={
                        getOtherUser(
                          selectedChat.participants
                        )
                          ?.profileImage ||
                        `https://ui-avatars.com/api/?name=${
                          getOtherUser(
                            selectedChat.participants
                          )?.name
                        }&background=16a34a&color=fff`
                      }
                      alt=""
                      className="w-12 h-12 rounded-full object-cover"
                    />

                    <FaCircle className="absolute bottom-0 right-0 text-green-500 text-[10px] border-2 border-white rounded-full" />
                  </div>

                  <div className="min-w-0">

                    <div className="flex items-center gap-2">

                      <h2 className="font-bold text-gray-800 truncate text-lg">

                        {
                          getOtherUser(
                            selectedChat.participants
                          )?.name
                        }

                      </h2>

                      <FaCheckCircle className="text-green-600 text-sm flex-shrink-0" />
                    </div>

                    <p className="text-sm text-gray-500 truncate">

                      {
                        selectedChat
                          ?.productId
                          ?.name
                      }

                    </p>
                  </div>
                </div>

                <button className="w-11 h-11 rounded-2xl hover:bg-gray-100 flex items-center justify-center transition">

                  <FaEllipsisV className="text-gray-600" />

                </button>
              </div>

              {/* ================= MESSAGES ================= */}

              <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">

                {messages?.map(
                  (msg) => (
                    <div
                      key={msg._id}
                      className={`flex ${
                        isMyMessage(
                          msg
                        )
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >

                      <div
                        className={`relative max-w-[85%] md:max-w-md px-5 py-3 rounded-[28px] shadow-sm ${
                          isMyMessage(
                            msg
                          )
                            ? "bg-gradient-to-r from-green-500 to-green-600 text-white rounded-br-md"
                            : "bg-white text-gray-800 rounded-bl-md"
                        }`}
                      >

                        <p className="text-sm leading-relaxed break-words">

                          {msg.text}

                        </p>

                        <div
                          className={`text-[11px] mt-2 flex items-center justify-end gap-1 ${
                            isMyMessage(
                              msg
                            )
                              ? "text-green-100"
                              : "text-gray-400"
                          }`}
                        >

                          {new Date(
                            msg.createdAt
                          ).toLocaleTimeString(
                            [],
                            {
                              hour:
                                "2-digit",
                              minute:
                                "2-digit",
                            }
                          )}

                        </div>
                      </div>
                    </div>
                  )
                )}

                <div ref={bottomRef}></div>
              </div>

              {/* ================= INPUT ================= */}

              <div className="bg-white border-t border-gray-200 px-4 py-3">

                <div className="flex items-center gap-3 bg-gray-100 rounded-full px-3 py-2 shadow-inner">

                  <input
                    type="text"
                    value={text}
                    onChange={(e) =>
                      setText(
                        e.target.value
                      )
                    }
                    onKeyDown={(e) => {
                      if (
                        e.key ===
                        "Enter"
                      ) {
                        handleSendMessage();
                      }
                    }}
                    placeholder="Type your message..."
                    className="flex-1 bg-transparent outline-none px-3 py-2 text-sm"
                  />

                  <button
                    onClick={
                      handleSendMessage
                    }
                    className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 hover:scale-105 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-200 active:scale-95"
                  >

                    <FaPaperPlane className="text-sm ml-0.5" />

                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default InboxPage;