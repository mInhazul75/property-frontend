import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null, 
  isLoggedIn: false, 
  loading: false, 
  error: null, 
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload;
      state.isLoggedIn = true;
      state.error = null;
    },

    clearUser: (state) => {
      state.userInfo = null;
      state.isLoggedIn = false;
    },
    
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setUser, clearUser, setLoading, setError } = userSlice.actions;

export default userSlice.reducer;
