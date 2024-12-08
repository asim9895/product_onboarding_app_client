import Toast from "react-native-toast-message";

export const SuccessToast = (text: string) => {
  return Toast.show({ type: "success", text1: text });
};

export const ErrorToast = (text: string) => {
  return Toast.show({ type: "error", text1: text });
};
