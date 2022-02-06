import axios from 'axios';
import Cookies from 'js-cookie';

export const instance = axios.create({
  baseURL: 'https://hype-fans.com/api/',
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'x-csrftoken'
});

export const setAuthToken = (token: string) => {
  if (token === "") {
    instance.defaults.headers.common['Auth'] = ``;
    return instance.defaults.headers.common['Authorization'] = ``;
  }
  // instance.defaults.headers.common['Access-Control-Allow-Headers'] = '*';
  instance.defaults.headers.common['Authorization'] = `token ${token}`;
  instance.defaults.headers.common['Auth'] = `token ${token}`;

};
(function () {
  if (Cookies?.get('token')?.length < 5) {
    axios.defaults.headers.common.Authorization = null;
    axios.defaults.headers.common.Auth = null;
  } else {
    setAuthToken(Cookies?.get('token'));
  }
})();
