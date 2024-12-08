import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { colors } from "../../theme/colors";
import { font_family } from "../../theme/font_family";

const Loader: React.FC<{ text: string }> = ({ text }) => {
  return (
    <View
      style={{
        position: "absolute",
        flex: 1,
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        backgroundColor: "lightgrey",
        opacity: 0.5,
      }}
    >
      <ActivityIndicator size={"large"} color={colors.button} />
      <Text
        style={{
          color: colors.text,
          fontSize: 14,
          fontFamily: font_family.poppins_medium,
          marginTop: 20,
        }}
      >
        {text}
      </Text>
    </View>
  );
};

export default Loader;
