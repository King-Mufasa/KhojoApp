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
import { View, Image } from 'react-native';
import Colors from './styles/color';
import Images from './styles/images';
import OnBoardingScreen from './pages/onboard';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import HomeButton from './components/home';
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

import PathologyGallery from './pages/pathology/selectlabs';
import PharmacyGallery from './pages/pharmacy/selectpharmacy';
import PathologyDetail from './pages/pathology/pathology';
import PharmacyDetail from './pages/pharmacy/pharmacy';
import OrderMenu from './pages/order/ordermenu';
import RequestList from './pages/order/request';
import OrderList from './pages/order/orderlist';
import Register from './pages/auth/register';
import Notification from './pages/util/notification';
import OrderDetail from './pages/order/detail';
import AppointmentList from './pages/appointment/appointmentlist';
import ManagePatient from './pages/profile/managepatient';

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
      screen: Login,
      navigationOptions: {
        headerShown: false
      }
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
    },
    Register:{
      screen: Register,
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
    },
    ManagePatient:{
      screen: ManagePatient
    },
    Notification:{
      screen:Notification
    }
  }
)

const Doctor = createStackNavigator(
  {
    SelectSpec: {
      screen: SelectSpeciality,
      navigationOptions: ({ navigation }) => ({
        headerLeft: () =>
          <HomeButton click={navigation} />
      })
    },
    SelectDoctor: {
      screen: DoctorGallery
    },
    Schedule: {
      screen: ScheduleAppointment
    },
    // SelectLabs:{
    //   screen:PathologyGallery
    // }
  }
)

const Pahology = createStackNavigator(
  {
    SelectLabs: {
      screen: PathologyGallery,
      navigationOptions: ({ navigation }) => ({
        headerLeft: () =>
          <HomeButton click={navigation} />
      })
    },
    PathologyDetail: {
      screen: PathologyDetail
    }
  }
)

const Pharmacy = createStackNavigator(
  {
    SelectPharmacy: {
      screen: PharmacyGallery,
      navigationOptions: ({ navigation }) => ({
        headerLeft: () =>
          <HomeButton click={navigation} />,
      })
    },
    PharmacyDetail: {
      screen: PharmacyDetail
    }

  }
)

const Order = createStackNavigator(
  {
    OrderMenu: {
      screen: OrderMenu,
      navigationOptions: ({ navigation }) => ({
        headerLeft: () =>
          <HomeButton click={navigation} />
      })
    },
    RequestList: {
      screen: RequestList
    },
    OrderList: {
      screen: OrderList
    },
    OrderDetail:{
      screen: OrderDetail
    },
    AppointmentList:{
      screen:AppointmentList
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
      screen: Doctor,
      navigationOptions: {
        tabBarLabel: 'Ask Doctor',
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{ color: tintColor }]} size={25} name={'user-md'} />
          </View>),
      }
    },
    CartScreen: {
      screen: Order,
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
    Login: Login,
    Otp: OtpStack,
    Home: BottomTabNav,
    Pahology: Pahology,
    Pharmacy: Pharmacy,
    Order: Order
  },
  {
    initialRouteName: "OnBoard",
    headerMode: 'none'
  }
)

const App = createAppContainer(RootStack)


export default App;