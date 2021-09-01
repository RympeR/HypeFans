import axios from 'axios';
import Cookies from 'js-cookie';

export const instance = axios.create({
  baseURL: 'https://hype-fans.com/',
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'x-csrftoken'
});

export const setAuthToken = (token: string) => {
  if (token) {
    instance.defaults.headers.common['authorization'] = `token ${token}`;
  }
};

(function () {
  if (Cookies.get('token') === null) {
    axios.defaults.headers.common.Authorization = null;
  } else {
    setAuthToken(Cookies.get('token'));
  }
})();
