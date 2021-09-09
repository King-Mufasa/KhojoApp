import React, { useState, useEffect, useRef } from 'react';
import Images from '../styles/images';
import { Platform, StatusBar, Image, StyleSheet, View } from 'react-native';
import Color from '../styles/color';
import PhoneInput from '../components/phoneinput';
import GeneralStatusBarColor from '../styles/statusbar';
import SkipButton from '../components/skipbutton';
import { SafeAreaView, Text, TextInput } from 'react-native';
import { screenHeight, screenWidth } from '../module/IntroSlider/src/themes';
import CheckBox from '@react-native-community/checkbox';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import KButton from '../components/KButton';
import auth from '@react-native-firebase/auth';
import Snackbar from 'react-native-snackbar';
import {dispatch, useGlobalState} from '../store/state'
type Props = {};
type State = {
    agree: boolean;
    editable: boolean;
    index: int;
};

const OtpInput = (props) => {
    useEffect(() => {
    }, [])
    return (
        <SafeAreaView style={styles.otp}>
            <TextInput
                autoFocus={props.focus}
                style={styles.input}
                keyboardType="numeric"
                maxLength={1}
                onSubmitEditing={props.submit}
                onChangeText={props.onChangeText}
                ref={props.reference}
            />
        </SafeAreaView>
    )
}

const VerifyOtp = (props) => {
    const [confirm, setConfirm] = useState(props.navigation.state.params.confirm);
    const [verified, setVerified] = useState(false)
    const [code, setCode] = useState('')
    const [code_1, set1] = useState('')
    const [code_2, set2] = useState('')
    const [code_3, set3] = useState('')
    const [code_4, set4] = useState('')
    const [code_5, set5] = useState('')
    const [code_6, set6] = useState('')
    const first = useRef();
    const second = useRef();
    const third = useRef();
    const fourth = useRef();
    const fifth = useRef();
    const sixth = useRef();
    const [user] = useGlobalState('user');
    async function verfiy() {
        let verifycode = code_1 + code_2 + code_3 + code_4 + code_5 + code_6;
        console.log(confirm.confirm)
        if (verifycode.length != 6) {
            Snackbar.show({
                text: 'Invalid OTP',
                duration: Snackbar.LENGTH_SHORT,
            });
            return
        }
        setCode(verifycode)
        try {
            const result = await confirm.confirm(verifycode);
            console.log(result)
            setVerified(true)
            dispatch(
                {
                    phone: props.navigation.state.params.phone,
                    type: 'setPhone'
                }
            )
            Snackbar.show({
                text: 'OTP verified successfully',
                duration: Snackbar.LENGTH_SHORT,
            });
            const {navigate} = props.navigation
            navigate('Register')
        } catch (error) {
            Snackbar.show({
                text: 'Failed Verify OTP',
                duration: Snackbar.LENGTH_SHORT,
            });
        }
    }
    const navigate = () => {
        const { navigate } = props.navigation;
    }
    const register = () => {
        const payload = { token };
        const onSuccess = ({ data }) => {

        }
        const onFailue = error => {
            console.log(error.response.data)
        }
        setLoading(true)
        APIkit.post('register/', payload).then(onSuccess).catch(onFailue)
    }
   
    useEffect(() => {
        console.log(props.navigation.state.params.phone)
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <GeneralStatusBarColor />
            <Image source={Images.otp2} style={styles.icon} />
            <Text style={styles.title}>Verify OTP</Text>
            <SafeAreaView style={styles.change}>
                <Text style={styles.label}>We will Auto Detect the OTP sent to your Mobile &nbsp;
                    <Text style={{ color: Color.primary, marginStart: 10 }}>+91 {props.navigation.state.params.phone}</Text></Text>
            </SafeAreaView>
            <SafeAreaView style={[styles.change]}>
                <OtpInput focus={true} onChangeText={(value) => { set1(value) }} submit={() => { second.current.focus() }} />
                <OtpInput onChangeText={(value) => { set2(value) }} reference={second} submit={() => { third.current.focus() }} />
                <OtpInput onChangeText={(value) => { set3(value) }} reference={third} submit={() => { fourth.current.focus() }} />
                <OtpInput onChangeText={(value) => { set4(value) }} reference={fourth} submit={() => { fifth.current.focus() }} />
                <OtpInput onChangeText={(value) => { set5(value) }} reference={fifth} submit={() => { sixth.current.focus() }} />
                <OtpInput onChangeText={(value) => { set6(value) }} reference={sixth} />
            </SafeAreaView>
            <KButton style={styles.send} name="Verify OTP" click={() => verfiy()} />
            <SafeAreaView style={styles.change}>
                <Text style={styles.label}>Didnt's Receive a OTP?</Text>
                <Text style={{ color: Color.primary }}>Resend ?</Text>
            </SafeAreaView>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        backgroundColor: Color.white
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
        marginBottom: 50
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
        width: screenWidth * 0.1,
        height: screenWidth * 0.1,
        backgroundColor: Color.white,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 45,
        elevation: 8,
        margin: 10
    },
    input: {
        fontSize: 18,
        textAlign: "center"
    }
})

export default VerifyOtp
