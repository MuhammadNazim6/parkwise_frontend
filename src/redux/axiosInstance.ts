import axios from "axios";
const axiosInstance = axios.create({
  baseURL: 'https://thriftkicks.store',
  // headers: {
  // //   // "Content-Type": 'application/json',
  //   "Content-Type": "multipart/form-data",
  // }
});

axiosInstance.interceptors.request.use((config) => {
  config.withCredentials = true;
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use((response) => {
  return response;

}, async (error) => {
  // for refresh token
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest.retry) {
    originalRequest.retry = true;
    try {
      const { data } = await axios.post('https://thriftkicks.store/api/common/refreshToken', {}, { withCredentials: true });
      const accessToken = data.accessToken;
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      localStorage.setItem('token', accessToken)

      return axios(originalRequest);
    } catch (error) {
      console.error('Refresh token error:', error);
    }
  }
  return Promise.reject(error)
})

export default axiosInstance