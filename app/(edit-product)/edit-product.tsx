import { Image, Platform, ScrollView, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../styles/global.style";
import { TouchableOpacity } from "react-native";
import { icons } from "../../constants/icons";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import { toastConfig } from "../../toastConfig";
import AddEditProductForm from "../../components/add_edit_product_form/AddEditProductForm";
import { product_by_id } from "../../redux/actions/productActions";

const EditProduct = () => {
  const { images, product_id }: any = useLocalSearchParams();

  const [product, setproduct]: any = useState(null);
  const [loading, setloading] = useState(false);
  const [pr_id, setpr_id] = useState(product_id);

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
    if (images === undefined) {
      if (pr_id !== null || pr_id !== undefined) {
        fetch_product(pr_id);
      }
    }
  }, [pr_id, product_id, images]);

  useEffect(() => {
    if (product_id !== undefined && images === undefined) {
      setpr_id(product_id);
    }
  }, [product_id, images]);

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={{ zIndex: 999 }}>
        <Toast config={toastConfig} />
      </View>
      <StatusBar backgroundColor="#ffffff" />
      <SafeAreaView style={[globalStyles.header_container]}>
        <View style={globalStyles.row_center}>
          <TouchableOpacity onPress={() => router.back()}>
            <Image source={icons.back} style={{ width: 25, height: 25 }} />
          </TouchableOpacity>
          <Text
            style={[
              globalStyles.header_title,
              { marginTop: Platform.OS === "ios" ? 0 : 5 },
            ]}
          >
            Edit Product
          </Text>
        </View>
      </SafeAreaView>

      <ScrollView
        style={{ marginTop: Platform.OS === "ios" ? 40 : 60 }}
        showsVerticalScrollIndicator={false}
      >
        {!loading && product !== null && (
          <AddEditProductForm
            product={product}
            images={images !== undefined ? images : undefined}
            setpr_id={setpr_id}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProduct;
