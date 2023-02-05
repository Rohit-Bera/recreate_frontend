import { createSlice } from "@reduxjs/toolkit";

const adminDataSlice = createSlice({
  name: "admindata-storage",
  initialState: {
    _id: "",
    name: "",
    email: "",
    type: "",
    token: "",
  },

  reducers: {
    adminData: (state, action) => {
      const { token, user } = action.payload;

      state.token = token;

      const { _id, email, name, type } = user;

      state._id = _id;
      state.name = name;
      state.email = email;
      state.type = type;

      console.log(" admin state._id: ", state._id);
      console.log(" admin state.name: ", state.name);
      console.log(" admin state.email: ", state.email);
      console.log(" admin state.type: ", state.type);
    },
  },
});

export const { adminData } = adminDataSlice.actions;
export default adminDataSlice.reducer;
