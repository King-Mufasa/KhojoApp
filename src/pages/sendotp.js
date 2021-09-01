import React, { Component } from 'react';
import Images from '../styles/images';
import { Platform, StatusBar, Image, StyleSheet } from 'react-native';
import Color from '../styles/color';
import PhoneInput from '../components/phoneinput';
import GeneralStatusBarColor from '../styles/statusbar';
import SkipButton from '../components/skipbutton';
import { SafeAreaView, Text } from 'react-native';
import { screenHeight, screenWidth } from '../module/IntroSlider/src/themes';
import CheckBox from '@react-native-community/checkbox';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import KButton from '../components/KButton';
import Fontsize from '../styles/fontsize';
const setSelection = () => {
    alert("CHCK");
}

type Props = {};
type State = {
    agree: boolean;
    editable:boolean;
};

class SendOtp extends Component<Props, State>{
    constructor(props: Props) {
        super(props);
        this.state = {
            agree: false,
            editable:false,
        };
    }
    render() {
        const {navigate} = this.props.navigation;
        return (
            <SafeAreaView style={styles.container}>
                <GeneralStatusBarColor />
                <SkipButton show="none" />
                <Image source={Images.otp1} style={styles.icon} />
                <PhoneInput align="center" editable={this.state.editable}/>
                <SafeAreaView style={styles.agree}>
                    <CheckBox
                        value={this.state.agree}
                        onValueChange={(value) =>
                            this.setState({
                                agree: value,
                            })
                        }
                        tintColors={{true: Color.primary}}
                    /><Text style={styles.label}>I agree to Terms & Conditions.</Text>
                </SafeAreaView>
                <KButton  style={styles.send} name="Send OTP" click={()=>navigate("VerifyOtp")}/>
                <SafeAreaView style={styles.change}>
                    <Text style={[styles.label,Fontsize.mini]} onPress={
                        ()=>{
                            this.setState({
                                editable:true,
                            })
                        }
                    }>Change Number ?</Text>
                </SafeAreaView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor:Color.white
    },
    icon: {
        resizeMode: "contain",
        width: screenWidth * 0.3,
        height: screenWidth * 0.3,
    },
    agree: {
        width: screenWidth * 0.85,
        flexDirection: "row",
        alignItems: "center",
    },
    send: {
        width: screenWidth * 0.85,
    },
    change:{
        marginTop:10,
        width:screenWidth *0.85,
        alignItems:'flex-end',
        justifyContent:"flex-end",
    },
    label:{
        color:Color.lightdark
    }



})

export default SendOtp