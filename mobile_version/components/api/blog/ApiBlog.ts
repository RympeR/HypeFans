import { AsyncStorage } from "react-native";
import Api from "./api";
import ApiProfile from "../user/profile/ApiProfile";
import {
	FullPost,
	ShortPost,
	MainPage,
	GetUserStories,
	StoryGet,
	Notification,
} from "./types";

export default class ApiBlog {
	private api: Api;
	private userID: number;
	public stories: Array<StoryGet>;
	public notifications: Array<Notification>;
	public user_stories: Array<GetUserStories>;
	public main_page: Array<MainPage>;
	public user_posts: ShortPost[];

	constructor(token: string) {
		this.api = new Api(token || null);
	}

	private setToken(token: string): void {
		if (token) {
			AsyncStorage.setItem("token", token);
			console.log("settoken" + token);
			this.api = new Api(token);
		} else {
			AsyncStorage.removeItem("token");
			this.api = new Api();
		}
	}

	public async postCreate(
		time_to_archive: number,
		reply_link: string,
		name: string,
		description: string,
		price_to_watch: number,
		enabled_comments: boolean,
		user: number,
		attachments: number[],
		favourites: number[],
		data: any
	) {
		const result = await this.api.postCreate(
			time_to_archive,
			reply_link,
			name,
			description,
			price_to_watch,
			enabled_comments,
			user,
			attachments,
			favourites,
			data
		);
	}

	public async userPostsGet(username: string) {
		const result = await this.api.userPostsGet(username);
		this.user_posts = result.data.results;
		return result;
	}

	public async postPartialUpdate(id: number, data: any) {
		const result = await this.api.postPartialUpdate(id, data);
		return result;
	}

	public async postGet(id: number) {
		const result = await this.api.postGet(id);
		return result;
	}

	public async userPostsGetActions(id: number) {
		const result = await this.api.userPostsGetActions(id);
		return result;
	}

	public async userStoriesGet() {
		const result = await this.api.userStoriesGet();
		this.user_stories = result.data;
		return result;
	}

	public async mainPageGet() {
		const result = await this.api.mainPage();
		this.main_page = result.data;
		return result;
	}

	public async storyActionGet(id: number) {
		const result = await this.api.storyActionGet(id);
		return result;
	}

	public async notificationsGet() {
		const result = await this.api.notificationsGet();
		this.notifications = result.data;
		return result;
	}

	public async postActionCreate(
		like: boolean,
		comment: string,
		donation_amount: number,
		user: number,
		post: number,
		data: any
	) {
		const result = await this.api.postActionCreate(
			like,
			comment,
			donation_amount,
			user,
			post,
			data
		);
	}

	public async storyActionCreate(
		like: boolean,
		comment: string,
		watched: boolean,
		source: number,
		target: number,
		times_wathced: number,
		data: any
	) {
		const result = await this.api.storyActionCreate(
			like,
			comment,
			watched,
			source,
			target,
			times_wathced,
			data
		);
	}

	public async attachmentCreate(_file: any, file_type: number, data: any) {
		const result = await this.api.attachmentCreate(_file, file_type, data);
	}

	public async storyCreate(
		time_to_archive: number,
		reply_link: string,
		archived: boolean,
		user: number,
		data: any
	) {
		const result = await this.api.storyCreate(
			time_to_archive,
			reply_link,
			archived,
			user,
			data
		);
	}

	public async postDelete(id: number) {
		const result = await this.api.postDelete(id);
	}

	public async postActionDelete(id: number) {
		const result = await this.api.postActionDelete(id);
	}

	public async storyDelete(id: number) {
		const result = await this.api.storyDelete(id);
	}
}
