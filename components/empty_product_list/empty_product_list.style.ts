import { StyleSheet } from "react-native";
import { colors } from "../../theme/colors";
import { font_family } from "../../theme/font_family";

export const emptyProductListStyles = StyleSheet.create({
    list_container:  {
        justifyContent: "center",
        alignItems: "center",
        height: 400,
        marginTop: 50,
      },
      content_container:  {
        justifyContent: "center",
        alignItems: "center",
      },
      loading_empty_message: {
        color: colors.text,
        fontSize: 14,
        fontFamily: font_family.poppins_medium,
        marginTop: 20,
      }
     
})