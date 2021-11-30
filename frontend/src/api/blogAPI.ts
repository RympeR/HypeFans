import { instance } from './api';
import {
  createAttachmentRT,
  createPostActionRT,
  createPostBoughtRT,
  createStoryActionRT,
  createStoryRT,
  deleteStoryRT,
  getMainPageRT,
  idType,
  PostType
} from './types';

export const blogAPI = {
  setFavorite(post_id: number, favourite: boolean) {
    return instance.put('/blog/mark-favourite/', { post_id: post_id, favourite: favourite }).then((res) => {
      return res;
    });
  },
  createAttachment(file: any) {
    if (!file) return;
    const formData = new FormData();
    formData.append('_file', file);
    formData.append('file_type', '3');
    return instance
      .post<createAttachmentRT>('/blog/create-attachment/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => {
        return response;
      });
  },
  createPostAction({ like, comment, donation_amount, user, post, parent }: createPostActionRT) {
    if (comment === null) {
      return instance
        .post<createPostActionRT>('/blog/create-post-action/', { like, comment, donation_amount, user, post, parent })
        .then((response) => {
          return response.data;
        });
    } else {
      return instance
        .post<createPostActionRT>('/blog/create-post-action/', { comment, user, post, donation_amount: 0, parent })
        .then((response) => {
          return response.data;
        });
    }
  },
  createPostBought({ user, amount, post }: createPostBoughtRT) {
    return instance
      .post<createPostBoughtRT>('//blog/create-post-bought//', { user, amount, post })
      .then((response) => {
        return response;
      });
  },
  createPost(props: PostType) {
    return instance
      .post<PostType>('/blog/create-post/', { ...props })
      .then((response) => {
        return response;
      });
  },
  createStoryAction({ comment, like, watched, time_watched, source, target }: createStoryActionRT) {
    return instance
      .post<createStoryActionRT>('/blog/create-story-action/', { comment, like, watched, time_watched, source, target })
      .then((response) => {
        return response;
      });
  },
  createStory({ time_to_archive, reply_link, archived, user }: createStoryRT) {
    return instance
      .post<createStoryRT>('/blog/create-story/', { time_to_archive, reply_link, archived, user })
      .then((response) => {
        return response;
      });
  },
  deletePostAction({ id }: idType) {
    return instance.delete(`/blog/delete-post-action/${id}`).then((response) => {
      return response;
    });
  },
  deletePost({ id }: idType) {
    return instance.delete(`/blog/delete-post/${id}`).then((response) => {
      return response;
    });
  },
  deleteStoryGet({ id }: idType) {
    return instance.get<deleteStoryRT>(`/blog/delete-story/${id}`).then((response) => {
      return response;
    });
  },
  deleteStoryDelete({ id }: idType) {
    return instance.delete(`/blog/delete-story/${id}`).then((response) => {
      return response;
    });
  },
  getMainPage({ limit = 10, offset = 10 }: { limit: number; offset: number }) {
    return instance.get<getMainPageRT>(`/blog/get-main-page/`).then((response) => {
      return response;
    });
  },
  getFavourites({ limit = 10, offset = 10 }: { limit: number; offset: number }) {
    return instance.get('/blog/get-favourite-posts/').then((response) => {
      return response;
    });
  },
  getNotifications({ limit = 10, offset = 10 }: { limit: number; offset: number }) {
    return instance.get(`/blog/get-notifications/`).then((response) => {
      return response;
    });
  },
  getPostActionList({ id }: idType) {
    return instance.get(`/blog/get-post-action-list/${id}`).then((response) => {
      return response;
    });
  },
  getPostList({ username }: { username: string }) {
    return instance.get(`/blog​/get-post-list​/${username}`).then((response) => {
      return response;
    });
  },
  getPost({ id }: idType) {
    return instance.get(`/blog/get-post/${id}`).then((response) => {
      return response;
    });
  },
  getStoryAction({ id }: idType) {
    return instance
      .get(
        `
        /blog/get-story-action/${id}`
      )
      .then((response) => {
        return response;
      });
  },
  getStoryList() {
    return instance
      .get(
        `
        /blog/get-story-action`
      )
      .then((response) => {
        return response;
      });
  },
  getUserStories({ limit = 10, offset = 10 }: { limit: number; offset: number }) {
    return instance.get(`/blog/get-user-stories/`).then((response) => {
      return response;
    });
  }
};
