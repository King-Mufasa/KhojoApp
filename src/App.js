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
import Icon from 'react-native-vector-icons/FontAwesome';
import { View } from 'react-native';
import Colors from './styles/color';
import OnBoardingScreen from './pages/onboard';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import Home from './pages/home';
import SendOtp from './pages/sendotp'
import VerifyOtp from './pages/verifyotp';

import MyProfile from './pages/profile/profile';
import EditProfile from './pages/profile/editprofile';
import ManageAddress from './pages/profile/manageaddress';

import SelectSpeciality from './pages/doctor/selectspeciality';
import DoctorGallery from './pages/doctor/selectdoctor';

import Login from './pages/auth/login';
import ScheduleAppointment from './pages/doctor/bookappointment';


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
    Login: {
      screen: Login
    },
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
    SelectSpec: {
      screen: SelectSpeciality
    },
    SelectDoctor: {
      screen: DoctorGallery
    },
    Schedule: {
      screen: ScheduleAppointment
    }
  }
)

const BottomTabNav = createMaterialBottomTabNavigator(
  {
    HomeScreen: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{ color: tintColor }]} size={25} name={'home'} />
          </View>),
      }
    },
    DoctorScreen: {
      screen: DoctorGallery,
      navigationOptions: {
        tabBarLabel: 'Ask Doctor',
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{ color: tintColor }]} size={25} name={'user-md'} />
          </View>),
      }
      },
      CartScreen: {
        screen: Onboard,
        navigationOptions: {
          tabBarLabel: 'Cart',
          tabBarIcon: ({ tintColor }) => (
            <View>
              <Icon style={[{ color: tintColor }]} size={25} name={'shopping-cart'} />
            </View>),
        }
      },
      ProfileScreen: {
        screen: Profile,
        navigationOptions: {
          tabBarLabel: 'Profile',
          tabBarIcon: ({ tintColor }) => (
            <View>
              <Icon style={[{ color: tintColor }]} size={25} name={'user'} />
            </View>),
        }
      }
    },
  {
    initialRouteName: "HomeScreen",
    activeColor: Colors.primary,
    inactiveColor: Colors.lightdark,
    barStyle: { backgroundColor: Colors.white },
  },

)

const RootStack = createSwitchNavigator(
  {
    OnBoard: Onboard,
    Login:Login,
    Otp: OtpStack,
    Home: BottomTabNav
  },
  {
    initialRouteName: "OnBoard",
    headerMode: 'none'
  }
)

const App = createAppContainer(RootStack)


export default App;