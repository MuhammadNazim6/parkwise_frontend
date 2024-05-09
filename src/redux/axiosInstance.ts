import axios from "axios";
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    "Content-Type": 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  config.withCredentials = true;
  const token = localStorage.getItem('token')

  if (token) {
    console.log(token);
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log('Inside axiosInstance interceptors request');

  return config;
}, (error) => {
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use((response) => {
  console.log('Inside response response response');
  return response;
}, async (error) => {
  // for refresh token
  console.log('Inside RESPONSE ERROR SECTION');

  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest.retry) {
    console.log('originalRequest.retry is ',originalRequest.retry, 'so sending /refresh token');
    
    originalRequest.retry = true;
    try {
      const { data } = await axios.post('http://localhost:3000/api/common/refreshToken', {}, { withCredentials: true });
      console.log('data from the /refereshtoken',data);
      console.log(data.accessToken);
      
      
      const accessToken = data.accessToken;

      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      console.log('Changed the AccessTOKEN to ',accessToken);
      localStorage.setItem('token',accessToken)
      console.log('access token changed to ', localStorage.getItem('token'));
      
      
      return axios(originalRequest);
    } catch (error) {
      console.error('Refresh token error:', error);
    }
  }
  return Promise.reject(error)
})

export default axiosInstance