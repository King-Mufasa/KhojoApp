import React, { Fragment, useEffect } from 'react';
import { IntroSlider } from '../module/IntroSlider';
import Images from '../styles/images';
import { KButton } from '../components/KButton';
import { Platform, StatusBar } from 'react-native';
import Color from '../styles/color';
import PhoneInput from '../components/phoneinput';
import GeneralStatusBarColor from '../styles/statusbar';
import SkipButton from '../components/skipbutton';
import SplashScreen from 'react-native-splash-screen';


class OnBoardingScreen extends React.Component {

    componentDidMount(){
        SplashScreen.hide();
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <Fragment>
                <GeneralStatusBarColor />
                <SkipButton click={()=> navigate('Otp')}/>
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
                <PhoneInput />

            </Fragment>

        )
    }
}

export default OnBoardingScreen;