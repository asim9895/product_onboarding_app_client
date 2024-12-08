import axios from "axios";
import { upload_image_routes } from "../api_path";
import { store } from "../store";

export const upload_single_image = async ({ formData }: { formData: any }) => {
  try {
    const request = await axios.post(
      upload_image_routes.upload_blob,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
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
