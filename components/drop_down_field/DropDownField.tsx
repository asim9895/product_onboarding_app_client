import { Text, View } from "react-native";
import React from "react";
import SelectDropdown from "react-native-select-dropdown";
import { colors } from "../../theme/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { globalStyles } from "../../styles/global.style";
import { dropDownFieldStyles } from "./drop_down_field.style";

const DropDownField: React.FC<any> = ({
  data,
  setselected_item,
  default_value,
  title,
}) => {
  return (
    <SelectDropdown
      data={data?.length > 0 ? data : []}
      onSelect={(selectedItem, index) => {
        setselected_item(selectedItem);
        console.log(selectedItem, index);
      }}
      dropdownOverlayColor={"transparent"}
      defaultValue={default_value}
      renderButton={(selectedItem, isOpened) => {
        return (
          <View>
            <Text style={dropDownFieldStyles.title}>{title}</Text>
            <View
              style={[
                globalStyles.row_center,
                dropDownFieldStyles.dropdown_container,
              ]}
            >
              <Text
                style={[
                  dropDownFieldStyles.selected_item_text,
                  { color: selectedItem ? colors.text : colors.text_gray },
                ]}
              >
                {(selectedItem && selectedItem.title) ||
                  `Select your ${title} `}
              </Text>
              <MaterialCommunityIcons
                name={isOpened ? "chevron-up" : "chevron-down"}
                style={dropDownFieldStyles.drop_icon}
              />
            </View>
          </View>
        );
      }}
      renderItem={(item, index, isSelected) => {
        return (
          <View
            style={[
              dropDownFieldStyles.content_container,
              {
                backgroundColor: isSelected ? colors.button : colors.background,
              },
            ]}
          >
            <Text
              style={[
                dropDownFieldStyles.content_title,
                { color: isSelected ? colors.background : colors.text },
              ]}
            >
              {item.title}
            </Text>
          </View>
        );
      }}
      showsVerticalScrollIndicator={false}
      dropdownStyle={dropDownFieldStyles.content_high_container}
    />
  );
};

export default DropDownField;
