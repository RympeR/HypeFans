import { instance } from "./api";

export const chatAPI = {
  getChatMessages(room_id: number) {
    return instance
      .post(`/chat/get-chat-messages/`, { room_id })
      .then((response) => {
        return response.data;
      });
  },
  getChatMembers(chat_id: number) {
    return instance
      .get(`/chat/room-user-list/${chat_id}`)
      .then((response) => {
        return response.data;
      });
  },
  getUserDialogs() {
    return instance.post(`get-user-dialogs/`).then((response) => {
      return response.data;
    });
  },
  inviteUsers(username: Array<any>, chat_id: string | number) {
    console.log(chat_id);
    return instance
      .put(`/chat/invite-user/${chat_id}`, { username })
      .then((response) => {
        return response;
      });
  },
  inviteUserPut(id: number, username: string, data: any) {
    const dataSend: any = {
      username,
    };
    for (const key in data) {
      dataSend[key] = data[key];
    }
    return instance.put(`/chat/invite-user/${id}`, data).then((response) => {
      return response;
    });
  },
  inviteUser(id: number, username: string, data: any) {
    const dataSend: any = {
      username,
    };
    for (const key in data) {
      dataSend[key] = data[key];
    }
    return instance.patch(`/chat/invite-user/${id}`, data).then((response) => {
      return response;
    });
  },
  messageCreate(
    room_id: number,
    text: string,
    attachments: number[],
    data: any
  ) {
    const dataSend: any = {
      room_id,
      text,
      attachments,
    };
    for (const key in data) {
      dataSend[key] = data[key];
    }
    return instance.post(`/chat/message-create/`, data).then((response) => {
      if (response.status !== 202) {
        console.log("Error");
      }
      return response;
    });
  },
  messageDelete(id: number) {
    return instance.delete(`/chat/message-delete/${id}`).then((response) => {
      return response;
    });
  },
  getNewMessagesCount() {
    return instance
      .get(`/chat/get-unreaded-messages-amount/`)
      .then((response) => {
        return response.data;
      });
  },
  messageRetrieve(id: number) {
    return instance.get(`/chat/message-retrieve/${id}`).then((response) => {
      return response.data;
    });
  },
  messageUpdatePut(
    text: string,
    room: number,
    id: number,
    attachments: number[],
    user: number
  ) {
    return instance
      .put(`/chat/message-update/${id}`, { text, room, user, attachments })
      .then((response) => {
        return response;
      });
  },
  messageUpdate(
    text: string,
    room: number,
    id: number,
    attachments: number[],
    user: number
  ) {
    return instance
      .patch(`/chat/message-update/${id}`, { text, room, user, attachments })
      .then((response) => {
        return response;
      });
  },
  roomCreate(data: any) {
    return instance.post(`/chat/room-create/`, data).then((response) => {
      console.log(response.status);
      if (response.status == 226) {
        return response;
      }
      return response;
    });
  },
  roomDelete(id: number) {
    return instance.delete(`/chat/room-delete/${id}`).then((response) => {
      return response;
    });
  },
  roomRetrieve(id: number) {
    return instance.get(`/chat/room-retrieve/${id}`).then((response) => {
      return response.data;
    });
  },
  roomUpdate(id: number, invited: number[], data: any) {
    const dataSend: any = {
      invited,
    };
    for (const key in data) {
      dataSend[key] = data[key];
    }
    return instance.get(`/chat/room-update/${id}`, data).then((response) => {
      return response;
    });
  },
};
