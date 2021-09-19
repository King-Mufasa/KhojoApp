import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TouchableHighlight, Text, FlatList, SectionList } from 'react-native'
import Modal from "react-native-modal";
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
        <TouchableHighlight style={props.selected == props.info.id ? styles.daybutton : styles.daydefault} onPress={() => { props.action(props.info.id) }} underlayColor={Colors.primaryBack}>
            <View style={styles.daybtnContent}>
                <Text style={props.selected == props.info.id ? styles.daylabel : styles.dayLabelDefault}>{props.info.label}</Text>
                <Text style={props.selected == props.info.id ? styles.daylabel : styles.dayLabelDefault}>{props.info.id}</Text>
            </View>
        </TouchableHighlight>
    )
}

const Schedule = (props) => {
    return (
        <View style={StandardDoctorStyles.commonview}>

        </View>
    )
}

const ManageSchedule = ({ navitgation }) => {
    const [selected, setSelected] = useState(1)
    const [schedules, setSchedules] = useState()
    const [modalshow, setModalShow] = useState()
    
    const getSchedule = () => {
        const onSuccess = (response) => {
            console.log(response.data)
        }
        const onFailed = (response) => {
            console.log(response)
        }
        APIkit.post("doctor.event.get").then(onSuccess).catch(onFailed)
    }
    const selectWeekday = (id) => {
        setSelected(id)
    }
    useEffect(() => {
        getSchedule()
    }, [])
    return (
        <View style={[StandardStyles.container, { paddingTop: 0, paddingBottom: 10 }]}>
            <Modal
                testID={'modal'}
                isVisible={modalshow}
                onSwipeComplete={() => setModalShow(false)}
                swipeDirection={['up', 'left', 'right', 'down']}
                style={styles.modal}>
                <NewSchedule />
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
                        title: 'week', data: weekdata
                    },
                ]}
                renderItem={({ item }) => <Schedule info={item} selected={selected} action={selectWeekday} />}
                keyExtractor={(item, index) => index}
            />
            <KButton name="Add Schedule" style={{ marginStart: 10, marginEnd: 10 }} click={()=>{setModalShow(true)}}/>
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
})


export default ManageSchedule