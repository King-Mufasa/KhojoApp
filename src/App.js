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
import OnBoardingScreen from './pages/mode_patient/onboard';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import HomeButton from './components/home';
import Home from './pages/mode_patient/home';
import SendOtp from './pages/mode_patient/sendotp'
import VerifyOtp from './pages/mode_patient/verifyotp';

import MyProfile from './pages/mode_patient/profile/profile';
import EditProfile from './pages/mode_patient/profile/editprofile';
import ManageAddress from './pages/mode_patient/profile/manageaddress';

import SelectSpeciality from './pages/mode_patient/doctor/selectspeciality';
import DoctorGallery from './pages/mode_patient/doctor/selectdoctor';

import Login from './pages/mode_patient/auth/login';
import ScheduleAppointment from './pages/mode_patient/doctor/bookappointment';

import PathologyGallery from './pages/mode_patient/pathology/selectlabs';
import PharmacyGallery from './pages/mode_patient/pharmacy/selectpharmacy';
import PathologyDetail from './pages/mode_patient/pathology/pathology';
import PharmacyDetail from './pages/mode_patient/pharmacy/pharmacy';
import OrderMenu from './pages/mode_patient/order/ordermenu';
import RequestList from './pages/mode_patient/order/request';
import OrderList from './pages/mode_patient/order/orderlist';
import Register from './pages/mode_patient/auth/register';
import Notification from './pages/util/notification';
import OrderDetail from './pages/mode_patient/order/detail';
import AppointmentList from './pages/mode_patient/appointment/appointmentlist';
import ManagePatient from './pages/mode_patient/profile/managepatient';
import PrescriptionRequest from './pages/mode_patient/order/prescription';
import MyPlace from './pages/mode_patient/profile/myplace';
import ServiceGallery from './pages/mode_patient/service/service';
import ServiceList from './pages/mode_patient/service/servicelist';

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


const ModeSelect = createStackNavigator(
  {
    ModeSelector:{
      screen:OnBoardingScreen,
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
    MyPlace:{
      screen:MyPlace
    },
    Notification:{
      screen:Notification
    }
  }
)

const Doctor = createStackNavigator(
  {
    SelectDoctor: {
      screen: DoctorGallery,
      navigationOptions: ({ navigation }) => ({
        color:Colors.primary,
        headerLeft: () =>
          <HomeButton click={navigation} />
      })
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
    },
    
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

const Service = createStackNavigator(
  {
    SelectService:{
      screen: ServiceGallery,
      navigationOptions: ({ navigation }) => ({
        headerLeft: () =>
          <HomeButton click={navigation} />,
      })
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
    },
    ServiceList:{
      screen:ServiceList
    },
    RequestOrder:{
      screen:PrescriptionRequest
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
    ModeSelect: ModeSelect,
    Login: Login,
    Otp: OtpStack,
    Home: BottomTabNav,
    Pahology: Pahology,
    Pharmacy: Pharmacy,
    Service:Service,
    Order: Order
  },
  {
    initialRouteName: "OnBoard",
    headerMode: 'none'
  }
)

const App = createAppContainer(RootStack)


export default App;