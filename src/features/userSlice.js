import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUsers, createUser, updateUser, deleteUser } from "./userAPI";

const initialState = {
  users: [],
  loading: false,
  error: null,
  searchedData: []
}

export const fetchUsersAsync = createAsyncThunk("users/fetchUsers",
  async () => {
    try {
      const response = await fetchUsers();
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const createUserAsync = createAsyncThunk(
  "users/createUser",
  async (data) => {
    try {
      const response = await createUser(data);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);


export const updateUserAsync = createAsyncThunk(
  "users/updateUser",
  async (data) => {
    console.log(data);
    try {
      const response = await updateUser(data);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteUserAsync = createAsyncThunk(
  "users/deleteUser",
  async (id) => {
    try {
      const response = await deleteUser(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsersAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsersAsync.rejected, (state, action) => {
        state.loading = false;
        state.users = action.error;
      })
      .addCase(createUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.users = action.error;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.users.findIndex((usr) => usr.id === action.payload.id);
        state.users[index] = action.payload;
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.users = action.error;
      })
      .addCase(deleteUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.users.findIndex((usr) => usr.id === action.payload.id);
        state.users.splice(index, 1);
      })
      .addCase(deleteUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.users = action.error;
      })
  }
});

export const userInfo = (state) => state.user;

export default userSlice.reducer;