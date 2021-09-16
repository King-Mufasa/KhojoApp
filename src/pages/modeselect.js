import React, { useEffect, useRef, useState } from 'react'
import { useGlobalState } from '../store/state'
import { Image, StyleSheet, Text, View, ImageBackground, Animated } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import Toggle from 'react-native-toggle-element';
import Colors from '../styles/color';
import StandardStyles from '../styles/standardstyles';
import Fontsize from '../styles/fontsize';
import Images from '../styles/images';
import { screenHeight, screenWidth } from '../module/IntroSlider/src/themes';
import GeneralStatusBarColor from '../styles/statusbar';
import KButton from '../components/KButton';
const ModeSelect = ({ navigation }) => {
    // const mode = useGlobalState('mode')
    const [mode, setMode] = useState(true)
    const [opacity, setOpacity] = useState(1)
    // const fadeIn = new Animated.Value(0)
    // const fadeOut = new Animated.Value(1)
    const fadeAnim = useRef(new Animated.Value(1)).current;

    const fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        setMode(!mode)
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 250,
            useNativeDriver:true
        }).start();
    };

    const fadeOut = () => {
        // Will change fadeAnim value to 0 in 3 seconds
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 250,
            useNativeDriver:true
        }).start(fadeIn);
    };
    
    const switchMode = (mode) =>{
        fadeOut()
        
    }
    const start = () => {
        const {navigate} = navigation
        navigate(mode ? "Login" : 'Register')
    }
    useEffect(() => {
        console.log(mode)
    }, [])
    return (
        <View style={[styles.container]}>
            <GeneralStatusBarColor />

            <View style={[StandardStyles.commonview, { padding: 0, width: screenWidth * 0.7 }]}>
                <Animated.Image style={[styles.modeCover,{ opacity: fadeAnim }]} source={mode ? Images.mode_doctor:Images.mode_patient}  />
            </View>
            <Text style={[Fontsize.large, { color: Colors.other_3 }]}>Select who you are.</Text>
            <View style={[styles.modeselect, StandardStyles.commonview]}>

                <Text style={[Fontsize.medium, { color: Colors.primary, fontWeight: 'bold' }]}>Patient</Text>
                <Toggle
                    value={mode}
                    onPress={(newState) => switchMode(newState)}
                    animationDuration={500}
                    trackBar={{
                        activeBackgroundColor: Colors.doctor_primary,
                        inActiveBackgroundColor: Colors.primary,
                        borderActiveColor: Colors.doctor_primary,
                        borderInActiveColor: Colors.primary,
                        borderWidth: 2,
                        width: 150,
                    }}
                    thumbButton={{
                        activeBackgroundColor: Colors.white,
                        inActiveBackgroundColor: Colors.white,
                        borderWidth: 10,

                    }}
                />
                <Text style={[Fontsize.medium, { color: Colors.doctor_primary, fontWeight: 'bold' }]}>Doctor</Text>
            </View>
            <KButton name="START" style={{ backgroundColor: mode ? Colors.doctor_primary : Colors.primary, width: "80%" }} click={start} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center'

    },
    modeselect: {
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginTop: 40
    },
    modeTitle: {

    },
    modeCover: {
        width: "100%",
        height: screenHeight * 0.5,
    }
})

export default ModeSelect