import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {
  CardType,
  createCardRT,
  createUserT,
  DonationType,
  getUserRT,
  idType,
  PaymentType,
  SubscriptionType,
  userStringType
} from '~/api/types';
import { userAPI } from './../api/userAPI';
import { InferActionsTypes, RootState } from './redux';

const initialState = {};

const authReducer = (state = initialState, action: AllActionsType): InitialStateType => {
  switch (action.type) {
    default:
      return state;
  }
};
const actions = {
  isAuth: () => {
    return {
      type: 'AUTHORIZED'
    } as const;
  }
};

export const createCard = ({ number, date_year, cvc, creator, user }: CardType): Thunk => async (dispatch) => {
  await userAPI.createCard({ number, date_year, cvc, creator, user });
};

export const createDonation = ({ amount, sender, reciever }: DonationType): Thunk => async (dispatch) => {
  await userAPI.createDonation({ amount, sender, reciever });
};

export const createPayment = ({ amount, card }: PaymentType): Thunk => async (dispatch) => {
  await userAPI.createPayment({ amount, card });
};

export const createSubscription = ({ end_date, source, target }: SubscriptionType): Thunk => async (dispatch) => {
  await userAPI.createSubscription({ end_date, source, target });
};

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

export const getUser = (): Thunk => async (dispatch) => {
  await userAPI.getUser({ user: 'root' });
};

export const onlineUserCreate = ({ user }: userStringType): Thunk => async (dispatch) => {
  await userAPI.onlineUserCreate({ user });
};

export const onlineUserRetrieve = (): Thunk => async (dispatch) => {
  await userAPI.onlineUserRetrieve();
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

export const userGetPaymentHistory = (): Thunk => async (dispatch) => {
  await userAPI.userGetPaymentHistory();
};

export const userSubscriptionUpdate = (): Thunk => async (dispatch) => {
  await userAPI.userGetPaymentHistory();
};

export const userValidateUser = (user: number, verified: boolean): Thunk => async (dispatch) => {
  await userAPI.userValidateUser(user, verified);
};

//  Types

type AllActionsType = InferActionsTypes<typeof actions>;

type DispatchType = Dispatch<AllActionsType>;

export type InitialStateType = typeof initialState;

type Thunk = ThunkAction<Promise<void>, RootState, unknown, AllActionsType>;

export default authReducer;
