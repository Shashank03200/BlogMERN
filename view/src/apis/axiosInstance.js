import axios from "axios";

import jwt_decode from "jwt-decode";
import tokens from "./tokens";

const routeInstance = axios.create({});

const refreshToken = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      const response = await axios({
        method: "POST",
        url: "/api/auth/refresh-token",
        data: { refreshToken },
      });

      const data = await response.data;
      console.log(data);
      return resolve(data.data);
    } catch (error) {
      console.log(error);
      return reject(error);
    }
  });
};

routeInstance.interceptors.request.use(
  async (request) => {
    let currentDate = new Date();

    const accessToken = tokens.accessToken;
    const decodedToken = jwt_decode(accessToken);
    console.log(decodedToken);
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      const data = await refreshToken();
      console.log(data);
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      request.headers["authorization"] = "Bearer " + data.accessToken;
    } else request.headers["authorization"] = "Bearer " + accessToken;
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// routeInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     const originalRequest = error.config;
//     const refreshToken = localStorage.getItem("refreshToken");

//     if (
//       error.response &&
//       error.response.status === 401 &&
//       error.config &&
//       refreshToken &&
//       !originalRequest._retry
//     ) {
//       console.log("Response Intercepted");
//       originalRequest._retry = true;
//       axios({
//         method: "POST",
//         url: "/api/auth/refresh-token",
//         data: {
//           refreshToken,
//         },
//       })
//         .then((res) => res.data)
//         .then((data) => {
//           error.config.headers["Authorization"] = "Bearer " + data.accessToken;
//           localStorage.setItem("accessToken", data.accessToken);
//           localStorage.setItem("refreshToken", data.refreshToken);
//           console.log("New data after refresh : ", data);
//           console.log(error.response.config);

//           return routeInstance(error.response.config);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }
//   }
// );

export default routeInstance;
