import { StyleSheet } from "react-native";
import { colors } from "../../theme/colors";
import { font_family } from "../../theme/font_family";

export const forgotPasswordStyles = StyleSheet.create({
  root: { flex: 1, padding: 20, paddingTop: 0 },
  title: {
    fontFamily: font_family.poppins_medium,
    color: colors.text_gray,
    fontSize: 14,
    textAlign: "center",
  },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: colors.gray,
    textAlign: "center",
    borderRadius: 5,
  },
  focusCell: {
    borderColor: "#000",
  },
});
