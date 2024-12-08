import { useRef, useState } from "react";

import { Dimensions, Image, View, Animated } from "react-native";
import { colors } from "../../theme/colors";

const window_width = Dimensions.get("window").width;

const ImageCarouselItem: React.FC<any> = ({ item }) => {
  return (
    <View
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={{ uri: item }}
        style={{
          width: window_width / 1.1,
          height: 300,
          overflow: "hidden",
          borderRadius: 33,
        }}
        resizeMode="cover"
      />
    </View>
  );
};

const ImageCarousel: React.FC<any> = ({ images }) => {
  const [current_index, setcurrent_index] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const viewableItemsChanged: any = useRef(
    ({ viewableItems }: { viewableItems: any }) => {
      setcurrent_index(viewableItems[0]?.index);
    }
  ).current;
  const slideRef: any = useRef(null);
  const viewConfig: any = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;
  return (
    <View>
      <Animated.FlatList
        data={images}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        bounces={false}
        renderItem={({ item }) => (
          <View style={{ width: window_width }}>
            <ImageCarouselItem item={item} />
          </View>
        )}
        pagingEnabled
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        ref={slideRef}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        scrollEventThrottle={32}
      />
      <View
        style={{
          flexDirection: "row",
          height: 64,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {images?.map((_: any, i: any) => {
          const input_range = [
            (i - 1) * window_width,
            i * window_width,
            (i + 1) * window_width,
          ];
          const dotWidth = scrollX.interpolate({
            inputRange: input_range,
            outputRange: [10, 30, 10],
            extrapolate: "clamp",
          });
          const backgroundColor = scrollX.interpolate({
            inputRange: input_range,
            outputRange: [colors.text_gray, colors.button, colors.text_gray],
            extrapolate: "clamp",
          });
          return (
            <Animated.View
              key={i.toString()}
              style={{
                height: 10,
                borderRadius: 5,
                backgroundColor: backgroundColor,
                marginHorizontal: 3,
                width: dotWidth,
              }}
            ></Animated.View>
          );
        })}
      </View>
    </View>
  );
};

export default ImageCarousel;
