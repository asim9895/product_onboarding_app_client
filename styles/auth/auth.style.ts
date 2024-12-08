import { StyleSheet } from "react-native";
import { font_family } from "../../theme/font_family";
import { colors } from "../../theme/colors";

export const authStyles = StyleSheet.create({
  auth_title: {
    textAlign: "center",
    fontFamily: font_family.poppins_semiBold,
    fontSize: 22,
    marginTop: 30,
  },
  auth_brand_logo: {
    resizeMode: "contain",
    width: "100%",
    height: 200,
    alignSelf: "center",
    marginTop: 20,
  },
  auth_submit_button: {
    fontSize: 16,
    fontFamily: font_family.poppins_medium,
    textAlign: "center",
    width: 200,
    alignSelf: "center",
    color: colors.background,
    borderRadius: 30,
  },
  auth_redirect_text: {
    marginTop: 15,
    fontFamily: font_family.poppins_medium,
    fontSize: 16,
    textAlign: "center",
  },
  auth_redirect_link: { color: colors.button },
});
