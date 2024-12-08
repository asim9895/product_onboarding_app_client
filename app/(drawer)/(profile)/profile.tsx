import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import { globalStyles } from "../../../styles/global.style";
import { icons } from "../../../constants/icons";
import { colors } from "../../../theme/colors";
import { StatusBar } from "expo-status-bar";
import { useDispatch, useSelector } from "react-redux";
import {
  change_profile_pic,
  logout_user,
  update_profile_pic,
} from "../../../redux/actions/userActions";
import Toast from "react-native-toast-message";
import { toastConfig } from "../../../toastConfig";
import { ErrorToast, SuccessToast } from "../../../helpers/toastMessages";
import Loader from "../../../components/loader/Loader";
import * as ImagePicker from "expo-image-picker";
import { upload_single_image } from "../../../redux/actions/imageActions";
import * as ImageManipulator from "expo-image-manipulator";
import { profileStyles } from "../../../styles/drawer/profile.style";

const Profile = () => {
  const [logout_loading, setlogout_loading] = useState(false);
  const { user_info, profile_pic }: { user_info: any; profile_pic: string } =
    useSelector((state: any) => state.user);
  const [loading, setloading] = useState(false);
  const dispatch: any = useDispatch();

  const navigation = useNavigation();
  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer);
  };

  const resizeImage = async (uri: any, width: number, height: number) => {
    const manipResult = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width, height } }],
      { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
    );

    return {
      uri: manipResult?.uri,
      width: manipResult?.width,
      height: manipResult?.height,
    };
  };

  const pickImage = async () => {
    let formData: any = new FormData();
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      let updated_url = await resizeImage(result?.assets[0]?.uri, 1920, 1080);

      formData.append("img", {
        uri: updated_url?.uri,
        name: updated_url?.uri?.split("ImageManipulator/")[1],
        type: result?.assets[0]?.mimeType,
      });
      setloading(true);
      let request = await upload_single_image({ formData });

      if (request?.status === 200) {
        setloading(true);
        let update_profile_picture = await update_profile_pic({
          user_id: user_info?.UserID,
          profile_pic: request?.data?.UploadedUrls[0],
        });

        if (update_profile_picture?.status === 200) {
          setloading(false);
          dispatch(change_profile_pic(request?.data?.UploadedUrls[0]));

          SuccessToast("Profile pic uploaded Successfully");
        } else {
          setloading(false);
          return ErrorToast("Image update failed");
        }
      } else {
        setloading(false);
        return ErrorToast("Something went wrong, try again");
      }
    }
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      {loading && <Loader text="Changing profile picture...." />}
      {logout_loading && <Loader text="Logging out...." />}
      <View style={{ zIndex: 999 }}>
        <Toast config={toastConfig} />
      </View>
      <StatusBar backgroundColor={"#ffffff"} style="light" />
      <SafeAreaView
        style={[
          globalStyles.header_container,
          { backgroundColor: colors.button },
        ]}
      >
        <View style={globalStyles.row_center}>
          <TouchableOpacity onPress={openDrawer}>
            <Image source={icons.drawer} style={profileStyles.drawer_icon} />
          </TouchableOpacity>
          <Text
            style={[globalStyles.header_title, { color: colors.background }]}
          >
            Profile
          </Text>
        </View>
        <View style={globalStyles.row_center}>
          <TouchableOpacity
            onPress={() => {
              setlogout_loading(true);
              dispatch(logout_user());

              SuccessToast("Logged out successfully");
              setTimeout(() => {
                setlogout_loading(false);
                router.navigate("/sign-in");
              }, 1500);
            }}
          >
            <Image source={icons.logout} style={profileStyles.logout_icon} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <View style={profileStyles.image_container}>
        <TouchableOpacity
          style={profileStyles.pencil_icon_container}
          onPress={pickImage}
        >
          <Image source={icons.pencil} style={profileStyles.pencil_icon} />
        </TouchableOpacity>
        <Image
          source={{
            uri: profile_pic,
          }}
          style={profileStyles.profile_image}
        />
      </View>
      <View style={profileStyles.details_container}>
        <Text style={profileStyles.first_last_name} numberOfLines={1}>
          {user_info?.FirstName} {user_info?.LastName}
        </Text>
        <Text style={profileStyles.email} numberOfLines={1}>
          {user_info?.Email}
        </Text>
      </View>

      <View style={{ marginTop: 30 }}>
        <Text style={profileStyles.link_item}>FAQ?</Text>
        <Text style={profileStyles.link_item}>Download Manual</Text>
        <Text
          onPress={() => router.navigate("/change-password")}
          style={profileStyles.link_item}
        >
          Change Password
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
