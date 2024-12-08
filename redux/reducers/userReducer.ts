import { Action, ActionTypes } from "../types/userTypes";

export interface UserInitiationStateTypes {
  user_info: any;
  token: string | null;
  authenticated: boolean;
  profile_pic: null | string;
}

const initialState: UserInitiationStateTypes = {
  user_info: null,
  token: null,
  authenticated: false,
  profile_pic:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThMtGQHNaVSjLIqqmMjuPVfZeo68fbWGaLVJ7PcWwDsg&s",
};

export const userReducer = (
  state: UserInitiationStateTypes = initialState,
  actions: Action
): UserInitiationStateTypes => {
  switch (actions.type) {
    case ActionTypes.SAVE_USER:
      return {
        ...state,
        user_info: actions.payload.user_info,
        authenticated: actions.payload.authenticated,
        token: actions.payload.token,
        profile_pic: actions.payload.profile_pic,
      };
    case ActionTypes.CHANGE_PROFILE_PIC:
      return {
        ...state,
        profile_pic: actions.payload.profile_pic,
      };
    case ActionTypes.LOGOUT_USER:
      return {
        ...state,
        user_info: null,
        authenticated: false,
        token: null,
        profile_pic:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThMtGQHNaVSjLIqqmMjuPVfZeo68fbWGaLVJ7PcWwDsg&s",
      };

    default:
      return state;
  }
};
