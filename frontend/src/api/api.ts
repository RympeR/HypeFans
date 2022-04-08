import axios from "axios";

export const instance = axios.create({
  baseURL: "https://hype-fans.com/api/",
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "x-csrftoken",
});
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      console.log("error handled");
      if (localStorage.getItem("hypefansToken") !== null) {
        localStorage.removeItem('hypefansToken')
        window.location.href = "/";
      }
    }
    return error;
  }
);
export const setAuthToken = (token: string) => {
  if (token === "") {
    instance.defaults.headers.common["Auth"] = ``;
    return (instance.defaults.headers.common["Authorization"] = ``);
  }
  // instance.defaults.headers.common['Access-Control-Allow-Headers'] = '*';
  instance.defaults.headers.common["Authorization"] = `token ${token}`;
  instance.defaults.headers.common["Auth"] = `token ${token}`;
};
(function () {
  if (localStorage.getItem('hypefansToken')?.length < 5) {
    axios.defaults.headers.common.Authorization = null;
    axios.defaults.headers.common.Auth = null;
  } else {
    setAuthToken(localStorage.getItem('hypefansToken'));
  }
})();
