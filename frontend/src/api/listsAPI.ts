import { instance } from "./api";
import { userSearchType } from "./types";

export const listsAPI = {
  getListAvialableUsers(limit: number, offset: number, username: string) {
    return instance
      .get(`/user/custom-list-retrieve-available-users/?limit=${limit}&offset=${offset}&username=${username}`)
      .then((response) => {
        return response.data;
      });
  },
  createList({ creator, invited, name }: { creator: number, invited: Array<number>, name: string }) {
    console.log({ creator, invited, name });

    return instance
      .post(`/user/custom-list-create/`, { creator, invited, name })
      .then((response) => {
        return response.data;
      });
  },
};

// custom-list-create/
// POST
// data:
// creator - id user (от которого шлешь запрос)
// invited - list [id user (которых добавить в списки)]
// name - str - название списка
// запрос для того чтобы создать список
