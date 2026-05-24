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

  const bottomRef = useRef(null);

  const currentUser = JSON.parse(
    localStorage.getItem("user")
  );

  // =====================================
  // LOAD CHATS
  // =====================================

  useEffect(() => {
    dispatch(fetchChats());
  }, [dispatch]);

  // =====================================
  // AUTO FETCH MESSAGES
  // =====================================

  useEffect(() => {

  if (!selectedChat?._id)
    return;

  let interval;

  const startPolling = () => {

    interval = setInterval(() => {

      // ONLY WHEN TAB ACTIVE
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

    }, 2000); // 5 sec
  };

  // FIRST FETCH
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

  // =====================================
  // AUTO SCROLL
  // =====================================

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

  // =====================================
  // GET OTHER USER
  // =====================================

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

  // =====================================
  // OPEN CHAT
  // =====================================

  const openChat = (chat) => {

    dispatch(
      setSelectedChat(chat)
    );

    setMobileView(true);
  };

  // =====================================
  // SEND MESSAGE
  // =====================================

  const handleSendMessage =
    async () => {

      if (!text.trim())
        return;

      const messageText = text;

      // CLEAR INPUT
      setText("");

      await dispatch(
        sendMessage({
          conversationId:
            selectedChat._id,
          text: messageText,
        })
      );

      // INSTANT REFRESH
      dispatch(
        fetchMessages(
          selectedChat._id
        )
      );

      dispatch(fetchChats());
    };

  // =====================================
  // CHECK MY MESSAGE
  // =====================================

  const isMyMessage = (
    msg
  ) => {

    const currentUserId =
      currentUser?.id ||
      currentUser?._id;

    let senderId = null;

    // OBJECT
    if (
      typeof msg.senderId ===
      "object"
    ) {
      senderId =
        msg.senderId?._id;
    }

    // STRING
    else {
      senderId = msg.senderId;
    }

    return (
      String(senderId) ===
      String(currentUserId)
    );
  };

  return (
    <>
      {/* DESKTOP NAVBAR */}

      <div className="hidden md:block">
        <Navbar />
      </div>

      {/* MAIN */}

      <div className="h-[100dvh] md:h-[calc(100vh-72px)] bg-[#f3f4f6] flex overflow-hidden">

        {/* ================================= */}
        {/* SIDEBAR */}
        {/* ================================= */}

        <div
          className={`${
            mobileView
              ? "hidden md:flex"
              : "flex"
          } w-full md:w-[400px] bg-white border-r border-gray-200 flex-col`}
        >

          {/* HEADER */}

          <div className="p-5 border-b border-gray-200 bg-white sticky top-0 z-10">

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">

                <h1 className="text-3xl font-black text-gray-800">
                  Inbox
                </h1>

                <span className="bg-green-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  {chats?.length ||
                    0}
                </span>
              </div>

              <button className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center">

                <FaEllipsisV />

              </button>
            </div>

            {/* SEARCH */}

            <div className="mt-5">

              <div className="bg-gray-100 rounded-2xl px-4 py-3 flex items-center gap-3 border border-transparent focus-within:border-green-500">

                <FaSearch className="text-gray-500" />

                <input
                  type="text"
                  placeholder="Search conversation..."
                  className="bg-transparent outline-none flex-1 text-sm"
                />
              </div>
            </div>
          </div>

          {/* CHAT LIST */}

          <div className="flex-1 overflow-y-auto pb-20 md:pb-0">

            {loading ? (

              <div className="h-full flex items-center justify-center">

                <p>
                  Loading...
                </p>

              </div>

            ) : chats?.length ===
              0 ? (

              <div className="h-full flex items-center justify-center text-gray-500">

                No Conversations

              </div>

            ) : (

              chats.map((chat) => {

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
                    className={`p-4 border-b border-gray-100 cursor-pointer transition-all duration-200 ${
                      selectedChat?._id ===
                      chat._id
                        ? "bg-gradient-to-r from-green-50 to-green-100"
                        : "hover:bg-gray-50"
                    }`}
                  >

                    <div className="flex gap-4">

                      {/* PRODUCT IMAGE */}

                      <div className="relative">

                        <img
                          src={
                            chat
                              .productId
                              ?.imageUrls?.[0]
                              ?.url
                          }
                          alt=""
                          className="w-16 h-16 rounded-2xl object-cover shadow-md"
                        />

                        {/* USER AVATAR */}

                        <img
                          src={`https://ui-avatars.com/api/?name=${otherUser?.name}&background=16a34a&color=fff`}
                          alt=""
                          className="w-7 h-7 rounded-full absolute -bottom-1 -right-1 border-2 border-white"
                        />
                      </div>

                      {/* INFO */}

                      <div className="flex-1 min-w-0">

                        <div className="flex justify-between">

                          <div>

                            <h2 className="font-bold text-gray-800 truncate">

                              {
                                otherUser?.name
                              }

                            </h2>

                            <p className="text-sm text-green-600 truncate mt-1">

                              {
                                chat
                                  ?.productId
                                  ?.name
                              }

                            </p>
                          </div>

                          <span className="text-xs text-gray-400 whitespace-nowrap">

                            {new Date(
                              chat.updatedAt
                            ).toLocaleDateString()}

                          </span>
                        </div>

                        <div className="flex items-center justify-between mt-3">

                          <p className="text-sm text-gray-500 truncate">

                            {
                              chat
                                ?.lastMessage
                                ?.text
                            }

                          </p>

                          {chat.unreadCount >
                            0 && (

                            <span className="bg-green-600 text-white min-w-[22px] h-[22px] rounded-full flex items-center justify-center text-xs font-bold px-1">

                              {
                                chat.unreadCount
                              }

                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* MOBILE BOTTOM NAV */}

          <MobileBottomNavbar />
        </div>

        {/* ================================= */}
        {/* CHAT AREA */}
        {/* ================================= */}

        <div
          className={`${
            mobileView
              ? "flex"
              : "hidden md:flex"
          } flex-1 flex-col bg-[#efeae2]`}
        >

          {!selectedChat ? (

            <div className="flex-1 flex items-center justify-center">

              <div className="text-center">

                <div className="w-24 h-24 rounded-full bg-green-100 mx-auto flex items-center justify-center">

                  <div className="w-12 h-12 rounded-2xl bg-green-600"></div>

                </div>

                <h2 className="text-3xl font-black text-gray-700 mt-6">

                  TechBy Chat

                </h2>

                <p className="text-gray-500 mt-2">

                  Select a conversation

                </p>
              </div>
            </div>

          ) : (
            <>
              {/* HEADER */}

              <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">

                <div className="flex items-center gap-3">

                  {/* BACK */}

                  <button
                    onClick={() =>
                      setMobileView(
                        false
                      )
                    }
                    className="md:hidden w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center"
                  >

                    <FaArrowLeft />

                  </button>

                  {/* USER */}

                  <img
                    src={`https://ui-avatars.com/api/?name=${
                      getOtherUser(
                        selectedChat.participants
                      )?.name
                    }&background=16a34a&color=fff`}
                    alt=""
                    className="w-12 h-12 rounded-full"
                  />

                  <div>

                    <div className="flex items-center gap-2">

                      <h2 className="font-bold text-lg">

                        {
                          getOtherUser(
                            selectedChat.participants
                          )?.name
                        }

                      </h2>

                      <FaCheckCircle className="text-green-600 text-sm" />
                    </div>

                    <p className="text-sm text-gray-500 truncate max-w-[180px]">

                      {
                        selectedChat
                          ?.productId
                          ?.name
                      }

                    </p>
                  </div>
                </div>

                <button className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center">

                  <FaEllipsisV />

                </button>
              </div>

              {/* MESSAGES */}

              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">

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
                        className={`max-w-[85%] md:max-w-md px-4 py-3 rounded-3xl shadow-sm relative ${
                          isMyMessage(
                            msg
                          )
                            ? "bg-green-600 text-white rounded-br-sm"
                            : "bg-white text-gray-800 rounded-bl-sm"
                        }`}
                      >

                        <p className="text-sm leading-relaxed break-words">

                          {msg.text}

                        </p>

                        <span
                          className={`text-[11px] mt-2 block text-right ${
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

                        </span>
                      </div>
                    </div>
                  )
                )}

                <div ref={bottomRef}></div>
              </div>

              {/* INPUT */}

              <div className="bg-white border-t border-gray-200 p-3 md:p-4">

                <div className="flex items-center gap-3 bg-gray-100 rounded-full px-3 py-2">

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
                    className="flex-1 bg-transparent outline-none px-3 py-2"
                  />

                  <button
                    onClick={
                      handleSendMessage
                    }
                    className="w-12 h-12 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center text-white transition-all duration-200 active:scale-95"
                  >

                    <FaPaperPlane />

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