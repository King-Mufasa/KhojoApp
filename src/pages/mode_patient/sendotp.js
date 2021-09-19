import React, { useEffect, useState } from 'react';
import Images from '../../styles/images';
import { Platform, StatusBar, Image, StyleSheet } from 'react-native';
import Color from '../../styles/color';
import { PhoneInput } from '../../components/phoneinput';
import GeneralStatusBarColor from '../../styles/statusbar';
import SkipButton from '../../components/skipbutton';
import { SafeAreaView, Text } from 'react-native';
import { screenHeight, screenWidth } from '../../module/IntroSlider/src/themes';
import CheckBox from '@react-native-community/checkbox';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import KButton from '../../components/KButton';
import Fontsize from '../../styles/fontsize';
import auth from '@react-native-firebase/auth';
import Snackbar from 'react-native-snackbar';
import AwesomeLoading from 'react-native-awesome-loading';
import { dispatch, useGlobalState } from '../../store/state';


const SendOtp = (props) => {
    const [doctormode] = useGlobalState('doctormode')
    const [agree, setAgree] = useState(false)
    const [editable, setEditable] = useState(false)
    const [confirm, setConfirm] = useState(null);
    const [code, setCode] = useState('');
    const [phone, setPhone] = useState()
    const [loading,setLoading] = useState(false)
    async function signInWithPhoneNumber(phoneNumber) {
        setLoading(true)
        const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
        setConfirm(confirmation);
        const { navigate } = props.navigation;
        navigate("VerifyOtp",{confirm:confirmation,phone:phone})
    }

    async function confirmCode(props) {
        try {
            console.log(code)
            const result = await confirm.confirm(code)
            console.log(result)
        } catch (error) {
            console.log('Invalid code.');
        }
    }
    const setUserPhone = (number) => {
        setPhone(number)
        if(number.length == 10)
        dispatch(
            {
                type:'setPhone',
                phone:number
            }
        )
    }
    const navigate = () => {
        if (phone == null || phone.length != 10) {
            Snackbar.show({
                text: 'Phone numbe invalid',
                duration: Snackbar.LENGTH_SHORT,
            });
            return
        }
        const result = signInWithPhoneNumber('+919608661965')
        console.log(result)
    }
    useEffect(() => {
        console.log(props.navigation.state.params)
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <AwesomeLoading indicatorId={17} size={100} isActive={loading} text="sending..." />
            <GeneralStatusBarColor />
            <SkipButton show="none" />
            <Image source={Images.otp1} style={styles.icon} />
            <PhoneInput align="center" value={phone} onChangeText={setUserPhone} />
            <SafeAreaView style={styles.agree}>
                <CheckBox
                    value={agree}
                    onValueChange={(value) =>
                        setAgree(value)
                    }
                    tintColors={{ true: doctormode?Color.doctor_primary:Color.primary }}
                /><Text style={styles.label}>I agree to Terms & Conditions.</Text>
            </SafeAreaView>
            <KButton style={[styles.send]} name="Send OTP" click={navigate} />
            {/* <SafeAreaView style={styles.change}>
                <Text style={[styles.label, Fontsize.mini]} onPress={
                    () => {
                        setEditable(true)
                    }
                }>Change Number ?</Text>
            </SafeAreaView> */}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Color.white
    },
    icon: {
        resizeMode: "contain",
        width: screenWidth * 0.3,
        height: screenWidth * 0.3,
    },
    agree: {
        marginTop: 50,
        width: screenWidth * 0.85,
        flexDirection: "row",
        alignItems: "center",
    },
    send: {
        width: screenWidth * 0.85,
    },
    change: {
        marginTop: 10,
        width: screenWidth * 0.85,
        alignItems: 'flex-end',
        justifyContent: "flex-end",
    },
    label: {
        color: Color.lightdark
    }



})

export default SendOtp