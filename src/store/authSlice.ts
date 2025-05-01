import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../config/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

interface AuthState {
  user: { email: string } | null;
  loading: boolean;
  error: string | null;
}

interface LoginPayload {
  email: string;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};


export const login = createAsyncThunk<LoginPayload, { email: string; password: string }, { rejectValue: string }>(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      return { email: user.email || '' };
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      return rejectWithValue(errorMessage);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = { email: action.payload.email };
        state.loading = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default authSlice.reducer;