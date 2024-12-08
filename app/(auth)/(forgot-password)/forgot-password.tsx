import {
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import { globalStyles } from "../../../styles/global.style";
import { authStyles } from "../../../styles/auth/auth.style";
import FormField from "../../../components/form_field/FormField";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { forgotPasswordStyles } from "../../../styles/auth/forgot-password.style";
import {
  send_forgot_password_otp,
  verify_forgot_password_otp,
} from "../../../redux/actions/userActions";
import { ErrorToast, SuccessToast } from "../../../helpers/toastMessages";
import Loader from "../../../components/loader/Loader";
import { toastConfig } from "../../../toastConfig";
import Toast from "react-native-toast-message";

const ForgotPasswordValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Email is required"),
});

const CELL_COUNT = 6;

const ForgotPassword = () => {
  const [value, setValue] = useState("");
  const [otp_sent, setotp_sent] = useState(false);
  const [loading, setloading] = useState(false);
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const onForgotPasswordSendCode = async (values: any, resetForm: any) => {
    setloading(true);
    const request: any = await send_forgot_password_otp({
      email: values.email,
    });

    if (request?.status === 200) {
      setloading(false);
      SuccessToast("OTP sent to registered email address");
      setotp_sent(true);
    } else {
      setloading(false);
      return ErrorToast(request?.data?.Message);
    }
  };

  const onForgotPasswordVerifyCode = async (values: any, resetForm: any) => {
    if (value === "") {
      return ErrorToast("OTP is required");
    }

    if (value?.length < 6) {
      return ErrorToast("OTP must be at least 6 characters");
    }

    const numbered_value = Number(value);
    if (typeof numbered_value !== "number") {
      return ErrorToast("Only numbers are allowed");
    }

    setloading(true);

    console.log({
      email: values.email,
      otp: numbered_value,
    });
    const request: any = await verify_forgot_password_otp({
      email: values.email,
      otp: numbered_value,
    });

    if (request?.status === 200) {
      SuccessToast("OTP verified successfully");
      setValue("");

      setTimeout(() => {
        resetForm();
        setloading(false);
        setotp_sent(false);
        router.push({
          pathname: "/reset-password",
          params: { email: values?.email },
        });
      }, 1500);
    } else {
      setloading(false);
      return ErrorToast(request?.data?.Message);
    }
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      {loading && <Loader text="Processing Request...." />}
      <View style={{ zIndex: 999 }}>
        <Toast config={toastConfig} />
      </View>
      <ScrollView style={{ marginHorizontal: 20 }}>
        <Text style={authStyles.auth_title}>Forgot Password</Text>

        <Formik
          initialValues={{ email: "" }}
          onSubmit={(values, { resetForm }) =>
            otp_sent
              ? onForgotPasswordVerifyCode(values, resetForm)
              : onForgotPasswordSendCode(values, resetForm)
          }
          validationSchema={ForgotPasswordValidationSchema}
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
                  title="Email"
                  placeholder={"Enter your email"}
                  value={values.email}
                  handleChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  error={touched.email && errors.email}
                  error_msg={errors.email}
                />
              </View>

              {otp_sent && (
                <SafeAreaView style={forgotPasswordStyles.root}>
                  <Text style={forgotPasswordStyles.title}>
                    We've sent a code to your email address
                  </Text>
                  <CodeField
                    ref={ref}
                    {...props}
                    // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                    value={value}
                    InputComponent={TextInput}
                    onChangeText={setValue}
                    cellCount={CELL_COUNT}
                    rootStyle={forgotPasswordStyles.codeFieldRoot}
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    // autoComplete={Platform.select({
                    //   android: "sms-otp",
                    //   default: "one-time-code",
                    // })}
                    testID="my-code-input"
                    renderCell={({ index, symbol, isFocused }) => (
                      <Text
                        key={index}
                        style={[
                          forgotPasswordStyles.cell,
                          isFocused && forgotPasswordStyles.focusCell,
                        ]}
                        onLayout={getCellOnLayoutHandler(index)}
                      >
                        {symbol || (isFocused ? <Cursor /> : null)}
                      </Text>
                    )}
                  />
                </SafeAreaView>
              )}
              <TouchableOpacity
                style={[
                  globalStyles.button_text_container,
                  {
                    marginTop: Platform.OS === "ios" && otp_sent ? -15 : 15,
                  },
                ]}
                activeOpacity={0.8}
                onPress={() => handleSubmit()}
                disabled={loading}
              >
                <Text style={globalStyles.button_text}>
                  {otp_sent === false ? "Send OTP" : "Verify OTP"}
                </Text>
              </TouchableOpacity>

              <Text style={authStyles.auth_redirect_text}>
                Remeber Password?{" "}
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

export default ForgotPassword;
