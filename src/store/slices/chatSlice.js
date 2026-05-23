import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  createConversationApi,
  fetchChatsApi,
  fetchMessagesApi,
  sendMessageApi,
} from "../../Api/chatApi";

// ======================================================
// CREATE CONVERSATION
// ======================================================

export const createConversation =
  createAsyncThunk(
    "chat/createConversation",
    async (data, thunkAPI) => {
      try {
        return await createConversationApi(
          data
        );
      } catch (err) {
        return thunkAPI.rejectWithValue(
          err.response?.data ||
            "Failed to create conversation"
        );
      }
    }
  );

// ======================================================
// FETCH CHATS
// ======================================================

export const fetchChats =
  createAsyncThunk(
    "chat/fetchChats",
    async (_, thunkAPI) => {
      try {
        return await fetchChatsApi();
      } catch (err) {
        return thunkAPI.rejectWithValue(
          err.response?.data ||
            "Failed to fetch chats"
        );
      }
    }
  );

// ======================================================
// FETCH MESSAGES
// ======================================================

export const fetchMessages =
  createAsyncThunk(
    "chat/fetchMessages",
    async (
      conversationId,
      thunkAPI
    ) => {
      try {
        return await fetchMessagesApi(
          conversationId
        );
      } catch (err) {
        return thunkAPI.rejectWithValue(
          err.response?.data ||
            "Failed to fetch messages"
        );
      }
    }
  );

// ======================================================
// SEND MESSAGE
// ======================================================

export const sendMessage =
  createAsyncThunk(
    "chat/sendMessage",
    async (data, thunkAPI) => {
      try {
        return await sendMessageApi(data);
      } catch (err) {
        return thunkAPI.rejectWithValue(
          err.response?.data ||
            "Failed to send message"
        );
      }
    }
  );

// ======================================================
// SLICE
// ======================================================

const chatSlice = createSlice({
  name: "chat",

  initialState: {
    chats: [],
    messages: [],
    selectedChat: null,
    conversation: null,
    loading: false,
    error: null,
  },

  reducers: {
    // ======================================================
    // SET SELECTED CHAT
    // ======================================================

    setSelectedChat: (
      state,
      action
    ) => {
      state.selectedChat =
        action.payload;
    },

    // ======================================================
    // CLEAR MESSAGES
    // ======================================================

    clearMessages: (state) => {
      state.messages = [];
    },
  },

  extraReducers: (builder) => {
    builder

      // ======================================================
      // CREATE CONVERSATION
      // ======================================================

      .addCase(
        createConversation.pending,
        (state) => {
          state.loading = true;
        }
      )

      .addCase(
        createConversation.fulfilled,
        (state, action) => {
          state.loading = false;

          state.conversation =
            action.payload;
        }
      )

      .addCase(
        createConversation.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload;
        }
      )

      // ======================================================
      // FETCH CHATS
      // ======================================================

      .addCase(
        fetchChats.pending,
        (state) => {
          state.loading = true;
        }
      )

      .addCase(
        fetchChats.fulfilled,
        (state, action) => {
          state.loading = false;

          state.chats =
            action.payload;
        }
      )

      .addCase(
        fetchChats.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload;
        }
      )

      // ======================================================
      // FETCH MESSAGES
      // ======================================================

      .addCase(
        fetchMessages.pending,
        (state) => {
          state.loading = true;
        }
      )

      .addCase(
        fetchMessages.fulfilled,
        (state, action) => {
          state.loading = false;

          state.messages =
            action.payload;
        }
      )

      .addCase(
        fetchMessages.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload;
        }
      )

      // ======================================================
      // SEND MESSAGE
      // ======================================================

      .addCase(
        sendMessage.pending,
        (state) => {
          state.loading = true;
        }
      )

      .addCase(
        sendMessage.fulfilled,
        (state, action) => {
          state.loading = false;

          state.messages.push(
            action.payload
          );
        }
      )

      .addCase(
        sendMessage.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload;
        }
      );
  },
});

export const {
  setSelectedChat,
  clearMessages,
} = chatSlice.actions;

export default chatSlice.reducer;