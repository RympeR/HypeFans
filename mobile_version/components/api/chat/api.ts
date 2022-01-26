import axios, { AxiosInstance } from "axios";
import { deserialize } from "typescript-json-serializer";
// import { CardGet, SetPassword, TokenVerify, UserGet } from './types';

export default class Api {
	private elAxios: AxiosInstance;
	private token: string | null;

	constructor(token: string | null = null) {
		this.elAxios = axios.create({
			baseURL: "https://hype-fans.com/api/",
			headers: {
				authorization: token ? `Token ${token}` : null,
			},
			xsrfCookieName: "csrftoken",
			xsrfHeaderName: "x-csrftoken",
		});
	}

	public async roomCreate(invited: number[], data: any) {
		const dataSend: any = {
			invited,
		};
		for (const key in data) {
			dataSend[key] = data[key];
		}
		const result = await this.elAxios.post(`chat/room-create/`, data);
		if (result.status !== 202) {
			throw "Error!";
		}
		return result;
	}

	public async roomRetrieve(id: number) {
		const result = await this.elAxios.get(`chat/room-retrieve/${id}`);
		return result.data;
	}

	public async roomUpdate(id: number, invited: number[], data: any) {
		const dataSend: any = {
			invited,
		};
		for (const key in data) {
			dataSend[key] = data[key];
		}
		const result = await this.elAxios.get(`chat/room-update/${id}`, data);
		return result;
	}
	public async roomDelete(id: number) {
		const result = await this.elAxios.delete(`chat/room-delete/${id}`);
		return result;
	}

	public async inviteUser(id: number, username: string, data: any) {
		const dataSend: any = {
			username,
		};
		for (const key in data) {
			dataSend[key] = data[key];
		}
		const result = await this.elAxios.patch(`chat/invite-user/${id}`, data);
		return result;
	}

	public async getChatMessages(
		room_id: number,
		message_id: number,
		data: any
	) {
		const dataSend: any = {
			room_id,
			message_id,
		};
		for (const key in data) {
			dataSend[key] = data[key];
		}
		const result = await this.elAxios.post(`chat/get-chat-messages/`, data);
		return result.data;
	}

	public async getUserDialogs() {
		const result = await this.elAxios.post(`get-user-dialogs/`);
		return result.data;
	}

	public async messageCreate(
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
		const result = await this.elAxios.post(`chat/message-create/`, data);
		if (result.status !== 202) {
			throw "Error!";
		}
		return result;
	}

	public async messageRetrieve(id: number) {
		const result = await this.elAxios.get(`chat/message-retrieve/${id}`);
		return result.data;
	}

	public async messageDelete(id: number) {
		const result = await this.elAxios.delete(`chat/message-delete/${id}`);
		return result;
	}
}
