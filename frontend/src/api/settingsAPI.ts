import { instance } from './api';

export const settingsAPI = {
  getLists() {
    return instance.get('/blog/get-users-lists/').then((res) => {
      return res.data;
    });
  },
  getSubsList() {
    return instance.get('/blog/get-users-lists-subs/').then((res) => {
      return res.data;
    });
  },
  getFriendsList() {
    return instance.get('/blog/get-users-lists-friends/').then((res) => {
      return res.data;
    });
  },
  getFavsList() {
    return instance.get('/blog/get-users-lists-favourites/').then((res) => {
      return res.data;
    });
  },
  getDonatorsList() {
    return instance.get('/blog/get-users-lists-donators/').then((res) => {
      return res.data;
    });
  },
  getBlockedList() {
    return instance.get('/blog/get-users-lists-blocked/').then((res) => {
      return res.data;
    });
  },
};
