import { StyleSheet } from "react-native";
import { colors } from "../../theme/colors";
import { font_family } from "../../theme/font_family";

export const productsStyles = StyleSheet.create({
  add_button_area: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    right: 30,
    zIndex: 1,
  },
  add_button_container: {
    backgroundColor: colors.button,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    alignSelf: "flex-end",
  },
  add_button_icon: {
    tintColor: colors.background,
    width: 13,
    height: 13,
  },
  menu_container: { marginTop: 60, width: 180 },
  menu_item_text: { fontFamily: font_family.poppins_medium, fontSize: 15 },
  dot_menu_icon: { width: 25, height: 25 },
  search_icon: { width: 27, height: 27, marginRight: 20 },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: colors.gray,
    marginBottom: -20,
  },
  fetch_more_products_text: {
    color: colors.text_gray,
    fontSize: 14,
    fontFamily: font_family.poppins_medium,
    textAlign: "center",
    marginTop: 5,
    marginBottom: 10,
  }
});
