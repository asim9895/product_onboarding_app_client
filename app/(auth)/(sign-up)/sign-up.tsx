import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import { globalStyles } from "../../../styles/global.style";
import { authStyles } from "../../../styles/auth/auth.style";
import FormField from "../../../components/form_field/FormField";
import { Formik, FormikValues } from "formik";
import * as Yup from "yup";
import { ErrorToast, SuccessToast } from "../../../helpers/toastMessages";
import { sign_up_user } from "../../../redux/actions/userActions";
import Loader from "../../../components/loader/Loader";
import { toastConfig } from "../../../toastConfig";
import Toast from "react-native-toast-message";

const SignUpValidationSchema = Yup.object().shape({
  first_name: Yup.string().required("First Name is required"),
  last_name: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid Email").required("Email is required"),
  password: Yup.string()
    .min(6, "Too Short!")
    .max(20, "Too Long!")
    .matches(/\d/, "Atleast one number is required")
    .matches(/[A-Z]+/, "Atleast one capital letter is required")
    .matches(/[\W_]+/, "Atleast one special character is required")
    .required("Password is required"),
});

const SignUp = () => {
  const [loading, setloading] = useState(false);
  const onRegister = async (values: FormikValues, resetForm: any) => {
    setloading(true);
    const request: any = await sign_up_user({
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      password: values.password,
    });

    if (request?.status === 200) {
      setloading(false);
      SuccessToast("User registered successfully");
      setTimeout(() => {
        setloading(false);
        resetForm();
        router.navigate("/sign-in");
      }, 1500);
    } else {
      setloading(false);
      ErrorToast(request?.data?.Message);
    }
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      {loading && <Loader text="Creating Account...." />}
      <View style={{ zIndex: 999 }}>
        <Toast config={toastConfig} />
      </View>
      <ScrollView style={{ marginHorizontal: 20 }}>
        <Text style={authStyles.auth_title}>Sign Up</Text>

        <Formik
          initialValues={{
            first_name: "",
            last_name: "",
            email: "",
            password: "",
          }}
          onSubmit={(values, { resetForm }) => onRegister(values, resetForm)}
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
              <View>
                <FormField
                  title="First Name"
                  placeholder={"Enter your first name"}
                  value={values.first_name}
                  handleChangeText={handleChange("first_name")}
                  onBlur={handleBlur("first_name")}
                  error={touched.first_name && errors.first_name}
                  error_msg={errors.first_name}
                />
              </View>
              <View style={{ marginTop: 10 }}>
                <FormField
                  title="Last Name"
                  placeholder={"Enter your last name"}
                  value={values.last_name}
                  handleChangeText={handleChange("last_name")}
                  onBlur={handleBlur("last_name")}
                  error={touched.last_name && errors.last_name}
                  error_msg={errors.last_name}
                />
              </View>
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
              <TouchableOpacity
                style={[globalStyles.button_text_container]}
                activeOpacity={0.8}
                onPress={() => handleSubmit()}
                disabled={loading}
              >
                <Text style={globalStyles.button_text}>Sign Up</Text>
              </TouchableOpacity>

              <Text style={authStyles.auth_redirect_text}>
                Already have an account?{" "}
                <Link href={"/sign-in"} style={authStyles.auth_redirect_link}>
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

export default SignUp;
