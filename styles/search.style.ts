import { Platform, StyleSheet } from "react-native";
import { font_family } from "../theme/font_family";
import { colors } from "../theme/colors";

export const searchStyles = StyleSheet.create({
  text_input_container: {
    borderRadius: 10,
    borderWidth: 1,
    height: Platform.OS === "ios" ? 42 : 50,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
    borderColor: colors.gray,
  },
  text_input: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
    fontFamily: font_family.poppins_medium,
    lineHeight: 17,
    height: "100%",
    paddingTop: Platform.OS === "ios" ? 10 : 5,
    textDecorationLine: "none",
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
