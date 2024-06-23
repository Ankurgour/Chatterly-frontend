import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/auth";
import api from "./api/api";
import additionalSlice from "./reducers/additonal";
import chatSlice from "./reducers/chat";
const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [additionalSlice.name]:additionalSlice.reducer,
    [chatSlice.name]: chatSlice.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware:(defaultMiddleware)=>[...defaultMiddleware(),api.middleware]
});

export default store;
