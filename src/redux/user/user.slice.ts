import { createSlice } from "@reduxjs/toolkit";
import { Thunk } from "../Thunk";
import { UserAxios } from "../../axios/user/user.axios";
import { User } from "../../model/user/User";

interface UserReducer {
  user: User | undefined;
}

const initialState = Object.freeze<UserReducer>({
  user: undefined,
});

const signUp = Thunk<User, SignUpDto>(`/users/signup`, (dto) =>
  UserAxios.signUp(dto)
);

const login = Thunk<User, LoginDto>(`/users/login`, (dto) =>
  UserAxios.login(dto)
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {
    addCase(signUp.fulfilled, (state, action) => {
      state.user = action.payload;
    });

    addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const userActions = {
  ...userSlice.actions,
  signUp,
  login,
};

export default userSlice.reducer;
