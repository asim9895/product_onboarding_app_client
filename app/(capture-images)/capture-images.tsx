import {
  Image,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ScrollView,
  Platform,
} from "react-native";
import React, { useRef, useState } from "react";
import { globalStyles } from "../../styles/global.style";
import { StatusBar } from "expo-status-bar";
import { router, useLocalSearchParams } from "expo-router";
import { icons } from "../../constants/icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../theme/colors";
import { authStyles } from "../../styles/auth/auth.style";
import EmptyProductList from "../../components/empty_product_list/EmptyProductList";
import * as ImagePicker from "expo-image-picker";
import { ErrorToast, SuccessToast } from "../../helpers/toastMessages";
import { upload_single_image } from "../../redux/actions/imageActions";
import Loader from "../../components/loader/Loader";
import Toast from "react-native-toast-message";
import { toastConfig } from "../../toastConfig";
import * as ImageManipulator from "expo-image-manipulator";
import { captureImageStyles } from "../../styles/capture-images.style";

const CaptureImages = () => {
  const { mode }: any = useLocalSearchParams();
  const [facing, setFacing]: any = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const ref: any = useRef(null);
  const [photoes, setphotoes]: any = useState([]);
  const [display_mode, setdisplay_mode] = useState("capture");
  const [loading, setloading] = useState(false);

  const remove_image = (uri: string) => {
    setphotoes(
      photoes.filter((photo: any) => {
        return photo?.uri !== uri;
      })
    );
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      const final = result?.assets?.map((photo) => {
        return {
          uri: photo?.uri,
          base64: `data:image/jpg;base64,${photo?.base64}`,
        };
      });

      setphotoes([...photoes, final].flat());
    }
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

  const upload_images = async () => {
    if (photoes?.length === 0) {
      return ErrorToast("Please select atleast one image");
    }
    let formData: any = new FormData();

    const new_data: any = await Promise.all(
      photoes.length > 0
        ? photoes.map(async (photo: any) => {
            let updated_url = await resizeImage(photo?.uri, 1920, 1080);

            return {
              resized_uri: updated_url?.uri,
              width: updated_url?.width,
              height: updated_url?.height,
              file_name: updated_url?.uri?.split("ImageManipulator/")[1],
              type:
                "image/" +
                updated_url?.uri?.split("ImageManipulator/")[1]?.split(".")[1],
            };
          })
        : []
    );

    new_data?.map(async (photo: any, index: any) => {
      await formData.append(`${photo?.file_name}`, {
        uri: photo?.resized_uri,
        name: photo?.file_name,
        type: photo?.type,
      });
    });
    setloading(true);
    let request = await upload_single_image({ formData });

    if (request?.status === 200) {
      setloading(false);
      SuccessToast("Images uploaded Successfully");
      setphotoes([]);

      setTimeout(() => {
        router.navigate({
          pathname: mode === "edit" ? "/edit-product" : "/create-product",
          params: { images: request?.data?.UploadedUrls },
        });
      }, 1500);
    } else {
      setloading(false);
      return ErrorToast("Something went wrong, try again");
    }
  };

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={[captureImageStyles.permission_container]}>
        <Text style={captureImageStyles.permission_text}>
          We need your permission to show the camera
        </Text>
        <TouchableOpacity
          onPress={requestPermission}
          style={globalStyles.button_text_container}
        >
          <Text style={globalStyles.button_text}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current: any) => (current === "back" ? "front" : "back"));
  }

  const _takePhoto = async () => {
    const shot: any = await ref.current.takePictureAsync({
      base64: true,
      quality: 1,
      skipProcessing: true,
    });

    setphotoes([
      ...photoes,
      {
        uri: shot?.uri,
        base64: `data:image/jpg;base64,${shot?.base64}`,
      },
    ]);
  };

  return (
    <SafeAreaView
      style={[globalStyles.container, { backgroundColor: colors.text }]}
    >
      <StatusBar backgroundColor="#ffffff" />

      {loading && <Loader text="Uploading Images...." />}

      <View style={{ zIndex: 999 }}>
        <Toast config={toastConfig} />
      </View>
      {display_mode === "capture" ? (
        <SafeAreaView
          style={[
            globalStyles.header_container,
            { backgroundColor: colors.text },
          ]}
        >
          <View style={globalStyles.row_center}>
            <TouchableOpacity onPress={() => router.back()}>
              <Image source={icons.back} style={captureImageStyles.back_icon} />
            </TouchableOpacity>
            <Text
              style={[
                globalStyles.header_title,
                {
                  marginTop: Platform.OS === "ios" ? 0 : 5,
                  color: colors.background,
                },
              ]}
            >
              Capture Images
            </Text>
          </View>
          <TouchableOpacity onPress={() => setdisplay_mode("grid")}>
            <Image
              source={icons.grid}
              style={{ width: 30, height: 30, tintColor: colors.background }}
            />
          </TouchableOpacity>
        </SafeAreaView>
      ) : (
        <SafeAreaView
          style={[
            globalStyles.header_container,
            { backgroundColor: colors.text },
          ]}
        >
          <View style={globalStyles.row_center}>
            <TouchableOpacity onPress={() => setdisplay_mode("capture")}>
              <Image source={icons.back} style={captureImageStyles.back_icon} />
            </TouchableOpacity>
            <Text
              style={[
                globalStyles.header_title,
                {
                  marginTop: Platform.OS === "ios" ? 0 : 5,
                  color: colors.background,
                },
              ]}
            >
              Photoes
            </Text>
          </View>
        </SafeAreaView>
      )}

      {display_mode === "capture" && (
        <>
          <ScrollView
            style={{ marginTop: 80, marginBottom: 90 }}
            showsVerticalScrollIndicator={false}
          >
            <View style={captureImageStyles.camera_container}>
              <CameraView
                style={captureImageStyles.camera}
                facing={facing}
                ref={ref}
              ></CameraView>
            </View>

            <View style={captureImageStyles.camera_icons_container}>
              <TouchableOpacity onPress={pickImage}>
                <Image
                  source={icons.gallery}
                  style={captureImageStyles.gallery_flip_camera_icon}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={_takePhoto}>
                <Image
                  source={icons.capture}
                  style={{
                    width: 60,
                    height: 60,
                    tintColor: colors.background,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleCameraFacing}>
                <Image
                  source={icons.flip_camera}
                  style={captureImageStyles.gallery_flip_camera_icon}
                />
              </TouchableOpacity>
            </View>

            {photoes?.length > 0 && (
              <Text style={captureImageStyles.preview_text}>Preview</Text>
            )}
            <FlatList
              style={{ marginTop: 10, marginBottom: 80 }}
              data={photoes}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item?.uri}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return (
                  <View
                    style={{
                      flex: 1,
                      marginTop: 10,
                      marginLeft: index === 0 ? 20 : 10,
                      marginRight:
                        photoes[photoes?.length - 1]?.uri === item?.uri
                          ? 20
                          : 10,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => remove_image(item?.uri)}
                      style={captureImageStyles.image_container}
                    >
                      <Image
                        source={icons.close}
                        style={captureImageStyles.close_icon}
                      />
                    </TouchableOpacity>
                    <Image
                      source={{ uri: item?.base64 }}
                      style={captureImageStyles.image}
                    />
                  </View>
                );
              }}
            />
          </ScrollView>

          <TouchableOpacity
            style={[
              captureImageStyles.upload_images_button_container,
              {
                height: Platform.OS === "ios" ? 180 : 100,
              },
            ]}
            onPress={upload_images}
          >
            <View
              style={[
                captureImageStyles.upload_image_button_sub_container,
                {
                  marginBottom: Platform.OS === "ios" ? 100 : 30,
                },
              ]}
            >
              <Text style={[authStyles.auth_submit_button, { marginTop: 0 }]}>
                Upload Images
              </Text>
            </View>
          </TouchableOpacity>
        </>
      )}

      {display_mode === "grid" && (
        <View style={{ marginHorizontal: 20 }}>
          <FlatList
            data={photoes}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item?.uri}
            renderItem={({ item, index }) => {
              return (
                <View style={{ marginTop: index === 0 ? 110 : 50 }}>
                  <TouchableOpacity
                    onPress={() => remove_image(item?.uri)}
                    style={captureImageStyles.grid_image_container}
                  >
                    <Image
                      source={icons.close}
                      style={captureImageStyles.close_icon}
                    />
                  </TouchableOpacity>
                  <Image
                    source={{ uri: item?.base64 }}
                    style={[
                      captureImageStyles.grid_image,
                      {
                        marginBottom:
                          photoes[photoes?.length - 1]?.uri === item?.uri
                            ? 20
                            : 0,
                      },
                    ]}
                  />
                </View>
              );
            }}
            ListEmptyComponent={() => (
              <EmptyProductList
                loading={false}
                empty_message="No photoes found"
                loading_message="Fetching products..."
              />
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default CaptureImages;
