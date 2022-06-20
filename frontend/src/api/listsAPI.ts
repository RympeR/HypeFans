import { instance } from "./api";
import { userSearchType } from "./types";

export const listsAPI = {
  getListAvialableUsers(limit: number, offset: number, username: string) {
    return instance
      .get(`/user/custom-list-retrieve-available-users/?&username=${username}`)
      .then((response) => {
        return response.data;
      });
  },
  customListChange(chatId: number, usersId: Array<number>, add: boolean) {
    return instance.put(`/user/custom-list-invite/${chatId}`, { username: usersId, add }).then((res) => {
      return res
    })
  },
  createList({ creator, invited, name }: { creator: number, invited: Array<any>, name: string }) {
    console.log({ creator, invited, name });

    return instance
      .post(`/user/custom-list-create/`, { creator, invited: invited.map(item => item.pk), name })
      .then((response) => {
        return response;
      });
  },
  getCustomLists() {
    return instance.get(`/user/custom-list-retrieve/`).then((res) => res.data)
  },
  getCustomList(name: string) {
    return instance.get(`/user/custom-list-retrieve-users/?name=${name}`).then((res) => res.data)
  },
  deleteCustomList(pk: string | number) {
    return instance.delete(`/user/custom-list-delete/${pk}`).then((res) => res)
  }
};

// custom-list-create/
// POST
// data:
// creator - id user (от которого шлешь запрос)
// invited - list [id user (которых добавить в списки)]
// name - str - название списка
// запрос для того чтобы создать список
