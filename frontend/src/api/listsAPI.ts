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
  getCustomLists() {
    return instance.get(`/user/custom-list-retrieve/`).then((res) => res.data)
  },
  getCustomList(name: string) {
    return instance.get(`/user/custom-list-retrieve-users/?name=${name}`).then((res) => res.data)
  },
  deleteCustomList(pk: string | number) {
    return instance.delete(`/user/custom-list-delete/?pk=${pk}/`).then((res) => res.data)
  }
};

// custom-list-create/
// POST
// data:
// creator - id user (от которого шлешь запрос)
// invited - list [id user (которых добавить в списки)]
// name - str - название списка
// запрос для того чтобы создать список
