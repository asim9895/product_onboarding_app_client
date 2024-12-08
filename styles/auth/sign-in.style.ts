import { StyleSheet } from "react-native";
import { font_family } from "../../theme/font_family";
import { colors } from "../../theme/colors";

export const signInStyles = StyleSheet.create({
  forgot_password_link: {
    fontSize: 14,
    fontFamily: font_family.poppins_medium,
    color: colors.text,
    marginTop: 10,
    textAlign: "right",
  },
});
