import { AsyncStorage } from "react-native";
import Api from "./api";
import ApiProfile from "../user/profile/ApiProfile";
import { Message, UserRoom } from "./types";

export default class ApiСhat {
	private api: Api;
	public chat_messages: Array<Message>;
	public user_rooms: Array<UserRoom>;

	constructor(user: ApiProfile) {
		this.api = new Api(user.token || null);
	}

	public async roomCreate(invited: number[], data: any) {
		const result = await this.api.roomCreate(invited, data);
		console.log(result);
	}

	public async roomUpdate(id: number, invited: number[], data: any) {
		const result = await this.api.roomUpdate(id, invited, data);
		console.log(result);
	}

	public async roomDelete(id: number) {
		const result = await this.api.roomDelete(id);
		console.log(result);
	}

	public async inviteUser(id: number, username: string, data: any) {
		const result = await this.api.inviteUser(id, username, data);
		console.log(result);
	}

	public async getChatMessages(
		room_id: number,
		message_id: number,
		data: any
	) {
		const result = await this.api.getChatMessages(
			room_id,
			message_id,
			data
		);
		console.log(result);
	}

	public async getUserDialogs() {
		const result = await this.api.getUserDialogs();
		console.log(result);
	}

	public async messageCreate(
		room_id: number,
		text: string,
		attachments: number[],
		data: any
	) {
		const result = await this.api.messageCreate(
			room_id,
			text,
			attachments,
			data
		);
		console.log(result);
	}

	public async messageRetrieve(id: number) {
		const result = await this.api.messageRetrieve(id);
		console.log(result);
	}

	public async messageDelete(id: number) {
		const result = await this.api.messageDelete(id);
	}
}

console.log("test")