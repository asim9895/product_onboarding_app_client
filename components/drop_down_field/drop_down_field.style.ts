import { Platform, StyleSheet } from "react-native";
import { font_family } from "../../theme/font_family";
import { colors } from "../../theme/colors";

export const dropDownFieldStyles = StyleSheet.create({
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
  dropdown_container: {
    width: "100%",
    borderRadius: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    justifyContent: "space-between",
    height: 55,
    borderColor: colors.gray,
    backgroundColor: colors.background,
  },
  selected_item_text: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
    fontFamily: font_family.poppins_medium,
    lineHeight: 17,
  },
  drop_icon: {
    fontSize: 24,
    color: colors.text_gray,
  },
  content_container: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  content_title: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
    fontFamily: font_family.poppins_medium,
    lineHeight: 17,
    padding: 7,
  },
  content_high_container: {
    backgroundColor: colors.background,
    borderRadius: 8,
    marginTop: -20,
    elevation: 6,
  },
});
