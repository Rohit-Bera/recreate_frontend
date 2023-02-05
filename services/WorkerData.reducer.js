import { createSlice } from "@reduxjs/toolkit";

const workerDataSlice = createSlice({
  name: "workerdata-storage",
  initialState: {
    _id: "",
    name: "",
    city: "",
    pincode: "",
    email: "",
    phone: "",
    type: "",
    token: "",
  },

  reducers: {
    workerData: (state, action) => {
      // console.log("action: ", action);
      const { token, user } = action.payload;

      state.token = token;

      const { _id, address, city, email, name, phone, pincode, type } = user;

      state._id = _id;
      state.name = name;
      state.city = city;
      state.pincode = pincode;
      state.email = email;
      state.phone = phone;
      state.type = type;
      state.address = address;
      console.log("worker state._id: ", state._id);
      console.log("worker state.name: ", state.name);
      console.log("worker state.city: ", state.city);
      console.log("worker state.pincode: ", state.pincode);
      console.log("worker state.email: ", state.email);
      console.log("worker state.phone: ", state.phone);
      console.log("worker state.type: ", state.type);
      console.log("worker state.address: ", state.address);
    },
  },
});

export const { workerData } = workerDataSlice.actions;
export default workerDataSlice.reducer;
