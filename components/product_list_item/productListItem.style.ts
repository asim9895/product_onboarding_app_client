import { StyleSheet } from "react-native";
import { font_family } from "../../theme/font_family";
import { colors } from "../../theme/colors";

export const productListItemstyles = StyleSheet.create({
  card_container: {
    width: "100%",
    height: 100,
    backgroundColor: "red",
    marginBottom: 10,
  },
  image_container: {
    width: "20%",
    borderRadius: 10,
  },
  image: { width: "auto", height: 80, borderRadius: 10 },
  product_name_container: {
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 3,
  },
  product_name: {
    fontFamily: font_family.poppins_medium,
    fontSize: 16,
    color: colors.text,
    width: "60%",
  },
  product_price: {
    fontFamily: font_family.poppins_semiBold,
    fontSize: 16,
    color: colors.text,
    marginRight: 10,
    // width: "60%",
  },
  edit_icon: { width: 20, height: 20, marginBottom: 5 },
  product_type: {
    fontFamily: font_family.poppins_medium,
    fontSize: 10,
    color: colors.background,
    padding: 4,
    borderRadius: 5,
    paddingVertical: 2,
    textTransform: "uppercase",
  },
  other_texts: {
    fontFamily: font_family.poppins_regular,
    fontSize: 11,
    color: colors.text_dark_gray,
    textAlign: "center",
    width: "22%",
  },
});
