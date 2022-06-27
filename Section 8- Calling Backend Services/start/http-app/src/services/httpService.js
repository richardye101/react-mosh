import axios from "axios";
import { toast } from "react-toastify";
import logger from "./logService";

// pass two functions to intercept responses, pass null in place of success fn bc we don't care about success rn
axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    // console.log("Logging error", error);
    logger.log(error);
    toast("Something failed while deleting a post!");
  }

  return Promise.reject(error); // passes control to catch block in try catch
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
