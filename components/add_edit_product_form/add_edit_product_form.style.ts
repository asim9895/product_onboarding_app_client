import { StyleSheet } from "react-native";
import { font_family } from "../../theme/font_family";
import { colors } from "../../theme/colors";

export const addEditProductFormStyles = StyleSheet.create({
  preview_image_container: {
    backgroundColor: colors.text,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    height: 30,
    width: 30,
    alignSelf: "flex-end",
    marginRight: 10,
    borderRadius: 20,
  },
  close_icon: {
    width: 10,
    height: 10,
    tintColor: colors.background,
  },
  list_image: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginTop: -40,
  },
  preview_text: {
    color: colors.text,
    fontFamily: font_family.poppins_medium,
    fontSize: 16,
    marginTop: 10,
    marginHorizontal: 20,
  },
  take_upload_photo_text: {
    fontFamily: font_family.poppins_medium,
    fontSize: 16,
    color: colors.text,
  },
  camera_icon: { width: 40, height: 40, marginBottom: 10 },
  take_or_upload_photo_container: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.gray,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    borderRadius: 10,
  },
});
