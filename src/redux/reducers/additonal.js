import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isNewGroup: false,
  isAddMember: false,
  isNotifications: false,
  isMobileMenuFriend: false,
  isSearch: false,
  isFileMenu: false,
  isDeleteMenu: false,
  uploadingLoader: false, 
  selectedDeleteChat: {
    chatId: "",
    groupChat: false,
  },
};

const additionalSlice = createSlice({
  name: "additional",
  initialState,
  reducers: {
    setisNewGroup: (state, action) => {
      state.isNewGroup = action.payload;
    },
    setisAddMember: (state, action) => {
      state.isAddMember = action.payload;
    },
    setisNotifications: (state, action) => {
      state.isNotifications = action.payload;
    },
    setisMobileMenuFriend: (state, action) => {
      state.isMobileMenuFriend = action.payload;
    },
    setisSearch: (state, action) => {
      state.isSearch = action.payload;
    },
    setisFileMenu: (state, action) => {
      state.isFileMenu = action.payload;
    },
    setisDeleteMenu: (state, action) => {
      state.isDeleteMenu = action.payload;
    },
    setuploadingLoader: (state, action) => { 
      state.uploadingLoader = action.payload;
    },
    setselectedDeleteChat: (state, action) => {
      state.selectedDeleteChat = action.payload;
    },
  },
});

export const {
  setisNewGroup,
  setisAddMember,
  setisNotifications,
  setisMobileMenuFriend,
  setisSearch,
  setisFileMenu,
  setuploadingLoader,
  setselectedDeleteChat,
  setisDeleteMenu
} = additionalSlice.actions;

export default additionalSlice; 
