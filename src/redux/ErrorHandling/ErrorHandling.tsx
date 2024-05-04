import { toast } from "react-toastify";
export const onQueryStartedErrorToast = async (args, { queryFulfilled }) => {
  try {
    await queryFulfilled;
  } catch (error) {
    console.log('An error occurred:', error);

    if (error.meta?.response?.status) {
      const status = error.meta.response.status;
      
      // Perform error handling based on the status code
      switch (status) {
        case 400:
          alert('Bad request. Please check your input data.');
          break;
        case 401:
          alert('Unauthorized. Please log in.');
          break;
        case 403:
          alert('Forbidden. You do not have permission to access this resource.');
          break;
        case 404:
          alert('Resource not found.');
          break;
        case 500:
          alert('Internal server error. mjPlease try again later')
          break;
        default:
          alert(`An error occurred with status code ${status}.`);
          break;
      }
    } else {
      console.log('Unknown error occurred:', error);
    }
  }
};