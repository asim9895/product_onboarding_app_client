import { Platform, StyleSheet } from "react-native";
import { font_family } from "../../theme/font_family";
import { colors } from "../../theme/colors";

export const formFieldStyles = StyleSheet.create({
  title: {
    fontFamily: font_family.poppins_medium,
    fontSize: 14,
    marginBottom: Platform.OS === "ios" ? -10 : -15,
    zIndex: 1,
    left: 15,
    backgroundColor: colors.background,
    alignSelf: "flex-start",
    paddingHorizontal: 5,
    color: colors.text,
  },
  text_input_container: {
    borderRadius: 10,
    borderWidth: 1,
    height: 55,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  text_input: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
    height: "100%",
    fontFamily: font_family.poppins_medium,
    lineHeight: 17,
    textDecorationLine: "none",
  },
  error_msg: {
    color: "crimson",
    fontFamily: font_family.poppins_medium,
    fontSize: 13,
    marginLeft: 5,
  },
});
