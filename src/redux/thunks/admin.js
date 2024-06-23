import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../constants/config";

const AdminLogin = createAsyncThunk("admin/login", async (secretKey, { rejectWithValue }) => {
    const config = {
    withCredentials: true,
    headers: {
      "Content-type": "application/json",
    },
  };
  try {
    const { data } = await axios.post(
      `${server}/api/v1/admin/verify`,
      { secretKey }, 
      config
    );
    return data.message;
  } catch (error) {
    // ret(error.response?.data?.message || "Something Went Wrong");
    console.log(error);
    throw error.response.data.message;
  }
});
const getAdmin = createAsyncThunk("admin/getAdmin", async () => {
    try {
      const { data } = await axios.get(`${server}/api/v1/admin/`, {
        withCredentials: true,
      });
  
      return data.admin;
    } catch (error) {
      throw error.response.data.message;
    }
  });
  
  const adminLogout = createAsyncThunk("admin/logout", async () => {
    try {
      const { data } = await axios.get(`${server}/api/v1/admin/logout`, {
        withCredentials: true,
      });
  
      return data.message;
    } catch (error) {
      throw error.response.data.message;
    }
  });

export {AdminLogin,getAdmin,adminLogout};
