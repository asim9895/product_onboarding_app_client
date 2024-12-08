import { StyleSheet } from "react-native";
import { colors } from "../../theme/colors";
import { font_family } from "../../theme/font_family";

export const profileStyles = StyleSheet.create({
    drawer_icon: { width: 25, height: 25, tintColor: colors.background },
    logout_icon: {
        width: 20,
        height: 20,
        tintColor: colors.background,
      },
      profile_image: {
        width: 140,
        height: 140,
        borderRadius: 70,
        borderColor: colors.background,
        borderWidth: 1.5,
        resizeMode: "cover",
        marginTop: -85,
      },
      details_container: { marginTop: 70, alignItems: "center" },
      first_last_name: {
        fontFamily: font_family.poppins_semiBold,
        fontSize: 22,
        color: colors.text,
        width: 300,
        textAlign: "center",
        textTransform: "capitalize",
      },
      email: {
        fontFamily: font_family.poppins_medium,
        fontSize: 16,
        color: colors.text,
        width: 300,
        textAlign: "center",
      },
      link_item: {
        fontFamily: font_family.poppins_medium,
        color: colors.text,
        fontSize: 17,
        marginHorizontal: 20,
        marginVertical: 10,
      },
      pencil_icon_container: {
        height: 30,
        width: 30,
        backgroundColor: colors.text,
        borderRadius: 30,
        marginTop: 185,
        zIndex: 10,
        marginLeft: 140,
        alignItems: "center",
        justifyContent: "center",
      },
      pencil_icon: {
        width: 10,
        height: 10,
        tintColor: colors.background,
      },
      image_container: {
        marginTop: 43,
        backgroundColor: colors.button,
        height: 200,
        alignItems: "center",
        marginBottom: 20
      }
})