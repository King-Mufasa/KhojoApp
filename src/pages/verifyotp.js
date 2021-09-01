import React, { Component } from 'react';
import Images from '../styles/images';
import { Platform, StatusBar, Image, StyleSheet } from 'react-native';
import Color from '../styles/color';
import PhoneInput from '../components/phoneinput';
import GeneralStatusBarColor from '../styles/statusbar';
import SkipButton from '../components/skipbutton';
import { SafeAreaView, Text, TextInput } from 'react-native';
import { screenHeight, screenWidth } from '../module/IntroSlider/src/themes';
import CheckBox from '@react-native-community/checkbox';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import KButton from '../components/KButton';

type Props = {};
type State = {
    agree: boolean;
    editable: boolean;
    index: int;
};

const OtpInput = (props) => {
    return (
        <SafeAreaView style={styles.otp}>
            <TextInput
                autoFocus={props.focus}
                style={styles.input}
                keyboardType="numeric"
                maxLength={1}
            />
        </SafeAreaView>
    )
}

class VerifyOtp extends Component<Props, State>{
    constructor(props: Props) {
        super(props);
        this.state = {
            agree: false,
            editable: false,
            index: 0
        };
    }
    render() {
        const {navigate} = this.props.navigation;
        return (
            <SafeAreaView style={styles.container}>
                <GeneralStatusBarColor />
                <SkipButton show="none" />
                <Image source={Images.otp2} style={styles.icon} />
                <Text style={styles.title}>Verify OTP</Text>
                <SafeAreaView style={styles.change}>
                    <Text style={styles.label}>We will Auto Detect the OTP sent to your Mobile &nbsp;
                        <Text style={{ color: Color.primary, marginStart: 10 }}>+91 7836499763</Text></Text>
                </SafeAreaView>
                <SafeAreaView style={styles.change}>
                    <OtpInput focus={true} /><OtpInput /><OtpInput /><OtpInput />
                </SafeAreaView>

                <KButton style={styles.send} name="Verify OTP" click={()=>navigate("MyProfile")}/>
                <SafeAreaView style={styles.change}>
                    <Text style={styles.label}>Didnt's Receive a OTP?</Text>
                    <Text style={{ color: Color.primary }} onPress={
                        () => {
                            this.setState({
                                editable: true,
                            })
                        }
                    }>Resend ?</Text>
                </SafeAreaView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        flex:1,
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
        marginBottom:50
    },
    change: {
        flexDirection: "row",
        marginTop: 10,
        width: screenWidth * 0.65,
        alignItems: 'center',
        justifyContent: "center",
    },
    label: {
        marginEnd: 10,
        color: Color.lightdark,
        textAlign: "center"
    },
    title: {
        fontSize: 18,
        fontWeight: "bold"
    },
    otp: {
        alignItems: 'center',
        justifyContent: "center",
        width: screenWidth * 0.15,
        height: screenWidth * 0.15,
        backgroundColor: Color.white,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 45,
        elevation: 8,
        margin: 10
    },
    input: {
        fontSize: 30,
    }
})

export default VerifyOtp
