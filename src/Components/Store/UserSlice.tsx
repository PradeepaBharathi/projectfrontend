import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { toast } from "react-toastify";


const base_url = 'https://projectbackend-p822.onrender.com';

interface User {
  name: string;
  email: string;
  password:string
  
}

interface LoginResponse {
  token: string;
  data: {
    _id: string;
    name: string;
    email: string;
    password: string;
  
   
  };
}

export const loginUser = createAsyncThunk<LoginResponse, { email: string, password: string }>(
  "user/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch(`${base_url}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data: LoginResponse = await response.json();
      localStorage.setItem('token', data.token);

      return data;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const signupUser = createAsyncThunk<User, User>(
  "user/signup",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${base_url}/user/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Signup failed');
      }

      const data: User = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

interface UserState {
  loading: boolean;
  user: User | null;
  error: any;
}

const initialState: UserState = {
  loading: false,
  user: null,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = {
          name: "", 
          email: "", 
          password:""
        
        };
        toast.success(action.payload.message || "Login Success!");
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload.message || "Login failed!");
      })
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        toast.success("Signup successful!");
      })
      .addCase(signupUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload.message || "Signup failed!");
      });
  },
});

export default userSlice.reducer;
