import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { createPostActionRT, createPostBoughtRT, createStoryActionRT, createStoryRT, idType } from '../api/types';
import { blogAPI } from './../api/blogAPI';
import { InferActionsTypes, RootState } from './redux';

const initialState = {
  post: {
    user: {
      pk: null as number | null,
      username: null as string | null,
      avatar: null as string | null,
      first_name: null as string | null,
      background_photo: null as string | null
    },
    id: null as number | null,
    favourites: [
      {
        pk: null as number | null,
        username: null as string | null,
        avatar: null as string | null,
        first_name: null as string | null,
        background_photo: null as string | null
      }
    ],
    publication_date: null as string | null,
    comments: null as string | null,
    likes_amount: null as any,
    comments_amount: null as string | null,
    favourites_amount: null as string | null,
    attachments: [{ id: null as number | null, _file: null as string | null, file_type: null as number | null }],
    reply_link: null as string | null,
    name: null as string,
    description: null as string | null,
    price_to_watch: null as number | null,
    enabled_comments: false,
    access_level: null as number | null,
    archived: false,
    like_id: null as number | null,
    liked: false,
    favourite: false
  },
  posts: [
    {
      user: {
        pk: null as number | null,
        username: null as string | null,
        avatar: null as string | null,
        first_name: null as string | null,
        background_photo: null as string | null
      },
      post: {
        pk: null as number | null,
        favourites: [
          {
            pk: null as number | null,
            username: null as string | null,
            avatar: null as string | null,
            first_name: null as string | null,
            background_photo: null as string | null
          }
        ],
        publication_date: null as string | null,
        comments: [] as Array<any> | null,
        likes_amount: null as any,
        comments_amount: null as string | null,
        favourites_amount: null as string | null,
        attachments: [{ id: null as number | null, _file: null as string | null, file_type: null as number | null }],
        reply_link: null as string | null,
        name: null as string,
        description: null as string | null,
        price_to_watch: null as number | null,
        enabled_comments: false,
        access_level: null as number | null,
        archived: false,
        like_id: null as number | null,
        liked: false,
        favourite: false
      }
    }
  ],
  recommendations: [
    {
      pk: null as number | null,
      username: null as string | null,
      avatar: null as string | null,
      first_name: null as string | null,
      background_photo: null as string | null,
      subscription_price: null as number | null
    }
  ],
  stories: [{}],
  isLoading: false,
  isPostLoading: false
};

const blogReducer = (state = initialState, action: AllActionsType): InitialStateType => {
  switch (action.type) {
    case 'SET_MAIN_PAGE_DATA':
      return {
        ...state,
        ...action.payload
      };
    case 'IS_LOADING':
      return {
        ...state,
        isLoading: true
      };
    case 'ISNT_LOADING':
      return {
        ...state,
        isLoading: false
      };
    case 'SET_POST_LOADING':
      return {
        ...state,
        isPostLoading: action.payload
      };
    case 'SET_POSTS_DATA':
      return {
        ...state,
        posts: state.posts.map((item) => {
          if (item.post.pk === action.payload.post_id && action.payload.favourite !== null) {
            return {
              ...item,
              post: { ...item.post, favourite: action.payload.favourite }
            };
          } else if (item.post.pk === action.payload.post_id && action.payload.liked === false) {
            return {
              ...item,
              post: { ...item.post, liked: false, likes_amount: Number(item.post.likes_amount) - 1 }
            };
          } else if (item.post.pk === action.payload.post_id && action.payload.liked) {
            return {
              ...item,
              post: {
                ...item.post,
                liked: true,
                likes_amount: Number(item.post.likes_amount) + 1,
                like_id: action.payload.id
              }
            };
          } else return item;
        })
      };
    case 'SET_POST':
      return {
        ...state,
        post: action.payload
      };
    case 'SET_POST_DATA':
      if (action.payload.liked && action.payload.favourite === null) {
        return {
          ...state,
          post: {
            ...state.post,
            liked: true,
            like_id: action.payload.id,
            likes_amount: state.post.likes_amount + 1
          }
        };
      } else if (action.payload.favourite !== null) {
        return {
          ...state,
          post: {
            ...state.post,
            favourite: action.payload.favourite
          }
        };
      } else {
        return {
          ...state,
          post: {
            ...state.post,
            liked: false,
            like_id: action.payload.id,
            likes_amount: state.post.likes_amount - 1
          }
        };
      }
    default:
      return state;
  }
};
const actions = {
  setMainPageData: (posts: any, recommendations: any, stories: any) => {
    return {
      type: 'SET_MAIN_PAGE_DATA',
      payload: { posts, recommendations, stories }
    } as const;
  },
  isLoading: () => {
    return {
      type: 'IS_LOADING'
    } as const;
  },
  isntLoading: () => {
    return {
      type: 'ISNT_LOADING'
    } as const;
  },
  setPostData: (liked: boolean | null, id: number | null, favourite: boolean | null) => {
    return {
      type: 'SET_POST_DATA',
      payload: { liked, id, favourite }
    };
  },
  setPostsData: (post_id: number, liked: boolean | null, id: number | null, favourite: boolean | null) => {
    return {
      type: 'SET_POSTS_DATA',
      payload: { post_id, liked, id, favourite }
    };
  },
  setPost: (post: any) => {
    return {
      type: 'SET_POST',
      payload: post
    };
  },
  setPostLoading: (isLoading: boolean) => {
    return {
      type: 'SET_POST_LOADING',
      payload: isLoading
    };
  }
};

export const isLoading = (): Thunk => async (dispatch) => {
  dispatch(actions.isLoading());
};

export const isntLoading = (): Thunk => async (dispatch) => {
  dispatch(actions.isntLoading());
};

export const getMainPageData = (): Thunk => async (dispatch) => {
  dispatch(actions.isLoading());
  const mainPageData = await blogAPI.getMainPage({ limit: 10, offset: 10 });
  if (mainPageData.data) {
    const posts = mainPageData.data.posts;
    const recommendations = mainPageData.data.recommendations[0];
    const stories = [{}];
    dispatch(actions.setMainPageData(posts, recommendations, stories));
    dispatch(actions.isntLoading());
  } else {
    dispatch(actions.isntLoading());
  }
};

export const setFavoritePostModal =
  (postId: number, favourite: boolean): Thunk =>
  async (dispatch) => {
    const data = await blogAPI.setFavorite(postId, favourite);
    dispatch(actions.setPostData(null, null, data.data.favourite));
  };

export const setFavorite =
  (postId: number, favourite: boolean): Thunk =>
  async (dispatch) => {
    const data = await blogAPI.setFavorite(postId, favourite);
    dispatch(actions.setPostsData(data.data.post_id, null, null, data.data.favourite));
  };

export const createPostActionModal =
  ({ like, comment, donation_amount, user, parent, post }: createPostActionRT): Thunk =>
  async (dispatch) => {
    const data = await blogAPI.createPostAction({
      like,
      comment,
      parent,
      donation_amount,
      user,
      post,
      date_time: null,
      id: null
    });
    dispatch(actions.setPostData(true, data.id, null));
  };

export const createPostAction =
  ({ like, comment, donation_amount, user, post, parent }: createPostActionRT): Thunk =>
  async (dispatch) => {
    const data = await blogAPI.createPostAction({
      like,
      comment,
      donation_amount,
      user,
      parent,
      post,
      date_time: null,
      id: null
    });
    dispatch(actions.setPostsData(post, true, data.id, null));
  };

export const createPostBought =
  ({ user, amount, post }: createPostBoughtRT): Thunk =>
  async (dispatch) => {
    await blogAPI.createPostBought({ user, amount, post, id: null });
  };

export const createPost =
  (props: any): Thunk =>
  async (dispatch) => {
    const attachmentsID = [];
    for (let i = 0; i < props.attachments.length; i++) {
      const data = await blogAPI.createAttachment(props.attachments[i]);
      attachmentsID.push(data.data.id);
    }
    props.attachments = attachmentsID;
    await blogAPI.createPost(props);
  };

export const createStoryAction =
  ({ comment, like, watched, time_watched, source, target }: createStoryActionRT): Thunk =>
  async (dispatch) => {
    await blogAPI.createStoryAction({
      comment,
      like,
      watched,
      time_watched,
      source,
      target,
      id: null,
      datetime: null
    });
  };

export const createStory =
  ({ time_to_archive, reply_link, archived, user }: createStoryRT): Thunk =>
  async (dispatch) => {
    await blogAPI.createStory({
      time_to_archive,
      reply_link,
      archived,
      user,
      id: null,
      story: null,
      watched_story: null
    });
  };

export const deletePostActionModal =
  ({ id, post_id }: { id: number; post_id: number }): Thunk =>
  async (dispatch) => {
    await blogAPI.deletePostAction({
      id
    });
    dispatch(actions.setPostData(false, null, null));
  };

export const deletePostAction =
  ({ id, post_id }: { id: number; post_id: number }): Thunk =>
  async (dispatch) => {
    await blogAPI.deletePostAction({
      id
    });
    dispatch(actions.setPostsData(post_id, false, null, null));
  };

export const deleteStoryGet =
  ({ id }: idType): Thunk =>
  async (dispatch) => {
    // Дичь полная
    await blogAPI.deleteStoryGet({
      id
    });
  };

export const deleteStory =
  ({ id }: idType): Thunk =>
  async (dispatch) => {
    await blogAPI.deleteStoryDelete({
      id
    });
  };

export const getPostActionList = async ({ id }: idType) => {
  const data = await blogAPI.getPostActionList({
    id
  });
  return data;
};

export const getPostList =
  ({ username }: { username: string }): Thunk =>
  async (dispatch) => {
    await blogAPI.getPostList({
      username
    });
  };

export const getPost =
  ({ id }: { id: number | null }): Thunk =>
  async (dispatch) => {
    if (id === null) dispatch(actions.setPost(null));
    dispatch(actions.setPostLoading(true));
    const data = await blogAPI.getPost({
      id
    });
    dispatch(actions.setPost(data.data));
    dispatch(actions.setPostLoading(false));
  };

export const getStoryAction =
  ({ id }: idType): Thunk =>
  async (dispatch) => {
    await blogAPI.getStoryAction({
      id
    });
  };

export const getStoryList = (): Thunk => async (dispatch) => {
  await blogAPI.getStoryList();
};

export const getUserStories =
  ({ limit = 10, offset = 10 }: { limit: number; offset: number }): Thunk =>
  async () => {
    await blogAPI.getUserStories({ limit, offset });
  };

//  Types

type AllActionsType = InferActionsTypes<typeof actions>;

type DispatchType = Dispatch<AllActionsType>;

export type InitialStateType = typeof initialState;

type Thunk = ThunkAction<Promise<void>, RootState, unknown, AllActionsType>;

export default blogReducer;
