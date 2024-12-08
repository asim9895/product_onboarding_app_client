import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { datePickerFieldStyles } from "./date_picker_field.style";
import { globalStyles } from "../../styles/global.style";
import { icons } from "../../constants/icons";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

const incrementDate = (dateInput: any, increment: any) => {
  var dateFormatTotime = new Date(dateInput);
  var increasedDate = new Date(
    dateFormatTotime.getTime() + increment * 86400000
  );
  return increasedDate;
};

const DatePickerField: React.FC<{
  title: string;
  default_date: any;
  item: any;
  value: any;
  setvalue: any;
}> = ({ title, item, value, setvalue, default_date }) => {
  const [date, setdate] = useState(default_date);

  const [showPicker, setshowPicker] = useState(false);
  const toggleDatePicker = () => {
    setshowPicker(!showPicker);
  };

  const onChangeDateAndroid: any = (event: DateTimePickerEvent, date: Date) => {
    const {
      type,
      nativeEvent: { timestamp, utcOffset },
    } = event;

    if (type === "set") {
      const currentDate: any = date;

      setdate(currentDate);

      if (item === null) {
        setvalue(incrementDate(currentDate, 0));
      } else {
        setvalue(incrementDate(currentDate, 1));
      }
      if (Platform.OS === "android") {
        toggleDatePicker();
      }
    } else {
      toggleDatePicker();
    }
  };

  const onChangeDateIOS: any = () => {
    toggleDatePicker();
  };

  return (
    <View>
      {!showPicker && (
        <View style={{ marginTop: 10 }}>
          <Text
            style={[
              datePickerFieldStyles.date_of_availability_title,
              {
                marginBottom: Platform.OS === "ios" ? -10 : -15,
              },
            ]}
            onPress={toggleDatePicker}
          >
            {title}
          </Text>
          <TouchableOpacity
            onPress={toggleDatePicker}
            style={datePickerFieldStyles.date_picker_container}
          >
            <View
              style={[
                globalStyles.row_center,
                datePickerFieldStyles.date_picker_sub_container,
              ]}
            >
              <Text style={datePickerFieldStyles.date_picker_text}>
                {value === "" ? (
                  <Text style={datePickerFieldStyles.select_date_placeholder}>
                    Select Date
                  </Text>
                ) : (
                  JSON.stringify(value)?.split("T")[0].replace('"', "")
                )}
              </Text>
              <Image
                source={icons.calendar}
                style={{ width: 20, height: 20 }}
              />
            </View>
          </TouchableOpacity>
        </View>
      )}
      {showPicker && (
        <DateTimePicker
          mode="date"
          display="spinner"
          value={date}
          onTouchCancel={() => setshowPicker(false)}
          onChange={onChangeDateAndroid}
        />
      )}
      {showPicker && Platform.OS === "ios" && (
        <View style={[globalStyles.row_center, { justifyContent: "center" }]}>
          <TouchableOpacity
            onPress={toggleDatePicker}
            style={datePickerFieldStyles.ios_cancel_button_container}
          >
            <Text style={datePickerFieldStyles.cancel_button_text}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onChangeDateIOS}
            style={datePickerFieldStyles.ios_confirm_button_container}
          >
            <Text style={datePickerFieldStyles.confirm_button_text}>
              Confirm
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default DatePickerField;

const styles = StyleSheet.create({});
