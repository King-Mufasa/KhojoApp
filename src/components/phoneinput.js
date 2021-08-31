import React from 'react'
import Color from '../styles/color'
import Images from '../styles/images';
import { SafeAreaView, StyleSheet, TextInput, Image, Text } from "react-native";
const PhoneInput = (props) => {
    return (
        <SafeAreaView style={styles.base}><Text style={[styles.welcome,{textAlign:props.align}]}>Welcome to Medigo</Text>
            <Text style={styles.description}>Enter your Mobile Number and Verify OTP sent to your Mobile</Text>
            <SafeAreaView style={styles.container}>

                <Image style={styles.flag} source={Images.flag} />
                <Text style={styles.baseText}>+ 91</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Input your phone number"
                    keyboardType="numeric"
                    maxLength={10}
                />
                <Image style={styles.image} source={Images.check} />
            </SafeAreaView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    base:{
        padding:20
    },
    welcome: {
        fontWeight: "bold",
        fontSize: 18,
    },
    description: {
        marginTop:5,
        fontSize: 15,
        color:Color.lightdark
    },
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        borderStyle: 'solid',
        borderRadius: 12,
        borderColor: Color.lightgrey,
        borderWidth: 1,
        marginBottom: 30,
        marginTop:20,
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
    }
})
export default PhoneInput