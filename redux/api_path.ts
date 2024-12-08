export const API_URL =
  "https://cagphoneservice.azurewebsites.net/api/1.0/Onboardproduct";

export const user_routes = {
  sign_up: `${API_URL}/UserSignUp`,
  sign_in: `${API_URL}/UserLogin`,
  change_password: `${API_URL}/SetPassword`,
  forgot_password_otp: `${API_URL}/SendEmailForOTP`,
  forgot_password_otp_verify: `${API_URL}/OTPVerify`,
  reset_password: `${API_URL}/ResetPassword`,
  update_profile_pic: `${API_URL}/EditUserProfilePic`,
};

export const products_routes = {
  recent_products: `${API_URL}/DashBoard/GetAllRecentProductList`,
  product_count: `${API_URL}/DashBoard/TotalProducts`,
  product_by_id: `${API_URL}/GetProductByProductId`,
  all_products: `${API_URL}/GetAllProductData`,
  delete_selected_products: `${API_URL}/DeleteProductsByProductIds`,
  add_edit_product: `${API_URL}/SaveProduct`,
  delete_product_images: `${API_URL}/DeleteProductImagesByProductIds`,
};

export const brand_routes = {
  all_brands: `${API_URL}/GetAllBrand`,
};

export const category_routes = {
  all_product_categories: `${API_URL}/GetAllProductCategory`,
};

export const upload_image_routes = {
  upload_blob: `${API_URL}/UploadBlob`,
};
