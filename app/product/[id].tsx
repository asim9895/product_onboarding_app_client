import {
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { globalStyles } from "../../styles/global.style";
import { icons } from "../../constants/icons";
import { productStyles } from "../../styles/product-[id].style";
import { product_by_id } from "../../redux/actions/productActions";
import EmptyProductList from "../../components/empty_product_list/EmptyProductList";
import ImageCarousel from "../../components/image_carousel/ImageCarousel";

const SingleProduct = () => {
  const [product, setproduct]: any = useState(null);
  const { id } = useLocalSearchParams();
  const [loading, setloading] = useState(false);

  const fetch_product = async (id: any) => {
    setloading(true);
    const request: any = await product_by_id({ product_id: id });

    if (request?.status === 200) {
      setloading(false);
      setproduct(request?.data?.Result?.product);
    } else {
      setloading(false);
      setproduct(null);
    }
  };

  useEffect(() => {
    if (id !== null || id !== undefined) {
      fetch_product(id);
    }
  }, [id]);

  return (
    <SafeAreaView style={globalStyles.container}>
      <StatusBar backgroundColor="#ffffff" />
      <SafeAreaView style={[globalStyles.header_container]}>
        <View
          style={[
            globalStyles.row_center,
            { marginTop: Platform.OS === "ios" ? 35 : 30 },
          ]}
        >
          <TouchableOpacity onPress={() => router.back()}>
            <Image source={icons.back} style={{ width: 25, height: 25 }} />
          </TouchableOpacity>
        </View>
        <View
          style={[
            globalStyles.row_center,
            { marginTop: Platform.OS === "ios" ? 35 : 30 },
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              router.push({
                pathname: "/edit-product",
                params: { product_id: product?.ProductID },
              });
            }}
          >
            <Image source={icons.edit} style={{ width: 20, height: 20 }} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <View style={{ marginTop: Platform.OS === "ios" ? 70 : 110 }}>
        {loading ? (
          <EmptyProductList
            loading={loading}
            empty_message="No product found"
            loading_message="Fetching data..."
          />
        ) : (
          <View>
            <ImageCarousel images={product?.ProductImages} />
            <View style={{ marginHorizontal: 15 }}>
              <Text style={productStyles.product_name} numberOfLines={2}>
                {product?.ProductName}
              </Text>

              <View
                style={[
                  globalStyles.row_center,
                  {
                    justifyContent: "space-between",
                    width: "100%",
                  },
                ]}
              >
                <Text style={productStyles.product_category} numberOfLines={1}>
                  {product?.SKUCode}
                </Text>
                <Text style={productStyles.product_category} numberOfLines={1}>
                  {product?.Category}
                </Text>

                <Text style={productStyles.product_category} numberOfLines={1}>
                  {product?.Brand}
                </Text>
              </View>
              <Text
                style={[productStyles.product_name, { marginTop: 15 }]}
                numberOfLines={2}
              >
                ${product?.ProductPrice}
              </Text>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default SingleProduct;
