import { DateTime } from "luxon";
import { JsonProperty, Serializable } from "typescript-json-serializer";
import { ShortUser } from "../user/profile/types";
import { ShortAttachment } from "../blog/types";

@Serializable()
export class Message {
	@JsonProperty() id: number;
	@JsonProperty() room_id: number;
	@JsonProperty() user_id: number;
	@JsonProperty() text: string;
	@JsonProperty() attachments: ShortAttachment[];
	@JsonProperty() date: number;
	@JsonProperty() readed: boolean;
}

@Serializable()
export class ShortMessage {
	@JsonProperty() id: number;
	@JsonProperty() time: number;
	@JsonProperty() text: string;
	@JsonProperty() attachment: boolean;
}

@Serializable()
export class Room {
	@JsonProperty() id: number;
	@JsonProperty() crator: ShortUser;
	@JsonProperty() invited: ShortUser[];
	@JsonProperty() date: number;
}


@Serializable()
export class UserRoom {
	@JsonProperty() id: number;
	@JsonProperty() user: ShortUser;
	@JsonProperty() message: ShortMessage;
}

