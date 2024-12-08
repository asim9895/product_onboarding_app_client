import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../theme/colors";
import { font_family } from "../theme/font_family";

const screen_width = Dimensions.get("window").width;

export const captureImageStyles = StyleSheet.create({
    back_icon: { width: 25, height: 25, tintColor: colors.background },
    camera_container: {
        borderColor: colors.background,
        borderWidth: 3,
        height: 356,
        borderRadius: 5,
        marginHorizontal: 20,
      },
      camera: {
        width: screen_width / 1.135,
        height: 350,
        borderRadius: 5,
        borderColor: colors.background,
        paddingHorizontal: 20,
      },
      camera_icons_container: {
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        marginTop: 15,
        marginHorizontal: 20,
      },
      gallery_flip_camera_icon: {
        width: 35,
        height: 35,
        tintColor: colors.background,
      },
      capture_icon: {
        width: 60,
        height: 60,
        tintColor: colors.background,
      },
      preview_text: {
        color: colors.background,
        fontFamily: font_family.poppins_medium,
        fontSize: 16,
        marginTop: 10,
        marginHorizontal: 20,
      },
      upload_images_button_container: {
        position: "absolute",
        bottom: 0,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      },
      upload_image_button_sub_container: {
        backgroundColor: colors.button,
        borderRadius: 30,
        paddingVertical: 15,
      },
      close_icon: {
        width: 10,
        height: 10,
        tintColor: colors.background,
      },
      image_container: {
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
      image: {
        width: 120,
        height: 120,
        borderRadius: 10,
        marginTop: -40,
      },
      grid_image_container: {
        backgroundColor: colors.text,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: -50,
        zIndex: 10,
        height: 30,
        width: 30,
        alignSelf: "flex-end",
        marginRight: 10,
        borderRadius: 20,
      },
      grid_image: {
        width: "100%",
        height: 356,
        borderRadius: 10,
       
      },
      permission_text: {
        textAlign: "center",
        fontFamily: font_family.poppins_medium,
        fontSize: 16,
      },
      permission_container:  { marginHorizontal: 20, flex: 1, justifyContent: "center" }
})