import React from 'react'
import { View, StyleSheet, Text, } from 'react-native'
import KButton from '../KButton'
import Fontsize from '../../styles/fontsize'
import EditView from '../util/editview'
import SelectDropdown from 'react-native-select-dropdown'
import Colors from '../../styles/color'
import Icon from 'react-native-vector-icons/FontAwesome';
import { screenWidth } from '../../module/IntroSlider/src/themes'
import { Divider, } from 'react-native-elements';
import StandardStyles from '../../styles/standardstyles'
const Appointment = (props) => {
    const fee = parseFloat(props.event.price * 0.03).toFixed(2)
    const final_price = parseFloat(parseFloat(props.event.price) + parseFloat(fee)).toFixed(2)
    return (
        <View>
            <View style={styles.modal}>
                <View style={[StandardStyles.commonview, { flexDirection: 'row', alignItems: 'center' }]}>
                    <View style={[styles.header, { backgroundColor: props.event.type == 0 ? Colors.primary : props.event.type == 1 ? Colors.warning : Colors.purple }]}>
                        <Icon name={props.event.type == 0 ? "home" : props.event.type == 1 ? "hospital-o" : "video-camera"} color={Colors.white} size={18} style={{ alignSelf: 'center' }} />
                    </View>
                    <View>
                        {/* <Text >Price : <Text style={styles.price}><Icon name='inr' />{props.event.productprice}</Text> </Text> */}
                        <Text>Type : {props.event.type == 0 ? "Clinic Visit" : props.event.type == 1 ? "Home Visit" : "Video Consultation"}</Text>
                        <Text>From : {props.event.from.substring(0, 5)}    To : {props.event.to.substring(0, 5)}</Text>
                        {/* <Text>Created :{moment(props.event.created_at).format("LL")}</Text> */}
                    </View>
                </View>
                <View style={styles.inputlayer}>
                    <Text>Price</Text>
                    <Text>{props.event.price}</Text>
                </View>
                <View style={styles.inputlayer}>
                    <Text>Commission Fee (3%)</Text>
                    <Text>{fee}</Text>
                </View>
                <Divider orientation="horizontal" inset={true} insetType="middle" />
                <View style={styles.inputlayer}>
                    <Text>Total</Text>
                    <Text>{final_price}</Text>
                </View>
                <KButton name="Book Appointment" click={() => { props.action(props.event.id, final_price) }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    modal: {
        padding: 10,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: Colors.primaryBack
    },
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
    inputlayer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
        marginVertical: 10
    }
}
)


export default Appointment

