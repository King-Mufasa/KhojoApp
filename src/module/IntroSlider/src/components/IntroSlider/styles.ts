import { StyleSheet } from "react-native";
import colors from "../../../../../styles/color";
import { screenWidth } from "../../themes";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colors.white
  },
  childWrapper: {
    flex: 1,
    width: screenWidth,
    height: "100%",
  },
});
