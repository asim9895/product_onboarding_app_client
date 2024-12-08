import axios from "axios";
import { brand_routes } from "../api_path";
import { store } from "../store";

export const get_all_brands = async ({ store_id }: { store_id: string }) => {
  try {
    const request = await axios.get(
      `${brand_routes.all_brands}?StoreID=${store_id}`,
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
