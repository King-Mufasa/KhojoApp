import React, { useState } from 'react'
import { View, StyleSheet, Text, TextInput } from 'react-native'
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
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment'
import Snackbar from 'react-native-snackbar';
import { from } from 'form-data'
const NewSchedule = (props) => {
    const patienttype = [
        { title: "Clinic Visit", image: 'hospital-o' },
        { title: "Home Visit", image: 'home' },
        { title: "Video Consultation", image: 'video-camera' },
    ]
    const [tempgender, setTempGender] = useState('m')
    const [type, setType] = useState(0)
    const [date, setDate] = useState()
    const [starttime, setStartTime] = useState("00:00")
    const [endtime, setEndTime] = useState("00:00")
    const [patient, setPatientCount] = useState()
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isstart, toggleStart] = useState(true)
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const handleConfirm = (date) => {
        if (isstart)
            setStartTime(moment(date).format("HH:mm"))
        else
            setEndTime(moment(date).format("HH:mm"))
        hideDatePicker();
    };
    const addSchedule = () => {
        if (endtime > starttime && patient > 0) {
            props.action(type, starttime, endtime, patient)
        }
        else {
            Snackbar.show({
                text: 'Please input valid data',
                duration: Snackbar.DURATION_SHORT
            })
        }
    }
    return (
        <View>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="time"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
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
                                setType(index);
                                console.log(selectedItem, index)
                            }}
                            renderCustomizedButtonChild={(selectedItem, index) => {
                                // props.type(selectedItem)
                                // text represented after item is selected
                                // if data array is an array of objects then return selectedItem.property to render after item is selected
                                return (
                                    <View style={styles.addressselect}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
                <View style={{ width: '100%' }}>
                    <Text style={[Fontsize.small, { marginTop: 20 }]}>From</Text>
                    <View style={styles.timepicker}>
                        <Text style={[styles.time, Fontsize.medium]} >{starttime}</Text>
                        <KButton style={{ width: "25%", marginTop: 0 }} name="Edit" click={() => { showDatePicker(), toggleStart(true) }} />
                    </View>
                </View>
                <View style={{ width: '100%' }}>
                    <Text style={[Fontsize.small, { marginTop: 20 }]}>To</Text>
                    <View style={styles.timepicker}>
                        <Text style={[styles.time, Fontsize.medium]} >{endtime}</Text>
                        <KButton style={{ width: "25%", marginTop: 0 }} name="Edit" click={() => { showDatePicker(), toggleStart(false) }} />
                    </View>
                </View>
                <EditView label="Patient Limit" onChangeText={setPatientCount} />
                <KButton name="Add Schedule" click={() => { addSchedule() }} />
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
        alignItems: 'center'
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
    time: {
        width: '70%',
        textAlign: 'center'
    },
    timepicker: {
        flexDirection: 'row',
        width: "100%",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.lightgrey,
        alignItems: 'center',
        justifyContent: 'space-between'
    }
}
)


export default NewSchedule

