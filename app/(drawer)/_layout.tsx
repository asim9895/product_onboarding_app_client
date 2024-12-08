import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Drawer } from "expo-router/drawer";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { font_family } from "../../theme/font_family";
import { icons } from "../../constants/icons";
import { colors } from "../../theme/colors";
import { globalStyles } from "../../styles/global.style";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { logout_user } from "../../redux/actions/userActions";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import { toastConfig } from "../../toastConfig";
import { drawerStyles } from "../../styles/drawer/drawer.style";

const CustomDrawer = (props: any) => {
  const { user_info, profile_pic }: { user_info: any; profile_pic: string } =
    useSelector((state: any) => state.user);
  const dispatch: any = useDispatch();

  return (
    <SafeAreaView style={globalStyles.container}>
      <SafeAreaView style={drawerStyles.user_info_container}>
        <View style={[globalStyles.row_center]}>
          <Image
            source={{
              uri: profile_pic,
            }}
            style={drawerStyles.user_image}
          />
          <View style={[globalStyles.column_start]}>
            <Text style={drawerStyles.username} numberOfLines={1}>
              {user_info?.FirstName} {user_info?.LastName}
            </Text>
            <Text style={drawerStyles.user_email} numberOfLines={1}>
              {user_info?.Email}
            </Text>
          </View>
        </View>
      </SafeAreaView>
      <DrawerContentScrollView
        {...props}
        scrollEnabled={false}
        style={{ marginTop: Platform.OS === "ios" ? 50 : 100 }}
      >
        <DrawerItemList {...props} />
        <SafeAreaView
          style={[
            {
              marginHorizontal: 20,
              marginTop: Platform.OS === "ios" ? -30 : -10,
            },
            globalStyles.row_center,
          ]}
        >
          <Image source={icons.downloads} style={drawerStyles.download_icon} />
          <Text style={drawerStyles.download_manual}>Download Manual</Text>
        </SafeAreaView>
      </DrawerContentScrollView>

      <View style={{ marginHorizontal: 20 }}>
        <TouchableOpacity
          onPress={() => {
            dispatch(logout_user());
            router.push("/sign-in");
          }}
          style={[
            drawerStyles.logout_button_container,
            globalStyles.row_center,
          ]}
        >
          <Image source={icons.logout} style={drawerStyles.logout_icon} />
          <Text style={drawerStyles.logout_text}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const AuthLayout = () => {
  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer
          screenOptions={{
            headerShown: false,
            drawerActiveBackgroundColor: colors.button,
            drawerActiveTintColor: "#fff",
            drawerInactiveTintColor: colors.text,
            drawerInactiveBackgroundColor: colors.background,
            drawerLabelStyle: {
              fontFamily: font_family.poppins_medium,
              fontSize: 17,
              marginLeft: -10,
            },
          }}
          drawerContent={CustomDrawer}
        >
          <Drawer.Screen
            name="(dashboard)/dashboard" // This is the name of the page and must match the url from root
            options={{
              drawerLabel: "Dashboard",
              headerTitle: "Dashboard",
              headerTitleStyle: {
                fontFamily: font_family.poppins_semiBold,
                fontSize: 18,
              },

              drawerIcon: ({ focused }) => {
                return (
                  <Image
                    source={icons.home}
                    style={{
                      width: 20,
                      height: 20,
                      marginBottom: 5,
                      tintColor: focused ? "white" : "black",
                      marginLeft: 15,
                    }}
                  />
                );
              },
            }}
          />
          <Drawer.Screen
            name="(products)/products" // This is the name of the page and must match the url from root
            options={{
              drawerLabel: "Products",
              headerTitle: "Products",
              headerTitleStyle: {
                fontFamily: font_family.poppins_semiBold,
                fontSize: 18,
              },

              drawerIcon: ({ focused }) => {
                return (
                  <Image
                    source={icons.products}
                    style={{
                      width: 20,
                      height: 20,
                      marginBottom: 5,
                      tintColor: focused ? "white" : "black",
                      marginLeft: 15,
                    }}
                  />
                );
              },
            }}
          />
          <Drawer.Screen
            name="(profile)/profile" // This is the name of the page and must match the url from root
            options={{
              drawerLabel: "Profile",
              headerTitle: "Profile",
              headerTitleStyle: {
                fontFamily: font_family.poppins_semiBold,
                fontSize: 18,
              },
              drawerIcon: ({ focused }) => {
                return (
                  <Image
                    source={icons.profile}
                    style={{
                      width: 20,
                      height: 20,
                      marginBottom: 5,
                      tintColor: focused ? "white" : "black",
                      marginLeft: 15,
                    }}
                  />
                );
              },
            }}
          />
          <Drawer.Screen
            name="(faqs)/faqs" // This is the name of the page and must match the url from root
            options={{
              drawerLabel: "FAQS",
              headerTitle: "FAQS",
              headerTitleStyle: {
                fontFamily: font_family.poppins_semiBold,
                fontSize: 18,
              },

              drawerIcon: ({ focused }) => {
                return (
                  <Image
                    source={icons.faq}
                    style={{
                      width: 20,
                      height: 20,
                      marginBottom: 5,
                      tintColor: focused ? "white" : "black",
                      marginLeft: 15,
                    }}
                  />
                );
              },
            }}
          />
        </Drawer>
      </GestureHandlerRootView>
      <Toast config={toastConfig} />
      <StatusBar backgroundColor="#ffffff" style="light" />
    </>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({});
