import axios from "axios";
// import  from 'axios'
// import { store } from "./store/store";

const instance: any = axios.create({
  baseURL: process.env.REACT_APP_URL_SERVER,
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config: any) {
    // Do something before request is sent
    const storage = localStorage.getItem("persist:root");
    if (typeof storage === "string") {
      const { token }: { token: string } = JSON.parse(storage);
      if (token.replaceAll(`"`, "") !== "")
        config.headers = {
          Authorization: `Bearer ${token.replaceAll(`"`, "")}`,
        };
    }
    return config;
    // if (token !== 'null' && typeof token === "string") {
    //   return config;
    // }
  },
  function (error: any) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response: any) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    const { data, status } = response;
    return { data, status };
  },
  function (error: any) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error?.response) {
      const { data, status } = error?.response;
      return { data, status };
    }
    return error;
  }
);
export default instance;
