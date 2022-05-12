import { Dispatch } from 'react';
import { ThunkAction } from 'redux-thunk';
import { blogAPI } from '../api/blogAPI';
import { createPostActionRT } from '../api/types';
import { isLoading, isntLoading } from './blogReducer';
import { InferActionsTypes, RootState } from './redux';

const initialState = {
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
      }
    }
  ]
};

const favouritesReducer = (state = initialState, action: AllActionsType): InitialStateType => {
  switch (action.type) {
    case 'SET_FAVOURITES_DATA':
      return {
        ...state,
        posts: action.payload
      };
    case 'SET_POST_DATA':
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
    default:
      return state;
  }
};
const actions = {
  setPostsData: (post_id: number, liked: boolean | null, id: number | null, favourite: boolean | null) => {
    return {
      type: 'SET_POST_DATA',
      payload: { post_id, liked, id, favourite }
    };
  },
  setFavouritesData: (posts: any) => {
    return {
      type: 'SET_FAVOURITES_DATA',
      payload: posts
    } as const;
  }
};

export const getFavourites = (): Thunk => async (dispatch) => {
  dispatch(isLoading());
  const data = await blogAPI.getFavourites({ limit: 10, offset: 0 });
  dispatch(actions.setFavouritesData(data.data));
  dispatch(isntLoading());
};

export const createPostAction =
  ({ like, comment, donation_amount, user, post, parent }: createPostActionRT): Thunk =>
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
    dispatch(actions.setPostsData(post, true, data.id, null));
  };

export const setFavorite =
  (postId: number, favourite: boolean): Thunk =>
  async (dispatch) => {
    const data = await blogAPI.setFavorite(postId, favourite);
    dispatch(actions.setPostsData(data.data.post_id, null, null, data.data.favourite));
  };

export const deletePostAction =
  ({ id, post_id }: { id: number; post_id: number }): Thunk =>
  async (dispatch) => {
    await blogAPI.deletePostAction({
      id
    });
    dispatch(actions.setPostsData(post_id, false, null, null));
  };

//  Types

type AllActionsType = InferActionsTypes<typeof actions>;

type DispatchType = Dispatch<AllActionsType>;

export type InitialStateType = typeof initialState;

type Thunk = ThunkAction<Promise<void>, RootState, unknown, AllActionsType>;

export default favouritesReducer;
