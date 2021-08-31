/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
 import React, {Fragment, useEffect} from 'react';
 import SplashScreen from 'react-native-splash-screen';
 import OnBoardingScreen from './pages/onboard';
 import SendOtp from './pages/sendotp'
 import VerifyOtp from './pages/verifyotp';
 const Skip = ()=>{
   alert("KILL");
 }

 const App = () => {
   
   useEffect(() => {
     SplashScreen.hide();
   }, []);
 
   return (
      //  <OnBoardingScreen skip={Skip}/>
      // <SendOtp />
      <VerifyOtp />
   );
 };
 
 
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
