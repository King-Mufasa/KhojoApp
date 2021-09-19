import React, { useState } from 'react'
import { View, StyleSheet, Text, } from 'react-native'
import KButton from '../KButton'
import Fontsize from '../../styles/fontsize'
import EditView from '../util/editview'
import SelectDropdown from 'react-native-select-dropdown'
import Colors from '../../styles/color'
import Icon from 'react-native-vector-icons/FontAwesome';
import { screenWidth } from '../../module/IntroSlider/src/themes'
import { RadioButton } from 'react-native-paper';
import { InputPhone } from '../phoneinput'
import Label from '../label'
const NewSchedule = (props) => {
    const patienttype = [
        { title: "Clinic Visit", image: 'hospital-o' },
        { title: "Home Visit", image: 'home' },
        { title: "Video Consultation", image: 'video-camera' },
    ] 
    const [tempgender, setTempGender] = useState('m')
    const [type,setType] = useState()
    const [date, setDate] = useState()
    const [starttime, setStartTime] = useState()
    const [endtime, setEndTime] = useState()
    const [patient, setPatientCount] = useState()

    return (
        <View>
            <View style={styles.modal}>
                <View style={styles.address}>
                    {/* <Text style={Fontsize.small}>Select Address Type: </Text> */}
                    <View style={{ flexDirection: 'column', width: '100%' }}>
                        <Text style={[Fontsize.small, { marginBottom: 10 }]}>Type</Text>
                        <SelectDropdown
                            defaultValueByIndex={0}
                            buttonStyle={styles.typeselector}
                            data={patienttype}
                            onSelect={(selectedItem, index) => {
                                setType(index + 1);
                                console.log(selectedItem, index)
                            }}
                            renderCustomizedButtonChild={(selectedItem, index) => {
                                // props.type(selectedItem)
                                // text represented after item is selected
                                // if data array is an array of objects then return selectedItem.property to render after item is selected
                                return (
                                    <View style={styles.addressselect}>
                                        <View style={{ flexDirection: 'row', alignItems:'center' }}>
                                            {selectedItem ? (
                                                <Icon
                                                    name={selectedItem.image}
                                                    size={25}
                                                    style={styles.icon}
                                                />
                                            ) : (
                                                <Icon name="user" color={"#444"} size={32} />
                                            )}
                                            <Text style={styles.dropdown3BtnTxt}>
                                                {selectedItem ? selectedItem.title : "Select Patient Type"}
                                            </Text>
                                        </View>

                                        <Icon name="chevron-down" color={Colors.doctor_primary} size={18} />
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
                </View>
                <EditView label="From" onChangeText={setDate} />
                <EditView label="To" onChangeText={setStartTime} />
                <EditView label="Patient Limit" onChangeText={setPatientCount} />
                <KButton name="Add Schedule" click={() => { props.action(tempgender) }} />
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
        color: Colors.doctor_primary,
        width: screenWidth * 0.1
    },
    addressselect: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        alignContent: 'center',
        alignItems:'center'
    },
    addresstype: {
        flexDirection: 'row',
        paddingHorizontal: 20,

    },
    genderarea: {
        flexDirection: 'row',
        alignSelf: 'baseline',
        alignItems: 'flex-start',
        width: '45%',
        justifyContent: 'space-between',
        marginTop: 20,
        marginLeft: 20
    },
    gender: {
        flexDirection: 'row',
        alignSelf: 'center',
    },
    label: {
        alignSelf: 'center'
    },
}
)


export default NewSchedule

