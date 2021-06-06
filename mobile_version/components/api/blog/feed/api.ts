import axios, { AxiosInstance } from 'axios';
import { deserialize } from 'typescript-json-serializer';
import { CardGet, SetPassword, TokenVerify, UserGet } from './types';

export default class FeedApi {
  private elAxios: AxiosInstance;
  private token: string | null;

  constructor(token: string | null = null) {
    this.elAxios = axios.create({
      baseURL: 'https://hype-fans.com/',
      headers: {
        authorization: token ? `Token ${token}` : null
      },
      xsrfCookieName: 'csrftoken',
      xsrfHeaderName: 'x-csrftoken'
    });
  }

  public async postCreate(time_to_archive: number, reply_link: string, name: string, description:string,
    price_to_watch: number, enabled_comments: boolean, user:number, attachments:number[], favourites: number[], data: any
    ){
    const dataSend: any = {
      time_to_archive,
      reply_link,
      name,
      description,
      price_to_watch,
      enabled_comments,
      user,
      attachments,
      favourites
    };
    for (const key in data) {
      dataSend[key] = data[key];
    }
    const result = await this.elAxios.post(`blog/create-post/`, data);
    if (result.status !== 202) {
      throw 'Error!';
    }
    return result;
  }

  public async postPartialUpdate(id:number, data: any){
    const result = await this.elAxios.put(`blog/partial-update-post/${id}`, data);
    return result;
  }

  public async postGet(id:number, ){
    const result = await this.elAxios.get(`blog/get-post/${id}`);
    return result;
  }

  public async userPostsGet(username:string, data: any){
    const result = await this.elAxios.post(`blog/get-post-list/${username}`, data);
    return result;
  }

  public async postActionCreate(like: boolean, comment: string, donation_amount: number, user:number,
    post: number, data: any){
    const dataSend: any = {
      like,
      comment,
      donation_amount,
      user,
      post,
    };
    for (const key in data) {
      dataSend[key] = data[key];
    }
    const result = await this.elAxios.post(`blog/create-post-action/`, data);
    if (result.status !== 202) {
      throw 'Error!';
    }
    return result;
  }
  public async storyActionCreate(like: boolean, comment: string, watched: boolean, source:number, target:number,
    times_wathced: number, data: any){
    const dataSend: any = {
      like,
      comment,
      watched,
      source,
      target,
      times_wathced,
    };
    for (const key in data) {
      dataSend[key] = data[key];
    }
    const result = await this.elAxios.post(`blog/create-story-action/`, data);
    if (result.status !== 202) {
      throw 'Error!';
    }
    return result;
  }
  
  public async attachmentCreate(_file: any, file_type: number, data: any){
    const dataSend: any = {
      _file,
      file_type,
    };
    for (const key in data) {
      dataSend[key] = data[key];
    }
    const result = await this.elAxios.post(`blog/create-attachment/`, data);
    if (result.status !== 202) {
      throw 'Error!';
    }
    return result;
  }

  public async storyCreate(time_to_archive: number, reply_link: string, archived:boolean, user:number, data: any){
    const dataSend: any = {
      time_to_archive,
      reply_link,
      archived,
      user,
    };
    for (const key in data) {
      dataSend[key] = data[key];
    }
    const result = await this.elAxios.post(`blog/create-story/`, data);
    if (result.status !== 202) {
      throw 'Error!';
    }
    return result;
  }

  public async postDelete(id:number){
    const result = await this.elAxios.delete(`blog/delete-post/${id}`);
    if (result.status !== 204) {
      throw 'Error!';
    }
    return result;
  }

  public async postActionDelete(id:number){
    const result = await this.elAxios.delete(`blog/delete-post-action/${id}`);
    if (result.status !== 204) {
      throw 'Error!';
    }
    return result;
  }

  public async storyDelete(id:number){
    const result = await this.elAxios.delete(`blog/delete-post-action/${id}`);
    if (result.status !== 204) {
      throw 'Error!';
    }
    return result;
  }



}
