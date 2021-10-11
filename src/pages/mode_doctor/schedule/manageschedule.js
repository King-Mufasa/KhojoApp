import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TouchableHighlight, Text, FlatList, SectionList, ImageBackground } from 'react-native'
import AwesomeLoading from 'react-native-awesome-loading';
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/FontAwesome';
import APIkit from '../../../api/apikit'
import KButton from '../../../components/KButton'
import Label from '../../../components/label'
import NewSchedule from '../../../components/modalcontent/newschedule';
import Patient from '../../../components/modalcontent/patient';
import { screenWidth } from '../../../module/IntroSlider/src/themes'
import Colors from '../../../styles/color'
import { StandardStyles, StandardDoctorStyles } from '../../../styles/standardstyles'

const weekdata = [
    {
        label: 'Sun',
        id: 1
    },
    {
        label: 'Mon',
        id: 2
    },
    {
        label: 'Tue',
        id: 3
    },
    {
        label: 'Wed',
        id: 4
    },
    {
        label: 'Thu',
        id: 5
    },
    {
        label: 'Fri',
        id: 6
    },
    {
        label: 'Sat',
        id: 7
    }
]


const WeekDay = (props) => {
    return (
        <TouchableHighlight style={props.selected + 1 == props.info.id ? styles.daybutton : styles.daydefault} onPress={() => { props.action(props.info.id) }} underlayColor={Colors.primaryBack}>
            <View style={styles.daybtnContent}>
                <Text style={props.selected + 1 == props.info.id ? styles.daylabel : styles.dayLabelDefault}>{props.info.label}</Text>
                <Text style={props.selected + 1 == props.info.id ? styles.daylabel : styles.dayLabelDefault}>{props.info.id}</Text>
            </View>
        </TouchableHighlight>
    )
}

const Schedule = (props) => {
    const icon = ["hospital-o", "home", "video-camera"]
    return (
        <View>
            {(props.info.date === props.selected) ? (
                <View style={[StandardDoctorStyles.commonview, { alignItems: 'center', flex: 1 }]}>
                    <ImageBackground style={[styles.typeicon, { backgroundColor: props.info.type == 0 ? Colors.other_2 : props.info.type == 1 ? Colors.other_5 : Colors.other_3 }]}>
                        <Icon name={icon[props.info.type]} size={25} color={Colors.white} />
                    </ImageBackground>
                    <View style={{ justifyContent: 'space-between', flex: 8, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 }}>
                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text>From</Text>
                                <Text>{props.info.from}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text>To</Text>
                                <Text>{props.info.to}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text>Patients</Text>
                                <Text>{props.info.patients}</Text>
                            </View>
                        </View>
                        <Icon name="trash-o" size={20} color={Colors.danger} onPress={() => { props.remove(props.info.id) }} />
                    </View>
                </View>) : (<></>)}
        </View>
    )
}


const ManageSchedule = ({ navitgation }) => {
    const [selected, setSelected] = useState(0)
    const [schedules, setSchedules] = useState([])
    const [modalshow, setModalShow] = useState()
    const [loading, setLoading] = useState(false)
    const getSchedule = () => {
        const onSuccess = (response) => {
            setLoading(false)
            setSchedules(response.data)
        }
        const onFailed = (response) => {
            setLoading(false)
            console.log(response)
        }
        setLoading(true)
        APIkit.post("doctor.event.get").then(onSuccess).catch(onFailed)
    }

    const addSchedule = (type, start, end, patient) => {
        const payload = {
            type: type,
            from: start,
            to: end,
            patients: patient,
            date: selected
        }
        setModalShow(false)
        const onSuccess = (response) => {
            setLoading(false)
            if (response.data.status === 'success')
                getSchedule()
        }
        const onFailed = (response) => {
            setLoading(false)
            console.log(response)
        }
        setLoading(true)
        APIkit.post('doctor.event.add', payload).then(onSuccess).catch(onFailed)
    }
    function removeSchedule(id) {
        const payload ={
            event_id:id
        }
        const onSuccess = (response) =>{
            setLoading(false)
            if(response.data.status == 'success')
                getSchedule()
        }
        const onFailed = (response) =>{
            setLoading(false)
            console.log(response)
        }
        setLoading(true)
        APIkit.post('doctor.event.delete',payload).then(onSuccess).catch(onFailed)
    }
    const selectWeekday = (id) => {
        setSelected(id - 1)
    }
    useEffect(() => {
        getSchedule()
    }, [])
    useEffect(() => {
        selectWeekday(selected + 1)
    }, [schedules])
    return (
        <View style={[StandardStyles.container, { paddingTop: 0, paddingBottom: 10 }]}>
            <AwesomeLoading indicatorId={17} size={100} isActive={loading} text="loading" />
            <Modal
                testID={'modal'}
                isVisible={modalshow}
                onSwipeComplete={() => setModalShow(false)}
                swipeDirection={['up', 'left', 'right', 'down']}
                style={styles.modal}>
                <NewSchedule action={addSchedule} />
            </Modal>
            <View style={styles.weekday}>
                <SectionList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={styles.scrollView}
                    sections={[
                        {
                            title: 'week', data: weekdata
                        },
                    ]}
                    renderItem={({ item }) => <WeekDay info={item} selected={selected} action={selectWeekday} />}
                    keyExtractor={(item, index) => index}
                />

            </View>
            <SectionList
                showsVerticalScrollIndicator={false}
                style={styles.scrollView}
                sections={[
                    {
                        title: 'week', data: schedules
                    },
                ]}
                renderItem={({ item }) => <Schedule info={item} selected={selected} action={selectWeekday} remove={removeSchedule} />}
                keyExtractor={(item, index) => index}
            />
            <KButton name="Add Schedule" style={{ marginStart: 10, marginEnd: 10 }} click={() => { setModalShow(true) }} />
        </View>
    )
}


const styles = StyleSheet.create({
    weekday: {
        marginTop: -10,
        flexDirection: 'row',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        shadowColor: Colors.doctor_primary,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 45,
        elevation: 5,
        width: "100%",
        padding: 10
        // marginStart:-screenWidth*0.01
    },
    daybutton: {
        width: (screenWidth - 20) * 0.1314,
        height: 100,
        backgroundColor: Colors.other_3,
        borderRadius: 50,
        marginBottom: 20,
        marginStart: (screenWidth - 20) * 0.01,
        marginTop: 20,
        justifyContent: 'center'
    },
    daydefault: {
        width: (screenWidth - 20) * 0.1314,
        height: 100,
        backgroundColor: Colors.white,
        borderRadius: 50,
        marginBottom: 20,
        marginStart: (screenWidth - 20) * 0.01,
        marginTop: 20,
        justifyContent: 'center',
    },
    daylabel: {
        color: Colors.white,
        fontWeight: 'bold'
    },
    dayLabelDefault: {
        color: Colors.dark,
        fontWeight: 'bold'
    },
    daybtnContent: {
        alignItems: 'center'
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    typeicon: {
        width: 50,
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    
})


export default ManageSchedule