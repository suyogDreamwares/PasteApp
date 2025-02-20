import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : [],
};

export const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      console.log(state + " " + action);
      const paste = action.payload;
      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste created successfully");
    },
    updatToPastes: (state, action) => {
      console.log("State:", JSON.stringify(state)); 
      console.log("Action:", JSON.stringify(action.payload));
    
      const index = state.pastes.findIndex(
        (paste) => paste.id === action.payload.id
      );
      if (index >= 0) {
        state.pastes[index] = action.payload;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste updated successfully");
      }
    },
    removeFromPaste: (state, action) => {
      const pasteId = action.payload;
      const index = state.pastes.findIndex(
        (paste) => paste.id === pasteId
      );
      if(index >= 0){
       state.pastes.splice(index, 1);
       localStorage.setItem("pastes", JSON.stringify(state.pastes));
       toast.success("Paste delete successfully");
      }
    
    },
    resetAllPaste: (state, action) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
    },
  },
});

// Action creators are generated for each case reducer function  
export const { addToPastes, updatToPastes, resetAllPaste, removeFromPaste } =
  pasteSlice.actions;

export default pasteSlice.reducer;
