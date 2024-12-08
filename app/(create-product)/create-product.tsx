import { Image, Platform, ScrollView, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../styles/global.style";
import { TouchableOpacity } from "react-native";
import { icons } from "../../constants/icons";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import { toastConfig } from "../../toastConfig";

import AddEditProductForm from "../../components/add_edit_product_form/AddEditProductForm";

const CreateProduct = () => {
  const { images }: any = useLocalSearchParams();

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
            Add Product
          </Text>
        </View>
      </SafeAreaView>

      <ScrollView
        style={{ marginTop: Platform.OS === "ios" ? 40 : 60 }}
        showsVerticalScrollIndicator={false}
      >
        <AddEditProductForm
          product={null}
          images={images !== undefined ? images : undefined}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateProduct;
