import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  userID: string | null;
}

const initialState: AuthState = {
  userID: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthID(state, action: PayloadAction<string>) {
      state.userID = action.payload;
    },
    clearAuthID(state) {
      state.userID = null;
    },
  },
});

export const { setAuthID, clearAuthID } = authSlice.actions;
export default authSlice.reducer;
