import axios from "axios";

const API =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

// ================= TOKEN =================
const getToken = () =>
  localStorage.getItem("token");

// ================= AUTH CONFIG =================
const authConfig = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

// ================= AXIOS INSTANCE =================
const axiosInstance = axios.create({
  baseURL: API,
});

// ======================================================
// CREATE CONVERSATION
// ======================================================

export const createConversationApi =
  async (data) => {
    const res = await axiosInstance.post(
      "/chat/conversation",
      data,
      authConfig()
    );

    return res.data;
  };

// ======================================================
// GET ALL CHATS
// ======================================================

export const fetchChatsApi =
  async () => {
    const res = await axiosInstance.get(
      "/chat/conversation",
      authConfig()
    );

    return res.data;
  };

// ======================================================
// GET MESSAGES
// ======================================================

export const fetchMessagesApi =
  async (conversationId) => {
    const res = await axiosInstance.get(
      `/chat/messages/${conversationId}`,
      authConfig()
    );

    return res.data;
  };

// ======================================================
// SEND MESSAGE
// ======================================================

export const sendMessageApi =
  async (data) => {
    const res = await axiosInstance.post(
      "/chat/message",
      data,
      authConfig()
    );

    return res.data;
  };

export default axiosInstance;