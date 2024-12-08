import { Image, Text, TouchableOpacity, View } from "react-native";
import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import FormField from "../../components/form_field/FormField";
import DropDownField from "../../components/drop_down_field/DropDownField";
import { get_all_brands } from "../../redux/actions/brandActions";
import { useSelector } from "react-redux";
import { get_all_categories } from "../../redux/actions/categoryActions";
import { router } from "expo-router";
import { icons } from "../../constants/icons";
import { FlatList } from "react-native";
import { add_edit_product } from "../../redux/actions/productActions";
import { ErrorToast, SuccessToast } from "../../helpers/toastMessages";
import Loader from "../loader/Loader";
import Toast from "react-native-toast-message";
import { toastConfig } from "../../toastConfig";
import { globalStyles } from "../../styles/global.style";
import { addEditProductFormStyles } from "./add_edit_product_form.style";
import DatePickerField from "../date_picker_field/DatePickerField";

const AddEditProductForm: React.FC<{
  product: any;
  images: any;
  setpr_id?: any;
}> = ({ product, images, setpr_id }) => {
  const { user_info }: { user_info: any } = useSelector(
    (state: any) => state.user
  );
  const new_date = new Date();
  const [loading, setloading] = useState(false);
  const [brands, setbrands]: any = useState([]);
  const [categories, setcategories] = useState([]);
  const [date_of_availability, setdate_of_availability]: any = useState(
    product === null ? "" : product?.DOA
  );
  const [upload_images, setupload_images]: any = useState(
    images !== undefined ? images?.split(",") : []
  );
  const [selected_brand, setselected_brand]: any = useState({
    id: 0,
    title: "",
  });
  const [selected_category, setselected_category]: any = useState({
    id: 0,
    title: "",
  });

  useEffect(() => {
    if (images !== undefined) {
      let im = images !== undefined ? images?.split(",") : [];
      setupload_images([...new Set([im, ...upload_images].flat())]);
    }
  }, [images]);

  useEffect(() => {
    if (product !== null) {
      if (
        product?.ProductImages !== null &&
        product?.ProductImages?.length > 0
      ) {
        setupload_images([
          ...new Set([...upload_images, product?.ProductImages].flat()),
        ]);
      }
    }
  }, [product]);

  const fetch_all_brands = async () => {
    const request: any = await get_all_brands({ store_id: user_info?.StoreID });

    if (request?.status === 200) {
      setbrands(
        request?.data?.Result?.brandList?.map((brand: any) => {
          return { id: brand?.BrandID, title: brand?.BrandName };
        })
      );
    } else {
      setbrands([]);
    }
  };

  const fetch_all_categories = async () => {
    const request: any = await get_all_categories({
      store_id: user_info?.StoreID,
    });

    if (request?.status === 200) {
      setcategories(
        request?.data?.Result?.productCategoryLists?.map((category: any) => {
          return {
            id: category?.ProductCategoryID,
            title: category?.ProductCategoryName,
          };
        })
      );
    } else {
      setcategories([]);
    }
  };

  useEffect(() => {
    if (product !== null) {
      setselected_brand({
        id: product?.BrandID,
        title: product?.Brand,
      });
    }
  }, [brands, product]);

  useEffect(() => {
    if (product !== null) {
      setselected_category({
        id: product?.CategoryID,
        title: product?.Category,
      });
    }
  }, [categories, product]);

  useEffect(() => {
    fetch_all_brands();
    fetch_all_categories();
  }, []);

  const submitProduct = async (values: any, resetForm: any) => {
    if (values?.sku_code === "") {
      return ErrorToast("SKU Code is required");
    }
    if (values?.product_name === "") {
      return ErrorToast("Product name is required");
    }
    if (values?.product_price === "") {
      return ErrorToast("Product price is required");
    }
    if (values?.product_price === 0) {
      return ErrorToast("Product price cannot be 0");
    }
    if (values?.product_price === "0") {
      return ErrorToast("Product price cannot be 0");
    }
    if (values?.number_of_units === "") {
      return ErrorToast("Number of units is required");
    }
    if (values?.number_of_units === 0) {
      return ErrorToast("Number of units cannot be 0");
    }
    if (values?.number_of_units === "0") {
      return ErrorToast("Number of units cannot be 0");
    }
    if (selected_brand?.id === 0) {
      return ErrorToast("Brand is required");
    }

    if (selected_category?.id === 0) {
      return ErrorToast("Category is required");
    }

    if (date_of_availability === "") {
      return ErrorToast("Date of Availability is required");
    }

    if (upload_images?.length === 0) {
      return ErrorToast("Images are required");
    }

    const body: any = {
      product_id: product?.ProductID,
      user_id: user_info?.UserID,
      store_id: user_info?.StoreID,
      product_name: values?.product_name,
      sku_code: values?.sku_code,
      product_price: Number(values?.product_price),
      brand: selected_brand?.id,
      product_category: selected_category?.id,
      doa: JSON.stringify(date_of_availability)?.split("T")[0].replace('"', ""),
      units: Number(values?.number_of_units),
      images: upload_images,
    };

    setloading(true);
    let request =
      product !== null
        ? await add_edit_product({
            ...body,
            product_id: product?.ProductID,
          })
        : await add_edit_product({
            ...body,
            product_id: 0,
          });

    if (request?.status === 200) {
      SuccessToast(request?.data?.Message);
      setTimeout(() => {
        setloading(false);
        router.push("/products");
        resetForm();
        setselected_brand({ id: 0, title: "" });
        setselected_category({ id: 0, title: "" });
        setdate_of_availability("");
        setupload_images([]);
        if (product?.ProductID) {
          setpr_id(undefined);
        }
      }, 1500);
    } else {
      setloading(false);
      ErrorToast(request?.data?.Message);
    }
  };
  const remove_image = (item: string) => {
    setupload_images(
      upload_images.filter((photo: any) => {
        return photo !== item;
      })
    );
  };

  return (
    <View>
      {loading && (
        <Loader
          text={
            product?.ProductID ? "Updating product..." : "Creating Product..."
          }
        />
      )}
      <View style={{ zIndex: 99 }}>
        <Toast config={toastConfig} />
      </View>
      <Formik
        initialValues={{
          sku_code: product !== null ? product?.SKUCode : "",
          product_name: product !== null ? product?.ProductName : "",
          product_price: product !== null ? product?.ProductPrice : 0,
          number_of_units: product !== null ? product?.Units?.toString() : 0,
        }}
        onSubmit={(values, { resetForm }) => submitProduct(values, resetForm)}
      >
        {({
          values,
          handleChange,
          errors,
          touched,
          isValid,
          handleSubmit,
          handleBlur,
          resetForm,
        }) => (
          <View
            style={{ marginTop: 20, paddingHorizontal: 20, marginBottom: 20 }}
          >
            <View>
              <FormField
                title="SKU Code"
                placeholder={"Enter sku code"}
                value={values.sku_code}
                handleChangeText={handleChange("sku_code")}
                onBlur={handleBlur("sku_code")}
                error={touched.sku_code && errors.sku_code}
                error_msg={errors.sku_code}
              />
            </View>
            <View style={{ marginTop: 10 }}>
              <FormField
                title="Product Name"
                placeholder={"Enter product name"}
                value={values.product_name}
                handleChangeText={handleChange("product_name")}
                onBlur={handleBlur("product_name")}
                error={touched.product_name && errors.product_name}
                error_msg={errors.product_name}
              />
            </View>
            <View style={{ marginTop: 10 }}>
              <FormField
                title="Product Price"
                placeholder={"Enter product price"}
                value={values.product_price?.toString()}
                handleChangeText={handleChange("product_price")}
                onBlur={handleBlur("product_price")}
                error={touched.product_price && errors.product_price}
                error_msg={errors.product_price}
                input_mode="numeric"
              />
            </View>
            <View style={{ marginTop: 10 }}>
              {brands?.length > 0 && (
                <DropDownField
                  data={brands}
                  setselected_item={setselected_brand}
                  title={"Brand"}
                  default_value={
                    product !== null
                      ? {
                          id: product?.BrandID,
                          title: product?.Brand,
                        }
                      : { id: 0, title: "" }
                  }
                />
              )}
            </View>
            <View style={{ marginTop: 10 }}>
              {categories.length > 0 && (
                <DropDownField
                  data={categories}
                  setselected_item={setselected_category}
                  title={"Category"}
                  default_value={
                    product !== null
                      ? {
                          id: product?.CategoryID,
                          title: product?.Category,
                        }
                      : { id: 0, title: "" }
                  }
                />
              )}
            </View>
            <View style={{ marginTop: 10 }}>
              <FormField
                title="Number of Units"
                placeholder={"Enter number of units"}
                value={values.number_of_units?.toString()}
                handleChangeText={handleChange("number_of_units")}
                onBlur={handleBlur("number_of_units")}
                error={touched.number_of_units && errors.number_of_units}
                error_msg={errors.number_of_units}
                input_mode="numeric"
              />
            </View>

            <DatePickerField
              title="Date of Availability"
              default_date={
                product === null ? new_date : new Date(product?.DOA)
              }
              item={product}
              value={date_of_availability}
              setvalue={setdate_of_availability}
            />

            <TouchableOpacity
              onPress={() =>
                router.navigate({
                  pathname: "/capture-images",
                  params: { mode: product !== null ? "edit" : "add" },
                })
              }
              style={addEditProductFormStyles.take_or_upload_photo_container}
            >
              <Image
                source={icons.camera}
                style={addEditProductFormStyles.camera_icon}
              />
              <Text style={addEditProductFormStyles.take_upload_photo_text}>
                Take or Upload Photos
              </Text>
            </TouchableOpacity>
            {upload_images?.length > 0 && (
              <Text style={addEditProductFormStyles.preview_text}>Preview</Text>
            )}
            <FlatList
              style={{ marginTop: 10, marginBottom: 20 }}
              data={upload_images}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return (
                  <View
                    style={{
                      flex: 1,
                      marginTop: 10,
                      marginLeft: index === 0 ? 10 : 10,
                      marginRight:
                        upload_images[upload_images?.length - 1] === item
                          ? 20
                          : 10,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => remove_image(item)}
                      style={addEditProductFormStyles.preview_image_container}
                    >
                      <Image
                        source={icons.close}
                        style={addEditProductFormStyles.close_icon}
                      />
                    </TouchableOpacity>
                    <Image
                      source={{ uri: item }}
                      style={addEditProductFormStyles.list_image}
                      resizeMode="cover"
                    />
                  </View>
                );
              }}
            />
            <View>
              <TouchableOpacity
                style={globalStyles.button_text_container}
                activeOpacity={0.8}
                onPress={() => handleSubmit()}
                disabled={loading}
              >
                <Text style={globalStyles.button_text}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default AddEditProductForm;
