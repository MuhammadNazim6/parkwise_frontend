import { createSlice } from "@reduxjs/toolkit";

export interface UserInfo {
  email: string;
  name: string;
  mobile?: number;
  profile_img?: string;
  password?: string;
}

export interface AdminInfo {
  email: string;
  password?: string;
  name: string;
}

export interface ProviderInfo {
  email: string;
  name: string;
  profile?: string;
  parkingName?: string;
  password?: string;
  mobile: number;
}


interface InitialState {
  userInfo: UserInfo | null;
  registerInfo: UserInfo | null;
  ProviderInfo: ProviderInfo | null;
  adminInfo: AdminInfo | null;
  EmailInfo: string | null;
}

const userInfoFromLocalStorage = localStorage.getItem('userInfo');
const providerInfoFromLocalStorage = localStorage.getItem('providerInfo');
const adminInfoFromLocalStorage = localStorage.getItem('adminInfo');
const emailInfoFromLocalStorage = localStorage.getItem('emailInfo');

const initialState = {
  userInfo: userInfoFromLocalStorage ? JSON.parse(userInfoFromLocalStorage) : null,
  providerInfo: providerInfoFromLocalStorage ? JSON.parse(providerInfoFromLocalStorage) : null,
  adminInfo: adminInfoFromLocalStorage ? JSON.parse(adminInfoFromLocalStorage) : null,
  emailInfo: emailInfoFromLocalStorage ? JSON.parse(emailInfoFromLocalStorage) : null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload))
    },
    userLogout: (state) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo')
    },
    setProviderCredentials: (state, action) => {
      state.providerInfo = action.payload;
      localStorage.setItem("providerInfo", JSON.stringify(action.payload));
    },

    providerLogout: (state) => {
      state.providerInfo = null;
      localStorage.removeItem("providerInfo");
    },
    setAdminCredentials: (state, action) => {
      state.adminInfo = action.payload;
      localStorage.setItem("adminInfo", JSON.stringify(action.payload));
    },

    adminLogout: (state) => {
      state.adminInfo = null;
      localStorage.removeItem("adminInfo");
    },
    setEmailInfo: (state,action)=>{
      state.emailInfo = action.payload;
      localStorage.setItem('emailInfo',JSON.stringify(action.payload))
    },

    deleteEmailInfo:(state)=>{
      state.emailInfo = null;
      localStorage.removeItem("emailInfo");
    }

  }
})

export const {
  setCredentials,
  userLogout,
  setProviderCredentials,
  providerLogout,
  setAdminCredentials,
  adminLogout,
  setEmailInfo,
  deleteEmailInfo

} = authSlice.actions;

export default authSlice.reducer;