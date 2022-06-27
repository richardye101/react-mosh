import axios from "axios";
import { toast } from "react-toastify";
import logger from "./logService";

//used to import authService to set jwt for axios, but authService also imported this module. removed bidirectional dependency
// used authService to setJWT instead

// pass two functions to intercept responses, pass null in place of success fn bc we don't care about success rn
axios.interceptors.response.use(null, (error) => {
  console.log(error.response.status);
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    // console.log("Logging error", error);
    logger.log(error);
    toast("Something failed!");
  }

  return Promise.reject(error); // passes control to catch block in try catch
});

function setJwt(jwt) {
  // config default headers
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};
