import { ThunkAction } from "redux-thunk";
import { blogAPI } from "../api/blogAPI";
import { createPostActionRT } from "../api/types";
import { isLoading, isntLoading, setPaginationLoading } from "./blogReducer";
import { InferActionsTypes, RootState } from "./redux";

const initialState = {
    activationCode: null as string | null,
    email: null as string | null
};

const registerReducer = (
    state = initialState,
    action: AllActionsType
): InitialStateType => {
    switch (action.type) {
        case "SET_EMAIL":
            return {
                ...state, email: action.payload
            }
        case "SET_ACTIVATION_CODE":
            return {
                ...state,
                activationCode: action.payload
            };
        default:
            return state;
    }
};
export const registerActions = {
    setEmail: (
        email: string | null
    ) => {
        return {
            type: "SET_EMAIL",
            payload: email,
        };
    },
    setActivationCode: (
        code: string | null
    ) => {
        return {
            type: "SET_ACTIVATION_CODE",
            payload: code,
        };
    },
};

// export const setActivationCode = (): Thunk => async (dispatch) => {
//     dispatch(isLoading());
//     const data = await blogAPI.getFavourites({ limit: 10, offset: 0 });
//     dispatch(isntLoading());
// };


//  Types

type AllActionsType = InferActionsTypes<typeof registerActions>;

// type DispatchType = Dispatch<AllActionsType>;

export type InitialStateType = typeof initialState;

type Thunk = ThunkAction<Promise<void>, RootState, unknown, AllActionsType>;

export default registerReducer;
