/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
 import React, {Fragment, useEffect} from 'react';
 import {
   SafeAreaView,
   StyleSheet,
   ScrollView,
   View,
   Text,
   StatusBar,
   Platform,
 } from 'react-native';
 import SplashScreen from 'react-native-splash-screen';
 import {
   Header,
   LearnMoreLinks,
   Colors,
   DebugInstructions,
   ReloadInstructions,
 } from 'react-native/Libraries/NewAppScreen';
 import { IntroSlider } from "@pspatel/react-native-app-intro";
 import OnBoardingScreen from './pages/onboard';

 const Screen = ({ title }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{title}</Text>
    </View>
  );
};

 const App = () => {
   useEffect(() => {
     SplashScreen.hide();
   }, []);
 
   return (
       <OnBoardingScreen />
   );
 };
 
 const styles = StyleSheet.create({
   scrollView: {
     backgroundColor: Colors.lighter,
   },
   engine: {
     position: 'absolute',
     right: 0,
   },
   body: {
     backgroundColor: Colors.white,
   },
   sectionContainer: {
     marginTop: 32,
     paddingHorizontal: 24,
   },
   sectionTitle: {
     fontSize: 24,
     fontWeight: '600',
     color: Colors.black,
   },
   sectionDescription: {
     marginTop: 8,
     fontSize: 18,
     fontWeight: '400',
     color: Colors.dark,
   },
   highlight: {
     fontWeight: '700',
   },
   footer: {
     color: Colors.dark,
     fontSize: 12,
     fontWeight: '600',
     padding: 4,
     paddingRight: 12,
     textAlign: 'right',
   },
 });
 
 export default App;
//  const RootStack = createStackNavigator(
//   {
//     Login: Splash,
//     Home: Splash
//   },
//   {
//     initialRouteName: "Login"
//   }
// );

// const AppContainer = createAppContainer(RootStack);

// export default class App extends React.Component {
//   render() {
//     return <AppContainer />;
//   }
// }
// const HomeScreen = ({navigator}) => {
//   return(
//     <Button title = "GO to profile"
//     onPress={() =>
//       nagivation.navigate('Profile',{name:"Jane"})
//     }
//     />
//   )
// }
// const ProfileScreen = ({
//   navigation,route
// }) => {
//   return <Text>This is{route.params.name}</Text>
// }

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 30,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });
