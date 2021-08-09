import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { InferActionsTypes, RootState } from './redux';

const initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
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
  setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => {
    return {
      type: 'SET_USER_DATA',
      payload: { userId, email, login, isAuth }
    } as const;
  },

  isAuth: () => {
    return {
      type: 'AUTHORIZED'
    } as const;
  }
};

// export const getAuthUserData = (): Thunk => async (dispatch) => {
//   const meData = await authAPI.me();
//   if (meData.resultCode === 0) {
//     const { id, login, email } = meData.data;
//     dispatch(actions.setAuthUserData(id, email, login, true));
//     dispatch(actions.isAuth());
//   }
// };

// export const login = (email: string, password: string, rememberMe: boolean): Thunk => async (dispatch) => {
//   const response = await authAPI.login(email, password, rememberMe);
//   if (response.data.resultCode === 0) {
//     dispatch(getAuthUserData());
//   } else if (response.data.resultCode !== 0) {
//     const message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
//     dispatch(stopSubmit('login', { _error: message }));
//   }
// };

// export const logout = (): Thunk => async (dispatch) => {
//   const response = await authAPI.logout();
//   if (response.data.resultCode === 0) {
//     dispatch(actions.setAuthUserData(null, null, null, false));
//     dispatch(getAuthUserData());
//   }
// };

//  Types

type AllActionsType = InferActionsTypes<typeof actions>;

type DispatchType = Dispatch<AllActionsType>;

export type InitialStateType = typeof initialState;

type Thunk = ThunkAction<Promise<void>, RootState, unknown, AllActionsType>;

export default authReducer;
