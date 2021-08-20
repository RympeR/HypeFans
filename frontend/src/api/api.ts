import axios from 'axios';

export let token: string | null;

export const instance = axios.create({
  baseURL: 'https://hype-fans.com/',
  headers: {
    authorization: token ? `token ${token}` : null
  },
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'x-csrftoken'
});
