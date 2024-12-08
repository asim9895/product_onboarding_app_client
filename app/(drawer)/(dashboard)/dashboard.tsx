import {
  FlatList,
  Image,
  Platform,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import { icons } from "../../../constants/icons";
import { globalStyles } from "../../../styles/global.style";
import ProductListItem from "../../../components/product_list_item/ProductListItem";
import { toastConfig } from "../../../toastConfig";
import Toast from "react-native-toast-message";
import { StatusBar } from "expo-status-bar";
import { dashboardStyles } from "../../../styles/drawer/dashboard.style";
import { useDispatch } from "react-redux";
import {
  product_tiles_count,
  recent_products,
} from "../../../redux/actions/productActions";
import EmptyProductList from "../../../components/empty_product_list/EmptyProductList";
import { auto_logout } from "../../../helpers/auto_logout";

const Dashboard = () => {
  const [tiles_data, settiles_data] = useState({
    category_count: 0,
    products_count: 0,
  });
  const [loading, setloading] = useState(false);
  const [products, setproducts]: any = useState([]);
  const navigation = useNavigation();
  const dispatch: any = useDispatch();
  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer);
  };

  const fetch_tiles_data = async () => {
    const request: any = await product_tiles_count();

    if (request?.status === 200) {
      settiles_data({
        ...tiles_data,
        category_count:
          request?.data?.Result?.totalProductCount[0]?.ProductCategoryCount,
        products_count:
          request?.data?.Result?.totalProductCount[0]?.ProductCount,
      });
    } else {
      await auto_logout(request?.data?.Message, dispatch);
      settiles_data({
        ...tiles_data,
        products_count: 0,
        category_count: 0,
      });
    }
  };

  const fetch_recent_products = async () => {
    setloading(true);
    const request: any = await recent_products();

    if (request?.status === 200) {
      setloading(false);
      setproducts(request?.data?.Result?.productLists);
    } else {
      await auto_logout(request?.data?.Message, dispatch);
      setloading(false);
      setproducts([]);
    }
  };

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetch_tiles_data();
    await fetch_recent_products();
    setRefreshing(false);
  };

  useEffect(() => {
    fetch_tiles_data();
    fetch_recent_products();
  }, []);

  return (
    <SafeAreaView style={globalStyles.container}>
      <StatusBar backgroundColor="#ffffff" style="light" />

      <View style={{ zIndex: 999 }}>
        <Toast config={toastConfig} />
      </View>

      <SafeAreaView style={globalStyles.header_container}>
        <View style={globalStyles.row_center}>
          <TouchableOpacity onPress={openDrawer}>
            <Image source={icons.drawer} style={{ width: 25, height: 25 }} />
          </TouchableOpacity>
          <Text style={globalStyles.header_title}>Dashboard</Text>
        </View>
        <View style={globalStyles.row_center}>
          <TouchableOpacity onPress={() => router.navigate("/notifications")}>
            <Image
              source={icons.notification}
              style={{ width: 25, height: 25, marginRight: 20 }}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={icons.dot_menu} style={{ width: 25, height: 25 }} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <View style={{ marginTop: 45 }}>
        <FlatList
          data={products}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item?.ProductID?.toString()}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={{ marginHorizontal: 5 }}
                activeOpacity={0.8}
                onPress={() => {
                  router.push(`/product/${item?.ProductID}`);
                }}
              >
                <ProductListItem item={item} />
              </TouchableOpacity>
            );
          }}
          ListHeaderComponent={() => {
            return (
              <View style={{ marginTop: Platform.OS === "ios" ? 20 : 40 }}>
                <View style={dashboardStyles.card_container}>
                  <View style={dashboardStyles.card}>
                    <Text style={dashboardStyles.title}>Total Products</Text>
                    <Text style={dashboardStyles.value}>
                      {tiles_data.products_count}
                    </Text>
                  </View>
                  <View style={dashboardStyles.card}>
                    <Text style={dashboardStyles.title}>Total Categories</Text>
                    <Text style={dashboardStyles.value}>
                      {tiles_data.category_count}
                    </Text>
                  </View>
                </View>

                <View
                  style={[
                    globalStyles.row_center,
                    dashboardStyles.recently_added_text_container,
                  ]}
                >
                  <Text style={dashboardStyles.recently_added_text}>
                    Recently Added
                  </Text>
                </View>
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
          ListFooterComponent={() => (
            <TouchableOpacity
              style={[
                globalStyles.row_center,
                dashboardStyles.add_new_product_button_container,
              ]}
              onPress={() => router.push("/create-product")}
            >
              <Image source={icons.plus} style={dashboardStyles.add_icon} />
              <Text style={dashboardStyles.add_new_product_text}>
                Add New Product
              </Text>
            </TouchableOpacity>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({});
