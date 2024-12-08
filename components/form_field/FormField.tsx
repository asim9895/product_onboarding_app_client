import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../../theme/colors";
import { icons } from "../../constants/icons";
import { formFieldStyles } from "./form_field.style";

const FormField: React.FC<any> = ({
  value,
  placeholder,
  handleChangeText,
  title,
  handleBlurText,
  error,
  error_msg,
  input_mode,
  default_value,
}) => {
  const [showPassword, setshowPassword] = useState(false);
  return (
    <View>
      <Text style={[formFieldStyles.title]}>{title}</Text>
      <View
        style={[
          formFieldStyles.text_input_container,
          {
            borderColor: error ? "crimson" : colors.gray,
          },
        ]}
      >
        <TextInput
          defaultValue={default_value}
          inputMode={input_mode}
          className="flex-1 text-white font-psemibold text-base w-full"
          style={formFieldStyles.text_input}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={colors.text_gray}
          onChangeText={handleChangeText}
          secureTextEntry={title.includes("Password") && !showPassword}
          onBlur={handleBlurText}
        />
        {title?.includes("Password") && (
          <TouchableOpacity onPress={() => setshowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eye_hide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={formFieldStyles.error_msg}>{error_msg}</Text>}
    </View>
  );
};

export default FormField;

const styles = StyleSheet.create({});
