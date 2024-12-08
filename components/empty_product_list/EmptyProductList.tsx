import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../theme/colors";
import { emptyProductListStyles } from "./empty_product_list.style";

const EmptyProductList: React.FC<{
  loading: boolean;
  loading_message: string;
  empty_message: string;
}> = ({ loading, loading_message, empty_message }) => {
  return (
    <View style={[emptyProductListStyles.list_container]}>
      {loading ? (
        <View style={[emptyProductListStyles.content_container]}>
          <ActivityIndicator size={"large"} color={colors.button} />
          <Text style={emptyProductListStyles.loading_empty_message}>
            {loading_message}
          </Text>
        </View>
      ) : (
        <View style={[emptyProductListStyles.content_container]}>
          <Text style={emptyProductListStyles.loading_empty_message}>
            {empty_message}
          </Text>
        </View>
      )}
    </View>
  );
};

export default EmptyProductList;

const styles = StyleSheet.create({});
