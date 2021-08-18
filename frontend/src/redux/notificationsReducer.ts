import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { InferActionsTypes, RootState } from './redux';

const initialState = {};

const authReducer = (state = initialState, action: AllActionsType): InitialStateType => {
  switch (action.type) {
    case 'GET_NOTIFICATIONS':
      return {
        ...state,
        ...action.data
      };
    default:
      return state;
  }
};
const actions = {
  getNotifications: () => {
    return {
      type: 'GET_NOTIFICATIONS',
      data: {
        lll: 'ddas'
      }
    } as const;
  }
};

//  Types

type AllActionsType = InferActionsTypes<typeof actions>;

type DispatchType = Dispatch<AllActionsType>;

export type InitialStateType = typeof initialState;

type Thunk = ThunkAction<Promise<void>, RootState, unknown, AllActionsType>;

export default authReducer;
