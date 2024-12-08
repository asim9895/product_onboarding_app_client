import { router } from "expo-router";
import { logout_user } from "../redux/actions/userActions";
import { ErrorToast } from "./toastMessages";
import { useDispatch } from "react-redux";

export const auto_logout = async (error: any, dispatch: any) => {
  if (error === "Invalid Token") {
    ErrorToast("Session Expired, Login again");
    setTimeout(() => {
      dispatch(logout_user());
      router.navigate("/sign-in");
    }, 1500);
  }
};
