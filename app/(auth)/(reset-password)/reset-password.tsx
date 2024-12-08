import { ScrollView, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router, useLocalSearchParams } from "expo-router";
import { globalStyles } from "../../../styles/global.style";
import { authStyles } from "../../../styles/auth/auth.style";
import FormField from "../../../components/form_field/FormField";
import { Formik } from "formik";
import * as Yup from "yup";
import { ErrorToast, SuccessToast } from "../../../helpers/toastMessages";
import { reset_password } from "../../../redux/actions/userActions";
import Loader from "../../../components/loader/Loader";
import Toast from "react-native-toast-message";
import { toastConfig } from "../../../toastConfig";
import { TouchableOpacity } from "react-native";

const SignUpValidationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Too Short!")
    .max(20, "Too Long!")
    .matches(/\d/, "Atleast one number is required")
    .matches(/[A-Z]+/, "Atleast one capital letter is required")
    .matches(/[\W_]+/, "Atleast one special character is required")
    .required("Password is required"),
  confirm_password: Yup.string().oneOf(
    [Yup.ref("password")],
    "Passwords must match"
  ),
});

const ResetPassword = () => {
  const { email } = useLocalSearchParams();
  const [loading, setloading] = useState(false);
  const onResetPassword = async (values: any, resetForm: any) => {
    if (email === undefined) {
      ErrorToast("Something went wrong, Please restart the process.");
      router.navigate("/forgot-password");
      return;
    }
    setloading(true);
    const request: any = await reset_password({
      email: email,
      password: values?.password,
    });

    if (request?.status === 200) {
      SuccessToast("Password reset successfully");
      resetForm();
      setTimeout(() => {
        setloading(false);
        router.navigate("/sign-in");
      }, 1500);
    } else {
      setloading(false);
      return ErrorToast(request?.data?.Message);
    }
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      {loading && <Loader text="Changing password...." />}
      <View style={{ zIndex: 999 }}>
        <Toast config={toastConfig} />
      </View>
      <ScrollView style={{ marginHorizontal: 20 }}>
        <Text style={authStyles.auth_title}>Reset Password</Text>

        <Formik
          initialValues={{ password: "", confirm_password: "" }}
          onSubmit={(values, { resetForm }) =>
            onResetPassword(values, resetForm)
          }
          validationSchema={SignUpValidationSchema}
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
                  title="New Password"
                  placeholder={"Enter new password"}
                  value={values.password}
                  handleChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  error={touched.password && errors.password}
                  error_msg={errors.password}
                />
              </View>
              <View style={{ marginTop: 10 }}>
                <FormField
                  title="Confirm Password"
                  placeholder={"Enter confirm password"}
                  value={values.confirm_password}
                  handleChangeText={handleChange("confirm_password")}
                  onBlur={handleBlur("confirm_password")}
                  error={touched.confirm_password && errors.confirm_password}
                  error_msg={errors.confirm_password}
                />
              </View>
              <TouchableOpacity
                style={globalStyles.button_text_container}
                activeOpacity={0.8}
                onPress={() => handleSubmit()}
                disabled={loading}
              >
                <Text style={globalStyles.button_text}>Save</Text>
              </TouchableOpacity>

              <Text style={authStyles.auth_redirect_text}>
                Remember Password?{" "}
                <Link href={"/sign-in"} style={authStyles.auth_redirect_link}>
                  Log In
                </Link>
              </Text>
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ResetPassword;
