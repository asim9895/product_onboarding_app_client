import {
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../styles/global.style";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { icons } from "../../constants/icons";
import { Formik } from "formik";
import * as Yup from "yup";
import FormField from "../../components/form_field/FormField";
import {
  change_user_password,
  logout_user,
} from "../../redux/actions/userActions";
import Toast from "react-native-toast-message";
import Loader from "../../components/loader/Loader";
import { toastConfig } from "../../toastConfig";
import { ErrorToast, SuccessToast } from "../../helpers/toastMessages";
import { useDispatch, useSelector } from "react-redux";

const SignInValidationSchema = Yup.object().shape({
  old_password: Yup.string().required("Old password is required"),
  new_password: Yup.string()
    .min(6, "Too Short!")
    .max(20, "Too Long!")
    .matches(/\d/, "Atleast one number is required")
    .matches(/[A-Z]+/, "Atleast one capital letter is required")
    .matches(/[\W_]+/, "Atleast one special character is required")
    .required("New password is required"),
});

const ChangePassword = () => {
  const { user_info }: { user_info: any } = useSelector(
    (state: any) => state.user
  );
  const dispatch: any = useDispatch();
  const [loading, setloading] = useState(false);
  const onChangePassword = async (values: any, resetForm: any) => {
    setloading(true);

    const request: any = await change_user_password({
      email: user_info.Email,
      old_password: values?.old_password,
      new_password: values?.new_password,
    });

    if (request?.status === 200) {
      SuccessToast("Password changed successfully, Log in again");
      setTimeout(() => {
        setloading(false);
        resetForm();
        dispatch(logout_user());
        router.navigate("/sign-in");
      }, 1500);
    } else {
      setloading(false);
      ErrorToast(request?.data?.Message);
    }
  };
  return (
    <SafeAreaView style={globalStyles.container}>
      <StatusBar backgroundColor="#ffffff" />
      {loading && <Loader text="Sending Request...." />}
      <View style={{ zIndex: 999 }}>
        <Toast config={toastConfig} />
      </View>
      <SafeAreaView style={[globalStyles.header_container]}>
        <View style={globalStyles.row_center}>
          <TouchableOpacity onPress={() => router.back()}>
            <Image source={icons.back} style={{ width: 25, height: 25 }} />
          </TouchableOpacity>
          <Text style={[globalStyles.header_title, { marginTop: 5 }]}>
            Change Password
          </Text>
        </View>
      </SafeAreaView>

      <ScrollView
        style={{
          marginHorizontal: 20,
          marginTop: Platform.OS === "ios" ? 40 : 60,
        }}
      >
        <Formik
          initialValues={{
            old_password: "",
            new_password: "",
          }}
          onSubmit={(values, { resetForm }) =>
            onChangePassword(values, resetForm)
          }
          validationSchema={SignInValidationSchema}
        >
          {({
            values,
            handleChange,
            errors,
            touched,
            isValid,
            handleSubmit,
            handleBlur,
          }) => (
            <View style={{ marginTop: 20 }}>
              <View style={{ marginTop: 10 }}>
                <FormField
                  title="Old Password"
                  placeholder={"Enter your old password"}
                  value={values.old_password}
                  handleChangeText={handleChange("old_password")}
                  onBlur={handleBlur("old_password")}
                  error={touched.old_password && errors.old_password}
                  error_msg={errors.old_password}
                />
              </View>
              <View style={{ marginTop: 10 }}>
                <FormField
                  title="New Password"
                  placeholder={"Enter your new password"}
                  value={values.new_password}
                  handleChangeText={handleChange("new_password")}
                  onBlur={handleBlur("new_password")}
                  error={touched.new_password && errors.new_password}
                  error_msg={errors.new_password}
                />
              </View>

              <View>
                <TouchableOpacity
                  style={globalStyles.button_text_container}
                  activeOpacity={0.8}
                  onPress={() => handleSubmit()}
                  disabled={loading}
                >
                  <Text style={globalStyles.button_text}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChangePassword;
