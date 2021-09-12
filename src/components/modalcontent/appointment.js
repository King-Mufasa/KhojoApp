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

const type = [
    { title: "Me", image: 'user' },
    { title: "Family", image: 'home' },
    { title: "Friend", image: 'handshake-o' },
    { title: "Custom", image: 'user' },
]

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
                <SelectDropdown
                        defaultValueByIndex={0}
                        buttonStyle={styles.typeselector}
                        data={props.patient}
                        onSelect={(selectedItem, index) => {
                            props.type(selectedItem.id);
                        }}
                        renderCustomizedButtonChild={(selectedItem, index) => {
                            // props.type(selectedItem)
                            // text represented after item is selected
                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                            return (
                                <View style={styles.addressselect}>
                                    <View style={{flexDirection:'row'}}> 
                                    {selectedItem ? (
                                        <Icon
                                            name={selectedItem.type==0?'user':selectedItem.type==1?"home":selectedItem.type==2?"handshake-o":"user"}
                                            size={25}
                                            style={styles.icon}
                                        />
                                    ) : (
                                        <Icon name="user" color={Colors.primary} size={32} />
                                    )}
                                    <Text style={styles.dropdown3BtnTxt}>
                                        {selectedItem ? selectedItem.name : "Select Patient Type"}
                                    </Text>
                                    </View>
                                    
                                    <Icon name="chevron-down" color={Colors.primary} size={18} />
                                </View>
                            )
                        }}
                        renderCustomizedRowChild={(item, index) => {
                            // text represented for each item in dropdown
                            // if data array is an array of objects then return item.property to represent item in dropdown
                            return (
                                <View style={styles.addresstype}>
                                    <Icon name={item.type==0?'user':item.type==1?"home":item.type==2?"handshake-o":"user"} size={25} style={styles.icon} />
                                    <Text >{item.name}</Text>
                                </View>
                            )
                        }}
                    />

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
    // icon: {
    //     resizeMode: 'contain',
    //     alignSelf: 'center',
    //     margin: 10,
    //     width: screenWidth * 0.2,
    //     height: screenWidth * 0.2,
    //     borderRadius: 10
    // },
    icon: {
        color: Colors.primary,
        width: screenWidth * 0.1
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
    },
    typeselector: {
        width: '100%',
        borderRadius: 10
    },
    addressselect:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:20,
        alignContent:'center'
    },
    addresstype:{
        flexDirection:'row',
        paddingHorizontal:20
    },
    dropdown3BtnTxt:{
        alignSelf:'center',
        marginStart:10
    }
}
)


export default Appointment

