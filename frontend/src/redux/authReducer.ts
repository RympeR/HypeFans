import { ThunkAction } from "redux-thunk";
import { authAPI } from "../api/authAPI";
import { userAPI } from "../api/userAPI";
import { isLoading, isntLoading } from "./blogReducer";
import { InferActionsTypes, RootState } from "./redux";

const initialState = {
  subscribtion_price: null as number | null,
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
  ref_link: null as string | null,
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
  isAuth: false,
  isSettingsDisabled: false,
  wallet: null as string | null
};

const authReducer = (
  state = initialState,
  action: AllActionsType
): InitialStateType => {
  switch (action.type) {
    case "SET_USER_DATA":
      return {
        ...state,
        ...action.payload,
      };

    case "AUTHORIZED":
      return {
        ...state,
        isAuth: true,
      };

    case "ISNT_SETTINGS_DISABLED":
      return {
        ...state,
        isSettingsDisabled: false,
      };
    case "IS_SETTINGS_DISABLED":
      return {
        ...state,
        isSettingsDisabled: true,
      };
    default:
      return state;
  }
};
const actions = {
  setAuthUserData: (
    subscribtion_price: number | null,
    pk: number | null,
    cards: any,
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
    ref_link: string | null,
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
    isAuth: boolean,
    wallet: string | null
  ) => {
    return {
      type: "SET_USER_DATA",
      payload: {
        subscribtion_price,
        pk,
        cards,
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
        ref_link,
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
        isAuth,
        wallet
      },
    } as const;
  },

  isAuth: () => {
    return {
      type: "AUTHORIZED",
    } as const;
  },
  isSettingsDisabled: () => {
    return {
      type: "IS_SETTINGS_DISABLED",
    } as const;
  },
  isntSettingsDisabled: () => {
    return {
      type: "ISNT_SETTINGS_DISABLED",
    } as const;
  },
};

export const getAuthUserData = (): Thunk => async (dispatch) => {
  dispatch(isLoading());
  const meData = await userAPI.getProfile();
  if (meData) {
    const {
      subscribtion_price,
      pk,
      cards,
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
      ref_link,
      repheral_users,
      blocked_users,
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
      wallet
    } = meData;
    dispatch(
      actions.setAuthUserData(
        subscribtion_price,
        pk,
        cards,
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
        ref_link,
        repheral_users,
        blocked_users,
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
        true,
        wallet
      )
    );
    dispatch(actions.isAuth());
    dispatch(isntLoading());
  }
};

export const logout = (): Thunk => async (dispatch) => {
  await authAPI.logout();
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
      false,
      null
    )
  );
};

export const login =
  ({ email, password }: { email: string; password: string }): Thunk =>
    async (dispatch) => {
      // dispatch(isLoading());
      const response = await authAPI.login(email, password);
      if (response) {
        await authAPI.meGetLogin();
        dispatch(getAuthUserData());
      }
      // dispatch(isntLoading());
    };

export const isntSettingsDisabled = (): Thunk => async (dispatch) => {
  dispatch(actions.isntSettingsDisabled());
};
export const isSettingsDisabled = (): Thunk => async (dispatch) => {
  dispatch(actions.isSettingsDisabled());
};

export const changeSettings =
  (obj: any): Thunk =>
    async (dispatch) => {
      delete obj.avatar;
      delete obj.background_photo;
      delete obj.ref_link;
      dispatch(isSettingsDisabled());
      const response = await authAPI.meUpdate(obj);
      await authAPI.meGet();
      if (response) {
        dispatch(getAuthUserData());
      }
      dispatch(isntSettingsDisabled());
    };

export const changeAvatar =
  (obj: any): Thunk =>
    async (dispatch) => {
      dispatch(isSettingsDisabled());
      const response = await authAPI.meUpdate(obj);
      await authAPI.meGet();
      if (response) {
        dispatch(getAuthUserData());
      }
      dispatch(isntSettingsDisabled());
    };

export const changeBackground =
  (obj: any): Thunk =>
    async (dispatch) => {
      dispatch(isSettingsDisabled());
      const response = await authAPI.meUpdate(obj);
      await authAPI.meGet();
      if (response) {
        dispatch(getAuthUserData());
      }
      dispatch(isntSettingsDisabled());
    };

export const getUserData = (): Thunk => async (dispatch) => {
  dispatch(isLoading());
  await authAPI.meGet();
  await dispatch(getAuthUserData());
  dispatch(isntLoading());
};

//  Types

type AllActionsType = InferActionsTypes<typeof actions>;

// type DispatchType = Dispatch<AllActionsType>;

export type InitialStateType = typeof initialState;

type Thunk = ThunkAction<Promise<void>, RootState, unknown, AllActionsType>;

export default authReducer;
