import { instance } from './api';

export const settingsAPI = {
  getLists() {
    return instance.get('/blog/get-users-lists/').then((res) => {
      return res.data;
    });
  },
  getListUsers(type: string) {
    let parsType = type.split("_").join("-")
    return instance.get(`/blog/get-users-lists-${parsType}/`).then((res) => {
      return res.data;
    });
  },
};
