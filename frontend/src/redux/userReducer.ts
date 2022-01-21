import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { authAPI } from '~/api/authAPI';
import { blogAPI } from '~/api/blogAPI';
import {
  CardType,
  createCardRT,
  createPostActionRT,
  createPostBoughtRT,
  createUserT,
  DonationType,
  getUserRT,
  idType,
  PaymentType,
  userStringType
} from '~/api/types';
import { userAPI } from '../api/userAPI';
import { isLoading, isntLoading } from './blogReducer';
import { InferActionsTypes, RootState } from './redux';

const initialState = {
  subscribtion_price: null as number | null,
  subscribed: false,
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
  posts: [] as Array<any>,
  pay_histtory: [] as Array<any>,
  earn_histtory: [] as Array<any>,
  referal_histtory: [] as Array<any>
};

const authReducer = (state = initialState, action: AllActionsType): InitialStateType => {
  switch (action.type) {
    case 'SET_PROFILE_DATA':
      return {
        ...state,
        ...action.payload
      };
    case 'SET_PAY_HISTORY_DATA':
      return {
        ...state,
        pay_histtory: action.payload
      };
    case 'SET_EARN_HISTORY_DATA':
      return {
        ...state,
        earn_histtory: action.payload
      };
    case 'SET_REFERAL_HISTORY_DATA':
      return {
        ...state,
        referal_histtory: action.payload
      };
    case 'DELETE_POST':
      return {
        ...state,
        posts: state.posts.filter((item) => item.post.pk !== action.payload.id)
      };
    case 'BUY_POST':
      return {
        ...state,
        posts: state.posts.map((item) => {
          if (item.post.pk === action.payload.post_id) {
            return {
              ...item,
              post: { ...item.post, payed: true }
            };
          } else return item;
        })
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
  deletePost: (id: number) => {
    return {
      type: 'DELETE_POST',
      payload: { id, liked: false, favourite: false, post_id: id }
    };
  },
  buyPost: (post_id: number) => {
    return {
      type: 'BUY_POST',
      payload: { post_id, liked: false, favourite: false, id: 10 }
    };
  },
  setPostsData: (post_id: number, liked: boolean | null, id: number | null, favourite: boolean | null) => {
    return {
      type: 'SET_POST_DATA',
      payload: { post_id, liked, id, favourite }
    };
  },
  isAuth: () => {
    return {
      type: 'AUTHORIZED'
    } as const;
  },
  setSpendHistoryData: (data: any) => {
    return {
      type: 'SET_PAY_HISTORY_DATA',
      payload: data
    } as const;
  },
  setEarnHistoryData: (data: any) => {
    return {
      type: 'SET_EARN_HISTORY_DATA',
      payload: data
    } as const;
  },
  setReferalHistoryData: (data: any) => {
    return {
      type: 'SET_REFERAL_HISTORY_DATA',
      payload: data
    } as const;
  },
  setProfileData: (
    subscribtion_price: number | null,
    pk: number | null,
    email: string | null,
    avatar: string | null,
    background_photo: string | null,
    username: string | null,
    first_name: string | null,
    bio: string | null,
    birthday_date: string | null,
    location: string,
    subscribed: boolean,
    message_price: number | null,
    post_amount: number | null,
    fans_amount: number | null,
    ref_link: string | null,
    repheral_users: Array<number>,
    blocked_users: Array<number>,
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
    posts: Array<any>
  ) => {
    return {
      type: 'SET_PROFILE_DATA',
      payload: {
        subscribtion_price,
        pk,
        email,
        avatar,
        background_photo,
        username,
        first_name,
        bio,
        birthday_date,
        location,
        subscribed,
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
        posts
      }
    } as const;
  }
};

export const createPostAction = ({
  like,
  comment,
  donation_amount,
  user,
  post,
  parent
}: createPostActionRT): Thunk => async (dispatch) => {
  const data = await blogAPI.createPostAction({
    like,
    comment,
    donation_amount,
    user,
    post,
    parent,
    date_time: null,
    id: null
  });
  dispatch(actions.setPostsData(post, true, data.id, null));
};

export const deletePostAction = ({ id, post_id }: { id: number; post_id: number }): Thunk => async (dispatch) => {
  await blogAPI.deletePostAction({
    id
  });
  dispatch(actions.setPostsData(post_id, false, null, null));
};

export const updateEmailConfirm = (new_email: string, uid: number): Thunk => async (dispatch) => {
  await authAPI.resetEmailConfirm({ new_email, uid });
};

export const createCard = ({ number, date_year, cvc, creator, user }: CardType): Thunk => async (dispatch) => {
  await userAPI.createCard({ number, date_year, cvc, creator, user });
};

export const deletePost = ({ id }: idType): Thunk => async (dispatch) => {
  const data = await blogAPI.deletePost({
    id
  });
  if (data.status === 204) {
    dispatch(actions.deletePost(id));
  }
};
export const buyPost = ({ user, amount, post }: createPostBoughtRT): Thunk => async (dispatch) => {
  const data = await blogAPI.createPostBought({ user, amount, post, id: null });
  if (data.status === 200) {
    dispatch(actions.buyPost(post));
  }
};

export const createDonation = ({ amount, sender, reciever }: DonationType): Thunk => async (dispatch) => {
  await userAPI.createDonation({ amount, sender, reciever });
};

export const createPayment = ({ amount, card }: PaymentType): Thunk => async (dispatch) => {
  await userAPI.createPayment({ amount, card });
};

// export const createSubscription = ({ end_date, source, target }: SubscriptionType): Thunk => async (dispatch) => {
//   await userAPI.createSubscription({ end_date, source, target });
// };

export const createUser = ({ email, username, password }: createUserT): Thunk => async (dispatch) => {
  await userAPI.createUser({ email, username, password, id: null });
};

export const getCard = ({ id }: idType): Thunk => async (dispatch) => {
  await userAPI.getCard({ id });
};

export const getDonation = ({ id }: idType): Thunk => async (dispatch) => {
  await userAPI.getDonation({ id });
};

export const getPayment = ({ id }: idType): Thunk => async (dispatch) => {
  await userAPI.getPayment({ id });
};

export const getUser = ({ username }: { username: string }): Thunk => async (dispatch) => {
  dispatch(isLoading());
  const data = await userAPI.getUser({ user: username });
  if (data) {
    const {
      subscribtion_price,
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
      ref_link,
      repheral_users,
      blocked_users,
      email_notifications,
      push_notifications,
      hide_online,
      allow_comments,
      show_post_amount,
      subscribed,
      show_fans_amount,
      show_watermark,
      validated_email,
      validated_user,
      credit_amount,
      earned_credits_amount,
      posts
    } = data;
    dispatch(
      actions.setProfileData(
        subscribtion_price,
        pk,
        email,
        avatar,
        background_photo,
        username,
        first_name,
        bio,
        birthday_date,
        location,
        subscribed,
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
        posts
      )
    );
  }
  dispatch(isntLoading());
};

export const onlineUserCreate = ({ user }: userStringType): Thunk => async (dispatch) => {
  await userAPI.onlineUserCreate({ user });
};

export const onlineUserRetrieve = (): Thunk => async (dispatch) => {
  await userAPI.onlineUserRetrieve();
};

export const setFavorite = (postId: number, favourite: boolean): Thunk => async (dispatch) => {
  const data = await blogAPI.setFavorite(postId, favourite);
  dispatch(actions.setPostsData(data.data.post_id, null, null, data.data.favourite));
};

export const onlineUserUpdatePut = ({ user }: userStringType): Thunk => async (dispatch) => {
  await userAPI.onlineUserUpdatePut({ user });
};

export const onlineUserUpdate = ({ user }: userStringType): Thunk => async (dispatch) => {
  await userAPI.onlineUserUpdate({ user });
};

export const particialUpdateCard = ({ number, date_year, cvc, creator, user }: createCardRT): Thunk => async (
  dispatch
) => {
  await userAPI.particialUpdateCard({ number, date_year, cvc, creator, user, id: null });
};

export const particialUpdateuser = (props: getUserRT): Thunk => async (dispatch) => {
  await userAPI.particialUpdateUser(props);
};

export const updateDeleteCard = ({ id }: idType): Thunk => async (dispatch) => {
  await userAPI.updateDeleteCard({ id });
};

export const updateDeleteCardPut = (props: createCardRT): Thunk => async (dispatch) => {
  await userAPI.updateDeleteCardPut(props);
};

export const updateDeleteCardPatch = (props: createCardRT): Thunk => async (dispatch) => {
  await userAPI.updateDeleteCardPatch(props);
};

export const updateDeleteCardDelete = ({ id }: idType): Thunk => async (dispatch) => {
  await userAPI.updateDeleteCardDelete({ id });
};

export const updateDeleteUser = (): Thunk => async (dispatch) => {
  await userAPI.updateDeleteUser();
};

export const updateDeleteUserPut = ({ email, username, password }: createUserT): Thunk => async (dispatch) => {
  await userAPI.updateDeleteUserPut({ email, username, password, id: null });
};

export const updateDeleteUserPatch = ({ email, username, password }: createUserT): Thunk => async (dispatch) => {
  await userAPI.updateDeleteUserPatch({ email, username, password, id: null });
};

export const updateDeleteUserDelete = (): Thunk => async (dispatch) => {
  await userAPI.updateDeleteUserDelete();
};

export const userCardList = (): Thunk => async (dispatch) => {
  await userAPI.userGetCardList();
};

export const userDonationRecieved = (): Thunk => async (dispatch) => {
  await userAPI.userDonationRecieved();
};

export const userDonationSended = (): Thunk => async (dispatch) => {
  await userAPI.userDonationSended();
};

export const userGetReferralHistory = (): Thunk => async (dispatch) => {
  dispatch(isLoading());
  const data = await userAPI.userGetReferralHistory();
  dispatch(actions.setReferalHistoryData(data.data));
  dispatch(isntLoading());
};

export const userGetSpendHistory = (): Thunk => async (dispatch) => {
  dispatch(isLoading());
  const data = await userAPI.userGetSpendHistory();
  dispatch(actions.setSpendHistoryData(data.data));
  dispatch(isntLoading());
};

export const userGetEarnHistory = (): Thunk => async (dispatch) => {
  dispatch(isLoading());
  const data = await userAPI.userGetEarnHistory();
  dispatch(actions.setEarnHistoryData(data.data));
  dispatch(isntLoading());
};

export const userGetPaymentHistory = (): Thunk => async (dispatch) => {
  await userAPI.userGetPaymentHistory();
};

export const userSubscriptionUpdate = (): Thunk => async (dispatch) => {
  await userAPI.userGetPaymentHistory();
};

export const userValidateUser = (user: number, verified: boolean): Thunk => async (dispatch) => {
  await userAPI.userValidateUser(user, verified);
};

export const changePassword = (user: number, verified: boolean): Thunk => async (dispatch) => {
  await userAPI.userValidateUser(user, verified);
};

//  Types

type AllActionsType = InferActionsTypes<typeof actions>;

type DispatchType = Dispatch<AllActionsType>;

export type InitialStateType = typeof initialState;

type Thunk = ThunkAction<Promise<void>, RootState, unknown, AllActionsType>;

export default authReducer;
