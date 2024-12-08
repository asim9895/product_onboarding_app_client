import axios from "axios";
import { user_routes } from "../api_path";
import { ActionTypes } from "../types/userTypes";
import { store } from "../store";

export const save_user =
  (
    user_info: any,
    token: string,
    authenticated: boolean,
    profile_pic: string
  ) =>
  (dispatch: any) => {
    try {
      dispatch({
        type: ActionTypes.SAVE_USER,
        payload: { user_info, token, authenticated, profile_pic },
      });
    } catch (error: any) {
      console.log(error);
    }
  };

export const change_profile_pic = (profile_pic: any) => (dispatch: any) => {
  try {
    dispatch({
      type: ActionTypes.CHANGE_PROFILE_PIC,
      payload: { profile_pic },
    });
  } catch (error: any) {
    console.log(error);
  }
};

export const logout_user = () => (dispatch: any) => {
  try {
    dispatch({
      type: ActionTypes.LOGOUT_USER,
    });
  } catch (error: any) {
    console.log(error);
  }
};

export const sign_up_user = async ({
  first_name,
  last_name,
  email,
  password,
}: {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}) => {
  try {
    const request = await axios.post(
      user_routes.sign_up,
      {
        UserID: 0,
        StoreID: "1022",
        FirstName: first_name,
        LastName: last_name,
        Password: password,
        Email: email,
        Mobile: "",
        ProfilePicture: "",
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      }
    );

    return request;
  } catch (error: any) {
    // console.log(JSON.stringify(error?.response));
    return error?.response;
  }
};

export const sign_in_user = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const request = await axios.post(
      user_routes.sign_in,
      {
        Password: password,
        Email: email,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      }
    );

    return request;
  } catch (error: any) {
    // console.log(JSON.stringify(error?.response));
    return error?.response;
  }
};

export const change_user_password = async ({
  email,
  old_password,
  new_password,
}: {
  email: string;
  old_password: string;
  new_password: string;
}) => {
  try {
    const request = await axios.post(
      user_routes.change_password,
      {
        Email: email,
        OldPassword: old_password,
        NewPassword: new_password,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
          authorization: `Bearer ${store.getState().user.token}`,
        },
      }
    );

    return request;
  } catch (error: any) {
    return error?.response;
  }
};

export const send_forgot_password_otp = async ({
  email,
}: {
  email: string;
}) => {
  try {
    const request = await axios.post(
      `${user_routes.forgot_password_otp}?UserEmail=${email}`,
      {},
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      }
    );

    return request;
  } catch (error: any) {
    return error?.response;
  }
};

export const verify_forgot_password_otp = async ({
  email,
  otp,
}: {
  email: string;
  otp: number;
}) => {
  try {
    const request = await axios.post(
      `${user_routes.forgot_password_otp_verify}`,
      {
        UserEmail: email,
        OTP: otp,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      }
    );

    return request;
  } catch (error: any) {
    return error?.response;
  }
};

export const reset_password = async ({
  email,
  password,
}: {
  email: any;
  password: number;
}) => {
  try {
    const request = await axios.post(
      `${user_routes.reset_password}`,
      {
        Email: email,
        NewPassword: password,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      }
    );

    return request;
  } catch (error: any) {
    return error?.response;
  }
};

export const update_profile_pic = async ({
  user_id,
  profile_pic,
}: {
  user_id: any;
  profile_pic: string;
}) => {
  try {
    const request = await axios.post(
      `${user_routes.update_profile_pic}?UserID=${user_id}&UserProfilePic=${profile_pic}`,
      {},
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
          authorization: `Bearer ${store.getState().user.token}`,
        },
      }
    );

    return request;
  } catch (error: any) {
    // console.log(JSON.stringify(error?.response));
    return error?.response;
  }
};
