import { StyleSheet } from "react-native";
import { colors } from "../theme/colors";
import { font_family } from "../theme/font_family";

export const productStyles = StyleSheet.create({
  product_name: {
    fontFamily: font_family.poppins_semiBold,
    fontSize: 20,
    color: colors.text,
    marginBottom: 15,
  },
  product_highlight: {
    fontFamily: font_family.poppins_semiBold,
    fontSize: 18,
    color: colors.text,
  },
  product_category: {
    width: "33%",
    fontFamily: font_family.poppins_medium,
    fontSize: 15,
    color: colors.text_dark_gray,
    textAlign: "center",
  },
});
