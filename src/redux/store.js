import { configureStore } from '@reduxjs/toolkit';
import userSlice from "./slices/userSlice";

export const reduxStore = configureStore({
  reducer: {
    user: userSlice,
  },
});
