import React, { Fragment, useEffect, useState } from 'react';
import { IntroSlider } from '../../module/IntroSlider';
import Images from '../../styles/images';
import { KButton } from '../../components/KButton';
import { Platform, StatusBar, View } from 'react-native';
import Color from '../../styles/color';
import {PhoneInput} from '../../components/phoneinput';
import GeneralStatusBarColor from '../../styles/statusbar';
import SkipButton from '../../components/skipbutton';
import SplashScreen from 'react-native-splash-screen';
import { screenHeight } from '../../module/IntroSlider/src/themes';
import Colors from '../../styles/color';


const OnBoardingScreen =(props)=> {
    useEffect(()=>{
        SplashScreen.hide();
    },[])
    const [phone,setPhone] = useState('')
    
    const navigate = () =>{
        console.log("KILl")
        const { navigate } = props.navigation;
        navigate("ModeSelect",{phone:phone})
    }
    const changePhone = (number)=>{
        setPhone(number)
    }
        return (
            <Fragment>
                <GeneralStatusBarColor />
                <SkipButton click={navigate}/>
                <IntroSlider
                    showPagination
                    buttonProps={{
                        activeDotColor: Color.primary,
                        renderNextButton: false,
                        showSkipButton: true,
                        onDonePress: () => {
                            alert('Done Pressed');
                        },
                    }}
                    paginationProps={{
                        animationType: 'expanding',
                        dotSpacing: 8,
                    }}>
                    <IntroSlider.Page
                        title={'Your Online Pharmacy'}
                        image={Images.Board1}
                        containerStyle={{ backgroundColor: Color.white }}
                        description={
                            'Welcome to your All in One Pharmacy, you can buy medicines, Helathcare Products and more here.'
                        }
                    />
                    <IntroSlider.Page
                        title={'Upload Prescription to Order'}
                        image={Images.Board2}
                        containerStyle={{ backgroundColor: Color.white }}
                        description={
                            'Upload the Image of Valid Prescription of your Doctor & Order Medicines at your fingertips.'
                        }
                    />
                    <IntroSlider.Page
                        title={'Consult & Appoint with Doctors'}
                        image={Images.Board3}
                        containerStyle={{ backgroundColor: Color.white }}
                        description={
                            'Any Health Related Issues? Consult with TOp Rated Doctors ONline or Schedule Consultation according to your time.'
                        }
                    />
                </IntroSlider>
                {/* <View style={{height:screenHeight*0.25, backgroundColor:Colors.white}}><PhoneInput onChangeText = {changePhone}/></View> */}
               

            </Fragment>

        )
    
}

export default OnBoardingScreen;