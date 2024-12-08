import { Platform, StyleSheet } from "react-native";
import { colors } from "../theme/colors";
import { font_family } from "../theme/font_family";

export const globalStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  row_center: {
    flexDirection: "row",
    alignItems: "center",
  },
  column_start: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  header_container: {
    height: 90,
    zIndex: 5,
    position: "absolute",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingBottom: -30,
  },
  header_title: {
    fontFamily: font_family.poppins_semiBold,
    fontSize: 18,
    color: colors.text,
    marginLeft: 20,
    height: "100%",
    marginTop: Platform.OS === "ios" ? 0 : 4,
  },
  button_text: {
    fontSize: 16,
    fontFamily: font_family.poppins_medium,
    textAlign: "center",
    width: 200,
    alignSelf: "center",
    color: colors.background,
    borderRadius: 30,
  },
  button_text_container: {
    backgroundColor: colors.button,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    marginTop: 15,
    marginHorizontal: 40,
  },
});
