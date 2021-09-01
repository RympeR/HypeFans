import { instance } from './api';

export const chatAPI = {
  getChatMessages(room_id: number, message_id: number, data: any) {
    const dataSend: any = {
      room_id,
      message_id
    };
    for (const key in data) {
      dataSend[key] = data[key];
    }
    return instance.post(`chat/get-chat-messages/`, data).then((response) => {
      return response.data;
    });
  },
  getUserDialogs() {
    return instance.post(`get-user-dialogs/`).then((response) => {
      return response.data;
    });
  },
  inviteUserPut(id: number, username: string, data: any) {
    const dataSend: any = {
      username
    };
    for (const key in data) {
      dataSend[key] = data[key];
    }
    return instance.put(`chat/invite-user/${id}`, data).then((response) => {
      return response;
    });
  },
  inviteUser(id: number, username: string, data: any) {
    const dataSend: any = {
      username
    };
    for (const key in data) {
      dataSend[key] = data[key];
    }
    return instance.patch(`chat/invite-user/${id}`, data).then((response) => {
      return response;
    });
  },
  messageCreate(room_id: number, text: string, attachments: number[], data: any) {
    const dataSend: any = {
      room_id,
      text,
      attachments
    };
    for (const key in data) {
      dataSend[key] = data[key];
    }
    return instance.post(`chat/message-create/`, data).then((response) => {
      if (response.status !== 202) {
        console.log('Error');
      }
      return response;
    });
  },
  messageDelete(id: number) {
    return instance.delete(`chat/message-delete/${id}`).then((response) => {
      return response;
    });
  },
  messageRetrieve(id: number) {
    return instance.get(`chat/message-retrieve/${id}`).then((response) => {
      return response.data;
    });
  },
  messageUpdatePut(text: string, room: number, id: number, attachments: number[], user: number) {
    return instance.put(`chat/message-update/${id}`, { text, room, user, attachments }).then((response) => {
      return response;
    });
  },
  messageUpdate(text: string, room: number, id: number, attachments: number[], user: number) {
    return instance.patch(`chat/message-update/${id}`, { text, room, user, attachments }).then((response) => {
      return response;
    });
  },
  roomCreate(invited: number[], data: any) {
    const dataSend: any = {
      invited
    };
    for (const key in data) {
      dataSend[key] = data[key];
    }
    return instance.post(`chat/room-create/`, data).then((response) => {
      if (response.status !== 202) {
        console.log('Error!');
      }
      return response;
    });
  },
  roomDelete(id: number) {
    return instance.delete(`chat/room-delete/${id}`).then((response) => {
      return response;
    });
  },
  roomRetrieve(id: number) {
    return instance.get(`chat/room-retrieve/${id}`).then((response) => {
      return response.data;
    });
  },
  roomUpdate(id: number, invited: number[], data: any) {
    const dataSend: any = {
      invited
    };
    for (const key in data) {
      dataSend[key] = data[key];
    }
    return instance.get(`chat/room-update/${id}`, data).then((response) => {
      return response;
    });
  }
};
