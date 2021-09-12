import React from 'react'
import { View, StyleSheet, Text, } from 'react-native'
import KButton from '../KButton'
import Fontsize from '../../styles/fontsize'
import EditView from '../util/editview'
import SelectDropdown from 'react-native-select-dropdown'
import Colors from '../../styles/color'
import Icon from 'react-native-vector-icons/FontAwesome';
import { screenWidth } from '../../module/IntroSlider/src/themes'
const Address = (props) => {
    const addresstype = [
        { title: "Home", image: 'home' },
        { title: "Work", image: 'building' },
        { title: "Custom", image: 'handshake-o' },
    ]
    return (
        <View>
            <View style={styles.modal}>
                <View style={styles.address}>
                    {/* <Text style={Fontsize.small}>Select Address Type: </Text> */}
                    <SelectDropdown
                        defaultValueByIndex={0}
                        buttonStyle={styles.typeselector}
                        data={addresstype}
                        onSelect={(selectedItem, index) => {
                            props.type(index+1);
                            console.log(selectedItem, index)
                        }}
                        renderCustomizedButtonChild={(selectedItem, index) => {
                            // props.type(selectedItem)
                            // text represented after item is selected
                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                            return (
                                <View style={styles.addressselect}>
                                    {selectedItem ? (
                                        <Icon
                                            name={selectedItem.image}
                                            size={25}
                                            style={styles.icon}
                                        />
                                    ) : (
                                        <Icon name="home" color={"#444"} size={32} />
                                    )}
                                    <Text style={styles.dropdown3BtnTxt}>
                                        {selectedItem ? selectedItem.title : "Select Address Type"}
                                    </Text>
                                    <Icon name="chevron-down" color={"#444"} size={18} />
                                </View>
                            )
                        }}
                        renderCustomizedRowChild={(item, index) => {
                            // text represented for each item in dropdown
                            // if data array is an array of objects then return item.property to represent item in dropdown
                            return (
                                <View style={styles.addresstype}>
                                    <Icon name={item.image} size={25} style={styles.icon} />
                                    <Text >{item.title}</Text>
                                </View>
                            )
                        }}
                    />
                </View>
                <EditView label="Name" onChangeText={props.name} />
                <EditView label="Address" onChangeText={props.address} />
                <KButton name="Add" click={props.action} />
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
    address: {
        flexDirection: "row",
        alignItems: "center"
    },
    typeselector: {
        width: '100%',
        borderRadius: 10
    },
    icon: {
        color: Colors.primary,
        width: screenWidth * 0.1
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
    }
}
)


export default Address

