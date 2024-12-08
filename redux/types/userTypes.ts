export enum ActionTypes {
  SAVE_USER = "SAVE_USER",
  LOGOUT_USER = "LOGOUT_USER",
  CHANGE_PROFILE_PIC = "CHANGE_PROFILE_PIC",
}

interface saveUserActionType {
  type: ActionTypes.SAVE_USER;
  payload: {
    user_info: any;
    token: string;
    authenticated: boolean;
    profile_pic: string | null;
  };
}

interface changeProfilePicActionType {
  type: ActionTypes.CHANGE_PROFILE_PIC;
  payload: { profile_pic: string | null };
}

interface logoutUserActionType {
  type: ActionTypes.LOGOUT_USER;
  payload: { authenticated: boolean };
}

export type Action =
  | saveUserActionType
  | logoutUserActionType
  | changeProfilePicActionType;
