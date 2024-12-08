import { StyleSheet } from "react-native";
import { font_family } from "../../theme/font_family";
import { colors } from "../../theme/colors";

export const datePickerFieldStyles = StyleSheet.create({
    date_of_availability_title: {
        fontFamily: font_family.poppins_medium,
        fontSize: 14,
        zIndex: 1,
        left: 15,
        backgroundColor: colors.background,
        alignSelf: "flex-start",
        paddingHorizontal: 5,
        color: colors.text,
      },
      date_picker_container: {
        height: 55,
        borderWidth: 1,
        borderColor: colors.gray,
        width: "100%",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
      },
      date_picker_sub_container:  {
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
      },
      date_picker_text: {
        textAlign: "center",
        fontFamily: font_family.poppins_medium,
        fontSize: 15,
        color: colors.text,
      },
      select_date_placeholder: {
        textAlign: "center",
        fontFamily: font_family.poppins_medium,
        fontSize: 15,
        color: colors.text_gray,
      },
      ios_cancel_button_container: {
        backgroundColor: colors.gray,
        padding: 10,
        borderRadius: 10,
      },
      cancel_button_text: {
        color: colors.text,
        fontFamily: font_family.poppins_medium,
        fontSize: 15,
      },
      ios_confirm_button_container: {
        backgroundColor: colors.button,
        padding: 10,
        borderRadius: 10,
        marginLeft: 20,
      },
      confirm_button_text: {
        color: colors.background,
        fontFamily: font_family.poppins_medium,
        fontSize: 15,
      },
})