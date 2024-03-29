import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import { screenWidth } from '../../module/IntroSlider/src/themes'
import Images from '../../styles/images'
import {StandardStyles} from '../../styles/standardstyles'
import config from '../../config'
import Fontsize from '../../styles/fontsize'
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../styles/color'
import moment from 'moment'
import Badge from '../util/badge'
import OfferBadge from '../util/offer'
const OrderItem = (props) => {
    return (
        <View style={[StandardStyles.commonview, { flexDirection: 'column' }]}>
            <View style={styles.header}>
                <Image source={{ uri: props.info.productimage == null ? props.type==1?Images.ico_pathology:Images.ico_pharmacy : config.baseurl + props.info.productimage }} style={styles.icon} />
                <View>
                    <Text style={[Fontsize.small,{marginHorizontal:10, marginBottom:10, width:"90%"}]} lineBreakMode={true} numberOfLines={2}>{props.info.name}</Text>
                    <Text>{props.info.type}</Text>
                </View>
            </View>
            
            <Text >Price : <Text style={styles.price}><Icon name='inr' />{props.info.price}</Text> </Text>
            {props.info.quantity?<Text>Quantity : {props.info.quantity}</Text>:<></>}
            {props.info.productexpiry?<Text>Expirity : {props.info.productexpiry}</Text>:<></>}
            {/* <Text>Created :{moment(props.info.created_at).format("LL")}</Text> */}
        </View>
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
        flexDirection: 'row',
        alignItems: 'center'
    },
    price: {
        color: Colors.success
    },
    
})

export default OrderItem