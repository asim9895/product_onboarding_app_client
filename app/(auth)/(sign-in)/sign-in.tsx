import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import { images } from "../../../constants/images";
import { globalStyles } from "../../../styles/global.style";
import { authStyles } from "../../../styles/auth/auth.style";
import FormField from "../../../components/form_field/FormField";
import { Formik, FormikValues } from "formik";
import * as Yup from "yup";
import { signInStyles } from "../../../styles/auth/sign-in.style";
import { ErrorToast, SuccessToast } from "../../../helpers/toastMessages";
import { save_user, sign_in_user } from "../../../redux/actions/userActions";
import { useDispatch } from "react-redux";
import { toastConfig } from "../../../toastConfig";
import Toast from "react-native-toast-message";
import Loader from "../../../components/loader/Loader";

const SignInValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const SignIn = () => {
  const [loading, setloading] = useState(false);
  const dispatch: any = useDispatch();
  const onLogin = async (values: FormikValues, resetForm: any) => {
    setloading(true);
    const request: any = await sign_in_user({
      email: values.email,
      password: values.password,
    });

    if (request?.status === 200) {
      SuccessToast("User logged in successfully");
      dispatch(
        save_user(
          request?.data?.Result?.user,
          request?.data?.Token,
          true,
          request?.data?.Result?.user?.ProfilePicture === ""
            ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThMtGQHNaVSjLIqqmMjuPVfZeo68fbWGaLVJ7PcWwDsg&s"
            : request?.data?.Result?.user?.ProfilePicture
        )
      );
      resetForm();
      setTimeout(() => {
        setloading(false);
        resetForm();
        router.push("/dashboard");
      }, 1500);
    } else {
      setloading(false);
      return ErrorToast(request?.data?.Message);
    }
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      {loading && <Loader text="Signing In...." />}
      <View style={{ zIndex: 999 }}>
        <Toast config={toastConfig} />
      </View>
      <ScrollView style={{ marginHorizontal: 20 }}>
        <Text style={authStyles.auth_title}>Log In</Text>
        <Image
          source={images.logo}
          alt="Logo"
          style={authStyles.auth_brand_logo}
        />
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values, { resetForm }) => onLogin(values, resetForm)}
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
            resetForm,
          }) => (
            <View style={{ marginTop: 20 }}>
              <View>
                <FormField
                  title="Email Address"
                  placeholder={"Enter your email address"}
                  value={values.email}
                  handleChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  error={touched.email && errors.email}
                  error_msg={errors.email}
                />
              </View>
              <View style={{ marginTop: 10 }}>
                <FormField
                  title="Password"
                  placeholder={"Enter your password"}
                  value={values.password}
                  handleChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  error={touched.password && errors.password}
                  error_msg={errors.password}
                />
              </View>

              <Link
                style={signInStyles.forgot_password_link}
                onPress={() => resetForm()}
                href={"/forgot-password"}
              >
                Forgot your password?
              </Link>

              <TouchableOpacity
                style={[globalStyles.button_text_container]}
                activeOpacity={0.8}
                onPress={() => handleSubmit()}
                disabled={loading}
              >
                <Text style={globalStyles.button_text}>Log In</Text>
              </TouchableOpacity>
              <Text style={authStyles.auth_redirect_text}>
                Don't have an account?{" "}
                <Link href={"/sign-up"} style={authStyles.auth_redirect_link}>
                  Sign Up
                </Link>
              </Text>
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
