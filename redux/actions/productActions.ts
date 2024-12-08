import axios from "axios";
import { API_URL, products_routes } from "../api_path";
import { store } from "../store";

export const product_tiles_count = async () => {
  try {
    const request = await axios.get(`${products_routes.product_count}`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
        authorization: `Bearer ${store.getState().user.token}`,
      },
    });

    return request;
  } catch (error: any) {
    // console.log(JSON.stringify(error?.response));
    return error?.response;
  }
};

export const recent_products = async () => {
  try {
    const request = await axios.get(`${products_routes.recent_products}`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
        authorization: `Bearer ${store.getState().user.token}`,
      },
    });

    return request;
  } catch (error: any) {
    return error?.response;
  }
};

export const all_products = async ({
  per_page,
  page_number,
  search,
}: {
  per_page: number;
  page_number: number;
  search?: string;
}) => {
  try {
    const request = await axios.get(
      search
        ? `${products_routes.all_products}?Search=${search}&PageNo=${page_number}&PageSize=${per_page}`
        : `${products_routes.all_products}?Search=&PageNo=${page_number}&PageSize=${per_page}`,
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

export const search_products = async ({
  per_page,
  page_number,
  search,
}: {
  per_page: number;
  page_number: number;
  search: string;
}) => {
  try {
    const request = await axios.get(
      `${products_routes.all_products}?Search=${search}&PageNo=${page_number}&PageSize=${per_page}`,
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

export const product_by_id = async ({ product_id }: { product_id: string }) => {
  try {
    const request = await axios.get(
      `${products_routes.product_by_id}?ProductID=${product_id}`,

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

export const delete_selected_products = async ({
  products,
}: {
  products: any;
}) => {
  try {
    const request = await axios.delete(
      products_routes.delete_selected_products,
      {
        data: {
          ProductId: products,
        },
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

export const delete_product_images = async ({
  products,
}: {
  products: any;
}) => {
  try {
    const request = await axios.delete(
      products_routes.delete_selected_products,
      {
        data: {
          ProductId: products,
        },
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

export const add_edit_product = async ({
  product_id,
  user_id,
  store_id,
  product_name,
  sku_code,
  product_price,
  brand,
  product_category,
  doa,
  units,
  images,
}: {
  product_id: any;
  user_id: any;
  store_id: any;
  product_name: string;
  sku_code: string;
  product_price: string;
  brand: any;
  product_category: any;
  doa: string;
  units: number;
  images: any;
}) => {
  try {
    const request = await axios.post(
      `${products_routes.add_edit_product}`,
      {
        ProductId: product_id,
        UserId: user_id,
        StoreId: store_id,
        ProductName: product_name,
        SKUCode: sku_code,
        ProductPrice: product_price,
        Brand: brand,
        ProductCategory: product_category,
        DOA: doa,
        Units: units,
        ProductImages: images,
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
