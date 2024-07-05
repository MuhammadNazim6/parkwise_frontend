import toast from "react-hot-toast";

export const onQueryStartedErrorToast = async (args, { queryFulfilled }) => {
  try {
    await queryFulfilled;
  } catch (error) {
    if (error.error.data) {
      const status = error.error.status;
      const errorResponse = error.error.data.message;
      // toast.error(errorResponse.message)
      console.error(error);

      // Perform error handling based on the status code
      switch (status) {
        case 400:
          console.log('Bad request. Please check your input data.');
          break;
        case 401:
          console.log('Unauthorized. Please log in.');
          break;
        case 403:
          console.log('Forbidden. You do not have permission to access this resource.');
          toast.error(errorResponse)
          break;
        case 404:
          console.log('Resource not found.');
          break;
        case 500:
          console.log('Internal server error. Please try again later.');
          break;
        default:
          console.log(`An error occurred with status code ${status}.`);
          break;
      }
    } else {
      console.log('Unknown error occurred:', error);
    }
  }
};
