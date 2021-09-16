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
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import HomeButton from './components/home';
import Notification from './pages/util/notification';
import ModeSelect from './pages/modeselect';
/** Patient Mode */
  // #Auth
  import Register from './pages/mode_patient/auth/register';
  import Login from './pages/mode_patient/auth/login';
  import OnBoardingScreen from './pages/mode_patient/onboard';
  import Home from './pages/mode_patient/home';
  import SendOtp from './pages/mode_patient/sendotp'
  import VerifyOtp from './pages/mode_patient/verifyotp';
  // #Profile
  import MyProfile from './pages/mode_patient/profile/profile';
  import EditProfile from './pages/mode_patient/profile/editprofile';
  import ManageAddress from './pages/mode_patient/profile/manageaddress';
  import ManagePatient from './pages/mode_patient/profile/managepatient';
  import MyPlace from './pages/mode_patient/profile/myplace';
  // #Doctor
  import SelectSpeciality from './pages/mode_patient/doctor/selectspeciality';
  import DoctorGallery from './pages/mode_patient/doctor/selectdoctor';
  import ScheduleAppointment from './pages/mode_patient/doctor/bookappointment';
  // #Pathology
  import PathologyGallery from './pages/mode_patient/pathology/selectlabs';
  import PathologyDetail from './pages/mode_patient/pathology/pathology';
  // #Pharmacy
  import PharmacyGallery from './pages/mode_patient/pharmacy/selectpharmacy';
  import PharmacyDetail from './pages/mode_patient/pharmacy/pharmacy';
  // #Order
  import OrderMenu from './pages/mode_patient/order/ordermenu';
  import RequestList from './pages/mode_patient/order/request';
  import OrderList from './pages/mode_patient/order/orderlist';
  import OrderDetail from './pages/mode_patient/order/detail';
  import PrescriptionRequest from './pages/mode_patient/order/prescription';
  // #Service
  import ServiceGallery from './pages/mode_patient/service/service';
  import ServiceList from './pages/mode_patient/service/servicelist';
  import AppointmentList from './pages/mode_patient/appointment/appointmentlist';

  
/** Doctor Mode */
  // #Auth
  import DoctorLogin from './pages/mode_doctor/auth/login';
  import DoctorRegister from './pages/mode_doctor/auth/register';

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


const ModeSelector = createStackNavigator(
  {
    ModeSelect:{
      screen:ModeSelect,
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
    ModeSelect: ModeSelector,
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