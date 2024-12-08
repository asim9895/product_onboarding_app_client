import {
  ActivityIndicator,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../styles/global.style";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { icons } from "../../constants/icons";
import { searchStyles } from "../../styles/search.style";
import { search_products } from "../../redux/actions/productActions";
import ProductListItem from "../../components/product_list_item/ProductListItem";
import { colors } from "../../theme/colors";
import EmptyProductList from "../../components/empty_product_list/EmptyProductList";
import { ErrorToast } from "../../helpers/toastMessages";
import Toast from "react-native-toast-message";
import { toastConfig } from "../../toastConfig";

const Search = () => {
  const [search, setsearch] = useState("");
  const [page_number, setpage_number] = useState(1);
  const [search_started, setsearch_started] = useState(false);

  const [reached_end, setreached_end] = useState(false);
  const [loading, setloading] = useState(false);
  const [products, setproducts]: any = useState([]);

  const per_page = 20;
  const on_search_products = useCallback(async () => {
    if (search === "") {
      return ErrorToast("Enter search to find products");
    }
    setsearch_started(true);
    setloading(true);
    const request: any = await search_products({
      page_number,
      per_page,
      search,
    });

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
      setloading(false);
      setproducts([]);
      setreached_end(true);
    }
  }, [page_number, search]);

  return (
    <SafeAreaView style={globalStyles.container}>
      <StatusBar backgroundColor="#ffffff" />

      <View style={{ zIndex: 999 }}>
        <Toast config={toastConfig} />
      </View>
      <SafeAreaView
        style={[
          globalStyles.header_container,
          {
            justifyContent: "flex-start",
            width: "100%",
            height: 100,
          },
        ]}
      >
        <View style={globalStyles.row_center}>
          <TouchableOpacity onPress={() => router.back()}>
            <Image
              source={icons.back}
              style={{ width: 25, height: 25, marginRight: 15 }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={[globalStyles.row_center, { width: "88%", marginVertical: 5 }]}
        >
          <View style={{ width: "100%" }}>
            <View style={[searchStyles.text_input_container]}>
              <TextInput
                className="flex-1 text-white font-psemibold text-base w-full"
                style={searchStyles.text_input}
                value={search}
                placeholder={"Search products"}
                placeholderTextColor={colors.text_gray}
                onChangeText={(value: any) => setsearch(value)}
              />
              <TouchableOpacity
                onPress={() => {
                  setloading(true);
                  setproducts([]);
                  setpage_number(1);
                  on_search_products();
                }}
                activeOpacity={0.8}
              >
                <Image
                  source={icons.search}
                  style={{ width: 30, height: 30 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>

      {/* Products List */}
      <FlatList
        style={{ marginTop: Platform.OS === "ios" ? 50 : 70 }}
        data={products}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.ProductID}
        onEndReached={!reached_end ? on_search_products : () => {}}
        onEndReachedThreshold={0.1}
        renderItem={({ item, index }) => {
          return (
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={{
                  marginHorizontal: 15,
                  marginTop: index === 0 ? 10 : 0,
                }}
                activeOpacity={0.8}
                onPress={() => {
                  router.push(`/product/${item?.ProductID}`);
                }}
              >
                <ProductListItem item={item} />
              </TouchableOpacity>
              {loading &&
                products[products.length - 1]?.ProductID ===
                  item?.ProductID && (
                  <View style={{ padding: 20 }}>
                    <ActivityIndicator size={"large"} color={colors.button} />
                    <Text style={searchStyles.fetch_more_products_text}>
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
            empty_message={search_started ? "No products found" : ""}
            loading_message="Fetching products..."
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({});
