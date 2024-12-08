import { Platform, Text, View } from "react-native";
import { colors } from "./theme/colors";
import { font_family } from "./theme/font_family";

export const toastConfig: any = {
  success: ({ text1, props }: { text1: string; props: any }) => (
    <View
      style={{
        backgroundColor: colors.gray,
        marginHorizontal: 20,
        marginTop: 40,
        justifyContent: "center",
        alignItems: "flex-start",
        borderRadius: 5,
        zIndex: 99,
        borderLeftColor: "teal",
        borderLeftWidth: 3,
        padding: 15,
      }}
    >
      <Text
        style={{
          color: colors.text,
          fontFamily: font_family.poppins_bold,
          fontSize: 15,
          marginBottom: 5,
        }}
      >
        Success
      </Text>
      <Text
        style={{
          color: colors.text,
          fontFamily: font_family.poppins_medium,
          fontSize: 15,
          textAlign: "center",
        }}
      >
        {text1}
      </Text>
    </View>
  ),

  error: ({ text1, props }: { text1: string; props: any }) => (
    <View
      style={{
        backgroundColor: colors.gray,
        marginHorizontal: 20,
        marginTop: 40,
        justifyContent: "center",
        alignItems: "flex-start",
        borderRadius: 5,
        zIndex: 99,
        borderLeftColor: "crimson",
        borderLeftWidth: 3,
        padding: 15,
      }}
    >
      <Text
        style={{
          color: colors.text,
          fontFamily: font_family.poppins_bold,
          fontSize: 15,
          marginBottom: 5,
        }}
      >
        Error
      </Text>
      <Text
        style={{
          color: colors.text,
          fontFamily: font_family.poppins_medium,
          fontSize: 15,
          textAlign: "center",
        }}
      >
        {text1}
      </Text>
    </View>
  ),
};
