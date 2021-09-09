import React from 'react'
import { SafeAreaView, Image, Text, View, StyleSheet, ImageBackground } from 'react-native'
import Colors from '../../styles/color'
import Fontsize from '../../styles/fontsize'
import { screenHeight, screenWidth } from '../../module/IntroSlider/src/themes'
import Rating from '../rating'
import Icon from 'react-native-vector-icons/FontAwesome';
import KButton from '../KButton'
import config from '../../config'
import Images from '../../styles/images'
import Moment from 'moment'
const NotificationItem = (props) => {
    return (
        <View imageStyle={{ borderRadius: 10 }} style={styles.bundle}>
            <View style={styles.header}>
                <ImageBackground style={[styles.bundleinfo, { backgroundColor: props.info.type == "success" ? Colors.success : props.info.type == "danger" ? Colors.danger : Colors.primary }]} >
                    <Icon name="bell" color={Colors.white} size={15} />
                </ImageBackground>
                <Text style={[Fontsize.medium, styles.title, { textAlign: 'center' }]}>{props.info.title}</Text>
            </View>

            <View style={styles.name}>

                {props.info.rating > 0 && <Rating rating={props.info.rating} />}
            </View>
            <Text style={styles.body}>{props.info.description}</Text>
            <View style={styles.footer}>
                <View style={styles.budget}>
                    <Text style={styles.body}>Arrived on:  </Text>
                    <Text style={styles.date}>{Moment(props.info.created_at).format("LL")}</Text>
                </View>
                <Icon name="trash-o" size={20} color={Colors.danger} onPress={()=>{props.remove(props.info.id)}}/>
            </View>

        </View >
    )
}

const styles = StyleSheet.create({
    bundle: {
        width: screenWidth * 0.85,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.white,
        borderRadius: 10,
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        shadowColor: Colors.primary,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 45,
        elevation: 8,
        margin: 10
    },
    avatar: {
        margin: 5,
        width: screenWidth * 0.3,
        height: screenHeight * 0.2,
        borderRadius: 5,
        marginEnd: 20
    },
    header: {
        flexDirection: "row",
        width: "100%",
    },
    fakeavatar: {
        margin: 5,
        width: screenWidth * 0.3,
        height: screenHeight * 0.2,
        borderRadius: 5,
        marginEnd: 20,
        resizeMode: "center"
    },
    bundleinfo: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: 500,
        padding: 15,
        alignSelf: 'flex-start',
        marginEnd: 10
    },
    budget: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '100%'
    },
    name: {
    },
    title: {
        color: Colors.dark,
        alignSelf: 'center',
        fontWeight: 'bold'
    },
    body: {
        textAlign: 'left',
        marginBottom: 10
    },
    date: {
        color: Colors.primary
    },
    footer:{
        flexDirection:"row"
    }
})

export default NotificationItem