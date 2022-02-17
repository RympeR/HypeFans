import { instance } from './api';

export const settingsAPI = {
  getLists() {
    return instance.get('/blog/get-users-lists/').then((res) => {
      return res.data;
    });
  }
};
