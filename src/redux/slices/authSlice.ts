import { createSlice } from "@reduxjs/toolkit";

const userInfoFromLocalStorage = localStorage.getItem('userInfo');
const providerInfoFromLocalStorage = localStorage.getItem('providerInfo');
const adminInfoFromLocalStorage = localStorage.getItem('adminInfo');
const emailInfoFromLocalStorage = localStorage.getItem('emailInfo');

const initialState = {
  uLoggedIn: localStorage.getItem('uLoggedIn') ? true : false,
  userInfo: userInfoFromLocalStorage ? JSON.parse(userInfoFromLocalStorage) : null,
  pLoggedIn: localStorage.getItem('pLoggedIn') ? true : false,
  providerInfo: providerInfoFromLocalStorage ? JSON.parse(providerInfoFromLocalStorage) : null,
  aLoggedIn: localStorage.getItem('aLoggedIn') ? true : false,
  adminInfo: adminInfoFromLocalStorage ? JSON.parse(adminInfoFromLocalStorage) : null,
  emailInfo: emailInfoFromLocalStorage ? JSON.parse(emailInfoFromLocalStorage) : null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.uLoggedIn = true
      localStorage.setItem('uLoggedIn', 'true')
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    userLogout: (state) => {
      state.uLoggedIn = false;
      state.userInfo = null;
      localStorage.removeItem('uLoggedIn')
      localStorage.removeItem('userInfo')
      localStorage.removeItem('token')
    },
    setProviderCredentials: (state, action) => {
      state.pLoggedIn = true;
      localStorage.setItem('pLoggedIn', 'true');
      state.providerInfo = action.payload;
      localStorage.setItem("providerInfo", JSON.stringify(action.payload));
    },
    providerLogout: (state) => {
      state.pLoggedIn = false;
      localStorage.removeItem('pLoggedIn');
      state.providerInfo = null;
      localStorage.removeItem("providerInfo");
      localStorage.removeItem('token')
    },
    setAdminCredentials: (state, action) => {
      state.aLoggedIn = true;
      state.adminInfo = action.payload;
      localStorage.setItem('aLoggedIn', 'true');
      localStorage.setItem("adminInfo", JSON.stringify(action.payload));
      localStorage.removeItem('token')
    },
    adminLogout: (state) => {
      state.aLoggedIn = false;
      localStorage.removeItem('aLoggedIn');
      state.adminInfo = null;
      localStorage.removeItem("adminInfo");
      localStorage.removeItem('token')
    },
    setEmailInfo: (state, action) => {
      state.emailInfo = action.payload;
      localStorage.setItem('emailInfo', JSON.stringify(action.payload))
    },
    deleteEmailInfo: (state) => {
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