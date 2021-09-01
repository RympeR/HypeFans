import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {
  createPostActionRT,
  createPostBoughtRT,
  createStoryActionRT,
  createStoryRT,
  idType,
  PostType
} from '~/api/types';
import { blogAPI } from './../api/blogAPI';
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
        likes_amount: null as string | null,
        comments_amount: null as string | null,
        favourites_amount: null as string | null,
        attachments: [{ id: null as number | null, _file: null as string | null, file_type: null as number | null }],
        reply_link: null as string | null,
        name: null as string,
        description: null as string | null,
        price_to_watch: null as number | null,
        enabled_comments: false,
        access_level: null as number | null,
        archived: false
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
  isLoading: false
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
  }
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
  }
  dispatch(actions.isntLoading());
};

export const createPostAction = ({ like, comment, donation_amount, user, post }: createPostActionRT): Thunk => async (
  dispatch
) => {
  await blogAPI.createPostAction({ like, comment, donation_amount, user, post, date_time: null });
};

export const createPostBought = ({ user, amount, post }: createPostBoughtRT): Thunk => async (dispatch) => {
  await blogAPI.createPostBought({ user, amount, post, id: null });
};

export const createPost = (props: PostType): Thunk => async (dispatch) => {
  const attachmentsID = [];
  for (let i = 0; i < props.attachments.length; i++) {
    const data = await blogAPI.createAttachment(props.attachments[i]);
    attachmentsID.push(data.data.id);
  }
  props.attachments = attachmentsID;
  await blogAPI.createPost(props);
};

export const createStoryAction = ({
  comment,
  like,
  watched,
  time_watched,
  source,
  target
}: createStoryActionRT): Thunk => async (dispatch) => {
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

export const createStory = ({ time_to_archive, reply_link, archived, user }: createStoryRT): Thunk => async (
  dispatch
) => {
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

export const deletePostAction = ({ id }: idType): Thunk => async (dispatch) => {
  await blogAPI.deletePostAction({
    id
  });
};

export const deletePost = ({ id }: idType): Thunk => async (dispatch) => {
  await blogAPI.deletePost({
    id
  });
};

export const deleteStoryGet = ({ id }: idType): Thunk => async (dispatch) => {
  // Дичь полная
  await blogAPI.deleteStoryGet({
    id
  });
};

export const deleteStory = ({ id }: idType): Thunk => async (dispatch) => {
  await blogAPI.deleteStoryDelete({
    id
  });
};

export const getPostActionList = ({ id }: idType): Thunk => async (dispatch) => {
  await blogAPI.getPostActionList({
    id
  });
};

export const getPostList = ({ username }: { username: string }): Thunk => async (dispatch) => {
  await blogAPI.getPostList({
    username
  });
};

export const getPost = ({ id }: idType): Thunk => async (dispatch) => {
  await blogAPI.getPost({
    id
  });
};

export const getStoryAction = ({ id }: idType): Thunk => async (dispatch) => {
  await blogAPI.getStoryAction({
    id
  });
};

export const getStoryList = (): Thunk => async (dispatch) => {
  await blogAPI.getStoryList();
};

export const getUserStories = ({ limit = 10, offset = 10 }: { limit: number; offset: number }): Thunk => async (
  dispatch
) => {
  await blogAPI.getUserStories({ limit, offset });
};

//  Types

type AllActionsType = InferActionsTypes<typeof actions>;

type DispatchType = Dispatch<AllActionsType>;

export type InitialStateType = typeof initialState;

type Thunk = ThunkAction<Promise<void>, RootState, unknown, AllActionsType>;

export default blogReducer;
