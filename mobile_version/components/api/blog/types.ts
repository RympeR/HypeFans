import { DateTime } from "luxon";
import { JsonProperty, Serializable } from "typescript-json-serializer";
import { ShortUser } from "../user/profile/types";

//why property was changed?
const DATETIME_PROPERTY = {
	afterDeserialize: (val: string) => DateTime.fromISO(val),
};
const DECIMAL_PROPERTY = { afterDeserialize: (val: string) => parseFloat(val) };

@Serializable()
export class Attachment {
	@JsonProperty() id: number;
	@JsonProperty() _file: string;
	@JsonProperty() file_type: number;
}

@Serializable()
export class ShortStory {
	@JsonProperty() id: number;
	@JsonProperty() reply_link: string;
	@JsonProperty() story: string;
}

@Serializable()
export class ShortPost {
	@JsonProperty() pk: number;
	@JsonProperty() name: string;
	@JsonProperty() enabled_comments: boolean;
	@JsonProperty() price_to_watch: number;
	@JsonProperty() publication_date: string;
	@JsonProperty() reply_link: string;
	@JsonProperty() likes_amount: number;
	@JsonProperty() comments_amount: number;
	@JsonProperty() favourites_amount: number;
}

@Serializable()
export class FullPost {
	@JsonProperty() id: number;
	@JsonProperty() favourites: ShortUser[];
	@JsonProperty() user: ShortUser;
	@JsonProperty() name: string;
	@JsonProperty() description: string;
	@JsonProperty() enabled_comments: boolean;
	@JsonProperty() price_to_watch: number;
	@JsonProperty() publication_date: string;
	@JsonProperty() reply_link: string;
	@JsonProperty() likes_amount: number;
	@JsonProperty() comments_amount: number;
	@JsonProperty() favourites_amount: number;
	@JsonProperty() attachments: Attachment[];
}

@Serializable()
export class MainPage {
	@JsonProperty() user: ShortUser;
	@JsonProperty() post: ShortPost;
}

@Serializable()
export class GetUserStories {
	@JsonProperty() user: ShortUser;
	@JsonProperty() stories: ShortStory[];
}

@Serializable()
export class StoryGet {
	@JsonProperty() pk: number;
	@JsonProperty() user: ShortUser;
	@JsonProperty() watched_story: ShortUser[];
	@JsonProperty() publication_date: string;
	@JsonProperty() time_to_archive: number;
	@JsonProperty() story: string;
	@JsonProperty() replay_link: string;
	@JsonProperty() archived: boolean;
}

@Serializable()
export class Notification {
	@JsonProperty() pk: number;
	@JsonProperty() user: ShortUser;
	@JsonProperty() watched_story: ShortUser[];
	@JsonProperty() publication_date: string;
	@JsonProperty() time_to_archive: number;
	@JsonProperty() story: string;
	@JsonProperty() replay_link: string;
	@JsonProperty() archived: boolean;
}
