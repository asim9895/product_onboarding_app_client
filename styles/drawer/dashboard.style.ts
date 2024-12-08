import { StyleSheet } from "react-native";
import { colors } from "../../theme/colors";
import { font_family } from "../../theme/font_family";

export const dashboardStyles = StyleSheet.create({
  add_new_product_button_container: {
    backgroundColor: colors.button,
    marginHorizontal: 50,
    marginTop: 20,
    marginBottom: 20,
    justifyContent: "center",
    paddingVertical: 15,
    borderRadius: 40,
  },
  add_icon: {
    tintColor: colors.background,
    width: 15,
    height: 15,
    marginRight: 15,
    marginBottom: 3,
  },
  add_new_product_text: {
    fontFamily: font_family.poppins_semiBold,
    fontSize: 16,
    color: colors.background,
  },
  card_container: {
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
  },
  card: {
    width: "45%",
    height: 70,
    backgroundColor: colors.button,
    borderRadius: 10,
    padding: 10,
  },
  title: {
    fontFamily: font_family.poppins_medium,
    color: colors.background,
    fontSize: 14,
    paddingHorizontal: 6,
  },
  value: {
    fontFamily: font_family.poppins_bold,
    color: colors.background,
    fontSize: 20,
    paddingHorizontal: 6,
  },
  recently_added_text: {
    fontFamily: font_family.poppins_semiBold,
    fontSize: 16,
    color: colors.text,
  },
  recently_added_text_container: {
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 20,
  }
});
