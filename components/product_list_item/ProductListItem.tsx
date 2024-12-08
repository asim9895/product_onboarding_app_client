import { Image, Text, View } from "react-native";
import React from "react";
import { colors } from "../../theme/colors";
import { globalStyles } from "../../styles/global.style";
import { productListItemstyles } from "./productListItem.style";

const ProductListItem: React.FC<any> = ({ item, delete_product_list }) => {
  return (
    <View>
      <View
        style={[
          globalStyles.row_center,
          productListItemstyles.card_container,
          {
            padding: 10,
            borderRadius: 10,
            backgroundColor:
              delete_product_list !== undefined &&
              delete_product_list.includes(item?.ProductID)
                ? colors.button
                : colors.background,
          },
        ]}
      >
        <View style={productListItemstyles.image_container}>
          <Image
            source={{
              uri:
                item?.FirstProductImage === null ||
                item?.FirstProductImage === ""
                  ? "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/800px-No-Image-Placeholder.svg.png"
                  : item?.FirstProductImage,
            }}
            style={productListItemstyles.image}
          />
        </View>
        <View
          style={[
            globalStyles.column_start,
            {
              width: "75%",
              marginLeft: 10,
              height: 90,
              justifyContent: "space-evenly",
            },
          ]}
        >
          <View
            style={[
              globalStyles.row_center,
              productListItemstyles.product_name_container,
            ]}
          >
            <Text
              style={[
                productListItemstyles.product_name,
                {
                  color:
                    delete_product_list !== undefined &&
                    delete_product_list.includes(item?.ProductID)
                      ? colors.background
                      : colors.text,
                },
              ]}
              numberOfLines={1}
            >
              {item?.ProductName}
            </Text>
            <View
              style={[
                globalStyles.row_center,
                {
                  width: "40%",
                  justifyContent: "flex-end",
                },
              ]}
            >
              <Text
                style={[
                  productListItemstyles.product_price,
                  {
                    color:
                      delete_product_list !== undefined &&
                      delete_product_list.includes(item?.ProductID)
                        ? colors.background
                        : colors.text,
                  },
                ]}
                numberOfLines={1}
              >
                ${item?.ProductPrice}
              </Text>
              {/* <Image
                source={icons.edit}
                style={productListItemstyles.edit_icon}
              /> */}
            </View>
          </View>
          <Text
            style={[
              productListItemstyles.product_type,
              {
                backgroundColor:
                  item?.ProductStatus === "accepted"
                    ? "#24cf84"
                    : item?.type === "deleted"
                    ? "#f03030"
                    : "#feba52",
              },
            ]}
          >
            {item?.ProductStatus}
          </Text>
          <View
            style={[
              globalStyles.row_center,
              {
                width: "100%",
                marginTop: 2,
              },
            ]}
          >
            <Text
              style={[
                productListItemstyles.other_texts,
                {
                  color:
                    delete_product_list !== undefined &&
                    delete_product_list.includes(item?.ProductID)
                      ? colors.background
                      : colors.text_dark_gray,
                },
              ]}
              numberOfLines={1}
            >
              {item?.SKUCode}
            </Text>
            <Text style={{ color: colors.text_gray, width: "3%" }}>|</Text>
            <Text
              style={[
                productListItemstyles.other_texts,
                {
                  color:
                    delete_product_list !== undefined &&
                    delete_product_list.includes(item?.ProductID)
                      ? colors.background
                      : colors.text_dark_gray,
                },
              ]}
              numberOfLines={1}
            >
              {item?.Brand}
            </Text>
            <Text style={{ color: colors.text_gray, width: "3%" }}>|</Text>
            <Text
              style={[
                productListItemstyles.other_texts,
                {
                  color:
                    delete_product_list !== undefined &&
                    delete_product_list.includes(item?.ProductID)
                      ? colors.background
                      : colors.text_dark_gray,
                },
              ]}
              numberOfLines={1}
            >
              {item?.Category}
            </Text>
            <Text style={{ color: colors.text_gray, width: "3%" }}>|</Text>
            <Text
              style={[
                productListItemstyles.other_texts,
                {
                  color:
                    delete_product_list !== undefined &&
                    delete_product_list.includes(item?.ProductID)
                      ? colors.background
                      : colors.text_dark_gray,
                },
              ]}
              numberOfLines={1}
            >
              {item?.ImageCount} images
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProductListItem;
