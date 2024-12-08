import { StyleSheet } from "react-native";
import { colors } from "../../theme/colors";
import { font_family } from "../../theme/font_family";

export const drawerStyles = StyleSheet.create({
  user_info_container: {
    backgroundColor: colors.button,
    width: "100%",
    height: 140,
    position: "absolute",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  user_image: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  username: {
    fontFamily: font_family.poppins_semiBold,
    color: colors.background,
    fontSize: 17,
    width: 180,
  },
  user_email: {
    fontFamily: font_family.poppins_medium,
    color: colors.background,
    fontSize: 14,
    width: 180,
  },
  download_icon: {
    width: 20,
    height: 20,
    marginBottom: 5,
    tintColor: "black",
    marginRight: 15,
    marginLeft: 13,
  },
  download_manual: {
    fontFamily: font_family.poppins_medium,
    fontSize: 17,
    marginLeft: 5,
  },
  logout_button_container: {
    position: "absolute",
    bottom: 20,
    borderColor: colors.button,
    borderWidth: 2,
    borderRadius: 10,
    width: "100%",
    paddingVertical: 10,
    justifyContent: "center",
  },
  logout_icon: { width: 25, height: 25, marginRight: 10 },
  logout_text: {
    fontFamily: font_family.poppins_medium,
    color: colors.button,
    fontSize: 15,
  },
});
