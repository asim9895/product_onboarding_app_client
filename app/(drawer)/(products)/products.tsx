import {
  ActivityIndicator,
  FlatList,
  Image,
  Platform,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import { globalStyles } from "../../../styles/global.style";
import { icons } from "../../../constants/icons";
import ProductListItem from "../../../components/product_list_item/ProductListItem";
import { productsStyles } from "../../../styles/drawer/products.style";
import {
  all_products,
  delete_selected_products,
} from "../../../redux/actions/productActions";
import EmptyProductList from "../../../components/empty_product_list/EmptyProductList";
import { colors } from "../../../theme/colors";
import { auto_logout } from "../../../helpers/auto_logout";
import { useDispatch } from "react-redux";
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";
import { ErrorToast, SuccessToast } from "../../../helpers/toastMessages";
import Loader from "../../../components/loader/Loader";
import { toastConfig } from "../../../toastConfig";
import Toast from "react-native-toast-message";

const Products = () => {
  const navigation = useNavigation();
  const dispatch: any = useDispatch();
  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);
  const [page_number, setpage_number] = useState(1);
  const [long_press_enable, setlong_press_enable] = useState(false);
  const [delete_product_list, setdelete_product_list]: any = useState([]);
  const [delete_loading, setdelete_loading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [reached_end, setreached_end] = useState(false);
  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer);
  };
  const [loading, setloading] = useState(false);
  const [products, setproducts]: any = useState([]);
  const per_page = 20;
  const fetch_recent_products = useCallback(async () => {
    setloading(true);
    const request: any = await all_products({ page_number, per_page });

    if (request?.status === 200) {
      setloading(false);
      setproducts(
        page_number === 1
          ? request?.data?.Result?.productLists
          : [...products, ...request?.data?.Result?.productLists]
      );
      if (request?.data?.Result?.productLists?.length === 0) {
        setreached_end(true);
      } else {
        setpage_number(page_number + 1);
      }
    } else {
      await auto_logout(request?.data?.Message, dispatch);
      setloading(false);
      setproducts([]);
      setreached_end(true);
    }
  }, [page_number, refreshing === false]);

  const refresh_products = useCallback(async () => {
    setpage_number(1);

    setproducts([]);
    setloading(true);
    const request: any = await all_products({ page_number: 1, per_page });

    if (request?.status === 200) {
      setloading(false);
      setproducts(request?.data?.Result?.productLists);
    } else {
      setloading(false);
      setproducts([]);
    }
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await refresh_products();
    setRefreshing(false);
  };

  useEffect(() => {
    fetch_recent_products();
  }, []);

  const delete_products = async () => {
    setdelete_loading(false);
    let request = await delete_selected_products({
      products: delete_product_list,
    });

    if (request?.status === 200) {
      setlong_press_enable(false);
      setdelete_product_list([]);
      SuccessToast("Products deleted successfully");
      refresh_products();
      hideMenu();
      setTimeout(() => {
        setdelete_loading(false);
      }, 1500);
    } else {
      setdelete_loading(false);
      hideMenu();
      return ErrorToast("Something went wrong, try again");
    }
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      {/* Header */}

      <SafeAreaView style={[globalStyles.header_container]}>
        <View style={globalStyles.row_center}>
          <TouchableOpacity onPress={openDrawer}>
            <Image source={icons.drawer} style={{ width: 25, height: 25 }} />
          </TouchableOpacity>
          <Text style={globalStyles.header_title}>Products</Text>
        </View>
        <View style={globalStyles.row_center}>
          <TouchableOpacity onPress={() => router.navigate("/search")}>
            <Image source={icons.search} style={productsStyles.search_icon} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              return visible ? hideMenu() : showMenu();
            }}
          >
            <Image
              source={icons.dot_menu}
              style={productsStyles.dot_menu_icon}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <View style={{ alignItems: "flex-end", zIndex: 10 }}>
        <Menu
          visible={visible}
          onRequestClose={hideMenu}
          style={productsStyles.menu_container}
        >
          <MenuItem
            onPress={() => {
              setdelete_product_list([]);
              setlong_press_enable(true);
              if (products?.length !== delete_product_list?.length) {
                setdelete_product_list(
                  [
                    ...delete_product_list,
                    products.map((product: any) => product?.ProductID),
                  ].flat()
                );
              }
            }}
            textStyle={productsStyles.menu_item_text}
            disabled={products?.length === delete_product_list?.length}
          >
            Select All
          </MenuItem>

          <MenuDivider />
          <MenuItem
            onPress={() => {
              setlong_press_enable(false);
              setdelete_product_list([]);
              hideMenu();
            }}
            textStyle={productsStyles.menu_item_text}
            disabled={delete_product_list?.length === 0}
          >
            Deselect All
          </MenuItem>
          <MenuItem
            onPress={delete_products}
            disabled={delete_product_list?.length === 0}
            textStyle={productsStyles.menu_item_text}
          >
            Delete
          </MenuItem>
        </Menu>
      </View>

      {/* Add Button Icon */}
      <TouchableOpacity
        style={productsStyles.add_button_area}
        onPress={() => router.push("/create-product")}
      >
        <View style={productsStyles.add_button_container}>
          <Image source={icons.plus} style={productsStyles.add_button_icon} />
        </View>
      </TouchableOpacity>

      {delete_loading && <Loader text="Deleting products...." />}
      <View style={{ zIndex: 999 }}>
        <Toast config={toastConfig} />
      </View>

      {/* Products List */}
      <FlatList
        style={{ marginTop: 50 }}
        data={products}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.ProductID}
        onEndReached={!reached_end ? fetch_recent_products : () => {}}
        onEndReachedThreshold={0.1}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                flex: 1,
                marginTop: index === 0 && Platform.OS === "ios" ? 0 : 20,
              }}
            >
              <TouchableOpacity
                onLongPress={() => {
                  if (long_press_enable) {
                    setlong_press_enable(false);
                    setdelete_product_list([]);
                  } else {
                    setlong_press_enable(true);
                    setdelete_product_list([
                      ...delete_product_list,
                      item?.ProductID,
                    ]);
                  }
                }}
                style={{
                  paddingHorizontal: 5,
                  padding: 5,
                }}
                activeOpacity={0.8}
                onPress={() => {
                  if (long_press_enable) {
                    setdelete_product_list([
                      ...delete_product_list,
                      item?.ProductID,
                    ]);
                  } else {
                    router.push(`/product/${item?.ProductID}`);
                  }
                }}
              >
                <ProductListItem
                  item={item}
                  delete_product_list={delete_product_list}
                />
                <View style={productsStyles.divider}></View>
              </TouchableOpacity>
              {loading &&
                products[products.length - 1]?.ProductID ===
                  item?.ProductID && (
                  <View style={{ padding: 20 }}>
                    <ActivityIndicator size={"large"} color={colors.button} />
                    <Text style={productsStyles.fetch_more_products_text}>
                      Fetching more products....
                    </Text>
                  </View>
                )}
            </View>
          );
        }}
        ListEmptyComponent={() => (
          <EmptyProductList
            loading={loading}
            empty_message="No products found"
            loading_message="Fetching products..."
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Products;
