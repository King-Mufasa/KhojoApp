import React, { useState } from 'react'
import Color from '../styles/color'
import Images from '../styles/images';
import { SafeAreaView, StyleSheet, TextInput, Image, Text } from "react-native";
import { screenHeight, screenWidth } from '../module/IntroSlider/src/themes';
import Fontsize from '../styles/fontsize';



const InputPhone = (props) => {
    const [valid, setValid] = useState('none')
    const [phonenumber, setNumber] = useState('')

    const inputNumber = (number) => {
        setValid(number.length == 10 ? 'flex' : 'none')
        if (props.onChangeText)
            props.onChangeText(number)
    }
    return (
        <SafeAreaView style={[styles.container, props.style]}>
            <Image style={styles.flag} source={Images.flag} />
            <Text style={[styles.baseText, Fontsize.small]}>+ 91</Text>
            <TextInput
                value={props.value}
                editable={true}
                onChangeText={inputNumber}
                style={[styles.input, Fontsize.small]}
                placeholder={props.placeholder ? props.placeholder : "Input your phone number"}
                keyboardType="numeric"
                maxLength={10}
            />
            <Image style={[styles.image, { display: valid }]} source={Images.check} />
        </SafeAreaView>
    )
}

const PhoneInput = (props) => {
    return (
        <SafeAreaView style={styles.base}>
            <SafeAreaView style={styles.title}>
                <Text style={[styles.welcome, Fontsize.small, { textAlign: props.align }]}>Welcome to KhojoDoctor</Text>
                <Text style={[styles.description, { textAlign: props.align, display: props.login ? "none" : 'flex' }, Fontsize.mini]}>Enter your Mobile Number and Verify OTP sent to your Mobile</Text>
            </SafeAreaView>
            <InputPhone onChangeText={props.onChangeText} value={props.value} />
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    base: {
        height: screenHeight * 0.15,
        padding: 20,
        backgroundColor: Color.white
    },
    title: {
        width: screenWidth * 0.85
    },
    welcome: {
        fontWeight: "bold",
        fontSize: 18,
    },
    description: {
        marginTop: 5,
        fontSize: 15,
        color: Color.lightdark
    },
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        borderStyle: 'solid',
        borderRadius: 12,
        borderColor: Color.lightgrey,
        borderWidth: 1,
        marginBottom: 30,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center'

    },
    baseText: {
        marginStart: 10,
    },
    input: {
        flex: 8,
        height: 50,
        margin: 3,
        borderWidth: 1,
        padding: 10,
        backgroundColor: '#ffffff',
        borderWidth: 0,
    },
    flag: {
        marginLeft: 20
    },
    image: {
        margin: 10
    },

})
export { PhoneInput, InputPhone }