import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { authAPI } from '~/api/authAPI';
import { InferActionsTypes, RootState } from './redux';

const initialState = {
  pk: null as number | null,
  email: null as string | null,
  avatar: null as string | null,
  background_photo: null as string | null,
  username: null as string | null,
  first_name: null as string | null,
  bio: null as string | null,
  birthday_date: null as string | null,
  location: null as string,
  message_price: null as number | null,
  post_amount: null as number | null,
  fans_amount: null as number | null,
  repheral_link: null as number | null,
  repheral_users: [] as Array<number>,
  blocked_users: [] as Array<number>,
  email_notifications: false,
  push_notifications: false,
  hide_online: false,
  allow_comments: false,
  show_post_amount: false,
  show_fans_amount: false,
  show_watermark: false,
  validated_email: false,
  validated_user: false,
  credit_amount: null as number | null,
  earned_credits_amount: null as number | null,
  isAuth: false
};

const authReducer = (state = initialState, action: AllActionsType): InitialStateType => {
  switch (action.type) {
    case 'SET_USER_DATA':
      return {
        ...state,
        ...action.payload
      };

    case 'AUTHORIZED':
      return {
        ...state,
        isAuth: true
      };
    default:
      return state;
  }
};
const actions = {
  setAuthUserData: (
    pk: number | null,
    email: string | null,
    avatar: string | null,
    background_photo: string | null,
    username: string | null,
    first_name: string | null,
    bio: string | null,
    birthday_date: string | null,
    location: string,
    message_price: number | null,
    post_amount: number | null,
    fans_amount: number | null,
    repheral_link: number | null,
    repheral_user: Array<number>,
    blocked_user: Array<number>,
    email_notifications: boolean,
    push_notifications: boolean,
    hide_online: boolean,
    allow_comments: boolean,
    show_post_amount: boolean,
    show_fans_amount: boolean,
    show_watermark: boolean,
    validated_email: boolean,
    validated_user: boolean,
    credit_amount: number | null,
    earned_credits_amount: number | null,
    isAuth: boolean
  ) => {
    return {
      type: 'SET_USER_DATA',
      payload: {
        pk,
        email,
        avatar,
        background_photo,
        username,
        first_name,
        bio,
        birthday_date,
        location,
        message_price,
        post_amount,
        fans_amount,
        repheral_link,
        repheral_user,
        blocked_user,
        email_notifications,
        push_notifications,
        hide_online,
        allow_comments,
        show_post_amount,
        show_fans_amount,
        show_watermark,
        validated_email,
        validated_user,
        credit_amount,
        earned_credits_amount,
        isAuth
      }
    } as const;
  },

  isAuth: () => {
    return {
      type: 'AUTHORIZED'
    } as const;
  }
};

export const getAuthUserData = (): Thunk => async (dispatch) => {
  const meData = await authAPI.meGet();
  if (meData.status) {
    const {
      pk,
      email,
      avatar,
      background_photo,
      username,
      first_name,
      bio,
      birthday_date,
      location,
      message_price,
      post_amount,
      fans_amount,
      repheral_link,
      repheral_user,
      blocked_user,
      email_notifications,
      push_notifications,
      hide_online,
      allow_comments,
      show_post_amount,
      show_fans_amount,
      show_watermark,
      validated_email,
      validated_user,
      credit_amount,
      earned_credits_amount
    } = meData.data;
    dispatch(
      actions.setAuthUserData(
        pk,
        email,
        avatar,
        background_photo,
        username,
        first_name,
        bio,
        birthday_date,
        location,
        message_price,
        post_amount,
        fans_amount,
        repheral_link,
        repheral_user,
        blocked_user,
        email_notifications,
        push_notifications,
        hide_online,
        allow_comments,
        show_post_amount,
        show_fans_amount,
        show_watermark,
        validated_email,
        validated_user,
        credit_amount,
        earned_credits_amount,
        true
      )
    );
    dispatch(actions.isAuth());
  }
};

// export const login = (email: string, password: string, rememberMe: boolean): Thunk => async (dispatch) => {
//   const response = await authAPI.login(email, password, rememberMe);
//   if (response.data.resultCode === 0) {
//     dispatch(getAuthUserData());
//   } else if (response.data.resultCode !== 0) {
//     const message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
//     dispatch(stopSubmit('login', { _error: message }));
//   }
// };

export const logout = (): Thunk => async (dispatch) => {
  const response = await authAPI.logout();
  if (response.data.resultCode === 0) {
    dispatch(
      actions.setAuthUserData(
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        [],
        [],
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        null,
        null,
        false
      )
    );
    dispatch(getAuthUserData());
  }
};

//  Types

type AllActionsType = InferActionsTypes<typeof actions>;

type DispatchType = Dispatch<AllActionsType>;

export type InitialStateType = typeof initialState;

type Thunk = ThunkAction<Promise<void>, RootState, unknown, AllActionsType>;

export default authReducer;
