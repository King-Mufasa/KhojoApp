import React from 'react'
import { SafeAreaView, Image, Text, View, StyleSheet, TouchableHighlight } from 'react-native'
import Colors from '../../styles/color'
import Fontsize from '../../styles/fontsize'
import Icon from 'react-native-vector-icons/FontAwesome';
import KButton from '../KButton'
import Moment from 'moment';
import { screenHeight, screenWidth } from '../../module/IntroSlider/src/themes';
const ServiceItem = (props) => {
    const avatar = props.service.image
    return (
        <TouchableHighlight style={styles.doctor} onPress={props.click} underlayColor={Colors.lightblue}>
                <View style={styles.container}>
                    {(avatar != null) ?
                        <Image style={styles.avatar} source={{ uri: 'http://192.168.114.29:8080/' + avatar }} /> :
                        <Image style={styles.fakeavatar} source={{ uri: 'http://192.168.114.29:8080/assets/images/symbol.png' }} />}
                    <SafeAreaView style={styles.doctorinfo}>
                        <Text style={[styles.title, Fontsize.medium]}>{props.service.title}</Text>
                        <Text style={styles.text}>{props.service.description}</Text>
                    </SafeAreaView>
                </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    doctor: {
        flexDirection: 'row',
        backgroundColor: Colors.white,
        borderRadius: 10,
        marginTop: 20,
        paddingVertical: 10,
        shadowColor: Colors.primary,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 45,
        elevation: 8,
        margin: 10,
    },
    container: {
        flexDirection: 'row'
    },
    avatar: {
        margin: 5,
        width: screenWidth * 0.3,
        height: screenHeight * 0.2,
        borderRadius: 5,
        marginEnd: 20
    },
    fakeavatar: {
        margin: 5,
        width: screenWidth * 0.3,
        height: screenHeight * 0.2,
        borderRadius: 5,
        marginEnd: 20,
        resizeMode: "center"
    },
    doctorinfo: {
        width: '55%',
        paddingEnd: 10,
        marginEnd: 20,
    },
    budget: {
        flexDirection: 'row'
    },
    name: {
    },
    text: {
        marginTop: 5,
        color: Colors.lightdark
    },
    title: {
        marginTop: 5,
        color: Colors.primary,
        fontWeight: 'bold'
    }
})

export default ServiceItem