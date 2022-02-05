import axios from 'axios';
import Cookies from 'js-cookie';

export const instance = axios.create({
  baseURL: 'https://hype-fans.com/api/',
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'x-csrftoken'
});

export const setAuthToken = (token: string) => {
  if (token === "") {
    return instance.defaults.headers.common['Authorization'] = ``;
  }
  // instance.defaults.headers.common['Access-Control-Allow-Headers'] = '*';
  instance.defaults.headers.common['Authorization'] = `token ${token}`;

};
(function () {
  if (Cookies?.get('token')?.length < 5) {
    axios.defaults.headers.common.Authorization = null;
  } else {
    setAuthToken(Cookies?.get('token'));
  }
})();
