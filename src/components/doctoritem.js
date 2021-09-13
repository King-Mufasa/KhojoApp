import React from 'react'
import { SafeAreaView, Image, Text, View, StyleSheet } from 'react-native'
import Colors from '../styles/color'
import Fontsize from '../styles/fontsize'
import { screenHeight, screenWidth } from '../module/IntroSlider/src/themes'
import Rating from './rating'
import Icon from 'react-native-vector-icons/FontAwesome';
import KButton from './KButton'
import config from '../config'
const DoctorItem = (props) => {
    const avatar = props.info.image
    return (
        <SafeAreaView style={styles.doctor}>
            <View style={{flexDirection:"row"}}>
            {(avatar != null) ?
                <Image style={styles.avatar} source={{ uri: config.baseurl + avatar }} /> :
                <Image style={styles.fakeavatar} source={{ uri: config.baseurl+'assets/images/symbol.png' }} />}
            <SafeAreaView style={styles.doctorinfo}>
                <View style={styles.name}>
                    <Text style={[Fontsize.medium]}>{props.info.name}</Text>
                    {props.info.rating > 0 && <Rating rating={props.info.rating} />}
                </View>
                <Text style={styles.text}>{props.info.address}</Text>
                <Text style={styles.text}>License on {props.info.experience}</Text>
                <Text style={styles.text}>{props.info.clinic}</Text>
                <View style={styles.budget}>
                    <Text style={styles.text}>Consultation fee:  </Text>
                    <Text style={styles.text}><Icon name="inr" /> {props.info.fee}</Text>
                </View>
                
            </SafeAreaView>
            </View>
            <KButton name="Book Consultation" style={{ }} click={()=>{props.action(props.info.id)}} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    doctor: {
        flexDirection: 'column',
        backgroundColor: Colors.white,
        borderRadius: 10,
        marginTop: 20,
        padding: 10,
        shadowColor: Colors.primary,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 45,
        elevation: 8,
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
        // width: '60%',
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
})

export default DoctorItem