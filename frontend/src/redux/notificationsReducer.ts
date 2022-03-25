import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { blogAPI } from '../api/blogAPI';
import { InferActionsTypes, RootState } from './redux';

const initialState = {
  notifications: [
    {
      user: {
        pk: null as number | null,
        username: null as string | null,
        avatar: null as string | null,
        first_name: null as string | null,
        background_photo: null as string | null,
        subscription_price: null as number | null
      },
      type: null as string | null,
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
  isLoading: false
};
const notificationsReducer = (state = initialState, action: AllActionsType): InitialStateType => {
  switch (action.type) {
    case 'GET_NOTIFICATIONS':
      return {
        ...state,
        notifications: action.data
      };
    case 'UPDATE_NOTIFICATIONS':
      return {
        ...state,
        notifications: [...state.notifications, ...action.data]
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
  setNotificationsData: (data: any) => {
    return {
      type: 'GET_NOTIFICATIONS',
      data: data
    } as const;
  },
  updateNotificationsData: (data: any) => {
    return {
      type: 'UPDATE_NOTIFICATIONS',
      data: data
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

export const getNotifications = (): Thunk => async (dispatch) => {
  dispatch(actions.isLoading());
  const notificationsData = await blogAPI.getNotifications({ limit: 10, offset: 0 });
  dispatch(actions.setNotificationsData(notificationsData.data));
  dispatch(actions.isntLoading());
};


export const updateNotifications = ({ offset }: { offset: number }): Thunk => async (dispatch) => {
  // dispatch(actions.isLoading());
  const notificationsData = await blogAPI.getNotifications({ limit: 10, offset });
  dispatch(actions.updateNotificationsData(notificationsData.data));
  // dispatch(actions.isntLoading());
};

//  Types

type AllActionsType = InferActionsTypes<typeof actions>;

type DispatchType = Dispatch<AllActionsType>;

export type InitialStateType = typeof initialState;

type Thunk = ThunkAction<Promise<void>, RootState, unknown, AllActionsType>;

export default notificationsReducer;
