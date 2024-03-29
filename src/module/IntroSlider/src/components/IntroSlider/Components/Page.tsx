import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageSourcePropType,
  TextStyle,
  StyleProp,
  ImageStyle,
  ViewStyle,
} from "react-native";
import { If } from "../../index";
import { Colors, normalize, screenHeight, screenWidth } from "../../../themes";
import Fontsize from '../../../../../../styles/fontsize';
interface PageProps {
  title: string;
  image: ImageSourcePropType;
  description?: string;
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  descriptionStyle?: StyleProp<TextStyle>;
}

export const Page = (props: PageProps) => {
  const {
    title,
    image,
    description,
    containerStyle,
    titleStyle,
    imageStyle,
    descriptionStyle,
  } = props;
  return (
    <View style={[styles.container]}>
      
      <Image source={image} style={[styles.image, imageStyle]} />
      <Text style={[styles.title, titleStyle,Fontsize.small]}>{title}</Text>
      <If condition={Boolean(description)}>
        <Text style={[styles.description, descriptionStyle,Fontsize.mini]}>
          {description}
        </Text>
      </If>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor:Colors.white,
  },
  title: {
    color:Colors.primary,
    textAlign: "center",
    fontSize: normalize(18),
    fontWeight: "800",
  },
  image: {
    alignSelf: "center",
    resizeMode: "contain",
    width:screenWidth * 0.5,
    height:screenHeight * 0.4
  },
  description: {
    marginTop:10,
    textAlign: "center",
    fontSize: normalize(13),
    lineHeight: normalize(18),
    paddingHorizontal: normalize(12),
    color:Colors.lightdark
  },
});
