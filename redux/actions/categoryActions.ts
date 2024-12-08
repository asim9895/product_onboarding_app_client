import axios from "axios";
import { category_routes } from "../api_path";
import { store } from "../store";

export const get_all_categories = async ({
  store_id,
}: {
  store_id: string;
}) => {
  try {
    const request = await axios.get(
      `${category_routes.all_product_categories}?StoreID=${store_id}`,
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
