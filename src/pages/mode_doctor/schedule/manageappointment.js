import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TouchableHighlight, Text, SectionList, ScrollView } from 'react-native'
import AwesomeLoading from 'react-native-awesome-loading';
import Accordion from 'react-native-collapsible/Accordion';
import Icon from 'react-native-vector-icons/FontAwesome5'
import APIkit from '../../../api/apikit'
import ScheduleItem from '../../../components/items/scheduleitem'
import Colors from '../../../styles/color'
import Fontsize from '../../../styles/fontsize'
import { StandardStyles } from '../../../styles/standardstyles'
import Avatar from '../../../components/avatar'
import moment, { months } from 'moment';
import BadgeButton from '../../../components/badgebtn';
import Badge from '../../../components/util/badge'
import { Divider } from 'react-native-elements/dist/divider/Divider';
import Modal from "react-native-modal";
import AppointmentFilter from '../../../components/modalcontent/appointmentfilter';
import KButton from '../../../components/KButton';
const DoctorSchedule = ({ navigation }) => {
    const [appointments, setAppointment] = useState([])
    const [pastAppointments, setPastAppointments] = useState([])
    const [upcommingAppointments, setUpcommingAppointments] = useState([])
    const [activedAppointments, setActivedApponitments] = useState([])
    const [loading, setLoading] = useState(false)
    const [showfilter, showFilter] = useState(false)
    const [filter, setFilter] = useState()
    const [type, setType] = useState(6)
    const [activeSections, setActiveSections] = useState([])
    const [modalshow, setModalShow] = useState(false)
    const [upcomming, setUpcomming] = useState(true)
    const [fireAppointments, setFireAppointments] = useState([])
    const SECTIONS = [
        {
            name: 'Loading',
            content: 'loading data...',
            status: 0
        },
    ];

    const getSchedule = () => {
        const payload = {
            type: type,
            filter: filter
        }
        const onSuccess = (response) => {
            setLoading(false)
            setAppointment(response.data)
        }
        const onFailed = (response) => {
            console.log("Failed" + response)
            setLoading(false)
        }
        setLoading(true)
        APIkit.post('doctor.schedule.get', payload).then(onSuccess).catch(onFailed)
    }

    const acceptAppointment = (id, status) => {
        const payload = { id: id, status: status }
        const onSuccess = (response) => {
            console.log(response.data)
            setLoading(false)
            getSchedule()
        }
        const onFailed = (response) => {
            console.log(response)
            setLoading(false)
        }
        console.log(payload)
        setLoading(true)
        APIkit.post('doctor.appointment.update', payload).then(onSuccess).catch(onFailed)
    }

    const makePrescription = (id) => {
        const { navigate } = navigation
        navigate("makePrescription", { id: id })
    }

    const _renderSectionTitle = (section) => {
        return (
            <View>

            </View>
        );
    };
    const _renderContent = (section) => {
        return (
            <View style={[styles.expandview, { flexDirection: 'column' }]}>
                <View>
                    <Text style={styles.label}>Customer</Text>
                    <View style={styles.receiver}>
                        <Avatar image={section.image} />
                        <View style={{ paddingHorizontal: 20, justifyContent: 'center' }}>
                            <View style={{ flexDirection: 'column', }}>
                                <Text style={styles.label}>Name</Text>
                                <Text style={[Fontsize.medium, { color: Colors.white, fontWeight: 'bold', marginStart: 10 }]}>{section.name}</Text>
                            </View>
                            <View style={{ flexDirection: 'column', }}>
                                <Text style={styles.label}>Phone</Text>
                                <Text style={[Fontsize.medium, { color: Colors.white, fontWeight: 'bold', marginStart: 10 }]}>+91 {section.phone}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View>
                    <Text style={styles.label}>{section.book_code}</Text>
                </View>
                <View>
                    <Text style={[styles.label, Fontsize.medium, { color: Colors.success, fontWeight: 'bold' }]}>₹ {section.pure_price}</Text>
                </View>
                <View>
                    <Text style={styles.label}></Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.label}>{section.from}</Text>
                    <Divider orientation='vertical' width={1} />
                    <Text style={styles.label}>{section.to}</Text>
                </View>
                {section.status == 0 ?
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        {/* <BadgeButton name="Details" click={() => { navigate(section.id) }} underlayColor={Colors.doctor_primary} /> */}
                        <KButton name="Accept" type="success" click={() => { acceptAppointment(section.id, 2) }} />
                        <KButton name='Reject' type="danger" click={() => { acceptAppointment(section.id, -1) }} />
                    </View> : section.status == 2 ?
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            {/* <BadgeButton name="Details" click={() => { navigate(section.id) }} underlayColor={Colors.doctor_primary} /> */}
                            <TouchableHighlight underlayColor={Colors.other_1} style={styles.btnFilter} onPress={() => { makePrescription(section.id) }}>
                                <Icon name='file-contract' size={20} color={Colors.doctor_primary} />
                            </TouchableHighlight>
                            {section.type == 2 ?
                                <TouchableHighlight underlayColor={Colors.other_1} style={styles.btnFilter} onPress={() => { setModalShow(true) }}>
                                    <Icon name='video' size={20} color={Colors.doctor_primary} />
                                </TouchableHighlight>
                                : <></>}
                        </View> :
                        <></>}
            </View>
        );
    };
    const _renderHeader = (section, index) => {
        return (
            <View style={[styles.appointmentHeaderView, { display: section.book_code ? "flex" : "none", marginBottom: activeSections[0] == index ? 0 : 10 }]} >
                <View style={styles.appointmentHeader}>
                    <View>
                        <Text style={{ color: Colors.doctor_primary, fontWeight: 'bold' }}>{section.type == 0 ? "Clinic Visit" : section.type == 1 ? "Home Visit" : "Video Consultation"}</Text>
                        <Text>{moment(section.date).format('LL')}</Text>
                    </View>
                    <Badge status={section.status === undefined ? 0 : section.status} type="request" />
                </View>
                <View style={[styles.subheader, { display: activeSections[0] == index ? "flex" : "none" }]}></View>
            </View>
        );
    };
    useEffect(() => {
        getSchedule()
    }, [])
    useEffect(() => {
        if (appointments !== undefined && appointments !== null && appointments.length !== 0) {
            let pastbuffer = []
            let upcommintbuffer = []
            let firebuffer = []
            appointments.forEach(appointment => {
                // let appointmentDate = (moment(new Date(appointment.date)).format("yyyy-MM-DD"))
                let today = moment(new Date()).format("yyyy-MM-DD")
                console.log(appointment.date)
                if (appointment.date === today) {
                    console.log(moment().format('HH:mm:ss'))
                    console.log(appointment.to)
                    if (appointment.to > moment().format('HH:mm:ss')) {
                        upcommintbuffer.push(appointment)
                        if (appointment.from < moment().format('HH:mm:ss'))
                            firebuffer.push(appointment.id)
                    }
                    else {
                        pastbuffer.push(appointment)

                    }
                }
                else if (appointment.date < today) {
                    pastbuffer.push(appointment)
                    console.log("KL" + appointment.date + "::" + today)
                }
                else {
                    upcommintbuffer.push(appointment)
                }
            });
            setUpcommingAppointments(upcommintbuffer)
            setPastAppointments(pastbuffer)
            setFireAppointments(firebuffer)
        }
    }, [appointments])
    return (
        <View style={[StandardStyles.container,]}>
            <Modal
                testID={'modal'}
                isVisible={modalshow}
                onSwipeComplete={() => setModalShow(false)}
                swipeDirection={['up', 'left', 'right', 'down']}
                style={styles.filtermodal}>
                <AppointmentFilter />
            </Modal>
            <AwesomeLoading indicatorId={17} size={100} isActive={loading} text="loading" />
            <View style={{ flex: 1, paddingBottom: 10 }}>
                <View style={styles.header}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <TouchableHighlight underlayColor={Colors.white} style={[upcomming ? styles.filterActive : styles.filterDefault, { borderBottomLeftRadius: 20, borderTopLeftRadius: 20 }]} onPress={() => { setUpcomming(true) }}>
                            <View style={styles.filterButton}>
                                <Text style={[upcomming ? styles.labelActive : styles.labelDefault]} >Upcomming</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor={Colors.white} style={[!upcomming ? styles.filterActive : styles.filterDefault, { borderBottomRightRadius: 20, borderTopRightRadius: 20 }]} onPress={() => { setUpcomming(false) }}>
                            <View style={styles.filterButton}>
                                <Text style={[!upcomming ? styles.labelActive : styles.labelDefault]} >Past</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <TouchableHighlight underlayColor={Colors.other_1} style={styles.btnFilter} onPress={() => { setModalShow(true) }}>
                        <Icon name='filter' size={15} color={Colors.doctor_primary} />
                    </TouchableHighlight>
                </View>
                {/* <SectionList
                style={styles.scrollView}
                sections={[
                    {
                        title: 'Schedule', data: schedules
                    },
                ]}
                renderItem={({ item }) => <ScheduleItem schedule={item} />}
                keyExtractor={(item, index) => index}/> */}
                <ScrollView contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
                    <Accordion
                        sections={appointments != null ? upcomming ? upcommingAppointments : pastAppointments : SECTIONS}
                        activeSections={activeSections}
                        renderSectionTitle={_renderSectionTitle}
                        renderHeader={_renderHeader}
                        renderContent={_renderContent}
                        onChange={setActiveSections}
                        underlayColor={Colors.primaryBack}
                    />
                </ScrollView>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    header: {
        padding: 10,
        justifyContent: 'space-between',
        borderColor: Colors.doctor_primary,
        flexDirection: 'row',
        alignItems: 'center',
        paddingStart: 20,
        backgroundColor: Colors.doctor_primary,
        marginBottom: 10,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20
    },
    btnFilter: {
        width: 40,
        height: 40,
        backgroundColor: Colors.white,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: Colors.white,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 45,
        elevation: 10,
        margin: 10
    },
    receiver: {
        flexDirection: 'row'
    },
    expandview: {
        flexDirection: 'row',
        padding: 20,
        backgroundColor: Colors.doctor_primary,
        marginHorizontal: 10,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,

    },
    label:
    {
        color: Colors.white,
        marginHorizontal: 5
    },
    appointmentHeaderView: {
        marginHorizontal: 10,
        flexDirection: 'row',
        marginTop: 5
    },
    appointmentHeader: {
        flexDirection: 'row',
        backgroundColor: Colors.white,
        width: '100%',
        justifyContent: 'space-between',
        alignSelf: 'center',
        paddingVertical: 10,
        borderRadius: 40,
        paddingHorizontal: 20,
        borderColor: Colors.doctor_primary,
        shadowColor: Colors.doctor_primary,
        shadowOffset: { width: 1, height: 3 },
        shadowOpacity: 0.8,
        shadowRadius: 45,
        elevation: 10,
        zIndex: 1,
    },
    subheader: {
        width: '100%',
        height: 25,
        position: 'absolute',
        backgroundColor: Colors.doctor_primary,
        alignSelf: 'flex-end',
        zIndex: -1,
        elevation: -1
    },
    filtermodal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    filterActive: {
        width: '40%',
        padding: 10,
        backgroundColor: Colors.lightblue,
        borderColor: Colors.doctor_primary,
        borderWidth: 1,
        alignItems: 'center'
    },
    filterDefault: {
        width: '40%',
        padding: 10,
        backgroundColor: Colors.doctor_primary,
        borderColor: Colors.doctor_primary,
        borderWidth: 1,
        alignItems: 'center',
        shadowColor: Colors.white,
        shadowOffset: { width: 1, height: 3 },
        shadowOpacity: 1,
        shadowRadius: 20,
        elevation: 10,
    },
    labelActive: {
        color: Colors.doctor_primary,
        fontWeight: 'bold'
    },
    labelDefault: {
        color: Colors.white,
        fontWeight: 'bold'
    }
})


export default DoctorSchedule