/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, { Fragment, useEffect } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
// import { createBottomTabNavigator } from 'react-navigation-tabs';
import OnBoardingScreen from './pages/onboard';

import SendOtp from './pages/sendotp'
import VerifyOtp from './pages/verifyotp';

import MyProfile from './pages/profile/profile';
import EditProfile from './pages/profile/editprofile';
import ManageAddress from './pages/profile/manageaddress';

import SelectSpeciality from './pages/doctor/selectspeciality';
import DoctorGallery from './pages/doctor/selectdoctor';

const Onboard = createStackNavigator(
  {
    OnBoard: {
      screen: OnBoardingScreen,
      navigationOptions: {
        headerMode: 'none',
        headerShown: false
      }
    },

  }
)
const OtpStack = createStackNavigator(
  {
    SendOtp: {
      screen: SendOtp,
      navigationOptions: {
        headerShown: false
      }
    },
    VerifyOtp: {
      screen: VerifyOtp,
      navigationOptions: {
        headerShown: false
      }
    }
  }
)

const Profile = createStackNavigator(
  {
    MyProfile: {
      screen: MyProfile,
    },
    EditProfile: {
      screen: EditProfile
    },
    ManageAddress: {
      screen: ManageAddress
    }
  }
)

const Doctor = createStackNavigator(
  {
    SelectSpec:{
      screen:SelectSpeciality
    },
    SelectDoctor:{
      screen:DoctorGallery
    }
  }
)

// const TabStck = createBottomTabNavigator(
//   {
//     Home: Onboard,
//     AskDoctor: OtpStack,
//     Cart: Onboard,
//     Profile: Profile

//   },

// )

const RootStack = createSwitchNavigator(
  {
    OnBoard: Onboard,
    Otp: OtpStack,
    Profile:Profile,
    Doctor:Doctor
  },
  {
    initialRouteName: "OnBoard",
    headerMode: 'none'
  }
)

const App = createAppContainer(RootStack)


export default App;