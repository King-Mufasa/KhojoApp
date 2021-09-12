import React from 'react'
import { View, StyleSheet, Text, Image, TouchableHighlight } from 'react-native'
import { screenWidth } from '../../module/IntroSlider/src/themes'
import Images from '../../styles/images'
import StandardStyles from '../../styles/standardstyles'
import config from '../../config'
import Fontsize from '../../styles/fontsize'
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../styles/color'
import moment from 'moment'
import Badge from '../util/badge'
import OfferBadge from '../util/offer'
import { ColorPropType } from 'react-native'
const EventItem = (props) => {
    return (
        <TouchableHighlight onPress={()=>{props.action(props.info.id)}} underlayColor={Colors.lightblue}>
            <View style={[StandardStyles.commonview, { flexDirection: 'row', alignItems: 'center' }]}>
                <View style={[styles.header, { backgroundColor: props.info.type == 0 ? Colors.primary : props.info.type == 1 ? Colors.warning : Colors.purple }]}>
                    <Icon name={props.info.type == 0 ? "home" : props.info.type == 1 ? "hospital-o" : "video-camera"} color={Colors.white} size={18} style={{ alignSelf: 'center' }} />
                </View>
                <View>
                    {/* <Text >Price : <Text style={styles.price}><Icon name='inr' />{props.info.productprice}</Text> </Text> */}
                    <Text>Type : {props.info.type == 0 ? "Clinic Visit" : props.info.type == 1 ? "Home Visit" : "Video Consultation"}</Text>
                    <Text>From : {props.info.from.substring(0, 5)}    To : {props.info.to.substring(0, 5)}</Text>
                    {/* <Text>Created :{moment(props.info.created_at).format("LL")}</Text> */}
                </View>
            </View>
        </TouchableHighlight>
    )

}

const styles = StyleSheet.create({
    icon: {
        resizeMode: 'contain',
        alignSelf: 'center',
        margin: 10,
        width: screenWidth * 0.2,
        height: screenWidth * 0.2,
        borderRadius: 10
    },
    header: {
        borderRadius: 500,
        width: screenWidth * 0.1,
        height: screenWidth * 0.1,
        margin: 10,
        justifyContent: 'center'
    },
    price: {
        color: Colors.success
    },

})

export default EventItem